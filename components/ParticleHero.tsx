"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { heroStats } from "@/lib/home";
import { Eyebrow } from "./ui";

// Hero with a particle cloud that morphs between an ear with a hearing aid,
// a sound wave and the word "HEAR". Canvas 2D, no libraries.

type Pt = { x: number; y: number };
type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; c: number; s: number; j: number };

const COLORS = ["#FFFFFF", "#FFD3D6", "#FF6B74", "#E3000F", "#FF6B74"];
const COUNT = 1500;
const MORPH_MS = 4200;
const PHASES = ["Listen", "Process", "Hear"];

const EAR_PATHS = [
  "M250 180 C248 118 298 86 346 90 C402 95 428 142 422 192 C418 232 396 252 381 277 C366 302 372 332 356 362 C340 392 300 398 284 372",
  "M288 182 C294 146 340 136 364 164 C384 188 370 218 346 232 C326 244 326 266 336 290",
  "M414 96 C380 58 312 66 292 116 C278 156 286 214 302 254",
];

// Read back every grid pixel the drawing made opaque.
function sample(w: number, h: number, step: number, drawFn: (ctx: CanvasRenderingContext2D) => void): Pt[] {
  const off = document.createElement("canvas");
  off.width = Math.ceil(w);
  off.height = Math.ceil(h);
  const ctx = off.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  drawFn(ctx);
  const data = ctx.getImageData(0, 0, off.width, off.height).data;
  const pts: Pt[] = [];
  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      if (data[(y * off.width + x) * 4 + 3] > 128) pts.push({ x, y });
    }
  }
  return pts;
}

function buildShapes(w: number, h: number, cx: number, cy: number, s: number, family: string): Pt[][] {
  const ear = sample(w, h, 5, (ctx) => {
    ctx.translate(cx, cy);
    ctx.scale(1.35 * s, 1.35 * s);
    ctx.translate(-335, -240);
    ctx.lineWidth = 9;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    for (const d of EAR_PATHS) ctx.stroke(new Path2D(d));
    ctx.translate(426, 142);
    ctx.rotate((20 * Math.PI) / 180);
    ctx.beginPath();
    ctx.roundRect(-18, -51, 36, 102, 18);
    ctx.fill();
  });

  const wave = sample(w, h, 5, (ctx) => {
    ctx.lineWidth = 7 * s;
    ctx.lineCap = "round";
    for (const [amp, phase] of [
      [120, 0],
      [80, 1.6],
      [45, 3.1],
    ]) {
      ctx.beginPath();
      for (let x = -300; x <= 300; x += 2) {
        const fade = Math.sin((Math.PI * (x + 300)) / 600);
        const y = amp * Math.sin(x * 0.03 + phase) * fade;
        const px = cx + x * s;
        const py = cy + y * s;
        if (x === -300) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
  });

  const word = sample(w, h, 6, (ctx) => {
    ctx.font = `800 ${220 * s}px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HEAR", cx, cy);
  });

  return [ear, wave, word];
}

export default function ParticleHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!hero || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-jakarta").trim() || "'Plus Jakarta Sans', sans-serif";

    let w = 0;
    let h = 0;
    let dpr = 1;
    let shapes: Pt[][] = [];
    let shapeIdx = 0;
    let fontsReady = false;
    let visible = true;
    let raf = 0;
    let disposed = false;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];

    // Desktop: shape sits right of the text. Mobile: centred in the space below the text.
    const placement = () => (w >= 1024 ? { cx: w * 0.7, cy: h * 0.53, s: 1 } : { cx: w / 2, cy: h - 260, s: Math.min(0.62, w / 640) });

    const assign = (snap = false) => {
      const pts = shapes[shapeIdx];
      if (!pts || pts.length === 0) return;
      particles.forEach((p, i) => {
        const t = pts[(i * 7919 + shapeIdx * 31) % pts.length];
        p.tx = t.x;
        p.ty = t.y;
        if (snap) {
          p.x = t.x;
          p.y = t.y;
        }
      });
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = 0.85;
      // Batch by colour to keep fillStyle changes to a handful per frame.
      for (let c = 0; c < COLORS.length; c++) {
        ctx.fillStyle = COLORS[c];
        for (const p of particles) if (p.c === c) ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      const t = now / 1000;
      for (const p of particles) {
        const tx = p.tx + Math.sin(t * 1.3 + p.j) * 1.5;
        const ty = p.ty + Math.cos(t * 1.1 + p.j) * 1.5;
        p.vx = p.vx * 0.84 + (tx - p.x) * 0.014;
        p.vy = p.vy * 0.84 + (ty - p.y) * 0.014;
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0.01) {
          const force = ((120 - dist) / 120) * 5;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        p.x += p.vx;
        p.y += p.vy;
      }
      draw();
    };

    const loop = (now: number) => {
      step(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (raf || reduceMotion || !fontsReady || !visible) return;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const rebuild = () => {
      if (!fontsReady || w === 0) return;
      const { cx, cy, s } = placement();
      shapes = buildShapes(w, h, cx, cy, s, family);
      assign(reduceMotion);
      if (reduceMotion) draw();
    };

    const resize = () => {
      const r = hero.getBoundingClientRect();
      const first = w === 0;
      w = r.width;
      h = r.height;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      if (first) {
        particles = Array.from({ length: COUNT }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
          tx: Math.random() * w,
          ty: Math.random() * h,
          c: Math.floor(Math.random() * COLORS.length),
          s: 1.4 + Math.random() * 1.6,
          j: Math.random() * Math.PI * 2,
        }));
      }
      rebuild();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(hero);

    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    const timer = reduceMotion
      ? 0
      : window.setInterval(() => {
          if (!visible || shapes.length === 0) return;
          shapeIdx = (shapeIdx + 1) % shapes.length;
          assign();
          setPhase(shapeIdx);
        }, MORPH_MS);

    const family800 = `800 100px ${family}`;
    Promise.all([document.fonts.load(family800).catch(() => undefined), document.fonts.ready]).then(() => {
      if (disposed) return;
      fontsReady = true;
      rebuild();
      start();
    });

    return () => {
      disposed = true;
      stop();
      window.clearInterval(timer);
      ro.disconnect();
      io.disconnect();
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative -mt-20 overflow-hidden bg-[radial-gradient(circle_at_50%_80%,#3a0a0e_0%,#170507_60%,#0c0204_100%)] md:-mt-24 lg:h-[840px] lg:bg-[radial-gradient(circle_at_72%_52%,#3a0a0e_0%,#170507_60%,#0c0204_100%)]"
    >
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      <div className="pointer-events-none relative mx-auto flex h-full w-full max-w-[1200px] items-center px-4 pt-32 pb-[480px] md:px-8 md:pt-36 lg:pt-20 lg:pb-8">
        <div className="flex max-w-[640px] flex-col gap-7">
          <Eyebrow dark>Hearing care, scientifically done</Eyebrow>
          <h1 className="bg-[linear-gradient(100deg,#ffffff_30%,#ff6b74_60%,#e3000f_90%)] bg-clip-text pb-2 font-display text-[56px] leading-[0.98] font-extrabold tracking-[-0.04em] text-transparent sm:text-[72px] lg:text-[88px]">
            Sound,
            <br />
            restored.
          </h1>
          <p className="max-w-[500px] text-lg leading-relaxed text-[#e9cfd1] md:text-[19px]">
            From the first hearing test to the perfect fitting, we turn noise back into conversation — for newborns to grandparents.
          </p>
          <div className="pointer-events-auto flex flex-wrap gap-4">
            <Link
              href="/contact#enquiry"
              className="inline-flex items-center justify-center rounded-xl bg-brand px-7 py-3.5 text-[17px] font-bold text-white shadow-[0_12px_36px_rgba(227,0,15,0.45)] transition-colors hover:bg-brand-dark hover:text-white"
            >
              Book a hearing test
            </Link>
            <Link
              href="/hearing-aids"
              className="inline-flex items-center justify-center rounded-xl border-2 border-white px-7 py-3.5 text-[17px] font-bold text-white transition-colors hover:bg-white/10 hover:text-white"
            >
              Explore hearing aids
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
            {heroStats.map((s) => (
              <li key={s.small} className="flex flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ff6b74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={s.icon} />
                </svg>
                <span className="font-display text-2xl leading-none font-extrabold text-white">{s.big}</span>
                <span className="text-[13px] text-[#e9cfd1]">{s.small}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8">
        <div className="mx-auto flex max-w-[1200px] items-end justify-center px-4 md:px-8 lg:justify-between">
          <span className="hidden text-sm text-white/45 lg:inline">Move your mouse through the particles</span>
          <ol className="flex gap-6 md:gap-8" aria-label="Animation phase">
            {PHASES.map((label, i) => (
              <li
                key={label}
                aria-current={phase === i ? "step" : undefined}
                className={`flex items-center gap-3 text-sm font-bold tracking-[0.1em] uppercase transition-colors duration-[400ms] ${
                  phase === i ? "text-white" : "text-white/35"
                }`}
              >
                <span className="h-px w-7 bg-current" />
                {label}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
