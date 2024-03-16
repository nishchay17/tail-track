import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/util/analytics";

export default async function middleware(req: NextRequest) {
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
analytics.track;
