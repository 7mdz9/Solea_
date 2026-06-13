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
- Build scripts: `npm run dev`, `npm run build`, `npm run typecheck`.
