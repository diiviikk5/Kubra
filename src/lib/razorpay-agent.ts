/**
 * Razorpay Test-Mode Agentic Commerce Integration
 * Integrates Razorpay Orders, Smart Collect, and UPI AutoPay Mandates
 * for autonomous AI agent transactions.
 */

export interface RazorpayOrderPayload {
  amount: number; // in paise (₹1 = 100 paise)
  currency: 'INR';
  receipt: string;
  notes?: Record<string, string>;
  payment_capture?: 1 | 0;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: 'INR';
  receipt: string;
  status: 'created' | 'attempted' | 'paid';
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPaymentResult {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  status: 'captured' | 'failed';
  method: 'upi' | 'card' | 'autopay_mandate';
  amount: number;
  captured_at: string;
}

const RAZORPAY_TEST_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_KUBRAagentic2026';

/**
 * Creates a compliant Razorpay Order for test-mode checkout
 */
export function createRazorpayOrder(
  amountInINR: number,
  receiptTag: string,
  agentMeta?: { agentId: string; mandateId: string; purpose: string }
): RazorpayOrderResponse {
  const paise = Math.round(amountInINR * 100);
  const orderId = `order_rzp_${Date.now().toString().slice(-8)}_${Math.floor(Math.random() * 1000)}`;

  return {
    id: orderId,
    entity: 'order',
    amount: paise,
    amount_paid: 0,
    amount_due: paise,
    currency: 'INR',
    receipt: receiptTag,
    status: 'created',
    attempts: 0,
    notes: {
      agent_id: agentMeta?.agentId || 'agent_kubra_buyer_01',
      mandate_id: agentMeta?.mandateId || 'man_razor_npci_88291',
      settlement_channel: 'NPCI_UAP_DIRECT',
      purpose: agentMeta?.purpose || 'Autonomous Grocery Fulfillment'
    },
    created_at: Math.floor(Date.now() / 1000)
  };
}

/**
 * Simulates a cryptographic Razorpay payment capture callback
 */
export function simulateRazorpayCapture(
  order: RazorpayOrderResponse,
  paymentMethod: 'upi' | 'autopay_mandate' = 'autopay_mandate'
): RazorpayPaymentResult {
  const paymentId = `pay_rzp_${Date.now().toString().slice(-8)}`;
  // Simulated SHA-256 HMAC signature
  const mockSignature = `sig_${Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

  return {
    razorpay_payment_id: paymentId,
    razorpay_order_id: order.id,
    razorpay_signature: mockSignature,
    status: 'captured',
    method: paymentMethod,
    amount: order.amount / 100,
    captured_at: new Date().toISOString()
  };
}

/**
 * Verifies if an agent spending action is bounded by the user's mandate
 */
export function evaluateSpendingBounds(
  amountINR: number,
  mandate: {
    maxAmountPerTxn: number;
    dailySpendingCap: number;
    dailySpentSoFar: number;
    autonomousThreshold: number;
  }
): {
  allowed: boolean;
  requiresHumanApproval: boolean;
  reason: string;
  suggestedAction?: string;
} {
  // Check per-transaction spending limit
  if (amountINR > mandate.maxAmountPerTxn) {
    return {
      allowed: false,
      requiresHumanApproval: true,
      reason: `Requested ₹${amountINR.toFixed(2)} exceeds maximum per-transaction limit of ₹${mandate.maxAmountPerTxn.toFixed(2)}.`,
      suggestedAction: 'Gracefully halt autonomous execution. Prompt user for one-time OTP bump or request agent to drop optional bundle items.'
    };
  }

  // Check cumulative daily spending cap
  if (mandate.dailySpentSoFar + amountINR > mandate.dailySpendingCap) {
    return {
      allowed: false,
      requiresHumanApproval: true,
      reason: `Transaction of ₹${amountINR.toFixed(2)} would breach daily spending ceiling of ₹${mandate.dailySpendingCap.toFixed(2)} (Spent so far: ₹${mandate.dailySpentSoFar.toFixed(2)}).`,
      suggestedAction: 'Pause autonomous loop. Request user to replenish daily mandate allowance.'
    };
  }

  // Check if autonomous execution threshold is met
  if (amountINR > mandate.autonomousThreshold) {
    return {
      allowed: true,
      requiresHumanApproval: true,
      reason: `Amount ₹${amountINR.toFixed(2)} exceeds autonomous threshold of ₹${mandate.autonomousThreshold.toFixed(2)}. Gated human confirmation required.`,
      suggestedAction: 'Display biometric or 1-tap consent prompt to the citizen.'
    };
  }

  // Fully autonomous execution permitted
  return {
    allowed: true,
    requiresHumanApproval: false,
    reason: `Amount ₹${amountINR.toFixed(2)} is within autonomous limit (< ₹${mandate.autonomousThreshold.toFixed(2)}). Executing zero-touch.`
  };
}
