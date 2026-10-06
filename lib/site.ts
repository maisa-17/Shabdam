// Business details shown across the site.
// Values in [brackets] are placeholders still to be confirmed by the client.

export const site = {
  name: "Shabdham Hearing Aid Center",
  legalName: "Shabdha Hearing Aid Center LLP", // [confirm spelling]
  tagline: "Hearing and speech care for every age, across Kochi since 2010 [confirm].",
  phone: "[PHONE]",
  phoneHref: "tel:0000000000",
  whatsapp: "[NUMBER]",
  whatsappHref: "https://wa.me/910000000000",
  whatsappMessage: "Hi Shabdham, I'd like to know more about a hearing test.",
  email: "[info@your-domain]",
  hours: "10:00 am – 5:30 pm",
  workingDays: "[confirm working days]",
  languages: ["Malayalam", "English", "Tamil", "Hindi"],
  consultationFee: "₹400 [confirm]",
  rating: { score: "4.9", count: "360+", source: "Justdial" },
  links: {
    youtube: "https://www.youtube.com/@ShabdhamHearingAidCenter",
    googleReviews: "https://g.page/",
  },
  branches: [
    { name: "Thoppumpady", short: "PT Jacob Road", address: "1, Ground Floor, Thoppumpady Junction, PT Jacob Road, Ernakulam 682005", landmark: "Between Mythri Chips & Rozario Bakery, near Our Lady Convent Church", phone: "+91 74908 34743", phoneHref: "tel:+917490834743", rating: "4.9 ★ · 113 Justdial ratings" },
    { name: "Thrippunithura", short: "North Fort Road", address: "North Fort Road, Thrippunithura, Ernakulam [PIN — confirm]", landmark: "Opp. Old Sreekala Theatre, near Vadakkekotta Metro Station", phone: "+91 98461 80550", phoneHref: "tel:+919846180550", rating: "4.9 ★ · 250 Justdial ratings" },
    { name: "Aluva", short: "[Address]", address: "[Full address]", landmark: "[Landmark]", phone: "+91 90746 04737", phoneHref: "tel:+919074604737", rating: "[Rating]" },
  ],
  brands: ["Signia", "Phonak", "Widex", "ReSound", "Starkey", "Oticon"],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/hearing-aids", label: "Hearing Aids" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerLinks = [
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/hearing-aids", label: "Hearing Aids" },
  { href: "/contact", label: "Contact & Branches" },
  { href: "/book-appointment", label: "Book Appointment" },
] as const;
