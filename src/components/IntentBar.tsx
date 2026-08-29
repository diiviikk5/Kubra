'use client';

import React, { useState } from 'react';
import { Search, Mic, MicOff, Camera, Sparkles, ArrowRight, CornerDownLeft, Volume2 } from 'lucide-react';

interface IntentBarProps {
  onSearch: (query: string, mode: 'RETAIL' | 'TRANSIT' | 'DISPUTE' | 'SHELF_SCAN') => void;
  onOpenShelfScan: () => void;
  lang: 'en' | 'hi';
}

export const IntentBar: React.FC<IntentBarProps> = ({ onSearch, onOpenShelfScan, lang }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const presets = [
    {
      label: lang === 'hi' ? '🌾 5 किग्रा आटा और रिफाइंड तेल' : '🌾 5kg Atta & Sunflower Oil (Kirana vs Blinkit)',
      query: 'Aashirvaad Atta 5kg and Fortune Sunflower Oil near me',
      mode: 'RETAIL' as const
    },
    {
      label: lang === 'hi' ? '🚊 घाटकोपर से बीकेसी डायमंड बोर्स (1-QR पास)' : '🚊 Ghatkopar to BKC Office (One-Pass Transit)',
      query: 'Route from Ghatkopar to BKC before 9:30 AM',
      mode: 'TRANSIT' as const
    },
    {
      label: lang === 'hi' ? '📦 ऑर्डर #99214: तेल की बोतल टूटी मिली (60s रिफंड)' : '📦 Dispute #99214: Spilled oil bottle in delivery',
      query: 'Refund for damaged Fortune oil in order #99214',
      mode: 'DISPUTE' as const
    },
    {
      label: lang === 'hi' ? '📸 किराना शेल्फ स्कैन (डिजिकैटलॉग)' : '📸 Scan Kirana Shelf (DigiCatalog AI)',
      query: 'SHELF_SCAN_ACTION',
      mode: 'SHELF_SCAN' as const
    }
  ];

  const handleVoiceToggle = () => {
    if (!isListening) {
      setIsListening(true);
      const simulatedVoicePhrases = [
        'Aashirvaad Atta 5kg and Fortune Sunflower Oil near me',
        'Ghatkopar to BKC metro and bus route',
        'Damaged oil packet in order 99214 refund'
      ];
      const randomPhrase = simulatedVoicePhrases[Math.floor(Math.random() * simulatedVoicePhrases.length)];
      setTimeout(() => {
        setQuery(randomPhrase);
        setIsListening(false);
        if (randomPhrase.includes('Ghatkopar')) {
          onSearch(randomPhrase, 'TRANSIT');
        } else if (randomPhrase.includes('Damaged')) {
          onSearch(randomPhrase, 'DISPUTE');
        } else {
          onSearch(randomPhrase, 'RETAIL');
        }
      }, 2200);
    } else {
      setIsListening(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const lower = query.toLowerCase();
    if (lower.includes('metro') || lower.includes('bus') || lower.includes('route') || lower.includes('ghatkopar') || lower.includes('transit') || lower.includes('pass')) {
      onSearch(query, 'TRANSIT');
    } else if (lower.includes('refund') || lower.includes('damage') || lower.includes('dispute') || lower.includes('order') || lower.includes('broken')) {
      onSearch(query, 'DISPUTE');
    } else {
      onSearch(query, 'RETAIL');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Intent Search Box */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-amber-500 to-emerald-500 opacity-30 group-hover:opacity-60 blur transition duration-300"></div>

        <div className="relative flex items-center bg-slate-900 border border-slate-700/80 rounded-xl p-2 sm:p-2.5 shadow-2xl">
          {/* Search / AI Icon */}
          <div className="pl-2.5 pr-2 text-amber-400">
            <Sparkles className="w-5 h-5 animate-pulse text-amber-400" />
          </div>

          {/* Text Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'hi'
                ? 'आवाज़, फ़ोटो या टेक्स्ट से पूछें (उदा. 5kg आटा, घाटकोपर मेट्रो पास, डैमेज रिफंड...)'
                : 'Ask in Hindi/English (e.g., 5kg Atta, Ghatkopar to BKC Metro pass, Damage refund #99214)...'
            }
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm sm:text-base focus:outline-none px-2"
          />

          {/* Actions: Shelf Scan, Voice, Submit */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Shelf Scan Button */}
            <button
              type="button"
              onClick={onOpenShelfScan}
              className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
              title="DigiCatalog Shelf Camera Scan"
            >
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Shelf Scan</span>
            </button>

            {/* Voice Input Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`p-2 sm:px-3 sm:py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-500 animate-bounce'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
              }`}
              title="Voice Intent (Hindi / English)"
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 text-white" />
                  <span className="text-xs font-bold text-white">Listening...</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Speak</span>
                </>
              )}
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="p-2 sm:px-4 sm:py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
            >
              <span>{lang === 'hi' ? 'खोजें' : 'Execute'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Voice Listening Ripple Banner */}
      {isListening && (
        <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-blue-950/80 to-amber-950/80 border border-amber-500/40 flex items-center justify-between text-xs text-amber-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>
              {lang === 'hi' ? '🎤 सुन रहे हैं... (हिन्दी / अंग्रेज़ी)' : '🎤 OpenAI Vyapar LM listening... Speak in Hindi, Tamil, or English'}
            </span>
          </div>
          <span className="font-mono text-amber-400 font-semibold text-[11px]">Processing Audio Stream...</span>
        </div>
      )}

      {/* Quick Intent Test Pills for Judges & Users */}
      <div className="mt-3.5 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-[11px] font-mono shrink-0">Try Intents:</span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (preset.mode === 'SHELF_SCAN') {
                onOpenShelfScan();
              } else {
                setQuery(preset.query);
                setActivePreset(preset.query);
                onSearch(preset.query, preset.mode);
              }
            }}
            className="px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-600 whitespace-nowrap transition-all flex items-center gap-1 text-[12px]"
          >
            <span>{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
