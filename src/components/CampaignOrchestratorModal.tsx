'use client';

import React, { useState } from 'react';
import {
  MerchantCampaign,
  SAMPLE_MERCHANT_CAMPAIGNS
} from '@/lib/merchant-growth-engine';
import {
  Megaphone,
  X,
  Zap,
  TrendingUp,
  Flame,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
  DollarSign
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface CampaignOrchestratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignOrchestratorModal: React.FC<CampaignOrchestratorModalProps> = ({
  isOpen,
  onClose
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [campaigns, setCampaigns] = useState<MerchantCampaign[]>(SAMPLE_MERCHANT_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<MerchantCampaign>(SAMPLE_MERCHANT_CAMPAIGNS[0]);
  const [broadcastState, setBroadcastState] = useState<'IDLE' | 'SENDING' | 'SENT'>('IDLE');

  if (!isOpen) return null;

  const handleLaunchCampaign = () => {
    setBroadcastState('SENDING');
    setTimeout(() => {
      setBroadcastState('SENT');
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === selectedCampaign.id
            ? {
                ...c,
                actualOrdersGenerated: c.actualOrdersGenerated + 8,
                actualRevenueEarnedINR: c.actualRevenueEarnedINR + 4200
              }
            : c
        )
      );
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.5 } });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 font-editorial-body animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl rounded-2xl border shadow-card-elevated overflow-hidden flex flex-col max-h-[90vh] ${
          isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
        }`}
      >
        {/* Header */}
        <div
          className={`p-5 border-b flex items-center justify-between ${
            isDark ? 'border-[#292524] bg-[#0c0a09]' : 'border-[#e7e5e4] bg-[#fafafa]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Megaphone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-semibold">Autonomous Merchant Campaign Orchestrator</div>
              <div className={`text-[11px] font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                Real-Time Anti-Surge &amp; Dead-Stock Growth Engine
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors ${
              isDark ? 'text-[#a8a29e] hover:text-white hover:bg-[#292524]' : 'text-[#777169] hover:text-[#0c0a09] hover:bg-[#f0efed]'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Top Revenue Summary Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              className={`p-4 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">CAMPAIGN REVENUE EARNED</span>
              <div className="text-xl font-bold text-emerald-500">₹29,420.00</div>
              <div className="text-[10px] text-text-muted">+28% AOV Lift across 61 orders</div>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">PROJECTED GMV LIFT</span>
              <div className="text-xl font-bold">₹37,600.00</div>
              <div className="text-[10px] text-text-muted">Targeting 665 neighborhood buyers</div>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-1 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">ACTIVE CHANNELS</span>
              <div className="text-xl font-bold text-sky-500">WhatsApp + UAP</div>
              <div className="text-[10px] text-text-muted">Direct to AI Agents &amp; Citizens</div>
            </div>
          </div>

          {/* Campaign Selector Tabs */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-[#777169]">SELECT ACTIVE AI CAMPAIGN</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {campaigns.map((camp) => (
                <button
                  key={camp.id}
                  onClick={() => {
                    setSelectedCampaign(camp);
                    setBroadcastState('IDLE');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs transition-all space-y-1.5 ${
                    selectedCampaign.id === camp.id
                      ? isDark
                        ? 'bg-[#292524] border-white text-white shadow-sm font-semibold'
                        : 'bg-white border-[#0c0a09] text-[#0c0a09] shadow-sm font-semibold ring-1 ring-[#0c0a09]'
                      : isDark
                      ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]'
                      : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
                  }`}
                >
                  <div className="font-bold truncate">{camp.title.split(' ')[0]} {camp.title.split(' ')[1]}</div>
                  <div className="text-[10px] opacity-75 font-mono">
                    {camp.type === 'ANTI_SURGE_COUNTER' ? '🌧️ Anti-Surge' : camp.type === 'DEAD_STOCK_LIQUIDATION' ? '⚡ Dead-Stock' : '🛒 Recovery'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Campaign Detailed Card */}
          <div
            className={`p-5 rounded-xl border space-y-4 ${
              isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
            }`}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {selectedCampaign.channel}
              </span>
              <h4 className={`text-base font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                {selectedCampaign.title}
              </h4>
              <p className="text-xs text-text-muted leading-relaxed">
                <strong>Autonomous Trigger:</strong> {selectedCampaign.triggerCondition}
              </p>
            </div>

            {/* Simulated WhatsApp Message Bubble */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-[#777169]">AUTONOMOUS BROADCAST PREVIEW:</span>
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-100 text-xs leading-relaxed font-mono">
                {selectedCampaign.messageTemplate}
              </div>
            </div>

            {/* Launch / Broadcast Button */}
            <div className="pt-2">
              {broadcastState === 'SENT' ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-emerald-400 text-xs font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Broadcast Dispatched to {selectedCampaign.targetAudienceCount} Citizens &amp; AI Buyers</span>
                  </span>
                  <span className="font-bold">+8 Orders Captured</span>
                </div>
              ) : (
                <button
                  onClick={handleLaunchCampaign}
                  disabled={broadcastState === 'SENDING'}
                  className={`w-full py-3 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                    isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {broadcastState === 'SENDING'
                      ? 'Orchestrating Broadcast to UAP Network...'
                      : `Dispatch Flash Campaign to ${selectedCampaign.targetAudienceCount} Buyers`}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
