import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../axios";
import { clearAuth } from "../../utils/adminAuth";
import "./Admin.css";

const emptyActivity = {
  slug: "",
  title: "",
  tag: "",
  shortDesc: "",
  heroTitle: "",
  heroSubtitle: "",
  coverImage: "",
  gallery: [],
  sections: [{ heading: "Overview", text: "" }],
  yearWise: []
};

export default function AdminActivities() {
  const nav = useNavigate();

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null); // activity object
  const [form, setForm] = useState(emptyActivity);
  const [mode, setMode] = useState("create"); // create | edit
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const isEdit = mode === "edit";

  const sorted = useMemo(() => {
    return [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
  }, [list]);

  async function load() {
    setErr("");
    const res = await API.get("/activities");
    setList(res.data || []);
  }

  useEffect(() => {
    load().catch((e) => setErr(e?.response?.data?.message || "Failed to load"));
  }, []);

  function logout() {
    clearAuth();
    nav("/admin/login");
  }

  function startCreate() {
    setMode("create");
    setSelected(null);
    setForm(emptyActivity);
    setMsg("");
    setErr("");
  }

  function startEdit(item) {
    setMode("edit");
    setSelected(item);
    setForm({
      slug: item.slug || "",
      title: item.title || "",
      tag: item.tag || "",
      shortDesc: item.shortDesc || "",
      heroTitle: item.heroTitle || "",
      heroSubtitle: item.heroSubtitle || "",
      coverImage: item.coverImage || "",
      gallery: item.gallery || [],
      sections: item.sections?.length ? item.sections : [{ heading: "Overview", text: "" }],
      yearWise: item.yearWise || []
    });
    setMsg("");
    setErr("");
  }

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function updateSection(i, key, value) {
    setForm((p) => {
      const sections = [...p.sections];
      sections[i] = { ...sections[i], [key]: value };
      return { ...p, sections };
    });
  }

  function addSection() {
    setForm((p) => ({
      ...p,
      sections: [...p.sections, { heading: "New Section", text: "" }]
    }));
  }

  function removeSection(i) {
    setForm((p) => ({
      ...p,
      sections: p.sections.filter((_, idx) => idx !== i)
    }));
  }

  function addYearRow() {
    setForm((p) => ({
      ...p,
      yearWise: [...p.yearWise, { year: "", amount: 0, beneficiaries: 0 }]
    }));
  }

  function updateYearRow(i, key, value) {
    setForm((p) => {
      const yearWise = [...p.yearWise];
      yearWise[i] = { ...yearWise[i], [key]: value };
      return { ...p, yearWise };
    });
  }

  function removeYearRow(i) {
    setForm((p) => ({
      ...p,
      yearWise: p.yearWise.filter((_, idx) => idx !== i)
    }));
  }

  async function uploadCover(file) {
    setErr("");
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);

    const res = await API.post("/activities/upload/cover", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setField("coverImage", res.data.url);
    setMsg("Cover uploaded.");
  }

  async function onSave(e) {
    e.preventDefault();
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      if (!form.slug || !form.title) {
        setErr("Slug and Title are required.");
        return;
      }

      if (isEdit) {
        await API.put(`/activities/${selected._id}`, form);
        setMsg("Updated successfully.");
      } else {
        await API.post("/activities", form);
        setMsg("Created successfully.");
      }

      await load();
      startCreate();
    } catch (error) {
      setErr(error?.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete(item) {
    const ok = confirm(`Delete "${item.title}"?`);
    if (!ok) return;

    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await API.delete(`/activities/${item._id}`);
      setMsg("Deleted.");
      await load();
      startCreate();
    } catch (error) {
      setErr(error?.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adminLayout">
      <aside className="adminSide">
        <div className="adminBrand">
          <span className="adminShield">🛡️</span>
          <div>
            <b>AUYPCT Admin</b>
            <div className="adminTiny">Manage Activities Content</div>
          </div>
        </div>

        <button className="adminSideBtn" onClick={startCreate} type="button">
          ＋ New Activity
        </button>

        <div className="adminList">
          {sorted.map((item) => (
            <div
              key={item._id}
              className={`adminListItem ${selected?._id === item._id ? "active" : ""}`}
              onClick={() => startEdit(item)}
              role="button"
              tabIndex={0}
            >
              <div className="adminListTitle">{item.title}</div>
              <div className="adminListMeta">/{item.slug}</div>
            </div>
          ))}
        </div>

        <button className="adminLogout" onClick={logout} type="button">
          Logout
        </button>
      </aside>

      <main className="adminMain">
        <div className="adminTopBar">
          <h1>{isEdit ? "Edit Activity" : "Create Activity"}</h1>
          <div className="adminTopHint">
            Public URL:{" "}
            <b>
              /activities/{form.slug || "your-slug"}
            </b>
          </div>
        </div>

        {err && <div className="adminErr">{err}</div>}
        {msg && <div className="adminMsg">{msg}</div>}

        <form className="adminFormWide" onSubmit={onSave}>
          <div className="grid2">
            <label>
              Slug (unique)
              <input value={form.slug} onChange={(e) => setField("slug", e.target.value.trim())} placeholder="educational-scholarship" />
            </label>

            <label>
              Title
              <input value={form.title} onChange={(e) => setField("title", e.target.value)} placeholder="Educational Scholarship" />
            </label>

            <label>
              Tag
              <input value={form.tag} onChange={(e) => setField("tag", e.target.value)} placeholder="Education" />
            </label>

            <label>
              Short Description (Card text)
              <input value={form.shortDesc} onChange={(e) => setField("shortDesc", e.target.value)} placeholder="Short summary for card..." />
            </label>
          </div>

          <div className="grid2">
            <label>
              Hero Title
              <input value={form.heroTitle} onChange={(e) => setField("heroTitle", e.target.value)} placeholder="Explore Our Activities" />
            </label>

            <label>
              Hero Subtitle
              <input value={form.heroSubtitle} onChange={(e) => setField("heroSubtitle", e.target.value)} placeholder="Blog intro line..." />
            </label>
          </div>

          <div className="adminBlock">
            <div className="adminBlockHead">
              <h2>Cover Image</h2>
              <div className="adminTiny">Upload → stored in backend /public/uploads</div>
            </div>

            <div className="coverRow">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
              />
              {form.coverImage && (
                <a className="adminLink" href={`http://localhost:5000${form.coverImage}`} target="_blank" rel="noreferrer">
                  View
                </a>
              )}
            </div>

            {form.coverImage && (
              <div className="coverPreview">
                <img src={`http://localhost:5000${form.coverImage}`} alt="Cover" />
              </div>
            )}
          </div>

          <div className="adminBlock">
            <div className="adminBlockHead">
              <h2>Sections (Blog Content)</h2>
              <button type="button" className="miniBtn" onClick={addSection}>+ Add Section</button>
            </div>

            <div className="sections">
              {form.sections.map((s, i) => (
                <div className="sectionCard" key={i}>
                  <div className="sectionTop">
                    <b>Section {i + 1}</b>
                    {form.sections.length > 1 && (
                      <button type="button" className="miniBtn danger" onClick={() => removeSection(i)}>
                        Remove
                      </button>
                    )}
                  </div>

                  <label>
                    Heading
                    <input value={s.heading} onChange={(e) => updateSection(i, "heading", e.target.value)} />
                  </label>

                  <label>
                    Content
                    <textarea rows={5} value={s.text} onChange={(e) => updateSection(i, "text", e.target.value)} />
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="adminBlock">
            <div className="adminBlockHead">
              <h2>Year-wise Report</h2>
              <button type="button" className="miniBtn" onClick={addYearRow}>+ Add Year</button>
            </div>

            <div className="yearTableWrap">
              <table className="yearTable">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Amount (number)</th>
                    <th>Beneficiaries</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {form.yearWise.map((r, i) => (
                    <tr key={i}>
                      <td>
                        <input value={r.year} onChange={(e) => updateYearRow(i, "year", e.target.value)} placeholder="2019 - 2020" />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={r.amount}
                          onChange={(e) => updateYearRow(i, "amount", Number(e.target.value))}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={r.beneficiaries}
                          onChange={(e) => updateYearRow(i, "beneficiaries", Number(e.target.value))}
                        />
                      </td>
                      <td>
                        <button type="button" className="miniBtn danger" onClick={() => removeYearRow(i)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!form.yearWise.length && (
                    <tr>
                      <td colSpan={4} className="emptyCell">No year rows yet. Click “Add Year”.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="adminActions">
            {isEdit && (
              <button type="button" className="adminBtnOutline danger" onClick={() => onDelete(selected)} disabled={loading}>
                Delete Activity
              </button>
            )}

            <button className="adminBtn" type="submit" disabled={loading}>
              {loading ? "Saving..." : isEdit ? "Update Activity" : "Create Activity"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}