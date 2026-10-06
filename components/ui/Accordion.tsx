"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "./icons";
import { cn } from "@/lib/cn";

export const Accordion = RadixAccordion.Root;

export function AccordionItem({ className, ...props }: RadixAccordion.AccordionItemProps) {
  return (
    <RadixAccordion.Item
      className={cn("border-b border-[var(--color-border)]", className)}
      {...props}
    />
  );
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: RadixAccordion.AccordionTriggerProps) {
  return (
    <RadixAccordion.Header>
      <RadixAccordion.Trigger
        className={cn(
          "group flex w-full items-center justify-between py-[var(--space-4)] text-left",
          "text-[var(--font-size-body-lg)] font-medium",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-[var(--color-text-muted)]",
            "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-default)]",
            "group-data-[state=open]:rotate-180",
          )}
        />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

export function AccordionContent({ className, ...props }: RadixAccordion.AccordionContentProps) {
  return (
    <RadixAccordion.Content
      className={cn(
        "overflow-hidden text-[var(--color-text-muted)]",
        "data-[state=open]:animate-[accordion-down_var(--duration-base)_var(--ease-default)]",
        "data-[state=closed]:animate-[accordion-up_var(--duration-base)_var(--ease-default)]",
        className,
      )}
      {...props}
    >
      <div className="pb-[var(--space-4)]">{props.children}</div>
    </RadixAccordion.Content>
  );
}
