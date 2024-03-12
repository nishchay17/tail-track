import { NextRequest, NextResponse } from "next/server";
import { analytics } from "@/util/analytics";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    analytics
      .track("pageview", {
        page: "/",
        country: req.geo?.country,
      })
      .catch(console.error);
  }

  return NextResponse.next();
}
