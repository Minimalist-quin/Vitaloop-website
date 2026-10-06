"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/cn";
import type { ProductStageDevice } from "./ProductStage";

const ProductStage = dynamic(() => import("./ProductStage").then((m) => m.ProductStage), {
  ssr: false,
});

export interface ProductStageLazyProps {
  device?: ProductStageDevice;
  className?: string;
}

/**
 * What every page should actually render: shows a poster frame until the
 * 3D scene mounts (avoids a blank canvas / layout shift), and swaps to a
 * fully static poster instead of the live scene when the viewer prefers
 * reduced motion — per CLAUDE.md's motion rules.
 */
export function ProductStageLazy({ device = "wearable", className }: ProductStageLazyProps) {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  return (
    <div className={cn("relative aspect-square", className)}>
      {!mounted && (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-lg)] bg-[var(--color-neutral-950)]"
        >
          <div
            className={cn(
              "bg-[var(--color-accent-500)] opacity-60",
              device === "wearable"
                ? "h-40 w-16 rounded-full"
                : "h-32 w-24 rounded-[var(--radius-lg)]",
            )}
          />
        </div>
      )}
      <ProductStage
        device={device}
        static={reducedMotion}
        onCreated={() => setMounted(true)}
        className={cn(
          "absolute inset-0 rounded-[var(--radius-lg)] transition-opacity duration-[var(--duration-slow)]",
          mounted ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
