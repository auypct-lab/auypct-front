import { useEffect, useState } from "react";

export default function RealTimeViews() {
  const [views, setViews] = useState(null);

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

  // Poll every 5 seconds (real-time effect)
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch("/api/views");
      const data = await res.json();
      setViews(data.views);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontSize: "14px", marginTop: "10px" }}>
      👁️ Real-time views count: <strong>{views ?? "..."}</strong>
    </div>
  );
}