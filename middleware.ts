import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/util/analytics";
import { rateLimiter } from "./lib/rate-limiter";

export default async function middleware(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for");

  if (req.nextUrl.pathname.startsWith("/api/v1")) {
    const { success, limit, reset, remaining } = await rateLimiter.limit(
      `ratelimit_${ip}`
    );
    if (!success) {
      return new Response(
        JSON.stringify({
          error: true,
          message: "rate limit exceeded, 5 request per second allowed",
        }),
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        }
      );
    }
  }

  if (req.nextUrl.pathname === "/") {
    analytics
      .track("59cbe83c-f547-48a9-b820-b6d7d743f94f", "pageview", {
        page: "/",
        country: req.geo?.country,
      })
      .catch(console.error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
