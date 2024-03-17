"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { MainNavItem } from "@/types";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

interface MainNavProps {
  items?: MainNavItem[];
  children?: ReactNode;
}

export function MainNav({
  items,
  children,
  className,
}: MainNavProps & { className?: string }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className={cn("flex gap-6 md:gap-10", className)}>
      <Link href="#" className="items-center space-x-2 flex">
        <Icons.logo className="h-5 w-5" />
        <span className="hidden text-lg font-semibold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      {items?.length ? (
        <nav className="gap-6 flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-base md:text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
