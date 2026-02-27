import { useEffect, useMemo, useState } from "react";

export default function RealTimeViews() {
  const [views, setViews] = useState(null);

  // Format number (Indian style)
  const formattedViews = useMemo(() => {
    if (views === null) return "...";
    return new Intl.NumberFormat("en-IN").format(views);
  }, [views]);

  useEffect(() => {
    const sessionKey = "auypct_viewed";
    const alreadyCounted = sessionStorage.getItem(sessionKey);

    const increment = async () => {
      const res = await fetch("/api/views", { method: "POST" });
      const data = await res.json();
      setViews(data.views);
      sessionStorage.setItem(sessionKey, "1");
    };

    const fetchViews = async () => {
      const res = await fetch("/api/views");
      const data = await res.json();
      setViews(data.views);
    };

    if (!alreadyCounted) {
      increment();
    } else {
      fetchViews();
    }
  }, []);

  // Poll every 5 seconds (real-time update)
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/views");
      const data = await res.json();
      setViews(data.views);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section style={{ padding: "40px 20px" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          textAlign: "center",
          background: "#0f172a",
          color: "#fff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
          Real-Time Website Views
        </h2>

        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "10px",
            color: "#22c55e",
          }}
        >
           {formattedViews}
        </div>

        <p style={{ marginTop: "10px", fontSize: "14px", opacity: 0.8 }}>
          Live visitor count updates every 5 seconds
        </p>
      </div>
    </section>
  );
}