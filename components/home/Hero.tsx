"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductStageLazy } from "@/components/three/ProductStageLazy";
import type { ProductStageDevice } from "@/components/three/ProductStage";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const NAV_LINKS = [
  { href: "#wearable", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "/partners", label: "For partners" },
  { href: "/faq", label: "FAQ" },
];

/**
 * Replicates Media/image.png's composition (nav over a dimmed full-bleed
 * backdrop; bold headline broken by an inline image; a dark subhead bar;
 * small meta text in both bottom corners) with Vitaloop's own content.
 *
 * Two deliberate departures from the reference, per CLAUDE.md:
 * - No stock background photo — the backdrop is a CSS gradient standing
 *   in for the dimmed/blurred photo treatment.
 * - No awards/certification badges — "no invented proof" rule.
 *
 * Headline is a bold sans (not the serif used in the prior Oura-styled
 * pass) to match image.png's actual type treatment. The nav and both
 * CTA rows (image.png PRD requires primary+secondary hero CTAs it
 * doesn't itself have) are built inline here, not as separate
 * reusable Header/Footer components.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [device, setDevice] = useState<ProductStageDevice>("wearable");
  const stageRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion || !stageRef.current) return;

    registerGsap();
    const tl = gsap.timeline({ delay: 0.6 });
    tl.to(stageRef.current, { opacity: 0, duration: 0.4, ease: VITALOOP_EASE, delay: 2.2 })
      .call(() => setDevice("robota"))
      .to(stageRef.current, { opacity: 1, duration: 0.4, ease: VITALOOP_EASE });

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-neutral-950)] text-[var(--color-neutral-0)]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 left-1/4 h-[60vw] w-[60vw] rounded-full bg-[var(--color-accent-500)] opacity-20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[50vw] w-[50vw] rounded-full bg-[var(--color-neutral-700)] opacity-40 blur-[100px]" />
      </div>

      <div className="flex items-center justify-between px-[var(--space-6)] py-[var(--space-6)]">
        <span className="text-[var(--font-size-h3)] font-semibold tracking-[var(--tracking-tight)]">
          Vitaloop
        </span>

        <nav aria-label="Primary" className="hidden items-center gap-[var(--space-8)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--font-size-body-sm)] text-[var(--color-neutral-300)] hover:text-[var(--color-neutral-0)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href="/demo">Request a demo</Link>
        </Button>
      </div>

      <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-[var(--space-10)] px-[var(--space-6)] text-center">
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 text-[var(--font-size-display)] font-bold leading-[var(--line-height-tight)] tracking-[var(--tracking-tight)]">
          <span>A wearable that detects.</span>
          <span
            ref={stageRef}
            className="relative inline-block h-24 w-24 align-middle sm:h-28 sm:w-28"
          >
            <ProductStageLazy device={device} className="h-full w-full" />
          </span>
          <span>A companion that responds.</span>
        </h1>

        <div className="w-full max-w-3xl rounded-[var(--radius-md)] bg-[var(--color-neutral-900)] px-[var(--space-8)] py-[var(--space-4)]">
          <p className="text-[var(--font-size-body-lg)] text-[var(--color-neutral-100)]">
            Vitaloop detects, alerts and guides.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-[var(--space-4)]">
          <Button asChild>
            <Link href="#wearable">Learn more</Link>
          </Button>
          <Button asChild variant="dark">
            <Link href="/partners">For partners</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-[var(--space-2)] px-[var(--space-6)] py-[var(--space-6)] text-[var(--font-size-body-sm)] text-[var(--color-neutral-400)] sm:flex-row sm:items-end sm:justify-between">
        <p>[PLACEHOLDER] A preventive-health platform for the people you love.</p>
        <p>[PLACEHOLDER] Built for insurers, employers, senior living &amp; health systems.</p>
      </div>
    </section>
  );
}
