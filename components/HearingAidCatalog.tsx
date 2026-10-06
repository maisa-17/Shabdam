import { hearingAids, whatsappLink } from "@/lib/hearing-aids";

// Product grid for the hearing aid catalogue.
export default function HearingAidCatalog() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {hearingAids.map((p) => (
        <li key={p.brand + p.type} className="flex flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card">
          <div className="flex h-[170px] items-center justify-center border-b border-dashed border-sand-line bg-sand text-[13px] tracking-[0.08em] text-ink-4 uppercase">
            Product image
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <span className="text-sm font-bold text-brand-dark">
              {p.brand} · {p.type}
            </span>
            <span className="font-display text-xl font-extrabold">{p.name}</span>
            <span className="flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand-dark">
                  {t}
                </span>
              ))}
            </span>
            <span className="mt-auto flex items-center justify-between gap-3 pt-2">
              <span className="font-bold">{p.price}</span>
              <a
                href={whatsappLink(`Hi Shabdham, I'd like to know more about the ${p.brand} ${p.type} hearing aid.`)}
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
