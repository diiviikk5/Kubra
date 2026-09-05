import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const llmsTxt = `# Kubra Agentic Commerce Protocol (llms.txt)
> Machine-Readable Guide for Autonomous AI Buyers & Merchant Agents

## Core Merchant Info
- Merchant: Gupta Super Bazaar (Kirana) & Pooja Electricals (Hardware)
- Location: Ghatkopar, Mumbai, Bharat
- Network: DPIIT ONDC Open Commerce + NPCI Unified Agent Protocol (UAP)
- Payment Gateway: Razorpay Test-Mode (Key: rzp_test_KUBRAagentic2026) & UPI AutoPay

## Machine Endpoints
- Agent Catalog (JSON-LD): https://kubra-app.vercel.app/api/agent/catalog
- UAP Manifest: https://kubra-app.vercel.app/.well-known/uap-manifest.json
- Transaction Gateway (x402): https://kubra-app.vercel.app/api/agent/transact

## Agent Purchase Rules
1. Autonomous Purchase Limit: Orders <= INR 500.00 execute zero-touch via UPI AutoPay mandate token.
2. Gated Purchase Threshold: Orders > INR 500.00 require human biometric/OTP approval.
3. Max Spending Bound: Hard stop at INR 1000.00 per transaction unless user raises mandate allowance.
4. Bounded Slippage: Maximum acceptable price change is 2.5%.
5. Graceful Failure: If stock or mandate limits are exceeded, agents must renegotiate instead of aborting.

## Example AP2 Purchase Request
POST /api/agent/transact
Authorization: x402 <mandate_token>
Content-Type: application/json

{
  "protocol": "AP2/1.1",
  "buyerAgent": "agent_user_assistant",
  "basket": [
    { "skuId": "prod-001", "quantity": 1, "unitPrice": 245 }
  ],
  "spendingLimitINR": 300
}
`;

  return new NextResponse(llmsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  });
}
