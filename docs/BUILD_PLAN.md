# Vitaloop Website — Build Plan for Claude Code

Oct 6, 2026 · @Grace Eloho

## Context

Claude Code builds the Vitaloop marketing site in six phases, stopping for review after each; the [Vitaloop Website PRD](docs/PRD.md) is the source of truth for pages, requirements and claims.

Vitaloop is a B2B2C preventive-health platform: a wrist wearable that detects cardiac and sleep signals, and Robota, a home robot that gives daily check-ins and responds in emergencies. The site serves partners (insurers, employers, senior living, health systems) and the individuals they provide it to.

**How to use this plan**

1. `docs/PRD.md` and `docs/BUILD_PLAN.md` hold the source of truth in the repo.
2. The rules in "Content and claims rules" live in `CLAUDE.md` at the repo root so Claude Code reads them every session.
3. Run one phase at a time with the prompts at the end. Review, commit, then move on.
4. Start each phase in plan mode so Claude Code proposes its approach before writing code.

## Stack and project setup

Next.js with Tailwind, GSAP and React Three Fiber is the strongest stack for a premium, animation-led product site: it is what most award-level product pages use, and it keeps SEO, CMS and performance intact.

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js (App Router, latest stable), TypeScript | Server rendering for SEO, static pages for speed, best ecosystem for React 3D and animation |
| Styling | Tailwind CSS v4 with design tokens as CSS variables | Precise control over spacing and type; tokens keep the premium look consistent |
| Components | Radix UI primitives, custom-styled (no stock UI kit look) | Accessible behaviour without a generic template feel |
| Scroll storytelling | GSAP with ScrollTrigger and SplitText (free since 2025) | Industry standard for pinned, scrubbed, timeline-based scroll animation |
| Smooth scroll | Lenis | Smooth, inertial scrolling that syncs with ScrollTrigger |
| UI motion | Motion (formerly Framer Motion) | Micro-interactions, hover states, page and layout transitions |
| 3D product scenes | React Three Fiber + drei, GLB models, Draco/KTX2 compression | Real-time wearable and Robota that rotate and react to scroll |
| Illustrated motion | Rive (optional) | Lightweight interactive animations for How it works and UI states |
| Typography | A premium variable typeface (licensed, e.g. a grotesk display face) with a clean text face | Type carries most of the premium feel |
| CMS | Sanity | Editable copy, FAQ and partner pages; drafts and review workflow |
| Forms | Next.js route handlers, Zod validation, Turnstile spam protection | Demo and waitlist forms without a third-party form tool |
| CRM and email | HubSpot (or your CRM) via API | Demo leads to sales, waitlist double opt-in |
| Analytics | Plausible or PostHog, consent-gated | Events from PRD F8 |
| Hosting | Vercel | Preview deploys per branch for content and motion review |
| Testing | Playwright, axe-core, Lighthouse CI | Flows, accessibility and performance checks |

**Before Phase 1, have ready:** logo and brand colors (or a request for placeholders), product renders and 3D models (GLB, or CAD to convert) of the wearable and Robota, a licensed typeface, CMS and CRM accounts, and a domain.

> Status as of Phase 1 kickoff: none of the above assets exist yet. Phase 1 proceeds with clearly-marked placeholders (neutral palette + one accent, system font stack, a primitive mesh standing in for the wearable) so foundational work isn't blocked on brand/asset delivery.

## Design and motion direction

Premium here means restraint: few elements, large type, generous space, and motion that explains the product rather than decorates it.

**Visual principles**

- Product is the hero. Full-bleed, studio-lit 3D of the wearable and Robota; no stock photography in the first two scrolls.
- Large display type with tight tracking, one accent color, mostly neutral palette; dark hero sections that transition into light content sections.
- Generous whitespace and a strict 12-column grid; nothing crowded, no more than one idea per screen.
- Fine detail: hairline borders, soft depth, subtle grain or gradient lighting, crisp icons drawn for this brand.
- Reference bar: Apple product pages, Oura, Whoop and Linear for pacing, polish and type.

**Signature motion moments**

| Section | Moment | Technique |
| --- | --- | --- |
| Hero | Wearable rotates into view, a pulse line traces across it, then Robota glides in beside it | R3F scene + GSAP timeline |
| The Wearable | Pinned section: the device turns as sensors highlight one by one (ECG, HRV, sleep, SpO2, temperature) with live-style readouts | ScrollTrigger pin + scrub, R3F camera moves |
| Robota | Morning check-in plays as a short scene, then shifts to emergency mode: alert, call, AED retrieval | ScrollTrigger timeline, Rive or video for the sequence |
| Headlines | Lines reveal word by word as they enter | SplitText + ScrollTrigger |
| Features | Cards lift and tilt subtly on hover; staggered entry | Motion |
| How it works | Four steps light up along one connecting line as you scroll | ScrollTrigger scrub, SVG path drawing |
| Page transitions | Short fade-and-rise between routes | Motion layout transitions |

**Motion rules**

- Easing is soft and consistent (one custom ease curve); durations 300–800ms for UI, scroll-scrubbed for storytelling.
- Motion always explains something: the product, a sequence, a state. No animation for its own sake.
- Hold 60fps on a mid-range phone. Lazy-load 3D after first paint; show a still poster frame instead of a blank canvas.
- On low-power devices and small screens, swap live 3D for pre-rendered video or image sequences.
- prefers-reduced-motion turns all scroll scenes into static, fully readable layouts.

## Repo structure and conventions

One route per PRD page, homepage sections as separate components, and all copy pulled from the CMS rather than hard-coded.

```
vitaloop-web/
├─ CLAUDE.md                 # rules Claude Code reads every session
├─ docs/PRD.md, docs/BUILD_PLAN.md
├─ app/
│  ├─ page.tsx               # homepage
│  ├─ wearable/  robota/  how-it-works/  safety/  activate/
│  ├─ partners/              # hub + [type]/ (insurers, employers, senior-living, health-systems)
│  ├─ partners/integration/  demo/
│  ├─ faq/  about/  privacy/  terms/
│  └─ api/demo/  api/waitlist/
├─ components/
│  ├─ ui/                    # Button, Card, Accordion, Tabs, Form fields
│  ├─ home/                  # Hero, Wearable, Robota, Features, HowItWorks, Partners, FAQ
│  └─ layout/                # Header, Footer, ConsentBanner
├─ lib/                      # cms client, analytics, crm, validation
├─ sanity/schemas/           # page, faq, partnerType, feature, settings
├─ styles/tokens.css
└─ tests/                    # Playwright + axe
```

**Conventions**

- Components are typed, small and accept content as props; no copy strings inside components.
- Every image has meaningful alt text from the CMS; decorative images use empty alt.
- One commit per task with a clear message; one branch per phase.
- Analytics calls go through `lib/analytics.ts` only, so consent is enforced in one place.

## Build phases

Six phases, each ending with a checkpoint you review on a Vercel preview before the next one starts.

1. **Foundation**
   - Scaffold Next.js, TypeScript, Tailwind, ESLint, Prettier; push to GitHub; connect Vercel.
   - Create `styles/tokens.css`: colors, type scale (16px minimum body), spacing, radius, shadows, light and dark.
   - Build `ui/` primitives: Button, Card, Accordion, Tabs, Input, Select, Checkbox.
   - Set up the motion foundation: GSAP with ScrollTrigger and SplitText, Lenis synced to ScrollTrigger, Motion, React Three Fiber with a reusable lit product stage, and one shared easing curve. Build Header (with persistent "Request a demo"), Footer (with safety line) and a `/styleguide` page that also demos motion.
   - **Checkpoint:** styleguide renders all components in both themes; keyboard navigation works.
2. **Homepage with placeholder content**
   - Build the eight sections in PRD order: Hero (wearable then Robota), The Wearable, Robota (ends with capability statement), Features grid, How it works (4 steps), For partners, FAQ, Footer.
   - Build the signature motion moments from "Design and motion direction": 3D hero, pinned wearable sensor scene, Robota check-in to emergency sequence, word-by-word headlines, How it works line drawing. Add poster frames, mobile video fallbacks and static reduced-motion layouts.
   - **Checkpoint:** homepage complete on mobile and desktop; animations hold 60fps on a mid-range phone; Lighthouse performance 90+ on mobile.
3. **Remaining pages**
   - Individuals track: Wearable, Robota, How it works, Safety and honesty, Already have Vitaloop?
   - Partner track: hub, one page per partner type, Integration and compliance, Request a demo.
   - Shared: FAQ with audience filter and search, About, Privacy, Terms.
   - **Checkpoint:** every P0 page from the PRD exists and links correctly; no dead links.
4. **CMS**
   - Sanity schemas for pages, homepage sections, FAQ, partner types, features and site settings.
   - Move all copy and images out of components into the CMS; add draft preview.
   - Add a review status field on claims-bearing pages so they cannot publish without approval.
   - **Checkpoint:** a non-developer can edit the hero line and an FAQ answer and see it on preview.
5. **Forms, integrations and analytics**
   - Demo form (PRD F1) and waitlist (F5) with Zod validation, Turnstile, CRM submission and confirmation states.
   - Partner-referred banner via `?partner=` (F3), cookie consent (F9), consent-gated analytics events (F8).
   - SEO: metadata per page, Organization, Product and FAQ structured data, sitemap.xml, robots.txt.
   - **Checkpoint:** a test demo request lands in the CRM; no analytics fire before consent.
6. **QA and launch**
   - Playwright tests for navigation, both forms and FAQ filtering; axe checks on every page.
   - Lighthouse CI on key pages; fix to PRD targets (LCP < 2.5s, CLS < 0.1, INP < 200ms).
   - Claims sweep: search all CMS content for banned phrases.
   - **Checkpoint:** all tests green, legal sign-off recorded, domain connected, launch.

## Content and claims rules

This block is copied verbatim into `CLAUDE.md`; it stops Claude Code from writing copy that breaks the product's capability boundary. See `CLAUDE.md` at the repo root for the authoritative copy Claude Code reads every session.

## Definition of done

The site launches only when every box below is ticked.

- [ ] Every P0 page in the PRD is live and reachable from navigation
- [ ] Homepage sections match the PRD order on mobile and desktop
- [ ] Demo form submits to the CRM and sales is notified; waitlist double opt-in works
- [ ] No analytics or third-party scripts load before consent
- [ ] axe reports zero serious or critical issues on every page
- [ ] Lighthouse mobile: LCP < 2.5s, CLS < 0.1, INP < 200ms on home, wearable, Robota and demo pages, with 3D and scroll scenes at 60fps and working fallbacks on mobile and reduced motion
- [ ] Playwright suite passes for navigation, forms and FAQ filtering
- [ ] Search for [PLACEHOLDER] and [STAT NEEDED] returns nothing
- [ ] Claims sweep finds no banned phrases in the CMS or code
- [ ] Legal and clinical sign-off recorded for claims-bearing pages
- [ ] Metadata, structured data, sitemap.xml and robots.txt in place
- [ ] Domain connected with HTTPS; 404 and error pages styled

## Prompts for each phase

Paste one prompt per phase into Claude Code, approve its plan, then review the checkpoint before the next.

**Phase 1 — Foundation**

```
Read CLAUDE.md, docs/PRD.md and docs/BUILD_PLAN.md. We are starting Phase 1 (Foundation). Propose a plan first. Then scaffold Next.js (App Router) with TypeScript, Tailwind, ESLint and Prettier; create styles/tokens.css with colors, type scale, spacing and radius for light and dark themes; build the ui/ primitives with Radix, custom-styled for a premium look; set up GSAP (ScrollTrigger, SplitText), Lenis, Motion and a React Three Fiber product stage with one shared easing curve; build Header and Footer; and add a /styleguide page showing every component. Stop at the Phase 1 checkpoint and list what I should review.
```

**Phase 2 — Homepage**

```
Phase 2: build the homepage in the exact section order from the PRD, using [PLACEHOLDER] copy and placeholder images. Hero shows the wearable then Robota in sequence. The Robota section must end with the capability statement (detects, alerts, guides). Build every signature motion moment in the "Design and motion direction" section of docs/BUILD_PLAN.md using GSAP ScrollTrigger, SplitText, Lenis, Motion and React Three Fiber. The bar is Apple- and Oura-level polish: smooth, restrained, purposeful. Add poster frames, mobile video fallbacks and reduced-motion layouts, and profile frame rate on a throttled mobile CPU. Plan first, then build, then report Lighthouse mobile scores.
```

**Phase 3 — Remaining pages**

```
Phase 3: build every remaining P0 page from the PRD across the individuals, partner and shared tracks, reusing existing components. Partner type pages use one dynamic route. FAQ needs an audience filter and search. Check for dead links and stop at the checkpoint.
```

**Phase 4 — CMS**

```
Phase 4: set up Sanity. Create schemas for pages, homepage sections, FAQ, partner types, features and site settings. Move all copy and images out of components into the CMS, add draft preview, and add a review status that blocks publishing claims-bearing pages until approved. Show me how to edit the hero line as a non-developer.
```

**Phase 5 — Forms and integrations**

```
Phase 5: build the demo form and waitlist from PRD F1 and F5 with Zod validation, Turnstile and submission to [CRM NAME] via route handlers. Add the ?partner= banner (F3), cookie consent (F9) and consent-gated analytics events (F8) through lib/analytics.ts. Add metadata, structured data, sitemap.xml and robots.txt. Prove a test lead reaches the CRM.
```

**Phase 6 — QA and launch**

```
Phase 6: write Playwright tests for navigation, both forms and FAQ filtering; run axe on every page; run Lighthouse CI on home, wearable, Robota and demo pages and fix anything below the PRD targets. Search the codebase and CMS for [PLACEHOLDER], [STAT NEEDED] and the banned phrases in CLAUDE.md. Report against the Definition of done checklist.
```
