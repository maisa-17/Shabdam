// Search keywords and structured data. Keywords come from what patients search for and the clinic's Justdial listings
// (category "Hearing Aid Dealers"; PTA, impedance audiometry, speech therapy, hearing aid trial and fitting; the brands sold).

import { site } from "./site";

// The live site redirects shabdhamhearaid.com → www, so canonical URLs, the sitemap and structured data use www.
export const siteUrl = "https://www.shabdhamhearaid.com";

// Cities and towns the branches serve, plus the state for wider "in Kerala" searches.
const places = ["Kochi", "Ernakulam", "Thrippunithura", "Thoppumpady", "Aluva", "Angamaly"];
const regions = ["Kerala", ...places];

// Brand + "hearing aid(s)" phrases. Signia was formerly Siemens hearing instruments, so people still search "Siemens".
const brandKeywords = [...site.brands.map((b) => `${b} hearing aids Kochi`), "Siemens hearing aids Kochi"];

export const keywords = {
  // Used on every page
  core: [
    "Shabdham Hearing Aid Center",
    "Shabdham hearing aid centre",
    "hearing aid centre in Kochi",
    "hearing aid dealers in Ernakulam",
    ...regions.map((p) => `hearing aid center ${p}`),
    ...regions.map((p) => `best hearing aid ${p}`),
    "best hearing aid near me",
    "hearing aid center near me",
    "hearing aid shop near me",
    "buy hearing aid",
    "buy hearing aid Kochi",
    "affordable hearing aid",
    "affordable hearing aid Kerala",
    "hearing test near me",
    "audiologist in Kochi",
    "speech therapy in Kochi",
  ],
  services: [
    "hearing test Kochi",
    "hearing testing centre Ernakulam",
    "pure tone audiometry (PTA) Kochi",
    "audiometry test Ernakulam",
    "impedance audiometry Kochi",
    "tympanometry test Kochi",
    "OAE test for newborns Kochi",
    "newborn hearing screening Ernakulam",
    "hearing aid trial Kochi",
    "hearing aid fitting Ernakulam",
    "hearing aid repair Ernakulam",
    "hearing aid service centre Kochi",
    "tinnitus treatment Kochi",
    "speech therapy for children Kochi",
    "speech therapist Ernakulam",
    "custom ear plugs Kochi",
  ],
  hearingAids: [
    "hearing aids Kochi",
    ...regions.map((p) => `buy hearing aid ${p}`),
    ...regions.map((p) => `affordable hearing aid ${p}`),
    "best hearing aid near me",
    "invisible hearing aids Kochi",
    "IIC CIC ITC hearing aids",
    "receiver in ear (RIE / RIC) hearing aids",
    "behind the ear (BTE) hearing aids",
    "rechargeable hearing aids Ernakulam",
    "programmable hearing aids",
    "wireless Bluetooth hearing aids",
    "hearing aids for kids",
    "hearing aid chargers",
    ...brandKeywords,
  ],
  contact: [
    ...regions.map((p) => `hearing aid shop ${p}`),
    "hearing aid center near me",
    "hearing aid center Thrippunithura North Fort Road",
    "hearing aid center Thoppumpady PT Jacob Road",
    "hearing aid center Aluva Power House Road",
    "hearing aid center Angamaly",
    "book hearing test Kochi",
  ],
};

// Opening hours in schema.org form (Monday to Saturday, 10:00 am – 5:30 pm).
const openingHours = {
  "@type": "OpeningHoursSpecification",
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "10:00",
  closes: "17:30",
};

// Strip "[… confirm]" notes so placeholders never reach search engines.
const clean = (s: string) => s.replace(/\[[^\]]*\]/g, "").replace(/\s{2,}/g, " ").trim();
// "…, Ernakulam 682005" → postal code
const pin = (address: string) => clean(address).match(/\b\d{6}\b/)?.[0];

// One business with a location per branch: lets Google show each branch for local "near me" searches.
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${siteUrl}/#business`,
    name: site.name,
    url: siteUrl,
    logo: `${siteUrl}/logo.webp`,
    image: `${siteUrl}/logo.webp`,
    description: site.tagline,
    telephone: site.phone,
    email: site.email,
    medicalSpecialty: ["Audiology", "SpeechPathology"],
    knowsAbout: ["Hearing tests", "Pure tone audiometry", "Impedance audiometry", "Hearing aid fitting", "Hearing aid repair", "Tinnitus management", "Speech therapy"],
    brand: site.brands.map((name) => ({ "@type": "Brand", name })),
    areaServed: [{ "@type": "State", name: "Kerala" }, ...places.map((name) => ({ "@type": "City", name }))],
    sameAs: [site.links.youtube],
    openingHoursSpecification: openingHours,
    department: site.branches.map((b) => ({
      "@type": "MedicalBusiness",
      "@id": `${siteUrl}/contact#${b.name.toLowerCase()}`,
      name: `${site.name} – ${b.name}`,
      url: `${siteUrl}/contact`,
      telephone: b.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: clean(b.address).replace(/,?\s*(Ernakulam|Kerala)\b.*$/, ""),
        addressLocality: b.name,
        addressRegion: "Kerala",
        postalCode: pin(b.address),
        addressCountry: "IN",
      },
      openingHoursSpecification: openingHours,
    })),
  };
}

// Safe to inline in a <script> tag (escapes "<" as the Next.js JSON-LD guide recommends).
export const jsonLdScript = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
