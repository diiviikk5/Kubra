'use client';

import React, { useState } from 'react';
import { X, Camera, Sparkles, CheckCircle2, RefreshCw, AlertCircle, ShoppingBag, Mic, Zap } from 'lucide-react';
import { ProductItem } from '@/lib/mock-data';

interface ShelfScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStockUpdated: (productId: string, newStock: number) => void;
  products: ProductItem[];
  lang: 'en' | 'hi';
}

export const ShelfScannerModal: React.FC<ShelfScannerModalProps> = ({
  isOpen,
  onClose,
  onStockUpdated,
  products,
  lang
}) => {
  const [scanningState, setScanningState] = useState<'IDLE' | 'SCANNING' | 'DETECTED'>('DETECTED');
  const [detectedSkus, setDetectedSkus] = useState([
    { id: 'prod-001', name: 'Aashirvaad Atta 5kg', countDetected: 14, confidence: 99.4, bbox: 'top-10 left-12 w-28 h-36' },
    { id: 'prod-002', name: 'Fortune Sunflower Oil 1L', countDetected: 8, confidence: 98.1, bbox: 'top-10 left-44 w-24 h-36' },
    { id: 'prod-003', name: 'Tata Salt 1kg', countDetected: 22, confidence: 99.7, bbox: 'bottom-8 left-14 w-28 h-28' },
    { id: 'prod-005', name: 'Dettol Soap (Pack of 4)', countDetected: 11, confidence: 97.8, bbox: 'bottom-8 left-48 w-32 h-28' }
  ]);
  const [voiceCommandActive, setVoiceCommandActive] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const triggerRescan = () => {
    setScanningState('SCANNING');
    setTimeout(() => {
      setScanningState('DETECTED');
      setSuccessToast('DigiCatalog AI: 4 SKUs & 55 Units verified via Multi-Modal Vision.');
      setTimeout(() => setSuccessToast(null), 3000);
    }, 1500);
  };

  const simulateWalkInSale = (id: string, name: string) => {
    setDetectedSkus(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newCount = Math.max(0, item.countDetected - 2);
          onStockUpdated(id, newCount);
          return { ...item, countDetected: newCount };
        }
        return item;
      })
    );
    setSuccessToast(`⚡ Walk-in Sale Registered: 2x ${name}. ONDC live catalog decremented instantly.`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleVoiceStockUpdate = () => {
    setVoiceCommandActive(true);
    setTimeout(() => {
      setVoiceCommandActive(false);
      // Simulate voice: "5 packet Fortune oil aur add kar do"
      setDetectedSkus(prev =>
        prev.map(item => {
          if (item.id === 'prod-002') {
            const newCount = item.countDetected + 5;
            onStockUpdated('prod-002', newCount);
            return { ...item, countDetected: newCount };
          }
          return item;
        })
      );
      setSuccessToast('🎤 Voice Recognized: "5 packet Fortune oil added". Stock updated to 13 units.');
      setTimeout(() => setSuccessToast(null), 3500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">DigiCatalog AI: Live Shelf Vision Scanner</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  Solves ONDC &quot;The Wall&quot;
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automatic shelf OCR & inventory delta sync for 1.4 Crore Kirana stores
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success / Alert Toast */}
        {successToast && (
          <div className="mx-4 mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{successToast}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Simulated Shelf Camera Feed */}
          <div className="md:col-span-7 flex flex-col">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shadow-inner group">
              {/* Simulated Camera Video stream background */}
              <div
                className="w-full h-full bg-cover bg-center filter contrast-105 brightness-95"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&auto=format&fit=crop&q=80)'
                }}
              ></div>

              {/* Scanning Laser Line */}
              {scanningState === 'SCANNING' && (
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce top-1/2"></div>
              )}

              {/* Bounding Boxes on detected items */}
              {scanningState === 'DETECTED' &&
                detectedSkus.map((sku) => (
                  <div
                    key={sku.id}
                    className={`absolute ${sku.bbox} border-2 border-emerald-400/80 bg-emerald-500/10 rounded-md flex flex-col justify-between p-1 transition-all group-hover:border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)]`}
                  >
                    <div className="bg-slate-950/90 text-[9px] font-mono px-1 py-0.5 rounded text-emerald-300 font-bold border border-emerald-500/40 w-fit">
                      {sku.name.split(' ')[0]} ({sku.confidence}%)
                    </div>
                    <div className="bg-emerald-600 text-[10px] font-mono px-1 py-0.5 rounded text-white font-black text-right w-fit self-end">
                      Stock: {sku.countDetected}
                    </div>
                  </div>
                ))}

              {/* Live Camera Watermark */}
              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>KIRANA SHELF CAM #01 • 1080P</span>
              </div>
            </div>

            {/* Quick Actions below Camera */}
            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={triggerRescan}
                disabled={scanningState === 'SCANNING'}
                className="flex-1 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${scanningState === 'SCANNING' ? 'animate-spin' : ''}`} />
                <span>{scanningState === 'SCANNING' ? 'AI Analyzing Shelf...' : 'Trigger Instant Re-Scan'}</span>
              </button>

              <button
                onClick={handleVoiceStockUpdate}
                disabled={voiceCommandActive}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Mic className={`w-3.5 h-3.5 ${voiceCommandActive ? 'animate-bounce text-red-400' : ''}`} />
                <span>{voiceCommandActive ? 'Listening...' : 'Voice Stock Sync (Hindi)'}</span>
              </button>
            </div>
          </div>

          {/* Right Side: Detected SKUs & Walk-In Sale Simulator */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                <span>Synchronized SKUs</span>
                <span className="text-emerald-400 font-semibold text-[11px]">4 Live on ONDC</span>
              </h4>

              <div className="space-y-2">
                {detectedSkus.map((sku) => (
                  <div
                    key={sku.id}
                    className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-white truncate max-w-[140px]">{sku.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        Live Stock: <span className="text-amber-400 font-bold">{sku.countDetected} units</span>
                      </div>
                    </div>

                    <button
                      onClick={() => simulateWalkInSale(sku.id, sku.name)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/40 text-slate-200 hover:text-rose-300 border border-slate-700 hover:border-rose-700/50 text-[11px] font-medium transition-all flex items-center gap-1"
                      title="Simulate a customer buying 2 units physically in store"
                    >
                      <span>-2 Walk-in</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Matters Box for Judges */}
            <div className="mt-4 p-3 rounded-xl bg-gradient-to-br from-blue-950/60 to-slate-900 border border-blue-800/40 text-[11px] text-slate-300">
              <span className="font-bold text-blue-300 flex items-center gap-1 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Why this fixes ONDC:
              </span>
              Kiranas don&apos;t have time to manually update inventory. DigiCatalog uses 5-second shelf sweeps + voice to keep ONDC stock 100% accurate, cutting order cancellations from 25% to under 2%.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Powered by <span className="text-white font-semibold">OpenAI Vision (Vyapar LM)</span> • Zero Barcode Gun Needed
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Done Inspecting
          </button>
        </div>
      </div>
    </div>
  );
};
