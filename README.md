# ClaimReady

Turn a new insurance policy into a plain-English **claim-readiness checklist** you can finish this week — so a future claim is actually provable.

Built because a real camera-lens claim got denied: a working lens, a two-week-old policy, and no dated proof it broke while covered. Every checklist item is a failure mode someone actually hit.

## What it is (v1)
A single self-contained web page (`index.html`) — no build, no backend, no accounts, nothing leaves the browser.
- Pick a coverage type: **scheduled valuables, renters/home, auto, travel**.
- Get a tailored checklist where every item explains **why it matters at claim time**.
- Check items off — progress saves in `localStorage`.
- Print / save as PDF to keep.

## Run it
Open `index.html` in any browser. That's it.

## Deploy it
Any static host. Examples:
- **Vercel:** drop the folder in, or `vercel` (it's a static site, no config).
- **Netlify / GitHub Pages / Cloudflare Pages:** point at this folder.

## Roadmap (see DESIGN.md)
1. Doc vault with server-stamped upload dates (fixes the wrong-device-clock problem for real).
2. A claim-readiness score you can revisit.
3. Pre-trip / pre-risk reminders.
4. B2B2C: agents co-brand and hand it to clients at policy binding.

## Design
Product thinking + build sprint in `DESIGN.md` (office-hours reframe → CEO/design/eng review). MIT-spirited, fork-friendly.

_Educational, not legal or insurance advice. Always read your own policy._
