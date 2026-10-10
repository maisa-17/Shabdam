// Business details shown across the site.
// Values in [brackets] are placeholders still to be confirmed by the client.

export const site = {
  name: "Shabdham Hearing Aid Center",
  legalName: "Shabdham Hearing Aid Center", // [confirm spelling]
  tagline: "Hearing and speech care for every age across Kochi, built on our founder's experience since 2010.",
  phone: "[PHONE]",
  phoneHref: "tel:0000000000",
  whatsapp: "+91 90746 04737",
  whatsappHref: "https://wa.me/919074604737",
  whatsappMessage: "Hi Shabdham, I'd like to know more about a hearing test.",
  email: "hearingaidfin@gmail.com",
  hours: "10:00 am – 5:30 pm",
  workingDays: "Monday to Saturday",
  languages: ["Malayalam", "English", "Tamil", "Hindi"],
  rating: { score: "4.9", count: "360+", source: "Google" }, // [confirm: score and count were taken from Justdial; update to the Google figures]
  links: {
    youtube: "https://www.youtube.com/@ShabdhamHearingAidCenter",
    googleReviews: "https://g.page/",
  },
  branches: [
    { name: "Thoppumpady", short: "PT Jacob Road", address: "1, Ground Floor, Thoppumpady Junction, PT Jacob Road, Ernakulam 682005", landmark: "Between Mythri Chips & Rozario Bakery, near Our Lady Convent Church", phone: "+91 85908 36420", phoneHref: "tel:+918590836420", rating: "4.9 ★ · 113 Justdial ratings" },
    { name: "Thrippunithura", short: "North Fort Road", address: "North Fort Road, Thrippunithura, Ernakulam [PIN — confirm]", landmark: "Opp. Old Sreekala Theatre, near Vadakkekotta Metro Station", phone: "+91 85901 39701", phoneHref: "tel:+918590139701", rating: "4.9 ★ · 250 Justdial ratings" },
    { name: "Aluva", short: "[Address]", address: "[Full address]", landmark: "[Landmark]", phone: "+91 97783 36052", phoneHref: "tel:+919778336052", rating: "[Rating]" },
  ],
  // Announced but not yet open: kept out of `branches` so they don't appear in call/enquiry lists.
  upcomingBranches: [
    {
      name: "Angamaly",
      opening: "Opening [month/year — confirm]",
      address: "VKV Building, Ground Floor, Aluva Road, NH Junction, Angamaly, Ernakulam 683572",
      landmark: "Near SM Book Center, opposite Chungath Jewellery",
    },
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
  { href: "/contact#enquiry", label: "Book Appointment" },
] as const;
