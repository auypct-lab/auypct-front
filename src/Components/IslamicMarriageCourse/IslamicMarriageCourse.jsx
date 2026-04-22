import { useEffect, useState } from "react";
import "./IslamicMarriageCourse.css";

const LEARN_ITEMS = [
  "Choosing the right spouse (Deen + compatibility)",
  "Understanding families & setting healthy boundaries",
  "Compatibility checks before marriage",
  "Roles & responsibilities of husband & wife",
  "Role of In-laws",
  "Conflict resolution (practical & Islamic approach)",
  "Strengthening love (Mawaddah) & mercy (Rahmah)"
];

const WHO_ITEMS = [
  { icon: "💍", text: "Those planning to marry" },
  { icon: "👫", text: "Newly married couples" },
  { icon: "🔄", text: "Married spouses to sit and reflect together — review each year like annual security training" },
  { icon: "👨‍👩‍👧", text: "Parents guiding their children" },
  { icon: "🕌", text: "Anyone who wants a strong Islamic family foundation" }
];

const FUTURE_ITEMS = [
  "Certificates can be issued",
  "Match-making & compatibility check sites planned with certificate integration — to become a Certified Spouse"
];

export default function IslamicMarriageCourse() {
  const SLUG = "nikkah-counselling";
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [enrollCount, setEnrollCount] = useState(null);
  const [enrolling, setEnrolling] = useState(false);

  // Fetch enroll count on mount
  useEffect(() => {
    fetch(`${API_BASE}/api/course-enrolls?slug=${SLUG}`)
      .then((r) => r.json())
      .then((d) => setEnrollCount(d.enrolls))
      .catch(() => {});
  }, []);

  async function handleEnroll() {
    setEnrolling(true);
    try {
      const res = await fetch(`${API_BASE}/api/course-enrolls`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: SLUG })
      });
      const data = await res.json();
      setEnrollCount(data.enrolls);
    } catch (e) {}
    // Open course in new tab
    window.open(
      "https://mohammed-s-site-93a6.thinkific.com/courses/nikkah-counselling",
      "_blank",
      "noopener,noreferrer"
    );
    setEnrolling(false);
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: "FREE Islamic Marriage Course (Qur'an & Sunnah Based)",
        text: "A Comprehensive Islamic Marriage Counselling Course — rooted in the Qur'an and Sunnah. 100% FREE!",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard! Share it with your friends & loved ones.");
    }
  }

  return (
    <section className="imc">
      {/* ── Announcement ribbon ─────────────────────────── */}
      <div className="imc__ribbon">
        <span>🚨 New Course Launch</span>
        <span className="imc__ribbon__sep">•</span>
        <span>100% FREE</span>
        <span className="imc__ribbon__sep">•</span>
        <span>Limited Seats</span>
      </div>

      <div className="imc__inner">
        {/* ── Header ──────────────────────────────────────── */}
        <div className="imc__head">
          <div className="imc__freeBadge">🎁 100% FREE</div>
          <h2 className="imc__title">
            Islamic Marriage Course
            <span className="imc__titleSub">Qur'an &amp; Sunnah Based</span>
          </h2>
          <p className="imc__tagline">
            A Comprehensive Islamic Marriage Counselling Course — rooted in the
            Qur'an and Sunnah, designed to prepare you{" "}
            <strong>before and after marriage.</strong>
          </p>
        </div>

        {/* ── Problem statement ────────────────────────────── */}
        <div className="imc__problem">
          <p className="imc__problemIntro">
            We spend years preparing for our careers…
          </p>
          <div className="imc__problemChips">
            <span>📜 Degrees</span>
            <span>📊 Certifications</span>
            <span>💼 Skill-building</span>
          </div>
          <div className="imc__problemAlert">
            <span className="imc__alertIcon">‼️</span>
            <p>
              <strong>But what about the most important commitment of our life — Marriage?</strong>
              <br />
              Many enter marriage underprepared, leading to avoidable conflicts,
              misunderstandings, and even breakdowns.
            </p>
          </div>
        </div>

        {/* ── Main content grid ────────────────────────────── */}
        <div className="imc__grid">
          {/* Learn ──────────────────────────────── */}
          <div className="imc__card imc__card--learn">
            <div className="imc__cardHead">
              <span className="imc__cardIcon">🎯</span>
              <h3>What You Will Learn</h3>
            </div>
            <ul className="imc__list">
              {LEARN_ITEMS.map((item, i) => (
                <li key={i}>
                  <span className="imc__check">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Who ──────────────────────────────────── */}
          <div className="imc__card imc__card--who">
            <div className="imc__cardHead">
              <span className="imc__cardIcon">🎯</span>
              <h3>Who Is This For?</h3>
            </div>
            <ul className="imc__whoList">
              {WHO_ITEMS.map((item, i) => (
                <li key={i}>
                  <span className="imc__whoIcon">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Qur'an quote ─────────────────────────────────── */}
        <div className="imc__quote">
          <div className="imc__quoteIcon">💡</div>
          <blockquote>
            Marriage is not just a contract…
            <br />
            It is a{" "}
            <strong>Mithaqan Ghaliza</strong>
            <br />
            <span className="imc__quoteRef">(Strong Covenant — Qur'an 4:21)</span>
          </blockquote>
        </div>

        {/* ── Future plans ─────────────────────────────────── */}
        <div className="imc__future">
          <div className="imc__futureHead">
            <span>⏰</span>
            <h3>Coming Soon — In Sha Allah</h3>
          </div>
          <p className="imc__futureSub">
            Plan is to upgrade to a paid course in the near future where:
          </p>
          <ul className="imc__futureList">
            {FUTURE_ITEMS.map((item, i) => (
              <li key={i}>
                <span className="imc__check">✅</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* ── CTA ──────────────────────────────────────────── */}
        <div className="imc__cta">
          <div className="imc__ctaText">
            <p className="imc__ctaHeadline">
              🤝 Let's strengthen marriages, protect families, and preserve faith.
            </p>
            <p className="imc__ctaSub">
              Your <strong>feedback</strong>, <strong>support</strong>, and{" "}
              <strong>voluntary contribution</strong> will help us improve and
              reach more people.
            </p>
            <p className="imc__ctaJazak">Jazakallahu khairan 🤲</p>
          </div>

          <div className="imc__ctaActions">
            {/* Enrolled stat — shown above button when count > 0 */}
            {enrollCount !== null && enrollCount > 0 && (
              <div className="imc__enrollStat">
                <span className="imc__enrollStatDot" />
                <span className="imc__enrollStatText">
                  <span className="imc__enrollStatNum">
                    {new Intl.NumberFormat("en-IN").format(enrollCount)}
                  </span>
                  {" "}people already enrolled
                </span>
              </div>
            )}
            <button
              className={`imc__ctaBtn imc__ctaBtn--primary ${enrolling ? "imc__ctaBtn--loading" : ""}`}
              onClick={handleEnroll}
              type="button"
              disabled={enrolling}
            >
              {enrolling ? "Opening…" : "Enroll Now — FREE"}
            </button>
            <button
              className="imc__ctaBtn imc__ctaBtn--share"
              onClick={handleShare}
              type="button"
            >
              📢 Share with loved ones
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
