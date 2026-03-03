import { MongoClient } from "mongodb";

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI");

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");

  try {
    const client = await getClient();

    // DB name: auypct (same as in your connection string /auypct)
    const db = client.db("auypct");
    const col = db.collection("site_stats");

    const filter = { _id: "pageviews" };

    const SEED_VIEWS = 200; // ✅ starting existing views

    if (req.method === "POST") {
      const result = await col.findOneAndUpdate(
        filter,
        {
          // ✅ if doc doesn't exist, create it with 200 first
          $setOnInsert: { views: SEED_VIEWS },
          // ✅ then increment by 1 for this new session
          $inc: { views: 1 },
        },
        { upsert: true, returnDocument: "after" }
      );

      // If created now: 200 + 1 => 201
      // If already existed: increments normally
      return res.status(200).json({ views: result.value?.views ?? SEED_VIEWS });
    }

    if (req.method === "GET") {
      const doc = await col.findOne(filter);
      return res.status(200).json({ views: doc?.views ?? SEED_VIEWS });
    }

    // Optional: handle other methods
    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: String(error) });
  }
}