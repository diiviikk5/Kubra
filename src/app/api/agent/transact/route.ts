import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder, evaluateSpendingBounds, simulateRazorpayCapture } from '@/lib/razorpay-agent';
import { DEFAULT_BUYER_MANDATE } from '@/lib/agentic-protocols';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || '';

  // x402 Protocol: If missing authorization, challenge the agent with HTTP 402
  if (!authHeader.startsWith('x402') && !authHeader.includes('Bearer man_')) {
    return new NextResponse(
      JSON.stringify({
        error: 'Payment Required',
        protocol: 'x402/1.0',
        message: 'Autonomous purchase requires a pre-authorized Razorpay/NPCI UAP mandate token.',
        acceptedSchemes: ['x402-Razorpay', 'NPCI-AutoPay'],
        mandateCreationEndpoint: '/api/razorpay/autopay-mandate'
      }),
      {
        status: 402,
        headers: {
          'Content-Type': 'application/json',
          'WWW-Authenticate': 'x402-Razorpay realm="Kubra", currency="INR", max_amount="1000"',
          'X-UAP-Challenge': 'UAP-CHALLENGE-2026'
        }
      }
    );
  }

  try {
    const body = await req.json();
    const amountINR = Number(body.amountINR) || 387.00;
    const agentId = body.buyerAgent?.agentId || 'agent_claude_buyer_01';

    // Evaluate spending bounds
    const boundsCheck = evaluateSpendingBounds(amountINR, DEFAULT_BUYER_MANDATE);

    if (!boundsCheck.allowed) {
      return NextResponse.json(
        {
          status: 'REJECTED_BOUNDS_EXCEEDED',
          reason: boundsCheck.reason,
          suggestedAction: boundsCheck.suggestedAction,
          explainability: {
            policyEvaluated: 'MAX_TXN_LIMIT_1000',
            amountRequested: amountINR,
            mandateLimit: DEFAULT_BUYER_MANDATE.maxAmountPerTxn
          }
        },
        { status: 403 }
      );
    }

    // Generate Razorpay Order
    const rzpOrder = createRazorpayOrder(amountINR, `rcpt_${Date.now()}`, {
      agentId,
      mandateId: DEFAULT_BUYER_MANDATE.mandateId,
      purpose: 'Autonomous AI Buyer Checkout'
    });

    // Simulate atomic capture
    const paymentResult = simulateRazorpayCapture(rzpOrder);

    return NextResponse.json({
      protocol: 'AP2/1.1',
      status: boundsCheck.requiresHumanApproval ? 'GATED_APPROVAL_PENDING' : 'EXECUTED_AUTONOMOUS',
      receiptId: `rcpt_ap2_${Date.now()}`,
      razorpayOrder: rzpOrder,
      paymentResult,
      explainability: {
        reasoning: boundsCheck.reason,
        policyBoundsPassed: true,
        riskScore: 0.08
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Malformed AP2/1.1 request body' },
      { status: 400 }
    );
  }
}
