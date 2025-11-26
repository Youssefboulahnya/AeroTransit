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
    ],
    meals: "Halal meal available, premium meals with dessert.",
    services: ["Wide seats", "Entertainment screen", "Fast boarding"],
  },
  Economy: {
    label: "Economy Class",
    multiplier: 1.0,
    desc: "Standard seating with meal included.",
    baggage: ["1 cabin bag (8kg)", "1 checked bag (23kg)"],
    meals: "Standard halal-friendly meal available.",
    services: ["Standard seating", "USB charging"],
  },
};

const TAX_RATE = 0.1;

const FlightDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { flight, cabine, passengers } = state;

  const selectedCabin = cabine || "Economy";

  const pricing = useMemo(() => {
    const base = flight.price;
    const multiplier = CABINS[selectedCabin].multiplier;

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
            <div style={{ padding: "0.5rem 0", fontWeight: "600" }}>
              {CABINS[selectedCabin].label}
            </div>
          </div>
        </div>
      </div>

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
