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
    <div className="w-full space-y-6">
      {/* Top Banner: Civic Quorum Header */}
      <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${
              isDark ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'
            }`}>
              Civic Quorum Protocol
            </span>
            <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
              Collective Citizen Power &gt; Passive Tracking
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold">
            Ward 184 Citizen Coordination Bloc
          </h3>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'} max-w-2xl leading-relaxed`}>
            Individual complaints get lost in bureaucracy. When 300 commuters pledge collective demand or 100 verified voters show up at the ward office, municipal corporators and transit depots take immediate action.
          </p>
        </div>

        {/* Ward Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          {SAMPLE_WARD_COALITIONS.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                selectedWard.id === ward.id
                  ? isDark ? 'bg-white text-black border-white' : 'bg-black text-white border-black'
                  : isDark ? 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white' : 'bg-zinc-100 text-zinc-600 border-zinc-300 hover:text-black'
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
              className={`p-5 rounded-2xl border ${
                isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              } flex flex-col justify-between space-y-4`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    isDark ? 'bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-100 text-zinc-700 border-zinc-300'
                  }`}>
                    {pledge.type.replace('_', ' ')}
                  </span>
                  <span className={`text-xs font-mono font-semibold ${
                    pledge.status === 'QUORUM_REACHED' ? 'text-emerald-500' : isDark ? 'text-zinc-400' : 'text-zinc-500'
                  }`}>
                    {pledge.status === 'QUORUM_REACHED' ? 'Quorum Reached' : `${pledge.currentCount}/${pledge.targetCount} Pledges`}
                  </span>
                </div>

                <h4 className="font-bold text-sm">{pledge.title}</h4>
                <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  {pledge.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-3 space-y-1">
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                    <div
                      className={`h-full transition-all duration-500 ${
                        pledge.status === 'QUORUM_REACHED'
                          ? 'bg-emerald-500'
                          : isDark ? 'bg-white' : 'bg-black'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    ></div>
                  </div>
                  <div className={`flex justify-between text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    <span>Target: {pledge.targetCount} Citizens</span>
                    <span>{progressPct}% Quorum</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                {isPledged ? (
                  <div className={`p-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 ${
                    isDark ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  }`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>You Joined This Action Bloc</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleJoinPledge(pledge.id)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                      isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
                    } cursor-pointer`}
                  >
                    Join Action Pledge (+1 Citizen Vote)
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
