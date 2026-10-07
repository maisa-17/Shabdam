"use client";

import { useEffect, useRef } from "react";
import { PillButton } from "@/components/ui";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const words = text.split(" ");

  // CSS animation (.sh-rise) so the words paint before JavaScript loads.
  return (
    <span className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <span
            key={i}
            className="sh-rise relative inline-block"
            style={{ marginRight: isLast ? 0 : "0.25em", animationDelay: `${i * 0.08}s` }}
          >
            {word}
            {showAsterisk && isLast && <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>}
          </span>
        );
      })}
    </span>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */
interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({ segments, className = "", style }: WordsPullUpMultiStyleProps) => {
  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {words.map((w, i) => (
        <span key={i} className={`sh-rise inline-block ${w.className ?? ""}`} style={{ marginRight: "0.25em", animationDelay: `${i * 0.08}s` }}>
          {w.word}
        </span>
      ))}
    </span>
  );
};

/* ---------------- Particle canvas ---------------- */
type Pt = { x: number; y: number };
type Particle = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; c: number; s: number; j: number };
type Speck = { x: number; y: number; z: number; vy: number; ph: number };

const COLORS = ["#FFFFFF", "#FFD3D6", "#FF6B74", "#FF2E17", "#FF6B74"];
const COUNT = 1400;
const DUST = 260;
const MORPH_MS = 4200;
const STEP_MS = 1000 / 60;

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
    ctx.scale(s, s);
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
      [100, 0],
      [68, 1.6],
      [38, 3.1],
    ]) {
      ctx.beginPath();
      for (let x = -260; x <= 260; x += 2) {
        const fade = Math.sin((Math.PI * (x + 260)) / 520);
        const y = amp * Math.sin(x * 0.034 + phase) * fade;
        if (x === -260) ctx.moveTo(cx + x * s, cy + y * s);
        else ctx.lineTo(cx + x * s, cy + y * s);
      }
      ctx.stroke();
    }
  });

  const word = sample(w, h, 6, (ctx) => {
    ctx.font = `800 ${170 * s}px ${family}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("HEAR", cx, cy);
  });

  return [ear, wave, word];
}

/* ---------------- Background sound-wave lines ---------------- */
// [amp, phase, stroke width, colour, opacity, flow s, breathe s]
const WAVES: [number, number, number, string, number, number, number][] = [
  [150, 0, 2, "#FF6B74", 0.45, 5, 4.2],
  [110, 60, 3, "#FF2E17", 0.6, 3.9, 3],
  [80, 120, 1.5, "#FFB3B8", 0.4, 6, 3.6],
  [200, 30, 1.5, "#FF6B74", 0.25, 7.2, 4.8],
  [45, 90, 2.5, "#FFD3D6", 0.45, 3.3, 2.4],
  [240, 150, 1, "#FFB3B8", 0.18, 8.3, 5.4],
];

function wavePath(amp: number, ph: number) {
  let d = `M${-240 + ph},280 Q${-180 + ph},${280 - amp} ${-120 + ph},280`;
  for (let x = 0; x <= 3120; x += 120) d += ` T${x + ph},280`;
  return d;
}

/* ---------------- Moving backdrop ---------------- */
// Shared with inner-page heroes. The parent needs `sh-hero` so reduced motion stops the animations.
export const SoundBackdrop = () => (
  <>
    <div className="sh-bg" aria-hidden>
      <div className="sh-sweep" />
      <div className="sh-blob sh-blob-1" />
      <div className="sh-blob sh-blob-2" />
      <div className="sh-blob sh-blob-3" />
      <svg className="sh-waves" width="2880" height="560" viewBox="0 0 2880 560" fill="none">
        {WAVES.map(([amp, ph, sw, color, op, flow, breathe], i) => (
          <g key={i} className="sh-breathe" style={{ animationDuration: `${breathe}s`, animationDelay: `${-i * 1.3}s` }}>
            <path
              className="sh-flow"
              d={wavePath(amp, ph)}
              stroke={color}
              strokeOpacity={op}
              strokeWidth={sw}
              strokeLinecap="round"
              style={{ animationDuration: `${flow}s` }}
            />
          </g>
        ))}
      </svg>
    </div>

    {/* Readability shade */}
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(16,3,5,.85)_0%,rgba(16,3,5,.45)_35%,rgba(16,3,5,0)_62%)]"
      aria-hidden
    />
  </>
);

/* ---------------- Hero ---------------- */
const PrismaHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!hero || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-jakarta").trim() || "'Plus Jakarta Sans', sans-serif";
    const inIframe = window.top !== window;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let shapes: Pt[][] = [];
    let shapeIdx = 0;
    let fontsReady = false;
    let visible = true;
    let handle = 0;
    let running = false;
    let disposed = false;
    let last = 0;
    let acc = 0;
    let t = 0;
    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let dust: Speck[] = [];

    // Upper right on desktop; centred and scaled down on narrow screens.
    const placement = () => (w >= 1024 ? { cx: w * 0.77, cy: h * 0.3, s: 1 } : { cx: w / 2, cy: h * 0.3, s: Math.min(1, (w - 40) / 540) });

    const assign = (snap = false) => {
      const pts = shapes[shapeIdx];
      if (!pts || pts.length === 0) return;
      particles.forEach((p, i) => {
        const pt = pts[(i * 7919 + shapeIdx * 31) % pts.length];
        p.tx = pt.x;
        p.ty = pt.y;
        if (snap) {
          p.x = pt.x;
          p.y = pt.y;
        }
      });
    };

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = "#FFC9CD";
      for (const d of dust) {
        ctx.globalAlpha = 0.15 + d.z * 0.5;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 0.8 + d.z * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.85;
      // Batch by colour to keep fillStyle changes to a handful per frame.
      for (let c = 0; c < COLORS.length; c++) {
        ctx.fillStyle = COLORS[c];
        for (const p of particles) if (p.c === c) ctx.fillRect(p.x, p.y, p.s, p.s);
      }
      ctx.globalAlpha = 1;
    };

    const step = () => {
      t += STEP_MS / 1000;
      for (const d of dust) {
        d.x += 0.25 + d.z * 0.9;
        d.y += d.vy + Math.sin(t * 0.8 + d.ph) * 0.15;
        if (d.x > w + 4) d.x = -4;
        if (d.y < -4) d.y = h + 4;
      }
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
    };

    // Fixed 60fps physics steps, catching up at most 4 per frame.
    const frame = (now: number) => {
      if (!running) return;
      acc += Math.min(now - last, STEP_MS * 4);
      last = now;
      while (acc >= STEP_MS) {
        step();
        acc -= STEP_MS;
      }
      draw();
      schedule();
    };
    // Browsers throttle rAF inside embedded frames, so fall back to a timer there.
    const schedule = () => {
      handle = inIframe ? window.setTimeout(() => frame(performance.now()), 16) : requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduceMotion || !fontsReady || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      acc = 0;
      schedule();
    };
    const stop = () => {
      running = false;
      if (inIframe) window.clearTimeout(handle);
      else cancelAnimationFrame(handle);
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
        dust = Array.from({ length: DUST }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          z: 0.3 + Math.random() * 0.7,
          vy: -(0.05 + Math.random() * 0.25),
          ph: Math.random() * Math.PI * 2,
        }));
      }
      rebuild();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(hero);

    // Pause the CSS backdrop too while the hero is off-screen or the tab is hidden.
    const syncPaused = () => hero.classList.toggle("sh-paused", !visible || document.hidden);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPaused();
      if (visible) start();
      else stop();
    });
    io.observe(hero);

    const onVisibility = () => {
      syncPaused();
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

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
          if (!running || shapes.length === 0) return;
          shapeIdx = (shapeIdx + 1) % shapes.length;
          assign();
        }, MORPH_MS);

    Promise.all([document.fonts.load(`800 100px ${family}`).catch(() => undefined), document.fonts.ready]).then(() => {
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
      document.removeEventListener("visibilitychange", onVisibility);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <section ref={heroRef} className="sh-hero relative -mt-20 flex h-svh min-h-[560px] w-full items-end overflow-hidden bg-[#1A0406] md:-mt-24">
        <SoundBackdrop />

        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 z-[1] h-full w-full" />

        {/* Hero content */}
        {/* Entrance animations are CSS (.sh-rise / .sh-slide) so the content paints before JavaScript loads. */}
        <div className="relative z-[2] px-5 pb-10 md:px-14 md:pb-14">
          <h1 className="mt-5 -ml-[0.045em] flex items-start gap-[0.045em] font-display text-[clamp(60px,min(11.5vw,19svh),180px)] leading-[0.9] font-semibold tracking-[-0.055em] text-[#EFE9DD]">
            <WordsPullUp text="Feel The Rhythm" />
            <svg
              viewBox="0 0 58 58"
              fill="none"
              stroke="#FF2E17"
              strokeWidth="6"
              strokeLinecap="round"
              className="sh-slide mt-[0.118em] h-[0.264em] w-[0.264em] shrink-0"
              style={{ animationDelay: "0.5s" }}
              aria-hidden
            >
              <path d="M14 10 Q32 29 14 48" />
              <path d="M30 2 Q56 29 30 56" />
            </svg>
          </h1>

          <p
            className="sh-rise mt-[26px] max-w-[900px] text-[17px] leading-[1.5] text-[rgba(239,233,221,0.78)] md:text-[22px]"
            style={{ animationDelay: "0.5s", animationDuration: "0.8s" }}
          >
            Scientific hearing tests, expert hearing aid fitting and lifelong aftercare — for newborns to grandparents, at three branches across
            Kochi.
          </p>

          <div className="sh-rise mt-[34px]" style={{ animationDelay: "0.7s", animationDuration: "0.8s" }}>
            <PillButton href="/contact#enquiry">Book a hearing test</PillButton>
          </div>
        </div>
      </section>
    </>
  );
};

export { PrismaHero };
