"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/nav/main-nav";
import { Icons } from "@/components/ui/icons";
import dashboardImage from "../public/img/dashboard.png";
import { useCopyToClipboard } from "@/hooks/use-copy";
import { useToast } from "@/components/ui/use-toast";
import useMobile from "@/hooks/use-mobile";
import ApiTokenCard from "@/components/integrate/api-token-card";
import { cn } from "@/lib/utils";

export default function Home() {
  const [_, copyToClipboard] = useCopyToClipboard();
  const { toast } = useToast();
  const isMobile = useMobile();

  const heroContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const heroItem = {
    hidden: { opacity: 0, translateY: -10 },
    show: { opacity: 1, translateY: 0, transition: { duration: 0.15 } },
  };

  const imageRef = useRef(null);
  const imageScroll = useScroll({
    target: imageRef,
    offset: ["start end", "start start"],
  });
  const imageTranslateY = useTransform(
    imageScroll.scrollYProgress,
    [0, 1],
    [0, -100]
  );
  const imageScale = useTransform(
    imageScroll.scrollYProgress,
    [0, 1],
    [1, 1.15]
  );

  const [currectSetupCardIdx, setCurrectSetupCardIdx] = useState(0);
  const steps = useMemo(
    () => [
      {
        body: (
          <p>
            Signup with Github{" "}
            <span className="opacity-70">(other providers coming soon)</span>
          </p>
        ),
        image: (
          <Button
            onClick={() => {
              signIn("github", {
                callbackUrl: "/dashboard",
              });
            }}
            size="lg"
          >
            Start for free
          </Button>
        ),
      },
      {
        body: (
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
        ),
        image: (
          <ApiTokenCard apiKey={{ token: "your-token-signup-for-free" }} demo />
        ),
      },
      {
        body: (
          <p>
            Add our package from NPM to your project{" "}
            <span className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 leading-[0]">
              tail-track
            </span>
          </p>
        ),
        image: (
          <Button
            onClick={() => {
              copyToClipboard("npm install tail-track");
              toast({
                title: "Copied to clipboard!",
              });
            }}
            variant="ghost"
            className="py-2 px-4 border border-white/20 rounded-full mb-6 active:border-white/40 bg-background!"
          >
            {">"} npm install tail-track
          </Button>
        ),
      },
      {
        body: (
          <>
            <p className="mb-1">Pass namespace and options to start tracking</p>
            <pre className="bg-violet-500/20 px-[5px] py-[1px] rounded-md border border-white/10 w-full md:w-fit overflow-auto">
              <code>
                await tailtrack{"({"}namespace: {'"portfolio"});'}
              </code>
            </pre>
          </>
        ),
        image: (
          <Image
            src="/img/use.png"
            alt="use of tail-track"
            width={500}
            height={500}
            draggable={false}
          />
        ),
      },
    ],
    [toast, copyToClipboard]
  );
  const interval = useRef<null | number>(null);
  const handleTimer = useCallback(() => {
    if (interval.current) clearInterval(interval.current);
    interval.current = window.setInterval(() => {
      setCurrectSetupCardIdx((i) => (i + 1) % steps.length);
    }, 4000);
  }, [steps]);
  useEffect(() => {
    if (!isMobile) handleTimer();
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [handleTimer, isMobile]);

  return (
    <main>
      <div className="-z-50 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#7878782d_1px,transparent_1px),linear-gradient(to_bottom,#7878782d_1px,transparent_1px)] bg-[size:15px_15px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="container">
        <MainNav
          items={[{ title: "Setup", href: "/#setup" }]}
          className="justify-between items-center my-6"
        />
      </div>
      <motion.section
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="mb-48 md:mb-0 mt-[18vh] flex flex-col items-center justify-center"
      >
        <motion.div variants={heroItem}>
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
        </motion.div>
        <motion.h1
          variants={heroItem}
          className="text-4xl md:text-6xl lg:text-7xl text-center leading-[120%] font-semibold"
        >
          Track analytics with
          <br />
          <span className="mt-2 bg-gradient-to-br to-violet-600 from-violet-400 bg-clip-text text-transparent">
            Tail Track
          </span>
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="mt-6 opacity-70 text-sm md:text-base lg:text-lg text-center px-10"
        >
          Tail track is a free and open-source analytics platform, for all your
          projects
        </motion.p>
        <motion.div
          variants={heroItem}
          className="flex items-center gap-4 mt-12"
        >
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
          <Link href="https://github.com/nishchay17/tail-track" target="_blank">
            <Button variant="outline" size="sm" className=" border-violet-600">
              Give a star <Icons.star size={14} className="ml-2" />
            </Button>
          </Link>
          <Link href="/demo">
            <Button className=" border-violet-600" variant="outline" size="sm">
              Live demo
            </Button>
          </Link>
        </motion.div>
      </motion.section>
      <div className="container max-w-[1000px]">
        <motion.div
          style={{ translateY: imageTranslateY, scale: imageScale }}
          className="hidden sm:block mt-48 border border-white/20 rounded-lg will-change-transform"
        >
          <Image
            className="mx-auto"
            src={dashboardImage}
            alt="dashboard"
            ref={imageRef}
          />
        </motion.div>
      </div>
      <section id="setup" className="container px-4 md:px-8 max-w-[1200px]">
        <div className="px-10 my-20 md:mb-36 md:mt-20 py-8 border border-white/20 rounded-lg">
          <h2 className="text-3xl lg:text-4xl font-medium mb-2">Easy setup</h2>
          <p className="opacity-70 mb-16">
            Setup Tail Track in just a few clicks and start tracking
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {steps.map((it, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "bg-white/10 px-6 py-4 cursor-pointer transition duration-500 rounded-lg border",
                    idx === currectSetupCardIdx ? "bg-violet-500/10" : ""
                  )}
                  onClick={() => {
                    setCurrectSetupCardIdx(idx);
                    handleTimer();
                  }}
                >
                  <p className="text-lg opacity-70">Step {idx + 1}:</p>
                  {it.body}
                </div>
              ))}
            </div>
            <div className="hidden relative md:flex items-center justify-center border border-white/20 border-b-0 rounded-t-lg -my-8 overflow-hidden bg-[222.2_84%_4.9%]">
              <div className="-z-10 absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f4e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f4e_1px,transparent_1px)] bg-[size:14px_14px]" />
              <AnimatePresence>
                {steps.map(
                  (it, idx) =>
                    idx === currectSetupCardIdx && (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.5 },
                        }}
                        exit={{ opacity: 0, x: -100 }}
                        key={currectSetupCardIdx}
                      >
                        {it.image}
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      <section className="relative text-center py-14 md:py-36 border-t border-white/20">
        <div className="absolute inset-0 -z-50 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgb(175,175,175,20%),rgba(255,255,255,0))]"></div>
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
      <footer className="container pt-10 md:pt-32 pb-10 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm opacity-70">
          &copy;{new Date().getFullYear()} Tail Track
        </p>
        <p className="text-sm opacity-70">
          Created by{" "}
          <Link
            href={"https://twitter.com/Nishchay17_"}
            target="_blank"
            className="underline decoration-violet-500"
          >
            Nishchay17
          </Link>
        </p>
      </footer>
    </main>
  );
}
