'use client';

import React, { useState } from 'react';
import { Search, Sparkles, ShoppingBag, ShieldCheck, CheckCircle2, Terminal, ArrowRight, Mic, MicOff, Store, Zap, RefreshCw } from 'lucide-react';
import { FallingText } from '@/components/FallingText';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import confetti from 'canvas-confetti';

export default function AskIndiaPage() {
  const [query, setQuery] = useState('5kg Aashirvaad Atta, 1L Fortune Oil, and Bajaj Mixer Blade');
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setIsSearching(true);
    setOrderConfirmed(false);
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 600);
  };

  const handleOrder = () => {
    setIsOrdering(true);
    setTimeout(() => {
      setIsOrdering(false);
      setOrderConfirmed(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1200);
  };

  const handleVoice = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQuery('5kg Aashirvaad Atta, 1L Fortune Oil, and Dettol Soap 4-pack');
      handleSearch();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-[#f5f5f5] flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-[#222] bg-[#141414]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-rose-400 to-blue-500 flex items-center justify-center font-black text-black text-sm">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">Kubra</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-mono">
                  ONDC Core
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 -mt-0.5">The Citizen Coordination Superlayer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/index.html"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Poster View
            </a>

            <button
              onClick={() => setIsInspectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>Beckn Inspector</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero & Matter.js Gravity Text */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 space-y-8">
        {/* Core Hero Headline */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#333] text-xs font-mono text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Varun Mayya x OpenAI • Build What Moves India</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            &ldquo;I shouldn&apos;t need to know which app sells what. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-rose-400">
              I should just be able to ask India.&rdquo;
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            One prompt searches across the entire decentralized ONDC network, automatically decomposes your intent across local Kiranas and Bazaars, and bundles multi-seller carts into a single checkout.
          </p>
        </div>

        {/* 🌟 REACT BITS / MATTER.JS FALLING TEXT IN THE MIDDLE */}
        <div className="bg-gradient-to-b from-[#161616] to-[#0f0f0f] border border-[#262626] rounded-3xl p-3 shadow-2xl overflow-hidden relative">
          <FallingText
            text="K U B R A"
            gravity={0.85}
            className="w-full"
          />
        </div>

        {/* The "Ask India" Bar */}
        <form onSubmit={handleSearch} className="relative group">
          <div className="flex items-center bg-[#181818] border border-[#333] focus-within:border-blue-500 rounded-2xl p-2.5 shadow-2xl transition-all">
            <div className="pl-3 pr-2 text-amber-400">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask India for anything (e.g. 5kg Atta, 1L Sunflower oil, mixer blade)..."
              className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none px-2"
            />

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoice}
                className={`p-2 sm:px-3 sm:py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-[#242424] hover:bg-[#2e2e2e] text-neutral-300 border-[#383838]'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-amber-400" />}
                <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
              </button>

              <button
                type="submit"
                className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Ask India</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Example Intent Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-neutral-500 font-mono shrink-0">Try Prompts:</span>
          <button
            onClick={() => {
              setQuery('5kg Aashirvaad Atta, 1L Fortune Oil, and Bajaj Mixer Blade');
              handleSearch();
            }}
            className="px-3 py-1.5 rounded-full bg-[#1c1c1c] hover:bg-[#262626] text-neutral-300 border border-[#333] whitespace-nowrap transition-all"
          >
            🛒 Multi-Seller Bundle (Atta + Oil + Mixer Blade)
          </button>
          <button
            onClick={() => {
              setQuery('Damaged Fortune oil bottle in order #99214 refund');
              handleSearch();
            }}
            className="px-3 py-1.5 rounded-full bg-[#1c1c1c] hover:bg-[#262626] text-neutral-300 border border-[#333] whitespace-nowrap transition-all"
          >
            🛡️ 60s Unboxing Dispute
          </button>
        </div>

        {/* Loading State */}
        {isSearching && (
          <div className="p-8 rounded-2xl bg-[#161616] border border-[#282828] text-center space-y-3">
            <RefreshCw className="w-6 h-6 animate-spin text-blue-400 mx-auto" />
            <div className="text-xs font-mono text-neutral-400">
              Broadcasting Beckn /search across 2,400+ Local Kirana &amp; DigiBazaar seller nodes...
            </div>
          </div>
        )}

        {/* Multi-Seller Results Display */}
        {!isSearching && hasSearched && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Multi-Seller Match Summary */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-[#181818] to-emerald-950/40 border border-[#333] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                    MULTI-SELLER BUNDLE COMPILED
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">1 Single Delivery Run</span>
                </div>
                <h3 className="text-lg font-bold text-white mt-1">
                  Total Landed: <span className="text-amber-400 font-black">₹667</span>
                  <span className="text-xs text-emerald-400 font-normal ml-2 font-mono">
                    (You save ₹145 vs Quick-Commerce dark stores)
                  </span>
                </h3>
              </div>

              <button
                onClick={handleOrder}
                disabled={isOrdering || orderConfirmed}
                className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  orderConfirmed
                    ? 'bg-emerald-600 text-white cursor-default'
                    : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 hover:scale-105'
                }`}
              >
                {orderConfirmed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Order Dispatched via ONDC!</span>
                  </>
                ) : isOrdering ? (
                  <span>Broadcasting Beckn /confirm...</span>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>1-Click UPI Checkout (₹667)</span>
                  </>
                )}
              </button>
            </div>

            {/* The 2 Discovered Sellers Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Seller 1: Local Kirana */}
              <div className="p-5 rounded-2xl bg-[#161616] border border-[#262626] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-amber-400" />
                      <span>SELLER 1: Gupta Super Bazaar</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#222] text-neutral-300">
                      450m away
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#242424]">
                      <span className="text-white font-medium">Aashirvaad Atta (5kg)</span>
                      <span className="text-amber-400 font-bold">₹245</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#242424]">
                      <span className="text-white font-medium">Fortune Sunflower Oil (1L)</span>
                      <span className="text-amber-400 font-bold">₹142</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#242424] text-[11px] text-neutral-400 flex justify-between">
                  <span>Subtotal: <strong>₹387</strong></span>
                  <span className="text-emerald-400 font-mono font-semibold">Blinkit Price: ₹453 (+₹66)</span>
                </div>
              </div>

              {/* Seller 2: Local Hardware / DigiBazaar */}
              <div className="p-5 rounded-2xl bg-[#161616] border border-[#262626] flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-emerald-400" />
                      <span>SELLER 2: Pooja Electricals</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#222] text-neutral-300">
                      DigiBazaar Node
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#242424]">
                      <span className="text-white font-medium">Bajaj Rex 500W Mixer Blade</span>
                      <span className="text-amber-400 font-bold">₹280</span>
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Genuine replacement part direct from local hardware dealer.
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#242424] text-[11px] text-neutral-400 flex justify-between">
                  <span>Subtotal: <strong>₹280</strong></span>
                  <span className="text-amber-400 font-mono font-semibold">Unavailable on Q-Commerce</span>
                </div>
              </div>
            </div>

            {/* Logistics & Sachet Insurance Ribbon */}
            <div className="p-4 rounded-xl bg-[#141414] border border-[#262626] text-xs font-mono text-neutral-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Fulfillment: <strong>FleetConnect FIFO</strong> (Single combined delivery run • 35 mins)</span>
              </div>
              <div className="text-blue-400">
                Zurich Kotak Sachet Insurance (₹1.50 Cover Active)
              </div>
            </div>
          </div>
        )}

        {/* Hackathon Judging Alignment Card */}
        <section className="p-6 rounded-2xl bg-[#141414] border border-[#262626] space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>How This Directly Aligns with Hackathon Judging:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#222]">
              <strong className="text-white block mb-1">1. The Problem</strong>
              Citizens shouldn&apos;t juggle 6 separate apps. ONDC&apos;s open rails enable one universal query to search the nation.
            </div>
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#222]">
              <strong className="text-white block mb-1">2. Complete Journey</strong>
              From natural language intent to multi-seller discovery, price benchmarking, and 1-click UPI checkout.
            </div>
            <div className="p-3 rounded-xl bg-[#0f0f0f] border border-[#222]">
              <strong className="text-white block mb-1">3. End-to-End Architecture</strong>
              Compliant Beckn v1.0 protocol schemas (`/search`, `/confirm`, `/issue`) with FIFO logistics routing.
            </div>
          </div>
        </section>
      </main>

      {/* Protocol Inspector Drawer for Hackathon Judges */}
      <ProtocolInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#222] bg-[#121212] py-6 text-center text-xs text-neutral-500 font-mono">
        Kubra • The Citizen Superlayer for India • Varun Mayya x OpenAI Hackathon
      </footer>
    </div>
  );
}
