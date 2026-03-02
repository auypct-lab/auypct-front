import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../axios";             // ✅ fixed path
import { setAuth } from "../../utils/adminAuth"; // ✅ fixed path
import "./Admin.css";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", { email, password });
      setAuth(res.data.token);
      nav("/admin/activities");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="adminShell">
      <div className="adminCard">
        <h1 className="adminTitle">Admin Login</h1>
        <p className="adminSub">AUYPCT Content Management</p>

        {err && <div className="adminErr">{err}</div>}

        <form onSubmit={onSubmit} className="adminForm">
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>

          <button className="adminBtn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

          {/* Tip removed as per update */}
      </div>
    </div>
  );
}