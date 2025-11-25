import "./LogIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // your Axios instance

export default function LogIn() {
  const [show, setShow] = useState("password");
  const [Email_admin, setEmailAdmin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleCheckbox() {
    setShow((prev) => (prev === "password" ? "text" : "password"));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!Email_admin || !password) {
      setError("Please provide both ID and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/admin-login", {
        Email_admin,
        password,
      });

      const data = res.data;

      if (res.status === 200 && data.message === "Access granted!") {
        //  Save admin email in localStorage
        // ############################################# faut savoir que ca
        localStorage.setItem("admin_email", Email_admin);  

        // Login success → go to dashboard home
        navigate("/dashboard/Home");
      } else {
        setError(data.message || "Invalid ID or password.");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Invalid ID or password.");
      } else {
        setError("Network error — check your backend or CORS settings.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="LogIn">
      <div className="check_card">
        <form onSubmit={handleSubmit}>
          <h1>AeroTransit Management Login</h1>

          <div className="label_input">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Your email..."
              value={Email_admin}
              onChange={(e) => setEmailAdmin(e.target.value)}
            />
          </div>

          <div className="label_input">
            <label>Your Password</label>
            <input
              type={show}
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <span style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              onClick={handleCheckbox}
              className="password"
            />
            Show the serial
          </span>

          {error && (
            <div style={{ color: "red", marginTop: 8, fontWeight: "500" }}>
              {error}
            </div>
          )}

          <div className="button_log_div">
            <button type="submit" disabled={loading}>
              {loading ? "Checking..." : "LogIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
