import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background text-foreground">
      <div className="text-center max-w-md mx-auto">
        <p className="text-7xl sm:text-8xl font-extrabold font-mono text-mint mb-4">
          404
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-sm sm:text-base mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="cta-glow inline-flex items-center justify-center gap-2 h-12 rounded-xl px-6 bg-mint text-primary-foreground font-bold text-sm hover:bg-mint-glow focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mint"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Return to Home
        </Link>
      </div>
    </main>
  );
}
