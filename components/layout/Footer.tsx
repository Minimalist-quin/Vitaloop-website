import Link from "next/link";

const NAV_LINKS = [
  { href: "/#product", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/partners", label: "For partners" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

/**
 * Every page footer must carry the emergency disclaimer — see
 * CLAUDE.md "Claims".
 */
export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="mx-auto max-w-7xl px-[var(--space-6)] py-[var(--space-12)]">
        <div className="flex flex-col gap-[var(--space-8)] md:flex-row md:justify-between">
          <div>
            <p className="text-[var(--font-size-h3)] font-semibold tracking-[var(--tracking-tight)]">
              Vitaloop
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-[var(--space-6)]">
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

          <nav aria-label="Legal" className="flex flex-wrap gap-[var(--space-6)]">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--font-size-body-sm)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="mt-[var(--space-8)] border-t border-[var(--color-border)] pt-[var(--space-6)] text-[var(--font-size-body-sm)] text-[var(--color-text-muted)]">
          Vitaloop is not a substitute for calling emergency services.
        </p>
      </div>
    </footer>
  );
}
