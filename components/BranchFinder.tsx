"use client";

import { MotionConfig, motion } from "framer-motion";
import { useState } from "react";
import { Icon, Placeholder } from "./ui";
import { whatsappLink } from "@/lib/hearing-aids";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Values still in [brackets] are unconfirmed placeholders; don't link or map them.
const confirmed = (s: string) => !s.startsWith("[");
// Drop bracketed notes like "[PIN — confirm]" before sending an address to Maps.
const mapQuery = (address: string) => encodeURIComponent(address.replace(/\[[^\]]*\]/g, "").trim());

const pin = "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z";
const flag = "M4 22V4M4 4h12l-2 4 2 4H4";
const clock = "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2";
const plus = "M12 5v14M5 12h14";
const whatsapp = "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z";

// Expanding branch cards, adapted from the Framer "Feature Flipper": open one branch and it widens
// to show its map and details while the others shrink. Stacks vertically on mobile.
export default function BranchFinder() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-3 lg:h-[540px] lg:flex-row">
        {site.branches.map((b, i) => {
          const open = active === i;
          const shrunk = active !== null && !open;
          const mapped = confirmed(b.address);
          return (
            <article
              key={b.name}
              id={b.name.toLowerCase()}
              onClick={() => !open && setActive(i)}
              className={cn(
                "group relative flex min-w-0 scroll-mt-32 flex-col overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_85%_100%,#5a1c21_0%,#3a0a0e_45%,#170507_100%)] p-5 text-white md:p-7",
                "transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(.44,0,.56,1)] motion-reduce:transition-none lg:basis-0",
                open ? "lg:grow-[4]" : "cursor-pointer lg:grow",
                !open && "min-h-[190px] lg:min-h-0"
              )}
            >
              {/* Decorative rings, drifting on hover like the Framer card's background art */}
              <svg
                aria-hidden
                viewBox="0 0 400 400"
                className={cn(
                  "pointer-events-none absolute -right-28 -bottom-28 w-[420px] text-[#ff6b74] transition-transform duration-700 ease-[cubic-bezier(.44,0,.56,1)] motion-reduce:transition-none",
                  open ? "opacity-10" : "opacity-25 group-hover:-translate-x-6 group-hover:-translate-y-4"
                )}
              >
                {[190, 150, 110, 70].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />
                ))}
              </svg>

              {/* Top row: label pill and open/close toggle */}
              <div className="relative z-10 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[13px] font-bold tracking-[0.08em] text-[#ffd3d6] uppercase">
                  <Icon d={pin} size={15} /> {shrunk ? "" : "Branch "}0{i + 1}
                </span>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`branch-${i}`}
                  aria-label={open ? `Close ${b.name}` : `Open ${b.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive(open ? null : i);
                  }}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-maroon transition-colors hover:bg-brand hover:text-white"
                >
                  <Icon d={plus} size={18} className={cn("transition-transform duration-500", open && "rotate-45")} />
                </button>
              </div>

              {open ? (
                <motion.div
                  id={`branch-${i}`}
                  key="open"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 mt-6 grid flex-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                >
                  <div className="flex min-w-0 flex-col gap-5">
                    <div>
                      <h3 className="font-display text-[32px] leading-tight font-extrabold tracking-[-0.02em] break-words md:text-[36px]">{b.name}</h3>
                      {confirmed(b.rating) && <p className="mt-1 text-sm font-semibold text-blush">{b.rating}</p>}
                    </div>
                    <dl className="flex flex-col gap-3 text-[15px] leading-relaxed text-[#e9cfd1]">
                      <div className="flex gap-3">
                        <dt className="sr-only">Address</dt>
                        <Icon d={pin} size={18} className="mt-0.5 shrink-0 text-[#ff6b74]" />
                        <dd>{b.address}</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="sr-only">Landmark</dt>
                        <Icon d={flag} size={18} className="mt-0.5 shrink-0 text-[#ff6b74]" />
                        <dd>{b.landmark}</dd>
                      </div>
                      <div className="flex gap-3">
                        <dt className="sr-only">Hours</dt>
                        <Icon d={clock} size={18} className="mt-0.5 shrink-0 text-[#ff6b74]" />
                        <dd>
                          {site.hours} · {site.workingDays}
                        </dd>
                      </div>
                    </dl>
                    {mapped && (
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery(b.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto flex w-full items-center justify-center gap-2 rounded-[10px] border-2 border-white px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element -- small static icon */}
                        <img src="/location-pin.webp" alt="" className="h-8 w-auto" />
                        Directions
                      </a>
                    )}
                  </div>
                  {mapped ? (
                    <iframe
                      title={`Map of the ${b.name} branch`}
                      src={`https://maps.google.com/maps?q=${mapQuery(b.address)}&z=16&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-64 w-full min-w-0 rounded-[20px] border-0 lg:h-full"
                    />
                  ) : (
                    <Placeholder dark label={`Map · ${b.name} [address to confirm]`} className="h-64 rounded-[20px] lg:h-full" />
                  )}
                </motion.div>
              ) : (
                <div className="relative z-10 mt-auto flex flex-col gap-1.5 pt-10">
                  <h3
                    className={cn(
                      "font-display leading-tight font-extrabold tracking-[-0.02em] transition-[font-size] duration-500",
                      shrunk ? "text-2xl lg:rotate-180 lg:self-start lg:text-[28px] lg:[writing-mode:vertical-rl]" : "text-[32px] md:text-[36px]"
                    )}
                  >
                    {b.name}
                  </h3>
                  <p className={cn("text-[15px] text-[#e9cfd1]", shrunk && "lg:hidden")}>{b.short}</p>
                  <p className={cn("text-sm text-blush", shrunk && "lg:hidden")}>{b.phone}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* Upcoming branches: an announcement card with a WhatsApp "notify me" until they open. */}
      {site.upcomingBranches.map((br) => (
        <div
          key={br.name}
          className="relative mt-3 flex flex-col gap-6 overflow-hidden rounded-[28px] border border-line bg-white bg-[radial-gradient(circle_at_0%_50%,rgba(227,0,15,0.08)_0%,rgba(227,0,15,0)_45%)] p-6 shadow-card sm:flex-row sm:items-center md:gap-8 md:p-8"
        >
          {/* Pin with a slow pulse ring */}
          <span className="relative flex h-16 w-16 shrink-0 items-center justify-center">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-brand/20 [animation-duration:2.4s] motion-reduce:animate-none" />
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_rgba(227,0,15,0.35)]">
              <Icon d={pin} size={26} />
            </span>
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <span className="text-[13px] font-bold tracking-[0.1em] text-brand-dark uppercase">
              New branch · Coming soon
            </span>
            <h3 className="font-display text-[30px] leading-tight font-extrabold tracking-[-0.02em] md:text-[36px]">{br.name}</h3>
            <p className="text-[15px] text-ink-3">{br.opening}</p>
            <div className="mt-2 flex flex-col gap-1.5 text-[15px] leading-relaxed text-ink-2">
              <p className="flex gap-2">
                <Icon d={pin} size={17} className="mt-1 shrink-0 text-brand" />
                {br.address}
              </p>
              <p className="flex gap-2 text-ink-3">
                <Icon d={flag} size={17} className="mt-1 shrink-0 text-brand" />
                {br.landmark}
              </p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery(br.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 self-start font-bold text-brand-dark underline-offset-4 hover:underline"
              >
                Get directions →
              </a>
            </div>
          </div>

          <a
            href={whatsappLink(`Hi Shabdham, please let me know when the ${br.name} branch opens.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center justify-center gap-3 self-start rounded-full bg-ink py-2 pr-2 pl-6 font-bold text-white transition-colors hover:bg-brand hover:text-white sm:self-auto"
          >
            Notify me on WhatsApp
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25d366] text-white transition-colors group-hover:bg-white group-hover:text-brand">
              <Icon d={whatsapp} size={18} />
            </span>
          </a>
        </div>
      ))}
    </MotionConfig>
  );
}
