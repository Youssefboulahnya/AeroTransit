import "./Manage.css";
import { useState } from "react";
// import Background_image from "../pictures/get_in.png";
export default function Manage() {
  const [show, setShow] = useState("password");
  function handleCheckbox() {
    if (show === "password") {
      setShow("text");
    } else {
      setShow("password");
    }
  }
  return (
    <div className="Manage_">
      {/* <img src={Background_image} alt="" /> */}
      <div className="check_card">
        <form>
          <h1>Manage Your Flight</h1>
          <div className="label_input">
            <label>Your Email</label>
            <input type="email" placeholder="Your email..." />
          </div>
          <div className="label_input">
            <label>Your Reservation Id</label>
            <input type={show} placeholder="Ex: 23788" />
          </div>
          <span style={{ display: "flex", alignItems: "center" }}>
            <input type="checkbox" onClick={handleCheckbox} className="password"/>
            Show the serial
          </span>

          <div className="button_log_div">
            <button>LogIn</button>
          </div>
        </form>
      </div>
    </div>
  );
}
