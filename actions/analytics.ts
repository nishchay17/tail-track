"use server";

import { analytics } from "@/util/analytics";

export async function getAnalytics({
  namespaceId,
  days,
}: {
  namespaceId: string;
  days: number;
}) {
  return await analytics.retrieveDays(namespaceId, days);
}
