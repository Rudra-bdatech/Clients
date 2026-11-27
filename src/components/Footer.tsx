import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 px-6 bg-card border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-sm"
          >
            CLIENTS<span className="text-mint">.</span>
          </Link>
          <span className="text-sm text-muted-foreground">© 2026</span>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/about"
            className="text-sm text-muted-foreground hover:text-mint transition-colors font-mono focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-sm"
          >
            About
          </Link>
          <Link
            href="/case-studies"
            className="text-sm text-muted-foreground hover:text-mint transition-colors font-mono focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-sm"
          >
            The Vault
          </Link>
          <Link
            href="/contact"
            className="text-sm text-muted-foreground hover:text-mint transition-colors font-mono focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint rounded-sm"
          >
            Contact
          </Link>
          <span className="text-sm text-muted-foreground font-mono">
            Delhi, IN
          </span>
        </nav>
      </div>
    </footer>
  );
}
