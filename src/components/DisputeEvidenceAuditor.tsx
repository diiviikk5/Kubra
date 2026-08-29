'use client';

import React, { useState, useEffect } from 'react';
import { DisputeCase, SAMPLE_DISPUTES } from '@/lib/mock-data';
import { ShieldCheck, AlertOctagon, CheckCircle2, RefreshCw, FileText, ArrowRight, Zap, Scale, Check, AlertTriangle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface DisputeEvidenceAuditorProps {
  lang: 'en' | 'hi';
}

export const DisputeEvidenceAuditor: React.FC<DisputeEvidenceAuditorProps> = ({ lang }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedCase, setSelectedCase] = useState<DisputeCase>(SAMPLE_DISPUTES[0]);
  const [resolutionStatus, setResolutionStatus] = useState<'PENDING' | 'ANALYZING' | 'RESOLVED'>('PENDING');
  const [timerSeconds, setTimerSeconds] = useState(60);
  const [refundTxnId, setRefundTxnId] = useState<string | null>(null);

  useEffect(() => {
    let interval: any;
    if (resolutionStatus === 'ANALYZING' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 40); // fast simulation
    } else if (resolutionStatus === 'ANALYZING' && timerSeconds <= 0) {
      setResolutionStatus('RESOLVED');
      const generatedTxn = `UPI-REV-${Date.now().toString().slice(-8)}`;
      setRefundTxnId(generatedTxn);
      confetti({
        particleCount: 80,
        spread: 70,
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
      <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
              isDark ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'
            }`}>
              Auto-IGM Resolution Protocol
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Beckn Issue &amp; Grievance v1.0</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold mt-1">
            {selectedCase.itemTitle} (Order #{selectedCase.orderId.split('-')[3]})
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {resolutionStatus === 'PENDING' ? (
            <button
              onClick={handleStartAudit}
              className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
              }`}
            >
              Start 60s Auto-Audit
            </button>
          ) : resolutionStatus === 'ANALYZING' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-amber-800/60 bg-amber-950/30 text-xs font-mono text-amber-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing ({timerSeconds}s)</span>
            </div>
          ) : (
            <button
              onClick={handleReset}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
              }`}
            >
              Reset Simulation
            </button>
          )}
        </div>
      </div>

      {/* Forensic Evidence Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Unboxing Evidence Photo */}
        <div className="lg:col-span-6 flex flex-col">
          <div className={`p-4 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-4`}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
              <div
                className="w-full h-full bg-cover bg-center filter brightness-90 contrast-105"
                style={{ backgroundImage: `url(${selectedCase.sampleEvidenceImage})` }}
              ></div>

              {/* Bounding Box Overlay */}
              <div className="absolute inset-x-6 top-10 bottom-10 border-2 border-dashed border-rose-500 bg-rose-500/10 rounded-xl p-3 flex flex-col justify-between">
                <span className="px-2 py-0.5 rounded bg-zinc-950/90 text-rose-400 font-mono text-[10px] font-bold border border-rose-800 self-start">
                  ⚠️ Liquid Leakage Detected (99.4% Match)
                </span>
                <span className="text-[10px] font-mono text-zinc-400 self-end bg-zinc-950/90 px-2 py-0.5 rounded">
                  SKU: Fortune Mustard Oil 1L
                </span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-semibold">Citizen Complaint Summary:</div>
              <p className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>&quot;{selectedCase.description}&quot;</p>
            </div>
          </div>
        </div>

        {/* Right Col: Automated Telemetry & Settlement Engine */}
        <div className="lg:col-span-6 space-y-4">
          <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-4`}>
            <div className="font-bold text-sm flex items-center justify-between">
              <span>Automated Telemetry Cross-Match</span>
              <span className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Hub IoT Sensors
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Package Weight at Dispatch</span>
                <span className="font-mono font-bold">5.24 kg</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Package Weight at Delivery</span>
                <span className="font-mono font-bold text-rose-400">4.85 kg (-39% loss delta)</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Transit Shock Telemetry</span>
                <span className="font-mono font-bold text-rose-400">4.8G Impact recorded at Hub</span>
              </div>

              <div className={`p-3 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} flex justify-between items-center`}>
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Sachet Insurance Active</span>
                <span className="font-mono font-bold text-emerald-500">Zurich Kotak Escrow Protection</span>
              </div>
            </div>

            {/* Resolution Banner */}
            {resolutionStatus === 'RESOLVED' && (
              <div className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-300 ${
                isDark ? 'bg-emerald-950/30 border-emerald-800/60' : 'bg-emerald-50 border-emerald-300'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span className="font-bold text-xs text-emerald-500">Auto-Refund Executed</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-500">₹{selectedCase.refundAmount}.00 Refunded</span>
                </div>
                <div className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Transaction Ref: <strong>{refundTxnId}</strong> • Amount credited to citizen UPI ID.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
