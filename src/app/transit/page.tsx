'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MultimodalTicketPass } from '@/components/MultimodalTicketPass';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import Link from 'next/link';

export default function TransitPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <div className={`min-h-screen w-full transition-colors duration-300 flex flex-col font-editorial-body overflow-y-auto pb-20 ${
      isDark ? 'bg-[#0c0a09] text-white' : 'bg-[#f5f5f5] text-[#0c0a09]'
    }`}>
      <Navbar
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8 space-y-6">
        <div>
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 text-xs mb-3 transition-colors ${
              isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Superlayer Home
          </Link>
        </div>

        <MultimodalTicketPass lang={lang} />
      </main>

      <ProtocolInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
