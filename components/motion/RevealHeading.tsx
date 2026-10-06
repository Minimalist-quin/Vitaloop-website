"use client";

import { createElement, useEffect, useRef, type ElementType } from "react";
import { gsap, SplitText, registerGsap, VITALOOP_EASE } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";

export interface RevealHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
}

/**
 * The "headlines reveal word by word as they enter" signature motion
 * moment from docs/BUILD_PLAN.md. Reusable across the styleguide now and
 * the homepage sections in Phase 2.
 *
 * The heading tag (`as`) wraps a plain <span> that actually carries the
 * ref and gets split — SplitText needs a real DOM node, and attaching
 * the ref straight to an intrinsic <span> (rather than forwarding it
 * through a dynamic `Tag`) keeps this safe for any `as` value.
 *
 * Reduced motion: renders the plain heading, no split, no animation.
 */
export function RevealHeading({ children, as: Tag = "h2", className }: RevealHeadingProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;

    registerGsap();
    const split = new SplitText(ref.current, { type: "words" });
    gsap.set(split.words, { opacity: 0, y: "0.3em" });

    const tween = gsap.to(split.words, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: VITALOOP_EASE,
      stagger: 0.04,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, [reducedMotion]);

  return createElement(
    Tag,
    { className: cn(className) },
    <span ref={ref} className="inline-block">
      {children}
    </span>,
  );
}
