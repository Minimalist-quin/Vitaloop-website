# Vitaloop — rules for Claude Code

## Source of truth
- Pages, sections and requirements come from docs/PRD.md. Do not add pages or sections not in the PRD without asking.

## Claims
- Vitaloop detects, alerts and guides. Never write that it prevents heart attacks or cardiac arrest, saves lives, performs first aid or CPR, treats, or diagnoses.
- Approved: "detects irregular heart signals", "alerts emergency services and your contacts", "guides bystanders through first aid", "brings an AED to the scene", "wellness insights".
- Never invent statistics, testimonials, partner logos, certifications or accuracy figures. Use a clearly marked placeholder like [STAT NEEDED] instead.
- Footer on every page: Vitaloop is not a substitute for calling emergency services.

## Copy
- Placeholder copy is marked [PLACEHOLDER] so it is easy to find before launch.
- Plain language; explain clinical terms once.

## Code
- No copy strings in components; content comes from the CMS or a typed content file.
- WCAG 2.2 AA; test with keyboard and axe before marking a task done.
- Motion: GSAP + ScrollTrigger for scroll scenes, Motion for UI micro-interactions, React Three Fiber for 3D. Use the shared easing curve and duration tokens only.
- Every animation must explain the product or a state; no decorative motion.
- Hold 60fps on a mid-range phone; lazy-load 3D after first paint with a poster frame; serve video or image-sequence fallbacks on small or low-power devices.
- Respect prefers-reduced-motion for every animation with a static, fully readable layout.
- Premium look: generous whitespace, large display type, one accent color, no stock UI-kit styling.
- No third-party scripts before cookie consent.
- No health data collected in any form.

## Workflow
- Propose a plan before each phase and wait for approval.
- Commit after each task. Stop at each phase checkpoint and summarize what to review.
