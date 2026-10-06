"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { site } from "@/lib/site";

export function PhoneIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.12.37 2.33.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.27.2 2.48.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
    </svg>
  );
}

// The three branch phone numbers as tappable rows.
export function BranchList({ onPick }: { onPick?: () => void }) {
  return (
    <ul className="flex flex-col gap-2">
      {site.branches.map((b) => (
        <li key={b.name}>
          <a
            href={b.phoneHref}
            onClick={onPick}
            className="flex items-center gap-3 rounded-xl border border-line bg-white p-3 text-ink transition-colors hover:border-brand-dark hover:bg-brand-soft hover:text-ink"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              <PhoneIcon size={18} />
            </span>
            <span className="flex flex-col">
              <span className="font-bold">{b.name}</span>
              <span className="text-sm text-ink-3">{b.phone}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

// Branch picker panel: heading, numbers, and a link to book online.
export function BranchPanel({ onClose, className = "" }: { onClose?: () => void; className?: string }) {
  return (
    <div role="dialog" aria-label="Choose a branch to call" className={`rounded-2xl border border-line bg-white p-4 text-left shadow-lg ${className}`}>
      <p className="px-2 pt-1 pb-3 text-sm font-bold tracking-[0.08em] text-ink-4 uppercase">Choose a branch to call</p>
      <BranchList onPick={onClose} />
      <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-2 pt-3 text-sm text-ink-3">
        <span>Open {site.hours}</span>
        
      </p>
    </div>
  );
}

// A button that opens the branch picker above or below it.
export function CallMenu({
  children,
  className = "",
  placement = "bottom",
}: {
  children: ReactNode;
  className?: string;
  placement?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative">
      <button type="button" aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(!open)} className={className}>
        {children}
      </button>
      {open && (
        <BranchPanel
          onClose={() => setOpen(false)}
          className={`absolute left-0 z-30 lg:right-0 lg:left-auto w-[min(340px,calc(100vw-2rem))] ${placement === "top" ? "bottom-full mb-2" : "top-full mt-2"}`}
        />
      )}
    </div>
  );
}
