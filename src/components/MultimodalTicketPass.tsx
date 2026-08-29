'use client';

import React, { useState } from 'react';
import { MultimodalRoute, SAMPLE_TRANSIT_ROUTES } from '@/lib/mock-data';
import { Train, Bus, Car, QrCode, AlertCircle, RefreshCw, Wifi, CheckCircle2, Clock, ArrowRight, ShieldCheck, MapPin, Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface MultimodalTicketPassProps {
  lang: 'en' | 'hi';
}

export const MultimodalTicketPass: React.FC<MultimodalTicketPassProps> = ({ lang }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedRoute, setSelectedRoute] = useState<MultimodalRoute>(SAMPLE_TRANSIT_ROUTES[0]);
  const [isDelayed, setIsDelayed] = useState(false);
  const [ticketActivated, setTicketActivated] = useState(false);
  const [copiedQr, setCopiedQr] = useState(false);

  const handleSimulateDelay = () => {
    setIsDelayed(true);
    const updatedLegs = selectedRoute.legs.map((leg) => {
      if (leg.type === 'METRO') {
        return {
          ...leg,
          status: 'DELAYED' as const,
          delayMinutes: 8,
          arrivalTime: '09:06 AM'
        };
      }
      if (leg.type === 'BUS') {
        return {
          ...leg,
          departureTime: '09:12 AM',
          arrivalTime: '09:27 AM',
          platformOrBay: 'Bay #4 (Auto-Shifted to Next Slot)'
        };
      }
      if (leg.type === 'AUTO_CAB') {
        return {
          ...leg,
          departureTime: '09:30 AM',
          arrivalTime: '09:38 AM',
          platformOrBay: 'Smart Bay Alpha (Driver Auto-Notified)'
        };
      }
      return leg;
    });

    setSelectedRoute({
      ...selectedRoute,
      totalDurationMinutes: selectedRoute.totalDurationMinutes + 8,
      dynamicReRouteActive: true,
      qrTicketPayload: 'ONDC:MOBILITY:TICKET:MM-PASS-2026-99120:REROUTED_DELAY8M:VALID',
      legs: updatedLegs
    });
  };

  const handleResetSchedule = () => {
    setIsDelayed(false);
    setSelectedRoute(SAMPLE_TRANSIT_ROUTES[0]);
  };

  const handleActivateTicket = () => {
    setTicketActivated(true);
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const handleCopyQrPayload = () => {
    navigator.clipboard.writeText(selectedRoute.qrTicketPayload);
    setCopiedQr(true);
    setTimeout(() => setCopiedQr(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Route Selector Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl border ${
        isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
              isDark ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'
            }`}>
              ONDC Mobility Rails
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              9 Metros • 21 Bus Transit Bodies
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold mt-1">{selectedRoute.title}</h3>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {isDelayed ? (
            <button
              onClick={handleResetSchedule}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
              }`}
            >
              Reset Schedule
            </button>
          ) : (
            <button
              onClick={handleSimulateDelay}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-amber-400' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-amber-700'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Simulate Metro Delay (+8m)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Ticket Pass Card & Journey Legs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: The 1-QR Dynamic Ticket Pass */}
        <div className="lg:col-span-5 flex flex-col">
          <div className={`p-6 rounded-2xl border ${
            isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
          } flex flex-col justify-between space-y-5`}>
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    YatriSetu Composite Pass
                  </span>
                  <div className="text-lg font-extrabold">{selectedRoute.compositeTicketId}</div>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${
                  selectedRoute.dynamicReRouteActive
                    ? isDark ? 'bg-amber-950/40 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-800 border-amber-300'
                    : isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                }`}>
                  {selectedRoute.dynamicReRouteActive ? 'Auto-Re-Routed' : 'Active Pass'}
                </div>
              </div>

              {/* Dynamic QR Display */}
              <div className="flex flex-col items-center justify-center my-6">
                <div className="p-3.5 bg-white rounded-2xl border border-zinc-300 shadow-md">
                  <QRCodeSVG
                    value={selectedRoute.qrTicketPayload}
                    size={180}
                    level="H"
                    includeMargin={false}
                  />
                </div>
                <div className="flex items-center gap-2 mt-3 text-xs font-mono">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Gate Scan Valid: 9 Metros</span>
                  <button
                    onClick={handleCopyQrPayload}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedQr ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedQr ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Route Summary Details */}
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2 text-xs`}>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Origin Station</span>
                  <span className="font-semibold">{selectedRoute.from}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Destination</span>
                  <span className="font-semibold">{selectedRoute.to}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Total Fare Paid</span>
                  <span className="font-bold text-sm">₹{selectedRoute.totalFare}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Carbon Saved</span>
                  <span className="font-semibold text-emerald-500">{selectedRoute.carbonSavedKg} kg CO₂</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleActivateTicket}
              className={`w-full py-3 rounded-xl font-bold text-xs transition-all ${
                ticketActivated
                  ? 'bg-emerald-600 text-white cursor-default'
                  : isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
              }`}
            >
              {ticketActivated ? '✓ Pass Ready for Turnstile Scan' : 'Tap to Activate at Gate'}
            </button>
          </div>
        </div>

        {/* Right Column: Multimodal Leg Details */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">
              Multimodal Journey Breakdown
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Total Time: {selectedRoute.totalDurationMinutes} mins
            </span>
          </div>

          <div className="space-y-3">
            {selectedRoute.legs.map((leg, index) => {
              const isMetro = leg.type === 'METRO';
              const isBus = leg.type === 'BUS';
              const isCab = leg.type === 'AUTO_CAB';

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
                  } space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg border ${
                        isMetro
                          ? isDark ? 'bg-blue-950/40 text-blue-400 border-blue-800' : 'bg-blue-50 text-blue-700 border-blue-300'
                          : isBus
                          ? isDark ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800' : 'bg-emerald-50 text-emerald-700 border-emerald-300'
                          : isDark ? 'bg-amber-950/40 text-amber-400 border-amber-800' : 'bg-amber-50 text-amber-700 border-amber-300'
                      }`}>
                        {isMetro ? <Train className="w-4 h-4" /> : isBus ? <Bus className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="font-bold text-xs">{leg.agency}</div>
                        <div className={`text-[11px] font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {leg.routeCode}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold font-mono">
                        {leg.departureTime} ➔ {leg.arrivalTime}
                      </div>
                      <div className={`text-[11px] ${leg.status === 'DELAYED' ? 'text-amber-500 font-bold' : isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {leg.status === 'DELAYED' ? `+${leg.delayMinutes}m delay recorded` : `${leg.durationMinutes} mins • ₹${leg.fare}`}
                      </div>
                    </div>
                  </div>

                  <div className={`pt-2 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-100'} flex items-center justify-between text-[11px]`}>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{leg.from} ➔ {leg.to}</span>
                    </div>
                    {leg.platformOrBay && (
                      <span className={`font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        {leg.platformOrBay}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
