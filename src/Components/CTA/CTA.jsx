import { useState } from "react";
import "./CTA.css";
import DonateModal from "../DonateModal/DonateModal";

export default function CTA({ defaultCampaign }) {
  const [openDonate, setOpenDonate] = useState(false);

  return (
    <>
      <section className="cta" id="support">
        <h2>Be Part of a Transparent Impact Movement</h2>
        <p>
          Your support helps educate students, care for elders, empower entrepreneurs
          and assist families during crises.
        </p>

        <div className="cta__actions">
          {/* 🔥 Button Opens Donate Popup */}
          <button
            className="btnPrimary"
            onClick={() => setOpenDonate(true)}
          >
            Start Supporting Today
          </button>
        </div>
      </section>

      {/* ✅ Donate Popup Only */}
      <DonateModal
        open={openDonate}
        onClose={() => setOpenDonate(false)}
        campaign={defaultCampaign}
      />
    </>
  );
}
