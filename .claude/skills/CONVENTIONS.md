# Shabdam — Conventions

Used by `review-pr`. See `REFERENCE.md` for stack, directory map and tokens.

## Components
- Server Components by default; `'use client'` only for state, effects, event handlers or browser APIs — and push it to the smallest leaf
- Props typed with a named `interface <ComponentName>Props`, exported from the barrel
- Use `next/image` for images and `next/link` for internal links
- Page and layout props use Next's generated global types (`PageProps<"/route">`, `LayoutProps<"/route">`)
- Export `metadata` (or `generateMetadata`) from every page

## Imports
- Use the `@/` alias for anything outside the current feature folder; relative imports within it
- No barrel re-export cycles; a feature never imports another feature's internals, only its `index.ts`

## Styling
- Tailwind utilities from tokens in `app/globals.css` only — no arbitrary values (`w-[158px]`, `bg-[#383838]`)
- Every color must work in dark mode (tokens handle this; don't hard-code `dark:` hex values)
- Prefer CSS (container queries, `:has()`, scroll-driven animations) over JS — see the `css-first` skill

## TypeScript
- No `any`; no `as` assertions without a comment explaining why
- `npx tsc --noEmit` and `npm run lint` must pass

## Error handling
- Async server work in `try/catch` or handled via `error.tsx` boundaries per route segment
- Provide `loading.tsx` for routes that fetch data
