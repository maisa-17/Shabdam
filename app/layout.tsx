import type { Metadata, Viewport } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Analytics from "@/components/Analytics";
import { businessJsonLd, jsonLdScript, keywords, siteUrl } from "@/lib/seo";
import { site } from "@/lib/site";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  // Headings show in the fallback font until this arrives; not preloading it keeps 27 KB out of the critical path on slow networks.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | Hearing Aids, Hearing Tests & Speech Therapy in Kochi`,
    template: `%s | ${site.name}`,
  },
  description:
    "Hearing aid centre in Kochi with branches in Thrippunithura, Thoppumpady and Aluva (Angamaly opening soon). Hearing tests (PTA, impedance audiometry), hearing aid trial and fitting, repairs and speech therapy for every age.",
  keywords: [...new Set([...keywords.core, ...keywords.services.slice(0, 6), ...keywords.hearingAids.slice(0, 6)])],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    url: siteUrl,
    images: [{ url: "/logo.webp", width: 760, height: 211, alt: site.name }],
  },
  // Favicon set generated from the logo ear artwork (source files in /brand/favicons).
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#FF2E17",
};

// Runs before first paint: flags data-saver, 2G/3G and low-memory devices so heavy effects stay off (see .lite in globals.css).
const liteModeScript = `try{var c=navigator.connection||{},m=navigator.deviceMemory;if(c.saveData||/(^|-)(2g|3g)$/.test(c.effectiveType||"")||(m&&m<=2))document.documentElement.classList.add("lite")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jakarta.variable} antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: liteModeScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Analytics gaId={site.gaId} />
        {/* Business and branch details for search engines */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(businessJsonLd()) }} />
      </body>
    </html>
  );
}
