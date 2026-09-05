'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  createRazorpayOrder,
  evaluateSpendingBounds,
  simulateRazorpayCapture,
  RazorpayOrderResponse
} from '@/lib/razorpay-agent';
import { DEFAULT_BUYER_MANDATE } from '@/lib/agentic-protocols';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  Terminal,
  Volume2,
  RefreshCw,
  CreditCard,
  Mic,
  MicOff,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import confetti from 'canvas-confetti';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionPayload?: {
    skus: { name: string; price: number; qty: number }[];
    totalINR: number;
    razorpayOrderId?: string;
    status: 'PENDING_GATED_APPROVAL' | 'EXECUTED_AUTONOMOUS';
  };
}

export const AgentConversationalCheckout: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [gatedModalOpen, setGatedModalOpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<RazorpayOrderResponse | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_01',
      sender: 'agent',
      text: 'Namaste! I am your autonomous Kubra Agent. I have an active UPI AutoPay mandate (man_razor_npci_88291) bounded up to ₹500 for autonomous buys and ₹1,000 max. Tell or speak what you need across local Kiranas & hardware stores.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Web Audio chime for agent responses
  const playAudioChime = (type: 'success' | 'gated' | 'click' = 'success') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880.00, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'gated') {
        osc.frequency.setValueAtTime(440.00, ctx.currentTime);
        osc.frequency.setValueAtTime(349.23, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.14, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // AudioContext unavailable or suppressed
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      const sampleQueries = [
        'Order 5kg Aashirvaad Atta under ₹300 autonomously',
        'Order 5kg Atta and 1L Mustard Oil from Gupta Kirana',
        'Order Groceries plus Bajaj Mixer Blade replacement'
      ];
      const randomQuery = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      setInput(randomQuery);
      handleSendMessage(randomQuery);
    }, 1500);
  };

  const handleSendMessage = (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `msg_u_${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      let responseText = '';
      let actionPayload: Message['actionPayload'] | undefined;

      const lower = textToSend.toLowerCase();

      // Case 1: Below threshold (< ₹500) -> Autonomous execution
      if (lower.includes('atta') && !lower.includes('blade') && !lower.includes('mixer')) {
        const total = 245.00;
        const rzpOrder = createRazorpayOrder(total, `rcpt_${Date.now()}`);
        simulateRazorpayCapture(rzpOrder);

        responseText = `Discovered 5kg Aashirvaad Atta at Gupta Super Bazaar (₹245.00). Evaluated spending policy: ₹245.00 < ₹500.00 autonomous threshold. Zero-touch payment executed via Razorpay order ${rzpOrder.id}. Local delivery courier dispatched!`;

        actionPayload = {
          skus: [{ name: 'Aashirvaad MP Atta 5kg', price: 245, qty: 1 }],
          totalINR: 245,
          razorpayOrderId: rzpOrder.id,
          status: 'EXECUTED_AUTONOMOUS'
        };

        playAudioChime('success');
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      }
      // Case 2: Above threshold (> ₹500) -> Gated human approval
      else if (lower.includes('blade') || lower.includes('mixer') || lower.includes('bundle') || lower.includes('oil')) {
        const total = 667.00;
        const rzpOrder = createRazorpayOrder(total, `rcpt_${Date.now()}`);
        setPendingOrder(rzpOrder);

        responseText = `Compiled multi-seller bundle: 5kg Atta (₹245) + 1L Mustard Oil (₹142) from Gupta Kirana + Bajaj 500W Mixer Blade (₹280) from Pooja Hardware. Total: ₹667.00. This exceeds your ₹500 autonomous threshold, requiring your 1-tap consent before Razorpay charge.`;

        actionPayload = {
          skus: [
            { name: 'Aashirvaad Atta 5kg', price: 245, qty: 1 },
            { name: 'Fortune Mustard Oil 1L', price: 142, qty: 1 },
            { name: 'Bajaj Mixer Blade 500W', price: 280, qty: 1 }
          ],
          totalINR: 667,
          razorpayOrderId: rzpOrder.id,
          status: 'PENDING_GATED_APPROVAL'
        };

        playAudioChime('gated');
        setGatedModalOpen(true);
      }
      // Case 3: General conversational inquiry
      else {
        responseText = `I searched the UAP network across Ghatkopar merchants. Gupta Super Bazaar has fresh Atta (₹245) and Mustard Oil (₹142); Pooja Hardware has spare mixer parts. Say "Order Atta" or "Order Groceries + Mixer Blade" to execute!`;
        playAudioChime('success');
      }

      const agentMsg: Message = {
        id: `msg_a_${Date.now()}`,
        sender: 'agent',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload
      };

      setMessages((prev) => [...prev, agentMsg]);
      setIsProcessing(false);
      speakMessage(responseText);
    }, 850);
  };

  const handleApproveGatedOrder = () => {
    if (!pendingOrder) return;
    simulateRazorpayCapture(pendingOrder);
    setGatedModalOpen(false);

    const approvedMsg: Message = {
      id: `msg_app_${Date.now()}`,
      sender: 'agent',
      text: `Gated consent granted! Razorpay payment captured for order ${pendingOrder.id} (₹${(pendingOrder.amount / 100).toFixed(2)}). Single-rider FIFO courier assigned for combined pickup!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    playAudioChime('success');
    setMessages((prev) => [...prev, approvedMsg]);
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  return (
    <div
      className={`w-full rounded-2xl border transition-colors duration-300 overflow-hidden flex flex-col font-editorial-body ${
        isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] soft-card-shadow text-[#0c0a09]'
      }`}
    >
      {/* Header */}
      <div
        className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'border-[#292524] bg-[#0c0a09]' : 'border-[#e7e5e4] bg-[#fafafa]'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-xs">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold">Autonomous In-App Checkout Agent</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 font-mono">
                AP2/1.1 Live
              </span>
            </div>
            <p className="text-xs text-text-muted">
              Bounded Mandate: Max ₹1,000/txn • Autonomous up to ₹500 • Razorpay Test Mode
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#777169]">
          <Lock className="w-3.5 h-3.5 text-emerald-500" />
          <span>Gated by Policy Engine</span>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[480px] min-h-[360px] overflow-y-auto">
        {messages.map((msg) => {
          const isAgent = msg.sender === 'agent';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'} space-y-1.5`}
            >
              <div
                className={`p-4 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                  isAgent
                    ? isDark
                      ? 'bg-[#0c0a09] border border-[#292524] text-white'
                      : 'bg-[#f5f5f5] border border-[#e7e5e4] text-[#0c0a09]'
                    : 'bg-ink text-white'
                }`}
              >
                <p>{msg.text}</p>

                {/* Structured Action Card inside Agent Bubble */}
                {msg.actionPayload && (
                  <div className="mt-3 p-3 rounded-xl border border-hairline/40 bg-black/20 space-y-2 font-mono text-[11px]">
                    <div className="flex items-center justify-between border-b border-hairline/20 pb-1.5 font-bold">
                      <span>ORDER SUMMARY</span>
                      <span
                        className={
                          msg.actionPayload.status === 'EXECUTED_AUTONOMOUS'
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }
                      >
                        {msg.actionPayload.status === 'EXECUTED_AUTONOMOUS'
                          ? '✓ ZERO-TOUCH EXECUTED'
                          : '⚠️ GATED APPROVAL REQUIRED'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {msg.actionPayload.skus.map((sku, i) => (
                        <div key={i} className="flex justify-between text-text-muted">
                          <span>{sku.name} (x{sku.qty})</span>
                          <span>₹{sku.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1 border-t border-hairline/20 flex justify-between font-bold text-xs">
                      <span>Total Net Payable</span>
                      <span>₹{msg.actionPayload.totalINR.toFixed(2)}</span>
                    </div>

                    {msg.actionPayload.razorpayOrderId && (
                      <div className="text-[10px] text-[#777169] truncate">
                        Razorpay Order: {msg.actionPayload.razorpayOrderId}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <span className="text-[10px] font-mono text-[#777169] px-2">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 text-xs font-mono text-[#777169] p-2">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
            <span>Agent parsing intent &amp; evaluating policy bounds...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-hairline bg-canvas-soft flex items-center gap-2 overflow-x-auto text-xs font-mono">
        <span className="text-text-muted shrink-0 text-[11px]">Quick Prompts:</span>
        <button
          onClick={() => handleSendMessage('Order 5kg Aashirvaad Atta under ₹300 autonomously')}
          className="px-3 py-1 rounded-full border border-hairline bg-white hover:bg-canvas text-text-body whitespace-nowrap transition-colors"
        >
          ⚡ Autonomous Buy: 5kg Atta (&lt;₹500)
        </button>
        <button
          onClick={() => handleSendMessage('Order multi-store bundle: Atta, Oil & Mixer Blade')}
          className="px-3 py-1 rounded-full border border-hairline bg-white hover:bg-canvas text-text-body whitespace-nowrap transition-colors"
        >
          🛡️ Gated Threshold: Groceries + Hardware (₹667)
        </button>
        <button
          onClick={() => handleSendMessage('Check stock and delivery time at Gupta Kirana')}
          className="px-3 py-1 rounded-full border border-hairline bg-white hover:bg-canvas text-text-body whitespace-nowrap transition-colors"
        >
          🔍 Inspect Merchant Stock
        </button>
      </div>

      {/* Input Bar with Voice Support */}
      <div className="p-3 border-t border-hairline flex items-center gap-2 bg-canvas">
        <button
          onClick={handleVoiceInput}
          type="button"
          title="Speak to Agent"
          className={`p-2.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
            isListening
              ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
              : isDark
              ? 'bg-[#1c1917] text-[#a8a29e] border-[#292524] hover:text-white'
              : 'bg-white text-[#4e4e4e] border-[#e7e5e4] hover:bg-[#fafafa]'
          }`}
        >
          {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
        </button>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask your agent to find items, evaluate deals, and purchase..."
          className="flex-1 bg-white border border-hairline rounded-full px-4 py-2.5 text-xs text-ink focus:outline-none focus:border-ink"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!input.trim() || isProcessing}
          className="p-2.5 rounded-full bg-ink text-white hover:bg-ink-primary-active disabled:opacity-50 transition-all cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Gated Consent Modal */}
      {gatedModalOpen && pendingOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-md rounded-2xl border p-6 space-y-4 shadow-card-elevated ${
              isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-500 border border-amber-500/30 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold">Policy Gating: Consent Required</h4>
                <p className="text-[11px] text-text-muted">Order amount exceeds autonomous threshold (₹500.00)</p>
              </div>
            </div>

            <div
              className={`p-3.5 rounded-xl border text-xs font-mono space-y-1.5 ${
                isDark ? 'bg-[#0c0a09] border-[#292524]' : 'bg-[#f5f5f5] border-[#e7e5e4]'
              }`}
            >
              <div className="flex justify-between">
                <span>Razorpay Order ID:</span>
                <span className="font-bold">{pendingOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-base text-emerald-500">
                  ₹{(pendingOrder.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-text-muted pt-1 border-t border-hairline/40">
                <span>Authorized via Mandate:</span>
                <span>man_razor_npci_88291</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setGatedModalOpen(false)}
                className="flex-1 py-2.5 rounded-full border border-hairline text-xs font-medium hover:bg-canvas transition-colors"
              >
                Reject Order
              </button>
              <button
                onClick={handleApproveGatedOrder}
                className="flex-1 py-2.5 rounded-full bg-ink hover:bg-ink-primary-active text-white text-xs font-medium transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Authorize ₹{(pendingOrder.amount / 100).toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
