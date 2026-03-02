// import { useState } from "react";
// import "./FinanceBanner.css";
// import AuditModal from "../AuditModal/AuditModal";

// function FinanceBanner({ defaultCampaign }) {
//   const [openAudit, setOpenAudit] = useState(false);

//   return (
//     <>
//       <section className="fin">
//         <div className="fin__top">
//           <div className="fin__title">
//             <span className="fin__icon" aria-hidden="true">🧾</span>
//             <h3>Financial & Beneficiary Summary</h3>
//           </div>

//           {/* 🔥 Button Now Opens Audit Modal */}
//           <button
//             type="button"
//             className="fin__pill"
//             onClick={() => setOpenAudit(true)}
//           >
//             LIVE AUDIT TRAIL
//           </button>
//         </div>

//         <div className="fin__body">
//           <div className="fin__overlay">
//             <h4>
//               Proving every impact with clear financial records and beneficiary data.
//             </h4>
//             <div className="fin__note">
//               Our commitment to transparency means providing a granular breakdown of how
//               funds are allocated across all sectors.
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ✅ Audit Popup Only */}
//       <AuditModal
//         open={openAudit}
//         onClose={() => setOpenAudit(false)}
//         campaign={defaultCampaign}
//       />
//     </>
//   );
// }

// export default FinanceBanner;