"use client";

import { User } from "next-auth";

import { MainNavItem } from "@/types";
import { MainNav } from "./main-nav";
import { UserAccountNav } from "./user-account-nav";

interface NavBarProps {
  user: Pick<User, "name" | "image" | "email">;
  items?: MainNavItem[];
  children?: React.ReactNode;
  rightElements?: React.ReactNode;
}

export function NavBar({ user, items, children, rightElements }: NavBarProps) {
  return (
    <header
      className={
        "sticky top-0 z-40 flex w-full justify-center bg-muted/20 backdrop-blur-xl transition-all border-b shadow-md"
      }
    >
      <div className="w-full flex h-16 items-center justify-between py-4 px-6">
        <MainNav items={items}>{children}</MainNav>
        <div className="flex items-center space-x-3">
          {rightElements}
          <UserAccountNav user={user} />
        </div>
      </div>
    </header>
  );
}
