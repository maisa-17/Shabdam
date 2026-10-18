# Shabdham Hearing Aid Center — Website

Marketing website for [Shabdham Hearing Aid Center](https://www.shabdhamhearaid.com), a hearing and speech care clinic with branches across Kochi (Thoppumpady, Thrippunithura, Aluva, and Angamaly opening soon).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19 and TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (configured in `app/globals.css` — there is no `tailwind.config` file)
- [Framer Motion](https://motion.dev) for animation, [lucide-react](https://lucide.dev) for icons
- Google Analytics 4 via `@next/third-parties`

> **Note:** Next.js 16 has breaking changes from earlier versions. Check the docs in `node_modules/next/dist/docs/` before using an unfamiliar API (see [AGENTS.md](AGENTS.md)).

## Getting started

Requires Node.js 20 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Start the development server     |
| `npm run build` | Create a production build        |
| `npm run start` | Serve the production build       |
| `npm run lint`  | Run ESLint                       |

## Project structure

```
app/                  Routes (App Router)
  page.tsx            Home
  about/              About the clinic
  services/           Services list and /services/[slug] detail pages
  hearing-aids/       Hearing aid catalogue
  contact/            Branches and enquiry form
  sitemap.ts          Generated sitemap.xml
  robots.ts           Generated robots.txt
components/           Page sections (Header, Footer, EnquiryForm, ...)
  ui/                 Reusable visual building blocks
lib/                  Site content and configuration
public/               Images, brand logos and favicons
brand/                Source brand assets (favicons)
```

## Editing content

Most of the site's text lives in plain TypeScript data files in `lib/`, so content can be updated without touching components:

| File                 | Contents                                                        |
| -------------------- | --------------------------------------------------------------- |
| `lib/site.ts`        | Clinic name, phone, WhatsApp, email, hours, branches, nav links |
| `lib/services.ts`    | Service categories and sub-services                             |
| `lib/hearing-aids.ts`| Hearing aid styles and catalogue                                |
| `lib/home.ts`        | Home page content                                               |
| `lib/about.ts`       | About page content                                              |
| `lib/reviews.ts`     | Patient reviews                                                 |
| `lib/videos.ts`      | YouTube Shorts shown on the site                                |
| `lib/photos.ts`      | Site photos, referenced by key from the other data files        |
| `lib/seo.ts`         | Site URL, search keywords and structured data                   |

Values written in `[brackets]` are placeholders still to be confirmed with the clinic. Search for `[` in `lib/` to find them before launch.

## How enquiries work

There is no backend. The enquiry form on `/contact` builds a message from the form fields and opens it in WhatsApp, addressed to the number in `lib/site.ts`. `/book-appointment` redirects to the enquiry form (see `next.config.ts`).

## SEO

- Canonical URLs, the sitemap and structured data use `https://www.shabdhamhearaid.com` (set in `lib/seo.ts`).
- Default metadata is set in `app/layout.tsx`. The inner pages override it with their own `metadata` or `generateMetadata`.
- The Google Analytics measurement ID is set in `lib/site.ts` (`gaId`).

## Deployment

Any Node.js host that supports Next.js will work, such as [Vercel](https://vercel.com). Run `npm run build` and then `npm run start`, or connect the repository to Vercel for automatic deploys.
