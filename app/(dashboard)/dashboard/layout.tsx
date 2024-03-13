import { redirect } from "next/navigation";

import { NavBar } from "@/components/nav/dashboard-nav";
import { DashboardNav } from "@/components/nav/side-nav";
import { sideNavLinks } from "@/config/links";
import { getCurrentUserSession } from "@/lib/auth";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserSession();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <NavBar user={user} items={[]} />
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={sideNavLinks} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
