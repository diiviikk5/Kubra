'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DisputeCase, SAMPLE_DISPUTES } from '@/lib/mock-data';
import {
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  RefreshCw,
  FileText,
  ArrowRight,
  Zap,
  Scale,
  Check,
  AlertTriangle,
  Camera,
  Upload,
  Activity,
  Receipt,
  Download,
  Lock,
  RotateCcw,
  Sparkles,
  Eye,
  Crosshair
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface DisputeEvidenceAuditorProps {
  lang: 'en' | 'hi';
}

export const DisputeEvidenceAuditor: React.FC<DisputeEvidenceAuditorProps> = ({ lang }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [disputes] = useState<DisputeCase[]>(SAMPLE_DISPUTES);
  const [selectedCase, setSelectedCase] = useState<DisputeCase>(SAMPLE_DISPUTES[0]);
  const [auditState, setAuditState] = useState<'IDLE' | 'ANALYZING' | 'RESOLVED'>('IDLE');
  const [countdown, setCountdown] = useState(60);
  const [refundTxnId, setRefundTxnId] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // 60-Second Real-Time Countdown State Machine
  useEffect(() => {
    let timer: any;
    if (auditState === 'ANALYZING' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 40); // Fast simulation (~2.4s total)
    } else if (auditState === 'ANALYZING' && countdown <= 0) {
      setAuditState('RESOLVED');
      const generatedTxn = `NPCI-REV-${Date.now().toString().slice(-8)}`;
      setRefundTxnId(generatedTxn);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
    return () => clearInterval(timer);
  }, [auditState, countdown]);

  const handleStartAudit = () => {
    setAuditState('ANALYZING');
    setCountdown(60);
  };

  const handleReset = () => {
    setAuditState('IDLE');
    setCountdown(60);
    setRefundTxnId(null);
    setCapturedPhoto(null);
    stopCamera();
  };

  const handleCaseChange = (c: DisputeCase) => {
    setSelectedCase(c);
    setAuditState('IDLE');
    setCountdown(60);
    setRefundTxnId(null);
    setCapturedPhoto(null);
    stopCamera();
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (e) {
      setIsCameraActive(false);
      // Fallback to sample photo
      setCapturedPhoto(selectedCase.sampleEvidenceImage);
    }
  };

  const capturePhotoFromCamera = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        setCapturedPhoto(canvas.toDataURL('image/jpeg'));
      }
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  return (
    <div className="w-full space-y-8 font-editorial-body">
      {/* Top Hero Banner with Atmospheric Lavender Orb */}
      <div className={`relative p-6 sm:p-10 rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
      }`}>
        {/* Atmospheric Gradient Orbs */}
        <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full gradient-orb-lavender pointer-events-none ${isDark ? 'opacity-25' : 'opacity-80'}`} />
        <div className={`absolute -left-20 -bottom-20 w-80 h-80 rounded-full gradient-orb-rose pointer-events-none ${isDark ? 'opacity-20' : 'opacity-60'}`} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}>
                DPIIT Beckn Auto-IGM Rail
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                Instant UPI Escrow Reversal
              </span>
            </div>

            <h1 className={`text-3xl sm:text-4xl font-display font-light leading-tight ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
              60-Second Auto-IGM Escrow Auditor
            </h1>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
              Cross-matching unboxing image forensics with courier IoT telemetry sensors to resolve grievances in 60 seconds—eliminating the 14-day multi-party dispute black hole.
            </p>
          </div>

          {/* Dispute Case Switcher Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border shrink-0">
            {disputes.map((c, i) => (
              <button
                key={c.orderId}
                onClick={() => handleCaseChange(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCase.orderId === c.orderId
                    ? isDark ? 'bg-white text-[#0c0a09] shadow-sm font-semibold' : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
                    : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
                }`}
              >
                Case #{i + 1}: {c.itemTitle.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Workstation: Left Telemetry & Forensics / Right 60s Escrow Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Order Details, IoT Telemetry, and Visual Forensics HUD (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Order & Incident Manifest Card */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className={`text-[11px] font-mono uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                  Order #{selectedCase.orderId} • {selectedCase.orderDate}
                </span>
                <h3 className={`text-xl font-display font-light mt-0.5 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  {selectedCase.itemTitle}
                </h3>
              </div>
              <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border font-semibold ${
                isDark ? 'bg-rose-950/40 text-rose-300 border-rose-800' : 'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                {selectedCase.issueType.replace('_', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'}`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>SELLER</span>
                <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>{selectedCase.sellerName}</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'}`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>CARRIER</span>
                <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>{selectedCase.logisticsPartner}</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'}`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>TOTAL ORDER</span>
                <div className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>₹{selectedCase.orderAmount}.00</div>
              </div>
              <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-[#0c0a09] border-emerald-800/80 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-900'}`}>
                <span className="text-[10px] uppercase text-emerald-500 font-bold">ESCROW CLAIM</span>
                <div className="font-bold text-emerald-500">₹{selectedCase.refundAmount}.00</div>
              </div>
            </div>
          </div>

          {/* Visual Forensics HUD & Real Camera Stream */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-emerald-500" />
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  Evidence Optical Verification HUD
                </span>
              </div>

              <div className="flex items-center gap-2">
                {!isCameraActive && (
                  <button
                    onClick={startCamera}
                    className={`px-3 py-1 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      isDark ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-white' : 'border-[#e7e5e4] bg-[#f5f5f5] hover:bg-[#f0efed] text-[#0c0a09]'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Open Live Camera</span>
                  </button>
                )}
                {isCameraActive && (
                  <button
                    onClick={capturePhotoFromCamera}
                    className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                    <span>Snap Evidence Frame</span>
                  </button>
                )}
              </div>
            </div>

            {/* Live Camera View or Visual Preview */}
            <div className={`relative aspect-[16/9] rounded-xl overflow-hidden border flex items-center justify-center ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}>
              {isCameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={capturedPhoto || selectedCase.sampleEvidenceImage}
                  alt="Forensic Evidence"
                  className="w-full h-full object-cover opacity-90"
                />
              )}

              {/* HUD Bounding Box Overlay */}
              <div className="absolute inset-4 border border-emerald-500/50 rounded-lg pointer-events-none flex flex-col justify-between p-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm max-w-fit">
                  <span>AI FORENSICS: SEAL BREACH 99.4% CONFIDENCE</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                  <span>PACKAGING INTEGRITY: COMPROMISED</span>
                  <span>TIME: 19:42:10 IST</span>
                </div>
              </div>
            </div>
          </div>

          {/* IoT Courier Telemetry Stream */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-sky-500" />
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  Shadowfax FleetConnect IoT Telemetry Verification
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                Sensor Sync: OK
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>WEIGHT AT PICKUP</span>
                <div className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  {selectedCase.telemetryLog.dispatchWeightKg} kg
                </div>
                <div className="text-[10px] text-emerald-500">Gross Dispatch Checked</div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>WEIGHT AT DELIVERY</span>
                <div className="text-lg font-bold text-rose-500">
                  {selectedCase.telemetryLog.deliveredWeightKg} kg
                </div>
                <div className="text-[10px] text-rose-500 font-semibold">-395g Liquid Loss Detected</div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}>
                <span className={`text-[10px] uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>SHOCK IMPACT SENSOR</span>
                <div className="text-lg font-bold text-amber-500">
                  {selectedCase.telemetryLog.transitShockEventG}G Event
                </div>
                <div className="text-[10px] text-amber-500">Speed-breaker G-force Spike</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 60-Second Escrow Resolution Engine & Receipt (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Smart Escrow Countdown & Trigger Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-colors duration-300 space-y-5 text-center ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="space-y-1">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}>
                ONDC Autonomous IGM Escrow
              </span>
              <h4 className={`text-xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Statutory Auto-Settlement
              </h4>
              <p className={`text-xs ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                {selectedCase.statutoryClause}
              </p>
            </div>

            {/* Circular / Progress Timer Display */}
            <div className={`p-6 rounded-2xl border text-center space-y-2 ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}>
              <div className="text-4xl font-display font-light text-emerald-500">
                {auditState === 'IDLE' && '60.00s'}
                {auditState === 'ANALYZING' && `${countdown.toString().padStart(2, '0')}.00s`}
                {auditState === 'RESOLVED' && '00.00s ✓'}
              </div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                {auditState === 'IDLE' && 'Escrow Locked in Zurich Kotak Pool'}
                {auditState === 'ANALYZING' && 'Cross-Matching Telemetry & Vision...'}
                {auditState === 'RESOLVED' && '₹142.00 Credited to Citizen UPI'}
              </div>
            </div>

            {/* Action Trigger Buttons */}
            {auditState === 'IDLE' && (
              <button
                onClick={handleStartAudit}
                className={`w-full py-3 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span>Trigger 60s Autonomous Dispute Resolution</span>
              </button>
            )}

            {auditState === 'ANALYZING' && (
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-center gap-2 text-emerald-500">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Beckn /issue Payload...</span>
                </div>
              </div>
            )}

            {auditState === 'RESOLVED' && (
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-mono space-y-1 text-left">
                  <div className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Dispute Resolved in 60s (0 Human Calls)</span>
                  </div>
                  <div className="text-[11px]">Txn Reference: {refundTxnId}</div>
                  <div className="text-[11px]">Liability Allocated: <strong>Shadowfax Logistics</strong> (Transit Impact)</div>
                </div>

                <button
                  onClick={handleReset}
                  className={`w-full py-2.5 rounded-full text-xs font-medium transition-all ${
                    isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
                  }`}
                >
                  Audit Another Incident
                </button>
              </div>
            )}
          </div>

          {/* Zurich Kotak Sachet Insurance Certificate Card */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-3 text-xs font-mono ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between border-b pb-2">
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Micro-Sachet Insurance Certificate
              </span>
              <span className="text-emerald-500 font-bold">Active</span>
            </div>

            <div className="space-y-1 text-[11px] text-[#777169]">
              <div className="flex justify-between">
                <span>Policy ID:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>{selectedCase.sachetInsuranceId}</span>
              </div>
              <div className="flex justify-between">
                <span>Underwriter:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>{selectedCase.insurer}</span>
              </div>
              <div className="flex justify-between">
                <span>Micro-Premium:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>₹1.50 / delivery run</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
