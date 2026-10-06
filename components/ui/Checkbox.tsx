"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check } from "./icons";
import { cn } from "@/lib/cn";

export type CheckboxProps = RadixCheckbox.CheckboxProps;

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <RadixCheckbox.Root
      className={cn(
        "flex size-5 shrink-0 items-center justify-center rounded-[var(--radius-sm)]",
        "border border-[var(--color-border-strong)] bg-[var(--color-bg)]",
        "data-[state=checked]:border-[var(--color-accent-500)] data-[state=checked]:bg-[var(--color-accent-500)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-default)]",
        className,
      )}
      {...props}
    >
      <RadixCheckbox.Indicator>
        <Check className="size-3.5 text-[var(--color-accent-contrast)]" />
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );
}
