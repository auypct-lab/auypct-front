import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../axios";
import { clearAuth } from "../../utils/adminAuth";
import "./Admin.css";

const emptyCourse = {
  slug: "",
  title: "",
  tag: "",
  shortDesc: "",
  heroTitle: "",
  heroSubtitle: "",
  duration: "",
  mode: "",
  fee: "Free",
  coverImage: "",
  gallery: [],
  sections: [{ heading: "Overview", text: "" }]
};

export default function AdminCourses() {
  const nav = useNavigate();

  const [list, setList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(emptyCourse);
  const [mode, setMode] = useState("create"); // create | edit
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const isEdit = mode === "edit";

  const sorted = useMemo(
    () => [...list].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)),
    [list]
  );

  async function load() {
    setErr("");
    const res = await API.get("/courses");
    setList(res.data || []);
  }

  useEffect(() => {
    load().catch((e) => setErr(e?.response?.data?.message || "Failed to load courses"));
  }, []);

  function logout() {
    clearAuth();
    nav("/admin/login");
  }

  function startCreate() {
    setMode("create");
    setSelected(null);
    setForm(emptyCourse);
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
      duration: item.duration || "",
      mode: item.mode || "",
      fee: item.fee || "Free",
      coverImage: item.coverImage || "",
      gallery: item.gallery || [],
      sections: item.sections?.length ? item.sections : [{ heading: "Overview", text: "" }]
    });
    setMsg("");
    setErr("");
  }

  function setField(key, value) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  // ── Sections ──────────────────────────────────────────────────────────────────
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

  // ── Cover upload ──────────────────────────────────────────────────────────────
  async function uploadCover(file) {
    setErr("");
    setMsg("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await API.post("/courses/upload/cover", fd, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    setField("coverImage", res.data.url);
    setMsg("Cover uploaded.");
  }

  // ── Save ──────────────────────────────────────────────────────────────────────
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
        await API.put(`/courses/${selected._id}`, form);
        setMsg("Updated successfully.");
      } else {
        await API.post("/courses", form);
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

  // ── Delete ────────────────────────────────────────────────────────────────────
  async function onDelete(item) {
    const ok = confirm(`Delete "${item.title}"?`);
    if (!ok) return;
    setErr("");
    setMsg("");
    setLoading(true);
    try {
      await API.delete(`/courses/${item._id}`);
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
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside className="adminSide">
        <div className="adminBrand">
          <span className="adminShield">🎓</span>
          <div>
            <b>AUYPCT Admin</b>
            <div className="adminTiny">Manage Courses</div>
          </div>
        </div>

        <button className="adminSideBtn" onClick={startCreate} type="button">
          ＋ New Course
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
          {sorted.length === 0 && (
            <div className="adminListEmpty">No courses yet.</div>
          )}
        </div>

        <button className="adminLogout" onClick={logout} type="button">
          Logout
        </button>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="adminMain">
        <div className="adminTopBar">
          <h1>{isEdit ? "Edit Course" : "Create Course"}</h1>
          <div className="adminTopHint">
            Public URL: <b>/courses/{form.slug || "your-slug"}</b>
          </div>
        </div>

        {err && <div className="adminErr">{err}</div>}
        {msg && <div className="adminMsg">{msg}</div>}

        <form className="adminFormWide" onSubmit={onSave}>
          {/* ── Basic info ────────────────────────────────────────────────── */}
          <div className="grid2">
            <label>
              Slug (unique)
              <input
                value={form.slug}
                onChange={(e) => setField("slug", e.target.value.trim())}
                placeholder="digital-literacy-course"
              />
            </label>

            <label>
              Title
              <input
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Digital Literacy Course"
              />
            </label>

            <label>
              Tag / Category
              <input
                value={form.tag}
                onChange={(e) => setField("tag", e.target.value)}
                placeholder="Technology"
              />
            </label>

            <label>
              Short Description (card text)
              <input
                value={form.shortDesc}
                onChange={(e) => setField("shortDesc", e.target.value)}
                placeholder="Brief summary shown on the course card…"
              />
            </label>
          </div>

          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <div className="grid2">
            <label>
              Hero Title
              <input
                value={form.heroTitle}
                onChange={(e) => setField("heroTitle", e.target.value)}
                placeholder="Master the Digital World"
              />
            </label>

            <label>
              Hero Subtitle
              <input
                value={form.heroSubtitle}
                onChange={(e) => setField("heroSubtitle", e.target.value)}
                placeholder="Course intro line…"
              />
            </label>
          </div>

          {/* ── Course metadata ───────────────────────────────────────────── */}
          <div className="grid2">
            <label>
              Duration
              <input
                value={form.duration}
                onChange={(e) => setField("duration", e.target.value)}
                placeholder="e.g. 3 Months"
              />
            </label>

            <label>
              Mode
              <select
                value={form.mode}
                onChange={(e) => setField("mode", e.target.value)}
              >
                <option value="">--- Select Mode ---</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>

            <label>
              Fee
              <input
                value={form.fee}
                onChange={(e) => setField("fee", e.target.value)}
                placeholder="Free or ₹500"
              />
            </label>
          </div>

          {/* ── Cover image ───────────────────────────────────────────────── */}
          <div className="adminBlock">
            <div className="adminBlockHead">
              <h2>Cover Image</h2>
              <div className="adminTiny">Upload → stored in /public/uploads</div>
            </div>
            <div className="coverRow">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
              />
              {form.coverImage && (
                <a
                  className="adminLink"
                  href={`http://localhost:5000${form.coverImage}`}
                  target="_blank"
                  rel="noreferrer"
                >
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

          {/* ── Sections ─────────────────────────────────────────────────── */}
          <div className="adminBlock">
            <div className="adminBlockHead">
              <h2>Sections (Course Content)</h2>
              <button type="button" className="miniBtn" onClick={addSection}>
                + Add Section
              </button>
            </div>

            <div className="sections">
              {form.sections.map((s, i) => (
                <div className="sectionCard" key={i}>
                  <div className="sectionTop">
                    <b>Section {i + 1}</b>
                    {form.sections.length > 1 && (
                      <button
                        type="button"
                        className="miniBtn danger"
                        onClick={() => removeSection(i)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <label>
                    Heading
                    <input
                      value={s.heading}
                      onChange={(e) => updateSection(i, "heading", e.target.value)}
                    />
                  </label>
                  <label>
                    Content
                    <textarea
                      rows={5}
                      value={s.text}
                      onChange={(e) => updateSection(i, "text", e.target.value)}
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <div className="adminActions">
            {isEdit && (
              <button
                type="button"
                className="adminBtnOutline danger"
                onClick={() => onDelete(selected)}
                disabled={loading}
              >
                Delete Course
              </button>
            )}
            <button className="adminBtn" type="submit" disabled={loading}>
              {loading ? "Saving…" : isEdit ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
