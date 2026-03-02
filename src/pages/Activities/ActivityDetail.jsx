import { Link, useParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";

import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./ActivityDetail.css";

import { ACTIVITIES } from "../../Components/Data/activityContent";
import API from "../../axios"; // ✅ make sure src/axios.js exists
import DonateModal from "../../Components/DonateModal/DonateModal";

export default function ActivityDetail() {
      const [donateOpen, setDonateOpen] = useState(false);
    // Scroll to 'Support this cause' section if hash is #support
    useEffect(() => {
      if (window.location.hash === '#support') {
        const el = document.getElementById('support-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, []);
  const { slug } = useParams();

  const [openReport, setOpenReport] = useState(false);

  // ✅ dynamic data state
  const [dbData, setDbData] = useState(null);
  const [loadingDb, setLoadingDb] = useState(true);

  const activity = useMemo(() => ACTIVITIES.find((a) => a.slug === slug), [slug]);

  // ✅ fetch only dynamic numbers/table from backend
  useEffect(() => {
    let mounted = true;
    setLoadingDb(true);

    API.get(`/api/activities/${slug}`)
      .then((res) => {
        if (mounted) setDbData(res.data);
      })
      .catch(() => {
        if (mounted) setDbData(null);
      })
      .finally(() => {
        if (mounted) setLoadingDb(false);
      });

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (!activity) {
    return (
      <>
        <Navbar />
        <main className="detailPage">
          <div className="detailWrap">
            <h1>Activity not found</h1>
            <p className="muted">Please return to activities page.</p>
            <Link className="backBtn" to="/activities">
              ← Back to Activities
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // ✅ helpers for formatting
  const formatINR = (n) =>
    typeof n === "number" ? `₹${n.toLocaleString("en-IN")}` : n;

  // ✅ dynamic override values (fallback to static if DB not available yet)
  const totalAmount =
    typeof dbData?.totalAmount === "number"
      ? formatINR(dbData.totalAmount)
      : activity.impactSnapshot?.totalAmount;

  const beneficiaries =
    typeof dbData?.totalBeneficiaries === "number"
      ? dbData.totalBeneficiaries
      : activity.impactSnapshot?.beneficiaries;

  const period = dbData?.period || activity.impactSnapshot?.period;

  // ✅ yearWise should be dynamic (fallback to static if needed)
  const yearWiseRows =
    Array.isArray(dbData?.yearWise) && dbData.yearWise.length > 0
      ? dbData.yearWise.map((r) => ({
          year: r.year,
          amount: formatINR(Number(r.amount)),
          beneficiaries: r.beneficiaries
        }))
      : activity.yearWise;

  return (
    <>
      <Navbar />

      <main className="detailPage">
        <section className="detailHero">
          <div className="detailHero__inner">
            <Link className="crumb" to="/activities">
              ← Explore Activities
            </Link>

            <h1>{activity.title}</h1>
            <p className="tagline">{activity.heroTagline}</p>

            <div className="heroMedia">
              <img src={activity.images?.[0]} alt={activity.title} />
            </div>

            <div className="snapGrid">
              <div className="snapCard">
                <span>Total Amount</span>
                <b>{loadingDb ? "Loading..." : totalAmount}</b>
              </div>

              <div className="snapCard">
                <span>Beneficiaries</span>
                <b>{loadingDb ? "Loading..." : beneficiaries}</b>
              </div>

              <div className="snapCard">
                <span>Period</span>
                <b>{loadingDb ? "Loading..." : period}</b>
              </div>
            </div>
          </div>
        </section>

        <section className="detailWrap">
          <article className="article">
            <h2>Overview</h2>
            <p>{activity.intro}</p>

            <div className="twoCol">
              <div className="box">
                <h3>Key Highlights</h3>
                <ul>
                  {activity.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="box">
                <h3>Who We Support</h3>
                <ul>
                  {activity.whoWeSupport.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <h2>What We Do</h2>
            <ul className="list">
              {activity.whatWeDo.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>

            <h2>Transparency Promise</h2>
            <ul className="list">
              {activity.transparency.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className="gallery">
              {activity.images?.slice(1).map((img) => (
                <img key={img} src={img} alt="AUYPCT activity" />
              ))}
            </div>

            <h2>How You Can Help</h2>
            <ul className="list">
              {activity.howYouCanHelp.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {/* ✅ Collapsible report (dynamic rows) */}
            <section className="report">
              <button
                type="button"
                className="report__toggle"
                onClick={() => setOpenReport((v) => !v)}
              >
                {openReport
                  ? "Hide Full Financial Report"
                  : "View Full Financial Report (Year-wise)"}
              </button>

              {openReport && (
                <div className="report__tableWrap">
                  <table className="report__table">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th>Amount</th>
                        <th>Beneficiaries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearWiseRows.map((row) => (
                        <tr key={row.year}>
                          <td>{row.year}</td>
                          <td>{row.amount}</td>
                          <td>{row.beneficiaries}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <div className="articleCta">
              <div id="support-section">
                <h3>Support this cause</h3>
                <p>
                  Every contribution is accounted for with transparent reporting and
                  beneficiary updates.
                </p>
                {/* <button className="primaryCta" onClick={() => setDonateOpen(true)}> */}
                  {/* Start Supporting Today */}
                {/* </button> */}
              </div>
              <DonateModal
                open={donateOpen}
                onClose={() => setDonateOpen(false)}
                campaign={{
                  ...activity,
                  _id: activity.slug, // fallback id
                  title: activity.title,
                  raisedAmount: dbData?.totalAmount || undefined,
                  goalAmount: dbData?.goalAmount || undefined,
                  beneficiariesCount: dbData?.totalBeneficiaries || undefined
                }}
              />
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}