'use client';

import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

interface FallingTextProps {
  text?: string;
  words?: string[];
  gravity?: number;
  wireframes?: boolean;
  className?: string;
  interactive?: boolean;
}

export const FallingText: React.FC<FallingTextProps> = ({
  text = 'K U B R A',
  words = ['K', 'U', 'B', 'R', 'A', 'ONDC', 'Coordination', 'Bharat', 'Power', 'Collective'],
  gravity = 0.8,
  className = '',
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sceneRef.current) return;

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
    const canvas = sceneRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 450;

    // 1. Create Engine
    const engine = Engine.create({
      gravity: { x: 0, y: gravity, scale: 0.001 },
    });
    const world = engine.world;

    // 2. Create Custom Renderer or use Matter Render
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

    // 3. Create Static Boundaries (Floor, Ceiling, Left, Right)
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
      friction: 0.2,
      restitution: 0.6,
    };
    const ground = Bodies.rectangle(width / 2, height + 25, width * 2, 50, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -30, width * 2, 50, wallOptions);
    const leftWall = Bodies.rectangle(-25, height / 2, 50, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 25, height / 2, 50, height * 2, wallOptions);

    World.add(world, [ground, ceiling, leftWall, rightWall]);

    // 4. Word Items definition
    const itemsToSpawn = [
      { text: 'K', bg: '#ffffff', color: '#101010', isMain: true, w: 90, h: 90, radius: 24, fontSize: 48 },
      { text: 'U', bg: '#ffffff', color: '#101010', isMain: true, w: 90, h: 90, radius: 24, fontSize: 48 },
      { text: 'B', bg: '#ffc5dc', color: '#831843', isMain: true, w: 90, h: 90, radius: 24, fontSize: 48 },
      { text: 'R', bg: '#fd86db', color: '#701a75', isMain: true, w: 90, h: 90, radius: 24, fontSize: 48 },
      { text: 'A', bg: '#f43f5e', color: '#ffffff', isMain: true, w: 90, h: 90, radius: 24, fontSize: 48 },
      { text: 'ONDC Core', bg: 'rgba(30, 41, 59, 0.9)', color: '#60a5fa', isMain: false, w: 140, h: 46, radius: 23, fontSize: 16 },
      { text: 'Coordination', bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', isMain: false, w: 150, h: 46, radius: 23, fontSize: 16 },
      { text: 'Voter Bloc', bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', isMain: false, w: 130, h: 46, radius: 23, fontSize: 16 },
      { text: 'DigiBazaar', bg: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', isMain: false, w: 130, h: 46, radius: 23, fontSize: 16 },
      { text: 'Multi-Seller', bg: 'rgba(236, 72, 153, 0.2)', color: '#f472b6', isMain: false, w: 135, h: 46, radius: 23, fontSize: 16 },
    ];

    // 5. Create Dynamic Bodies
    const bodies: { body: Matter.Body; item: typeof itemsToSpawn[0] }[] = [];

    itemsToSpawn.forEach((item, index) => {
      const x = width / 2 + (index - itemsToSpawn.length / 2) * 55 + (Math.random() - 0.5) * 40;
      const y = -60 - index * 60;
      const body = Bodies.rectangle(x, y, item.w, item.h, {
        chamfer: { radius: item.radius },
        restitution: 0.75, // Bouncy!
        friction: 0.15,
        density: 0.001,
        angle: (Math.random() - 0.5) * 0.4,
        render: { visible: false }, // we draw in custom render loop for high-res text
      });

      bodies.push({ body, item });
      World.add(world, body);
    });

    // 6. Mouse constraint for dragging/tossing
    if (interactive) {
      const mouse = Mouse.create(canvas);
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);
      render.mouse = mouse;
    }

    // 7. Custom High-DPI Canvas Text Render Loop (React Bits Style)
    let animationFrameId: number;
    const ctx = canvas.getContext('2d');

    const renderLoop = () => {
      if (ctx) {
        ctx.clearRect(0, 0, width, height);

        bodies.forEach(({ body, item }) => {
          const { x, y } = body.position;
          const angle = body.angle;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);

          // Draw rounded rectangle card / letter block
          ctx.beginPath();
          const r = item.radius;
          const w = item.w;
          const h = item.h;
          ctx.roundRect(-w / 2, -h / 2, w, h, r);
          ctx.fillStyle = item.bg;
          ctx.fill();

          if (!item.isMain) {
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = item.color;
            ctx.stroke();
          } else {
            ctx.shadowColor = 'rgba(0,0,0,0.5)';
            ctx.shadowBlur = 12;
            ctx.shadowOffsetY = 4;
          }

          // Draw Text
          ctx.fillStyle = item.color;
          ctx.font = `${item.isMain ? '900' : '700'} ${item.fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(item.text, 0, 2);

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    // 8. Window resize handler
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      render.canvas.width = newW;
      render.canvas.height = newH;
      Body.setPosition(ground, { x: newW / 2, y: newH + 25 });
      Body.setPosition(rightWall, { x: newW + 25, y: newH / 2 });
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
  }, [gravity, interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[400px] sm:h-[480px] overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <canvas ref={sceneRef} className="w-full h-full block" />
      <div className="absolute top-4 inset-x-0 text-center pointer-events-none">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-800 backdrop-blur-md">
          ✦ Interactive Matter.js Physics • Click &amp; Toss the Letters ✦
        </span>
      </div>
    </div>
  );
};
