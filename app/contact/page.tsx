import type { Metadata } from "next";
import { keywords } from "@/lib/seo";
import Image from "next/image";
import type { ReactNode } from "react";
import BranchFinder from "@/components/BranchFinder";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import { Container, Eyebrow, Heading, Icon } from "@/components/ui";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";
import googleReviewsStacked from "@/public/google-reviews-stacked.webp";

export const metadata: Metadata = {
  title: "Contact & Branches – Thrippunithura, Thoppumpady, Aluva, Angamaly",
  description:
    "Visit Shabdham Hearing Aid Center in Thrippunithura (North Fort Road), Thoppumpady (PT Jacob Road) or Aluva (Power House Road), with Angamaly opening soon. Book a hearing test, call or WhatsApp +91 90746 04737. Open Monday to Saturday, 10 am – 5:30 pm.",
  keywords: [...keywords.core, ...keywords.contact],
  alternates: { canonical: "/contact" },
};

// Values still in [brackets] are unconfirmed placeholders; don't link them.
const confirmed = (s: string) => !s.startsWith("[");

const icons = {
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
};

function Fact({ icon, label, children }: { icon: string; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#ff6b74]">
        <Icon d={icon} size={20} />
      </span>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[13px] font-bold tracking-[0.08em] text-[#ffd3d6]/80 uppercase">{label}</span>
        {children}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to us. We're here to help."
        intro="Three branches across Kochi. Call the one nearest to you, message us on WhatsApp, or just walk in."
      />

      {/* Branches */}
      <section id="branches" className="scroll-mt-28 py-16 md:scroll-mt-32 md:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex flex-col gap-4">
              <Eyebrow>Our branches</Eyebrow>
              <Heading>Find the branch nearest to you</Heading>
            </div>
            <p className="max-w-[380px] text-lg leading-relaxed text-ink-3">Open a branch to see its address, landmark and map.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <BranchFinder />
          </Reveal>
        </Container>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="scroll-mt-28 pb-16 md:scroll-mt-32 md:pb-24">
        <Container>
          <Reveal className="grid overflow-hidden rounded-[32px] border border-line bg-white shadow-card lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
            {/* Info panel, styled like the branch cards above */}
            <div className="relative flex flex-col gap-10 overflow-hidden bg-[radial-gradient(circle_at_85%_100%,#5a1c21_0%,#3a0a0e_45%,#170507_100%)] p-7 text-white md:p-12">
              <svg aria-hidden viewBox="0 0 400 400" className="pointer-events-none absolute -right-32 -bottom-32 w-[440px] text-[#ff6b74] opacity-20">
                {[190, 150, 110, 70].map((r) => (
                  <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="currentColor" strokeWidth="1.5" />
                ))}
              </svg>

              <div className="relative flex flex-col gap-4">
                <Eyebrow dark>Send an enquiry</Eyebrow>
                <h2 className="font-display text-3xl leading-[1.1] font-extrabold tracking-[-0.025em] md:text-[40px]">Have a question? Send us a message.</h2>
                <p className="text-lg leading-relaxed text-[#e9cfd1]">For appointments, prices, repairs or anything else. Our team replies within working hours.</p>
              </div>

              <div className="relative flex flex-col gap-6">
                <Fact icon={icons.clock} label="Opening hours">
                  <span className="text-lg font-bold">{site.hours}</span>
                  <span className="text-[15px] text-[#e9cfd1]">{site.workingDays}</span>
                </Fact>
                <Fact icon={icons.mail} label="Email">
                  {confirmed(site.email) ? (
                    <a href={`mailto:${site.email}`} className="truncate text-lg font-bold text-white hover:text-blush">
                      {site.email}
                    </a>
                  ) : (
                    <span className="text-lg font-bold break-words">{site.email}</span>
                  )}
                </Fact>
              </div>

              <div className="relative mt-auto flex flex-wrap items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm md:gap-5">
                <a href={site.links.googleReviews} target="_blank" rel="noopener noreferrer" aria-label="Read our reviews on Google" className="shrink-0 transition-transform hover:-translate-y-0.5">
                  <Image src={googleReviewsStacked} alt="Google reviews, 5 stars" unoptimized className="h-16 w-auto md:h-[72px]" />
                </a>
                <span className="font-display text-[40px] leading-none font-extrabold tracking-[-0.03em] text-white md:text-[44px]">
                  {site.rating.score}
                  <span className="text-[#ff6b74]">★</span>
                </span>
                <span className="flex min-w-0 basis-full flex-col gap-1 text-[15px] leading-snug text-[#e9cfd1] sm:flex-1 sm:basis-auto">
                  Rated by {site.rating.count} patients on {site.rating.source}.
                  <a href={site.links.googleReviews} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:text-blush">
                    Read our Google reviews →
                  </a>
                </span>
              </div>
            </div>

            <div className="p-6 md:p-12">
              <EnquiryForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
