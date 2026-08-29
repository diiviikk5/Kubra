'use client';

import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, QrCode, Building2, Check, Copy, ArrowRight, ShieldCheck, RefreshCw, X, Lock, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  sellerDetails: {
    seller1: string;
    seller1Amount: number;
    seller2?: string;
    seller2Amount?: number;
  };
  onPaymentSuccess: (txnId: string, paymentMethod: string) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  amount,
  orderId,
  sellerDetails,
  onPaymentSuccess,
}) => {
  const [method, setMethod] = useState<'UPI_QR' | 'UPI_APP' | 'CARD' | 'NETBANKING'>('UPI_QR');
  const [paymentState, setPaymentState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [copied, setCopied] = useState(false);
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [cardDetails, setCardDetails] = useState({
    number: '4532 •••• •••• 8821',
    expiry: '08/29',
    cvv: '912',
    name: 'CITIZEN CARDHOLDER'
  });

  const upiIntentUri = `upi://pay?pa=ondc.bharat@icici&pn=Kubra+Open+Commerce&am=${amount.toFixed(2)}&cu=INR&tn=${orderId}`;

  const handleCopyUri = () => {
    navigator.clipboard.writeText(upiIntentUri);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecutePayment = (selectedMethodName: string) => {
    setPaymentState('PROCESSING');
    setTimeout(() => {
      setPaymentState('SUCCESS');
      const generatedTxn = `NPCI-ONDC-${Date.now().toString().slice(-8)}`;
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        onPaymentSuccess(generatedTxn, selectedMethodName);
      }, 900);
    }, 1400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 font-editorial-body animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-2xl border border-hairline shadow-card-elevated overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-hairline flex items-center justify-between bg-canvas-soft">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-ink text-white flex items-center justify-center text-xs font-bold font-mono">
              ₹
            </div>
            <div>
              <div className="text-sm font-semibold text-ink">NPCI Multi-Rail Payment Gateway</div>
              <div className="text-[11px] text-text-muted font-mono">Order {orderId} • DPIIT ONDC Atomic Split</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-muted hover:text-ink hover:bg-surface-strong transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount & Multi-Seller Split Banner */}
        <div className="p-5 bg-white border-b border-hairline space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-text-muted">Total Payable</span>
            <span className="text-3xl font-display text-ink font-light">₹{amount.toFixed(2)}</span>
          </div>

          <div className="p-3 rounded-xl bg-canvas text-xs space-y-1.5 border border-hairline-soft font-mono">
            <div className="flex justify-between text-text-body">
              <span>{sellerDetails.seller1}</span>
              <span className="font-semibold text-ink">₹{sellerDetails.seller1Amount.toFixed(2)}</span>
            </div>
            {sellerDetails.seller2 && (
              <div className="flex justify-between text-text-body">
                <span>{sellerDetails.seller2}</span>
                <span className="font-semibold text-ink">₹{sellerDetails.seller2Amount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-[11px] text-text-muted pt-1 border-t border-hairline">
              <span>Network Protocol Fee (2.5%)</span>
              <span className="text-emerald-600 font-semibold">₹0.00 (Zero Surge)</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Selection Pills */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 gap-1.5 p-1 rounded-xl bg-canvas border border-hairline text-xs font-medium">
            <button
              onClick={() => setMethod('UPI_QR')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'UPI_QR' ? 'bg-white text-ink shadow-sm font-semibold' : 'text-text-muted hover:text-ink'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-[11px]">UPI QR</span>
            </button>

            <button
              onClick={() => setMethod('UPI_APP')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'UPI_APP' ? 'bg-white text-ink shadow-sm font-semibold' : 'text-text-muted hover:text-ink'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-[11px]">UPI Apps</span>
            </button>

            <button
              onClick={() => setMethod('CARD')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'CARD' ? 'bg-white text-ink shadow-sm font-semibold' : 'text-text-muted hover:text-ink'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[11px]">Cards</span>
            </button>

            <button
              onClick={() => setMethod('NETBANKING')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'NETBANKING' ? 'bg-white text-ink shadow-sm font-semibold' : 'text-text-muted hover:text-ink'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[11px]">NetBanking</span>
            </button>
          </div>

          {/* METHOD 1: UPI QR CODE */}
          {method === 'UPI_QR' && (
            <div className="flex flex-col items-center justify-center p-4 bg-canvas rounded-xl border border-hairline space-y-3">
              <div className="p-3 bg-white rounded-xl border border-hairline shadow-sm">
                <QRCodeSVG
                  value={upiIntentUri}
                  size={160}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-text-muted">
                <span>Scan with GPay, PhonePe, Paytm, or BHIM</span>
                <button
                  onClick={handleCopyUri}
                  className="text-ink hover:underline font-mono text-[11px] flex items-center gap-1"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <button
                onClick={() => handleExecutePayment('UPI QR Scan')}
                disabled={paymentState === 'PROCESSING'}
                className="w-full py-2.5 rounded-full bg-ink text-white font-medium text-xs hover:bg-ink-primary-active transition-all flex items-center justify-center gap-2"
              >
                {paymentState === 'PROCESSING' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Verifying NPCI Settlement...</span>
                  </>
                ) : (
                  <span>Simulate Instant Scan &amp; Pay</span>
                )}
              </button>
            </div>
          )}

          {/* METHOD 2: 1-TAP UPI APPS */}
          {method === 'UPI_APP' && (
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {['Google Pay', 'PhonePe', 'Paytm UPI', 'BHIM UPI'].map((appName) => (
                  <button
                    key={appName}
                    onClick={() => handleExecutePayment(appName)}
                    disabled={paymentState === 'PROCESSING'}
                    className="p-3 rounded-xl border border-hairline bg-white hover:bg-canvas text-left text-xs font-medium text-ink transition-all flex items-center justify-between"
                  >
                    <span>{appName}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* METHOD 3: CARD CHECKOUT */}
          {method === 'CARD' && (
            <div className="p-4 bg-canvas rounded-xl border border-hairline space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-text-muted mb-1 font-mono">Card Number</label>
                <input
                  type="text"
                  value={cardDetails.number}
                  readOnly
                  className="w-full p-2 rounded-lg bg-white border border-hairline text-ink font-mono text-xs focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-text-muted mb-1 font-mono">Valid Thru</label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    readOnly
                    className="w-full p-2 rounded-lg bg-white border border-hairline text-ink font-mono text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-text-muted mb-1 font-mono">CVV</label>
                  <input
                    type="password"
                    value={cardDetails.cvv}
                    readOnly
                    className="w-full p-2 rounded-lg bg-white border border-hairline text-ink font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => handleExecutePayment('Card (RuPay/Visa)')}
                disabled={paymentState === 'PROCESSING'}
                className="w-full py-2.5 rounded-full bg-ink text-white font-medium text-xs hover:bg-ink-primary-active transition-all flex items-center justify-center gap-2"
              >
                {paymentState === 'PROCESSING' ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>3D Secure 2.0 Authorizing...</span>
                  </>
                ) : (
                  <span>Authorize ₹{amount.toFixed(2)} via 3DS</span>
                )}
              </button>
            </div>
          )}

          {/* METHOD 4: NETBANKING */}
          {method === 'NETBANKING' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank'].map((bank) => (
                  <button
                    key={bank}
                    onClick={() => handleExecutePayment(`Netbanking - ${bank}`)}
                    disabled={paymentState === 'PROCESSING'}
                    className="p-3 rounded-xl border border-hairline bg-white hover:bg-canvas text-left font-medium text-ink transition-all flex items-center justify-between"
                  >
                    <span>{bank}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Trust Footer */}
        <div className="p-3 border-t border-hairline bg-canvas-soft flex items-center justify-center gap-2 text-[11px] text-text-muted font-mono">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>256-Bit Encrypted • RBI &amp; NPCI UPI Standard</span>
        </div>
      </div>
    </div>
  );
};
