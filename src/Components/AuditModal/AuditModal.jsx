import { useEffect, useState } from "react";
import "./AuditModal.css";
import { fetchAuditByCampaign } from "../../services/api";

export default function AuditModal({ open, onClose, campaign }) {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!open || !campaign?._id) return;

    setLoading(true);
    setLogs([]);

    fetchAuditByCampaign(campaign._id)
      .then((res) => setLogs(Array.isArray(res.data) ? res.data : []))
      .catch((e) => {
        console.error(e);
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, [open, campaign]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="modal">
      <button className="modal__backdrop" onClick={onClose} aria-label="Close" />

      <div className="modal__panel" role="dialog" aria-modal="true">
        <div className="modal__head">
          <div>
            <h3 className="modal__title">Live Audit Trail</h3>
            <p className="modal__sub">{campaign?.title}</p>
          </div>
          <button className="modal__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal__body">
          {loading ? (
            <p className="muted">Loading audit updates…</p>
          ) : logs.length === 0 ? (
            <p className="muted">No audit updates yet.</p>
          ) : (
            <div className="auditList">
              {logs.map((l) => (
                <div className="auditItem" key={l._id}>
                  <div className="auditLeft">
                    <b className="auditTitle">{l.title}</b>
                    <div className="auditMeta">
                      {new Date(l.createdAt).toLocaleString()}
                      {l.type ? ` • ${l.type}` : ""}
                    </div>
                    {l.notes ? <div className="auditNotes">{l.notes}</div> : null}
                  </div>

                  <div className="auditRight">
                    <div className="auditAmt">
                      {l.amount ? `₹${Number(l.amount).toLocaleString("en-IN")}` : "—"}
                    </div>

                    <div className={`badge ${l.verified ? "ok" : "wait"}`}>
                      {l.verified ? "VERIFIED" : "PENDING"}
                    </div>

                    {l.documentUrl ? (
                      <a className="docLink" href={l.documentUrl} target="_blank" rel="noreferrer">
                        View Proof
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
