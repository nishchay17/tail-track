"use server";

import { eq, count, desc, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { namespace } from "@/lib/db/schema";
import { getCurrentUser } from "./user";
import {
  getErrorResult,
  getSuccessResult,
  handleDbError,
} from "@/util/returnUtil";

export async function createNamespace(_namespace: string, userId: string) {
  try {
    const _count = await db
      .select({ count: count() })
      .from(namespace)
      .where(eq(namespace.userId, userId));
    if (_count && _count[0].count >= 10)
      return getErrorResult("One user can have only 10 namespaces");

    await db.insert(namespace).values({
      namespace: _namespace,
      userId: userId,
    });
    revalidatePath("/dashboard");
    return getSuccessResult({ message: "Successfully created", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function getNamespaces() {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    const data =
      (await db
        .select({
          namespace: namespace.namespace,
        })
        .from(namespace)
        .where(eq(namespace.userId, user[0].id))
        .orderBy(desc(namespace.createdAt))) ?? [];
    return getSuccessResult<string[]>({ data: data.map((it) => it.namespace) });
  } catch (error) {
    return handleDbError(error);
  }
}

export async function isNamespaceExists(name: string, userId: string) {
  try {
    const res = await db
      .select({
        count: count(),
      })
      .from(namespace)
      .where(and(eq(namespace.userId, userId), eq(namespace.namespace, name)));

    if (!res || res.length === 0 || res[0].count === 0) return false;
    return true;
  } catch (error) {
    return handleDbError(error);
  }
}

export async function deleteNamespace(_namespace: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return getErrorResult("User not found");
    await db
      .delete(namespace)
      .where(
        and(
          eq(namespace.userId, user[0].id),
          eq(namespace.namespace, _namespace)
        )
      );
    revalidatePath("/dashboard");
    return getSuccessResult({ message: "deleted successfully", data: [] });
  } catch (error) {
    return handleDbError(error);
  }
}
