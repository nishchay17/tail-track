"use server";

import { eq } from "drizzle-orm";
import { signOut } from "next-auth/react";

import { auth } from "@/lib/auth/auth-options";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getCurrentUser() {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) {
    signOut();
    return;
  }
  return await db.select().from(users).where(eq(users.id, id!));
}
