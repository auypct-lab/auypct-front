import { useEffect, useState } from "react";
import "./DonateModal.css";
import { createDonation } from "../../services/api";

export default function DonateModal({ open, onClose, campaign }) {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ donorName: "", donorPhone: "", amount: "" });

  useEffect(() => {
    if (!open) return;
    setMsg("");
    setForm({ donorName: "", donorPhone: "", amount: "" });

    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const submitDonation = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await createDonation({
        campaignId: campaign?._id,
        donorName: form.donorName,
        donorPhone: form.donorPhone,
        amount: Number(form.amount),
        paymentStatus: "Success"
      });

      setMsg("✅ Donation recorded. Thank you!");
      setForm({ donorName: "", donorPhone: "", amount: "" });
    } catch (err) {
      console.error(err);
      setMsg("❌ Donation failed. Try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="modal">
      <button className="modal__backdrop" onClick={onClose} aria-label="Close" />

      <div className="modal__panel" role="dialog" aria-modal="true">
        <div className="modal__head">
          <div>
            <h3 className="modal__title">Start Supporting Today</h3>
            <p className="modal__sub">{campaign?.title || "Choose a campaign"}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">
          {campaign?._id ? (
            <>
              <div className="donBox">
                <div className="donStat">
                  <span>Raised</span>
                  <b>₹{Number(campaign.raisedAmount || 0).toLocaleString("en-IN")}</b>
                </div>
                <div className="donStat">
                  <span>Goal</span>
                  <b>₹{Number(campaign.goalAmount || 0).toLocaleString("en-IN")}</b>
                </div>
                <div className="donStat">
                  <span>Beneficiaries</span>
                  <b>{Number(campaign.beneficiariesCount || 0).toLocaleString("en-IN")}</b>
                </div>
              </div>

              <form className="donForm" onSubmit={submitDonation}>
                <input
                  placeholder="Your Name"
                  value={form.donorName}
                  onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                  required
                />
                <input
                  placeholder="Phone (optional)"
                  value={form.donorPhone}
                  onChange={(e) => setForm({ ...form, donorPhone: e.target.value })}
                />
                <input
                  placeholder="Amount"
                  type="number"
                  min="1"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />

                <button type="submit" className="donBtn">Donate Now</button>
                {msg ? <p className="donMsg">{msg}</p> : null}
              </form>
            </>
          ) : (
            <p className="muted">No campaign selected.</p>
          )}
        </div>
      </div>
    </div>
  );
}