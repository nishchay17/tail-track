"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import {
  getErrorResult,
  getSuccessResult,
  handleDbError,
} from "@/util/returnUtil";
import { getCurrentUser } from "./user";
import { db } from "@/lib/db";
import { WebhookCreateType, webhook } from "@/lib/db/schema/webhook";

export async function getWebhooksByNamespace(
  _namespace: string,
  userId: string
) {
  try {
    const data =
      (await db
        .select({
          namespace: webhook.namespace,
          url: webhook.url,
          type: webhook.type,
          additionalHeaders: webhook.additionalHeaders,
          method: webhook.method,
        })
        .from(webhook)
        .where(
          and(eq(webhook.userId, userId), eq(webhook.namespace, _namespace))
        )) ?? [];
    return getSuccessResult<(typeof data)[0][]>({ data });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function getWebhooks() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    const data =
      (await db
        .select({
          namespace: webhook.namespace,
          url: webhook.url,
          type: webhook.type,
          additionalHeaders: webhook.additionalHeaders,
          method: webhook.method,
          id: webhook.id,
        })
        .from(webhook)
        .where(and(eq(webhook.userId, user[0].id)))) ?? [];
    return getSuccessResult<(typeof data)[0][]>({ data });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function createWebhook(data: WebhookCreateType) {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db.insert(webhook).values({
      namespace: data.namespace,
      userId: user[0].id,
      type: data.type,
      url: data.url,
      method: data.method,
      additionalHeaders: data.additionalHeaders,
    });
    revalidatePath("/dashboard/webhooks");
    return getSuccessResult({ message: "Successfully created", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function deleteWebhook(id: number) {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db
      .delete(webhook)
      .where(and(eq(webhook.userId, user[0].id), eq(webhook.id, id)));
    revalidatePath("/dashboard/webhooks");
    return getSuccessResult({ message: "Successfully deleted", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}
