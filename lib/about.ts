// Static content for the About page. Values in [brackets] still need confirming with the clinic.

export type Stat = { big: string; small: string };
export type Milestone = { year: string; title: string; desc: string };
export type Value = { title: string; desc: string; icon: string };
export type Facility = { title: string; desc: string; icon: string };

export const storyParagraphs = [
  "[Founding story: who started Shabdham, why, and what makes the centre different — paragraph 1 from the client.]",
  "[Paragraph 2: how the clinic has grown, and the team's approach to patients today.]",
];

export const aboutStats: Stat[] = [
  { big: "[XX,000]+", small: "Patients served" },
  { big: "4.9 ★", small: "360+ Justdial ratings" },
  { big: "3", small: "Branches in Kochi" },
  { big: "11", small: "Service lines" },
];

export const timeline: Milestone[] = [
  { year: "2010", title: "First centre opens", desc: "[Confirm year and first location]" },
  { year: "[Year]", title: "Thrippunithura branch", desc: "North Fort Road, near Vadakkekotta Metro. [Confirm year]" },
  { year: "2018", title: "Thoppumpady branch", desc: "A dedicated audiology and speech unit at PT Jacob Road." },
  { year: "[Year]", title: "Aluva branch", desc: "[Opening details]" },
  { year: "Today", title: "3 branches, 11 service lines", desc: "Hearing, speech, tinnitus, sleep and ear care." },
];

// icon: SVG path data on a 24×24 stroke grid
export const values: Value[] = [
  { title: "Test first, advise second", desc: "Every recommendation is based on your test results, explained in plain language.", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { title: "No pressure to buy", desc: "Honest options at every budget, and a free trial before you decide.", icon: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.6 1-1.1a5.5 5.5 0 0 0 0-7.7Z" },
  { title: "Care for every age", desc: "From newborn screening to hearing aids for grandparents.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" },
  { title: "Aftercare that lasts", desc: "Fine-tuning, cleaning and check-ups for as long as you wear your hearing aids.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" },
];

export const facilities: Facility[] = [
  { title: "Sound-treated test rooms", desc: "Quiet booths for accurate hearing thresholds. [Confirm]", icon: "M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1v-6h3v4ZM3 19a2 2 0 0 0 2 2h1v-6H3v4Z" },
  { title: "Impedance audiometry", desc: "Tympanometry and reflex tests for middle-ear health.", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { title: "OAE & BERA", desc: "Objective tests for newborns and young children.", icon: "M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5M19 6.3A9 9 0 1 1 5 6.3M12 3a3 3 0 0 0 0 6" },
  { title: "Real-ear measurement", desc: "Verifies hearing aid output inside your own ear.", icon: "M6 8.5a6 6 0 1 1 12 0c0 3.5-3 4.5-3 7.5a3.5 3.5 0 0 1-6.5 1.8M9.5 8.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3.5" },
  { title: "Computerised programming", desc: "Manufacturer software for precise fitting and fine-tuning.", icon: "M2 4h20v12H2zM8 20h8M12 16v4" },
  { title: "Hygiene protocols", desc: "Instruments cleaned and disinfected after every patient.", icon: "M12 2.7 5.6 9.1a9 9 0 1 0 12.8 0L12 2.7Z" },
];
