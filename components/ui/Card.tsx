import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)]",
        "bg-[var(--color-bg-raised)] p-[var(--space-6)] shadow-[var(--shadow-sm)]",
        "transition-transform duration-[var(--duration-base)] ease-[var(--ease-default)]",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-md)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-[var(--font-size-h3)] leading-[var(--line-height-snug)] tracking-[var(--tracking-tight)]",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-[var(--color-text-muted)] mt-[var(--space-2)]", className)} {...props} />
  );
}
