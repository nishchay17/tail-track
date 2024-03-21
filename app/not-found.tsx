import Link from "next/link";

import { MainNav } from "@/components/nav/main-nav";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <main className="relative min-h-screen">
      <div className="-z-50 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#7878782d_1px,transparent_1px),linear-gradient(to_bottom,#7878782d_1px,transparent_1px)] bg-[size:15px_15px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="container">
        <MainNav
          items={[{ title: "Home", href: "/" }]}
          className="justify-between items-center my-6"
        />
        <div className="text-3xl text-center mt-[calc(50vh-10rem)]">
          <h1>Page Not Found</h1>
          <Button className="mt-6" asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
