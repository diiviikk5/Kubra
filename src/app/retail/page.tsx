'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { RetailComparisonMatrix } from '@/components/RetailComparisonMatrix';
import { ShelfScannerModal } from '@/components/ShelfScannerModal';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/mock-data';
import { Camera, Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RetailPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isShelfScanOpen, setIsShelfScanOpen] = useState(false);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);

  const handleStockUpdated = (productId: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockCount: newStock, isAvailable: newStock > 0 } : p))
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-neutral-100 flex flex-col font-geist overflow-y-auto pb-20">
      <Navbar
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-2 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Superlayer Home
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {lang === 'hi' ? 'किराना एवं डिजिकैटलॉग लाइव' : 'DigiBazaar Retail & Kirana Matrix'}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Real-time shelf inventory sync and transparent landed price comparison vs quick-commerce dark stores.
            </p>
          </div>

          <button
            onClick={() => setIsShelfScanOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all self-start sm:self-auto cursor-pointer"
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
      </main>

      <ShelfScannerModal
        isOpen={isShelfScanOpen}
        onClose={() => setIsShelfScanOpen(false)}
        onStockUpdated={handleStockUpdated}
        products={products}
        lang={lang}
      />

      <ProtocolInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
