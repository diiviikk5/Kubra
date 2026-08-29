'use client';

import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShoppingBag,
  Train,
  ShieldCheck,
  Users,
  Terminal,
  ArrowRight,
  Mic,
  MicOff,
  Store,
  Zap,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  MapPin,
  Clock,
  ChevronRight,
  CreditCard,
  Camera,
  Play,
  RotateCcw,
  Volume2,
  ExternalLink,
  Info,
  Network,
  Cpu,
  Layers,
  Check
} from 'lucide-react';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { RetailComparisonMatrix } from '@/components/RetailComparisonMatrix';
import { MultimodalTicketPass } from '@/components/MultimodalTicketPass';
import { DisputeEvidenceAuditor } from '@/components/DisputeEvidenceAuditor';
import { CoordinationEngine } from '@/components/CoordinationEngine';
import { ShelfScannerModal } from '@/components/ShelfScannerModal';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/mock-data';
import confetti from 'canvas-confetti';

interface CitizenSuperlayerAppProps {
  onClose?: () => void;
  initialTab?: 'SEARCH' | 'RETAIL' | 'TRANSIT' | 'DISPUTE' | 'COORDINATION' | 'ARCHITECTURE';
}

export const CitizenSuperlayerApp: React.FC<CitizenSuperlayerAppProps> = ({
  onClose,
  initialTab = 'SEARCH',
}) => {
  const [activeTab, setActiveTab] = useState<'SEARCH' | 'RETAIL' | 'TRANSIT' | 'DISPUTE' | 'COORDINATION' | 'ARCHITECTURE'>(initialTab);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isShelfScanOpen, setIsShelfScanOpen] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  // Working Citizen Workflow State
  const [workflowStep, setWorkflowStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [query, setQuery] = useState('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [disputeTriggered, setDisputeTriggered] = useState(false);
  const [disputeSettled, setDisputeSettled] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);

  const handleRunSearch = (customQuery?: string) => {
    const q = customQuery || query;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setWorkflowStep(2);
    }, 700);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setQuery(
        lang === 'hi'
          ? '5 किग्रा आशीर्वाद आटा, 1 लीटर फॉर्च्यून तेल और मिक्सर ब्लेड'
          : '5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade'
      );
      handleRunSearch();
    }, 1600);
  };

  const handleInitiatePayment = () => {
    setShowUpiModal(true);
  };

  const handleConfirmUPIPayment = () => {
    setShowUpiModal(false);
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentDone(true);
      setWorkflowStep(4);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1100);
  };

  const handleTriggerDispute = () => {
    setDisputeTriggered(true);
    setTimeout(() => {
      setDisputeSettled(true);
      setWorkflowStep(5);
    }, 1400);
  };

  const handleResetWorkflow = () => {
    setWorkflowStep(1);
    setPaymentDone(false);
    setDisputeTriggered(false);
    setDisputeSettled(false);
    setIsPaying(false);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-neutral-100 flex flex-col font-geist selection:bg-blue-600 selection:text-white overflow-x-hidden">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#222] bg-[#121212]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-amber-400 to-rose-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-[#121212] rounded-[6px] flex items-center justify-center font-bold text-white text-sm">
                K
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Kubra</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono">
                  ONDC Core
                </span>
              </div>
              <p className="text-[10px] text-neutral-400 -mt-0.5 hidden sm:block">
                {lang === 'hi' ? 'नागरिक खुला वाणिज्य नेटवर्क' : 'Open Commerce Superlayer for Bharat'}
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-[#181818] border border-[#282828] rounded-xl text-xs">
            <button
              onClick={() => setActiveTab('SEARCH')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'SEARCH'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Universal Search</span>
            </button>

            <button
              onClick={() => setActiveTab('RETAIL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'RETAIL'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
              <span>DigiBazaar</span>
            </button>

            <button
              onClick={() => setActiveTab('TRANSIT')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'TRANSIT'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-sky-400" />
              <span>YatriSetu Transit</span>
            </button>

            <button
              onClick={() => setActiveTab('DISPUTE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'DISPUTE'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              <span>60s Auto-Dispute</span>
            </button>

            <button
              onClick={() => setActiveTab('COORDINATION')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'COORDINATION'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Civic Quorum</span>
            </button>

            <button
              onClick={() => setActiveTab('ARCHITECTURE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'ARCHITECTURE'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#222]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-emerald-300" />
              <span>Architecture</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="px-2.5 py-1.5 rounded-lg border border-[#333] bg-[#181818] text-xs font-mono text-neutral-300 hover:bg-[#242424] transition-all"
            >
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
            </button>

            <button
              onClick={() => setIsInspectorOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 text-xs font-mono font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-all"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Beckn v1.0</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-xs text-neutral-300 transition-all font-mono"
              >
                Poster
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Tab Scroller */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 bg-[#141414] border-t border-[#222] text-xs">
          <button
            onClick={() => setActiveTab('SEARCH')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'SEARCH' ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            Universal Search
          </button>
          <button
            onClick={() => setActiveTab('RETAIL')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'RETAIL' ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            DigiBazaar
          </button>
          <button
            onClick={() => setActiveTab('TRANSIT')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'TRANSIT' ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            YatriSetu
          </button>
          <button
            onClick={() => setActiveTab('DISPUTE')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'DISPUTE' ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            60s Dispute
          </button>
          <button
            onClick={() => setActiveTab('COORDINATION')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'COORDINATION' ? 'bg-blue-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            Quorum
          </button>
          <button
            onClick={() => setActiveTab('ARCHITECTURE')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'ARCHITECTURE' ? 'bg-emerald-600 text-white font-bold' : 'text-neutral-400'}`}
          >
            Architecture
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20">
        {/* ========================================================================= */}
        {/* TAB 1: UNIVERSAL SEARCH & MULTI-SELLER BUNDLING */}
        {/* ========================================================================= */}
        {activeTab === 'SEARCH' && (
          <div className="space-y-6">
            {/* Core Hero Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#141414] to-emerald-950/40 border border-[#2a2a2a] flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e1e1e] border border-[#333] text-xs font-mono text-neutral-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>DPIIT Open Network for Digital Commerce</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  &ldquo;I shouldn&apos;t need to know which app sells what. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-amber-300 to-rose-400">
                    I should just be able to ask India.&rdquo;
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
                  One prompt queries thousands of decentralized seller nodes, automatically bundles multi-seller carts into a single delivery run, and eliminates surge pricing.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <button
                  onClick={() =>
                    speakText(
                      lang === 'hi'
                        ? 'कुबरा में आपका स्वागत है। भारत के किसी भी सामान के लिए सिर्फ एक बार पूछें।'
                        : 'Welcome to Kubra. Ask India for anything across groceries, hardware, transit, or disputes in one single prompt.'
                    )
                  }
                  className="px-3.5 py-2.5 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] border border-[#333] text-xs font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Voice Guide</span>
                </button>

                <button
                  onClick={handleResetWorkflow}
                  className="px-3.5 py-2.5 rounded-xl bg-[#1e1e1e] hover:bg-[#282828] border border-[#333] text-xs font-semibold text-neutral-300 flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-sky-400" />
                  <span>Reset Flow</span>
                </button>
              </div>
            </div>

            {/* Workflow Step Progress Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 1
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-300'
                    : 'bg-[#141414] border-[#242424] text-neutral-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  1
                </div>
                <span className="truncate">Natural Intent</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 2
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-300'
                    : 'bg-[#141414] border-[#242424] text-neutral-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  2
                </div>
                <span className="truncate">Network Search</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 3
                    ? 'bg-blue-950/40 border-blue-500/50 text-blue-300'
                    : 'bg-[#141414] border-[#242424] text-neutral-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  3
                </div>
                <span className="truncate">Multi-Seller Cart</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 4
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                    : 'bg-[#141414] border-[#242424] text-neutral-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  4
                </div>
                <span className="truncate">UPI &amp; FIFO Fleet</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 5
                    ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                    : 'bg-[#141414] border-[#242424] text-neutral-500'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold">
                  5
                </div>
                <span className="truncate">60s Auto-Refund</span>
              </div>
            </div>

            {/* Input Search Box */}
            <div className="p-6 rounded-3xl bg-[#141414] border border-[#262626] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-neutral-300 flex items-center gap-2">
                  <Search className="w-4 h-4 text-amber-400" />
                  <span>Type, Speak or Scan what you need across India</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  OpenAI Vyapar LM • Multi-Category SKU Extraction
                </span>
              </div>

              <div className="flex items-center bg-[#1a1a1a] border border-[#333] focus-within:border-blue-500 rounded-2xl p-2.5 shadow-2xl transition-all">
                <div className="pl-3 pr-2 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask India for anything (e.g. 5kg Atta, 1L Sunflower oil, mixer grinder blade)..."
                  className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base focus:outline-none px-2"
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleVoiceInput}
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
                    type="button"
                    onClick={() => setIsShelfScanOpen(true)}
                    className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#242424] hover:bg-[#2e2e2e] text-neutral-300 border border-[#383838] text-xs font-medium flex items-center gap-1.5 transition-all"
                  >
                    <Camera className="w-4 h-4 text-sky-400" />
                    <span className="hidden sm:inline">Scan List</span>
                  </button>

                  <button
                    onClick={() => handleRunSearch()}
                    className="px-4 sm:px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                  >
                    <span>Decompose Intent</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                <span className="text-neutral-500 font-mono shrink-0">Sample Requests:</span>
                <button
                  onClick={() => {
                    setQuery('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
                    handleRunSearch('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#262626] text-neutral-300 border border-[#333] whitespace-nowrap transition-all"
                >
                  🛒 Multi-Seller Bundle (Atta + Oil + Mixer Blade)
                </button>
                <button
                  onClick={() => {
                    setQuery('Ghatkopar to BKC composite Metro and BEST Bus pass');
                    setActiveTab('TRANSIT');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#262626] text-neutral-300 border border-[#333] whitespace-nowrap transition-all"
                >
                  🚊 1-QR Multimodal Transit Pass
                </button>
                <button
                  onClick={() => {
                    setQuery('Damaged Fortune oil bottle in order #99214 refund');
                    setActiveTab('DISPUTE');
                  }}
                  className="px-3 py-1.5 rounded-full bg-[#1e1e1e] hover:bg-[#262626] text-neutral-300 border border-[#333] whitespace-nowrap transition-all"
                >
                  🛡️ 60s Unboxing Dispute
                </button>
              </div>
            </div>

            {/* Results Canvas */}
            {isSearching ? (
              <div className="p-10 rounded-3xl bg-[#141414] border border-[#262626] text-center space-y-3">
                <RefreshCw className="w-7 h-7 animate-spin text-blue-400 mx-auto" />
                <div className="text-sm font-bold text-white">Broadcasting Beckn /search across 2,400+ Local &amp; National Nodes...</div>
                <div className="text-xs font-mono text-neutral-400">
                  Decomposing Grocery SKUs → Gupta Super Bazaar • Decomposing Hardware SKUs → Pooja Electricals
                </div>
              </div>
            ) : workflowStep >= 2 ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Multi-Seller Summary Card */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#161616] to-emerald-950/40 border border-[#333] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40">
                        MULTI-SELLER BUNDLE COMPILED
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">1 Consolidated Delivery Run</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Total Landed: <span className="text-amber-400 font-black">₹667</span>
                      <span className="text-xs text-emerald-400 font-medium ml-2 font-mono">
                        (You save ₹145 vs Dark-Store Surge Pricing)
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsInspectorOpen(true)}
                      className="px-3.5 py-2 rounded-xl bg-[#1f1f1f] hover:bg-[#282828] border border-[#383838] text-xs font-mono text-emerald-400 transition-all flex items-center gap-1.5"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Inspect Beckn JSON</span>
                    </button>

                    <button
                      onClick={handleInitiatePayment}
                      disabled={isPaying || paymentDone}
                      className={`px-6 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                        paymentDone
                          ? 'bg-emerald-600 text-white cursor-default'
                          : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-600/30 hover:scale-105'
                      }`}
                    >
                      {paymentDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-white" />
                          <span>Order #99214 Confirmed!</span>
                        </>
                      ) : isPaying ? (
                        <span>Broadcasting Beckn /confirm...</span>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span>1-Click UPI Pay ₹667</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2 Discovered Stores Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Seller 1: Local Kirana */}
                  <div className="p-5 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                          <Store className="w-4 h-4 text-amber-400" />
                          <span>SELLER 1: Gupta Super Bazaar</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202020] text-neutral-300">
                          450m • Local Kirana
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-[#242424]">
                          <span className="text-white font-medium">Aashirvaad Superior Shudh Chakki Atta (5kg)</span>
                          <span className="text-amber-400 font-bold">₹245</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-[#242424]">
                          <span className="text-white font-medium">Fortune Kachi Ghani Mustard Oil (1L Bottle)</span>
                          <span className="text-amber-400 font-bold">₹142</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#242424] text-[11px] text-neutral-400 flex justify-between items-center">
                      <span>Subtotal: <strong>₹387</strong></span>
                      <span className="text-emerald-400 font-mono font-semibold">Blinkit/Zepto: ₹453 (+₹66 surge)</span>
                    </div>
                  </div>

                  {/* Seller 2: Local Hardware / DigiBazaar */}
                  <div className="p-5 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                          <Store className="w-4 h-4 text-emerald-400" />
                          <span>SELLER 2: Pooja Electricals &amp; Spares</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202020] text-neutral-300">
                          DigiBazaar Node
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-[#242424]">
                          <span className="text-white font-medium">Bajaj Rex 500W Mixer Grinder Jar Blade</span>
                          <span className="text-amber-400 font-bold">₹280</span>
                        </div>
                        <p className="text-[11px] text-neutral-400">
                          Direct inventory sync via DigiDukaan. Genuine factory replacement part.
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#242424] text-[11px] text-neutral-400 flex justify-between items-center">
                      <span>Subtotal: <strong>₹280</strong></span>
                      <span className="text-amber-400 font-mono font-semibold">Unavailable on Q-Commerce</span>
                    </div>
                  </div>
                </div>

                {/* Live Fleet Tracking Section */}
                {workflowStep >= 4 && (
                  <div className="p-6 rounded-3xl bg-[#141414] border border-emerald-900/40 space-y-4 animate-in slide-in-from-bottom duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#242424] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                        <span className="text-sm font-bold text-white">
                          Live FIFO Fleet Dispatch (FleetConnect / Shadowfax)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">
                        Order #ONDC-ORD-99214 • Active Delivery Route
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">ASSIGNED RIDER</span>
                        <div className="text-white font-bold text-sm">Ramesh Kumar (Shadowfax)</div>
                        <div className="text-neutral-400 text-[11px]">Vehicle: Bajaj Chetak EV (MH-02-EE-4921)</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">ROUTE OPTIMIZATION</span>
                        <div className="text-emerald-300 font-bold text-sm">Combined Pickup (1 Run)</div>
                        <div className="text-neutral-400 text-[11px]">Gupta Kirana (450m) ➔ Pooja Spares (1.2km) ➔ Citizen</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">TRANSIT ESCROW &amp; WARRANTY</span>
                        <div className="text-blue-400 font-bold text-sm">Zurich Kotak Sachet Cover</div>
                        <div className="text-neutral-400 text-[11px]">₹1.50 micro-premium active on Beckn registry</div>
                      </div>
                    </div>

                    {/* Auto-Dispute Test Trigger */}
                    <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                          <span>Simulation: Package Arrived with Oil Leakage in Transit</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Experience instant 60-second dispute verification using computer vision unboxing forensics.
                        </p>
                      </div>

                      <button
                        onClick={handleTriggerDispute}
                        disabled={disputeTriggered}
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0 transition-all shadow-lg shadow-rose-600/30"
                      >
                        {disputeSettled ? '✓ 60s Dispute Settled' : disputeTriggered ? 'Verifying AI Telemetry...' : 'Trigger 60s Dispute'}
                      </button>
                    </div>
                  </div>
                )}

                {/* 60s Settlement Result */}
                {workflowStep >= 5 && (
                  <div className="p-6 rounded-3xl bg-[#141414] border border-rose-900/50 space-y-4 animate-in slide-in-from-bottom duration-300">
                    <div className="flex items-center justify-between border-b border-[#242424] pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        <span className="text-sm font-bold text-white">
                          60s Auto-IGM Resolution Confirmed (0 Human Escalations)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        UPI_REV_99812402 • Settled
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">VISION OCR AUDIT</span>
                        <div className="text-white font-bold">Seal Rupture Confirmed</div>
                        <div className="text-neutral-400 text-[11px]">Stain pattern cross-matched to Fortune Oil 1L SKU</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">TELEMETRY SENSOR CHECK</span>
                        <div className="text-rose-400 font-bold">4.8G Shock Recorded</div>
                        <div className="text-neutral-400 text-[11px]">Weight delta: -39% loss at hub sort facility</div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2a2a2a] space-y-1">
                        <span className="text-neutral-400 font-mono text-[10px]">INSTANT PAYOUT</span>
                        <div className="text-emerald-400 font-bold">₹345 Credited to VPA</div>
                        <div className="text-neutral-400 text-[11px]">Sachet escrow auto-reversed under ONDC rules</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: DIGIBAZAAR RETAIL MATRIX */}
        {/* ========================================================================= */}
        {activeTab === 'RETAIL' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Retail &amp; DigiCatalog Matrix</h2>
                <p className="text-xs text-neutral-400">
                  Real-time local inventory sync and transparent price benchmarking against quick-commerce dark stores.
                </p>
              </div>

              <button
                onClick={() => setIsShelfScanOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all self-start sm:self-auto"
              >
                <Camera className="w-4 h-4" />
                <span>Open Kirana Shelf Scanner</span>
              </button>
            </div>

            <RetailComparisonMatrix
              products={products}
              lang={lang}
              onInspectPayload={() => setIsInspectorOpen(true)}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: YATRISETU 1-QR TRANSIT PASS */}
        {/* ========================================================================= */}
        {activeTab === 'TRANSIT' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">YatriSetu: One-Pass Dynamic Multimodal Transit</h2>
              <p className="text-xs text-neutral-400">
                Unifying 9 Indian Metros, BEST/DTC city buses, and Bharat Taxi with real-time delay auto-recovery.
              </p>
            </div>

            <MultimodalTicketPass lang={lang} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: 60S AUTO-DISPUTE RESOLUTION */}
        {/* ========================================================================= */}
        {activeTab === 'DISPUTE' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Auto-IGM Dispute Resolver &amp; 60s UPI Reversal</h2>
              <p className="text-xs text-neutral-400">
                Computer vision unboxing audit eliminates the 14-day multi-party dispute black hole on ONDC.
              </p>
            </div>

            <DisputeEvidenceAuditor lang={lang} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: WARD 184 CIVIC QUORUM */}
        {/* ========================================================================= */}
        {activeTab === 'COORDINATION' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Ward 184 Citizen Coordination Bloc</h2>
              <p className="text-xs text-neutral-400">
                Coordination &gt; Passive Tracking: Citizen voter quorum engine for civic action, potholes, and illegal banner removal.
              </p>
            </div>

            <CoordinationEngine lang={lang} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: NETWORK ARCHITECTURE & NATIONAL SCALE */}
        {/* ========================================================================= */}
        {activeTab === 'ARCHITECTURE' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#141414] border border-[#2a2a2a] space-y-6">
              <div className="border-b border-[#282828] pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 mb-2">
                  <Network className="w-3.5 h-3.5" />
                  <span>DPIIT ONDC Digital Public Infrastructure</span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Kubra System Architecture &amp; Scalability
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  Decentralized open commerce rails built for 1.4 billion Indian citizens.
                </p>
              </div>

              {/* Architecture 6 Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                    <Store className="w-4 h-4" />
                    <span>1. Unifying 12M Local Merchants</span>
                  </div>
                  <p className="text-neutral-300">
                    Bypasses proprietary quick-commerce warehouses by allowing local Kiranas and Bazaars to broadcast real-time inventory via DigiDukaan and Beckn protocol.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-blue-400 text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>2. OpenAI Vyapar LM Intent Parser</span>
                  </div>
                  <p className="text-neutral-300">
                    Processes multilingual voice (Hindi/English/Tamil), OCR handwritten lists, and natural language prompts, instantly decomposing them into atomic Beckn `/search` queries.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                    <Train className="w-4 h-4" />
                    <span>3. YatriSetu Dynamic Mobility Mesh</span>
                  </div>
                  <p className="text-neutral-300">
                    Links 9 Metro networks (MMOPL, DMRC, BMRCL, KMRL) with city bus transit authorities under one dynamic QR ticket with zero-penalty automatic delay re-routing.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-purple-400 text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>4. 60-Second Auto-IGM Escrow</span>
                  </div>
                  <p className="text-neutral-300">
                    Eliminates the 14-day dispute loop through automated unboxing vision OCR + courier weight loss cross-matching, triggering instant UPI reversal.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-sky-400 text-sm flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>5. Beckn Protocol Core v1.0 Compliance</span>
                  </div>
                  <p className="text-neutral-300">
                    Strict adherence to open-source Beckn JSON contracts (`/search`, `/select`, `/init`, `/confirm`, `/issue`) ensuring zero vendor lock-in.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#181818] border border-[#2c2c2c] space-y-2">
                  <div className="font-bold text-rose-400 text-sm flex items-center gap-1.5">
                    <Cpu className="w-4 h-4" />
                    <span>6. Population-Scale Reliability</span>
                  </div>
                  <p className="text-neutral-300">
                    Built on stateless microservices and edge CDN caching capable of handling 500,000 requests per minute with sub-50ms latency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Simulated UPI Payment Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#161616] border border-[#333] rounded-3xl p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#282828] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-white text-base">Unified UPI Checkout</span>
              </div>
              <button
                onClick={() => setShowUpiModal(false)}
                className="text-neutral-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs text-neutral-400 font-mono">Total Landed Amount</span>
              <div className="text-3xl font-black text-amber-400">₹667.00</div>
              <span className="text-[11px] text-neutral-400">
                Multi-Seller: Gupta Kirana (₹387) + Pooja Electricals (₹280)
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-neutral-400">Select UPI App:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleConfirmUPIPayment}
                  className="p-3 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333] text-left text-xs font-semibold text-white transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  <span>Google Pay</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className="p-3 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333] text-left text-xs font-semibold text-white transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span>PhonePe</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className="p-3 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333] text-left text-xs font-semibold text-white transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span>Paytm UPI</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className="p-3 rounded-xl bg-[#202020] hover:bg-[#282828] border border-[#333] text-left text-xs font-semibold text-white transition-all flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>BHIM UPI</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirmUPIPayment}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              1-Tap Authorize Payment (₹667)
            </button>
          </div>
        </div>
      )}

      {/* Kirana Shelf Scanner Modal */}
      <ShelfScannerModal
        isOpen={isShelfScanOpen}
        onClose={() => setIsShelfScanOpen(false)}
        onStockUpdated={(id, stock) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, stockCount: stock, isAvailable: stock > 0 } : p))
          );
        }}
        products={products}
        lang={lang}
      />

      {/* Beckn Protocol Inspector Drawer */}
      <ProtocolInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-[#222] bg-[#0e0e0e] py-6 text-center text-xs text-neutral-500 font-mono">
        Kubra • Open Commerce Superlayer for Bharat • DPIIT ONDC Rail
      </footer>
    </div>
  );
};
