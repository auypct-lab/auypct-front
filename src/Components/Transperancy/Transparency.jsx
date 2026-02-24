import { useEffect, useMemo, useState } from "react";
import "./Transparency.css";
import API from "../../axios"; // ✅ make sure path is correct

export default function Transparency() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const { data } = await API.get("/campaigns"); // GET http://localhost:5000/api/campaigns
        setCampaigns(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load campaigns:", err);
        setCampaigns([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // totals from backend
  const totals = useMemo(() => {
    const goal = campaigns.reduce((sum, c) => sum + (Number(c.goalAmount) || 0), 0);
    const raised = campaigns.reduce((sum, c) => sum + (Number(c.raisedAmount) || 0), 0);
    const beneficiaries = campaigns.reduce(
      (sum, c) => sum + (Number(c.beneficiariesCount) || 0),
      0
    );

    const percent = goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;

    return { goal, raised, beneficiaries, percent };
  }, [campaigns]);

  return (
    <section className="trans" id="transparency">
      <div className="trans__left">
        <h2>
          Total Transparency
          <br />
          <span>Every Contribution Accounted</span>
        </h2>

        <p>
          We ensure complete accountability in every rupee received and disbursed. Our
          financial summaries and beneficiary data are publicly documented to maintain full
          transparency and donor confidence.
        </p>

        <div className="feature">
          <div className="feature__icon">✔</div>
          <div>
            <h4>Verified Financial Records</h4>
            <p>All major expenses must be backed by official digital receipts.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature__icon">👁</div>
          <div>
            <h4>Year-wise Fund Distribution</h4>
            <p>Year-wise fund distribution and public transaction summaries.</p>
          </div>
        </div>

        <div className="feature">
          <div className="feature__icon">🛡</div>
          <div>
            <h4>Government Compliance Certified</h4>
            <p>Registered trust with verified documentation and compliance records.</p>
          </div>
        </div>

        {/* OPTIONAL: show quick stats under features */}
        <div style={{ marginTop: 18, color: "#6b7280", fontWeight: 700 }}>
          {loading ? (
            <span>Loading live transparency data…</span>
          ) : (
            <span>
              Live total raised: ₹{totals.raised.toLocaleString("en-IN")} • Beneficiaries:{" "}
              {totals.beneficiaries.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      <div className="trans__right">
        <div className="proofHead">
          <h3>FUND DISTRIBUTION PROOF</h3>
          <span className="live">● LIVE UPDATES</span>
        </div>

        <div className="donut">
          <div className="donut__center">
            <h2>{loading ? "…" : `${totals.percent}%`}</h2>
            <p>ALLOCATED</p>
          </div>
        </div>

        {/* OPTIONAL: list latest campaigns (remove if not needed) */}
        {!loading && campaigns.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <p style={{ fontWeight: 900, marginBottom: 10 }}>Latest Campaigns</p>
            {campaigns.slice(0, 3).map((c) => (
              <div
                key={c._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0",
                  borderTop: "1px solid #eef2f7"
                }}
              >
                <span style={{ fontWeight: 800 }}>{c.title}</span>
                <span style={{ color: "#6b7280", fontWeight: 800 }}>
                  ₹{(c.raisedAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

