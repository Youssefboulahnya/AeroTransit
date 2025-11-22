import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import co_logo from "../pictures/iconV2.png";
import "./FlightDetails.css";

/* ---- CABINS DATA ---- */
const CABINS = {
  Business: {
    label: "Business Class",
    multiplier: 1.4,
    desc: "Extra comfort, premium meals and lounge access.",
    baggage: [
      "1 cabin bag (8kg)",
      "2 checked bags (32kg each)",
      "Priority boarding",
    ],
    meals:
      "Halal meal available, premium meals with dessert, tea and coffee included.",
    services: [
      "Wide comfortable seats",
      "Entertainment screen",
      "Fast boarding",
      "USB & power outlet",
    ],
  },

  Economy: {
    label: "Economy Class",
    multiplier: 1.0,
    desc: "Standard seating with meal included.",
    baggage: ["1 cabin bag (8kg)", "1 checked bag (23kg)"],
    meals:
      "Standard halal-friendly meal available, vegetarian menu, soft drinks.",
    services: [
      "Standard seating",
      "USB charging",
      "Music & movies available",
      "Reading light",
    ],
  },
};

const TAX_RATE = 0.1;

/* ---- COMPONENT ---- */
const FlightDetails = () => {
  const { state: flight } = useLocation();
  const navigate = useNavigate();

  /* HOOKS — ALWAYS AT THE TOP */
  const [selectedCabin, setSelectedCabin] = useState("Economy");

  const pricing = useMemo(() => {
    if (!flight)
      return { basePerPassenger: 0, subtotal: 0, taxes: 0, total: 0 };

    const base = flight.price;
    const cabinMultiplier = CABINS[selectedCabin].multiplier;
    const basePerPassenger = Math.round(base * cabinMultiplier);

    const subtotal = basePerPassenger * 1; // always 1 passenger now
    const taxes = Math.round(subtotal * TAX_RATE);
    const total = subtotal + taxes;

    return { basePerPassenger, subtotal, taxes, total };
  }, [selectedCabin, flight]);

  /* SAFETY REDIRECT */
  if (!flight) {
    return (
      <div className="details-page">
        <h2>No flight selected.</h2>
      </div>
    );
  }

  const handleNext = () => {
    const bookingSummary = {
      flight,
      selectedCabin,
      passengers: 1, // always 1 passenger now
      seatPreference: "Any", // removed from UI but needed for next page
      pricing,
    };

    navigate("/flight-passengers", { state: { booking: bookingSummary } });
  };

  return (
    <div className="details-page">
      {/* ---- TOP BAR ---- */}
      <div className="top-selected-bar">
        <img src={co_logo} alt="AeroTransit" className="top-selected-logo" />

        <div className="top-selected-text">
          <strong>{flight.company}</strong>
          <div className="small">
            {flight.departure} → {flight.arrival}
          </div>
        </div>

        <div className="top-selected-right">
          <div className="small">Base price</div>
          <div className="price-small">{flight.price} €</div>
        </div>
      </div>

      {/* ---- BOOKING DETAILS ---- */}
      <div className="details-card">
        <h2>Booking details</h2>

        <div className="grid-row">
          <div>
            <strong>Departure:</strong> {flight.departure}
          </div>
          <div>
            <strong>Arrival:</strong> {flight.arrival}
          </div>
          <div>
            <strong>Flight base price:</strong> {flight.price} €
          </div>
        </div>

        {/* ---- CABIN CHOICE ---- */}
        <div className="booking-controls">
          <div className="control">
            <label>Select cabin</label>
            <div className="cabin-tabs">
              {["Business", "Economy"].map((c) => (
                <button
                  key={c}
                  className={`cabin-tab ${selectedCabin === c ? "active" : ""}`}
                  onClick={() => setSelectedCabin(c)}
                >
                  {CABINS[c].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- CABIN DETAILS ---- */}
      <div className="cabin-and-baggage">
        <div className="cabin-card">
          <h3>{CABINS[selectedCabin].label}</h3>
          <p className="muted">{CABINS[selectedCabin].desc}</p>

          <div className="fare-line">
            <div>Price / passenger</div>
            <div className="price-large">{pricing.basePerPassenger} €</div>
          </div>

          <div className="service-section">
            <h4>Meals</h4>
            <p>{CABINS[selectedCabin].meals}</p>

            <h4>On-board Services</h4>
            <ul>
              {CABINS[selectedCabin].services.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="baggage-card">
          <h3>Baggage Information</h3>
          <ul>
            {CABINS[selectedCabin].baggage.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
            <li>🧳 Extra baggage available for an additional fee.</li>
            <li>🔍 Security check required for electronics/liquids.</li>
          </ul>
        </div>
      </div>

      {/* ---- PRICE SUMMARY ---- */}
      <div className="fare-breakdown">
        <h3>Fare summary</h3>

        <div className="fare-row">
          <div>Base ({pricing.basePerPassenger}€ × 1 passenger)</div>
          <div>{pricing.subtotal} €</div>
        </div>

        <div className="fare-row">
          <div>Taxes & fees (10%)</div>
          <div>{pricing.taxes} €</div>
        </div>

        <div className="fare-row total">
          <div>Total</div>
          <div>{pricing.total} €</div>
        </div>
      </div>

      {/* ---- NEXT BUTTON ---- */}
      <div className="bottom-actions">
        <button className="next-btn" onClick={handleNext}>
          Next — Passenger info
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;
