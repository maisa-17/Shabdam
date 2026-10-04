// Static content for the home page.

import type { PhotoKey } from "./photos";

export type Feature = { title: string; desc: string; img: string; href: string; photo?: PhotoKey };
export type Step = { num: string; title: string; desc: string };
export type Stat = { big: string; small: string; icon: string };

// Quick facts shown under the hero buttons. icon: SVG path data on a 24×24 stroke grid.
export const heroStats: Stat[] = [
  { big: "2010", small: "Serving Kochi", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" },
  { big: "3", small: "Branches", icon: "M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Zm0-9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
  { big: "11", small: "Services", icon: "M6 8.5a6 6 0 1 1 12 0c0 3.5-3 4.5-3 7.5a3.5 3.5 0 0 1-6.5 1.8M9.5 8.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3.5" },
  { big: "6", small: "Top brands", icon: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.5 14 7 22l5-3 5 3-1.5-8" },
];

// Service cards in the "Our expertise" section.
export const featuredServices: Feature[] = [
  { title: "Hearing Tests & Diagnostics", desc: "PTA, impedance, OAE and BERA tests in a sound-treated room.", img: "Photo · hearing test booth", href: "/services/hearing-tests", photo: "booth" },
  { title: "Hearing Aids & Fitting", desc: "Free trial, precise programming and real-ear verified fitting.", img: "Photo · hearing aid fitting", href: "/services/hearing-aid-fitting", photo: "fitting" },
  { title: "Children's Hearing & Speech", desc: "Newborn screening, pediatric fitting and family counselling.", img: "Photo · child with audiologist", href: "/services/pediatric", photo: "child" },
  { title: "Speech Therapy", desc: "Articulation, fluency and voice therapy for children and adults.", img: "Photo · speech therapy session", href: "/services/speech-therapy", photo: "speech" },
  { title: "Tinnitus Management", desc: "Assessment, sound therapy and counselling for ringing ears.", img: "Photo · tinnitus counselling", href: "/services/tinnitus" },
  { title: "Repair & Maintenance", desc: "Cleaning, reprogramming, firmware updates and batteries.", img: "Photo · hearing aid repair", href: "/services/repair-maintenance" },
];

// The 5-step patient process.
export const processSteps: Step[] = [
  { num: "01", title: "Consultation", desc: "Case history and a detailed look at your hearing concerns." },
  { num: "02", title: "Diagnostic testing", desc: "PTA, impedance and speech tests in a sound-treated room." },
  { num: "03", title: "Results explained", desc: "Your audiogram in plain language, with honest options." },
  { num: "04", title: "Trial & precise fitting", desc: "Free trial, then programming verified with real-ear measurement." },
  { num: "05", title: "Follow-up care", desc: "Scheduled fine-tuning, cleaning and progress checks." },
];
