'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Train, ShieldCheck, Terminal, Globe, Zap, Users } from 'lucide-react';

interface NavbarProps {
  lang: 'en' | 'hi';
  onLangToggle: () => void;
  onOpenInspector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLangToggle,
  onOpenInspector,
}) => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      labelEn: 'Citizen Superlayer',
      labelHi: 'नागरिक हब',
      icon: Zap
    },
    {
      href: '/retail',
      labelEn: 'DigiBazaar Retail',
      labelHi: 'किराना एवं डिजिकैटलॉग',
      icon: ShoppingBag
    },
    {
      href: '/transit',
      labelEn: 'YatriSetu Transit',
      labelHi: 'यात्रीसेतु ट्रांजिट',
      icon: Train
    },
    {
      href: '/dispute',
      labelEn: '60s Auto-Dispute',
      labelHi: '६० सेकंड रिफंड',
      icon: ShieldCheck
    },
    {
      href: '/coordination',
      labelEn: 'Civic Quorum',
      labelHi: 'सामूहिक समन्वय',
      icon: Users
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#222] bg-[#121212]/95 backdrop-blur-md font-geist">
      {/* Top Protocol Status Ticker */}
      <div className="bg-gradient-to-r from-blue-950/60 via-[#141414] to-emerald-950/60 px-4 py-1 text-xs text-neutral-300 border-b border-[#222] flex items-center justify-between font-mono">
        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-emerald-400 font-semibold">ONDC DECENTRALIZED RAILS:</span>
          <span className="text-neutral-300">2,400+ Local &amp; National Seller NPs Active</span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-300">std:022 Mumbai Node</span>
          <span className="text-neutral-600">|</span>
          <span className="text-sky-400">9 Metros &amp; 21 Bus Networks</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-neutral-400 text-[11px]">
          <span>DPIIT Digital Public Infrastructure • Beckn v1.0.0</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-amber-400 to-rose-500 p-0.5 shadow-md group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#121212] rounded-[10px] flex items-center justify-center font-bold text-white text-base">
                  K
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg tracking-tight text-white">Kubra</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-medium">
                    ONDC Core
                  </span>
                </div>
                <p className="text-[10px] text-neutral-400 -mt-1 font-medium hidden sm:block">
                  {lang === 'hi' ? 'नागरिक खुला वाणिज्य नेटवर्क' : 'Open Commerce Superlayer for Bharat'}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-[#202020]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onLangToggle}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#333] bg-[#181818] hover:bg-[#242424] text-xs font-mono text-neutral-200 transition-colors shadow-sm"
              title="Toggle English / हिन्दी"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>

            {/* Protocol Inspector */}
            <button
              onClick={onOpenInspector}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-mono font-semibold text-emerald-300 transition-all shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Beckn Inspector</span>
              <span className="sm:hidden">Inspect</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-[#222] bg-[#141414] px-2 py-2 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                isActive ? 'text-blue-400 bg-blue-500/10' : 'text-neutral-400'
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
