import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "sm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] font-medium " +
  "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-default)] " +
  "disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-accent-500)] text-[var(--color-accent-contrast)] hover:bg-[var(--color-accent-600)]",
  secondary:
    "border border-[var(--color-border-strong)] text-[var(--color-text)] hover:bg-[var(--color-bg-raised)]",
  ghost: "text-[var(--color-text)] hover:bg-[var(--color-bg-raised)]",
};

const sizes: Record<ButtonSize, string> = {
  default: "h-11 px-6 text-[var(--font-size-body)]",
  sm: "h-9 px-4 text-[var(--font-size-body-sm)]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />
    );
  },
);
Button.displayName = "Button";
