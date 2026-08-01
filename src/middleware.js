import { NextResponse } from "next/server";

const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 100;

function getClientIp(request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded ? forwarded.split(",")[0].trim() : "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now - record.start > RATE_LIMIT_WINDOW) {
    rateLimit.set(ip, { count: 1, start: now });
    return false;
  }

  record.count += 1;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

export function middleware(request) {
  const url = request.nextUrl;
  const hostname = request.headers.get("host") || "";

  if (hostname.startsWith("www.")) {
    const redirectUrl = url.clone();
    redirectUrl.hostname = hostname.replace("www.", "");
    redirectUrl.protocol = "https";
    return NextResponse.redirect(redirectUrl, 308);
  }

  if (url.pathname.startsWith("/api/")) {
    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }
  }

  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self)"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );

  if (url.pathname.startsWith("/api/")) {
    const origin = request.headers.get("origin");
    const allowedOrigins = [
      "https://nylatravels.com",
      "http://localhost:3000",
    ];

    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};