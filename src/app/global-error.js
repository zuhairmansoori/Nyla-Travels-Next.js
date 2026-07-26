"use client";

/**
 * Nyla Travels — global-error.js
 * Drop this file at: app/global-error.js  (root level, alongside layout.js)
 *
 * This is the LAST line of defense — it only fires when the ROOT
 * layout.js itself throws (error.js can't catch that, since error.js
 * is rendered *inside* the layout). Because of that, this file must
 * render its own <html> and <body> — the root layout is gone.
 *
 * Deliberately dependency-light: no shadcn Button, no lucide icons,
 * inline styles instead of Tailwind classes. If the app is broken
 * badly enough to reach here, we don't want this file to have any
 * chance of failing too (e.g. Tailwind not loading, an alias broken).
 */

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body style={styles.body}>
        <div style={styles.dots} aria-hidden="true" />

        <main style={styles.main}>
          <p style={styles.eyebrow}>Nyla Travels &middot; Systems Status</p>

          <div style={styles.badgeWrap}>
            <span style={styles.badge}>GROUNDED</span>
          </div>

          <h1 style={styles.headline}>We hit turbulence</h1>
          <p style={styles.subline}>
            Something went seriously wrong and the app couldn&apos;t recover
            on its own. Try reloading — if it keeps happening, our team has
            been notified.
          </p>

          <div style={styles.card}>
            <div style={styles.row}>
              <span style={styles.label}>Status</span>
              <span style={{ ...styles.value, color: "#d4694e" }}>
                CRITICAL FAILURE
              </span>
            </div>

            <div style={styles.perforation} aria-hidden="true" />

            <button
              onClick={() => reset()}
              style={styles.primaryButton}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#e3b563")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "#d4a24e")
              }
            >
              Reload app
            </button>
            <a href="/" style={styles.secondaryButton}>
              Return home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}

const styles = {
  body: {
    position: "relative",
    minHeight: "100vh",
    margin: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 20px",
    background: "#0b2027",
    color: "#f2ecdd",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: "hidden",
  },
  dots: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "radial-gradient(rgba(242,236,221,0.13) 1px, transparent 1px)",
    backgroundSize: "22px 22px",
    maskImage:
      "radial-gradient(ellipse at center, black 0%, transparent 75%)",
    WebkitMaskImage:
      "radial-gradient(ellipse at center, black 0%, transparent 75%)",
    pointerEvents: "none",
  },
  main: {
    position: "relative",
    zIndex: 1,
    maxWidth: "420px",
    width: "100%",
    textAlign: "center",
  },
  eyebrow: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#d4a24e",
    margin: "0 0 20px",
  },
  badgeWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "28px",
  },
  badge: {
    fontFamily: "monospace",
    fontSize: "28px",
    fontWeight: 700,
    letterSpacing: "0.1em",
    color: "#d4694e",
    background: "#12303a",
    border: "1px solid rgba(212,105,78,0.3)",
    borderRadius: "6px",
    padding: "12px 24px",
  },
  headline: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: 1.3,
    margin: "0 0 12px",
  },
  subline: {
    fontSize: "14px",
    lineHeight: 1.6,
    color: "rgba(242,236,221,0.65)",
    margin: "0 0 32px",
  },
  card: {
    background: "#12303a",
    border: "1px solid rgba(242,236,221,0.1)",
    borderRadius: "12px",
    padding: "20px 24px",
    textAlign: "left",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    fontSize: "13px",
  },
  label: {
    color: "rgba(242,236,221,0.5)",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  value: {
    fontFamily: "monospace",
    fontWeight: 600,
  },
  perforation: {
    height: "1px",
    margin: "16px -24px",
    backgroundImage:
      "repeating-linear-gradient(to right, rgba(242,236,221,0.2) 0, rgba(242,236,221,0.2) 6px, transparent 6px, transparent 12px)",
  },
  primaryButton: {
    display: "block",
    width: "100%",
    textAlign: "center",
    padding: "12px 0",
    marginBottom: "8px",
    background: "#d4a24e",
    color: "#0b2027",
    fontWeight: 700,
    fontSize: "14px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
  },
  secondaryButton: {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    textAlign: "center",
    padding: "12px 0",
    background: "transparent",
    color: "#f2ecdd",
    fontWeight: 700,
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid rgba(242,236,221,0.2)",
    textDecoration: "none",
  },
};