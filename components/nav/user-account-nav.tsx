"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import type { User } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "../ui/icons";
import { sideNavLinks } from "@/config/links";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          {user.image ? (
            <AvatarImage
              className="size-6"
              alt="Picture"
              src={user.image}
              referrerPolicy="no-referrer"
            />
          ) : (
            <AvatarFallback className="size-6">
              <span className="sr-only">{user.name}</span>
              <Icons.user className="size-4" />
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user?.name && <p className="font-medium">{user?.name}</p>}
            {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator />
        {sideNavLinks.map((it) => {
          const Icon = Icons[it.icon || "arrowRight"];
          return (
            <DropdownMenuItem asChild key={it.href} className="cursor-pointer">
              {it.href && (
                <Link href={it.href} className="flex items-center space-x-2.5">
                  <Icon className="size-4" />
                  <p className="text-sm">{it.title}</p>
                </Link>
              )}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <div className="flex items-center space-x-2.5">
            <Icons.logout className="size-4" />
            <p className="text-sm">Log out </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
