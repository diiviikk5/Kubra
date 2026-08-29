'use client';

import React, { useState } from 'react';
import {
  Search,
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
  Layers,
  Check,
  QrCode,
  Sun,
  Moon,
  Copy,
  BookOpen,
  X,
  Truck,
  PackageCheck
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { RetailComparisonMatrix } from '@/components/RetailComparisonMatrix';
import { MultimodalTicketPass } from '@/components/MultimodalTicketPass';
import { DisputeEvidenceAuditor } from '@/components/DisputeEvidenceAuditor';
import { CoordinationEngine } from '@/components/CoordinationEngine';
import { ShelfScannerModal } from '@/components/ShelfScannerModal';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/mock-data';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface CitizenSuperlayerAppProps {
  onClose?: () => void;
  initialTab?: 'SEARCH' | 'RETAIL' | 'TRANSIT' | 'DISPUTE' | 'COORDINATION' | 'ARCHITECTURE';
}

export const CitizenSuperlayerApp: React.FC<CitizenSuperlayerAppProps> = ({
  onClose,
  initialTab = 'SEARCH',
}) => {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'SEARCH' | 'RETAIL' | 'TRANSIT' | 'DISPUTE' | 'COORDINATION' | 'ARCHITECTURE'>(initialTab);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isShelfScanOpen, setIsShelfScanOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  // Citizen Workflow State
  const [workflowStep, setWorkflowStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [query, setQuery] = useState('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [disputeTriggered, setDisputeTriggered] = useState(false);
  const [disputeSettled, setDisputeSettled] = useState(false);
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);

  const upiIntentUri = 'upi://pay?pa=ondc.bharat@icici&pn=Kubra+Open+Commerce&am=667.00&cu=INR&tn=ONDC-ORD-99214';

  const handleRunSearch = (customQuery?: string) => {
    const q = customQuery || query;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setWorkflowStep(2);
    }, 600);
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
    }, 1500);
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 900);
  };

  const handleTriggerDispute = () => {
    setDisputeTriggered(true);
    setTimeout(() => {
      setDisputeSettled(true);
      setWorkflowStep(5);
    }, 1200);
  };

  const handleResetWorkflow = () => {
    setWorkflowStep(1);
    setPaymentDone(false);
    setDisputeTriggered(false);
    setDisputeSettled(false);
    setIsPaying(false);
  };

  const copyUpiString = () => {
    navigator.clipboard.writeText(upiIntentUri);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
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

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 ${isDark ? 'bg-[#09090b] text-[#fafafa]' : 'bg-[#fafafa] text-[#09090b]'} flex flex-col font-geist overflow-x-hidden`}>
      {/* Top Navbar */}
      <header className={`sticky top-0 z-40 border-b ${isDark ? 'border-zinc-800 bg-[#09090b]/95' : 'border-zinc-200 bg-white/95'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`w-8 h-8 rounded-lg ${isDark ? 'bg-zinc-100 text-black' : 'bg-black text-white'} flex items-center justify-center font-bold text-sm shadow-sm`}>
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight">Kubra</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-100 text-zinc-700 border border-zinc-300'} font-mono`}>
                  ONDC Protocol
                </span>
              </div>
              <p className={`text-[10px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'} -mt-0.5 hidden sm:block font-mono`}>
                Open Digital Commerce Superlayer
              </p>
            </div>
          </div>

          {/* Center Tabs */}
          <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-xl border ${isDark ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-100 border-zinc-200'} text-xs`}>
            <button
              onClick={() => setActiveTab('SEARCH')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'SEARCH'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Universal Search</span>
            </button>

            <button
              onClick={() => setActiveTab('RETAIL')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'RETAIL'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>DigiBazaar</span>
            </button>

            <button
              onClick={() => setActiveTab('TRANSIT')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'TRANSIT'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Train className="w-3.5 h-3.5" />
              <span>YatriSetu Transit</span>
            </button>

            <button
              onClick={() => setActiveTab('DISPUTE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'DISPUTE'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>60s Dispute</span>
            </button>

            <button
              onClick={() => setActiveTab('COORDINATION')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'COORDINATION'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Civic Quorum</span>
            </button>

            <button
              onClick={() => setActiveTab('ARCHITECTURE')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'ARCHITECTURE'
                  ? isDark ? 'bg-zinc-100 text-black shadow-sm font-semibold' : 'bg-black text-white shadow-sm font-semibold'
                  : isDark ? 'text-zinc-400 hover:text-zinc-200' : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Guide Button */}
            <button
              onClick={() => setIsGuideOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="How Kubra Works"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Guide</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border text-xs transition-all ${
                isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-zinc-300" /> : <Moon className="w-3.5 h-3.5 text-zinc-700" />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800' : 'border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
            </button>

            {/* Beckn Inspector */}
            <button
              onClick={() => setIsInspectorOpen(true)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all ${
                isDark
                  ? 'border-emerald-800/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50'
                  : 'border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Beckn v1.0</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                  isDark ? 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white' : 'border-zinc-200 bg-zinc-100 text-zinc-600 hover:text-black'
                }`}
              >
                Poster
              </button>
            )}
          </div>
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className={`lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t ${isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'} text-xs`}>
          <button
            onClick={() => setActiveTab('SEARCH')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'SEARCH' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            Universal Search
          </button>
          <button
            onClick={() => setActiveTab('RETAIL')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'RETAIL' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            DigiBazaar
          </button>
          <button
            onClick={() => setActiveTab('TRANSIT')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'TRANSIT' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            YatriSetu
          </button>
          <button
            onClick={() => setActiveTab('DISPUTE')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'DISPUTE' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            60s Dispute
          </button>
          <button
            onClick={() => setActiveTab('COORDINATION')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'COORDINATION' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            Quorum
          </button>
          <button
            onClick={() => setActiveTab('ARCHITECTURE')}
            className={`px-3 py-1.5 rounded-lg shrink-0 ${activeTab === 'ARCHITECTURE' ? (isDark ? 'bg-zinc-100 text-black font-semibold' : 'bg-black text-white font-semibold') : (isDark ? 'text-zinc-400' : 'text-zinc-600')}`}
          >
            Architecture
          </button>
        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-20">
        {/* ========================================================================= */}
        {/* TAB 1: UNIVERSAL SEARCH & MULTI-SELLER BUNDLING */}
        {/* ========================================================================= */}
        {activeTab === 'SEARCH' && (
          <div className="space-y-6">
            {/* Header Hero Card */}
            <div className={`p-6 sm:p-8 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col md:flex-row md:items-center justify-between gap-6`}>
              <div className="space-y-2">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono ${isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-100 text-zinc-700 border border-zinc-300'}`}>
                  <span>DPIIT Open Network Protocol</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  &ldquo;I shouldn&apos;t need to know which app sells what. <br />
                  <span className={isDark ? 'text-zinc-300' : 'text-zinc-600'}>
                    I should just be able to ask India.&rdquo;
                  </span>
                </h1>
                <p className={`text-xs sm:text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'} max-w-2xl leading-relaxed`}>
                  Type or speak your shopping list. Kubra automatically searches neighborhood Kiranas, specialty hardware stores, and pharmacies, compiling a single multi-seller delivery with zero surge fees.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                <button
                  onClick={() =>
                    speakText(
                      lang === 'hi'
                        ? 'कुबरा में आपका स्वागत है। भारत के किसी भी सामान के लिए सिर्फ एक बार पूछें।'
                        : 'Welcome to Kubra. Ask India for anything across groceries, hardware, transit, or disputes in one single prompt.'
                    )
                  }
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Voice Guide</span>
                </button>

                <button
                  onClick={handleResetWorkflow}
                  className={`px-3.5 py-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>

            {/* Step Progress Tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 1
                    ? isDark ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-zinc-100 border-zinc-400 text-black'
                    : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  1
                </div>
                <span className="truncate font-semibold">1. Input List</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 2
                    ? isDark ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-zinc-100 border-zinc-400 text-black'
                    : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  2
                </div>
                <span className="truncate font-semibold">2. Node Search</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 3
                    ? isDark ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-zinc-100 border-zinc-400 text-black'
                    : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  3
                </div>
                <span className="truncate font-semibold">3. Multi-Seller Cart</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 4
                    ? isDark ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300' : 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  4
                </div>
                <span className="truncate font-semibold">4. UPI &amp; Fleet</span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                  workflowStep >= 5
                    ? isDark ? 'bg-zinc-900 border-zinc-600 text-white' : 'bg-zinc-100 border-zinc-400 text-black'
                    : isDark ? 'bg-zinc-950 border-zinc-800 text-zinc-600' : 'bg-white border-zinc-200 text-zinc-400'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                  5
                </div>
                <span className="truncate font-semibold">5. 60s Auto-Dispute</span>
              </div>
            </div>

            {/* Input Bar Card */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-4`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-semibold flex items-center gap-2">
                  <Search className="w-4 h-4 text-zinc-400" />
                  <span>Type or Speak what you need across India</span>
                </span>
                <span className={`text-[11px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  Decentralized ONDC Protocol Query
                </span>
              </div>

              <div className={`flex items-center rounded-xl p-2 border ${isDark ? 'bg-zinc-950 border-zinc-700/80 focus-within:border-zinc-400' : 'bg-zinc-50 border-zinc-300 focus-within:border-zinc-700'} transition-all`}>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask India for anything (e.g. 5kg Atta, 1L Mustard oil, mixer grinder blade)..."
                  className="w-full bg-transparent text-sm sm:text-base focus:outline-none px-3"
                />

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={handleVoiceInput}
                    className={`p-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isListening
                        ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                        : isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border-zinc-300'
                    }`}
                  >
                    {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsShelfScanOpen(true)}
                    className={`p-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      isDark ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700' : 'bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border-zinc-300'
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Scan List</span>
                  </button>

                  <button
                    onClick={() => handleRunSearch()}
                    className={`px-4 sm:px-5 py-2 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all ${
                      isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
                    } cursor-pointer`}
                  >
                    <span>Search Nodes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Presets */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-mono">
                <span className={`${isDark ? 'text-zinc-500' : 'text-zinc-500'} shrink-0`}>Presets:</span>
                <button
                  onClick={() => {
                    setQuery('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
                    handleRunSearch('5kg Aashirvaad Atta, 1L Fortune Mustard Oil, and Bajaj Mixer Blade');
                  }}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                  }`}
                >
                  🛒 Grocery + Hardware Split (Atta + Oil + Mixer Blade)
                </button>
                <button
                  onClick={() => {
                    setQuery('Ghatkopar to BKC composite Metro and BEST Bus pass');
                    setActiveTab('TRANSIT');
                  }}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                  }`}
                >
                  🚊 YatriSetu 1-QR Multimodal Transit
                </button>
                <button
                  onClick={() => {
                    setQuery('Damaged Fortune oil bottle in order #99214 refund');
                    setActiveTab('DISPUTE');
                  }}
                  className={`px-3 py-1.5 rounded-lg border whitespace-nowrap transition-all ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                  }`}
                >
                  🛡️ 60s Unboxing Dispute
                </button>
              </div>
            </div>

            {/* Results Canvas */}
            {isSearching ? (
              <div className={`p-10 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200'} text-center space-y-3`}>
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-zinc-400" />
                <div className="text-sm font-semibold">Broadcasting Beckn /search across 2,400+ Local &amp; National Nodes...</div>
                <div className={`text-xs font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  Decomposing Grocery SKUs ➔ Gupta Super Bazaar • Decomposing Hardware SKUs ➔ Pooja Electricals
                </div>
              </div>
            ) : workflowStep >= 2 ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                {/* Multi-Seller Summary Card */}
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold border ${
                        isDark ? 'bg-zinc-800 text-zinc-200 border-zinc-700' : 'bg-zinc-100 text-zinc-800 border-zinc-300'
                      }`}>
                        MULTI-SELLER BUNDLE COMPILED
                      </span>
                      <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>1 Consolidated Delivery Run</span>
                    </div>
                    <h3 className="text-xl font-bold mt-1">
                      Total Landed: <span className="font-extrabold">₹667.00</span>
                      <span className="text-xs text-emerald-500 font-medium ml-2 font-mono">
                        (Save ₹145 vs Dark-Store Surge Pricing)
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsInspectorOpen(true)}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition-all flex items-center gap-1.5 ${
                        isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Beckn JSON</span>
                    </button>

                    <button
                      onClick={handleInitiatePayment}
                      disabled={isPaying || paymentDone}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
                        paymentDone
                          ? 'bg-emerald-600 text-white cursor-default'
                          : isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
                      }`}
                    >
                      {paymentDone ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Order Confirmed (#99214)</span>
                        </>
                      ) : isPaying ? (
                        <span>Broadcasting /confirm...</span>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4" />
                          <span>1-Click UPI Pay ₹667</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* 2 Discovered Stores Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Seller 1: Local Kirana */}
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col justify-between space-y-4`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <Store className="w-4 h-4" />
                          <span>STORE 1: Gupta Super Bazaar</span>
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                          450m • Local Kirana
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                          <span className="font-medium">Aashirvaad Superior Shudh Chakki Atta (5kg)</span>
                          <span className="font-bold">₹245</span>
                        </div>
                        <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                          <span className="font-medium">Fortune Kachi Ghani Mustard Oil (1L Bottle)</span>
                          <span className="font-bold">₹142</span>
                        </div>
                      </div>
                    </div>

                    <div className={`pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'} text-[11px] flex justify-between items-center ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      <span>Subtotal: <strong>₹387.00</strong></span>
                      <span className="text-emerald-500 font-mono font-semibold">Blinkit/Zepto: ₹453 (+₹66 surge)</span>
                    </div>
                  </div>

                  {/* Seller 2: Local Hardware / DigiBazaar */}
                  <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} flex flex-col justify-between space-y-4`}>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold flex items-center gap-1.5">
                          <Store className="w-4 h-4" />
                          <span>STORE 2: Pooja Electricals &amp; Spares</span>
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isDark ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-700'}`}>
                          1.2km • Hardware
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className={`flex justify-between py-1.5 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-100'}`}>
                          <span className="font-medium">Bajaj Rex 500W Mixer Grinder Jar Blade</span>
                          <span className="font-bold">₹280</span>
                        </div>
                        <p className={`text-[11px] ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                          Direct inventory sync via DigiDukaan. Genuine OEM replacement part.
                        </p>
                      </div>
                    </div>

                    <div className={`pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-zinc-200'} text-[11px] flex justify-between items-center ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      <span>Subtotal: <strong>₹280.00</strong></span>
                      <span className="text-amber-500 font-mono font-semibold">Unavailable on Q-Commerce</span>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown vs Quick Commerce Matrix */}
                <div className={`p-5 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-3 text-xs`}>
                  <div className="font-bold text-sm flex items-center justify-between">
                    <span>Landed Cost Comparison</span>
                    <span className="text-[11px] font-mono text-emerald-500 font-semibold">Total Savings: ₹218.00 (24%)</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className={`border-b ${isDark ? 'border-zinc-800 text-zinc-400' : 'border-zinc-200 text-zinc-600'} text-[11px] font-mono`}>
                          <th className="py-2">Fee Component</th>
                          <th className="py-2">Kubra (ONDC Local)</th>
                          <th className="py-2">Blinkit / Zepto / Dark Stores</th>
                          <th className="py-2">Amazon / E-Commerce</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/40 text-[12px]">
                        <tr>
                          <td className="py-2">Items Total</td>
                          <td className="py-2 font-semibold">₹667.00</td>
                          <td className="py-2 line-through text-zinc-500">₹790.00</td>
                          <td className="py-2">₹725.00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Delivery Fee</td>
                          <td className="py-2 font-semibold">₹25.00 (Single Run)</td>
                          <td className="py-2 text-rose-400">₹65.00</td>
                          <td className="py-2">₹40.00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Surge / Night Fee</td>
                          <td className="py-2 font-semibold text-emerald-500">₹0.00 (No Surge)</td>
                          <td className="py-2 text-rose-400">₹40.00</td>
                          <td className="py-2">₹0.00</td>
                        </tr>
                        <tr>
                          <td className="py-2">Handling / Platform Fee</td>
                          <td className="py-2 font-semibold text-emerald-500">₹0.00</td>
                          <td className="py-2 text-rose-400">₹15.00</td>
                          <td className="py-2">₹5.00</td>
                        </tr>
                        <tr className="font-bold text-[13px]">
                          <td className="py-2">Total Net Payable</td>
                          <td className="py-2 text-emerald-500">₹692.00</td>
                          <td className="py-2 text-rose-400">₹910.00</td>
                          <td className="py-2">₹770.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Step 4: Live Fleet Tracking Section */}
                {workflowStep >= 4 && (
                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-4 animate-in slide-in-from-bottom duration-300`}>
                    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-3`}>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        <span className="text-sm font-bold">
                          Live FIFO Fleet Dispatch (FleetConnect / Shadowfax)
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-500">
                        Order #ONDC-ORD-99214 • Dispatched
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>COURIER PARTNER</span>
                        <div className="font-bold text-sm">Ramesh Kumar (Shadowfax)</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Vehicle: Bajaj Chetak EV (MH-02-EE-4921)</div>
                      </div>

                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>ROUTE OPTIMIZATION</span>
                        <div className="font-bold text-sm">Single Run Multi-Pickup</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Gupta Kirana ➔ Pooja Spares ➔ Delivery</div>
                      </div>

                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>SACHET TRANSIT COVER</span>
                        <div className="font-bold text-sm">Zurich Kotak Escrow Protection</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>₹1.50 micro-premium active</div>
                      </div>
                    </div>

                    {/* Auto-Dispute Test Trigger */}
                    <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-300'} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-500" />
                          <span>Simulate Damaged Item in Transit</span>
                        </div>
                        <p className={`text-[11px] mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          Test how Kubra settles disputes in 60 seconds using courier telemetry and instant UPI reversal.
                        </p>
                      </div>

                      <button
                        onClick={handleTriggerDispute}
                        disabled={disputeTriggered}
                        className={`px-4 py-2 rounded-lg font-bold text-xs shrink-0 transition-all ${
                          disputeSettled
                            ? 'bg-emerald-600 text-white cursor-default'
                            : isDark ? 'bg-zinc-100 text-black hover:bg-white' : 'bg-black text-white hover:bg-zinc-800'
                        }`}
                      >
                        {disputeSettled ? '✓ 60s Dispute Settled' : disputeTriggered ? 'Verifying Telemetry...' : 'Trigger 60s Dispute'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 5: 60s Settlement Result */}
                {workflowStep >= 5 && (
                  <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-4 animate-in slide-in-from-bottom duration-300`}>
                    <div className={`flex items-center justify-between border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-3`}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-bold">
                          60s Auto-IGM Resolution Confirmed (0 Human Escalations)
                        </span>
                      </div>
                      <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${isDark ? 'bg-emerald-950/40 text-emerald-300 border-emerald-700' : 'bg-emerald-50 text-emerald-800 border-emerald-300'}`}>
                        UPI_REV_99812402 • Settled
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>EVIDENCE CHECK</span>
                        <div className="font-bold">Seal Rupture Verified</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Stain pattern matches Fortune Oil SKU</div>
                      </div>

                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>WEIGHT TELEMETRY</span>
                        <div className="font-bold">4.8G Shock Sensor Recorded</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>-39% weight delta at sorting facility</div>
                      </div>

                      <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1`}>
                        <span className={`text-[10px] font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>INSTANT REVERSAL</span>
                        <div className="font-bold text-emerald-500">₹345 Credited to UPI</div>
                        <div className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Escrow refunded directly to citizen VPA</div>
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
                <h2 className="text-2xl font-bold">Retail &amp; DigiCatalog Matrix</h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                  Real-time local inventory sync and transparent price benchmarking against quick-commerce dark stores.
                </p>
              </div>

              <button
                onClick={() => setIsShelfScanOpen(true)}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                  isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
                } self-start sm:self-auto cursor-pointer`}
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
              <h2 className="text-2xl font-bold">YatriSetu: One-Pass Dynamic Multimodal Transit</h2>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
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
              <h2 className="text-2xl font-bold">Auto-IGM Dispute Resolver &amp; 60s UPI Reversal</h2>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Automated unboxing forensics eliminate the 14-day multi-party dispute black hole on ONDC.
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
              <h2 className="text-2xl font-bold">Ward 184 Citizen Coordination Bloc</h2>
              <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Citizen voter quorum engine for civic action, potholes, and community escrow release.
              </p>
            </div>

            <CoordinationEngine lang={lang} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: NETWORK ARCHITECTURE & SPECIFICATIONS */}
        {/* ========================================================================= */}
        {activeTab === 'ARCHITECTURE' && (
          <div className="space-y-6">
            <div className={`p-6 sm:p-8 rounded-2xl border ${isDark ? 'bg-[#121214] border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'} space-y-6`}>
              <div className={`border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-4`}>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-2 ${
                  isDark ? 'bg-zinc-800 text-zinc-300 border border-zinc-700' : 'bg-zinc-100 text-zinc-700 border border-zinc-300'
                }`}>
                  <span>DPIIT ONDC Digital Public Rail</span>
                </div>
                <h2 className="text-2xl font-bold">
                  Kubra System Architecture &amp; Scalability
                </h2>
                <p className={`text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-1`}>
                  Decentralized open commerce rails built for 1.4 billion Indian citizens.
                </p>
              </div>

              {/* 6 Architectural Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Store className="w-4 h-4" />
                    <span>1. Unifying 12M Local Merchants</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Bypasses proprietary quick-commerce warehouses by allowing local Kiranas and Bazaars to broadcast real-time inventory via DigiDukaan and Beckn protocol.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Zap className="w-4 h-4" />
                    <span>2. OpenAI Vyapar LM Intent Parser</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Processes multilingual voice (Hindi/English), OCR handwritten lists, and natural language prompts, instantly decomposing them into atomic Beckn `/search` queries.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Train className="w-4 h-4" />
                    <span>3. YatriSetu Dynamic Mobility Mesh</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Links 9 Metro networks (MMOPL, DMRC, BMRCL, KMRL) with city bus transit authorities under one dynamic QR ticket with zero-penalty automatic delay re-routing.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span>4. 60-Second Auto-IGM Escrow</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Eliminates the 14-day dispute loop through automated unboxing forensics + courier weight loss cross-matching, triggering instant UPI reversal.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" />
                    <span>5. Beckn Protocol Core v1.0 Compliance</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Strict adherence to open-source Beckn JSON contracts (`/search`, `/select`, `/init`, `/confirm`, `/issue`) ensuring zero vendor lock-in.
                  </p>
                </div>

                <div className={`p-5 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-2`}>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>6. Population-Scale Reliability</span>
                  </div>
                  <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                    Built on stateless microservices and edge CDN caching capable of handling 500,000 requests per minute with sub-50ms latency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Real Scannable UPI Payment Modal */}
      {showUpiModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-2xl border p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 ${
            isDark ? 'bg-[#121214] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
          }`}>
            <div className={`flex items-center justify-between border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-3`}>
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-zinc-400" />
                <span className="font-bold text-base">Unified UPI Payment</span>
              </div>
              <button
                onClick={() => setShowUpiModal(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="text-center space-y-1">
              <span className={`text-xs font-mono ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Scan with Any UPI App</span>
              <div className="text-3xl font-black">₹667.00</div>
              <span className={`text-[11px] ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                Gupta Kirana (₹387) + Pooja Electricals (₹280)
              </span>
            </div>

            {/* Real Scannable QR Code */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="p-3 bg-white rounded-xl border border-zinc-300 shadow-md">
                <QRCodeSVG
                  value={upiIntentUri}
                  size={160}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <span className={`text-[10px] font-mono mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                VPA: ondc.bharat@icici
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>Or Pay via App:</span>
                <button
                  onClick={copyUpiString}
                  className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  {copiedUpi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedUpi ? 'Copied URI' : 'Copy Intent'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleConfirmUPIPayment}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-black'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Google Pay</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-black'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>PhonePe</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-black'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                  <span>Paytm UPI</span>
                </button>

                <button
                  onClick={handleConfirmUPIPayment}
                  className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all flex items-center gap-2 ${
                    isDark ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-white' : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-300 text-black'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>BHIM UPI</span>
                </button>
              </div>
            </div>

            <button
              onClick={handleConfirmUPIPayment}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-black hover:bg-zinc-800 text-white'
              } cursor-pointer`}
            >
              1-Tap Authorize (₹667.00)
            </button>
          </div>
        </div>
      )}

      {/* Citizen Guide & Instructions Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-150 ${
            isDark ? 'bg-[#121214] border-zinc-800 text-white' : 'bg-white border-zinc-200 text-black'
          }`}>
            <div className={`flex items-center justify-between border-b ${isDark ? 'border-zinc-800' : 'border-zinc-200'} pb-3`}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-bold text-base">How Kubra Open Commerce Works</span>
              </div>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="text-zinc-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs leading-relaxed">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1.5`}>
                <h4 className="font-bold text-sm">1. Decentralized ONDC Discovery</h4>
                <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                  When you type or speak a request, Kubra broadcasts a Beckn <code>/search</code> query to thousands of local Seller Network Participants (NPs) within your delivery radius, discovering unorganized Kiranas, pharmacies, and specialty stores.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1.5`}>
                <h4 className="font-bold text-sm">2. Multi-Seller Bundle Compilation</h4>
                <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                  Instead of placing separate orders with separate delivery charges, Kubra clusters items across nearby stores into one consolidated run. A single courier picks up groceries from Store A and hardware from Store B.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1.5`}>
                <h4 className="font-bold text-sm">3. 1-Click NPCI UPI Split Settlement</h4>
                <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                  A single UPI authorization atomically settles payments to both merchants and the courier according to Beckn protocol contracts, with zero hidden handling fees.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'} space-y-1.5`}>
                <h4 className="font-bold text-sm">4. 60-Second Auto-IGM Dispute Settlement</h4>
                <p className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>
                  If an item arrives damaged, transit telemetry (courier shock sensors and weight delta) cross-matches the claim, auto-reversing the refund directly to your UPI ID within 60 seconds without customer support queues.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsGuideOpen(false)}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all ${
                isDark ? 'bg-white text-black hover:bg-zinc-200' : 'bg-black text-white hover:bg-zinc-800'
              }`}
            >
              Got It, Continue to App
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
      <footer className={`border-t py-6 text-center text-xs font-mono ${isDark ? 'border-zinc-800 bg-[#09090b] text-zinc-500' : 'border-zinc-200 bg-white text-zinc-400'}`}>
        Kubra • Open Commerce Superlayer for Bharat • DPIIT ONDC Rail
      </footer>
    </div>
  );
};
