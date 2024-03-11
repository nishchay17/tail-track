"use client";

import { SessionProvider } from "next-auth/react";

function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;
