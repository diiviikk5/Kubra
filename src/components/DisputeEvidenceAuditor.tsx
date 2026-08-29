'use client';

import React, { useState, useEffect } from 'react';
import { DisputeCase, SAMPLE_DISPUTES } from '@/lib/mock-data';
import { ShieldCheck, AlertOctagon, CheckCircle2, RefreshCw, Sparkles, FileText, ArrowRight, Zap, Scale } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DisputeEvidenceAuditorProps {
  lang: 'en' | 'hi';
}

export const DisputeEvidenceAuditor: React.FC<DisputeEvidenceAuditorProps> = ({ lang }) => {
  const [selectedCase, setSelectedCase] = useState<DisputeCase>(SAMPLE_DISPUTES[0]);
  const [resolutionStatus, setResolutionStatus] = useState<'PENDING' | 'ANALYZING' | 'RESOLVED'>('PENDING');
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [refundTxnId, setRefundTxnId] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (resolutionStatus === 'ANALYZING' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 50); // fast simulation (3 seconds real time)
    } else if (resolutionStatus === 'ANALYZING' && timerSeconds <= 0) {
      setResolutionStatus('RESOLVED');
      const generatedTxn = `UPI-REV-${Date.now().toString().slice(-8)}`;
      setRefundTxnId(generatedTxn);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
    return () => clearInterval(interval);
  }, [resolutionStatus, timerSeconds]);

  const handleStartAudit = () => {
    setResolutionStatus('ANALYZING');
    setTimerSeconds(60);
  };

  const handleReset = () => {
    setResolutionStatus('PENDING');
    setTimerSeconds(60);
    setRefundTxnId(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-mono font-semibold">
              Auto-IGM Resolution Protocol
            </span>
            <span className="text-xs text-slate-400 font-mono">Beckn Issue & Grievance v1.0</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">
            {selectedCase.itemTitle} (Order #{selectedCase.orderId.split('-')[3]})
          </h3>
        </div>

        {/* Dispute Case Switcher */}
        <div className="flex items-center gap-2">
          {SAMPLE_DISPUTES.map((dCase) => (
            <button
              key={dCase.orderId}
              onClick={() => {
                setSelectedCase(dCase);
                handleReset();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCase.orderId === dCase.orderId
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {dCase.issueType === 'DAMAGED_IN_TRANSIT' ? 'Oil Spillage Case' : 'Tampered Earphones Case'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Forensic Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Unboxing Evidence Image with AI Vision Annotation Overlay */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 border border-slate-700/80 shadow-2xl group">
            <div
              className="w-full h-full bg-cover bg-center filter brightness-90 contrast-110"
              style={{ backgroundImage: `url(${selectedCase.sampleEvidenceImage})` }}
            ></div>

            {/* AI Vision Bounding Box Overlay */}
            <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-dashed border-rose-400 bg-rose-500/15 rounded-xl p-3 flex flex-col justify-between shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-950/90 text-rose-300 font-mono text-[10px] font-bold border border-rose-500/40">
                  ⚠️ Liquid Ingress & Cardboard Saturation (99.4%)
                </span>
                <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-extrabold">
                  CRITICAL DEFECT
                </span>
              </div>
              <div className="bg-slate-950/90 p-2 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300">
                Puncture Location: Bottom-Left Seal • Fluid Viscosity: Edible Oil
              </div>
            </div>

            {/* Top Watermark */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>CITIZEN UNBOXING PHOTO • FORENSIC AI AUDITED</span>
            </div>
          </div>

          {/* Telemetry Match Box */}
          <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-2">
              <span className="text-white font-bold">In-Transit IoT Telemetry Cross-Check</span>
              <span className="text-emerald-400 font-semibold">Sensor Matched</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500">Dispatch Weight:</span>{' '}
                <span className="text-slate-200">{selectedCase.telemetryLog.dispatchWeightKg} kg</span>
              </div>
              <div>
                <span className="text-slate-500">Delivered Weight:</span>{' '}
                <span className="text-rose-400 font-bold">{selectedCase.telemetryLog.deliveredWeightKg} kg (-39%)</span>
              </div>
              <div>
                <span className="text-slate-500">Shock Sensor Event:</span>{' '}
                <span className="text-amber-400 font-bold">{selectedCase.telemetryLog.transitShockEventG}G (Drop Detected)</span>
              </div>
              <div>
                <span className="text-slate-500">Hub Tamper Seal:</span>{' '}
                <span className="text-emerald-400">Intact at Dispatch</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Autonomous IGM Settlement Engine */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-400" />
                <h4 className="font-bold text-white text-sm">Multi-Party Beckn Arbitration</h4>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Confidence: {selectedCase.settlementConfidence}%
              </span>
            </div>

            {/* Attribution Breakdown */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Complainant:</span>
                <span className="text-white font-medium">Citizen (Rohan V.)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seller NP:</span>
                <span className="text-slate-300">{selectedCase.sellerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Logistics Partner:</span>
                <span className="text-slate-300">{selectedCase.logisticsPartner}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sachet Insurer:</span>
                <span className="text-blue-400 font-mono">{selectedCase.insurer}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800 text-amber-400 font-bold">
                <span>Fault Attribution:</span>
                <span>{selectedCase.faultAttribution} (100% Transit Impact)</span>
              </div>
            </div>

            {/* Resolution Progress Bar / States */}
            {resolutionStatus === 'PENDING' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Normally on ONDC, this dispute takes 10–14 days of back-and-forth emails between the buyer app, seller, and courier. ONDC BharatOS resolves it in <strong>under 60 seconds</strong> using multimodal evidence matching and sachet insurance escrow.
                </p>
                <button
                  onClick={handleStartAudit}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
                >
                  <Zap className="w-4 h-4" />
                  <span>Execute 60-Second Auto-IGM Refund (₹{selectedCase.orderAmount})</span>
                </button>
              </div>
            )}

            {resolutionStatus === 'ANALYZING' && (
              <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/40 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-blue-400 text-xs font-mono font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Executing Beckn /issue Protocol & Sachet Reversal...</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full transition-all duration-75"
                    style={{ width: `${((60 - timerSeconds) / 60) * 100}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Autonomous Arbitration Timer: <span className="text-amber-400 font-bold">{timerSeconds}s remaining</span>
                </div>
              </div>
            )}

            {resolutionStatus === 'RESOLVED' && (
              <div className="p-4 rounded-xl bg-gradient-to-b from-emerald-950/80 to-slate-950 border-2 border-emerald-500/80 space-y-3 animate-in zoom-in-95">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Dispute Settled & ₹{selectedCase.orderAmount} Refunded via UPI</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span>UPI Reversal Txn:</span>
                    <span className="text-emerald-300 font-bold">{refundTxnId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payer Account:</span>
                    <span className="text-slate-400">Zurich-Kotak Sachet Escrow VPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Statutory Order:</span>
                    <span className="text-amber-400">Beckn IGM #8812-RESOLVED</span>
                  </div>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Test Another Dispute Case
                </button>
              </div>
            )}
          </div>

          {/* Value Note for Judges */}
          <div className="mt-4 p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-slate-300">
            <span className="font-bold text-blue-300">Why this creates consumer trust:</span> In decentralized networks, lack of accountability destroys consumer retention. Autonomous IGM gives citizens the same instant trust as Amazon while protecting sellers with micro-insurance.
          </div>
        </div>
      </div>
    </div>
  );
};
