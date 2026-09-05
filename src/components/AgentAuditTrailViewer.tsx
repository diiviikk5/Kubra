'use client';

import React, { useState } from 'react';
import {
  AuditEvent,
  INITIAL_AUDIT_EVENTS,
  createNewAuditEvent
} from '@/lib/agent-audit-ledger';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Terminal,
  ArrowRight,
  RefreshCw,
  Hash,
  Download,
  Check,
  Copy,
  SlidersHorizontal,
  Key,
  Flame,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

export const AgentAuditTrailViewer: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [events, setEvents] = useState<AuditEvent[]>(INITIAL_AUDIT_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent>(INITIAL_AUDIT_EVENTS[INITIAL_AUDIT_EVENTS.length - 1]);
  const [copiedHash, setCopiedHash] = useState(false);
  const [simulating, setSimulating] = useState(false);

  // Simulation: Autonomous Bounded Spend (< ₹500)
  const handleSimulateAutonomousSpend = () => {
    setSimulating(true);
    setTimeout(() => {
      const prev = events[events.length - 1];
      const newEvt = createNewAuditEvent(
        'RAZORPAY_PAYMENT_CAPTURED',
        245.00,
        {
          intent: 'Autonomous replenishment of 5kg Aashirvaad Atta via UPI AutoPay',
          constraintsChecked: [
            'Order Amount ₹245.00 < Autonomous Threshold ₹500.00: PASS',
            'Merchant merch_gupta_kirana_01 in Whitelist: PASS',
            'Slippage tolerance 0%: PASS'
          ],
          riskScore: 0.04,
          gatingDecision: 'AUTONOMOUS_ALLOW',
          policyBound: 'Mandate Token man_razor_npci_88291 (< ₹500 autonomous)',
          rationale: 'Executed autonomously under pre-approved NPCI UAP policy envelope.'
        },
        prev.hash,
        {
          razorpayOrderId: `order_rzp_${Date.now().toString().slice(-6)}`,
          razorpayPaymentId: `pay_rzp_${Date.now().toString().slice(-6)}`,
          merchantVpa: 'guptabazaar@icici',
          buyerVpa: 'divik.citizen@okhdfc',
          mandateRemainingINR: 1701.00
        }
      );
      setEvents((prevEvents) => [...prevEvents, newEvt]);
      setSelectedEvent(newEvt);
      setSimulating(false);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    }, 600);
  };

  // Simulation: Failure Handled Gracefully (Limit Exceeded -> Dynamic Negotiation)
  const handleSimulateGracefulFailure = () => {
    setSimulating(true);
    setTimeout(() => {
      const prev = events[events.length - 1];
      const newEvt = createNewAuditEvent(
        'FAILURE_RECOVERED_GRACEFULLY',
        1420.00,
        {
          intent: 'Buyer agent requested 5x Atta + 4x Mustard Oil (₹1,420.00)',
          constraintsChecked: [
            'Max Transaction Limit ₹1,000.00: BREACH DETECTED (₹1,420.00 > ₹1,000.00)'
          ],
          riskScore: 0.88,
          gatingDecision: 'BLOCKED',
          policyBound: 'Strict Mandate Limit: ₹1,000 per transaction cap',
          rationale: 'Guardrail prevented unauthorized overspend. Graceful recovery protocol engaged.'
        },
        prev.hash,
        {
          merchantVpa: 'guptabazaar@icici',
          buyerVpa: 'divik.citizen@okhdfc'
        },
        {
          failureCode: 'LIMIT_EXCEEDED',
          errorMessage: 'Requested ₹1,420.00 breached strict ₹1,000.00 transaction boundary.',
          gracefulResolution: 'Agent avoided execution failure: Automatically recalculated basket to 3x Atta + 2x Mustard Oil (₹965.00), fitting safely within the ₹1,000 policy envelope with 0 human intervention.'
        }
      );
      setEvents((prevEvents) => [...prevEvents, newEvt]);
      setSelectedEvent(newEvt);
      setSimulating(false);
    }, 600);
  };

  const handleCopyHash = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="w-full space-y-6 font-editorial-body">
      {/* Top Banner: Explaining The Bar */}
      <div
        className={`p-6 rounded-2xl border transition-colors duration-300 ${
          isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
        } flex flex-col md:flex-row md:items-center justify-between gap-4`}
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono border uppercase tracking-wider ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}
            >
              The Bar: Explainable, Bounded &amp; Gated
            </span>
            <span className="text-xs font-mono text-emerald-500 font-semibold">
              SHA-256 Tamper-Evident Ledger
            </span>
          </div>
          <h3 className={`text-xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
            Cryptographic Agent Audit Trail &amp; Policy Bounds
          </h3>
          <p className={`text-xs max-w-2xl leading-relaxed ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
            Every autonomous money action is cryptographically verified, bounded by user mandates, gated by policy rules, and logged with full explainability.
          </p>
        </div>

        {/* Interactive Simulation Triggers */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleSimulateAutonomousSpend}
            disabled={simulating}
            className={`px-3.5 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 ${
              isDark
                ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-white'
                : 'border-[#e7e5e4] bg-[#f5f5f5] hover:bg-[#f0efed] text-[#0c0a09]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Simulate Autonomous Spend (&lt;₹500)</span>
          </button>

          <button
            onClick={handleSimulateGracefulFailure}
            disabled={simulating}
            className="px-3.5 py-2 rounded-full border border-amber-800/80 bg-amber-950/40 hover:bg-amber-900/40 text-amber-300 text-xs font-medium transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulate Failure Handled Gracefully</span>
          </button>
        </div>
      </div>

      {/* 2-Column Workstation: Event Stream vs Deep Explainability Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Event Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-[#777169] px-1">
            <span>AUDIT EVENT STREAM ({events.length} BLOCKS)</span>
            <span>CHRONOLOGICAL</span>
          </div>

          <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
            {events.map((evt, idx) => {
              const isSelected = selectedEvent.id === evt.id;
              const isFailure = evt.eventType === 'FAILURE_RECOVERED_GRACEFULLY';
              const isGated = evt.eventType === 'BUDGET_GATE_TRIGGERED_HUMAN';

              return (
                <div
                  key={evt.id}
                  onClick={() => setSelectedEvent(evt)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? isDark
                        ? 'bg-[#292524] border-white text-white shadow-md'
                        : 'bg-white border-[#0c0a09] text-[#0c0a09] shadow-md ring-1 ring-[#0c0a09]'
                      : isDark
                      ? 'bg-[#1c1917] border-[#292524] text-[#a8a29e] hover:border-[#3f3f46]'
                      : 'bg-white border-[#e7e5e4] text-[#4e4e4e] hover:border-[#d6d3d1]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isFailure
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : isGated
                          ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {evt.eventType.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] opacity-75">
                      {new Date(evt.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-xs font-medium line-clamp-2 leading-relaxed">
                    {evt.explainabilityTrace.intent}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] font-mono border-t border-hairline/30">
                    <span>
                      {evt.amountINR > 0 ? `₹${evt.amountINR.toFixed(2)}` : 'Handshake'}
                    </span>
                    <span className="text-[10px] truncate max-w-[120px] text-text-muted">
                      {evt.hash.slice(0, 10)}...
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Explainability Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div
            className={`p-6 rounded-2xl border transition-colors duration-300 space-y-6 ${
              isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
            }`}
          >
            {/* Header with Hash & Copy */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#777169]">BLOCK #{selectedEvent.id}</span>
                  <span className="text-xs font-mono text-emerald-500 font-bold">
                    Risk Score: {(selectedEvent.explainabilityTrace.riskScore * 100).toFixed(0)}%
                  </span>
                </div>
                <h4 className={`text-lg font-display font-light mt-0.5 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  {selectedEvent.explainabilityTrace.intent}
                </h4>
              </div>

              <button
                onClick={() => handleCopyHash(selectedEvent.hash)}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors flex items-center gap-1.5 self-start sm:self-center ${
                  isDark
                    ? 'border-[#292524] bg-[#0c0a09] text-[#a8a29e] hover:text-white'
                    : 'border-[#e7e5e4] bg-[#f5f5f5] text-[#4e4e4e] hover:text-[#0c0a09]'
                }`}
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Hash Copied' : 'Copy Hash'}</span>
              </button>
            </div>

            {/* Step-by-Step Explainability Audit Trace */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase text-[#777169]">EXPLAINABILITY &amp; GATING REASONING</span>

              <div
                className={`p-4 rounded-xl border space-y-2 text-xs leading-relaxed ${
                  isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#777169]">Policy Decision:</span>
                  <span
                    className={`font-bold ${
                      selectedEvent.explainabilityTrace.gatingDecision === 'BLOCKED'
                        ? 'text-rose-500'
                        : selectedEvent.explainabilityTrace.gatingDecision === 'HUMAN_CONSENT_REQUIRED'
                        ? 'text-sky-500'
                        : 'text-emerald-500'
                    }`}
                  >
                    {selectedEvent.explainabilityTrace.gatingDecision}
                  </span>
                </div>

                <p className={isDark ? 'text-white' : 'text-[#0c0a09]'}>
                  <strong>Rationale:</strong> {selectedEvent.explainabilityTrace.rationale}
                </p>

                <div className="pt-2 border-t border-hairline/40 space-y-1 font-mono text-[11px] text-[#777169]">
                  <span className="font-semibold text-text-body">Mandate Constraints Evaluated:</span>
                  <ul className="list-disc list-inside space-y-0.5">
                    {selectedEvent.explainabilityTrace.constraintsChecked.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Graceful Failure Resolution Card (If applicable) */}
            {selectedEvent.failureContext && (
              <div className="p-4 rounded-xl border border-amber-800/80 bg-amber-950/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Failure Handled Gracefully ({selectedEvent.failureContext.failureCode})</span>
                </div>
                <p className="opacity-90">
                  <strong>Interception:</strong> {selectedEvent.failureContext.errorMessage}
                </p>
                <div className="p-2.5 rounded-lg bg-black/40 border border-amber-800/50 font-mono text-[11px] text-amber-300">
                  <strong>Autonomous Recovery:</strong> {selectedEvent.failureContext.gracefulResolution}
                </div>
              </div>
            )}

            {/* Financial Ledger & Razorpay Proof */}
            {selectedEvent.financialContext && (
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#777169]">FINANCIAL EXECUTION PROOF</span>
                <div
                  className={`p-3.5 rounded-xl border font-mono text-[11px] space-y-1.5 ${
                    isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
                  }`}
                >
                  {selectedEvent.financialContext.razorpayOrderId && (
                    <div className="flex justify-between">
                      <span>Razorpay Order ID:</span>
                      <strong className={isDark ? 'text-white' : 'text-[#0c0a09]'}>
                        {selectedEvent.financialContext.razorpayOrderId}
                      </strong>
                    </div>
                  )}
                  {selectedEvent.financialContext.razorpayPaymentId && (
                    <div className="flex justify-between">
                      <span>Razorpay Payment ID:</span>
                      <strong className="text-emerald-500">
                        {selectedEvent.financialContext.razorpayPaymentId}
                      </strong>
                    </div>
                  )}
                  {selectedEvent.financialContext.mandateRemainingINR !== undefined && (
                    <div className="flex justify-between">
                      <span>Mandate Balance Remaining:</span>
                      <strong className={isDark ? 'text-white' : 'text-[#0c0a09]'}>
                        ₹{selectedEvent.financialContext.mandateRemainingINR.toFixed(2)}
                      </strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cryptographic Hash Chain Proof */}
            <div className="pt-2 border-t border-hairline space-y-1 font-mono text-[10px] text-[#777169]">
              <div className="flex items-center justify-between">
                <span>Prev Hash: {selectedEvent.prevHash}</span>
                <span>Current Hash: {selectedEvent.hash}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
