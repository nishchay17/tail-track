"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard";
import { mockTracker } from "@/config/mock";

export default function Home() {
  return (
    <main className="">
      tail track
      <Button
        onClick={() => {
          signIn("github", {
            callbackUrl: "/dashboard",
          });
        }}
      >
        signin
      </Button>
      <Button
        onClick={() => {
          signOut();
        }}
      >
        signout
      </Button>
      <AnalyticsDashboard tracks={mockTracker} trackingDays={7} />
    </main>
  );
}
