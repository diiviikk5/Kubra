/**
 * Agentic Commerce Protocols Specification
 * Standards implemented:
 * 1. NPCI UAP (Unified Agent Protocol) v1.0.0
 * 2. ACP (Agent Communication Protocol) v0.9
 * 3. AP2 (Agent Payment Protocol) v1.1
 * 4. x402 (HTTP 402 Autonomous Payment Required Protocol)
 */

export interface AgentIdentity {
  agentId: string;
  agentName: string;
  developer: string;
  publicKey: string;
  protocolVersion: string;
  trustScore: number; // 0 - 100
  attestationCert: string;
}

export interface BoundedMandate {
  mandateId: string;
  buyerVpa: string;
  maxAmountPerTxn: number;
  dailySpendingCap: number;
  dailySpentSoFar: number;
  currency: 'INR';
  validUntil: string;
  merchantWhitelist: string[];
  autonomousThreshold: number; // Below this amount, no OTP/biometric needed
  requiresHumanAbove: number;  // Above this amount, gated by user consent
  status: 'ACTIVE' | 'PAUSED' | 'EXHAUSTED' | 'REVOKED';
}

export interface UAPMerchantManifest {
  schemaVersion: 'UAP/1.0';
  merchantId: string;
  businessName: string;
  merchantCategoryCode: string;
  endpoints: {
    catalog: string;
    quote: string;
    transact: string;
    dispute: string;
    webhook: string;
  };
  supportedPaymentProtocols: ('AP2/1.0' | 'ACP/0.9' | 'x402/1.0' | 'RAZORPAY_TEST')[];
  agentPolicy: {
    allowAutonomousBuying: boolean;
    maxAutonomousOrderValue: number;
    negotiationEnabled: boolean;
    maxDiscountAllowedPct: number;
    rateLimitPerMinute: number;
  };
  supportedSettlementRails: ('RAZORPAY_AUTOPAY' | 'UPI_INTENT' | 'ONDC_SETU');
}

export interface AP2PurchaseIntent {
  protocol: 'AP2/1.1';
  messageId: string;
  timestamp: string;
  buyerAgent: AgentIdentity;
  sellerMerchantId: string;
  basket: {
    skuId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    offeredPrice?: number;
  }[];
  spendingLimitINR: number;
  mandateToken: string;
  bounds: {
    maxSlippagePct: number;
    maxDeliveryFeeINR: number;
    acceptableDelayMins: number;
  };
  signature: string;
}

export interface AP2ExecutionReceipt {
  protocol: 'AP2/1.1';
  receiptId: string;
  orderId: string;
  razorpayPaymentId?: string;
  status: 'EXECUTED_AUTONOMOUS' | 'GATED_APPROVED' | 'GATED_REJECTED' | 'FAILED_BOUNDS_EXCEEDED';
  finalAmount: number;
  discountSavedINR: number;
  executionTimestamp: string;
  auditHash: string;
  failureReason?: string;
  gracefulActionTaken?: string;
}

export interface x402Challenge {
  statusCode: 402;
  protocol: 'x402/1.0';
  scheme: 'x402-Razorpay';
  realm: 'Kubra-Agent-Commerce';
  orderId: string;
  amount: number;
  currency: 'INR';
  description: string;
  acceptedMandateTypes: ('RECURRING_UPI' | 'SMART_COLLECT_TOKEN');
}

export const SAMPLE_UAP_MANIFEST: UAPMerchantManifest = {
  schemaVersion: 'UAP/1.0',
  merchantId: 'merch_gupta_kirana_01',
  businessName: 'Gupta Super Bazaar (Ghatkopar)',
  merchantCategoryCode: '5411', // Grocery stores
  endpoints: {
    catalog: '/api/agent/catalog',
    quote: '/api/agent/quote',
    transact: '/api/agent/transact',
    dispute: '/api/agent/dispute',
    webhook: '/api/agent/webhook'
  },
  supportedPaymentProtocols: ['AP2/1.0', 'ACP/0.9', 'x402/1.0', 'RAZORPAY_TEST'],
  agentPolicy: {
    allowAutonomousBuying: true,
    maxAutonomousOrderValue: 2000,
    negotiationEnabled: true,
    maxDiscountAllowedPct: 8.5,
    rateLimitPerMinute: 300
  },
  supportedSettlementRails: 'RAZORPAY_AUTOPAY'
};

export const DEFAULT_BUYER_MANDATE: BoundedMandate = {
  mandateId: 'man_razor_npci_88291',
  buyerVpa: 'divik.citizen@okhdfc',
  maxAmountPerTxn: 1000,
  dailySpendingCap: 3000,
  dailySpentSoFar: 667,
  currency: 'INR',
  validUntil: '2026-12-31T23:59:59Z',
  merchantWhitelist: [
    'merch_gupta_kirana_01',
    'merch_pooja_hardware_02',
    'merch_apollo_pharmacy_03'
  ],
  autonomousThreshold: 500, // < ₹500 executes completely autonomously
  requiresHumanAbove: 500,  // >= ₹500 triggers human-in-the-loop confirmation
  status: 'ACTIVE'
};
