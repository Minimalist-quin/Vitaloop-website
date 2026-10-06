"use client";

import { useEffect } from "react";
import { initSmoothScroll } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Mounts Lenis smooth scroll (synced to ScrollTrigger) site-wide. Renders
 * nothing. Skipped entirely under reduced motion, since Lenis's inertia
 * is itself an animation.
 */
export function SmoothScrollProvider() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    return initSmoothScroll();
  }, [reducedMotion]);

  return null;
}
