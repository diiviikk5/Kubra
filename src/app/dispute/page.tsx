'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { DisputeEvidenceAuditor } from '@/components/DisputeEvidenceAuditor';
import { ProtocolInspectorDrawer } from '@/components/ProtocolInspectorDrawer';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function DisputePage() {
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
            {lang === 'hi' ? '६० सेकंड ऑटो-आईजीएम विवाद निवारण' : 'Auto-IGM Dispute Resolver & 60s UPI Reversal'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
            Computer vision unboxing forensics cross-matched with courier weight sensors to eliminate the 14-day dispute black hole on ONDC.
          </p>
        </div>

        <DisputeEvidenceAuditor lang={lang} />
      </main>

      <ProtocolInspectorDrawer
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
      />
    </div>
  );
}
