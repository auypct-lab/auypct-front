import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Images/logo.png";
import RealTimeViews from "../RealTimeViews";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Close menu on resize to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 850) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent background scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ✅ Helper: scroll to section (works even if you are in /activities page)
  const goToSection = (id) => {
    setOpen(false);

    // If not on home, go home first then scroll
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 250);
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="nav">
      <div className="nav__inner">
        {/* Real-time views (small, left side) */}
        <div className="nav__views">
          <RealTimeViews small />
        </div>
        {/* Brand block: logo, title, tagline */}
        <div className="nav__brandBlock">
          <div className="nav__brand">
            <img src={logo} alt="Logo" className="nav__logo" />
          </div>
          <div className="nav__titleTag">
            <h1 className="nav__title">AU Young Professionals Charitable Trust</h1>
            <div className="nav__tagline">No one has ever become poor by giving</div>
          </div>
        </div>
        {/* Desktop links */}
        <nav className="nav__links">
          <Link to="/">Home</Link>
          {/* ✅ Explore opens separate page */}
          <Link to="/activities">Explore</Link>
          {/* ✅ Scroll sections */}
          <button
            type="button"
            className="nav__linkBtn"
            onClick={() => goToSection("transparency")}
          >
            Transparency
          </button>
          <button
            type="button"
            className="nav__linkBtn"
            onClick={() => goToSection("how")}
          >
            How it works
          </button>
        </nav>

        <div className="nav__actions">
          <button
            className="btn btn--primary btn--pill"
            onClick={() => goToSection("support")}
            type="button"
          >
            Start Supporting Today
          </button>

          <button
            className="btnDark"
            onClick={() => goToSection("contact")}
            type="button"
          >
            Contact Us
          </button>

          {/* Hamburger */}
          <button
            className={`hamburger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div className={`mobile ${open ? "mobile--open" : ""}`}>
        <button
          className="mobile__backdrop"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          type="button"
        />

        <div className="mobile__panel">
          {/* ✅ Explore separate page */}
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/activities" onClick={() => setOpen(false)}>Explore</Link>

          {/* ✅ Scroll sections */}
          <button type="button" onClick={() => goToSection("transparency")}>Transparency</button>
          <button type="button" onClick={() => goToSection("how")}>How it works</button>
          <button type="button" onClick={() => goToSection("contact")}>Contact Us</button>

          <button
            className="btn btn--primary btn--pill mobile__cta"
            type="button"
            onClick={() => goToSection("support")}
          >
            Start Supporting Today
          </button>
        </div>
      </div>
    </header>
  );
}


