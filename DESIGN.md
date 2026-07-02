# ClaimReady — Design Doc

> gstack sprint, piloted autonomously. `/office-hours` (reframe) → `/autoplan` (CEO + design + eng review) → build. Every forcing question answered by the pilot, not the user.

## The request (as given)
"A service that coaches people through what they need to know when they open an insurance policy — so we fix the backward BS where you only learn the rules after you've already lost."

## /office-hours — the reframe

**You said "coaching service." What you're actually building is a *claim-readiness* tool.** Coaching is the means; the value is provable evidence at claim time. The insight that generated this whole idea (lived, this session): a real camera-lens claim collapsed not because the loss wasn't real, but because there was **no dated proof it was working inside the coverage window** — wrong camera clock, no baseline photos, an uninsured-flight timing gap. Coaching that doesn't end in *stored, timestamped proof* just moves the same failure one step later.

### Six forcing questions (piloted)

1. **Demand reality.** The pain is real but *latent* — people feel it at **claim time**, not at policy start. That's the core challenge: nobody wakes up wanting insurance homework. So the wedge must (a) manufacture urgency at policy start, or (b) intercept people right after a denied claim (high intent). Honest read: cold "learn about your policy" demand is weak; **"you just scheduled $8k of camera gear — here's how to not get denied"** demand is strong.

2. **Status quo.** Today = nothing. Insurers bury it in the policy booklet (legally disclosed, functionally unread). Agents sell and service, they don't coach claim-prep (misaligned incentive — easier claims hurt loss ratios). People wing it and Google after a denial. Status quo is "learn the hard way."

3. **Desperate specificity.** The most desperate user isn't "everyone with insurance." It's someone who **just added scheduled/valuable-items coverage** — cameras, jewelry, instruments, e-bikes, watches. High value, claim-prone, and the documentation gap is enormous (proof of ownership, serials, dated proof-of-working, covered-window timing). This is a knife-edge wedge, and it's exactly the archetype we just watched fail.

4. **Narrowest wedge.** NOT "coach all insurance for everyone." v1 = **a free web tool that turns a coverage type into a tailored claim-readiness checklist**, with the two failure-killers built in: (1) capture dated baseline proof, (2) understand the covered-window / accident-vs-wear rules that actually decide payouts. Ship the checklist tomorrow, learn from real usage.

5. **Observation.** Directly observed (this session): the repeatable failure modes are concrete — no baseline "it works" photo, unreliable timestamps (wrong device clock), coverage-timing gaps (uninsured transit), unread dec page, confusion between accidental damage (covered) and wear/mechanical (excluded), and the concealment trap. These are teachable, checklist-able, and preventable **at policy start**.

6. **Future-fit.** Wedge (free checklist + why-it-matters) → **claim-readiness score** → pre-trip / pre-risk reminders → a documentation vault with server-stamped timestamps (kills the wrong-clock problem) → B2B2C: agents hand it to clients at binding as a value-add → optional paid "claim concierge." The wedge earns the right to the rest.

**Design-doc gate honored: no code in office-hours. This doc is the artifact.**

## /autoplan — CEO review (find the 10-star, then cut to shippable)

- **10-star** = a proactive system that knows your policy, tells you exactly what to document, stores it with tamper-resistant timestamps, nudges you before risky events, and at claim time hands you a ready dossier.
- **Mode: Selective Expansion → Hold Scope for v1.** The 10-star is a 3-month build. The narrowest wedge that still delivers the core value *tomorrow*: a **client-side checklist generator + education**, no accounts, no backend. It teaches the exact things that would have saved the lens claim.
- **Cut for v1 (named, not hidden):** accounts, the doc vault/upload, reminders, claim-readiness scoring persistence, B2B agent portal. All post-v1. Silent-cut avoidance: these are *deferred*, logged here.

## /autoplan — design review (anti-slop)

- One page, opinionated, fast. No dashboard cosplay, no lorem, no stock-photo hero. Concrete copy grounded in real failure modes.
- Interaction: pick coverage → get a specific, checkable list with a one-line "why this matters at claim time" on each item. Progress + a readiness read-out. Print/save so it's usable off-screen.
- Voice: plain, direct, a little blunt ("insurers won't tell you this"). No AI vocabulary.

## /autoplan — eng review (architecture, edge cases, tests)

- **Stack:** single self-contained `index.html` — vanilla HTML/CSS/JS, zero dependencies, zero build. Deploy to any static host (Vercel/Netlify/GitHub Pages). Keeps v1 shippable and forkable.
- **Data:** checklist content is a small in-file JS object keyed by coverage type. Adding a coverage type = adding an object entry.
- **State:** checkbox state persists in `localStorage` so a refresh doesn't wipe progress. No PII leaves the browser (privacy = the whole point).
- **Edge cases:** no-JS fallback (content still readable); localStorage disabled (degrade gracefully, no crash); print stylesheet; mobile-first responsive.
- **Tests (post-v1 /ship):** DOM smoke test that each coverage type renders its items; localStorage round-trip; print CSS present.
- **v1 coverage types:** Scheduled valuables (cameras/jewelry/instruments/bikes) [primary wedge], Renters/Home contents, Auto, Travel. Others deferred.

## v1 definition of done
A deployable one-page site: a landing that names the "backward" problem, an interactive claim-readiness checklist generator for 4 coverage types with per-item "why it matters," persistent progress, and print/save. No backend, no accounts, no tracking.

## Roadmap (post-v1)
1. Doc vault with server-stamped upload dates (fixes the wrong-clock problem for real).
2. Claim-readiness score you can revisit.
3. Pre-trip / pre-risk reminders.
4. B2B2C: agents co-brand and hand it to clients at policy binding.

## The paid product — an AI asset vault (the business behind the free tool)

The free web tool teaches you *what* to document. The paid app *does the documenting and keeps it forever*. The free tool manufactures the awareness; the app resolves the anxiety. That's the upsell path.

**Scope discipline:** high-value / claim-prone items (cameras, jewelry, bikes, tools, instruments, electronics), NOT "photograph every grocery receipt." Same desperate-specificity user as the free tool. Keep it a knife, not a firehose.

### Two capture modes (together they're the whole loop)
- **Video-scan onboarding (seed the vault fast).** Shoot one walkthrough — the house, the camera bag, the toolbox — and the app extracts individual frames, identifies each item, reads model/serial numbers where legible (OCR), and researches current replacement values online. Output: a structured, valued, timestamped inventory (name · model · serial · est. replacement · photo). This is the "wow" demo and it ties straight to the free tool's very first renters item ("do a room-by-room video walkthrough"). *Free teaser: scan one room / one bag free; pay to do the whole house and keep it.*
- **Point-of-purchase capture (keep it current).** Each new high-value buy: snap the receipt + item, auto-added to the vault. Anchored to an existing habit (buying), so it sticks. Unlock is auto-intake: connect email → auto-pull e-receipts and OCR item/price/date/merchant/serial, so manual photo is the exception.

### The killer output
**One-tap "generate claim packet"** — export a dossier for an item or a whole category (photos + receipt + serial + server timestamp), ready to hand an adjuster. This is the thing that would have *won* the lens claim.

### Moat & model
- **Moat:** the accumulating, valued, timestamped personal inventory. Switching cost compounds monthly.
- **Model:** consumer subscription (peace-of-mind + storage; compute cost of vision+lookups justifies it). Sleeper channel = **B2B2C**: insurer/agent hands it to policyholders at binding — better docs = cleaner, faster, lower-fraud claims + a retention hook; also solves distribution.

### Honest edges (design around, don't oversell)
- **Serials usually aren't in a walkthrough** (they're on the bottom/back). Video gets existence + condition + model; serials/receipts still need deliberate close-ups. Real flow = "AI drafts 80%, you confirm and fill the gaps."
- **Replacement values are estimates, not appraisals.** Great as a gap-finder ("am I underinsured?") and a claim starting point; scheduled high-value items still need a receipt/appraisal.
- **Timestamp credibility:** server upload date beats a wrong camera clock but isn't notarized. Hash each entry and anchor it (tamper-evident log) to make it claim-grade — strengthens the position, doesn't guarantee acceptance.
- **Trust flips hard.** v1 = "nothing leaves your browser." The app is a cloud vault of receipts, video of your home, and PII — the opposite posture. Encryption, breach exposure, and a much heavier privacy policy are table stakes the moment you cross that line.
