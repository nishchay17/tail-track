"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/nav/main-nav";
import { Icons } from "@/components/ui/icons";
import dashboardImage from "../public/img/dashboard.png";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();

  return (
    <main>
      <div className="-z-50 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#7878782d_1px,transparent_1px),linear-gradient(to_bottom,#7878782d_1px,transparent_1px)] bg-[size:15px_15px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="container">
        <MainNav
          items={[{ title: "Setup", href: "/#setup" }]}
          className="justify-between items-center my-6"
        />
      </div>
      <section className="mb-48 md:mb-0 mt-[18vh] flex flex-col items-center justify-center">
        <Button
          onClick={() => {
            copyToClipboard("npm install tail-track");
            toast({
              title: "Copied to clipboard!",
            });
          }}
          variant="ghost"
          className="py-2 px-4 border border-white/20 rounded-full mb-6 active:border-white/40 hover:bg-white/10 active:bg-white/20"
        >
          {">"} npm install tail-track
        </Button>
        <h1 className="text-4xl md:text-6xl lg:text-7xl text-center leading-[120%] font-semibold">
          Track analytics with
          <br />
          <span className="mt-2 bg-gradient-to-br to-violet-600 from-violet-400 bg-clip-text text-transparent">
            Tail Track
          </span>
        </h1>
        <p className="mt-6 opacity-70 text-sm md:text-base lg:text-lg text-center px-10">
          Tail track is a free and open-source analytics platform, for all your
          projects
        </p>
        <div className="flex items-center gap-4 mt-12">
          <Button
            onClick={() => {
              signIn("github", {
                callbackUrl: "/dashboard",
              });
            }}
            size="sm"
          >
            Start for free
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className=" border-violet-600"
          >
            <Link
              href="https://github.com/nishchay17/tail-track"
              target="_blank"
            >
              Give a star <Icons.star size={14} className="ml-2" />
            </Link>
          </Button>
          <Button
            asChild
            className=" border-violet-600"
            variant="outline"
            size="sm"
          >
            <Link href="/demo">Live demo</Link>
          </Button>
        </div>
      </section>
      <div className="container max-w-[1000px]">
        <div className="hidden sm:block mt-48 border border-white/20 rounded-lg">
          <Image className=" mx-auto" src={dashboardImage} alt="dashboard" />
        </div>
      </div>
      <section id="setup" className="container max-w-[1000px]">
        <div className="max-w-[1000px] px-8 lg:px-0 my-20 md:my-36 py-8 border border-white/20 rounded-lg">
          <h2 className="text-3xl lg:text-4xl font-semibold text-center mb-2">
            Easy setup
          </h2>
          <p className="text-center opacity-70 mb-8">
            Setup Tail Track in just a few clicks and start tracking
          </p>
          <div className="mx-auto max-w-[500px] space-y-3 mb-5">
            <div className="relative">
              <div className="absolute top-[7px] left-[-20px] h-3 w-3 bg-violet-300 rounded-full" />
              <div className="absolute top-[19px] left-[-15px] h-[100%] w-[2px] bg-violet-300" />
              <p className="text-lg opacity-70">Step 1:</p>
              <p>
                Signup with Github{" "}
                <span className="opacity-70">
                  (other providers coming soon)
                </span>
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-[7px] left-[-20px] h-3 w-3 bg-violet-300 rounded-full" />
              <div className="absolute top-[19px] left-[-15px] h-[100%] w-[2px] bg-violet-300" />
              <p className="text-lg opacity-70">Step 2:</p>
              <p className="leading-[170%]">
                Copy your API token{" "}
                <span className="opacity-70">(from Integration tab)</span>, and
                paste it in{" "}
                <span className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 leading-[0]">
                  .env
                </span>{" "}
                file with name{" "}
                <span className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 leading-[0]">
                  TAILTRACK_API_KEY
                </span>
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-[7px] left-[-20px] h-3 w-3 bg-violet-300 rounded-full" />
              <div className="absolute top-[19px] left-[-15px] h-[100%] w-[2px] bg-violet-300" />
              <p className="text-lg opacity-70">Step 3:</p>
              <p>
                Add our package from NPM to your project{" "}
                <span className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 leading-[0]">
                  tail-track
                </span>
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-[7px] left-[-20px] h-3 w-3 bg-violet-300 rounded-full" />
              <p className="text-lg opacity-70">Step 4:</p>
              <p className="mb-1">
                Pass namespace and options to start tracking
              </p>
              <pre className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 w-full md:w-fit overflow-auto">
                <code>
                  const res = await tailtrack{"({"}namespace: {'"portfolio"});'}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center py-14 md:py-24 border-t border-b border-white/20">
        <h2 className="text-3xl lg:text-4xl font-semibold mb-3 md:mb-5">
          Let{"'"}s get{" "}
          <span className="bg-gradient-to-br to-violet-600 from-violet-400 bg-clip-text text-transparent">
            started
          </span>
        </h2>
        <p className="mb-7 md:mb-10 opacity-70 text-lg">
          Start using Tail Track today
        </p>
        <Button size="lg">Start for free</Button>
      </section>
      <footer className="pt-10 md:pt-24 pb-10 text-center">
        <p className="mb-1">
          Created by{" "}
          <Link
            href={"https://twitter.com/Nishchay17_"}
            target="_blank"
            className="underline decoration-violet-500"
          >
            Nishchay17
          </Link>
        </p>
        <p className="text-sm opacity-70">
          &copy;{new Date().getFullYear()} Tail Track
        </p>
      </footer>
    </main>
  );
}
