'use client';

import React, { useState } from 'react';
import { WardCoalition, SAMPLE_WARD_COALITIONS } from '@/lib/coordination-data';
import { Users, Vote, Megaphone, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MapPin, Zap, Clock, UserCheck } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface CoordinationEngineProps {
  lang: 'en' | 'hi';
}

export const CoordinationEngine: React.FC<CoordinationEngineProps> = ({ lang }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedWard, setSelectedWard] = useState<WardCoalition>(SAMPLE_WARD_COALITIONS[0]);
  const [pledgedActions, setPledgedActions] = useState<Record<string, boolean>>({});

  const handleJoinPledge = (pledgeId: string) => {
    setPledgedActions((prev) => ({ ...prev, [pledgeId]: true }));
    setSelectedWard((prev) => ({
      ...prev,
      activeVoterBlocCount: prev.activeVoterBlocCount + 1,
      activePledges: prev.activePledges.map((p) =>
        p.id === pledgeId
          ? {
              ...p,
              currentCount: p.currentCount + 1,
              status: p.currentCount + 1 >= p.targetCount ? 'QUORUM_REACHED' : p.status,
              participants: [
                { name: 'You (Verified Citizen)', timestamp: 'Just now', verifiedVoter: true },
                ...p.participants
              ]
            }
          : p
      )
    }));

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full space-y-6 font-editorial-body">
      {/* Top Banner: Civic Quorum Header */}
      <div
        className={`p-6 sm:p-8 rounded-2xl border transition-colors duration-300 ${
          isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
        } flex flex-col md:flex-row md:items-center justify-between gap-6`}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
                isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#777169] border-[#e7e5e4]'
              }`}
            >
              Civic Quorum Protocol
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
              Collective Citizen Power &gt; Passive Tracking
            </span>
          </div>
          <h3 className={`text-xl sm:text-2xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
            Ward 184 Citizen Coordination Bloc
          </h3>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'} max-w-2xl leading-relaxed`}>
            Individual complaints get lost in bureaucracy. When 300 commuters pledge collective demand or 100 verified voters show up at the ward office, municipal corporators and transit depots take immediate action.
          </p>
        </div>

        {/* Ward Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {SAMPLE_WARD_COALITIONS.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all border ${
                selectedWard.id === ward.id
                  ? isDark ? 'bg-white text-[#0c0a09] border-white shadow-sm font-semibold' : 'bg-[#0c0a09] text-white border-[#0c0a09] shadow-sm font-semibold'
                  : isDark ? 'bg-[#0c0a09] text-[#a8a29e] border-[#292524] hover:text-white' : 'bg-[#f5f5f5] text-[#777169] border-[#e7e5e4] hover:text-[#0c0a09]'
              }`}
            >
              {ward.city.split(' ')[0]} ({ward.wardNumber.split(' ')[1]})
            </button>
          ))}
        </div>
      </div>

      {/* Active Pledges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedWard.activePledges.map((pledge) => {
          const isPledged = pledgedActions[pledge.id];
          const progressPct = Math.min(100, Math.round((pledge.currentCount / pledge.targetCount) * 100));

          return (
            <div
              key={pledge.id}
              className={`p-6 rounded-2xl border transition-colors duration-300 ${
                isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
              } flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      isDark ? 'bg-[#0c0a09] text-[#a8a29e] border-[#292524]' : 'bg-[#f5f5f5] text-[#777169] border-[#e7e5e4]'
                    }`}
                  >
                    {pledge.type.replace('_', ' ')}
                  </span>
                  <span
                    className={`text-xs font-mono font-semibold ${
                      pledge.status === 'QUORUM_REACHED' ? 'text-emerald-500' : isDark ? 'text-[#a8a29e]' : 'text-[#777169]'
                    }`}
                  >
                    {pledge.status === 'QUORUM_REACHED' ? '✓ Quorum Reached' : `${pledge.currentCount}/${pledge.targetCount} Pledges`}
                  </span>
                </div>

                <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>{pledge.title}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
                  {pledge.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 space-y-1">
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#0c0a09]' : 'bg-[#f0efed]'}`}>
                    <div
                      className={`h-full transition-all duration-500 ${
                        pledge.status === 'QUORUM_REACHED'
                          ? 'bg-emerald-500'
                          : isDark ? 'bg-white' : 'bg-[#0c0a09]'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#777169]">
                    <span>Target: {pledge.targetCount} Citizens</span>
                    <span>{progressPct}% Quorum</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {isPledged ? (
                  <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-mono flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>You Joined This Quorum Pledge</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoinPledge(pledge.id)}
                    className={`w-full py-2.5 rounded-full font-medium text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm ${
                      isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                    }`}
                  >
                    <Vote className="w-3.5 h-3.5" />
                    <span>Pledge Support as Verified Voter</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
