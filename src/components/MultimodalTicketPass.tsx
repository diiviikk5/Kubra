'use client';

import React, { useState } from 'react';
import { MultimodalRoute, SAMPLE_TRANSIT_ROUTES } from '@/lib/mock-data';
import { Train, Bus, Car, QrCode, AlertCircle, RefreshCw, Wifi, WifiOff, CheckCircle2, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultimodalTicketPassProps {
  lang: 'en' | 'hi';
}

export const MultimodalTicketPass: React.FC<MultimodalTicketPassProps> = ({ lang }) => {
  const [selectedRoute, setSelectedRoute] = useState<MultimodalRoute>(SAMPLE_TRANSIT_ROUTES[0]);
  const [isDelayed, setIsDelayed] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [ticketActivated, setTicketActivated] = useState(false);

  const handleSimulateDelay = () => {
    setIsDelayed(true);
    // Dynamically adjust the legs
    const updatedLegs = selectedRoute.legs.map((leg, idx) => {
      if (leg.type === 'METRO') {
        return {
          ...leg,
          status: 'DELAYED' as const,
          delayMinutes: 8,
          arrivalTime: '09:07 AM'
        };
      }
      if (leg.type === 'BUS') {
        return {
          ...leg,
          departureTime: '09:12 AM',
          arrivalTime: '09:28 AM',
          platformOrBay: 'Bay #4 (Auto-Shifted to Next Slot)'
        };
      }
      if (leg.type === 'AUTO_CAB') {
        return {
          ...leg,
          departureTime: '09:30 AM',
          arrivalTime: '09:38 AM',
          platformOrBay: 'Pickup Point Beta (Driver Auto-Notified)'
        };
      }
      return leg;
    });

    setSelectedRoute({
      ...selectedRoute,
      totalDurationMinutes: selectedRoute.totalDurationMinutes + 8,
      dynamicReRouteActive: true,
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
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Route Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-mono font-semibold">
              ONDC Mobility Rails
            </span>
            <span className="text-xs text-slate-400 font-mono">9 Metros • 21 Bus Transit Bodies</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mt-1">{selectedRoute.title}</h3>
        </div>

        {/* Route switcher tabs */}
        <div className="flex items-center gap-2">
          {SAMPLE_TRANSIT_ROUTES.map((route) => (
            <button
              key={route.id}
              onClick={() => {
                setSelectedRoute(route);
                setIsDelayed(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedRoute.id === route.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {route.id.includes('mum') ? 'Mumbai Commute' : 'Delhi Commute'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Ticket Pass & Journey Visualizer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Composite 1-QR Ticket Card */}
        <div className="lg:col-span-5 flex flex-col">
          <div
            className={`rounded-2xl border-2 p-5 flex flex-col justify-between shadow-2xl relative transition-all ${
              offlineMode
                ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-amber-500/60'
                : 'bg-gradient-to-b from-blue-950/80 via-slate-900 to-slate-950 border-blue-500/50'
            }`}
          >
            {/* Top Badge: Offline indicator or Active pass */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Universal Transit Pass
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded font-mono font-semibold bg-slate-800 text-amber-300 border border-slate-700">
                {selectedRoute.compositeTicketId.split('-')[2]}-{selectedRoute.compositeTicketId.split('-')[3]}
              </span>
            </div>

            {/* Middle QR Code Display */}
            <div className="my-5 p-4 rounded-xl bg-white text-slate-950 flex flex-col items-center justify-center shadow-inner">
              {/* Simulated High-Res Dynamic QR */}
              <div className="relative p-2 bg-slate-950 rounded-lg">
                <QrCode className="w-36 h-36 text-white" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="p-1.5 rounded-md bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                    ओ
                  </div>
                </div>
              </div>

              <div className="mt-3 text-center">
                <div className="text-xs font-black tracking-tight text-slate-900 font-mono">
                  ONE-PASS: METRO + BEST + AUTO
                </div>
                <p className="text-[10px] text-slate-600 font-mono mt-0.5">
                  Scan turnstile at AFC Gate • Auto-Transfers Seamlessly
                </p>
              </div>
            </div>

            {/* Pass Metadata details */}
            <div className="space-y-2 py-3 border-y border-slate-800 text-xs font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Total Combined Fare:</span>
                <span className="text-amber-400 font-bold text-sm">₹{selectedRoute.totalFare} (All 3 Legs)</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Est. Commute Time:</span>
                <span className="text-white font-bold">{selectedRoute.totalDurationMinutes} Minutes</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CO₂ Emission Offset:</span>
                <span className="text-emerald-400 font-bold">{selectedRoute.carbonSavedKg} kg Saved</span>
              </div>
            </div>

            {/* Offline Resilience Switcher */}
            <div className="mt-4 pt-2 flex items-center justify-between">
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  offlineMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                }`}
              >
                {offlineMode ? <WifiOff className="w-3.5 h-3.5" /> : <Wifi className="w-3.5 h-3.5" />}
                <span>{offlineMode ? 'Offline JWT Active (Underground)' : 'Simulate 0-Bar Underground'}</span>
              </button>

              <button
                onClick={handleActivateTicket}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md shadow-emerald-600/30"
              >
                {ticketActivated ? 'Pass Validated' : 'Verify Pass'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Interactive Transit Timeline & Real-Time Delay Simulator */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
          {/* Dynamic Delay Simulation Action Bar */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Live Disruption & Delay Re-router</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Test how ONDC BharatOS solves connecting transport failures
              </p>
            </div>

            <div className="flex items-center gap-2">
              {!isDelayed ? (
                <button
                  onClick={handleSimulateDelay}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-rose-600/30 transition-all hover:scale-105"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Simulate 8-Min Metro Delay</span>
                </button>
              ) : (
                <button
                  onClick={handleResetSchedule}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  <span>Reset to On-Time</span>
                </button>
              )}
            </div>
          </div>

          {/* Active Delay Alert if triggered */}
          {isDelayed && (
            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-500/50 flex items-start gap-2.5 text-xs text-amber-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">
                  Dynamic Re-routing Triggered (Zero Cancellation Penalty):
                </span>{' '}
                Metro Line 1 delayed by 8 mins. ONDC BharatOS automatically adjusted your BEST bus departure time and shifted your Bharat Taxi driver to Pickup Point Beta with zero extra fee.
              </div>
            </div>
          )}

          {/* Timeline Legs */}
          <div className="space-y-3">
            {selectedRoute.legs.map((leg, index) => {
              const isMetro = leg.type === 'METRO';
              const isBus = leg.type === 'BUS';
              const isCab = leg.type === 'AUTO_CAB';

              return (
                <div
                  key={index}
                  className={`p-3.5 rounded-xl border transition-all ${
                    leg.status === 'DELAYED'
                      ? 'bg-rose-950/30 border-rose-500/60'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-lg text-white font-bold ${
                          isMetro
                            ? 'bg-blue-600'
                            : isBus
                            ? 'bg-emerald-600'
                            : 'bg-amber-500 text-slate-950'
                        }`}
                      >
                        {isMetro ? <Train className="w-4 h-4" /> : isBus ? <Bus className="w-4 h-4" /> : <Car className="w-4 h-4 text-slate-950" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{leg.agency}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {leg.routeCode}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {leg.from} <span className="text-slate-600">➔</span> {leg.to}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-amber-400">₹{leg.fare}</span>
                      <div className="text-[10px] text-slate-400 font-mono">
                        {leg.departureTime} - {leg.arrivalTime}
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {leg.platformOrBay || 'Standard Boarding'}
                    </span>
                    <span
                      className={`font-mono font-semibold ${
                        leg.status === 'DELAYED' ? 'text-rose-400' : 'text-emerald-400'
                      }`}
                    >
                      {leg.status === 'DELAYED' ? `+${leg.delayMinutes}m Delay Recalibrated` : 'On Time'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hackathon Value Note */}
          <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/40 text-[11px] text-slate-300">
            <span className="font-bold text-blue-300">Why this revolutionizes Indian transit:</span> Commuters no longer juggle 3 separate apps (DMRC, Chalo, Uber). One open protocol pass ties the whole commute together, saving 20 minutes and ₹40 in cancellation fees every day.
          </div>
        </div>
      </div>
    </div>
  );
};
