"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/site";
import { BranchList, BranchPanel, PhoneIcon } from "./CallPicker";
import { Button } from "./ui";

type Panel = "menu" | "call" | null;

function CallButton({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      aria-label="Call a branch"
      title="Call a branch"
      aria-expanded={open}
      aria-haspopup="dialog"
      onClick={onToggle}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
        open ? "bg-brand text-white" : "bg-brand-soft text-brand-dark hover:bg-brand hover:text-white"
      }`}
    >
      <PhoneIcon />
    </button>
  );
}

export default function NavLinks() {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
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
      <nav className="hidden gap-9 text-base font-medium lg:flex">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={isActive(item.href) ? "text-brand-dark" : ""}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        <CallButton open={panel === "call"} onToggle={() => toggle("call")} />
        <Button href="/book-appointment" size="sm">
          Book Appointment
        </Button>
      </div>

      <div className="flex items-center gap-2 lg:hidden">
        <CallButton open={panel === "call"} onToggle={() => toggle("call")} />
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

      {panel === "call" && (
        <BranchPanel onClose={close} className="absolute inset-x-0 top-full mt-2 lg:right-7 lg:left-auto lg:w-[340px]" />
      )}

      {panel === "menu" && (
        <div className="absolute inset-x-0 top-full mt-2 rounded-2xl border border-line bg-white px-4 pb-6 shadow-lg lg:hidden">
          <nav className="flex flex-col text-lg font-medium">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`border-b border-line py-3 ${isActive(item.href) ? "text-brand-dark" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button href="/book-appointment" onClick={close}>
              Book Appointment
            </Button>
          </div>
          <p className="mt-6 mb-3 text-sm font-bold tracking-[0.08em] text-ink-4 uppercase">Call a branch</p>
          <BranchList onPick={close} />
        </div>
      )}
    </div>
  );
}
