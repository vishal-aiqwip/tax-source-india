import { type NextRequest, NextResponse } from "next/server";
import { signTimestamp, TIMING_COOKIE } from "@/lib/enquiry/spam";

/**
 * Mints the enquiry form's timing token.
 *
 * This file is `proxy.ts`, not `middleware.ts`: Next 16 renamed the
 * convention and the exported function along with it. The proxy runtime is
 * always Node, which suits us — the signing below needs node:crypto.
 *
 * Why here rather than in the page: this runs on every request including a
 * static cache hit, so the home page stays statically rendered. A timestamp
 * embedded in the HTML would freeze at build time and the trap would never
 * fire. See lib/enquiry/spam.ts for the rest of the reasoning.
 */
export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Only stamp document GETs. In particular never touch the POST that carries
  // a Server Action: it must read the token issued by the page load, not one
  // minted by its own request.
  if (request.method !== "GET") return response;

  const secret = process.env.ENQUIRY_TOKEN_SECRET;
  // No secret configured -> issue nothing. The verifier fails open, so the
  // form keeps working and only the timing heuristic is lost.
  if (!secret) return response;

  response.cookies.set(TIMING_COOKIE, signTimestamp(Date.now(), secret), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7200,
  });

  return response;
}

export const config = {
  // HTML documents only — no assets, no images, no Next internals.
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
