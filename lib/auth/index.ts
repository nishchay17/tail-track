"use server";

import { auth } from "./auth-options";

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}
