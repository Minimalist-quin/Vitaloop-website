"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "./icons";
import { cn } from "@/lib/cn";

export const Select = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;

export function SelectTrigger({ className, children, ...props }: RadixSelect.SelectTriggerProps) {
  return (
    <RadixSelect.Trigger
      className={cn(
        "flex h-11 w-full items-center justify-between gap-[var(--space-2)]",
        "rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg)]",
        "px-[var(--space-4)] text-[var(--font-size-body)] text-[var(--color-text)]",
        "data-[placeholder]:text-[var(--color-text-muted)]",
        className,
      )}
      {...props}
    >
      {children}
      <RadixSelect.Icon>
        <ChevronDown className="size-4 text-[var(--color-text-muted)]" />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
}

export function SelectContent({ className, children, ...props }: RadixSelect.SelectContentProps) {
  return (
    <RadixSelect.Portal>
      <RadixSelect.Content
        className={cn(
          "overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)]",
          "bg-[var(--color-bg-raised)] shadow-[var(--shadow-md)]",
          className,
        )}
        position="popper"
        sideOffset={6}
        {...props}
      >
        <RadixSelect.Viewport className="p-1">{children}</RadixSelect.Viewport>
      </RadixSelect.Content>
    </RadixSelect.Portal>
  );
}

export function SelectItem({ className, children, ...props }: RadixSelect.SelectItemProps) {
  return (
    <RadixSelect.Item
      className={cn(
        "relative flex cursor-pointer items-center rounded-[var(--radius-sm)] py-[var(--space-2)] pl-8 pr-[var(--space-4)]",
        "text-[var(--font-size-body)] text-[var(--color-text)] outline-none",
        "data-[highlighted]:bg-[var(--color-accent-500)] data-[highlighted]:text-[var(--color-accent-contrast)]",
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex size-4 items-center justify-center">
        <RadixSelect.ItemIndicator>
          <Check className="size-3.5" />
        </RadixSelect.ItemIndicator>
      </span>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
}
