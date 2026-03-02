import { useMemo, useState } from "react";
import "./CategoryBreakdown.css";
import { CATEGORY_DATA } from "./CategoryData. js";



export default function CategoryBreakdown() {
  const [active, setActive] = useState("edu");
  const data = useMemo(() => CATEGORY_DATA[active], [active]);

  return (
    <section className="cat" id="category">
      <div className="cat__tabs">
        <button className={`tab ${active==="edu"?"active":""}`} onClick={()=>setActive("edu")}>Educational Scholarship</button>
        <button className={`tab ${active==="med"?"active":""}`} onClick={()=>setActive("med")}>Medical Aid</button>
        <button className={`tab ${active==="eps"?"active":""}`} onClick={()=>setActive("eps")}>Elderly Pension Scheme</button>
        <button className={`tab ${active==="self"?"active":""}`} onClick={()=>setActive("self")}>Self Empowerment</button>
        <button className={`tab ${active==="grocery"?"active":""}`} onClick={()=>setActive("grocery")}>Grocery Kit</button>
        <button className={`tab ${active==="disaster"?"active":""}`} onClick={()=>setActive("disaster")}>Disaster Relief</button>
      </div>

      <div className="yearCard">
        <div className="yearLeft" style={{ background: data.color }}>
          <div className="icoBox">{data.icon}</div>

         <h3 className="leftTitle">
  {data.title.split("\n")[0]} <br /> {data.title.split("\n")[1]}
</h3>

<p className="leftSubtitle">
  {data.subTitle}
</p>

          <div className="leftLine" />

          <p className="leftMuted">TOTAL AMOUNT</p>
          <h2 className="leftAmount">{data.amount}</h2>

          <div className="benefit">
            <div className="benefitIco">👥</div>
            <div>
              <p className="benefitMini">BENEFICIARIES</p>
              <h4 className="benefitNum">{data.beneficiaries}</h4>
            </div>
          </div>
        </div>

        <div className="yearRight">
          <div className="rtop">
            <p className="caps">YEARLY CONTRIBUTION BREAKDOWN</p>
            <div className="ghost" />
          </div>

          <div className="thead" style={{ background: data.head }}>
            <span>YEAR</span>
            <span>AMOUNT(₹)</span>
            <span>BENEFICIARIES</span>
          </div>

          <div className="tbody">
            {data.rows.map((r, idx) => (
              <div
                key={idx}
                className={`trow ${idx === data.highlightIndex ? "highlight" : ""}`}
              >
                <span>{r[0]}</span>
                <span className="num">{r[1]}</span>
                <span className="num">{r[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
