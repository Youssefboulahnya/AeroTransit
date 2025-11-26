import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FlightPassengers.css";
import api from "../api"; 

const FlightPassengers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  const passengers = booking?.passengers || 0;
  const flight = booking?.flight;
  const selectedCabin = booking?.selectedCabin;

  const seatRange = useMemo(() => {
    if (selectedCabin === "Business") {
      return { min: 1, max: 20 };
    } else {
      return { min: 21, max: 60 };
    }
  }, [selectedCabin]);

  const initialForms = useMemo(() => {
    return Array.from({ length: passengers }, () => ({
      firstName: "",
      lastName: "",
      type: "Adult",
      idNumber: "",
      seat: "",
    }));
  }, [passengers]);

  const [forms, setForms] = useState([]);

  // Prevent reset
  useEffect(() => {
    if (forms.length === 0) {
      setForms(initialForms);
    }
  }, [initialForms]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (index, field, value) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  const handleNext = async () => {
    setError("");
    setLoading(true);

    try {
      const passengersPayload = forms.map((p) => ({
        first_name: p.firstName,
        last_name: p.lastName,
        type: p.type.toLowerCase(),
        Passport_ID: p.idNumber,
        Numero_place: p.seat ? parseInt(p.seat) : null,
      }));

      await api.post("/passengers/store", {
        reservation_ID: booking.reservation_id,
        Flight_ID: flight.ID_flight,
        passengers: passengersPayload,
      });

      await api.put(`/reservations/${booking.reservation_id}/email`, {
        email,
      });

      navigate("/payment", {
        state: { booking, passengersData: forms, email },
      });
    } catch (err) {
      console.error("Error storing passengers:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

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
        <span>Cabin: {selectedCabin}</span>
      </div>

      {error && (
        <div
          className="error-message"
          style={{
            color: "red",
            marginBottom: "1rem",
            textAlign: "center",
            margin: "0px 20px 10px 20px",
          }}
        >
          {error}
        </div>
      )}

      {forms.map((p, i) => {
        const allSeats = [];
        for (let s = seatRange.min; s <= seatRange.max; s++) allSeats.push(s);

        return (
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
                <label>Type</label>
                <select
                  value={p.type}
                  onChange={(e) => updateField(i, "type", e.target.value)}
                >
                  <option>Adult</option>
                  <option>Child</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select Seat</label>
                <input
                  type="number"
                  value={p.seat}
                  onChange={(e) => updateField(i, "seat", e.target.value)}
                  placeholder="ex:20"
                />
                {/* ---------------------------------------------------------------------- */}
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
          </div>
        );
      })}

      <div
        className="email-section"
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ textAlign: "center" }}>Contact Information</h3>
        <div className="form-group">
          <label>Email (tickets will be sent here)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="next-section">
        <button className="next-btn" onClick={handleNext} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment →"}
        </button>
      </div>
    </div>
  );
};

export default FlightPassengers;
