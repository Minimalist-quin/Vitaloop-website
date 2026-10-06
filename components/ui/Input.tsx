import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-[var(--radius-md)] border border-[var(--color-border-strong)]",
        "bg-[var(--color-bg)] px-[var(--space-4)] text-[var(--font-size-body)] text-[var(--color-text)]",
        "placeholder:text-[var(--color-text-muted)]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-default)]",
        "focus-visible:border-[var(--color-accent-500)]",
        className,
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";
