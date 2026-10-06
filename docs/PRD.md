# Vitaloop Website — Product Requirements Document

2026-10-06 · Grace Eloho

## Overview

The Vitaloop website must explain one system — a wearable that detects and a home robot (Robota) that responds — to two buyers at once: partner organizations who pay, and the people they give it to.

Vitaloop is a B2B2C preventive-health platform. The wrist wearable tracks cardiac signals (ECG/HRV), sleep, SpO2 and skin temperature. Robota gives daily check-ins and recommendations, and in an emergency alerts services and contacts, guides bystanders through first aid and fetches an AED. Partners — insurers, employers, senior living operators and health systems — distribute it to members, employees and residents.

The site has three jobs:

1. Make the detect → respond pairing obvious within the first two scrolls.
2. Turn partner visitors into demo requests, the primary conversion.
3. Help individuals understand, trust and activate a device they may already have through a partner.

Every claim on the site follows one rule: Vitaloop **detects, alerts and guides**. It never "prevents cardiac arrest" or "performs first aid".

## Goals, non-goals and success metrics

Success means qualified partner demo requests and a measurable share of visitors who understand the system without reading every page.

**Goals**

- Generate qualified demo requests from the four partner types.
- Explain the wearable, Robota and how they work together in plain language.
- State capability limits clearly enough to pass legal and clinical review.
- Give partner-provided users a clear activation path.

**Non-goals for v1**

- Direct-to-consumer checkout (pending the DTC decision in Open questions).
- A logged-in member dashboard or device management.
- Live health data of any kind on the marketing site.
- Localized versions beyond the launch market.

**Success metrics**

Targets are set with the team once a launch baseline exists; no figures are assumed here.

| Metric | What it tells us | How it is measured |
| --- | --- | --- |
| Demo requests per month | Partner pipeline volume | Form submissions, CRM |
| Demo-to-qualified rate | Lead quality by partner type | Sales tagging in CRM |
| Homepage → product page click-through | Whether the hero earns a second scroll | Analytics events |
| Scroll depth to "How it works" | Whether visitors reach the mechanism | Analytics scroll events |
| Activation page completions | Partner-provided users getting set up | Event on activation step |
| FAQ search with no result | Gaps in content | Site search logs |

## Audiences and user needs

Partners are the revenue; individuals are the reason partners buy. The site is consumer-first in tone and partner-aware in structure.

| Audience | Arrives wanting to know | Must leave with | Primary action |
| --- | --- | --- | --- |
| Insurers | Can this lower claims cost for high-risk members? | Outcome framing, data handling posture | Request a demo |
| Employers | Is this a credible benefit for our workforce? | Benefit value, rollout effort | Request a demo |
| Senior living operators | Does this reduce resident risk and staff load? | Emergency flow, what Robota does on-site | Request a demo |
| Health systems | Can this support post-discharge monitoring? | Integration options, compliance | Request a demo |
| Individuals and families | What is this, and can I trust it in my home? | How it works, its limits, privacy | Learn more / join waitlist |
| Partner-provided users | I was given this — how do I start? | Setup steps, support contact | Activate device |

**Key user stories**

- As a benefits lead, I can find a page written for my partner type in one click from the homepage.
- As a compliance reviewer, I can read the data and privacy posture without booking a call.
- As an adult child, I can understand what Robota does and does not do in an emergency.
- As a partner-provided user, I can reach setup help without reading the sales pages.

## Sitemap and page requirements

The homepage tells the product story in sequence; deeper pages split into a partner track, an individuals track and shared pages.

**Homepage, in order**

1. **Hero** — the wearable, then Robota, shown one after the other; one line covering the whole system. Primary CTA: Learn more. Secondary: For partners.
2. **The Wearable** — what it tracks (heart rhythm, HRV, sleep, SpO2, skin temperature), form factor, battery, wear-and-forget daily use.
3. **Robota** — daily check-ins and recommendations, then emergency behaviour. Ends with the capability statement: detects, alerts, guides.
4. **Features** — a scannable icon-and-card grid recapping capabilities from sections 2–3. No new information.
5. **How it works** — the alert loop in four steps: detect → confirm → escalate → guide.
6. **For partners** — one compact section naming the four partner types, linking to the partner hub.
7. **FAQ** — top questions, filtered by audience.
8. **Footer** — navigation, legal links, a one-line safety statement.

**Other pages**

| Page | Track | Must include | Priority |
| --- | --- | --- | --- |
| For partners (hub) | Partner | B2B2C model in one line; four partner types as entry points | P0 |
| Solutions by partner type | Partner | One pain point per buyer: claims cost, benefit value, resident liability, readmission | P0 |
| Request a demo | Partner | Short form; what happens next and when | P0 |
| Integration and compliance | Partner | Data handling, privacy posture, integration options, IT/compliance FAQ | P0 |
| Outcomes and ROI | Partner | Pilot data or case studies, clearly marked if illustrative | P1 — only once real data exists |
| The Wearable | Individuals | Full specs, accuracy notes, battery, charging | P0 |
| Robota | Individuals | Check-ins, emergency behaviour, what it does not do | P0 |
| Safety and honesty | Individuals | Full capability boundaries in plain language | P0 |
| Already have Vitaloop? | Individuals | Activation steps, partner-specific help, support contact | P0 |
| FAQ | Shared | Filterable by audience and topic | P0 |
| About | Shared | Founding story, team, credibility signals | P1 |
| Privacy, terms, cookies | Shared | Legal pages | P0 |

## Functional requirements

The demo form, audience-aware navigation and the activation path are launch-blocking; everything else can follow.

| ID | Requirement | Acceptance criteria | Priority |
| --- | --- | --- | --- |
| F1 | Demo request form | Fields: name, work email, organization, role, partner type (insurer, employer, senior living, health system), optional message. Submits to CRM and notifies sales within 1 minute. Confirmation states next step and response time. | P0 |
| F2 | Audience-aware navigation | Header shows Product, How it works, For partners, FAQ; "Request a demo" is a persistent header button. | P0 |
| F3 | Partner-referred landing | A URL parameter (e.g. ?partner=) shows a "Provided by [Partner]" note and routes to activation help. | P1 |
| F4 | Activation flow | Step-by-step setup for wearable and Robota; links to support; no account creation on the marketing site. | P0 |
| F5 | Waitlist or interest capture | Email field for individuals; double opt-in; consent text stored with the record. | P0 if no DTC at launch |
| F6 | FAQ with filters | Filter by audience (individual, partner, IT/compliance) and search across questions. | P0 |
| F7 | CMS | Marketing can edit copy, FAQ, partner-type pages and images without a developer; claims-sensitive pages require an approval step. | P0 |
| F8 | Analytics and events | Page views, CTA clicks, scroll depth, form starts and submissions, activation steps; consent-gated. | P0 |
| F9 | Cookie consent | Granular consent before non-essential cookies load. | P0 |
| F10 | "How it works" animation | Four-step alert loop; respects reduced-motion settings; static fallback. | P1 |
| F11 | Resource downloads | Partner one-pager and compliance summary as PDF, gated by email optional. | P1 |

## Content, brand and design principles

The tone is calm competence: a safety product earns trust by being clear and specific, not exciting.

- **One system, not two pitches.** The wearable and Robota appear together wherever possible, so the detect → respond link is seen, not inferred.
- **Show the product in real homes.** Lifestyle imagery of both devices in everyday settings; no isolated hero renders only.
- **Everyday first, emergency second.** Daily check-ins, sleep and trends get real space so the product does not read as a panic button.
- **Plain language.** Clinical terms explained once, in context. Reading level aimed at a general adult audience.
- **No invented proof.** Stats, logos and testimonials appear only when real; illustrative scenarios are labelled as such.
- **One design system, two registers.** The same components flex between warm consumer pages and denser partner pages without looking like two brands.

**Approved and banned phrasing**

| Use | Never use |
| --- | --- |
| Detects irregular heart signals | Prevents heart attacks |
| Alerts emergency services and your contacts | Saves lives (as a product claim) |
| Guides bystanders through first aid | Performs first aid / CPR |
| Brings an AED to the scene | Treats cardiac arrest |
| Wellness insights and recommendations | Diagnoses, medical advice |

## Trust, privacy and regulatory considerations

No claims-bearing page ships without legal and clinical sign-off; this is the main schedule risk.

- **Claims review.** Home, Robota, Safety and honesty, How it works and Outcomes and ROI need sign-off before publish. The CMS approval step (F7) enforces this after launch.
- **Device classification.** Whether the wearable is marketed as a wellness or a medical device decides what the site may say about ECG and detection accuracy. Copy waits on this decision.
- **Health data stays off the site.** The marketing site collects only contact and lead data; no health inputs in forms.
- **Privacy law by market.** The privacy policy and consent flow follow the launch market's rules (e.g. HIPAA alignment for US health-system partners, GDPR, Nigeria's NDPA). The compliance page explains this in plain language.
- **Emergency disclaimer.** Every page footer states that Vitaloop is not a substitute for calling emergency services.
- **Accessibility as trust.** Older users and their families are core visitors, so accessibility is a requirement, not polish (see Technical requirements).

## Technical and non-functional requirements

The site must be fast on mid-range phones, accessible to older users, and editable by marketing without engineering.

| Area | Requirement |
| --- | --- |
| Performance | LCP under 2.5s, CLS under 0.1, INP under 200ms on a mid-range Android over 4G; hero media lazy-loaded after first frame |
| Accessibility | WCAG 2.2 AA; minimum 16px body text; full keyboard navigation; captions on all video; reduced-motion support |
| Responsive | Designed mobile-first; breakpoints for mobile, tablet, desktop |
| SEO | Server-rendered pages, unique titles and meta per page, structured data for Organization, Product and FAQ, XML sitemap |
| Stack | Static or hybrid rendering (e.g. Next.js or Astro) with a headless CMS; final choice by the build team |
| Integrations | CRM for demo and waitlist leads; email platform for double opt-in; consent-aware analytics |
| Security | HTTPS only, form spam protection, no third-party scripts before consent |
| Hosting | CDN-backed; 99.9% uptime; preview deploys for content review |
| Browser support | Last two versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome |

## Milestones, risks and open questions

Dates are not set yet; the phases run in this order, with claims review gating launch.

1. **Discovery** — confirm open questions below, finalize sitemap and claims rules.
2. **Wireframes** — homepage plus all P0 pages, mobile and desktop.
3. **Visual design** — design system and high-fidelity pages.
4. **Copy and claims review** — legal and clinical sign-off on claims-bearing pages.
5. **Build** — CMS, forms, CRM and analytics wiring.
6. **QA and launch** — performance, accessibility and content checks; go live.
7. **Post-launch** — Outcomes and ROI page once pilot data exists; partner-referred landing (F3).

**Risks**

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Claims review takes longer than planned | Launch slips | Start review on wireframe copy, not final designs |
| No real proof points at launch | Partner pages feel thin | Lead with mechanism and team; omit stats rather than invent them |
| Robota product imagery not ready | Weak hero and product sections | Commission renders early; use clearly labelled concept visuals |
| Two audiences blur | Neither converts well | Separate partner hub; persistent demo CTA; audience-filtered FAQ |

**Open questions**

- Is there a direct-to-consumer purchase path at launch, or partner-only?
- Which partner type leads go-to-market?
- Is the robot marketed as "Robota" under the Vitaloop brand, or renamed?
- Wellness or medical-device positioning for the wearable?
- Launch market(s) and languages?
- Is partner co-branding needed in v1?
- Primary partner CTA: demo, pilot sign-up or sales contact?
- Launch date or external deadline (partner contract, funding, event)?
