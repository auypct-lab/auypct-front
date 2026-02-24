import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import "./ActivitiesPage.css";

import { Link } from "react-router-dom";

import eduImg from "../../assets/Activities/education.jpg";
import medImg from "../../assets/Activities/medical.jpg";
import epsImg from "../../assets/Activities/eps.jpg";
import groImg from "../../assets/Activities/grocery.jpg";
import disImg from "../../assets/Activities/disaster.jpg";
import empImg from "../../assets/Activities/empowerment.jpg";

// ✅ Added slug for each activity (important for /activities/:slug)
const ACTIVITIES = [
  {
    slug: "educational-scholarship",
    title: "Educational Scholarship",
    tag: "Education",
    desc:
      "Support students with fees, learning materials, and mentorship — with verified distribution proofs.",
    img: eduImg
  },
  {
    slug: "medical-aid",
    title: "Medical Aid",
    tag: "Medical",
    desc:
      "Help families manage urgent medical expenses with transparent invoices and verified records.",
    img: medImg
  },
  {
    slug: "elderly-pension-scheme-eps",
    title: "Elderly Pension Scheme (EPS)",
    tag: "EPS",
    desc:
      "Monthly support for elders with clear beneficiary tracking and year-wise fund breakdown.",
    img: epsImg
  },
  {
    slug: "grocery-kit",
    title: "Grocery Kit",
    tag: "Grocery",
    desc:
      "Essential ration distribution for families — tracked with verified delivery and beneficiary data.",
    img: groImg
  },
  {
    slug: "disaster-relief-fund",
    title: "Disaster Relief Fund",
    tag: "Disaster",
    desc:
      "Rapid help during floods/fire/accidents — every contribution documented with proof updates.",
    img: disImg
  },
  {
    slug: "self-empowerment",
    title: "Self Empowerment",
    tag: "Self Empowerment",
    desc:
      "Skills and livelihood support to help people become self-reliant with measurable outcomes.",
    img: empImg
  }
];

export default function ActivitiesPage() {
  return (
    <>
      <Navbar />

      <main className="actPage">
        <section className="actHero">
          <div className="actHero__inner">
            <h1>Explore Our Activities</h1>
            <p>
              Choose a cause and see how contributions turn into verified impact — with
              transparent proofs and beneficiary updates.
            </p>
            <div className="actHero__chips">
              <span>Verified</span>
              <span>Audit Trail</span>
              <span>Impact Reports</span>
            </div>
          </div>
        </section>

        <section className="actGridWrap">
          <div className="actGrid">
            {ACTIVITIES.map((a) => (
              <article className="actCard" key={a.slug}>
                <div className="actCard__img">
                  <img src={a.img} alt={a.title} />
                  <span className="actCard__tag">{a.tag}</span>
                </div>

                <div className="actCard__body">
                  <h3>{a.title}</h3>
                  <p>{a.desc}</p>

                  <div className="actCard__actions">
                    {/* ✅ NEW: Read more opens blog page */}
                    <Link className="actBtn" to={`/activities/${a.slug}`}>
                      Read More
                    </Link>

                    {/* Optional: keep these links if you want */}
                    <a className="actBtn actBtn--ghost" href="/#support">
                      Support this cause
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="actCTA">
          <div className="actCTA__box">
            <h2>Want proof-first crowdfunding?</h2>
            <p>
              Our system is designed for trust: invoices, audit trail, beneficiary updates,
              and public verification.
            </p>
            <a className="actPrimary" href="/#support">
              Start Supporting Today
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}