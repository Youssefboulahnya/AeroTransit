import "./Manage.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Manage() {
  const [show, setShow] = useState("password");
  const [email, setEmail] = useState("");
  const [reservationId, setReservationId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleCheckbox() {
    setShow(show === "password" ? "text" : "password");
  }

  //fct handleLogin pour atteindre la reponce de l'api pour verifier les condition d'auth
  const handleLogin = async (e) => {

    e.preventDefault(); //on a deja vu ca en react pour empecher le submit de reloader la page

    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/reservation/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            reservation_ID: reservationId,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setErrorMessage(data.message || "Login failed.");
        return;
      }

//on a trouve deja un probleme ici pour cela on a fait trois forme(et deux noms la nomination juste est reservation_ID) de recevoire le id de la reservation 
      const returnedReservationId =
        data.reservation_ID ||
        data.reservation?.reservation_ID ||
        reservationId ||
        null;

      if (returnedReservationId) {
        try {
          localStorage.setItem("reservation_ID", returnedReservationId);
        } catch (err) {
          console.log(err);//j'ai l'utiliser au debut pour fixer erreur qui vienne depuis le back(nomminnation etait diffrenet entre back et front)
        }
      }
      try {
        localStorage.setItem("reservation_email", email);
      } 
      catch (err) {
        // ignore (car pas de probleme ici en avant le probleme ete pour le id)
      }

      // SUCCESS → redirect to ManageBooking page
      //l'email reste deja en front dans state email
      navigate("/Manage/dashboard", {
        state: {
          reservation_ID: returnedReservationId,
          email,
          reservation: data.reservation || null, //check routes 
        },
      });
    } 
    //l'envoi vers le back ne se fait pas 
    catch (error) {
      setErrorMessage("Connection error. Please try again.");
    }
  };

  return (
    <div className="Manage_">
      <div className="check_card">
        <form onSubmit={handleLogin}>
          <h1>Manage Your Flight</h1>

          <div className="label_input">
            <label>Your Email</label>
            <input
              type="email"
              placeholder="Your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="label_input">
            <label>Your Reservation Id</label>
            <input
              type={show}
              placeholder="Ex: 23788"
              value={reservationId}
              onChange={(e) => setReservationId(e.target.value)}
              required
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
          {/* soit connection failed or invalaid auth */}
          {errorMessage && (
            <p
              style={{
                color: "red",
                marginTop: "10px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {errorMessage}
            </p>
          )}

          <div className="button_log_div">
            <button type="submit">LogIn</button>
          </div>
        </form>
      </div>
    </div>
  );
}
