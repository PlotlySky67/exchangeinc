import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Canonical domain is www.indicial.ro (see SITE_URL in src/app/layout.tsx).
// This enforces a single 301 redirect for both the apex domain and plain
// http://, covering every path + query string — not just the homepage —
// so link equity and crawl budget consolidate onto one canonical host.
//
// Only hosts actually known to serve this site in production are redirect
// candidates. Anything else (localhost in dev, *.vercel.app previews) is
// left untouched — redirecting those would break local dev and every
// preview deployment, since they'd all bounce to the live production host.
const CANONICAL_HOST = "www.indicial.ro";
const REDIRECT_CANDIDATE_HOSTS = new Set(["indicial.ro", CANONICAL_HOST]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get("host") ?? url.host;
  if (!REDIRECT_CANDIDATE_HOSTS.has(host)) {
    return NextResponse.next();
  }

  // Vercel terminates TLS at the edge and forwards the original scheme via
  // this header; url.protocol is always "https:" internally otherwise.
  const forwardedProto = request.headers.get("x-forwarded-proto");

  const needsHostRedirect = host !== CANONICAL_HOST;
  const needsHttpsRedirect = forwardedProto === "http";

  if (needsHostRedirect || needsHttpsRedirect) {
    const target = new URL(url);
    target.protocol = "https:";
    target.port = "";
    target.host = CANONICAL_HOST;
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals — only redirect actual page/API
  // requests. Keeps the redirect cost off hot-path asset serving.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
