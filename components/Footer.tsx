import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { footerLinks, site } from "@/lib/site";
import { Container, Icon } from "./ui";

const icons = {
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6",
  globe: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20Z",
  youtube: "M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12a31 31 0 0 0 .4 3.8 3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .4-3.8 31 31 0 0 0-.4-3.8ZM10 15V9l5.2 3L10 15Z",
  arrowUp: "M12 19V5M5 12l7-7 7 7",
};

// Values still in [brackets] are unconfirmed placeholders; don't link them.
const confirmed = (s: string) => !s.startsWith("[");

function ColTitle({ children }: { children: string }) {
  return <h2 className="text-[13px] font-bold tracking-[0.1em] text-[#ffd3d6] uppercase">{children}</h2>;
}

function Detail({ icon, children }: { icon: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Icon d={icon} size={18} className="mt-0.5 shrink-0 text-[#ff6b74]" />
      <span className="flex min-w-0 flex-col">{children}</span>
    </li>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_0%,#3a0a0e_0%,#170507_55%,#0c0204_100%)] text-[15px] text-[#e9cfd1]">
      <Container className="relative z-10 flex flex-col gap-14 pt-16 pb-8 md:pt-20">
        {/* Brand, links and details */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Image src="/logo.webp" alt={site.name} width={760} height={211} className="h-14 w-auto self-start" />
            <p className="max-w-[340px] leading-relaxed">{site.tagline}</p>
            <a
              href={site.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 py-2 pr-4 pl-3 font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Icon d={icons.youtube} size={20} className="text-[#ff6b74]" />
              Watch us on YouTube
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <ColTitle>Explore</ColTitle>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center text-[#e9cfd1] transition-colors hover:text-white">
                    <span className="h-px w-0 bg-[#ff6b74] transition-all duration-300 group-hover:mr-2 group-hover:w-4" aria-hidden />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <ColTitle>Visit us</ColTitle>
            <ul className="flex flex-col gap-4">
              <Detail icon={icons.clock}>
                <span className="font-semibold text-white">{site.hours}</span>
                <span className="text-sm">{site.workingDays}</span>
              </Detail>
              <Detail icon={icons.mail}>
                {confirmed(site.email) ? (
                  <a href={`mailto:${site.email}`} className="truncate text-white hover:text-blush">
                    {site.email}
                  </a>
                ) : (
                  <span className="break-words text-white">{site.email}</span>
                )}
              </Detail>
              <Detail icon={icons.globe}>
                <span className="text-white">{site.languages.join(" · ")}</span>
              </Detail>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.legalName}
          </span>
          <div className="flex items-center gap-6">
            <span>Privacy Policy · Terms of Use · Careers</span>
            <a
              href="#"
              aria-label="Back to top"
              title="Back to top"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-brand hover:bg-brand hover:text-white"
            >
              <Icon d={icons.arrowUp} size={18} />
            </a>
          </div>
        </div>
      </Container>

      {/* Oversized faded wordmark along the bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none -mt-6 bg-[linear-gradient(180deg,rgba(255,107,116,0.16)_0%,rgba(255,107,116,0)_85%)] bg-clip-text text-center font-display text-[min(20vw,250px)] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-transparent select-none"
      >
        Shabdham
      </div>
    </footer>
  );
}
