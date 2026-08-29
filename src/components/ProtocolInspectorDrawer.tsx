'use client';

import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ShieldAlert, Cpu, Network, Layers } from 'lucide-react';
import { generateBecknSearchPayload, generateBecknConfirmPayload, generateBecknIGMPayload } from '@/lib/beckn-schemas';

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end transition-opacity font-geist">
      <div className="w-full max-w-2xl bg-[#101010] border-l border-[#282828] h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#242424] bg-[#141414] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">Beckn Protocol Inspector</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  v1.0.0 Spec
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Inspect raw Beckn Protocol JSON contracts &amp; AI Cognitive Decision Logs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#222] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security & Protocol Specification Banner */}
        <div className="mx-4 mt-4 p-3 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-start gap-2.5 text-xs text-blue-200">
          <ShieldAlert className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-sky-300">Protocol Specification:</span> All transactions execute compliant Beckn v1.0 schema payloads. Multimodal intent and vision forensics process without exposing private citizen PII.
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 px-4 pt-3 border-b border-[#242424] bg-[#101010]">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-lg transition-all ${
              activeTab === 'search'
                ? 'bg-[#1a1a1a] text-blue-400 border-t border-x border-[#2e2e2e] font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            /search (Discovery)
          </button>
          <button
            onClick={() => setActiveTab('confirm')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-lg transition-all ${
              activeTab === 'confirm'
                ? 'bg-[#1a1a1a] text-emerald-400 border-t border-x border-[#2e2e2e] font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            /confirm (Order)
          </button>
          <button
            onClick={() => setActiveTab('igm')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-lg transition-all ${
              activeTab === 'igm'
                ? 'bg-[#1a1a1a] text-rose-400 border-t border-x border-[#2e2e2e] font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            /issue (Auto-IGM)
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-t-lg transition-all ${
              activeTab === 'telemetry'
                ? 'bg-[#1a1a1a] text-amber-400 border-t border-x border-[#2e2e2e] font-semibold'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Telemetry Log
          </button>
        </div>

        {/* JSON Code Viewer Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-neutral-300 relative bg-[#0c0c0c]">
          <div className="absolute top-6 right-6 z-10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] border border-[#3a3a3a] text-xs text-neutral-200 transition-colors shadow-lg"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-[#141414] border border-[#242424] overflow-x-auto text-emerald-400 leading-relaxed">
            {JSON.stringify(currentPayload, null, 2)}
          </pre>
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#242424] bg-[#121212] flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Beckn Core v1.0.0 • Schema Validated</span>
          <span className="text-emerald-400 font-semibold">Status: 200 ACK</span>
        </div>
      </div>
    </div>
  );
};
