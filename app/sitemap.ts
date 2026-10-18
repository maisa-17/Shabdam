import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { pageCategories } from "@/lib/services";

// Every public page, served at /sitemap.xml for search engines.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/hearing-aids", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.7 },
  ];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p.path}`, changeFrequency: "monthly" as const, priority: p.priority })),
    ...pageCategories.map((c) => ({ url: `${siteUrl}/services/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
