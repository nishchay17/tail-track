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
    <div className="flex min-h-screen flex-col">
      <NavBar user={user} items={[]} />
      <div className="md:grid-cols-[auto_1fr] lg:grid-cols-[200px_1fr]">
        <aside className="fixed top-16 h-full left-0 hidden md:w-[150px] lg:w-[200px] flex-col md:flex px-4 bg-muted/20 border-r pt-6">
          <DashboardNav items={sideNavLinks} />
        </aside>
        <main className="flex flex-1 flex-col overflow-hidden md:ml-[150px] lg:ml-[200px] mt-6 px-8 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
