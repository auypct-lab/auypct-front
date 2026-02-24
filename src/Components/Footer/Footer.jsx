import logo from "../../assets/Images/logo.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__grid">
        <div className="brand">
          <div className="footer__brand">
  <img src={logo} alt="Logo" className="footer__logo" />
  <h3>AUYPCT</h3>
</div>

          <p>
           AU Young Professionals Charitable Trust (AU-YP-CT) is a registered public charitable trust established in 2015 by alumni of Anna University, Chennai.<br/>
          <span> We support education, medical aid, elderly welfare, entrepreneurship, and disaster relief with complete financial transparency.</span>
          </p>

          <div className="socials">
            <span>𝕏</span>
            <span>in</span>
            <span>⌂</span>
          </div>
        </div>

        <div className="col">
          <h4>EXPLORE</h4>
          <a href="#">Educational Scholarship</a>
          <a href="#">Medical Aid</a>
          <a href="#">Elderly Pension Scheme</a>
          <a href="#">Self Empowerment</a>
          <a href="#">Grocery Kit</a>
          <a href="#">Disaster Relief </a>
        </div>

        <div className="col">
          <h4>TRANSPARENCY</h4>
          <a href="#">Registration Details</a>
          <a href="#">12AA & 80G Certification</a>
          <a href="#">Financial Summary</a>
          <a href="#">Annual Impact Reports</a>
        </div>

        <div id="contact" className="col">
          <h4>CONTACT</h4>
          <a href="mailto:auyptrust@gmail.com">📧 auyptrust@gmail.com</a>
          <a href="tel:+916383248775">📞 +91 63832 48775</a>
          <a href="https://www.google.com/maps/search/?api=1&query=No.34-23/810%2C+Aatumanthai+Anjalkara+Street+Tanjavur+613001" target="_blank" rel="noopener noreferrer">📍 No.34-23/810, Aatumanthai Anjalkara Street, East Gate, Tanjavur – 613001</a>
        </div>

      </div>

      <div className="bottom">
        <p>© 2026 AUYPCT Crowdfunding. All rights reserved.</p>
        <div className="links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Donation Policy</a>
        </div>
      </div>
    </footer>
  );
}
