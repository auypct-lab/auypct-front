import { useEffect, useMemo, useRef, useState } from "react";
import "./CourseRealTimeViews.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * CourseRealTimeViews
 * Props:
 *  - slug  {string}  — course slug to track (omit for global courses count)
 *  - small {bool}    — compact badge mode (default: false = full widget)
 */
export default function CourseRealTimeViews({ slug, small = false }) {
  const [views, setViews] = useState(null);
  const [pulse, setPulse] = useState(false);
  const prevViews = useRef(null);

  const sessionKey = `auypct_course_viewed_${slug || "global"}`;
  const endpoint = slug
    ? `${API_BASE}/api/course-views?slug=${encodeURIComponent(slug)}`
    : `${API_BASE}/api/course-views`;

  const formattedViews = useMemo(() => {
    if (views === null) return "...";
    return new Intl.NumberFormat("en-IN").format(views);
  }, [views]);

  // Increment or fetch on mount
  useEffect(() => {
    const increment = async () => {
      const res = await fetch(`${API_BASE}/api/course-views`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(slug ? { slug } : {})
      });
      const data = await res.json();
      setViews(data.views);
      prevViews.current = data.views;
    };

    const fetchViews = async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      setViews(data.views);
      prevViews.current = data.views;
    };

    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "true");
      increment();
    } else {
      fetchViews();
    }
  }, [slug]);

  // Poll every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(endpoint);
      const data = await res.json();

      // Pulse animation when count changes
      if (prevViews.current !== null && data.views !== prevViews.current) {
        setPulse(true);
        setTimeout(() => setPulse(false), 700);
      }
      prevViews.current = data.views;
      setViews(data.views);
    }, 5000);

    return () => clearInterval(interval);
  }, [slug]);

  // ── Small badge (for CoursesPage hero or navbar) ─────────────────────────────
  if (small) {
    return (
      <div className="crtv__badge">
        <span className="crtv__dot" />
        <span className="crtv__badgeLabel">
          {slug ? "Course Views" : "Total Course Views"}
        </span>
        <span className={`crtv__badgeCount ${pulse ? "crtv__pulse" : ""}`}>
          {formattedViews}
        </span>
        <span className="crtv__badgeLive">Live</span>
      </div>
    );
  }

  // ── Full widget (for detail pages) ────────────────────────────────────────────
  return (
    <div className="crtv__widget">
      <div className="crtv__widgetLeft">
        <span className="crtv__widgetDot" />
        <div>
          <div className="crtv__widgetLabel">
            {slug ? "Course Views" : "Total Course Views"}
          </div>
          <div className={`crtv__widgetCount ${pulse ? "crtv__pulse" : ""}`}>
            {formattedViews}
          </div>
        </div>
      </div>
      <div className="crtv__widgetRight">
        <div className="crtv__liveTag">🔴 Live</div>
        <div className="crtv__updateTip">Updates every 5s</div>
      </div>
    </div>
  );
}
