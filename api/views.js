import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const KEY = "auypct:pageviews";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  try {
    if (req.method === "POST") {
      const views = await redis.incr(KEY);
      return res.status(200).json({ views: Number(views) });
    }

    const views = (await redis.get(KEY)) ?? 0;
    return res.status(200).json({ views: Number(views) });

  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}//