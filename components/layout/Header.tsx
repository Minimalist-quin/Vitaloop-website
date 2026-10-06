import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/partners", label: "For partners" },
  { href: "/faq", label: "FAQ" },
];

/**
 * F2: audience-aware navigation with a persistent "Request a demo" CTA.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-[var(--space-6)]">
        <Link
          href="/"
          className="text-[var(--font-size-h3)] font-semibold tracking-[var(--tracking-tight)]"
        >
          Vitaloop
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-[var(--space-8)] md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[var(--font-size-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href="/demo">Request a demo</Link>
        </Button>
      </div>
    </header>
  );
}
