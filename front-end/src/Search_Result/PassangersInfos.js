import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FlightPassengers.css";

const FlightPassengers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // 🟡 Booking récupéré AVANT TOUT RETURN
  const booking = state?.booking;

  // 🟡 Variables dérivées AVANT return
  const passengers = booking?.passengers || 0;
  const flight = booking?.flight;
  const selectedCabin = booking?.selectedCabin;

  // 🟢 Tous les hooks doivent être ici
  const initialForms = Array.from({ length: passengers }, () => ({
    firstName: "",
    lastName: "",
    age: "",
    type: "Adult",
    idNumber: "",
    email: "",
    seat: "",
  }));

  const [forms, setForms] = useState(initialForms);

  // ✔ Mise à jour d'un champ
  const updateField = (index, field, value) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  // ✔ Navigation vers choix des sièges
  const handleNext = () => {
    navigate("/seat-selection", {
      state: {
        booking,
        passengersData: forms,
      },
    });
  };

  // 🔴 Le return conditionnel DOIT être placé APRÈS les hooks
  if (!booking) {
    return (
      <div className="passenger-page">
        <h2>No booking data found.</h2>
      </div>
    );
  }

  return (
    <div className="passenger-page">
      <h2 className="title">Passengers Information</h2>

      <div className="flight-summary">
        <div>
          <strong>{flight.company}</strong> — {flight.departure} →{" "}
          {flight.arrival}
        </div>
        <span>Cabin: {selectedCabin}</span>
      </div>

      {forms.map((p, i) => (
        <div className="passenger-card" key={i}>
          <h3>Passenger {i + 1}</h3>

          <div className="form-row">
            <div className="form-group">
              <label>First name</label>
              <input
                type="text"
                value={p.firstName}
                onChange={(e) => updateField(i, "firstName", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Last name</label>
              <input
                type="text"
                value={p.lastName}
                onChange={(e) => updateField(i, "lastName", e.target.value)}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                value={p.age}
                onChange={(e) => updateField(i, "age", e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Type</label>
              <select
                value={p.type}
                onChange={(e) => updateField(i, "type", e.target.value)}
              >
                <option>Adult</option>
                <option>Child</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>ID / Passport number</label>
            <input
              type="text"
              value={p.idNumber}
              onChange={(e) => updateField(i, "idNumber", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email (ticket will be sent)</label>
            <input
              type="email"
              value={p.email}
              onChange={(e) => updateField(i, "email", e.target.value)}
            />
          </div>
        </div>
      ))}

      <div className="next-section">
        <button className="next-btn" onClick={handleNext}>
          Select seats →
        </button>
      </div>
    </div>
  );
};

export default FlightPassengers;
