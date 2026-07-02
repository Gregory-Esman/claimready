# ClaimReady — PRODUCT.md

**One line:** Turn a new insurance policy into a plain-English claim-readiness checklist you can finish this week, so a future claim is actually provable.

**Register:** brand + product hybrid. The page is a marketing landing (hero, "why", footer — design communicates) wrapped around an embedded tool (the tabbed checklist — design serves the task). Polish the chrome to brand rules, the tool to product rules.

**Audience:** someone who just added coverage for high-value, claim-prone gear — cameras, lenses, drones, gimbals, instruments, jewelry, e-bikes. High intent, big documentation gap. Born from a real denied camera-lens claim (working lens, two-week-old policy, no dated proof it broke while covered).

**Core value:** teach the failure modes that decide payouts *before* the loss — dated proof of ownership, condition, and (the crux) proof the item actually *worked* inside the coverage window; the accidental-vs-wear/mechanical line; claim-clock duties.

**Voice:** plain, direct, a little blunt ("the stuff insurers won't tell you upfront"). Accurate over alarmist — items are framed as real requirements vs. genuine claim-strengtheners, never busywork. No AI vocabulary. Educational, not legal/insurance advice.

## Design system (committed — identity-preservation wins)
- **Color:** navy `--brand:#12447a` / `--brand-2:#1e6fd0` (primary), amber `--amber:#e08a1e` (accent; text uses the darker `--amber-ink:#985f0e` for WCAG AA), green `--good:#1f9d63` (progress/success; text uses `--good-ink:#137a49`). Body on `--bg:#f7f9fc`. Ink ramp `--ink` / `--ink-2` / `--mut:#586a7d`.
- **Type:** system sans stack, weight/size contrast only (no font pairing). `text-wrap:balance` on headings, `pretty` on prose.
- **Motion:** restrained. `--ease:cubic-bezier(.22,1,.36,1)` (ease-out) for hovers/tabs; progress fill animates width (gradient must stay anchored). Full `prefers-reduced-motion` fallback.
- **Stack:** single self-contained `index.html`, vanilla HTML/CSS/JS, zero deps, zero build. localStorage only; nothing leaves the browser (privacy is the pitch). `privacy.html` + `terms.html` are standalone pages in the same system.

## Known intentional detector waivers
- `layout-transition` on `.progfill` — a gradient progress fill; width animation keeps the gradient anchored to the full track (scaleX would compress it). Thin 9px bar, negligible paint.
- `dark-glow` on `.waitlist` — ordinary low-alpha elevation shadow on the intentionally-navy early-access card, not a neon glow.

## Roadmap
See DESIGN.md — free checklist (v1, live) → paid AI asset vault (video-scan onboarding + point-of-purchase capture → one-tap claim packet).
