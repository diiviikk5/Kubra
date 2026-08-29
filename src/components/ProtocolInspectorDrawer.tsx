'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ShieldAlert, Cpu, Network, Layers } from 'lucide-react';
import { generateBecknSearchPayload, generateBecknConfirmPayload, generateBecknIGMPayload } from '@/lib/beckn-schemas';
import { useTheme } from '@/context/ThemeContext';

interface ProtocolInspectorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lastAction?: string;
  customPayload?: any;
}

export const ProtocolInspectorDrawer: React.FC<ProtocolInspectorDrawerProps> = ({
  isOpen,
  onClose,
  lastAction = 'search',
  customPayload
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState<'search' | 'confirm' | 'igm' | 'telemetry'>('search');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const payloads = {
    search: generateBecknSearchPayload('Aashirvaad Atta 5kg & Sunflower Oil', 'RETAIL', 'std:022'),
    confirm: generateBecknConfirmPayload(
      'ONDC-ORD-2026-99214',
      [{ id: 'prod-001', name: 'Aashirvaad Atta 5kg', price: 245, quantity: 1 }],
      245,
      'digidukaan-seller-np.ondc.in'
    ),
    igm: generateBecknIGMPayload(
      'ONDC-ORD-2026-99214',
      'DAMAGED_IN_TRANSIT',
      'https://evidence.ondc.in/img_leakage_8841.jpg',
      'LOGISTICS_PARTNER',
      99.2
    ),
    telemetry: {
      network_health: 'OPTIMAL',
      active_gateways: ['bap-gw-mumbai-01.ondc.org', 'bpp-gw-delhi-02.ondc.org'],
      latency_p99_ms: 34,
      beckn_core_version: '1.0.0',
      open_ai_layer: 'GPT-4o Vision & Intent Engine (Vyapar LM)',
      connected_metros: ['MMOPL (Mumbai)', 'DMRC (Delhi)', 'BMRCL (Namma Metro)', 'KMRL (Kochi)'],
      logistics_model: 'FIFO (First-In First-Out) Multi-Carrier Dispatch'
    }
  };

  const currentPayload = customPayload || payloads[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end transition-opacity font-editorial-body animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl border-l h-full flex flex-col shadow-card-elevated animate-in slide-in-from-right duration-300 ${
        isDark ? 'bg-[#1c1917] border-[#292524] text-white' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
      }`}>
        {/* Drawer Header */}
        <div className={`p-5 border-b flex items-center justify-between ${
          isDark ? 'border-[#292524] bg-[#0c0a09]' : 'border-[#e7e5e4] bg-[#f5f5f5]'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
              isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
            }`}>
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">Beckn Protocol Inspector</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${
                  isDark ? 'bg-[#292524] text-[#a8a29e] border-[#3f3f46]' : 'bg-[#f0efed] text-[#4e4e4e] border-[#e7e5e4]'
                }`}>
                  v1.0.0 Spec
                </span>
              </div>
              <p className={`text-xs ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`}>
                Inspect raw Beckn Protocol JSON contracts &amp; AI Decision Logs
              </p>
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

        {/* Security & Protocol Specification Banner */}
        <div className={`mx-5 mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
          isDark ? 'bg-[#0c0a09] border-[#292524] text-[#a8a29e]' : 'bg-[#f5f5f5] border-[#e7e5e4] text-[#4e4e4e]'
        }`}>
          <ShieldAlert className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-white' : 'text-[#0c0a09]'}`} />
          <div>
            <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>Protocol Specification:</span> All transactions execute compliant Beckn v1.0 schema payloads. Multimodal intent and vision forensics process without exposing private citizen PII.
          </div>
        </div>

        {/* Tabs */}
        <div className={`flex items-center gap-1.5 px-5 pt-3 border-b ${
          isDark ? 'border-[#292524] bg-[#1c1917]' : 'border-[#e7e5e4] bg-white'
        }`}>
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'search'
                ? isDark ? 'bg-[#0c0a09] text-white border-t border-x border-[#292524] font-semibold' : 'bg-[#f5f5f5] text-[#0c0a09] border-t border-x border-[#e7e5e4] font-semibold'
                : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
            }`}
          >
            /search (Discovery)
          </button>
          <button
            onClick={() => setActiveTab('confirm')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'confirm'
                ? isDark ? 'bg-[#0c0a09] text-white border-t border-x border-[#292524] font-semibold' : 'bg-[#f5f5f5] text-[#0c0a09] border-t border-x border-[#e7e5e4] font-semibold'
                : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
            }`}
          >
            /confirm (Order)
          </button>
          <button
            onClick={() => setActiveTab('igm')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'igm'
                ? isDark ? 'bg-[#0c0a09] text-white border-t border-x border-[#292524] font-semibold' : 'bg-[#f5f5f5] text-[#0c0a09] border-t border-x border-[#e7e5e4] font-semibold'
                : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
            }`}
          >
            /issue (Auto-IGM)
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'telemetry'
                ? isDark ? 'bg-[#0c0a09] text-white border-t border-x border-[#292524] font-semibold' : 'bg-[#f5f5f5] text-[#0c0a09] border-t border-x border-[#e7e5e4] font-semibold'
                : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
            }`}
          >
            Telemetry Log
          </button>
        </div>

        {/* JSON Code Viewer */}
        <div className={`flex-1 p-5 overflow-y-auto font-mono text-xs relative ${
          isDark ? 'bg-[#0c0a09] text-white' : 'bg-[#f5f5f5] text-[#0c0a09]'
        }`}>
          <div className="absolute top-7 right-7 z-10">
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs transition-colors shadow-sm ${
                isDark ? 'border-[#292524] bg-[#1c1917] hover:bg-[#292524] text-white' : 'border-[#e7e5e4] bg-white hover:bg-[#f5f5f5] text-[#0c0a09]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className={`w-3.5 h-3.5 ${isDark ? 'text-[#a8a29e]' : 'text-[#777169]'}`} />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>

          <pre className={`p-4 rounded-xl border overflow-x-auto leading-relaxed shadow-sm ${
            isDark ? 'bg-[#1c1917] border-[#292524] text-emerald-400' : 'bg-white border-[#e7e5e4] text-[#0c0a09]'
          }`}>
            {JSON.stringify(currentPayload, null, 2)}
          </pre>
        </div>

        {/* Drawer Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs font-mono ${
          isDark ? 'border-[#292524] bg-[#0c0a09] text-[#78716c]' : 'border-[#e7e5e4] bg-white text-[#777169]'
        }`}>
          <span>Beckn Core v1.0.0 • Schema Validated</span>
          <span className="text-emerald-500 font-semibold">Status: 200 ACK</span>
        </div>
      </div>
    </div>
  );
};
