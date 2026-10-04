import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "outline-light";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

const variants = {
  primary: "bg-brand text-white hover:bg-brand-dark hover:text-white border-2 border-brand hover:border-brand-dark",
  outline: "border-2 border-brand-dark text-brand-dark hover:bg-brand-soft",
  "outline-light": "border-2 border-white text-white hover:bg-white/10 hover:text-white",
};

export function Button({ href, children, variant = "primary", size = "md", className = "", onClick }: ButtonProps) {
  const sizing = size === "sm" ? "px-5 py-2.5 text-[15px]" : "px-7 py-3.5 text-[17px]";
  const cls = `inline-flex items-center justify-center rounded-[10px] font-bold transition-colors ${sizing} ${variants[variant]} ${className}`;
  // External, tel: and wa.me links use a plain anchor; internal routes use Link.
  if (/^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex self-start rounded-full px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.1em] ${
        dark ? "border border-white/20 bg-white/10 text-[#ffd3d6]" : "bg-brand-soft text-brand-dark"
      }`}
    >
      {children}
    </span>
  );
}

export function Heading({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={`font-display font-extrabold tracking-[-0.025em] leading-[1.1] text-3xl md:text-[44px] ${className}`}>
      {children}
    </Tag>
  );
}

// Grey dashed box standing in for a photo or video until real media is supplied.
export function Placeholder({ label, className = "", dark = false }: { label: string; className?: string; dark?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center p-6 text-center text-[13px] uppercase tracking-[0.08em] ${
        dark ? "border-2 border-dashed border-[#a0585e] bg-maroon-2 text-[#fbe3e5]" : "border-2 border-dashed border-sand-line bg-sand text-ink-4"
      } ${className}`}
    >
      {label}
    </div>
  );
}

// Line icon drawn from SVG path data on a 24×24 stroke grid (paths live in lib/ data files).
export function Icon({ d, size = 24, className = "" }: { d: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 md:px-8 ${className}`}>{children}</div>;
}
