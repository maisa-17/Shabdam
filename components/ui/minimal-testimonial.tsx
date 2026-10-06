"use client";

import Image from "next/image";
import { useState } from "react";

// Minimal testimonial switcher, adapted from the minimal-testimonial component.
// Pick a reviewer from the avatar row; the quote and name cross-fade.

export type Testimonial = {
  quote: string | string[]; // one string, or a list of paragraphs
  name: string;
  role: string;
  image?: string; // optional real photo; falls back to initials
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export function TestimonialsMinimal({ testimonials, className = "" }: { testimonials: Testimonial[]; className?: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className={`w-full max-w-3xl ${className}`}>
      {/* Quote — all quotes share one grid cell so the box fits the longest */}
      <div className="mb-10 grid" aria-live="polite">
        {testimonials.map((t, i) => {
          const paras = Array.isArray(t.quote) ? t.quote : [t.quote];
          return (
            <blockquote
              key={t.name}
              aria-hidden={active !== i}
              className={`flex flex-col gap-3 text-lg leading-relaxed font-light text-ink transition-all duration-500 ease-out [grid-area:1/1] md:text-xl ${
                active === i ? "translate-y-0 opacity-100 blur-0" : "pointer-events-none translate-y-4 opacity-0 blur-sm"
              }`}
            >
              {paras.map((p, j) => (
                <p key={j}>
                  {j === 0 && "“"}
                  {p}
                  {j === paras.length - 1 && "”"}
                </p>
              ))}
            </blockquote>
          );
        })}
      </div>

      {/* Author row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Avatars */}
        <div className="flex flex-wrap -space-x-2.5 gap-y-2 sm:-space-x-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show review by ${t.name}`}
              aria-pressed={active === i}
              className={`relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-[11px] font-bold ring-2 ring-cream transition-all duration-300 ease-out sm:h-10 sm:w-10 sm:text-xs ${
                active === i ? "z-10 scale-110 bg-brand text-white" : "bg-brand-soft text-brand-dark grayscale hover:scale-105 hover:grayscale-0"
              }`}
            >
              {t.image ? <Image src={t.image} alt={t.name} fill sizes="40px" className="object-cover" /> : initials(t.name)}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="hidden h-8 w-px bg-line sm:block" />

        {/* Active author */}
        <div className="grid min-h-[44px] flex-1">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              aria-hidden={active !== i}
              className={`flex flex-col justify-center transition-all duration-400 ease-out [grid-area:1/1] ${
                active === i ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-2 opacity-0"
              }`}
            >
              <span className="text-sm font-semibold text-ink">{t.name}</span>
              <span className="text-xs text-ink-4">{t.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
