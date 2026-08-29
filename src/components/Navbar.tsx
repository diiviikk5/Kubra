'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Train, ShieldCheck, Terminal, Globe, Zap, Users, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'hi';
  onLangToggle: () => void;
  onOpenInspector: () => void;
  inspectorCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLangToggle,
  onOpenInspector,
  inspectorCount = 1
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      labelEn: 'Citizen Hub',
      labelHi: 'नागरिक हब',
      icon: Zap
    },
    {
      href: '/coordination',
      labelEn: 'Citizen Coordination',
      labelHi: 'सामूहिक समन्वय',
      icon: Users,
      badge: 'Voter Power'
    },
    {
      href: '/retail',
      labelEn: 'Retail & DigiCatalog',
      labelHi: 'किराना एवं डिजिकैटलॉग',
      icon: ShoppingBag,
      badge: 'Solves "The Wall"'
    },
    {
      href: '/transit',
      labelEn: 'YatriSetu Transit',
      labelHi: 'यात्रीसेतु ट्रांजिट',
      icon: Train,
      badge: '1-QR Multi-Modal'
    },
    {
      href: '/dispute',
      labelEn: '60s IGM Resolve',
      labelHi: '६० सेकंड रिफंड',
      icon: ShieldCheck,
      badge: 'Auto-Refund'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Protocol Status Ticker */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 px-4 py-1 text-xs text-slate-300 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span className="font-mono text-amber-300 font-semibold">KUBRA CITIZEN NETWORK:</span>
          <span className="text-slate-300">Coordination &gt; Passive Tracking</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">500 orders/min</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-medium">9 Metros & 21 Bus Cities Connected</span>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <span className="text-slate-400 text-[11px]">DPIIT ONDC Rails • Beckn v1.0 • Civic Quorum Engine</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-blue-600 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-white to-emerald-400 text-lg">
                  कु
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-white">Kubra</span>
                  <span className="font-bold text-lg text-amber-400">ONDC</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono font-medium">
                    CivicOS
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 -mt-1 font-medium">
                  {lang === 'hi' ? 'नागरिक समन्वय एवं खुला डिजिटल नेटवर्क' : 'Citizen Coordination Superlayer for Bharat'}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                  {item.badge && (
                    <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-300 border border-slate-700 font-mono">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={onLangToggle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors shadow-sm"
              title="Toggle English / हिन्दी"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Protocol Inspector Drawer Trigger for Hackathon Judges */}
            <button
              onClick={onOpenInspector}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-mono font-semibold text-emerald-300 transition-all shadow-sm shadow-emerald-950"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Beckn Inspector</span>
              <span className="sm:hidden">Inspect</span>
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 bg-slate-950 px-2 py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                isActive ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{lang === 'hi' ? item.labelHi : item.labelEn.split(' ')[0]}</span>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
