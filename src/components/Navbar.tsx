'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Train, ShieldCheck, Terminal, Globe, Zap, Users, Sun, Moon, Bot } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const navItems = [
    {
      href: '/',
      labelEn: 'Superlayer',
      labelHi: 'नागरिक हब',
      icon: Zap
    },
    {
      href: '/agentic',
      labelEn: 'Agentic AI',
      labelHi: 'एजेंटिक एआई',
      icon: Bot
    },
    {
      href: '/retail',
      labelEn: 'Universal Retail',
      labelHi: 'किराना कैटलॉग',
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
    <header className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-md font-editorial-body ${
      isDark ? 'border-[#292524] bg-[#0c0a09]/95 text-white' : 'border-[#e7e5e4] bg-[#f5f5f5]/95 text-[#0c0a09]'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-light shadow-sm ${
            isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
          }`}>
            K
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-display text-lg tracking-tight font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Kubra
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono ${
                isDark ? 'bg-[#1c1917] text-[#a8a29e] border-[#292524]' : 'bg-[#f0efed] text-[#4e4e4e] border-[#e7e5e4]'
              }`}>
                ONDC Rails
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className={`hidden md:flex items-center gap-1 p-1 rounded-full border text-xs font-medium ${
          isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-[#f0efed] border-[#e7e5e4]'
        }`}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? isDark ? 'bg-white text-[#0c0a09] shadow-sm font-semibold' : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
                    : isDark ? 'text-[#a8a29e] hover:text-white' : 'text-[#777169] hover:text-[#0c0a09]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border text-xs transition-colors ${
              isDark ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white' : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onLangToggle}
            className={`px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
              isDark ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white' : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
          >
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
          </button>

          <button
            onClick={onOpenInspector}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
              isDark ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white' : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Beckn Inspector</span>
          </button>
        </div>
      </div>
    </header>
  );
};
