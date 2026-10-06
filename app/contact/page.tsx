import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { CallMenu, PhoneIcon } from "@/components/CallPicker";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import { Container, Eyebrow, Heading, Icon, Placeholder } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Branches",
  description:
    "Call, WhatsApp or visit Shabdham Hearing Aid Center at Thoppumpady, Thrippunithura or Aluva in Kochi. Branch addresses, maps, phone numbers and opening hours.",
};

// Values still in [brackets] are unconfirmed placeholders; don't link or map them.
const confirmed = (s: string) => !s.startsWith("[");
// Drop bracketed notes like "[PIN — confirm]" before sending an address to Maps.
const mapQuery = (address: string) => encodeURIComponent(address.replace(/\[[^\]]*\]/g, "").trim());

const icons = {
  whatsapp: "M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.5 8.5 0 1 1 21 11.5Z",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM22 6l-10 7L2 6",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 6v6l4 2",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
};

function QuickCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 rounded-[20px] border border-line bg-white p-6 shadow-card">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-dark">{icon}</span>
      <span className="flex min-w-0 flex-col gap-1">
        <span className="text-sm font-bold tracking-[0.08em] text-ink-4 uppercase">{title}</span>
        {children}
      </span>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact us & visit a branch."
        intro="Three branches across Kochi. Call, WhatsApp or walk in — we're happy to help."
      />

      {/* Quick contact */}
      <section className="py-14 md:py-20">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <QuickCard icon={<PhoneIcon size={20} />} title="Call us">
            <CallMenu className="text-left text-lg font-bold text-ink hover:text-brand-dark">Choose a branch →</CallMenu>
          </QuickCard>
          <QuickCard icon={<Icon d={icons.whatsapp} size={20} />} title="WhatsApp">
            <a
              href={`${site.whatsappHref}?text=${encodeURIComponent(site.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-ink hover:text-brand-dark"
            >
              {confirmed(site.whatsapp) ? site.whatsapp : "Message us"}
            </a>
          </QuickCard>
          <QuickCard icon={<Icon d={icons.mail} size={20} />} title="Email">
            {confirmed(site.email) ? (
              <a href={`mailto:${site.email}`} className="truncate text-lg font-bold text-ink hover:text-brand-dark">
                {site.email}
              </a>
            ) : (
              <span className="text-lg font-bold break-words">{site.email}</span>
            )}
          </QuickCard>
          <QuickCard icon={<Icon d={icons.clock} size={20} />} title="Hours">
            <span className="text-lg font-bold">{site.hours}</span>
            <span className="text-sm text-ink-3">{site.workingDays}</span>
          </QuickCard>
        </Container>
        <Container className="pt-5">
          <p className="text-[15px] text-ink-3">We speak {site.languages.join(" · ")}.</p>
        </Container>
      </section>

      {/* Branches */}
      <section id="branches" className="scroll-mt-28 bg-white py-16 md:scroll-mt-32 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>Our branches</Eyebrow>
            <Heading>Find the branch nearest to you</Heading>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {site.branches.map((b) => {
              const mapped = confirmed(b.address);
              return (
                <article key={b.name} id={b.name.toLowerCase()} className="flex scroll-mt-32 flex-col overflow-hidden rounded-[22px] border border-line bg-cream">
                  {mapped ? (
                    <iframe
                      title={`Map of the ${b.name} branch`}
                      src={`https://maps.google.com/maps?q=${mapQuery(b.address)}&z=16&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-[220px] w-full border-0"
                    />
                  ) : (
                    <Placeholder label={`Map · ${b.name} [address to confirm]`} className="h-[220px]" />
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl font-extrabold">{b.name}</h3>
                      <span className="text-sm font-semibold text-brand-dark">{b.rating}</span>
                    </div>
                    <p className="flex gap-2 text-[15px] leading-relaxed text-ink-2">
                      <Icon d={icons.pin} size={18} className="mt-0.5 shrink-0 text-brand-dark" />
                      {b.address}
                    </p>
                    <p className="text-sm text-ink-4">Landmark: {b.landmark}</p>
                    <p className="text-sm text-ink-3">
                      {site.hours} ·{" "}
                      <a href={b.phoneHref} className="font-bold text-ink hover:text-brand-dark">
                        {b.phone}
                      </a>
                    </p>
                    <div className="mt-auto flex flex-wrap gap-3 pt-3">
                      {mapped && (
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${mapQuery(b.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-[10px] border-2 border-brand-dark px-5 py-2.5 text-[15px] font-bold text-brand-dark transition-colors hover:bg-brand-soft"
                        >
                          Directions
                        </a>
                      )}
                      <Link
                        href="/book-appointment"
                        className="inline-flex items-center justify-center rounded-[10px] border-2 border-brand bg-brand px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:border-brand-dark hover:bg-brand-dark hover:text-white"
                      >
                        Book here
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Enquiry */}
      <section className="py-16 md:py-24">
        <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Eyebrow>Send an enquiry</Eyebrow>
            <Heading>Have a question? Send us a message.</Heading>
            <p className="text-lg leading-relaxed text-ink-3">For appointments, prices, repairs or anything else. Our team replies within working hours.</p>
          </div>
          <EnquiryForm />
        </Container>
      </section>
    </>
  );
}
