import { Link, useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./ActivityDetail.css";
import { ACTIVITIES } from "../../Components/Data/activityContent";
import { useMemo, useState } from "react";

export default function ActivityDetail() {
  const { slug } = useParams();
  const [openReport, setOpenReport] = useState(false);

  const activity = useMemo(
    () => ACTIVITIES.find((a) => a.slug === slug),
    [slug]
  );

  if (!activity) {
    return (
      <>
        <Navbar />
        <main className="detailPage">
          <div className="detailWrap">
            <h1>Activity not found</h1>
            <p className="muted">Please return to activities page.</p>
            <Link className="backBtn" to="/activities">← Back to Activities</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="detailPage">
        <section className="detailHero">
          <div className="detailHero__inner">
            <Link className="crumb" to="/activities">← Explore Activities</Link>
            <h1>{activity.title}</h1>
            <p className="tagline">{activity.heroTagline}</p>

            <div className="heroMedia">
              <img src={activity.images?.[0]} alt={activity.title} />
            </div>

            <div className="snapGrid">
              <div className="snapCard">
                <span>Total Amount</span>
                <b>{activity.impactSnapshot.totalAmount}</b>
              </div>
              <div className="snapCard">
                <span>Beneficiaries</span>
                <b>{activity.impactSnapshot.beneficiaries}</b>
              </div>
              <div className="snapCard">
                <span>Period</span>
                <b>{activity.impactSnapshot.period}</b>
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
                  {activity.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              </div>

              <div className="box">
                <h3>Who We Support</h3>
                <ul>
                  {activity.whoWeSupport.map((w) => <li key={w}>{w}</li>)}
                </ul>
              </div>
            </div>

            <h2>What We Do</h2>
            <ul className="list">
              {activity.whatWeDo.map((w) => <li key={w}>{w}</li>)}
            </ul>

            <h2>Transparency Promise</h2>
            <ul className="list">
              {activity.transparency.map((t) => <li key={t}>{t}</li>)}
            </ul>

            <div className="gallery">
              {activity.images?.slice(1).map((img) => (
                <img key={img} src={img} alt="AUYPCT activity" />
              ))}
            </div>

            <h2>How You Can Help</h2>
            <ul className="list">
              {activity.howYouCanHelp.map((h) => <li key={h}>{h}</li>)}
            </ul>

            {/* Collapsible report */}
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
                      {activity.yearWise.map((row) => (
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
              <h3>Support this cause</h3>
              <p>
                Every contribution is accounted for with transparent reporting and
                beneficiary updates.
              </p>
              <a className="primaryCta" href="/#support">Start Supporting Today</a>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </>
  );
}