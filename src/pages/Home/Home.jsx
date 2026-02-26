import { useEffect, useState } from "react";
import { fetchCampaigns } from "../../services/api";

import Navbar from "../../Components/Navbar/Navbar.jsx";
import Hero from "../../Components/Hero/Hero.jsx";
import Trusted from "../../Components/Trusted/Trusted.jsx";
import Transparency from "../../Components/Transperancy/Transparency.jsx";
import FinanceBanner from "../../Components/FinanceBanner/FinanceBanner.jsx";
import CategoryBreakdown from "../../Components/CategoryBreakdown/CategoryBreakdown.jsx";
import TrustSteps from "../../Components/TrustSteps/TrustStep.jsx";
import CTA from "../../Components/CTA/CTA.jsx";
import Footer from "../../Components/Footer/Footer.jsx";



export default function Home() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns()
      .then((res) => {
        setCampaigns(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns:", err);
        setCampaigns([]);
      });
  }, []);

  // 🔥 Default campaign (first campaign from DB)
  const defaultCampaign = campaigns.length > 0 ? campaigns[0] : null;

  return (
    <>
      <Navbar />
      <Hero />
      <Trusted />
      <Transparency />
      {/* Pass campaign to FinanceBanner */}
      <FinanceBanner defaultCampaign={defaultCampaign} />
      <CategoryBreakdown />
      <TrustSteps />
      {/* Pass campaign to CTA */}
      <CTA defaultCampaign={defaultCampaign} />
      {/* ✅ Separate Note Section */}

      <Footer />
    </>
  );
}
