"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Nyla Travels — 404 / Not Found page (Tailwind + shadcn/ui, JavaScript)
 * Drop this file at: app/not-found.js
 *
 * Requires shadcn's Button component installed:
 *   npx shadcn@latest add button
 */

const FLAP_CHARS = "0123456789";

function randomChar() {
  return FLAP_CHARS[Math.floor(Math.random() * FLAP_CHARS.length)];
}

function SplitFlapDigit({ target, delay }) {
  const [display, setDisplay] = useState(target);
  const [spinning, setSpinning] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplay(target);
      setSpinning(false);
      return;
    }

    let ticks = 0;
    const maxTicks = 10;
    let interval;

    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        ticks += 1;
        if (ticks >= maxTicks) {
          setDisplay(target);
          setSpinning(false);
          clearInterval(interval);
        } else {
          setDisplay(randomChar());
        }
      }, 60);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [target, delay]);

  return (
    <span
      className={`relative inline-flex h-16 w-12 sm:h-22 sm:w-16 items-center justify-center rounded-md border border-amber-400/30 bg-[#12303a] font-mono text-4xl sm:text-5xl font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,0.25),inset_0_2px_0_rgba(255,255,255,0.06)] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-black/40 ${
        spinning ? "text-amber-400" : "text-[#f2ecdd]"
      }`}
    >
      {display}
    </span>
  );
}

export default function NotFound() {
  const digits = "404".split("");

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
          Nyla Travels &middot; Arrivals / Departures
        </p>

        <div className="mb-7 flex justify-center gap-2.5">
          {digits.map((d, i) => (
            <SplitFlapDigit key={i} target={d} delay={i * 120} />
          ))}
        </div>

        <h1 className="mb-3 text-2xl font-bold leading-snug text-[#f2ecdd]">
          This destination isn&apos;t on the map
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-[#f2ecdd]/65">
          The page you&apos;re looking for has been rerouted, renamed, or
          never existed. Let&apos;s get you back on itinerary.
        </p>

        <div className="rounded-xl border border-[#f2ecdd]/10 bg-[#12303a] px-6 py-5 text-left">
          <div className="flex justify-between border-b border-dashed border-[#f2ecdd]/15 py-2 text-[13px]">
            <span className="uppercase tracking-wide text-[#f2ecdd]/50">
              From
            </span>
            <span className="font-mono font-semibold">HERE</span>
          </div>
          <div className="flex justify-between border-b border-dashed border-[#f2ecdd]/15 py-2 text-[13px]">
            <span className="uppercase tracking-wide text-[#f2ecdd]/50">
              To
            </span>
            <span className="font-mono font-semibold">NOWHERE</span>
          </div>
          <div className="flex justify-between py-2 text-[13px]">
            <span className="uppercase tracking-wide text-[#f2ecdd]/50">
              Status
            </span>
            <span className="font-mono font-semibold text-[#d4694e]">
              CANCELLED
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

          <Button
            asChild
            className="w-full bg-amber-400 font-bold text-[#0b2027] hover:bg-amber-300"
          >
            <Link href="/">Return to Nyla Travels →</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}