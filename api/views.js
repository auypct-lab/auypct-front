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

    if (req.method === "POST") {
      const result = await col.findOneAndUpdate(
        filter,
        { $inc: { views: 1 } },
        { upsert: true, returnDocument: "after" }
      );
      return res.status(200).json({ views: result.value?.views ?? 0 });
    }

    const doc = await col.findOne(filter);
    return res.status(200).json({ views: doc?.views ?? 0 });
  } catch (error) {
    return res.status(500).json({ error: "Server error", details: String(error) });
  }
}