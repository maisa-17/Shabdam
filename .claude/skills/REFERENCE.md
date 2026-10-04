# Shabdam — Reference

Used by `scaffold-component` and `css-first`. Keep it short and factual.

## Stack
- Next.js 16.3.8 (App Router) — APIs differ from older versions; check `node_modules/next/dist/docs/` before using an unfamiliar API (see AGENTS.md)
- React 19.2.8, TypeScript 5 (`strict: true`)
- Tailwind CSS v4 via `@tailwindcss/postcss` — no `tailwind.config.*`; tokens live in `app/globals.css` under `@theme`
- ESLint 9 with `eslint-config-next` (core-web-vitals + typescript)
- No test runner installed yet — `*.test.tsx` files are placeholders until one is added (Vitest + Testing Library recommended)

## Directory map
No `src/` directory. The `@/*` import alias maps to the repo root.

| Path | Purpose |
|---|---|
| `app/` | Routes, layouts, `globals.css` |
| `features/<feature>/components/<ComponentName>/` | Feature-scoped components |
| `components/ui/<ComponentName>/` | Shared, feature-agnostic primitives |
| `lib/` | Non-React utilities |
| `public/` | Static assets |

## Naming
- Component folders and files: `PascalCase` (`HeroBanner/HeroBanner.tsx`)
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Route segments: `kebab-case` folders
- Each component folder has an `index.ts` barrel exporting the component and its props type

## Design tokens
Defined in `app/globals.css`. Use the Tailwind utilities, never raw hex or arbitrary values.

| Token | Utility | Light | Dark |
|---|---|---|---|
| `--color-background` | `bg-background`, `text-background` | `#ffffff` | `#0a0a0a` |
| `--color-foreground` | `text-foreground`, `bg-foreground` | `#171717` | `#ededed` |
| `--font-sans` | `font-sans` | Geist | — |
| `--font-mono` | `font-mono` | Geist Mono | — |

TODO: add the brand palette, type scale and spacing from the Shabdham wireframe to `@theme` in `app/globals.css`, then list them here.
