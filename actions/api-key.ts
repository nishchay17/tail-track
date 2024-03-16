"use server";

import { randomUUID } from "crypto";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { apiKey } from "@/lib/db/schema";
import { getCurrentUser } from "./user";
import { apiTokenFormSchema, apiTokenFormType } from "@/lib/schema";
import {
  getErrorResult,
  getSuccessResult,
  handleDbError,
  handleParseError,
} from "@/util/returnUtil";

export async function generateApiKey({ name }: apiTokenFormType) {
  let parsed;
  try {
    parsed = apiTokenFormSchema.parse({ name });
  } catch (error) {
    return handleParseError(error);
  }
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db.insert(apiKey).values({
      id: randomUUID(),
      token: randomUUID(),
      name: parsed.name,
      userId: user[0].id,
    });
    revalidatePath("/dashboard/integrate");
    return getSuccessResult({ message: "Successfully created", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function getApiKeys() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    const data =
      (await db
        .select({
          token: apiKey.token,
          name: apiKey.name,
          createdAt: apiKey.createdAt,
        })
        .from(apiKey)
        .where(eq(apiKey.userId, user[0].id))) ?? [];
    return getSuccessResult<typeof data>({ data });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function deleteAPIKey(token: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db
      .delete(apiKey)
      .where(and(eq(apiKey.userId, user[0].id), eq(apiKey.token, token)));
    revalidatePath("/dashboard/integrate");
    return getSuccessResult({ message: "deleted successfully", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}
