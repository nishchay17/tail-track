"use client";

import { signIn, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

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
    </main>
  );
}
