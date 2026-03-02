import { useEffect, useState } from "react";
import "./DonateModal.css";
import { createDonation } from "../../services/api";


export default function DonateModal({ open, onClose, activities }) {
  const [msg, setMsg] = useState("");
  const [form, setForm] = useState({ donorName: "", donorPhone: "", amount: "" });
  const [selectedSlug, setSelectedSlug] = useState(activities?.[0]?.slug || "");

  useEffect(() => {
    if (!open) return;
    setMsg("");
    setForm({ donorName: "", donorPhone: "", amount: "" });
    setSelectedSlug(activities?.[0]?.slug || "");

    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose, activities]);

  const selectedActivity = activities?.find(a => a.slug === selectedSlug) || activities?.[0];

  const submitDonation = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      await createDonation({
        campaignId: selectedActivity?._id || selectedActivity?.slug,
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
            <select
              value={selectedSlug}
              onChange={e => setSelectedSlug(e.target.value)}
              style={{ padding: "10px", borderRadius: "10px", fontWeight: "bold", marginTop: "8px" }}
              aria-label="Select a cause to support"
            >
              {activities?.map(a => (
                <option key={a.slug} value={a.slug}>{a.title}</option>
              ))}
            </select>
            <p className="modal__sub">{selectedActivity?.title || "Choose a campaign"}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">
          {selectedActivity ? (
            <>
              <div className="donBox">
                <div className="donStat">
                  <span>Raised</span>
                  <b>₹{Number(selectedActivity.impactSnapshot?.totalAmount || 0).toLocaleString("en-IN")}</b>
                </div>
                <div className="donStat">
                  <span>Beneficiaries</span>
                  <b>{Number(selectedActivity.impactSnapshot?.beneficiaries || 0).toLocaleString("en-IN")}</b>
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