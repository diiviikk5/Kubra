'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function LandingPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPending, setMotionPending] = useState(true);

  useEffect(() => {
    // Guarantee video plays immediately on load
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplays seamlessly when muted
      });
    }

    const timer = setTimeout(() => {
      setMotionPending(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={`fixed inset-0 bg-black text-white overflow-hidden select-none font-geist ${motionPending ? 'motion-pending' : ''}`}>
      <style jsx global>{`
        /* Desktop Tokens */
        .screen-container {
          --gutter-start: clamp(36px, 4.177vw, 96px);
          --gutter-end: clamp(36px, 4.04vw, 96px);
          --header-top: clamp(20px, 2.264vh, 30px);
          --hero-bottom: clamp(34px, 5.19vh, 64px);
          --display-size: clamp(52px, 7.2vh, 84px);
          --display-leading: clamp(64px, 8.8vh, 100px);
          --copy-size: clamp(13px, 1.6vh, 18px);
          --copy-leading: clamp(18px, 2.1vh, 23px);
          --title-copy-gap: clamp(15px, 2.08vh, 24px);
          --copy-cta-gap: clamp(24px, 3.11vh, 36px);
          --cta-width: clamp(142px, 15.09vh, 168px);
          --cta-height: clamp(38px, 3.96vh, 44px);
          --primary-control-font-size: clamp(15px, 1.7vh, 18px);
          --card-width: clamp(150px, 18.96vh, 215px);
        }

        @keyframes entrance-brand {
          from { opacity: 0; transform: translateY(7px) scale(0.94); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes entrance-nav {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes entrance-action {
          from { opacity: 0; transform: translateY(8px) scale(0.985); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes entrance-line {
          from { transform: translate3d(0, 110%, 0) skewY(2deg); }
          to { transform: translate3d(0, 0, 0) skewY(0deg); }
        }
        @keyframes entrance-copy {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes entrance-card {
          from { opacity: 0; transform: translateY(12px) scale(0.968); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes entrance-center {
          from { opacity: 0; transform: translate(-50%, -45%) scale(0.92); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .motion-pending .anim-brand { animation: entrance-brand 580ms cubic-bezier(.16,1,.3,1) 60ms both; }
        .motion-pending .anim-nav-1 { animation: entrance-nav 480ms cubic-bezier(.16,1,.3,1) 130ms both; }
        .motion-pending .anim-nav-2 { animation: entrance-nav 480ms cubic-bezier(.16,1,.3,1) 175ms both; }
        .motion-pending .anim-nav-3 { animation: entrance-nav 480ms cubic-bezier(.16,1,.3,1) 220ms both; }
        .motion-pending .anim-nav-4 { animation: entrance-nav 480ms cubic-bezier(.16,1,.3,1) 265ms both; }
        .motion-pending .anim-time { animation: entrance-nav 520ms cubic-bezier(.16,1,.3,1) 180ms both; }
        .motion-pending .anim-signup { animation: entrance-action 520ms cubic-bezier(.16,1,.3,1) 220ms both; }
        .motion-pending .anim-line-1 { animation: entrance-line 800ms cubic-bezier(.22,1,.36,1) 300ms both; }
        .motion-pending .anim-line-2 { animation: entrance-line 850ms cubic-bezier(.22,1,.36,1) 440ms both; }
        .motion-pending .anim-copy { animation: entrance-copy 620ms cubic-bezier(.16,1,.3,1) 740ms both; }
        .motion-pending .anim-cta { animation: entrance-action 560ms cubic-bezier(.16,1,.3,1) 960ms both; }
        .motion-pending .anim-card { animation: entrance-card 920ms cubic-bezier(.22,1,.36,1) 1040ms both; transform-origin: 82% 50%; }
        .motion-pending .anim-center { animation: entrance-center 900ms cubic-bezier(.16,1,.3,1) 500ms both; }
      `}</style>

      <section className="screen-container absolute inset-0 w-full h-full bg-black overflow-hidden font-geist">
        {/* Full-Bleed Background Video (Explicit z-0 over black container) */}
        <video
          ref={videoRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            zIndex: 0,
          }}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dual-Layer Vignette (Explicit z-1 over video) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            background: `
              linear-gradient(180deg, rgba(0,0,0,.03), transparent 24%, transparent 82%, rgba(0,0,0,.05)),
              radial-gradient(ellipse at 44% 54%, transparent 30%, rgba(0,0,0,.055) 100%)
            `,
          }}
        />

        {/* Header Bar (z-20) */}
        <header
          className="absolute flex items-start z-20 font-geist"
          style={{
            top: 'var(--header-top)',
            left: 'var(--gutter-start)',
            right: 'var(--gutter-end)',
            height: '48px',
          }}
        >
          {/* 25x25 SVG Disc Brand Logo */}
          <a href="/" className="relative top-[10px] w-[25px] h-[25px] anim-brand drop-shadow" aria-label="Kubra home">
            <svg viewBox="0 0 25 25" fill="none" className="w-[25px] h-[25px]">
              <g clipPath="url(#discClip)">
                <circle cx="12.5" cy="12.5" r="12.5" fill="#ededed" />
                <path d="M12.5 0L25 12.5L12.5 25L0 12.5Z" fill="#050606" />
                <path d="M12.5 3.5L21.5 12.5L12.5 21.5L3.5 12.5Z" fill="#737778" />
                <path d="M12.5 6.5L18.5 12.5L12.5 18.5L6.5 12.5Z" fill="#fafafa" />
                <path d="M12.5 9L16 12.5L12.5 16L9 12.5Z" fill="#0a0b0b" />
              </g>
              <defs>
                <clipPath id="discClip">
                  <circle cx="12.5" cy="12.5" r="12.5" />
                </clipPath>
              </defs>
            </svg>
          </a>

          {/* Header Navigation */}
          <div className="hidden md:flex items-start flex-1 font-geist">
            <nav className="flex items-start gap-[clamp(28px,2.6vw,40px)] ml-[clamp(32px,2.8vw,44px)] relative top-[10px] list-none">
              <li className="anim-nav-1">
                <a href="#home" className="text-white font-medium text-[14px] tracking-tight relative top-[-2px]">
                  Home
                  <span className="absolute left-0 -bottom-1 w-[40px] h-[2px] bg-white/80" />
                </a>
              </li>
              <li className="anim-nav-2">
                <a href="#coordination" className="text-neutral-300 hover:text-white transition-colors text-[14px] tracking-tight">
                  Coordination
                </a>
              </li>
              <li className="anim-nav-3">
                <a href="#retail" className="text-neutral-300 hover:text-white transition-colors text-[14px] tracking-tight">
                  DigiBazaar
                </a>
              </li>
              <li className="anim-nav-4">
                <a href="#transit" className="text-neutral-300 hover:text-white transition-colors text-[14px] tracking-tight">
                  YatriPass
                </a>
              </li>
            </nav>

            <div className="ml-auto w-[210px] h-[48px] pl-3 border-l-2 border-neutral-300/50 flex flex-col justify-center anim-time font-geist">
              <span className="text-[13px] font-normal text-neutral-300/80 leading-tight">Timezone</span>
              <span className="text-[13px] font-medium text-white/95 leading-tight mt-0.5">9:47 PM • 14 July 2026</span>
            </div>

            <button
              type="button"
              className="w-[109px] h-[40px] rounded-[7px] bg-white text-black font-semibold text-[14px] tracking-tight ml-[clamp(20px,1.95vw,29px)] shadow-[inset_0_1px_0_rgba(255,255,255,.72),0_1px_5px_rgba(0,0,0,.34)] hover:brightness-110 active:scale-95 transition-all anim-signup font-geist"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden ml-auto w-11 h-11 rounded-xl border border-white/20 bg-neutral-900/80 backdrop-blur-md flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </header>

        {/* 🌟 CENTERPIECE: KUBRA IN GEIST PIXEL (z-20) */}
        <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none z-20 anim-center w-full px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-[11px] font-geist text-neutral-300 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>ONDC Citizen Superlayer • Open Rails</span>
          </div>

          {/* Giant Pixelated Wordmark */}
          <h1 className="font-pixel text-[clamp(64px,14vw,180px)] font-bold tracking-tight text-white uppercase leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
            <span className="text-white">KU</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#ffc5dc] to-[#fd86db]">BRA</span>
          </h1>

          <p className="font-geist text-[clamp(12px,1.4vw,16px)] text-neutral-300/80 max-w-xl mx-auto mt-3 tracking-tight">
            &ldquo;I shouldn&apos;t need to know which app sells what. I should just be able to ask India.&rdquo;
          </p>
        </div>

        {/* Bottom-Left Hero Content (z-20) */}
        <div
          className="absolute flex flex-col items-start z-20 font-geist"
          style={{
            left: 'var(--gutter-start)',
            bottom: 'var(--hero-bottom)',
          }}
        >
          <div className="flex flex-col font-medium tracking-tight text-white [text-shadow:0_2px_2px_rgba(0,0,0,.44)]"
            style={{
              fontSize: 'var(--display-size)',
              lineHeight: 'var(--display-leading)',
            }}
          >
            <span className="block overflow-hidden origin-left scale-x-[0.88]">
              <span className="inline-block anim-line-1">Stop Digging</span>
            </span>
            <span className="block overflow-hidden origin-left scale-x-[0.88] text-neutral-300/80">
              <span className="inline-block anim-line-2">Through Portals.</span>
            </span>
          </div>

          <p
            className="font-light tracking-tight text-neutral-200/85 [text-shadow:0_1px_3px_rgba(0,0,0,.7)] anim-copy"
            style={{
              fontSize: 'var(--copy-size)',
              lineHeight: 'var(--copy-leading)',
              width: 'clamp(380px, 31.67vw, 500px)',
              marginTop: 'var(--title-copy-gap)',
              marginBottom: 'var(--copy-cta-gap)',
            }}
          >
            Your services are scattered across a dozen portals.<br />
            Kubra brings them into one clear signal, so every<br />
            decision is backed by open rails you actually trust.
          </p>

          <button
            type="button"
            className="relative rounded-[7px] bg-white text-black shadow-[0_1px_5px_rgba(0,0,0,.38)] hover:brightness-110 active:scale-95 transition-all flex items-center anim-cta font-geist"
            style={{
              width: 'var(--cta-width)',
              height: 'var(--cta-height)',
            }}
          >
            <span
              className="absolute left-[8.125%] font-medium tracking-tight whitespace-nowrap text-black"
              style={{ fontSize: 'var(--primary-control-font-size)' }}
            >
              Get Started
            </span>
            <span className="absolute right-[3.125%] top-[14.286%] w-[20.625%] h-[71.429%] rounded-[7px] bg-[#070909] flex items-center justify-center">
              <svg viewBox="0 0 14 14" className="w-3.5 h-3.5 stroke-white fill-none stroke-2">
                <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        </div>

        {/* Bottom-Right Glass Demo Card (z-20) */}
        <article
          className="absolute rounded-[clamp(12px,1.52vh,18px)] border border-white/15 bg-gradient-to-br from-[#181614]/80 to-[#050c0e]/85 shadow-[0_2px_10px_rgba(0,0,0,.44),inset_0_0_0_3px_rgba(255,255,255,.035),0_0_0_1px_rgba(0,0,0,.9)] backdrop-blur-md backdrop-saturate-[108%] flex flex-col justify-between p-[3.5%] z-20 anim-card font-geist"
          style={{
            right: 'var(--gutter-end)',
            bottom: 'var(--hero-bottom)',
            width: 'var(--card-width)',
            aspectRatio: '201 / 265',
          }}
        >
          <div className="relative w-[93%] h-[58%] rounded-lg bg-[#101a1e] overflow-hidden mx-auto">
            <img
              src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&auto=format&fit=crop&q=80"
              alt="Abstract red and blue smoke"
              className="w-full h-full object-cover brightness-90 saturate-95 contrast-105"
            />
            <button
              type="button"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/35 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform"
              aria-label="Play demo"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white ml-0.5">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            className="w-full h-[32%] rounded-md bg-gradient-to-br from-[#1a2224]/85 to-[#101d21]/90 border border-white/20 text-white font-normal text-xs tracking-tight flex items-center justify-center hover:brightness-110 transition-all [text-shadow:0_1px_2px_rgba(0,0,0,.6)] font-geist"
          >
            Watch Demo
          </button>
        </article>
      </section>
    </main>
  );
}
