'use client';

import React, { useState, useEffect } from 'react';
import { MultimodalRoute, SAMPLE_TRANSIT_ROUTES } from '@/lib/mock-data';
import {
  Train,
  Bus,
  Car,
  QrCode,
  AlertCircle,
  RefreshCw,
  Wifi,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Copy,
  Check,
  Volume2,
  Zap,
  Leaf,
  CreditCard,
  RotateCcw,
  Navigation,
  Compass,
  Ship,
  Sparkles,
  Ticket
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface MultimodalTicketPassProps {
  lang: 'en' | 'hi';
}

export const MultimodalTicketPass: React.FC<MultimodalTicketPassProps> = ({ lang }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [routes] = useState<MultimodalRoute[]>(SAMPLE_TRANSIT_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<MultimodalRoute>(SAMPLE_TRANSIT_ROUTES[0]);
  const [selectedCity, setSelectedCity] = useState<string>('Mumbai');
  const [isDelayed, setIsDelayed] = useState(false);
  const [turnstileState, setTurnstileState] = useState<'IDLE' | 'TAPPED_IN' | 'TRANSFERRED' | 'COMPLETED'>('IDLE');
  const [walletBalance, setWalletBalance] = useState(420.00);
  const [copiedQr, setCopiedQr] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(899); // 15 mins validity
  const [qrToken, setQrToken] = useState(`ONDC-NCMC-${Date.now().toString().slice(-8)}`);

  // QR Refresh Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 899));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const matchedRoute = routes.find((r) => r.city === city) || routes[0];
    setSelectedRoute(matchedRoute);
    setIsDelayed(false);
    setTurnstileState('IDLE');
  };

  // Play audio chime using Web Audio API
  const playTurnstileChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch (e) {
      // Audio context might be restricted before interaction
    }
  };

  const handleTapIn = () => {
    playTurnstileChime();
    setTurnstileState('TAPPED_IN');
    setWalletBalance((prev) => Math.max(0, prev - selectedRoute.totalFare));
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.6 }
    });
  };

  const handleTransfer = () => {
    playTurnstileChime();
    setTurnstileState('TRANSFERRED');
  };

  const handleTapOut = () => {
    playTurnstileChime();
    setTurnstileState('COMPLETED');
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  const handleResetTrip = () => {
    setIsDelayed(false);
    setTurnstileState('IDLE');
    setQrToken(`ONDC-NCMC-${Date.now().toString().slice(-8)}`);
    const original = routes.find((r) => r.id === selectedRoute.id) || routes[0];
    setSelectedRoute(original);
  };

  const handleSimulateDelay = () => {
    setIsDelayed(true);
    const updatedLegs = selectedRoute.legs.map((leg) => {
      if (leg.type === 'METRO') {
        return {
          ...leg,
          status: 'DELAYED' as const,
          delayMinutes: 12,
          arrivalTime: '09:10 AM'
        };
      }
      if (leg.type === 'BUS') {
        return {
          ...leg,
          agency: 'BEST City Bus (Auto-Cancelled)',
          status: 'REROUTED' as const,
          platformOrBay: 'Zero-Penalty Auto Cancellation'
        };
      }
      if (leg.type === 'AUTO_CAB') {
        return {
          ...leg,
          agency: 'Bharat Taxi EV (Priority Bay Re-assigned)',
          departureTime: '09:15 AM',
          arrivalTime: '09:28 AM',
          platformOrBay: 'Smart EV Bay #3 (Driver Notified)',
          status: 'ON_TIME' as const
        };
      }
      return leg;
    });

    setSelectedRoute({
      ...selectedRoute,
      totalDurationMinutes: selectedRoute.totalDurationMinutes + 6,
      dynamicReRouteActive: true,
      qrTicketPayload: `ONDC:MOBILITY:TICKET:${selectedRoute.compositeTicketId}:REROUTED_DELAY12M:VALID`,
      legs: updatedLegs
    });

    setQrToken(`ONDC-REROUTE-${Date.now().toString().slice(-8)}`);
  };

  const handleCopyQr = () => {
    navigator.clipboard.writeText(selectedRoute.qrTicketPayload);
    setCopiedQr(true);
    setTimeout(() => setCopiedQr(false), 2000);
  };

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full space-y-8 font-editorial-body">
      {/* Top Header Card with Atmospheric Gradient Orbs */}
      <div className={`relative p-6 sm:p-10 rounded-2xl border transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
      }`}>
        {/* Atmospheric Gradient Orbs */}
        <div className={`absolute -right-20 -top-20 w-80 h-80 rounded-full gradient-orb-sky pointer-events-none ${isDark ? 'opacity-25' : 'opacity-80'}`} />
        <div className={`absolute -left-20 -bottom-20 w-80 h-80 rounded-full gradient-orb-mint pointer-events-none ${isDark ? 'opacity-20' : 'opacity-60'}`} />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}>
                DPIIT Beckn Mobility Core
              </span>
              <span className={`text-xs font-mono ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                One Dynamic Pass for All Indian Transit
              </span>
            </div>

            <h1 className={`text-3xl sm:text-4xl font-display font-light leading-tight ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
              YatriSetu Composite Multi-Modal Pass
            </h1>

            <p className={`text-sm leading-relaxed ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
              Unifying 9 Indian Metros, BEST/BMTC/DTC city buses, Kochi Water Metro, and Bharat Taxi under a single dynamic QR ticket with zero-penalty delay auto-recovery.
            </p>
          </div>

          {/* City Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl border shrink-0">
            {['Mumbai', 'Delhi NCR', 'Bengaluru', 'Kochi'].map((city) => (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCity === city
                    ? isDark ? 'bg-white text-[#0c0a09] shadow-sm font-semibold' : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
                    : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Workstation: Left Pass & Journey / Right QR & Turnstile Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Route Breakdown, Real-Time Delay, and Cost Comparison (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Route Overview & Quick Action Buttons */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <div>
                <span className={`text-[11px] font-mono uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                  {selectedRoute.city} • Pass #{selectedRoute.compositeTicketId}
                </span>
                <h3 className={`text-xl font-display font-light mt-0.5 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  {selectedRoute.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateDelay}
                  disabled={isDelayed}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
                    isDelayed
                      ? 'bg-amber-950/40 border-amber-800 text-amber-300 cursor-default'
                      : isDark ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-white' : 'border-[#e7e5e4] bg-[#f5f5f5] hover:bg-[#f0efed] text-[#0c0a09]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isDelayed ? '⚡ 12m Delay Compensated' : 'Simulate Metro Delay'}</span>
                </button>

                <button
                  onClick={handleResetTrip}
                  className={`p-1.5 rounded-full border transition-colors ${
                    isDark ? 'border-[#292524] bg-[#0c0a09] text-[#a8a29e] hover:text-white' : 'border-[#e7e5e4] bg-[#f5f5f5] text-[#777169] hover:text-[#0c0a09]'
                  }`}
                  title="Reset Journey"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Delay Alert Notification if Triggered */}
            {isDelayed && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 animate-in slide-in-from-top duration-300 ${
                isDark ? 'bg-amber-950/40 border-amber-800 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-900'
              }`}>
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <div className="font-semibold">Beckn Dynamic Re-Route Protocol Triggered</div>
                  <p className="leading-relaxed text-[11px] opacity-90">
                    Metro Line 1 signal delay (+12m) detected at Asalpha. YatriSetu auto-cancelled connecting BEST bus at ₹0 fee and auto-reserved <strong>Bharat Taxi EV Smart Bay #3</strong> without interrupting your composite QR ticket.
                  </p>
                </div>
              </div>
            )}

            {/* Step-by-Step Multi-Leg Timeline */}
            <div className="space-y-4 pt-2">
              <span className={`text-xs font-mono uppercase ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                Integrated Journey Manifest (3 Connected Legs)
              </span>

              <div className="space-y-3">
                {selectedRoute.legs.map((leg, index) => {
                  const getIcon = () => {
                    if (leg.type === 'METRO') return <Train className="w-4 h-4 text-sky-500" />;
                    if (leg.type === 'BUS') return <Bus className="w-4 h-4 text-emerald-500" />;
                    if (leg.type === 'FERRY') return <Ship className="w-4 h-4 text-cyan-500" />;
                    if (leg.type === 'AUTO_CAB') return <Car className="w-4 h-4 text-amber-500" />;
                    return <Navigation className="w-4 h-4 text-[#777169]" />;
                  };

                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all space-y-2 ${
                        isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-1.5 rounded-lg ${isDark ? 'bg-[#1c1917]' : 'bg-white'}`}>
                            {getIcon()}
                          </div>
                          <div>
                            <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                              {leg.agency} • {leg.routeCode}
                            </div>
                            <div className={`text-[11px] ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                              {leg.from} ➔ {leg.to}
                            </div>
                          </div>
                        </div>

                        <div className="text-right font-mono">
                          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                            ₹{leg.fare.toFixed(2)}
                          </span>
                          <div className="text-[10px] text-emerald-500">
                            {leg.durationMinutes} mins
                          </div>
                        </div>
                      </div>

                      {leg.platformOrBay && (
                        <div className={`pt-2 border-t text-[11px] font-mono flex items-center justify-between ${
                          isDark ? 'border-[#292524] text-[#78716c]' : 'border-[#e7e5e4] text-[#777169]'
                        }`}>
                          <span>Gate / Platform: <strong>{leg.platformOrBay}</strong></span>
                          <span className={leg.status === 'DELAYED' ? 'text-amber-500 font-semibold' : 'text-emerald-500'}>
                            {leg.status === 'DELAYED' ? `+${leg.delayMinutes}m Delay` : 'On Schedule'}
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Economic & Environmental Savings Matrix */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-3 text-xs ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Citizen Commute Comparison Matrix
              </span>
              <span className="text-[11px] font-mono text-emerald-500 font-semibold">
                Net Savings: ₹285.00 (84%)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-emerald-800/80 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
              }`}>
                <div className="text-[10px] uppercase font-bold text-emerald-500">KUBRA YATRISETU</div>
                <div className="text-xl font-bold">₹{selectedRoute.totalFare}.00</div>
                <div className="text-[11px] opacity-90">{selectedRoute.totalDurationMinutes} mins • 1 Dynamic Pass</div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
              }`}>
                <div className="text-[10px] uppercase text-[#78716c]">UBER / OLA CAB</div>
                <div className="text-xl font-bold text-rose-500">₹340.00</div>
                <div className="text-[11px]">58 mins (Traffic) • Surge Tax</div>
              </div>

              <div className={`p-3.5 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
              }`}>
                <div className="text-[10px] uppercase text-[#78716c]">SEPARATE TICKETS</div>
                <div className="text-xl font-bold">₹75.00</div>
                <div className="text-[11px]">+22 mins in 3 Ticket Queues</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Live Dynamic QR Ticket Pass & Interactive Turnstile Tap Engine (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real Dynamic QR Ticket Card */}
          <div className={`p-6 sm:p-8 rounded-2xl border transition-colors duration-300 text-center space-y-5 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="space-y-1">
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border uppercase ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}>
                Turnstile Gate Cryptographic Pass
              </span>
              <h4 className={`text-lg font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                {selectedRoute.city} Composite QR Token
              </h4>
              <p className={`text-[11px] font-mono ${isDark ? 'text-[#78716c]' : 'text-[#777169]'}`}>
                Token: {qrToken} • Auto-refresh in {formatCountdown(countdownSeconds)}
              </p>
            </div>

            {/* High-Resolution Dynamic SVG QR Code */}
            <div className="p-4 bg-white rounded-2xl border border-[#e7e5e4] shadow-sm max-w-[220px] mx-auto flex items-center justify-center">
              <QRCodeSVG
                value={selectedRoute.qrTicketPayload}
                size={190}
                level="H"
                includeMargin={false}
              />
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleCopyQr}
                className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                  isDark ? 'border-[#292524] bg-[#0c0a09] text-[#a8a29e] hover:text-white' : 'border-[#e7e5e4] bg-[#f5f5f5] text-[#4e4e4e] hover:text-[#0c0a09]'
                }`}
              >
                {copiedQr ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedQr ? 'Copied' : 'Copy Raw Token'}</span>
              </button>
            </div>

            {/* Interactive Turnstile Gate Tap Simulator */}
            <div className={`p-4 rounded-xl border text-left space-y-3 ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}>
              <div className="flex items-center justify-between text-xs">
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  Live Gate Tap Simulator
                </span>
                <span className="font-mono text-[11px] text-emerald-500">
                  {turnstileState === 'IDLE' && 'Ready at Origin Turnstile'}
                  {turnstileState === 'TAPPED_IN' && 'Gate Opened • In Transit'}
                  {turnstileState === 'TRANSFERRED' && 'Transfer Authorized'}
                  {turnstileState === 'COMPLETED' && 'Journey Completed ✓'}
                </span>
              </div>

              {turnstileState === 'IDLE' && (
                <button
                  onClick={handleTapIn}
                  className={`w-full py-2.5 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Tap In at Origin Station (Gate 4)</span>
                </button>
              )}

              {turnstileState === 'TAPPED_IN' && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Metro Gate 4 Opened • Balance: ₹{walletBalance.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={handleTransfer}
                    className={`w-full py-2 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 ${
                      isDark ? 'bg-[#292524] hover:bg-[#3f3f46] text-white' : 'bg-white hover:bg-[#e7e5e4] text-[#0c0a09] border border-[#e7e5e4]'
                    }`}
                  >
                    <span>Tap Transfer at Connecting Interchange</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {turnstileState === 'TRANSFERRED' && (
                <button
                  onClick={handleTapOut}
                  className={`w-full py-2.5 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tap Out at Destination &amp; Complete</span>
                </button>
              )}

              {turnstileState === 'COMPLETED' && (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-mono flex items-center justify-between">
                    <span>Trip Cleared • 0 Penalties</span>
                    <span className="font-bold">+40 Green Pts</span>
                  </div>
                  <button
                    onClick={handleResetTrip}
                    className={`w-full py-2 rounded-full text-xs font-medium transition-all ${
                      isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
                    }`}
                  >
                    Book Return Pass
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Rupay NCMC Smart Wallet Integration */}
          <div className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
          }`}>
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-500" />
                <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  RuPay NCMC Smart Mobility Wallet
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-500 font-bold">
                Balance: ₹{walletBalance.toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setWalletBalance((prev) => prev + 100);
                  confetti({ particleCount: 30, spread: 40, origin: { y: 0.8 } });
                }}
                className={`flex-1 py-2 rounded-full border text-xs font-medium transition-colors ${
                  isDark ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-[#a8a29e]' : 'border-[#e7e5e4] bg-[#f5f5f5] hover:bg-[#f0efed] text-[#4e4e4e]'
                }`}
              >
                +₹100 Auto-Reload
              </button>
              <button
                onClick={() => {
                  setWalletBalance((prev) => prev + 500);
                  confetti({ particleCount: 40, spread: 50, origin: { y: 0.8 } });
                }}
                className={`flex-1 py-2 rounded-full border text-xs font-medium transition-colors ${
                  isDark ? 'border-[#292524] bg-[#0c0a09] hover:bg-[#292524] text-[#a8a29e]' : 'border-[#e7e5e4] bg-[#f5f5f5] hover:bg-[#f0efed] text-[#4e4e4e]'
                }`}
              >
                +₹500 via UPI
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
