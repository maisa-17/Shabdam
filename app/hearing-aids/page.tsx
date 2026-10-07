import type { Metadata } from "next";
import { BrandOrbit } from "@/components/ui/brand-orbit";
import CtaBanner from "@/components/CtaBanner";
import FaqList from "@/components/FaqList";
import HearingAidCatalog from "@/components/HearingAidCatalog";
import PageHero from "@/components/PageHero";
import ShortPlayer from "@/components/ShortPlayer";
import { Button, Container, Eyebrow, Heading } from "@/components/ui";
import { accessories, perks, styles, whatsappLink } from "@/lib/hearing-aids";
import { brandLogos } from "@/lib/home";
import { getCategory } from "@/lib/services";
import { site } from "@/lib/site";
import { byTopic } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Hearing Aids",
  description:
    "Genuine BTE, RIC, invisible, rechargeable and Bluetooth hearing aids from Signia, Phonak, Widex, ReSound, Starkey and Oticon — chosen from your test results, with a free trial, in Kochi.",
};

const faqs = getCategory("hearing-aid-fitting")?.faqs ?? [];
const videos = byTopic("hearing-aids");

export default function HearingAidsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${site.brands.length} global brands`}
        title="Hearing aids that fit your life."
        intro="Genuine devices chosen from your test results and fitted by our audiologists. Try before you decide."
      />

      {/* Perks */}
      <section className="border-b border-line bg-white">
        <Container className="flex flex-wrap justify-center gap-x-10 gap-y-3 py-5 md:justify-between">
          {perks.map((p) => (
            <span key={p} className="flex items-center gap-2.5 text-[15px] font-bold">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-sm text-brand-dark" aria-hidden>
                ✓
              </span>
              {p}
            </span>
          ))}
        </Container>
      </section>

      {/* Brands */}
      <section className="overflow-hidden pt-16 pb-4 md:pt-24">
        <Container>
          <BrandOrbit
            logos={brandLogos}
            center={{ src: "/ear-icon.webp", alt: site.name }}
            title={`Genuine hearing aids from ${brandLogos.length} global brands`}
            description="Chosen from your test results and fitted by our audiologists — with a free trial before you decide."
            action={
              <Button href="#catalogue" variant="outline" size="sm">
                Browse hearing aids
              </Button>
            }
          />
        </Container>
      </section>

      {/* Styles */}
      <section className="py-16 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex max-w-[760px] flex-col gap-4">
            <Eyebrow>Types</Eyebrow>
            <Heading>Find the right style</Heading>
            <p className="text-lg leading-relaxed text-ink-3">From powerful behind-the-ear models to near-invisible in-canal designs.</p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((s) => (
              <li key={s.code} className="flex items-start gap-5 rounded-[20px] border border-line bg-white p-6 shadow-card">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-maroon font-display text-lg font-extrabold text-white">{s.code}</span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-lg font-bold">{s.name}</span>
                  <span className="text-[15px] leading-relaxed text-ink-3">{s.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="scroll-mt-28 bg-cream pb-16 md:scroll-mt-32 md:pb-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <Eyebrow>Browse</Eyebrow>
            <Heading>Our hearing aids</Heading>
          </div>
          <HearingAidCatalog />
        </Container>
      </section>

      {/* Accessories */}
      <section id="accessories" className="scroll-mt-28 bg-maroon py-16 text-white md:scroll-mt-32 md:py-24">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="flex max-w-[760px] flex-col gap-4">
              <Eyebrow dark>Accessories</Eyebrow>
              <Heading className="text-white">Get more from your hearing aids</Heading>
            </div>
            <Button href={whatsappLink("Hi Shabdham, I'd like to order a hearing aid accessory.")} variant="outline-light" size="sm" className="shrink-0 self-start md:self-auto">
              Order on WhatsApp
            </Button>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {accessories.map((a) => (
              <li key={a.name} className="flex flex-col gap-2 rounded-[20px] border border-white/10 bg-white/5 p-6">
                <span className="text-lg font-bold">{a.name}</span>
                <span className="text-[15px] leading-relaxed text-blush-soft">{a.desc}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Videos */}
      {videos.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <Container className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <Eyebrow>Watch</Eyebrow>
              <Heading>Hearing aid types, explained</Heading>
            </div>
            <div className="flex snap-x gap-5 overflow-x-auto pb-2 [scrollbar-width:none]">
              {videos.map((v) => (
                <div key={v.id} className="flex w-[220px] shrink-0 snap-start flex-col gap-2.5">
                  <ShortPlayer video={v} />
                  <span className="text-base leading-snug font-semibold">{v.title}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-16 md:py-24">
          <Container className="grid items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div className="flex flex-col gap-4">
              <Eyebrow>FAQs</Eyebrow>
              <Heading>Questions people ask</Heading>
              <p className="text-base leading-relaxed text-ink-3">Can&apos;t find your answer? Call any branch or message us on WhatsApp.</p>
            </div>
            <FaqList faqs={faqs} />
          </Container>
        </section>
      )}

      <CtaBanner title="Not sure which hearing aid is right for you?" text="Book a hearing test and try one free before you decide." />
    </>
  );
}
