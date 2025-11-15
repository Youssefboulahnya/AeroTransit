
// import "./LogIn.css";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom"; // if you use react-router

// export default function LogIn() {
//   const [show, setShow] = useState("password");
//   const [ID_admin, setIDAdmin] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate?.() ?? (() => {}); // safe fallback if not using router

//   function handleCheckbox() {
//     setShow((prev) => (prev === "password" ? "text" : "password"));
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setError(null);

//     // basic client-side validation
//     if (!ID_admin || !password) {
//       setError("Please provide both ID and password.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/admin-login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ ID_admin, password }), // make sure backend expects these keys
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         // backend returned 4xx/5xx
//         setError(data.message || "Login failed");
//       } else {
        
//         navigate("/dashboard"); // requires react-router
//       }
//     } catch (err) {
//       setError("Network error — check your backend server or CORS settings");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="LogIn">
//       <div className="check_card">
//         <form onSubmit={handleSubmit}>
//           <h1>AeroTransit Management Login</h1>

//           <div className="label_input">
//             <label>Your ID</label>
//             <input
//               type="text"
//               placeholder="Your ID..."
//               value={ID_admin}
//               onChange={(e) => setIDAdmin(e.target.value)}
//             />
//           </div>

//           <div className="label_input">
//             <label>Your Password</label>
//             <input
//               type={show}
//               placeholder="Password..."
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <span style={{ display: "flex", alignItems: "center" }}>
//             <input
//               type="checkbox"
//               onClick={handleCheckbox}
//               className="password"
//             />
//             Show the serial
//           </span>

//           {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}

//           <div className="button_log_div">
//             <button type="submit" disabled={loading}>
//               {loading ? "Checking..." : "LogIn"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
import "./LogIn.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [show, setShow] = useState("password");
  const [ID_admin, setIDAdmin] = useState("");
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

    if (!ID_admin || !password) {
      setError("Please provide both ID and password.");
      return;
    }

    setLoading(true);

    try {
      
      const res = await fetch("http://127.0.0.1:8000/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ID_admin, password }),
      });
      console.log("data:",res);
    

      const data = await res.json();

      if (res.ok) {
        // ✅ Login success → go to /dashboard/Home
        navigate("/dashboard/Home");
      } else {
        setError(data.message || "Invalid ID or password.");
        navigate("/dashboard");
      }
    } catch (err) {
      setError("Network error — check your backend or CORS settings.");
      navigate("/dashboard"); // fallback in case of network failure
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
            <label>Your ID</label>
            <input
              type="text"
              placeholder="Your ID..."
              value={ID_admin}
              onChange={(e) => setIDAdmin(e.target.value)}
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
