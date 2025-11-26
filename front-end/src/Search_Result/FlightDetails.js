import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import co_logo from "../pictures/iconV2.png";
import "./FlightDetails.css";

const CABINS = {
  Business: {
    label: "Business Class",
    multiplier: 1.4,
    desc: "Extra comfort, premium meals and lounge access.",
    baggage: [
      "1 cabin bag (8kg)",
      "2 checked bags (32kg each)",
      "Priority boarding",
      "Lounge access",
      "Fast track security",
    ],
    meals: "Premium halal meal available, hot meals, dessert, tea & coffee.",
    services: [
      "Wide seats with extra legroom",
      "Large entertainment screen",
      "Priority boarding",
      "USB & power outlet",
      "Premium customer service",
    ],
  },

  Economy: {
    label: "Economy Class",
    multiplier: 1.0,
    desc: "Standard seating with a free meal included.",
    baggage: ["1 cabin bag (8kg)", "1 checked bag (23kg)"],
    meals:
      "Standard halal-friendly meal available. Vegetarian option included.",
    services: [
      "Standard seating",
      "USB charging",
      "Music & Movies",
      "Reading light",
    ],
  },
};

const TAX_RATE = 0.1;

const FlightDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // ⭐ Fix : reconstruire flight correctement
  const { cabine, passengers, ...flight } = state;

  const selectedCabin = cabine || "Economy";

  const cabinData = CABINS[selectedCabin]; // ⭐ accès direct

  const pricing = useMemo(() => {
    const base = flight.price;
    const multiplier = cabinData.multiplier;

    const basePerPassenger = Math.round(base * multiplier);
    const subtotal = basePerPassenger * passengers;
    const taxes = Math.round(subtotal * TAX_RATE);
    const total = subtotal + taxes;

    return { basePerPassenger, subtotal, taxes, total };
  }, [flight, passengers, selectedCabin]);

  const handleNext = () => {
    navigate("/flight-passengers", {
      state: {
        booking: {
          flight,
          selectedCabin,
          passengers,
          pricing,
        },
      },
    });
  };

  return (
    <div className="details-page">
      {/* ---- TOP BAR ---- */}
      <div className="top-selected-bar">
        <img src={co_logo} alt="AeroTransit" className="top-selected-logo" />

        <div className="top-selected-text">
          <strong>AeroTransit</strong>
          <div className="small">
            {flight.temps_aller} → {flight.temps_arriver}
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
            <strong>Departure:</strong> {flight.temps_aller}
          </div>
          <div>
            <strong>Arrival:</strong> {flight.temps_arriver}
          </div>
          <div>
            <strong>Flight base price:</strong> {flight.price} €
          </div>
        </div>

        <div className="booking-controls">
          <div className="control">
            <label>Selected cabin</label>
            <div
              style={{
                padding: "0.5rem 0",
                fontWeight: "600",
                color: "var(--PrimaryColor)",
              }}
            >
              {cabinData.label}
            </div>
          </div>
        </div>
      </div>

      {/* ---- NEW SECTION : BAGGAGE / MEALS / SERVICES ---- */}
      <div className="details-extra">
        <h2>Cabin Benefits</h2>

        {/* Description */}
        <p className="muted">{cabinData.desc}</p>

        <div className="extra-grid">
          {/* BAGGAGE */}
          <div className="extra-card">
            <h3>Baggage Allowance</h3>
            <ul>
              {cabinData.baggage.map((b, i) => (
                <li key={i}>✔ {b}</li>
              ))}
            </ul>
          </div>

          {/* MEALS */}
          <div className="extra-card">
            <h3>Meals</h3>
            <p>{cabinData.meals}</p>
          </div>

          {/* SERVICES */}
          <div className="extra-card">
            <h3>On-board Services</h3>
            <ul>
              {cabinData.services.map((s, i) => (
                <li key={i}>✔ {s}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---- PRICE SUMMARY ---- */}
      <div className="fare-breakdown">
        <h3>Fare summary</h3>

        <div className="fare-row">
          Base ({pricing.basePerPassenger}€ × {passengers} passenger
          {passengers > 1 ? "s" : ""})<span>{pricing.subtotal} €</span>
        </div>

        <div className="fare-row">
          Taxes (10%) <span>{pricing.taxes} €</span>
        </div>

        <div className="fare-row total">
          Total <span>{pricing.total} €</span>
        </div>
      </div>

      <div className="bottom-actions">
        <button className="next-btn" onClick={handleNext}>
          Next — Passenger info
        </button>
      </div>
    </div>
  );
};

export default FlightDetails;
