import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import { fetchCourseBySlug } from "../../services/api";
import IslamicMarriageCourse from "../../Components/IslamicMarriageCourse/IslamicMarriageCourse.jsx";
import CourseRealTimeViews from "../../Components/CourseRealTimeViews/CourseRealTimeViews.jsx";
import "./CourseDetail.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ── Nikkah counselling detail page (static rich content) ─────────────────────
function NikkahCoursePage() {
  function handleShare() {
    const url = "https://mohammed-s-site-93a6.thinkific.com/courses/nikkah-counselling";
    if (navigator.share) {
      navigator.share({
        title: "FREE Islamic Marriage Course (Qur'an & Sunnah Based)",
        text: "A Comprehensive Islamic Marriage Counselling Course — 100% FREE!",
        url
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied! Share it with your friends & loved ones.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="crsDetail">
        {/* Breadcrumb */}
        <div className="crsDetailCrumbBar">
          <Link className="crsDetailCrumb" to="/courses">← Back to Courses</Link>
          <CourseRealTimeViews slug="nikkah-counselling" small />
        </div>
        {/* Full rich content component */}
        <IslamicMarriageCourse />
        {/* Share strip */}
        <div className="crsDetailShareStrip">
          <p>📢 <strong>Please share with your friends &amp; loved ones</strong> — this could benefit someone in sha Allah</p>
          <button className="crsDetailShareBtn" type="button" onClick={handleShare}>
            Share this Course
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Generic DB-backed detail page ─────────────────────────────────────────────
export default function CourseDetail() {
  const { slug } = useParams();

  // Render the special static page for the nikkah course
  if (slug === "nikkah-counselling") return <NikkahCoursePage />;

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (window.location.hash === "#enroll") {
      const el = document.getElementById("enroll-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [course]);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchCourseBySlug(slug)
      .then((res) => setCourse(res.data))
      .catch((err) => {
        if (err?.response?.status === 404) setNotFound(true);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  function toggleSection(i) {
    setOpenSections((prev) => ({ ...prev, [i]: !prev[i] }));
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="crsDetail">
          <div className="crsDetailLoading">
            <div className="crsSpinner" />
            <p>Loading course…</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !course) {
    return (
      <>
        <Navbar />
        <main className="crsDetail">
          <div className="crsDetailWrap">
            <h1>Course not found</h1>
            <p className="crsDetail__muted">This course may have been removed or the link is incorrect.</p>
            <Link className="crsBackBtn" to="/courses">← Back to Courses</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="crsDetail">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="crsDetailHero">
          <div className="crsDetailHero__inner">
            <Link className="crsDetailCrumb" to="/courses">← Back to Courses</Link>
            {course.tag && <div className="crsDetailBadge">{course.tag}</div>}
            <h1>{course.heroTitle || course.title}</h1>
            {course.heroSubtitle && <p className="crsDetailTagline">{course.heroSubtitle}</p>}
            <div className="crsDetailMeta">
              {course.duration && (
                <div className="crsDetailMetaCard">
                  <span className="crsDetailMetaIcon">⏱</span>
                  <div>
                    <div className="crsDetailMetaLabel">Duration</div>
                    <div className="crsDetailMetaVal">{course.duration}</div>
                  </div>
                </div>
              )}
              {course.mode && (
                <div className="crsDetailMetaCard">
                  <span className="crsDetailMetaIcon">📡</span>
                  <div>
                    <div className="crsDetailMetaLabel">Mode</div>
                    <div className="crsDetailMetaVal">{course.mode}</div>
                  </div>
                </div>
              )}
              {course.fee && (
                <div className="crsDetailMetaCard">
                  <span className="crsDetailMetaIcon">💰</span>
                  <div>
                    <div className="crsDetailMetaLabel">Fee</div>
                    <div className="crsDetailMetaVal">{course.fee}</div>
                  </div>
                </div>
              )}
            </div>
            {/* ── Real-time views widget ───────────────── */}
            <div className="crsDetailViewsRow">
              <CourseRealTimeViews slug={course.slug} />
            </div>
          </div>
          {course.coverImage && (
            <div className="crsDetailCover">
              <img src={`${API_BASE}${course.coverImage}`} alt={course.title} />
            </div>
          )}
        </section>

        {/* ── Body ─────────────────────────────────────────── */}
        <section className="crsDetailBody">
          <div className="crsDetailWrap">
            {course.shortDesc && <p className="crsDetailIntro">{course.shortDesc}</p>}
            {course.sections?.map((s, i) => (
              <div className="crsSection" key={i}>
                <button className="crsSection__toggle" type="button" onClick={() => toggleSection(i)}>
                  <span>{s.heading || `Section ${i + 1}`}</span>
                  <span className={`crsSection__arrow ${openSections[i] ? "open" : ""}`}>▼</span>
                </button>
                {openSections[i] && (
                  <div className="crsSection__body"><p>{s.text}</p></div>
                )}
              </div>
            ))}
            {course.gallery?.length > 0 && (
              <div className="crsDetailGallery">
                <h2>Gallery</h2>
                <div className="crsGalleryGrid">
                  {course.gallery.map((img, i) => (
                    <img key={i} src={`${API_BASE}${img}`} alt={`Gallery ${i + 1}`} />
                  ))}
                </div>
              </div>
            )}
            <div className="crsEnroll" id="enroll-section">
              <div className="crsEnroll__inner">
                <div className="crsEnroll__text">
                  <h2>Ready to enroll?</h2>
                  <p>This course is offered by AUYPCT as part of our community empowerment initiative.</p>
                </div>
                <div className="crsEnroll__actions">
                  <a className="crsEnroll__btn" href="mailto:auypctrust@gmail.com?subject=Course Enrollment Inquiry">
                    Contact to Enroll
                  </a>
                  <Link className="crsEnroll__btnGhost" to="/courses">Browse Other Courses</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
