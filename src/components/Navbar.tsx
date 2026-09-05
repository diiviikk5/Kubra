'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Train,
  ShieldCheck,
  Terminal,
  Globe,
  Zap,
  Users,
  Sun,
  Moon,
  Bot,
  Menu,
  X
} from 'lucide-react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      icon: Bot,
      badge: 'Track 01'
    },
    {
      href: '/retail',
      labelEn: 'Retail Matrix',
      labelHi: 'किराना कैटलॉग',
      icon: ShoppingBag
    },
    {
      href: '/transit',
      labelEn: 'YatriSetu',
      labelHi: 'यात्रीसेतु',
      icon: Train
    },
    {
      href: '/dispute',
      labelEn: '60s Dispute',
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
    <header
      className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-md font-editorial-body ${
        isDark ? 'border-[#292524] bg-[#0c0a09]/95 text-white' : 'border-[#e7e5e4] bg-[#f5f5f5]/95 text-[#0c0a09]'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Brand Mark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-light shadow-sm ${
              isDark ? 'bg-white text-[#0c0a09]' : 'bg-[#0c0a09] text-white'
            }`}
          >
            K
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-display text-lg tracking-tight font-light ${isDark ? 'text-white' : 'text-[#0c0a09]'}`}>
                Kubra
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full border font-mono ${
                  isDark ? 'bg-[#1c1917] text-[#a8a29e] border-[#292524]' : 'bg-[#f0efed] text-[#4e4e4e] border-[#e7e5e4]'
                }`}
              >
                ONDC Rails
              </span>
            </div>
          </div>
        </Link>

        {/* Center Nav Links (Desktop / Large Screens) */}
        <nav
          className={`hidden lg:flex items-center gap-1 p-1 rounded-full border text-xs font-medium ${
            isDark ? 'bg-[#1c1917] border-[#292524]' : 'bg-[#f0efed] border-[#e7e5e4]'
          }`}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                      : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
                    : isDark
                    ? 'text-[#a8a29e] hover:text-white'
                    : 'text-[#777169] hover:text-[#0c0a09]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
                {item.badge && (
                  <span
                    className={`text-[8px] px-1 py-0.2 rounded font-mono ${
                      isActive
                        ? isDark ? 'bg-[#0c0a09] text-white' : 'bg-white text-[#0c0a09]'
                        : 'bg-emerald-500/20 text-emerald-500 font-bold'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border text-xs transition-colors ${
              isDark
                ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white'
                : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={onLangToggle}
            className={`px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
              isDark
                ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white'
                : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
          >
            {lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 EN'}
          </button>

          <button
            onClick={onOpenInspector}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-colors ${
              isDark
                ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white'
                : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Inspector</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 rounded-full border text-xs transition-colors ${
              isDark
                ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e] hover:text-white'
                : 'border-[#e7e5e4] bg-white text-[#4e4e4e] hover:text-[#0c0a09]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Horizontal Scroller for Tablets & Small Laptops */}
      <div
        className={`hidden md:flex lg:hidden overflow-x-auto px-4 py-2 border-t text-xs font-medium gap-1.5 ${
          isDark ? 'border-[#292524] bg-[#141210]' : 'border-[#e7e5e4] bg-[#fafafa]'
        }`}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                isActive
                  ? isDark
                    ? 'bg-white text-[#0c0a09] shadow-sm font-semibold'
                    : 'bg-[#0c0a09] text-white shadow-sm font-semibold'
                  : isDark
                  ? 'text-[#a8a29e] hover:text-white'
                  : 'text-[#777169] hover:text-[#0c0a09]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? item.labelHi : item.labelEn}</span>
              {item.badge && (
                <span className="text-[8px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-500 font-mono font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Mobile Drawer Dropdown (< 768px) */}
      {mobileMenuOpen && (
        <div
          className={`lg:hidden border-t p-4 space-y-2 transition-all duration-200 animate-in slide-in-from-top-2 ${
            isDark ? 'border-[#292524] bg-[#141210]' : 'border-[#e7e5e4] bg-[#fafafa]'
          }`}
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-white border-white text-[#0c0a09] font-bold shadow-sm'
                        : 'bg-[#0c0a09] border-[#0c0a09] text-white font-bold shadow-sm'
                      : isDark
                      ? 'bg-[#1c1917] border-[#292524] text-[#a8a29e] hover:text-white'
                      : 'bg-white border-[#e7e5e4] text-[#4e4e4e] hover:text-[#0c0a09]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <div className="truncate font-medium">{lang === 'hi' ? item.labelHi : item.labelEn}</div>
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-hairline/40 flex items-center justify-between sm:hidden">
            <button
              onClick={() => {
                onOpenInspector();
                setMobileMenuOpen(false);
              }}
              className={`w-full py-2 rounded-xl border text-xs font-mono flex items-center justify-center gap-1.5 ${
                isDark ? 'border-[#292524] bg-[#1c1917] text-[#a8a29e]' : 'border-[#e7e5e4] bg-white text-[#4e4e4e]'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Open Beckn Inspector</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
