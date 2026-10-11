"use client";

import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { PhoneIcon } from "./CallPicker";
import { Button } from "./ui";

type Panel = "menu" | null;

// Every branch shares one number, so the phone icon dials it directly.
function CallButton() {
  return (
    <a
      href={site.phoneHref}
      aria-label={`Call us on ${site.phone}`}
      title={`Call ${site.phone}`}
      className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-soft text-brand-dark transition-colors hover:bg-brand hover:text-white"
    >
      <PhoneIcon />
    </a>
  );
}

export default function NavLinks() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);

  const toggle = (p: Exclude<Panel, null>) => setPanel((cur) => (cur === p ? null : p));
  const close = () => setPanel(null);
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  // Close any open panel on outside click or Escape.
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setPanel(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [panel]);

  return (
    <div ref={root} className="contents">
      {/* Desktop links: a pill slides behind whichever link is hovered or focused */}
      <MotionConfig reducedMotion="user">
        <nav className="hidden gap-1 text-base font-medium lg:flex" onMouseLeave={() => setHovered(null)}>
          {nav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHovered(item.href)}
                onFocus={() => setHovered(item.href)}
                onBlur={() => setHovered(null)}
                className={`group relative isolate rounded-full px-4 py-2 transition-colors hover:text-brand-dark ${active ? "text-brand-dark" : "text-ink"}`}
              >
                {hovered === item.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {item.label}
                {/* Underline: always on for the current page, grows from the centre on hover/focus for the rest */}
                <span
                  aria-hidden
                  className={`absolute right-4 bottom-1 left-4 h-0.5 origin-center rounded-full bg-brand transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </MotionConfig>
      <div className="hidden items-center gap-5 lg:flex">
        <CallButton />
        <Button href="/contact#enquiry" size="sm">
          Book Appointment
        </Button>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <CallButton />
        <button
          type="button"
          aria-label={panel === "menu" ? "Close menu" : "Open menu"}
          aria-expanded={panel === "menu"}
          onClick={() => toggle("menu")}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-line"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {panel === "menu" ? <path d="M5 5l12 12M17 5L5 17" /> : <path d="M3 6h16M3 11h16M3 16h16" />}
          </svg>
        </button>
      </div>

      {panel === "menu" && (
        <div className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-white px-4 pb-6 shadow-lg lg:hidden">
          <nav className="flex flex-col text-lg font-medium">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`-mx-3 rounded-xl border-b border-line px-3 py-3 transition-colors hover:bg-brand-soft hover:text-brand-dark ${isActive(item.href) ? "text-brand-dark" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button href="/contact#enquiry" onClick={close}>
              Book Appointment
            </Button>
            <Button href={site.phoneHref} variant="outline" onClick={close}>
              <PhoneIcon size={18} />
              <span className="ml-2">Call {site.phone}</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
