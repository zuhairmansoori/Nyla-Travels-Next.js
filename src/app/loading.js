import { Plane } from "lucide-react";

/**
 * Nyla Travels — loading.js (Next.js App Router loading UI)
 * Drop this file at: app/loading.js  (root level, NOT inside a route group)
 *
 * Next.js shows this automatically (via a Suspense boundary) whenever a
 * route segment is fetching data / compiling, including the very first
 * visit to the site. No wiring needed — just place the file.
 *
 * This is a Server Component (no "use client") since the animation is
 * pure CSS — no interactivity or state needed.
 */

export default function Loading() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0b2027] px-5 text-[#f2ecdd]">
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

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-400">
          Nyla Travels
        </p>

        {/* flight path */}
        <div className="relative mb-8 h-14 w-full">
          {/* dashed route line */}
          <svg
            viewBox="0 0 320 56"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <path
              d="M 12 44 Q 160 -10 308 44"
              fill="none"
              stroke="#f2ecdd"
              strokeOpacity="0.18"
              strokeWidth="2"
              strokeDasharray="6 8"
            />
            <circle cx="12" cy="44" r="4" fill="#d4a24e" />
            <circle cx="308" cy="44" r="4" fill="#d4a24e" fillOpacity="0.4" />
          </svg>

          {/* moving plane */}
          <div className="loading-plane absolute top-0">
            <Plane
              className="h-5 w-5 -rotate-3 text-amber-400"
              strokeWidth={2}
            />
          </div>
        </div>

        <p className="text-sm font-medium text-[#f2ecdd]/80">
          Preparing your journey
          <span className="loading-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </p>
      </div>

      <style>{`
        @keyframes flyAlongPath {
          0% {
            offset-distance: 0%;
          }
          100% {
            offset-distance: 100%;
          }
        }

        .loading-plane {
          offset-path: path("M 12 44 Q 160 -10 308 44");
          offset-rotate: auto;
          animation: flyAlongPath 2.2s ease-in-out infinite alternate;
        }

        @keyframes dotFade {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }

        .loading-dots span {
          animation: dotFade 1.4s infinite;
          opacity: 0;
        }

        .loading-dots span:nth-child(1) { animation-delay: 0s; }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @media (prefers-reduced-motion: reduce) {
          .loading-plane {
            animation: none;
            offset-distance: 50%;
          }
          .loading-dots span {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}