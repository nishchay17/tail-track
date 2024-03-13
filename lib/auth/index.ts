"use server";

import { auth } from "./auth-options";

export async function getCurrentUserSession() {
  const session = await auth();
  return session?.user;
}
