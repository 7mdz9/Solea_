# Project State

## Sources of Truth
- Visual source of truth: `reference/solea-menu-prototype.html`
- Visual source of truth: `reference/solea-qr-generator-prototype.html`
- Technical source of truth: Project Specification Plan is not present in the repo yet.

## Global Invariants
- Spec text is verbatim. Menu copy, prices, brand hex tokens, URLs, and field names are copied character-for-character from approved prototypes and the Project Specification Plan.
- Minimal solution. Build only what the step asks.
- Disk is shared state. Each step reads the named files first, updates `PROJECT_STATE.md` and `LAST_SESSION.md`, then prints a HANDOFF block.
- Git safety. Before modifying existing files, commit current state with the given message.
- No tables. Do not create table IDs, table routes, `?table=` query parameters, a Table data model, per-table QR logic, or persisted QR code database entities. The single QR code encodes one fixed menu URL.
- Cart is client-only. Payment is inert. The Pay button reveals the calm online payment coming soon notice and performs no transaction, no network request, and no navigation.

## Debug Sweep Template
DEBUG SWEEP — after Step [N]    EXECUTOR: CODEX    EFFORT: medium    MODE: VERIFY
READ FIRST: LAST_SESSION.md, PROJECT_STATE.md, the files created/modified in Step [N].
DO: run each Definition-of-Done command for Step [N]; report exit codes; for any non-zero,
    find root cause, apply the minimal fix, re-run. Do NOT add features, refactor for style,
    weaken types/tests, or add dependencies. Stop when all DoD commands exit 0, or after 3
    failed attempts → emit ESCALATE.
OUTPUT: update LAST_SESSION.md (sweep result: clean | fixed [what] | escalated; files touched). Print HANDOFF.

## Current Repo State
- Repository remote: `https://github.com/7mdz9/Solea_.git`
- Branch: `main`
- Approved prototype files are stored under `reference/`.
- Next.js App Router project is initialized in the repo root.
- Project name: `solea`
- TypeScript strict mode is enabled in `tsconfig.json`.
- Build scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run format`.
- Tailwind CSS is configured through `postcss.config.mjs` and imported in `src/app/globals.css`.
- `next/font` is configured in `src/app/layout.tsx` for DM Serif Display and Manrope.
- Brand CSS tokens are stored in `styles/tokens.css` with approved hex tokens preserved verbatim.
- Tailwind brand colors and font families are mapped in `tailwind.config.ts` and `styles/tokens.css`.
- Accent discipline: Lemon Rind = admin (QR) screen; Terracotta = menu screen (item numbers + Add to cart).
- Root layout/global baseline applies Manrope, Porcelain surface, subtle warm background wash, global text rendering, and `prefers-reduced-motion` handling in `src/app/globals.css`.
- `qrcode` and `jspdf` imports are checked in `src/lib/vendor-smoke.ts`.
- Menu types are defined in `types/menu.ts`.
- Menu content is stored in `data/menu.ts`; prices are AED placeholders in whole AED and production stores integer minor units.
- Menu access goes through `lib/menu-repository.ts`; pages must use the repository rather than importing `data/menu.ts` directly.
- Vitest + React Testing Library are configured in `vitest.config.ts` and `vitest.setup.ts`.
- Playwright is configured in `playwright.config.ts` with a request-only smoke test in `e2e/home.spec.ts`.
- Prettier is configured with `.prettierrc.json`; verbatim reference HTML, token CSS, bridge state files, and generated test output are ignored by `.prettierignore`.

## Step Completion Snapshot
- Step 1 reflected: Next.js App Router + TypeScript project named `solea`, strict mode enabled, blank root page, approved prototypes in `reference/`, bridge state files present.
- Step 2 reflected: Tailwind CSS, `next/font`, `qrcode`, `jspdf`, Vitest + React Testing Library, Playwright, and Prettier are installed and configured.
- Step 3 reflected: approved brand tokens are encoded in `styles/tokens.css`, mapped into Tailwind, and fonts are loaded through `next/font`.
- Step 4 reflected: root layout/global baseline applies the Porcelain surface, subtle warm background wash, Manrope typography baseline, and `prefers-reduced-motion` handling.
- Step 5 reflected: menu types, verbatim menu content/prices, and repository access are in place with a unit test covering 2 categories and 8 items.

## Key File Map
- App routes: `src/app/layout.tsx`, `src/app/page.tsx`
- Global styles: `src/app/globals.css`
- Brand tokens: `styles/tokens.css`, `tailwind.config.ts`
- Menu source: `types/menu.ts`, `data/menu.ts`, `lib/menu-repository.ts`
- Tooling config: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `.prettierrc.json`, `.prettierignore`
- Tests and probes: `src/app/page.test.tsx`, `src/lib/vendor-smoke.ts`, `lib/menu-repository.test.ts`, `e2e/home.spec.ts`
- Approved prototypes: `reference/solea-menu-prototype.html`, `reference/solea-qr-generator-prototype.html`
- Bridge state: `PROJECT_STATE.md`, `LAST_SESSION.md`

## Latest Verification
- Steps 1-5 are reflected in this file.
- No table logic found in app source/config: no table IDs, table routes, `?table=` query parameter, Table data model, or per-table QR logic.
- No payment SDK, checkout, charge flow, DB, Prisma, or Supabase package is installed or referenced in app source/config.
- `npm run build` exit 0 and `npm run typecheck` exit 0.
- Step 5 menu repository test: `npm test` exit 0.
