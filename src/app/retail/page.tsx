'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { RetailComparisonMatrix } from '@/components/RetailComparisonMatrix';
import { ShelfScannerModal } from '@/components/ShelfScannerModal';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { INITIAL_PRODUCTS, ProductItem } from '@/lib/mock-data';
import { Camera, Sparkles, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function RetailPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
    <div
      className={`min-h-screen w-full transition-colors duration-300 flex flex-col font-editorial-body overflow-y-auto pb-20 ${
        isDark ? 'bg-[#0c0a09] text-white' : 'bg-[#f5f5f5] text-[#0c0a09]'
      }`}
    >
      <Navbar
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className={`inline-flex items-center gap-1.5 text-xs mb-2 transition-colors ${
                isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Superlayer Home
            </Link>
            <h1 className={`text-2xl sm:text-3xl font-display font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
              {lang === 'hi' ? 'किराना एवं डिजिकैटलॉग लाइव' : 'DigiBazaar Retail & Kirana Matrix'}
            </h1>
            <p className={`text-xs sm:text-sm mt-0.5 ${isDark ? 'text-[#a8a29e]' : 'text-[#4e4e4e]'}`}>
              Real-time shelf inventory sync and transparent landed price comparison vs quick-commerce dark stores.
            </p>
          </div>

          <button
            onClick={() => setIsShelfScanOpen(true)}
            className={`px-4 py-2.5 rounded-full font-medium text-xs flex items-center justify-center gap-2 transition-all self-start sm:self-auto cursor-pointer shadow-sm ${
              isDark ? 'bg-white text-[#0c0a09] hover:bg-[#f5f5f4]' : 'bg-[#0c0a09] text-white hover:bg-[#292524]'
            }`}
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
