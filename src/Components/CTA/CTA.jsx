import { useState } from "react";
import "./CTA.css";
import DonateModal from "../DonateModal/DonateModal";

import { ACTIVITIES } from "../Data/activityContent";

export default function CTA() {
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
          <button
            className="btnPrimary"
            onClick={() => setOpenDonate(true)}
          >
            Start Supporting Today
          </button>
        </div>
      </section>

      <DonateModal
        open={openDonate}
        onClose={() => setOpenDonate(false)}
        activities={ACTIVITIES}
      />
    </>
  );
}
