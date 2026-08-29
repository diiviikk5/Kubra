'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionPending, setMotionPending] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMotionPending(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  // Matter.js Interactive Falling Text Physics (React Bits Style)
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Body,
      Composite,
    } = Matter;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 350;

    const engine = Engine.create({
      gravity: { x: 0, y: 0.75, scale: 0.001 },
    });
    const world = engine.world;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: width,
        height: height,
        background: 'transparent',
        wireframes: false,
      },
    });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Boundaries
    const wallOpts = { isStatic: true, render: { visible: false }, restitution: 0.75 };
    const ground = Bodies.rectangle(width / 2, height + 20, width * 2, 40, wallOpts);
    const leftWall = Bodies.rectangle(-20, height / 2, 40, height * 2, wallOpts);
    const rightWall = Bodies.rectangle(width + 20, height / 2, 40, height * 2, wallOpts);
    World.add(world, [ground, leftWall, rightWall]);

    // Items: K U B R A + Civic Tags
    const items = [
      { text: 'K', bg: '#ffffff', color: '#101010', isMain: true, w: 76, h: 76, radius: 20, fontSize: 40 },
      { text: 'U', bg: '#ffffff', color: '#101010', isMain: true, w: 76, h: 76, radius: 20, fontSize: 40 },
      { text: 'B', bg: '#ffc5dc', color: '#831843', isMain: true, w: 76, h: 76, radius: 20, fontSize: 40 },
      { text: 'R', bg: '#fd86db', color: '#701a75', isMain: true, w: 76, h: 76, radius: 20, fontSize: 40 },
      { text: 'A', bg: '#f43f5e', color: '#ffffff', isMain: true, w: 76, h: 76, radius: 20, fontSize: 40 },
      { text: 'ONDC Core', bg: 'rgba(255,255,255,0.08)', color: '#60a5fa', isMain: false, w: 120, h: 36, radius: 18, fontSize: 13 },
      { text: 'Coordination', bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', isMain: false, w: 130, h: 36, radius: 18, fontSize: 13 },
      { text: 'Voter Bloc', bg: 'rgba(16,185,129,0.15)', color: '#34d399', isMain: false, w: 110, h: 36, radius: 18, fontSize: 13 },
    ];

    const bodiesList: { body: Matter.Body; item: typeof items[0] }[] = [];

    items.forEach((item, idx) => {
      const x = width / 2 + (idx - items.length / 2) * 52 + (Math.random() - 0.5) * 30;
      const y = -40 - idx * 50;
      const body = Bodies.rectangle(x, y, item.w, item.h, {
        chamfer: { radius: item.radius },
        restitution: 0.8,
        friction: 0.1,
        angle: (Math.random() - 0.5) * 0.4,
        render: { visible: false },
      });
      bodiesList.push({ body, item });
      World.add(world, body);
    });

    // Mouse Interaction
    const mouse = Mouse.create(canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;

    // Custom Canvas Render Loop
    let animationFrameId: number;
    const ctx = canvas.getContext('2d');

    const drawLoop = () => {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        bodiesList.forEach(({ body: b, item: itm }) => {
          ctx.save();
          ctx.translate(b.position.x, b.position.y);
          ctx.rotate(b.angle);

          ctx.beginPath();
          ctx.roundRect(-itm.w / 2, -itm.h / 2, itm.w, itm.h, itm.radius);
          ctx.fillStyle = itm.bg;
          ctx.fill();

          if (!itm.isMain) {
            ctx.lineWidth = 1;
            ctx.strokeStyle = itm.color;
            ctx.stroke();
          } else {
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetY = 3;
          }

          ctx.fillStyle = itm.color;
          ctx.font = `${itm.isMain ? '900 ' : '600 '}${itm.fontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(itm.text, 0, 1);
          ctx.restore();
        });
      }
      animationFrameId = requestAnimationFrame(drawLoop);
    };

    drawLoop();

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      render.canvas.width = newW;
      render.canvas.height = newH;
      Body.setPosition(ground, { x: newW / 2, y: newH + 20 });
      Body.setPosition(rightWall, { x: newW + 20, y: newH / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(world, false);
      Engine.clear(engine);
    };
  }, []);

  return (
    <main className={`fixed inset-0 bg-black text-white overflow-hidden select-none ${motionPending ? 'motion-pending' : ''}`}>
      <style jsx global>{`
        /* Desktop Tokens */
        .screen-container {
          --gutter-start: clamp(36px, 4.177vw, 96px);
          --gutter-end: clamp(36px, 4.04vw, 96px);
          --header-top: clamp(20px, 2.264vh, 30px);
          --hero-bottom: clamp(34px, 5.19vh, 64px);
          --display-size: clamp(58px, 7.64vh, 88px);
          --display-leading: clamp(72px, 9.34vh, 106px);
          --copy-size: clamp(14px, 1.70vh, 19px);
          --copy-leading: clamp(19px, 2.17vh, 24px);
          --title-copy-gap: clamp(15px, 2.08vh, 24px);
          --copy-cta-gap: clamp(24px, 3.11vh, 36px);
          --cta-width: clamp(142px, 15.09vh, 168px);
          --cta-height: clamp(38px, 3.96vh, 44px);
          --primary-control-font-size: clamp(17px, 1.77vh, 19.25px);
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
      `}</style>

      <section className="screen-container absolute inset-0 w-full h-full bg-black overflow-hidden">
        {/* Full-Bleed Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none -z-30"
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

        {/* Dual-Layer Vignette */}
        <div
          className="absolute inset-0 pointer-events-none -z-20"
          style={{
            background: `
              linear-gradient(180deg, rgba(0,0,0,.03), transparent 24%, transparent 82%, rgba(0,0,0,.05)),
              radial-gradient(ellipse at 44% 54%, transparent 30%, rgba(0,0,0,.055) 100%)
            `,
          }}
        />

        {/* Header Bar */}
        <header
          className="absolute flex items-start z-20"
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
          <div className="hidden md:flex items-start flex-1">
            <nav className="flex items-start gap-[clamp(32px,2.9vw,43px)] ml-[clamp(36px,3.03vw,48px)] relative top-[9px] list-none">
              <li className="anim-nav-1">
                <a href="#home" className="text-white font-medium text-[16px] tracking-[-0.36px] relative top-[-3px]">
                  Home
                  <span className="absolute left-0 -bottom-1 w-[44px] h-[2px] bg-white/80" />
                </a>
              </li>
              <li className="anim-nav-2">
                <a href="#about" className="text-neutral-300 hover:text-white transition-colors text-[16px] tracking-[-0.36px]">
                  About
                </a>
              </li>
              <li className="anim-nav-3">
                <a href="#services" className="text-neutral-300 hover:text-white transition-colors text-[16px] tracking-[-0.36px]">
                  Services
                </a>
              </li>
              <li className="anim-nav-4">
                <a href="#contact" className="text-neutral-300 hover:text-white transition-colors text-[16px] tracking-[-0.36px]">
                  Contact
                </a>
              </li>
            </nav>

            <div className="ml-auto w-[211px] h-[48px] pl-2 border-l-2 border-neutral-300/50 flex flex-col justify-center anim-time">
              <span className="text-[15px] font-normal text-neutral-300/80 leading-tight">Timezone</span>
              <span className="text-[15px] font-medium text-white/95 leading-tight mt-0.5">9:47 PM • 14 July 2026</span>
            </div>

            <button
              type="button"
              className="w-[109px] h-[42px] rounded-[7px] bg-white text-black font-semibold text-[15px] tracking-[-0.34px] ml-[clamp(20px,1.95vw,29px)] shadow-[inset_0_1px_0_rgba(255,255,255,.72),0_1px_5px_rgba(0,0,0,.34)] hover:brightness-110 active:scale-95 transition-all anim-signup"
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

        {/* 🌟 CENTER MATTER.JS FALLING TEXT INTERACTIVE ZONE */}
        <div
          ref={containerRef}
          className="absolute top-[18dvh] left-1/2 -translate-x-1/2 w-[min(88vw,900px)] h-[40dvh] z-10 pointer-events-auto cursor-grab active:cursor-grabbing select-none"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </div>

        {/* Bottom-Left Hero Content */}
        <div
          className="absolute flex flex-col items-start z-10"
          style={{
            left: 'var(--gutter-start)',
            bottom: 'var(--hero-bottom)',
          }}
        >
          <h1 className="flex flex-col font-medium tracking-[-2.1px] text-white [text-shadow:0_2px_2px_rgba(0,0,0,.44)]"
            style={{
              fontSize: 'var(--display-size)',
              lineHeight: 'var(--display-leading)',
            }}
          >
            <span className="block overflow-hidden origin-left scale-x-[0.775]">
              <span className="inline-block anim-line-1">Stop Digging</span>
            </span>
            <span className="block overflow-hidden origin-left scale-x-[0.793] text-neutral-300/80">
              <span className="inline-block anim-line-2">Through Dashboards.</span>
            </span>
          </h1>

          <p
            className="font-light tracking-[0.13px] text-neutral-200/85 [text-shadow:0_1px_3px_rgba(0,0,0,.7)] anim-copy"
            style={{
              fontSize: 'var(--copy-size)',
              lineHeight: 'var(--copy-leading)',
              width: 'clamp(390px, 31.67vw, 500px)',
              marginTop: 'var(--title-copy-gap)',
              marginBottom: 'var(--copy-cta-gap)',
            }}
          >
            Your metrics are scattered across a dozen dashboards.<br />
            Vantage bring them into one clear signal, so every<br />
            decision is backed by data you actually trust.
          </p>

          <button
            type="button"
            className="relative rounded-[7px] bg-white text-black shadow-[0_1px_5px_rgba(0,0,0,.38)] hover:brightness-110 active:scale-95 transition-all flex items-center anim-cta"
            style={{
              width: 'var(--cta-width)',
              height: 'var(--cta-height)',
            }}
          >
            <span
              className="absolute left-[8.125%] font-medium tracking-[-0.3px] whitespace-nowrap text-black"
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

        {/* Bottom-Right Glass Demo Card */}
        <article
          className="absolute rounded-[clamp(12px,1.52vh,18px)] border border-white/15 bg-gradient-to-br from-[#181614]/80 to-[#050c0e]/85 shadow-[0_2px_10px_rgba(0,0,0,.44),inset_0_0_0_3px_rgba(255,255,255,.035),0_0_0_1px_rgba(0,0,0,.9)] backdrop-blur-md backdrop-saturate-[108%] flex flex-col justify-between p-[3.5%] z-10 anim-card"
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
            className="w-full h-[32%] rounded-md bg-gradient-to-br from-[#1a2224]/85 to-[#101d21]/90 border border-white/20 text-white font-normal text-xs tracking-tight flex items-center justify-center hover:brightness-110 transition-all [text-shadow:0_1px_2px_rgba(0,0,0,.6)]"
          >
            Watch Demo
          </button>
        </article>
      </section>
    </main>
  );
}
