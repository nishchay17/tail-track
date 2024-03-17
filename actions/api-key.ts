"use server";

import { randomUUID } from "crypto";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { apiKey } from "@/lib/db/schema";
import { getCurrentUser } from "./user";
import {
  getErrorResult,
  getSuccessResult,
  handleDbError,
} from "@/util/returnUtil";

export async function generateApiKey() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    const _count = await db
      .select({ count: count() })
      .from(apiKey)
      .where(eq(apiKey.userId, user[0].id));
    if (_count && _count[0].count >= 1)
      return getErrorResult("One user can have only one API key");

    await db.insert(apiKey).values({
      id: randomUUID(),
      token: randomUUID(),
      userId: user[0].id,
    });
    revalidatePath("/dashboard/integrate");
    return getSuccessResult({ message: "Successfully created", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function getApiKey() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    const data =
      (await db
        .select({
          token: apiKey.token,
        })
        .from(apiKey)
        .where(eq(apiKey.userId, user[0].id))) ?? [];
    return getSuccessResult<typeof data>({ data });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function recreateAPIKey() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db
      .update(apiKey)
      .set({ token: randomUUID() })
      .where(eq(apiKey.userId, user[0].id));
    revalidatePath("/dashboard/integrate");
    return getSuccessResult({ message: "deleted successfully", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}
