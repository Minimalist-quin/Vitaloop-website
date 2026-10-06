import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import Lenis from "lenis";
import { EASE_DEFAULT } from "./motion";

export const VITALOOP_EASE = "vitaloop-ease";

let registered = false;

/**
 * Registers GSAP plugins and the shared ease curve exactly once. Safe to
 * call from multiple components — only the first call does anything.
 */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  CustomEase.create(VITALOOP_EASE, EASE_DEFAULT.join(","));
  registered = true;
}

/**
 * Creates a Lenis smooth-scroll instance synced to GSAP's ticker, so
 * ScrollTrigger reads Lenis's scroll position instead of the native one.
 * Returns a cleanup function — call it on unmount.
 */
export function initSmoothScroll(): () => void {
  if (typeof window === "undefined") return () => {};

  registerGsap();

  const lenis = new Lenis({
    autoRaf: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(onTick);
    lenis.destroy();
  };
}

export { gsap, ScrollTrigger, SplitText };
