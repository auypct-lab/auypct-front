import { useEffect, useMemo, useState } from "react";

export default function RealTimeViews({ small }) {
  const [views, setViews] = useState(null);

  // Format number (Indian style)
  const formattedViews = useMemo(() => {
    if (views === null) return "...";
    return new Intl.NumberFormat("en-IN").format(views);
  }, [views]);

  useEffect(() => {
    const sessionKey = "auypct_viewed";

    const increment = async () => {
      const res = await fetch("/api/views", { method: "POST" });
      const data = await res.json();
      setViews(data.views);
    };

    const fetchViews = async () => {
      const res = await fetch("/api/views");
      const data = await res.json();
      setViews(data.views);
    };

    // 🔥 StrictMode-safe logic
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true"); // set immediately
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

  if (small) {
    return (
      <div className="nav__viewsBox">
        <span className="nav__viewsTitle">Views</span>
        <span className="nav__viewsCount">{formattedViews}</span>
        <span className="nav__viewsDesc">Live, updates every 5s</span>
      </div>
    );
  }

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
          Real-Time Views
        </h2>
        <div
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "10px",
            color: "#2621b2",
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