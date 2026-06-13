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
- Public menu page is implemented at `src/app/menu/page.tsx` using `getMenu()`.
- Root route redirects to `/menu` from `src/app/page.tsx`.
- Menu UI components are stored in `src/components/menu/`.
- Client-only cart state is implemented in `lib/use-cart.ts`.
- Cart UI components are stored in `src/components/cart/`.
- `/menu` mounts the cart through `src/components/menu/MenuClient.tsx`; Pay is inert and only reveals the online payment coming soon notice.
- Vitest + React Testing Library are configured in `vitest.config.ts` and `vitest.setup.ts`.
- Playwright is configured in `playwright.config.ts` with a request-only smoke test in `e2e/home.spec.ts`.
- Prettier is configured with `.prettierrc.json`; verbatim reference HTML, token CSS, bridge state files, and generated test output are ignored by `.prettierignore`.

## Step Completion Snapshot
- Step 1 reflected: Next.js App Router + TypeScript project named `solea`, strict mode enabled, blank root page, approved prototypes in `reference/`, bridge state files present.
- Step 2 reflected: Tailwind CSS, `next/font`, `qrcode`, `jspdf`, Vitest + React Testing Library, Playwright, and Prettier are installed and configured.
- Step 3 reflected: approved brand tokens are encoded in `styles/tokens.css`, mapped into Tailwind, and fonts are loaded through `next/font`.
- Step 4 reflected: root layout/global baseline applies the Porcelain surface, subtle warm background wash, Manrope typography baseline, and `prefers-reduced-motion` handling.
- Step 5 reflected: menu types, verbatim menu content/prices, and repository access are in place with a unit test covering 2 categories and 8 items.
- Step 6 reflected: `/menu` renders the public menu page from `getMenu()` without cart/payment controls, and `/` redirects to `/menu`.
- Step 7 reflected: `/menu` includes the client-only cart, sticky order bar, cart drawer, item steppers, Remove controls, subtotal math, and inert Pay button.

## Key File Map
- App routes: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/menu/page.tsx`
- Menu components: `src/components/menu/Masthead.tsx`, `src/components/menu/MenuClient.tsx`, `src/components/menu/MenuSection.tsx`, `src/components/menu/MenuItem.tsx`, `src/components/menu/MenuFooter.tsx`, `src/components/menu/money.ts`, `src/components/menu/menu.module.css`
- Cart components: `src/components/cart/AddToCart.tsx`, `src/components/cart/QtyStepper.tsx`, `src/components/cart/CartBar.tsx`, `src/components/cart/CartDrawer.tsx`, `src/components/cart/PayButton.tsx`, `src/components/cart/cart.module.css`
- Global styles: `src/app/globals.css`
- Brand tokens: `styles/tokens.css`, `tailwind.config.ts`
- Menu source: `types/menu.ts`, `data/menu.ts`, `lib/menu-repository.ts`, `lib/use-cart.ts`
- Tooling config: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `.prettierrc.json`, `.prettierignore`
- Tests and probes: `src/app/page.test.tsx`, `src/lib/vendor-smoke.ts`, `lib/menu-repository.test.ts`, `e2e/home.spec.ts`
- Approved prototypes: `reference/solea-menu-prototype.html`, `reference/solea-qr-generator-prototype.html`
- Bridge state: `PROJECT_STATE.md`, `LAST_SESSION.md`

## Latest Verification
- Steps 1-7 are reflected in this file.
- No table logic found in app source/config: no table IDs, table routes, `?table=` query parameter, Table data model, or per-table QR logic.
- No payment SDK, payment route, checkout/charge flow, DB, Prisma, or Supabase package is installed or referenced in app source/config.
- Public menu page verification: `/menu` renders masthead, SAVORY and SWEET sections, all 8 items with prices/descriptions, empty control mount points, two columns at desktop width, one column at mobile width, and Terracotta item numbers. `/` redirects to `/menu`.
- Step 7 browser verification: adding items updates the sticky order bar and subtotal; item and drawer steppers work; decrementing to zero removes an item; Remove works; drawer opens/closes by View order, Escape, and overlay; mobile drawer fills the viewport; Pay reveals the online payment coming soon notice with no URL change and no network request.
- `npm run build` exit 0, `npm run typecheck` exit 0, and `npm run lint` exit 0.
- Step 5 menu repository test: `npm test` exit 0.
- Step 7 invariant grep: `rg -n "stripe|checkout|/api/payments|charge\(" src\app src\components lib` exit 1 with no matches.

## Spec Compliance
- menu page -> implemented
- cart + inert payment -> implemented; Pay is inert.
