"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center px-6 bg-[#040d1a] text-white font-sans">
        <div className="text-center max-w-md mx-auto space-y-4">
          <h1 className="text-3xl font-extrabold">Application Error</h1>
          <p className="text-slate-400 text-sm">
            A critical error occurred. Please refresh or try again.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center h-11 rounded-xl px-6 bg-[#4ade80] text-[#04101f] font-bold text-sm cursor-pointer"
          >
            Reload Page
          </button>
        </div>
      </body>
    </html>
  );
}
