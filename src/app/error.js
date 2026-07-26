"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Nyla Travels — error.js (Next.js App Router error boundary)
 * Drop this file at: app/error.js  (root level, NOT inside a route group)
 *
 * This catches runtime errors thrown while rendering a route segment.
 * Next.js automatically passes `error` and `reset` props — no need to
 * wire this up yourself, just place the file.
 *
 * Note: this is different from not-found.js —
 *   not-found.js  → invalid/unmatched routes (404)
 *   error.js      → something crashed while rendering (500-style)
 */

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log to console (swap for your error-reporting service if you have one)
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b2027] px-5 py-8 text-[#f2ecdd]">
      {/* dotted world-map backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_0%,transparent_75%)]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(242,236,221,0.13) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <main className="relative z-10 w-full max-w-md text-center">
        <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
          Nyla Travels &middot; Systems Status
        </p>

        {/* status board */}
        <div className="mb-7 flex justify-center">
          <div className="rounded-md border border-red-400/30 bg-[#12303a] px-6 py-4">
            <span className="font-mono text-3xl font-bold tracking-widest text-red-400">
              DELAYED
            </span>
          </div>
        </div>

        <h1 className="mb-3 text-2xl font-bold leading-snug text-[#f2ecdd]">
          Something went wrong mid-flight
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-[#f2ecdd]/65">
          An unexpected error interrupted this page. You can try again, or
          head back to the homepage while we sort it out.
        </p>

        <div className="rounded-xl border border-[#f2ecdd]/10 bg-[#12303a] px-6 py-5 text-left">
          <div className="flex justify-between border-b border-dashed border-[#f2ecdd]/15 py-2 text-[13px]">
            <span className="uppercase tracking-wide text-[#f2ecdd]/50">
              Flight
            </span>
            <span className="font-mono font-semibold">NYLA-500</span>
          </div>
          <div className="flex justify-between py-2 text-[13px]">
            <span className="uppercase tracking-wide text-[#f2ecdd]/50">
              Status
            </span>
            <span className="font-mono font-semibold text-red-400">
              TECHNICAL ISSUE
            </span>
          </div>

          <div
            aria-hidden="true"
            className="-mx-6 my-4 h-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to right, rgba(242,236,221,0.2) 0, rgba(242,236,221,0.2) 6px, transparent 6px, transparent 12px)",
            }}
          />

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => reset()}
              className="w-full bg-amber-400 font-bold text-[#0b2027] hover:bg-amber-300"
            >
              Try again
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-[#f2ecdd]/20 bg-transparent text-[#f2ecdd] hover:bg-[#f2ecdd]/10"
            >
              <Link href="/">Return home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}