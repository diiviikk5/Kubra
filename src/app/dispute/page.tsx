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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navbar
        lang={lang}
        onLangToggle={() => setLang(lang === 'en' ? 'hi' : 'en')}
        onOpenInspector={() => setIsInspectorOpen(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Citizen Hub
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'hi' ? '६० सेकंड ऑटो-आईजीएम विवाद निवारण' : 'Auto-IGM Dispute Resolver & 60s UPI Reversal'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Multi-modal vision unboxing audit eliminates the 14-day multi-party dispute black hole on ONDC.
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
