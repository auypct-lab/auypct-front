import "./Hero.css";
import { useNavigate } from "react-router-dom";



export default function Hero() {
  const navigate = useNavigate(); 
  return (
    <section className="hero" id="discover">
      <div className="hero__badge">✓ Verified & Registered Charitable Trust.</div>
       <div className="hero__badge">AU-YP-CT is officially registered (Reg. No: 201500130) and approved under Form 12AA & 80G of the Income Tax Department, Government of India</div>

      <h1 className="hero__title">
        Fund Education. Support Lives. Empower Futures. 
        {/* <span>No one has ever become poor by giving.</span> */}
      </h1>

      <p className="hero__sub">
        AU Young Professionals Charitable Trust (AU-YP-CT) is a registered public charitable trust established in 2015 by alumni of Anna University, Chennai. Our mission is to support deserving and needy individuals through Education, Medical aid, Elderly support, Entrepreneurship, Grocery Kit and Disaster relief programs.
      </p>

      <div className="hero__actions">
        <button
  className="btnPrimary"
  onClick={() => navigate("/activities")}>
  Explore Our Activities
</button>
        <a href="#category" className="hero__btn hero__btn--outline">View Financial Transparency</a>
      </div>
    </section>
  );
}

