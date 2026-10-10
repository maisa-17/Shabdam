import Image from "next/image";
import { products, whatsappLink } from "@/lib/hearing-aids";

// Product grid for the hearing aid catalogue: hearing aids first, then chargers.
export default function HearingAidCatalog() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p, i) => (
        <li key={p.name} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
          {/* Every product image is a 360×240 (3:2) file filling the card width. The first row loads eagerly:
              "Browse hearing aids" jumps straight here, so those images can be the largest thing on screen. */}
          <div className="relative w-full overflow-hidden border-b border-line bg-cream" style={{ aspectRatio: "3 / 2" }}>
            <Image
              src={p.image}
              alt={p.name}
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
              loading={i < 3 ? "eager" : "lazy"}
              className="object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-cream px-3 py-1 text-[12px] font-bold tracking-[0.06em] text-ink-3 uppercase">{p.kind}</span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <span className="text-sm font-bold text-brand-dark">{p.brand ? `${p.brand} · ${p.type}` : p.type}</span>
            <span className="font-display text-xl leading-snug font-extrabold">{p.name}</span>
            <span className="text-[15px] leading-relaxed text-ink-3">{p.desc}</span>
            <span className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">
                  {t}
                </span>
              ))}
            </span>
            <span className="mt-auto pt-2">
              <a
                href={whatsappLink(`Hi Shabdham, I'd like to know more about the ${p.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-bold text-brand-dark"
              >
                Enquire →
              </a>
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}
