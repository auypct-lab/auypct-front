import "./TrustSteps.css";

export default function TrustSteps() {
  return (
    <section className="steps" id="how">
      <div className="steps__inner">
        <h2>Built on Trust, Verified by Data</h2>
        <p>
          Our multi-layer verification process ensures that your contributions reach
          their destination with full transparency.
        </p>

        <div className="grid">
          <div className="item">
            <div className="ico">⬆️</div>
            <h4>Submit Request</h4>
            <p>Beneficiaries apply for scholarship, medical aid or support programs</p>
          </div>

          <div className="item line">
            <div className="ico">🔎</div>
            <h4>Verification & Audit</h4>
            <p>All documents and eligibility are verified by trust members</p>
          </div>

          <div className="item line">
            <div className="ico">☑️</div>
            <h4>Fund Allocation</h4>
            <p>Funds are allocated strictly based on genuine need and compliance.</p>
          </div>

          <div className="item line">
            <div className="ico">🔗</div>
            <h4>Impact Reporting</h4>
            <p>Every contribution is recorded and shared through financial summaries.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
