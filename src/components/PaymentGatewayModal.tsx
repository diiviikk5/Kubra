'use client';

import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, QrCode, Building2, Check, Copy, ArrowRight, ShieldCheck, RefreshCw, X, Lock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [method, setMethod] = useState<'UPI_QR' | 'UPI_APP' | 'CARD' | 'NETBANKING'>('UPI_QR');
  const [paymentState, setPaymentState] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');
  const [copied, setCopied] = useState(false);
  const [cardDetails] = useState({
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-editorial-body animate-in fade-in duration-200">
      <div className={`w-full max-w-lg rounded-2xl border shadow-card-elevated overflow-hidden flex flex-col ${
        isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
      }`}>
        {/* Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDark ? 'border-[#292524] bg-[#0c0a09]' : 'border-[#e7e5e4] bg-[#fafafa]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono ${
              isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
            }`}>
              ₹
            </div>
            <div>
              <div className="text-sm font-semibold">NPCI Multi-Rail Payment Gateway</div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                Order {orderId} • DPIIT ONDC Atomic Split
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full transition-colors ${
              isDark ? 'text-[#a8a29e] hover:text-white hover:bg-[#292524]' : 'text-[#777169] hover:text-[#0c0a09] hover:bg-[#f0efed]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount & Multi-Seller Split Banner */}
        <div className={`p-5 border-b space-y-3 ${
          isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4]'
        }`}>
          <div className="flex items-baseline justify-between">
            <span className={`text-xs ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>Total Payable</span>
            <span className="text-3xl font-display font-light">₹{amount.toFixed(2)}</span>
          </div>

          <div className={`p-3 rounded-xl text-xs space-y-1.5 border font-mono ${
            isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#f0efed] text-[#4e4e4e]'
          }`}>
            <div className="flex justify-between">
              <span>{sellerDetails.seller1}</span>
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                ₹{sellerDetails.seller1Amount.toFixed(2)}
              </span>
            </div>
            {sellerDetails.seller2 && (
              <div className="flex justify-between">
                <span>{sellerDetails.seller2}</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  ₹{sellerDetails.seller2Amount?.toFixed(2)}
                </span>
              </div>
            )}
            <div className={`flex justify-between text-[11px] pt-1 border-t ${
              isDark ? 'border-[#292524] text-[#78716c]' : 'border-[#e7e5e4] text-[#777169]'
            }`}>
              <span>Network Protocol Fee (2.5%)</span>
              <span className="text-emerald-500 font-semibold">₹0.00 (Zero Surge)</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Selection Pills */}
        <div className="p-5 space-y-4">
          <div className={`grid grid-cols-4 gap-1.5 p-1 rounded-xl border text-xs font-medium ${
            isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
          }`}>
            <button
              onClick={() => setMethod('UPI_QR')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'UPI_QR'
                  ? isDark ? 'bg-[#1c1917] text-white shadow-sm font-semibold' : 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                  : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span className="text-[11px]">UPI QR</span>
            </button>

            <button
              onClick={() => setMethod('UPI_APP')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'UPI_APP'
                  ? isDark ? 'bg-[#1c1917] text-white shadow-sm font-semibold' : 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                  : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <ArrowRight className="w-4 h-4" />
              <span className="text-[11px]">UPI Apps</span>
            </button>

            <button
              onClick={() => setMethod('CARD')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'CARD'
                  ? isDark ? 'bg-[#1c1917] text-white shadow-sm font-semibold' : 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                  : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span className="text-[11px]">Cards</span>
            </button>

            <button
              onClick={() => setMethod('NETBANKING')}
              className={`py-2 rounded-lg transition-all flex flex-col items-center gap-1 ${
                method === 'NETBANKING'
                  ? isDark ? 'bg-[#1c1917] text-white shadow-sm font-semibold' : 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                  : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span className="text-[11px]">NetBanking</span>
            </button>
          </div>

          {/* METHOD 1: UPI QR CODE */}
          {method === 'UPI_QR' && (
            <div className={`flex flex-col items-center justify-center p-4 rounded-xl border space-y-3 ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}>
              <div className="p-3 bg-white rounded-xl border border-[#e7e5e4] shadow-sm">
                <QRCodeSVG
                  value={upiIntentUri}
                  size={160}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                <span>Scan with GPay, PhonePe, Paytm, or BHIM</span>
                <button
                  onClick={handleCopyUri}
                  className={`hover:underline font-mono text-[11px] flex items-center gap-1 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <button
                onClick={() => handleExecutePayment('UPI QR Scan')}
                disabled={paymentState === 'PROCESSING'}
                className={`w-full py-2.5 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 ${
                  isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                }`}
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
                    className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                      isDark
                        ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-white'
                        : 'border-[#e7e5e4] bg-white hover:bg-[#f5f5f5] text-[#0c0a09]'
                    }`}
                  >
                    <span>{appName}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* METHOD 3: CARD CHECKOUT */}
          {method === 'CARD' && (
            <div className={`p-4 rounded-xl border space-y-3 text-xs ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}>
              <div>
                <label className={`block text-[11px] mb-1 font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>Card Number</label>
                <input
                  type="text"
                  value={cardDetails.number}
                  readOnly
                  className={`w-full p-2 rounded-lg border font-mono text-xs focus:outline-none ${
                    isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className={`block text-[11px] mb-1 font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>Valid Thru</label>
                  <input
                    type="text"
                    value={cardDetails.expiry}
                    readOnly
                    className={`w-full p-2 rounded-lg border font-mono text-xs focus:outline-none ${
                      isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-[11px] mb-1 font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>CVV</label>
                  <input
                    type="password"
                    value={cardDetails.cvv}
                    readOnly
                    className={`w-full p-2 rounded-lg border font-mono text-xs focus:outline-none ${
                      isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
                    }`}
                  />
                </div>
              </div>
              <button
                onClick={() => handleExecutePayment('Card (RuPay/Visa)')}
                disabled={paymentState === 'PROCESSING'}
                className={`w-full py-2.5 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 ${
                  isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                }`}
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
                    className={`p-3 rounded-xl border text-left font-medium transition-all flex items-center justify-between ${
                      isDark
                        ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-white'
                        : 'border-[#e7e5e4] bg-white hover:bg-[#f5f5f5] text-[#0c0a09]'
                    }`}
                  >
                    <span>{bank}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security Trust Footer */}
        <div className={`p-3 border-t flex items-center justify-center gap-2 text-[11px] font-mono ${
          isDark ? 'border-[#292524] bg-[#0c0a09] text-[#78716c]' : 'border-[#e7e5e4] bg-[#fafafa] text-[#777169]'
        }`}>
          <Lock className="w-3 h-3 text-emerald-500" />
          <span>256-Bit Encrypted • RBI &amp; NPCI UPI Standard</span>
        </div>
      </div>
    </div>
  );
};
