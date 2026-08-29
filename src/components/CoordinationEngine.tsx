'use client';

import React, { useState } from 'react';
import { WardCoalition, SAMPLE_WARD_COALITIONS } from '@/lib/coordination-data';
import { Users, Vote, Megaphone, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, MapPin, Zap, Clock, UserCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CoordinationEngineProps {
  lang: 'en' | 'hi';
}

export const CoordinationEngine: React.FC<CoordinationEngineProps> = ({ lang }) => {
  const [selectedWard, setSelectedWard] = useState<WardCoalition>(SAMPLE_WARD_COALITIONS[0]);
  const [pledgedActions, setPledgedActions] = useState<Record<string, boolean>>({});

  const handleJoinPledge = (pledgeId: string) => {
    setPledgedActions((prev) => ({ ...prev, [pledgeId]: true }));
    // Increment participant count in UI
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
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner: The Coordination Thesis */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-blue-950/60 border border-amber-500/40 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                  {lang === 'hi' ? 'नागरिक समन्वय इंजन' : 'Citizen Coordination Engine'}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {lang === 'hi' ? 'सामूहिक शक्ति • वास्तविक परिणाम' : 'Collective Action &gt; Passive Tracking'}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white mt-1">
                {lang === 'hi'
                  ? 'समस्या तकनीक की नहीं, समन्वय की है: जब लोग एकजुट होते हैं, व्यवस्था बदलती है'
                  : 'Civic Life is a Coordination Problem: When Citizens Organize, Systems Move'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {lang === 'hi'
                  ? 'अकेले व्यक्ति की शिकायत को नज़रअंदाज़ किया जाता है। लेकिन जब 300 नागरिक एक साथ बस रूट की मांग करते हैं या 100 मतदाता वार्ड कार्यालय में उपस्थित होते हैं, तो अधिकारी कार्रवाई करने को बाध्य होते हैं।'
                  : 'Isolated complaints get ignored in government black holes. But when 300 commuters pledge collective demand or 100 verified voters show up at the ward office, municipal corporators and transit depots take immediate action.'}
              </p>
            </div>
          </div>

          {/* Ward Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            {SAMPLE_WARD_COALITIONS.map((ward) => (
              <button
                key={ward.id}
                onClick={() => setSelectedWard(ward)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedWard.id === ward.id
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {ward.city.split(' ')[0]} ({ward.wardNumber.split(' ')[1]})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Ward Corporator Margin Radar Card */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: Ward & Corporator details */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Vote className="w-4 h-4" />
            </span>
            <div>
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                {selectedWard.city}
              </span>
              <h4 className="text-lg font-black text-white">{selectedWard.wardNumber}</h4>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="text-slate-400 text-[11px]">Elected Municipal Corporator:</div>
              <div className="text-white font-bold text-sm mt-0.5">{selectedWard.corporatorName}</div>
              <div className="text-[10px] text-slate-500 font-mono">{selectedWard.party}</div>
            </div>

            <div className="text-right">
              <div className="text-slate-400 text-[11px]">Last Election Victory Margin:</div>
              <div className="text-rose-400 font-mono font-black text-base">
                +{selectedWard.winningMarginVotes} Votes
              </div>
              <div className="text-[10px] text-slate-400 font-mono">Slim Electoral Margin</div>
            </div>
          </div>
        </div>

        {/* Right: Coordination Bloc Leverage Meter */}
        <div className="md:col-span-5 p-4 rounded-xl bg-gradient-to-br from-blue-950/80 to-slate-950 border-2 border-blue-500/50 flex flex-col justify-between space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-300 uppercase">
              Collective Voter Leverage
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-bold border border-emerald-500/40">
              {selectedWard.blocImpactPercent}% Impact
            </span>
          </div>

          <div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-2xl font-black text-white">{selectedWard.activeVoterBlocCount}</span>
              <span className="text-xs text-slate-400 font-mono">
                of {selectedWard.winningMarginVotes} winning margin votes
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 via-blue-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, selectedWard.blocImpactPercent)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[11px] text-slate-300 leading-snug">
            💡 <strong>Why This Works:</strong> 348 verified voters acting as a bloc hold the power to swing the next election. When this bloc signs a transit or civic mandate, the corporator acts within 48 hours.
          </p>
        </div>
      </div>

      {/* Active Collective Action Campaigns Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-extrabold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Active Ward Coordination Campaigns</span>
          </h4>
          <span className="text-xs text-slate-400 font-mono">
            {selectedWard.activePledges.length} Live Collective Pools
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {selectedWard.activePledges.map((pledge) => {
            const isPledged = pledgedActions[pledge.id];
            const isTransit = pledge.type === 'TRANSIT_POOL';
            const isKirana = pledge.type === 'KIRANA_COLLECTIVE';
            const isCivic = pledge.type === 'CIVIC_INTERVENTION';

            return (
              <div
                key={pledge.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden group"
              >
                {/* Top Status & Tag */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${
                        isTransit
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : isKirana
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {isTransit
                        ? '🚊 Commuter Pool'
                        : isKirana
                        ? '🛒 Kirana Bulk Pool'
                        : '🏛️ Civic Intervention'}
                    </span>

                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                        pledge.status === 'QUORUM_REACHED'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : pledge.status === 'ACTION_TRIGGERED'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {pledge.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h5 className="font-bold text-sm text-white leading-snug group-hover:text-amber-300 transition-colors">
                    {pledge.title}
                  </h5>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pledge.description}</p>
                </div>

                {/* Quorum Progress */}
                <div className="space-y-2 py-3 border-y border-slate-800/80">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-mono">Citizen Quorum:</span>
                    <span className="text-white font-bold font-mono">
                      <span className="text-amber-400">{pledge.currentCount}</span> / {pledge.targetCount} Pledged
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        pledge.currentCount >= pledge.targetCount
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-blue-500 to-amber-400'
                      }`}
                      style={{
                        width: `${Math.min(100, (pledge.currentCount / pledge.targetCount) * 100)}%`
                      }}
                    ></div>
                  </div>

                  {/* Impact Summary Note */}
                  <div className="text-[11px] text-emerald-300/90 font-medium bg-emerald-950/40 p-2 rounded-lg border border-emerald-800/40 mt-2">
                    ✅ <strong>Result:</strong> {pledge.impactSummary}
                  </div>
                </div>

                {/* Next Action & Join Button */}
                <div className="space-y-3">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {pledge.nextActionDate}
                    </span>
                    <span className="text-slate-300 font-semibold truncate max-w-[130px]">
                      {pledge.nextAction}
                    </span>
                  </div>

                  <button
                    onClick={() => handleJoinPledge(pledge.id)}
                    disabled={isPledged}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isPledged
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                        : 'bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-slate-950 font-black shadow-lg shadow-amber-500/20 hover:scale-[1.02]'
                    }`}
                  >
                    {isPledged ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Pledge Joined & Verified</span>
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4" />
                        <span>Join Collective Pledge</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
