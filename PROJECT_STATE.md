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
- `/menu` renders a branded empty state if the menu source has no items.
- Admin QR page is implemented at `src/app/admin/qr/page.tsx`; it reads `MENU_URL` server-side and serves the production menu address as read-only.
- Admin QR components are stored in `src/components/admin/` and generate a single bare QR client-side with `qrcode`.
- Admin QR URL input is validated outside production and QR/PDF generation failures return quiet feedback.
- Admin QR export uses `jspdf` to download 12 repeated copies of the single menu QR on one A4 sheet with faint cut guides.
- Production `/admin/*` routes are protected by Basic Auth middleware using `ADMIN_PASSWORD` from the environment.
- Public routes `/` and `/menu` remain outside the admin gate.
- Branded not-found page is implemented at `src/app/not-found.tsx`.
- Future commerce placeholders are types only in `types/commerce.ts`.
- `src/app/api/README.md` reserves `/api/orders` and `/api/payments` as unbuilt; no API route handlers are present.
- Vitest + React Testing Library are configured in `vitest.config.ts` and `vitest.setup.ts`.
- Playwright is configured in `playwright.config.ts` and runs production-mode E2E coverage in `e2e/solea.spec.ts`.
- Production hardening is configured in `next.config.ts` with baseline security headers.
- `.env.example` documents `MENU_URL`, `ADMIN_PASSWORD`, and `NODE_ENV` placeholders only.
- Deployment and domain handoff documentation is stored in `README.md`.
- Prettier is configured with `.prettierrc.json`; verbatim reference HTML, token CSS, bridge state files, and generated test output are ignored by `.prettierignore`.

## Step Completion Snapshot
- Step 1 reflected: Next.js App Router + TypeScript project named `solea`, strict mode enabled, blank root page, approved prototypes in `reference/`, bridge state files present.
- Step 2 reflected: Tailwind CSS, `next/font`, `qrcode`, `jspdf`, Vitest + React Testing Library, Playwright, and Prettier are installed and configured.
- Step 3 reflected: approved brand tokens are encoded in `styles/tokens.css`, mapped into Tailwind, and fonts are loaded through `next/font`.
- Step 4 reflected: root layout/global baseline applies the Porcelain surface, subtle warm background wash, Manrope typography baseline, and `prefers-reduced-motion` handling.
- Step 5 reflected: menu types, verbatim menu content/prices, and repository access are in place with a unit test covering 2 categories and 8 items.
- Step 6 reflected: `/menu` renders the public menu page from `getMenu()` without cart/payment controls, and `/` redirects to `/menu`.
- Step 7 reflected: `/menu` includes the client-only cart, sticky order bar, cart drawer, item steppers, Remove controls, subtotal math, and inert Pay button.
- Step 8 reflected: `/admin/qr` renders the Solea Menu QR Studio with menu-address controls, Generate, Clear, empty/feedback states, and a bare QR preview.
- Step 9 reflected: `/admin/qr` supports Export PDF and Print for a clean 12-copy QR sheet; `/menu` print hides cart chrome.
- Step 10 reflected: production `/admin/*` uses a lightweight Basic Auth gate scoped by middleware; public menu routes remain open.
- Step 11 reflected: future Order, OrderItem, and Payment types exist without logic; the API namespace is reserved by README only.
- Step 12 reflected: validation and quiet error handling are in place for admin QR, empty menu, empty cart, cart quantity bounds, and not-found.
- Step 13 reflected: automated unit, component, and E2E tests cover menu data, cart logic, menu/cart/admin components, inert Pay behavior, public routing, admin gate, and QR PDF export.
- Step 14 reflected: production env documentation, baseline security headers, production read-only `MENU_URL` QR behavior, and non-hardcoded E2E admin password handling are in place.
- Step 15 reflected: README deployment and domain handoff docs cover build/start, env vars, Vercel deploy, apex domain connection, existing-site branch, menu edits, and QR to menu verification.

## Key File Map
- App routes: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/menu/page.tsx`, `src/app/admin/qr/page.tsx`, `src/app/not-found.tsx`, `src/middleware.ts`
- Menu components: `src/components/menu/Masthead.tsx`, `src/components/menu/MenuClient.tsx`, `src/components/menu/MenuSection.tsx`, `src/components/menu/MenuItem.tsx`, `src/components/menu/MenuFooter.tsx`, `src/components/menu/money.ts`, `src/components/menu/menu.module.css`
- Cart components: `src/components/cart/AddToCart.tsx`, `src/components/cart/QtyStepper.tsx`, `src/components/cart/CartBar.tsx`, `src/components/cart/CartDrawer.tsx`, `src/components/cart/PayButton.tsx`, `src/components/cart/cart.module.css`
- Admin QR components: `src/components/admin/QrStudio.tsx`, `src/components/admin/QrStudioHeader.tsx`, `src/components/admin/QrControls.tsx`, `src/components/admin/QrCard.tsx`, `src/components/admin/QrActions.tsx`, `src/components/admin/useQrCodes.ts`, `src/components/admin/admin-qr.module.css`
- Global styles: `src/app/globals.css`
- Brand tokens: `styles/tokens.css`, `tailwind.config.ts`
- Menu source: `types/menu.ts`, `types/commerce.ts`, `data/menu.ts`, `lib/menu-repository.ts`, `lib/use-cart.ts`
- Reserved API namespace: `src/app/api/README.md`
- Tooling config: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`, `playwright.config.ts`, `.prettierrc.json`, `.prettierignore`, `.env.example`
- Deployment docs: `README.md`
- Tests and probes: `src/app/page.test.tsx`, `src/lib/vendor-smoke.ts`, `lib/menu-repository.test.ts`, `lib/use-cart.test.tsx`, `src/components/menu/MenuClient.test.tsx`, `src/components/menu/MenuItem.test.tsx`, `src/components/cart/AddToCart.test.tsx`, `src/components/cart/CartDrawer.test.tsx`, `src/components/cart/PayButton.test.tsx`, `src/components/admin/QrStudio.test.tsx`, `e2e/solea.spec.ts`
- Approved prototypes: `reference/solea-menu-prototype.html`, `reference/solea-qr-generator-prototype.html`
- Bridge state: `PROJECT_STATE.md`, `LAST_SESSION.md`

## Latest Verification
- Steps 1-15 are reflected in this file.
- No table logic found in app source/config: no table IDs, table routes, `?table=` query parameter, Table data model, or per-table QR logic.
- No payment SDK, payment route, checkout/charge flow, DB, Prisma, or Supabase package is installed or referenced in app source/config.
- Verification + State Refresh: current no-table grep exit 1 with no matches; current no-payment-gateway grep exit 1 with no matches.
- Public menu page verification: `/menu` renders masthead, SAVORY and SWEET sections, all 8 items with prices/descriptions, empty control mount points, two columns at desktop width, one column at mobile width, and Terracotta item numbers. `/` redirects to `/menu`.
- Step 7 browser verification: adding items updates the sticky order bar and subtotal; item and drawer steppers work; decrementing to zero removes an item; Remove works; drawer opens/closes by View order, Escape, and overlay; mobile drawer fills the viewport; Pay reveals the online payment coming soon notice with no URL change and no network request.
- Step 8 browser verification: production `/admin/qr` serves the menu-address field read-only with `https://soleauae.com/menu`; Generate renders one bare QR image on a white tile with no card text/label/URL; Clear empties the preview; the Lemon Rind header tick renders correctly.
- Step 9 browser verification: Export PDF downloads `solea-qr-codes.pdf` containing repeated QR copies; admin print media hides chrome and shows 12 clean QR cells; menu print media hides the cart bar, drawer, and overlay.
- Step 10 browser verification: production `/` and `/menu` load without credentials; `/admin/qr` returns 401 without credentials or with a wrong password; `/admin/qr` loads with valid Basic Auth credentials.
- Step 11 verification: `types/commerce.ts` typechecks; production `/api/orders` and `/api/payments` return 404; no API route handlers were added.
- Step 12 verification: non-production admin QR rejects invalid URLs with in-voice feedback; empty menu and empty cart states render without crashing; cart quantities do not go negative; branded not-found page renders.
- Step 13 verification: `npm test` runs 9 Vitest files / 12 tests; `npm run test:e2e` runs 3 Playwright tests against production `next start`.
- Step 13 E2E coverage: `/` redirects to `/menu`; `/menu` renders both sections and all priced items; cart count/subtotal/drawer adjustment/Pay inertness pass; `/admin/qr` is blocked without credentials and PDF export downloads with credentials.
- Verification + State Refresh: production browser check confirmed `/` and `/menu` are public, `/admin/qr` is gated, `/api/orders` is not reachable as an implemented API route, cart interactions do not trigger unexpected requests, and Pay is inert.
- Verification + State Refresh: accent discipline confirmed; Terracotta appears on menu/cart controls and Lemon Rind appears on the admin QR tick.
- `npm run build` exit 0, `npm run typecheck` exit 0, and `npm run lint` exit 0.
- Step 5 menu repository test: `npm test` exit 0.
- Step 7 invariant grep: `rg -n "stripe|checkout|/api/payments|charge\(" src\app src\components lib` exit 1 with no matches.
- Step 8 invariant scan: `rg -n "table|\?table|Table|stripe|/api/payments|charge\(" src\app src\components lib data types` exit 1 with no matches.
- Step 10 env grep: `rg -n "ADMIN_PASSWORD" src\app src\components lib` exit 1 with no matches; `src/middleware.ts` reads `process.env.ADMIN_PASSWORD`.
- Step 11 grep: `rg -n "checkout|stripe|payment intent|charge\(" src\app` exit 1 with no matches.
- Step 12 tests: `npm test` exit 0 with cart edge-case and empty-menu coverage.
- Step 13 DoD: `npm test` exit 0; `npm run test:e2e` exit 0.
- Step 14 DoD: `npm run build` exit 0; `npm run typecheck` exit 0; `npm run lint` exit 0; `npm test` exit 0.
- Step 14 production verification: `next start` with temporary `MENU_URL` and temporary `ADMIN_PASSWORD` confirmed `/menu` status 200, `/admin/qr` status 401 without credentials, `/admin/qr` status 200 with credentials, address field read-only, baseline security headers present, and generated QR pixels match the `MENU_URL` QR matrix.
- Step 14 hardening checks: `.env.example` documents `MENU_URL`, `ADMIN_PASSWORD`, and `NODE_ENV`; no hardcoded secret value was added; Playwright E2E now generates a test-only admin password when one is not supplied.
- Step 14 invariant checks: no-table grep exit 1 with no matches; no-payment-gateway grep only found the existing inert Pay notice copy in tests, with no gateway, Stripe, checkout route, charge flow, or payment SDK code.
- Step 14 E2E regression: `npm run test:e2e` exit 0.
- Step 15 README verification: build/start, env-var table, Vercel deploy steps, apex `soleauae.com` domain connection, existing-site branch, menu-edits-need-a-developer note, and QR to menu checklist are documented.
- Step 15 Debug Sweep DoD: `npm run build` exit 0.

## Spec Compliance
- menu page -> implemented
- cart + inert payment -> implemented; Pay is inert.
- admin QR page -> implemented; single bare QR encodes `MENU_URL` and no table logic is present.
- QR admin + export -> implemented; export/print repeat the single bare menu QR with no labels or URLs on codes.
- admin access gate -> implemented; production `/admin/*` is protected by Basic Auth and public menu routes are not blocked.
- validation + error handling -> implemented; invalid admin URL, empty menu, empty cart, cart quantity bounds, and not-found are covered.
- testing -> implemented; unit, component, and E2E coverage is in place and green.
- production hardening -> implemented; env documentation, baseline security headers, production read-only `MENU_URL` QR encoding, and no hardcoded secret are verified.
- deployment docs -> implemented; README covers deployment, domain handoff, existing-site branch, and QR to menu verification.

## Stubs/Mocks
- future commerce types, not implemented: `Order`, `OrderItem`, and `Payment` in `types/commerce.ts`.
- reserved API namespace, not implemented: `/api/orders` and `/api/payments` noted in `src/app/api/README.md`.
