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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end transition-opacity font-editorial-body animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border-l border-hairline h-full flex flex-col shadow-card-elevated animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-hairline bg-canvas flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-xs">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-ink text-sm">Beckn Protocol Inspector</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-strong text-text-body border border-hairline font-mono">
                  v1.0.0 Spec
                </span>
              </div>
              <p className="text-xs text-text-muted">
                Inspect raw Beckn Protocol JSON contracts &amp; AI Decision Logs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-text-muted hover:text-ink hover:bg-surface-strong transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security & Protocol Specification Banner */}
        <div className="mx-5 mt-4 p-3 rounded-xl bg-canvas border border-hairline flex items-start gap-2.5 text-xs text-text-body">
          <ShieldAlert className="w-4 h-4 text-ink shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-ink">Protocol Specification:</span> All transactions execute compliant Beckn v1.0 schema payloads. Multimodal intent and vision forensics process without exposing private citizen PII.
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 px-5 pt-3 border-b border-hairline bg-white">
          <button
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'search'
                ? 'bg-canvas text-ink border-t border-x border-hairline font-semibold'
                : 'text-text-muted hover:text-ink'
            }`}
          >
            /search (Discovery)
          </button>
          <button
            onClick={() => setActiveTab('confirm')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'confirm'
                ? 'bg-canvas text-ink border-t border-x border-hairline font-semibold'
                : 'text-text-muted hover:text-ink'
            }`}
          >
            /confirm (Order)
          </button>
          <button
            onClick={() => setActiveTab('igm')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'igm'
                ? 'bg-canvas text-ink border-t border-x border-hairline font-semibold'
                : 'text-text-muted hover:text-ink'
            }`}
          >
            /issue (Auto-IGM)
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-all ${
              activeTab === 'telemetry'
                ? 'bg-canvas text-ink border-t border-x border-hairline font-semibold'
                : 'text-text-muted hover:text-ink'
            }`}
          >
            Telemetry Log
          </button>
        </div>

        {/* JSON Code Viewer */}
        <div className="flex-1 p-5 overflow-y-auto font-mono text-xs text-ink relative bg-canvas">
          <div className="absolute top-7 right-7 z-10">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-canvas border border-hairline text-xs text-ink transition-colors shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-semibold">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-text-muted" />
                  <span>Copy JSON</span>
                </>
              )}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-white border border-hairline overflow-x-auto text-ink leading-relaxed shadow-sm">
            {JSON.stringify(currentPayload, null, 2)}
          </pre>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-hairline bg-white flex items-center justify-between text-xs text-text-muted font-mono">
          <span>Beckn Core v1.0.0 • Schema Validated</span>
          <span className="text-emerald-600 font-semibold">Status: 200 ACK</span>
        </div>
      </div>
    </div>
  );
};
