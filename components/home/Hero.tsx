"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ProductStageLazy } from "@/components/three/ProductStageLazy";
import type { ProductStageDevice } from "@/components/three/ProductStage";
import { gsap, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * PRD homepage section 1: "the wearable, then Robota, shown one after the
 * other; one line covering the whole system." Also the hero's signature
 * motion moment from docs/BUILD_PLAN.md — here implemented as a single
 * inline 3D chip that cross-fades from the wearable placeholder to the
 * Robota placeholder once on load.
 *
 * Always a dark surface regardless of the page theme (design principle:
 * "dark hero sections that transition into light content sections"), so
 * every color here is a literal --color-neutral-* token, never the
 * semantic --color-bg/--color-text ones that flip with theme.
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
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden bg-[var(--color-neutral-950)] px-[var(--space-6)] py-[var(--space-12)] text-[var(--color-neutral-0)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,_rgba(47,167,134,0.22),_transparent_70%)]"
      />

      <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center gap-[var(--space-10)] text-center">
        <h1 className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6 text-[var(--font-size-display)] font-semibold leading-[var(--line-height-tight)] tracking-[var(--tracking-tight)]">
          <span>A wearable that detects.</span>
          <span
            ref={stageRef}
            className="relative inline-block h-24 w-24 align-middle sm:h-28 sm:w-28"
          >
            <ProductStageLazy device={device} className="h-full w-full" />
          </span>
          <span>A companion that responds.</span>
        </h1>

        <p className="inline-block rounded-[var(--radius-full)] bg-[var(--color-neutral-900)] px-[var(--space-6)] py-[var(--space-3)] text-[var(--font-size-body-lg)] text-[var(--color-neutral-200)]">
          Vitaloop detects, alerts and guides.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-[var(--space-4)]">
          <Button asChild>
            <Link href="#wearable">Learn more</Link>
          </Button>
          <Button asChild variant="secondaryInverted">
            <Link href="/partners">For partners</Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-[var(--space-2)] text-[var(--font-size-body-sm)] text-[var(--color-neutral-500)] sm:flex-row sm:items-end sm:justify-between">
        <p>[PLACEHOLDER] A preventive-health platform for the people you love.</p>
        <p>[PLACEHOLDER] Built for insurers, employers, senior living &amp; health systems.</p>
      </div>
    </section>
  );
}
