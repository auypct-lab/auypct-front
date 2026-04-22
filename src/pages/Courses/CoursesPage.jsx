import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { fetchCourses } from "../../services/api";
import "./CoursesPage.css";
import courseCardImg from "../../assets/Images/islamic-course-pic.jpg";

// ── Hardcoded featured course card ────────────────────────────────────────────
const FEATURED_COURSE = {
  slug: "nikkah-counselling",
  title: "Islamic Marriage Course",
  tag: "Marriage & Family",
  shortDesc:
    "A comprehensive Islamic marriage counselling course rooted in the Qur'an and Sunnah — designed to prepare you before and after marriage.",
  duration: "Self-Paced",
  mode: "Online",
  fee: "FREE",
  featured: true
};

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then((res) => setCourses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />

      <main className="crsPage">
        {/* ── Hero ───────────────────────────────────────── */}
        <section className="crsHero">
          <div className="crsHero__inner">
            <div className="crsHero__badge">🎓 AUYPCT Courses</div>
            <h1>Skill-Building for a Better Tomorrow</h1>
            <p>
              Discover free and affordable courses designed to empower
              communities — with verified instructors, transparent outcomes, and
              real-world impact.
            </p>
            <div className="crsHero__chips">
              <span>✅ Verified</span>
              <span>📚 Skill-Based</span>
              <span>🌐 Self-Paced</span>
              <span>🤝 Community-Driven</span>
            </div>

          </div>
        </section>

        {/* ── Grid ───────────────────────────────────────── */}
        <section className="crsGridWrap">
          <div className="crsGrid">

            {/* ── Featured hardcoded card (always first) ── */}
            <article className="crsCard crsCard--featured">
              <div className="crsCard__img">
                <img src={courseCardImg} alt="Islamic Marriage Course" />
                <span className="crsCard__tag">Marriage &amp; Family</span>
                <span className="crsCard__featurePill">🚨 New Launch</span>
              </div>
              <div className="crsCard__body">
                <h3>{FEATURED_COURSE.title}</h3>
                <p>{FEATURED_COURSE.shortDesc}</p>
                <div className="crsCard__meta">
                  <span className="crsBadge crsBadge--blue">⏱ {FEATURED_COURSE.duration}</span>
                  <span className="crsBadge crsBadge--green">📡 {FEATURED_COURSE.mode}</span>
                  <span className="crsBadge crsBadge--emerald">🎁 {FEATURED_COURSE.fee}</span>
                </div>
                <div className="crsCard__actions">
                  <Link className="crsBtn" to={`/courses/${FEATURED_COURSE.slug}`}>
                    View Course
                  </Link>
                  <a
                    className="crsBtn crsBtn--ghost"
                    href="https://mohammed-s-site-93a6.thinkific.com/courses/nikkah-counselling"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Enroll Free
                  </a>
                </div>
              </div>
            </article>

            {/* ── DB courses ─────────────────────────────── */}
            {loading && (
              <div className="crsEmpty">
                <div className="crsSpinner" />
                <p>Loading courses…</p>
              </div>
            )}

            {!loading &&
              courses.map((c) => (
                <article className="crsCard" key={c._id}>
                  <div className="crsCard__img">
                    {c.coverImage ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}${c.coverImage}`}
                        alt={c.title}
                      />
                    ) : (
                      <div className="crsCard__placeholder">🎓</div>
                    )}
                    {c.tag && <span className="crsCard__tag">{c.tag}</span>}
                  </div>
                  <div className="crsCard__body">
                    <h3>{c.title}</h3>
                    <p>{c.shortDesc || "No description provided."}</p>
                    <div className="crsCard__meta">
                      {c.duration && <span className="crsBadge crsBadge--blue">⏱ {c.duration}</span>}
                      {c.mode && <span className="crsBadge crsBadge--green">📡 {c.mode}</span>}
                      {c.fee && <span className="crsBadge crsBadge--purple">💰 {c.fee}</span>}
                    </div>
                    <div className="crsCard__actions">
                      <Link className="crsBtn" to={`/courses/${c.slug}`}>Learn More</Link>
                      <Link className="crsBtn crsBtn--ghost" to={`/courses/${c.slug}#enroll`}>Enroll Now</Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* ── Bottom CTA ─────────────────────────────────── */}
        <section className="crsCTA">
          <div className="crsCTA__box">
            <h2>Want to sponsor a course?</h2>
            <p>
              Help us bring quality education to underserved communities.
              Every contribution is fully transparent with verified reports.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
