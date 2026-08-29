'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { MultimodalTicketPass } from '@/components/MultimodalTicketPass';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TransitPage() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-neutral-100 flex flex-col font-geist overflow-y-auto pb-20">
      <Navbar
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Superlayer Home
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'hi' ? 'यात्रीसेतु: एकीकृत बहु-मॉडल पास' : 'YatriSetu: One-Pass Dynamic Multimodal Transit'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Unifying 9 Indian Metros (Mumbai, Delhi, Bangalore, Kochi), BEST/DTC city buses, and Bharat Taxi with real-time delay auto-recovery.
          </p>
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
