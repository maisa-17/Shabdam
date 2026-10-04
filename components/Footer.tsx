import Image from "next/image";
import Link from "next/link";
import { footerLinks, site } from "@/lib/site";
import { Container } from "./ui";

function ColTitle({ children }: { children: string }) {
  return <span className="text-sm font-bold uppercase tracking-[0.08em] text-white">{children}</span>;
}

export default function Footer() {
  return (
    <footer className="bg-ink pt-16 pb-8 text-[15px] text-[#e6dcdc]">
      <Container className="flex flex-col gap-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Image src="/logo.png" alt={site.name} width={760} height={211} className="h-14 w-auto self-start" />
            <span className="leading-relaxed">{site.tagline}</span>
          </div>
          <div className="flex flex-col gap-2.5">
            <ColTitle>Quick links</ColTitle>
            {footerLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-[#e6dcdc]">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <ColTitle>Branches</ColTitle>
            {site.branches.map((b) => (
              <Link key={b.name} href="/contact" className="text-[#e6dcdc]">
                {b.name} · {b.short}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <ColTitle>Contact</ColTitle>
            {site.branches.map((b) => (
              <a key={b.name} href={b.phoneHref} className="text-[#e6dcdc]">
                {b.name}: {b.phone}
              </a>
            ))}
            <span>{site.email}</span>
            <span>{site.hours}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-[#3d3334] pt-6 text-sm sm:flex-row">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span>Privacy Policy · Terms of Use · Careers</span>
        </div>
      </Container>
    </footer>
  );
}
