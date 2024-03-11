import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.RADIS_URL,
  token: process.env.REDIS_TOKEN,
});
