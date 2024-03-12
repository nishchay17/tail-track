import { parse } from "date-fns";

import { redis } from "@/lib/redis";
import { getDate } from "@/lib/utils";

type TrackOptions = {
  persist?: boolean;
};

export class Analytics {
  private retention: number = 60 * 60 * 24 * 7;

  constructor(opts?: { retention?: number }) {
    if (opts?.retention) this.retention = opts.retention;
  }

  getKey(namespace: string, date?: string) {
    if (!date) return `analytics::${namespace}`;
    return `analytics::${namespace}::${date}`;
  }

  async track(namespace: string, event: object = {}, opts?: TrackOptions) {
    let key = this.getKey(namespace);
    if (!opts?.persist) {
      key = this.getKey(namespace, getDate());
    }
    await redis.hincrby(key, JSON.stringify(event), 1);
    if (!opts?.persist) await redis.expire(key, this.retention);
  }

  async retrieveDays(namespace: string, nDays: number) {
    const promises = Array(nDays)
      .fill(0)
      .map((_, idx) => {
        const formattedDate = getDate(idx);
        return analytics.retrieve(namespace, formattedDate);
      });

    try {
      const fetched = await Promise.all(promises);
      const data = fetched.sort((a, b) => {
        if (
          parse(a.date, "dd/MM/yyyy", new Date()) >
          parse(b.date, "dd/MM/yyyy", new Date())
        ) {
          return 1;
        } else {
          return -1;
        }
      });
      return data;
    } catch (error) {
      console.error(`Error will fetching analytics data: [${error}]`);
      throw new Error("Failed to fetch analytics data");
    }
  }

  async retrieve(namespace: string, date: string) {
    const key = this.getKey(namespace, date);
    const res = await redis.hgetall<Record<string, string>>(key);
    return {
      date,
      events: Object.entries(res ?? []).map(([key, value]) => ({
        [key]: Number(value),
      })),
    };
  }
}

export const analytics = new Analytics();
export type RetrieveDaysReturnType = {
  date: string;
  events: {
    [x: string]: number;
  }[];
}[];
