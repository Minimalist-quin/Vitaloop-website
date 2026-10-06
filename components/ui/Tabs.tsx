"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";

export const Tabs = RadixTabs.Root;

export function TabsList({ className, ...props }: RadixTabs.TabsListProps) {
  return (
    <RadixTabs.List
      className={cn(
        "inline-flex gap-[var(--space-2)] rounded-[var(--radius-full)] border border-[var(--color-border)] p-1",
        className,
      )}
      {...props}
    />
  );
}

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return (
    <RadixTabs.Trigger
      className={cn(
        "rounded-[var(--radius-full)] px-[var(--space-4)] py-[var(--space-2)]",
        "text-[var(--font-size-body-sm)] font-medium text-[var(--color-text-muted)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-default)]",
        "data-[state=active]:bg-[var(--color-accent-500)] data-[state=active]:text-[var(--color-accent-contrast)]",
        className,
      )}
      {...props}
    />
  );
}

export function TabsContent({ className, ...props }: RadixTabs.TabsContentProps) {
  return (
    <RadixTabs.Content
      className={cn("mt-[var(--space-4)] focus-visible:outline-none", className)}
      {...props}
    />
  );
}
