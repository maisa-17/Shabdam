import type { CSSProperties, ReactNode } from "react";

// Fades its children up as they scroll into view, using a CSS scroll-driven animation (.reveal in globals.css).
// No JavaScript: the content is visible in the HTML from the start, so it shows on slow networks, old phones
// and with JavaScript off. Browsers without scroll-driven animations simply show it without the fade.
export function Reveal({ children, delay = 0, y = 28, className = "" }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const style = { "--reveal-y": `${y}px`, "--reveal-delay": `${Math.round(delay * 100)}px` } as CSSProperties;
  return (
    <div className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
