// YouTube Shorts from the Shabdham channel, grouped by what each one shows.
// Titles are English renderings of the original (mostly Malayalam) titles.

export type Video = {
  id: string;
  title: string;
  meta: string;
  topic: "education" | "hearing-aids" | "care" | "story" | "brand";
};

export const videos: Video[] = [
  { id: "oTJhD3KCCk0", title: "Hearing loss: what causes it?", meta: "Malayalam · Expert talk", topic: "education" },
  { id: "KM1oVyzFaRw", title: "RIC hearing aids", meta: "Hearing aid types", topic: "hearing-aids" },
  { id: "rJDj8kZ79Z4", title: "Rechargeable hearing aids", meta: "Hearing aid types", topic: "hearing-aids" },
  { id: "8Jzb-Jm5OcI", title: "Completely-in-canal (CIC) hearing aids", meta: "Hearing aid types", topic: "hearing-aids" },
  { id: "Qqnd7K5GrhU", title: "Invisible hearing aids", meta: "Hearing aid types", topic: "hearing-aids" },
  { id: "6PLkvuFcUYE", title: "The right way to clean a hearing aid", meta: "Care tips", topic: "care" },
  { id: "ueX0ImAvRgY", title: "Clear sound is no longer out of reach", meta: "Malayalam", topic: "story" },
  { id: "RKYzFZhQA7g", title: "Now you can hear it all", meta: "Malayalam", topic: "brand" },
  { id: "0IdGWJXJfAk", title: "Get ready to listen", meta: "Malayalam", topic: "brand" },
  { id: "vCq_-zuP_-g", title: "Come back to a world full of sounds", meta: "Malayalam", topic: "brand" },
  { id: "_Z7ym4ZnuUU", title: "Hear everything clearly", meta: "Malayalam", topic: "brand" },
  { id: "4frJRaBmMGo", title: "The world of hearing is beautiful", meta: "Malayalam", topic: "brand" },
];

export const byTopic = (...topics: Video["topic"][]) => videos.filter((v) => topics.includes(v.topic));

// Full-resolution 9:16 frame (1080×1920) — hqdefault is a small 4:3 frame with black bars.
export const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/oar2.jpg`;
export const embed = (id: string, autoplay = false) =>
  `https://www.youtube-nocookie.com/embed/${id}?playsinline=1&rel=0${autoplay ? "&autoplay=1" : ""}`;
export const watchUrl = (id: string) => `https://www.youtube.com/shorts/${id}`;
