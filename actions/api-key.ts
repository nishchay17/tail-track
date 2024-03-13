"use server";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { apiKey } from "@/lib/db/schema";
import { getCurrentUser } from "./user";

export async function generateApiKey(name: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    await db.insert(apiKey).values({
      id: randomUUID(),
      token: randomUUID(),
      name,
      userId: user[0].id,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getApiKeys() {
  const user = await getCurrentUser();
  if (!user) return [];
  return (
    (await db
      .select({
        token: apiKey.token,
        name: apiKey.name,
        createdAt: apiKey.createdAt,
      })
      .from(apiKey)
      .where(eq(apiKey.userId, user[0].id))) ?? []
  );
}
