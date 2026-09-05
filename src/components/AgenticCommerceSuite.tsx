'use client';

import React, { useState } from 'react';
import {
  computeUpsellRecommendations,
  UpsellRecommendation
} from '@/lib/merchant-growth-engine';
import {
  DEFAULT_BUYER_MANDATE,
  SAMPLE_UAP_MANIFEST
} from '@/lib/agentic-protocols';
import { AgentAuditTrailViewer } from '@/components/AgentAuditTrailViewer';
import { AgentConversationalCheckout } from '@/components/AgentConversationalCheckout';
import { CampaignOrchestratorModal } from '@/components/CampaignOrchestratorModal';
import {
  Bot,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Megaphone,
  ShoppingBag,
  Terminal,
  Lock,
  ArrowRight,
  ExternalLink,
  Code2,
  FileCode,
  Check,
  Sliders,
  DollarSign,
  Plus
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

export const AgenticCommerceSuite: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'MERCHANT_GROWTH' | 'AI_BUYER' | 'AUDIT_TRAIL'>('MERCHANT_GROWTH');
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [basket, setBasket] = useState<string[]>(['prod-001']); // Atta initial item
  const [recommendations, setRecommendations] = useState<UpsellRecommendation[]>(
    computeUpsellRecommendations(['prod-001'])
  );

  const handleAddUpsellToBasket = (rec: UpsellRecommendation) => {
    setBasket((prev) => [...prev, rec.recommendedSkuId]);
    const updatedRecs = computeUpsellRecommendations([...basket, rec.recommendedSkuId]);
    setRecommendations(updatedRecs);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="w-full space-y-8 font-editorial-body pb-12">
      {/* Hero Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono border uppercase tracking-wider ${
              isDark
                ? 'bg-[#1c1917] text-[#a8a29e] border-[#292524]'
                : 'bg-[#f0efed] text-[#4e4e4e] border-[#e7e5e4]'
            }`}
          >
            Track 01: AI Growth &amp; Agentic Commerce
          </span>
          <span className="text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Razorpay Test-Mode &amp; NPCI UAP Live
          </span>
        </div>

        <h1 className={`text-3xl sm:text-4xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
          Autonomous Growth &amp; AI Transactable Rails
        </h1>
        <p className={`text-sm max-w-3xl leading-relaxed ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
          Growing local Kirana revenue through AI-driven upsell engines and campaign orchestrators, while making neighborhood stores sellable to autonomous AI buyers via UAP, AP2, and x402 protocols.
        </p>
      </div>

      {/* Main Mode Switcher */}
      <div
        className={`p-1.5 rounded-full border inline-flex items-center gap-1 text-xs font-medium ${
          isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-[#f0efed] border-[#e7e5e4]'
        }`}
      >
        <button
          onClick={() => setActiveTab('MERCHANT_GROWTH')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
            activeTab === 'MERCHANT_GROWTH'
              ? isDark
                ? 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
              : isDark
              ? 'text-[#a8a29e] hover:text-white'
              : 'text-[#777169] hover:text-[#0c0a09]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Merchant AI Growth Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('AI_BUYER')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
            activeTab === 'AI_BUYER'
              ? isDark
                ? 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
              : isDark
              ? 'text-[#a8a29e] hover:text-white'
              : 'text-[#777169] hover:text-[#0c0a09]'
          }`}
        >
          <Bot className="w-3.5 h-3.5" />
          <span>Autonomous AI Buyer Terminal</span>
        </button>

        <button
          onClick={() => setActiveTab('AUDIT_TRAIL')}
          className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all ${
            activeTab === 'AUDIT_TRAIL'
              ? isDark
                ? 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
              : isDark
              ? 'text-[#a8a29e] hover:text-white'
              : 'text-[#777169] hover:text-[#0c0a09]'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>The Bar: Cryptographic Audit Trail</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: MERCHANT AI GROWTH STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'MERCHANT_GROWTH' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Revenue KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`p-5 rounded-2xl border space-y-1 ${
                isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">AI-GENERATED AOV LIFT</span>
              <div className="text-2xl font-display font-light text-emerald-500">+28.4%</div>
              <p className="text-xs text-text-muted">₹387 ➔ ₹497 average basket value</p>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-1 ${
                isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">AUTONOMOUS ORDERS CAPTURED</span>
              <div className={`text-2xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                142 Orders
              </div>
              <p className="text-xs text-text-muted">Zero customer acquisition cost</p>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-1 ${
                isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">ACTIVE CAMPAIGN REVENUE</span>
              <div className="text-2xl font-display font-light text-sky-500">₹29,420</div>
              <p className="text-xs text-text-muted">Anti-surge counter-attacks active</p>
            </div>

            <div
              className={`p-5 rounded-2xl border space-y-1 ${
                isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#777169]">SETTLEMENT RAIL</span>
              <div className={`text-2xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Razorpay Test
              </div>
              <p className="text-xs text-emerald-500 font-mono">T+0 Instant Atomic Escrow</p>
            </div>
          </div>

          {/* Upsell & Cross-Sell Basket Engine */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border transition-colors duration-300 space-y-6 ${
              isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-[#777169]">AI GROWTH MODULE 01</span>
                  <span className="text-xs font-mono text-emerald-500 font-semibold">Real-Time AOV Maximizer</span>
                </div>
                <h3 className={`text-xl font-display font-light mt-1 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                  Dynamic Basket Affinity &amp; Margin Optimizer
                </h3>
              </div>

              <button
                onClick={() => setIsCampaignModalOpen(true)}
                className={`px-4 py-2 rounded-full border text-xs font-medium transition-all flex items-center gap-1.5 self-start sm:self-center ${
                  isDark
                    ? 'border-[#292524] bg-[#0c0a09] text-white hover:bg-[#292524]'
                    : 'border-[#e7e5e4] bg-[#f5f5f5] text-[#0c0a09] hover:bg-[#f0efed]'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5 text-emerald-500" />
                <span>Launch Campaign Orchestrator</span>
              </button>
            </div>

            {/* Simulated Live Cart & Recommendations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Current Active Basket */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono uppercase text-[#777169]">CURRENT BASKET UNDER EVALUATION</span>
                <div
                  className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${
                    isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
                  }`}
                >
                  <div className="flex justify-between items-center pb-2 border-b border-hairline/40 font-bold">
                    <span>Aashirvaad Shudh Chakki Atta (5kg)</span>
                    <span>₹245.00</span>
                  </div>

                  {basket.length > 1 && (
                    <div className="space-y-1.5 pt-1 text-emerald-500">
                      {basket.slice(1).map((id, i) => (
                        <div key={i} className="flex justify-between items-center text-[11px]">
                          <span>+ Added Upsell Item ({id})</span>
                          <span>✓ Attached</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="pt-2 border-t border-hairline/40 flex justify-between font-bold text-sm">
                    <span>Current Cart Value:</span>
                    <span className="text-emerald-500">
                      ₹{(245 + (basket.length - 1) * 132).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: AI Upsell Recommendations with Margin Analysis */}
              <div className="lg:col-span-7 space-y-3">
                <span className="text-xs font-mono uppercase text-[#777169]">
                  AUTONOMOUS HIGH-MARGIN BUNDLE PROPOSALS
                </span>

                <div className="space-y-3">
                  {recommendations.map((rec) => (
                    <div
                      key={rec.recommendedSkuId}
                      className={`p-4 rounded-xl border transition-all space-y-2.5 ${
                        isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {rec.bundleTag}
                          </span>
                          <h4 className={`text-sm font-semibold mt-1 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                            {rec.name}
                          </h4>
                        </div>

                        <div className="text-right font-mono shrink-0">
                          <div className="text-xs font-bold text-emerald-500">₹{rec.discountedPrice}</div>
                          <div className="text-[10px] line-through text-[#777169]">₹{rec.price}</div>
                        </div>
                      </div>

                      <p className="text-xs text-text-muted leading-relaxed">
                        {rec.affinityReason}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-hairline/40 font-mono text-[11px]">
                        <div className="flex items-center gap-3">
                          <span className="text-emerald-500 font-bold">
                            Merchant Margin: {rec.merchantMarginPct}%
                          </span>
                          <span className="text-[#777169]">
                            AOV Lift: +₹{rec.estimatedAovLiftINR}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddUpsellToBasket(rec)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1 ${
                            isDark
                              ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]'
                              : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
                          }`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Attach to Basket</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Machine-Readable Discovery Endpoints (For AI Buyers) */}
          <div
            className={`p-6 sm:p-8 rounded-2xl border space-y-4 ${
              isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
            }`}
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[#777169]">AI DISCOVERY PROTOCOLS</span>
              <h3 className={`text-xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Endpoints Making This Merchant Sellable to AI Buyers
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <a
                href="/api/agent/catalog"
                target="_blank"
                rel="noreferrer"
                className={`p-4 rounded-xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#0c0a09] border-[#292524] hover:border-white' : 'bg-[#f5f5f5] border-[#e7e5e4] hover:border-[#0c0a09]'
                }`}
              >
                <div>
                  <div className="font-bold">JSON-LD Catalog</div>
                  <div className="text-[10px] text-[#777169]">/api/agent/catalog</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
              </a>

              <a
                href="/.well-known/uap-manifest.json"
                target="_blank"
                rel="noreferrer"
                className={`p-4 rounded-xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#0c0a09] border-[#292524] hover:border-white' : 'bg-[#f5f5f5] border-[#e7e5e4] hover:border-[#0c0a09]'
                }`}
              >
                <div>
                  <div className="font-bold">NPCI UAP Manifest</div>
                  <div className="text-[10px] text-[#777169]">/.well-known/uap-manifest.json</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
              </a>

              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className={`p-4 rounded-xl border flex items-center justify-between group transition-all ${
                  isDark ? 'bg-[#0c0a09] border-[#292524] hover:border-white' : 'bg-[#f5f5f5] border-[#e7e5e4] hover:border-[#0c0a09]'
                }`}
              >
                <div>
                  <div className="font-bold">LLMs.txt Spec</div>
                  <div className="text-[10px] text-[#777169]">/llms.txt</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: AUTONOMOUS AI BUYER TERMINAL */}
      {/* ========================================================================= */}
      {activeTab === 'AI_BUYER' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 cols: Conversational Checkout Agent */}
            <div className="lg:col-span-7">
              <AgentConversationalCheckout />
            </div>

            {/* Right 5 cols: Bounded Mandate Controls */}
            <div className="lg:col-span-5 space-y-4">
              <div
                className={`p-6 rounded-2xl border transition-colors duration-300 space-y-4 ${
                  isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-semibold">Active UPI AutoPay Bounded Mandate</h4>
                </div>

                <div
                  className={`p-4 rounded-xl border font-mono text-xs space-y-2 ${
                    isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
                  }`}
                >
                  <div className="flex justify-between">
                    <span>Mandate ID:</span>
                    <strong className={isDark ? 'text-white' : 'text-[#0c0a09]'}>
                      {DEFAULT_BUYER_MANDATE.mandateId}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Max Limit Per Txn:</span>
                    <strong className="text-emerald-500">
                      ₹{DEFAULT_BUYER_MANDATE.maxAmountPerTxn.toFixed(2)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Autonomous Threshold:</span>
                    <strong className="text-sky-500">
                      &lt; ₹{DEFAULT_BUYER_MANDATE.autonomousThreshold.toFixed(2)} (Zero-Touch)
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Daily Cap Remaining:</span>
                    <strong className={isDark ? 'text-white' : 'text-[#0c0a09]'}>
                      ₹{(DEFAULT_BUYER_MANDATE.dailySpendingCap - DEFAULT_BUYER_MANDATE.dailySpentSoFar).toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-text-muted leading-relaxed">
                  <span className="font-semibold text-text-body">Mandate Enforcement Rules:</span>
                  <ul className="list-disc list-inside space-y-1 text-[11px]">
                    <li>Transactions under ₹500 execute with zero human friction.</li>
                    <li>Transactions ≥ ₹500 pause the autonomous loop for biometric/OTP approval.</li>
                    <li>Hard cap at ₹1,000 blocks rogue overspending.</li>
                  </ul>
                </div>
              </div>

              {/* x402 Protocol Challenge Card */}
              <div
                className={`p-6 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-white border-[#e7e5e4] soft-card-shadow'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#777169]">HTTP 402 PAYMENT REQUIRED PROTOCOL</span>
                  <span className="text-emerald-500 font-bold">x402-Razorpay</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  When an external AI agent queries <code>/api/agent/transact</code> without a token, the gateway challenges it with HTTP 402 and the exact cryptographic authentication realm.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: THE BAR - CRYPTOGRAPHIC AUDIT TRAIL */}
      {/* ========================================================================= */}
      {activeTab === 'AUDIT_TRAIL' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <AgentAuditTrailViewer />
        </div>
      )}

      {/* Modal Dialog for Campaigns */}
      <CampaignOrchestratorModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
      />
    </div>
  );
};
