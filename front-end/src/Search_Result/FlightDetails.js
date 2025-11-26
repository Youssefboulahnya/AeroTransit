import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import co_logo from "../pictures/iconV2.png";
import "./FlightDetails.css";

const CABINS = {
  Business: {
    label: "Business Class",
    serviceRate: 0.15,
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
    serviceRate: 0.05,
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

const FlightDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { cabine, passengers, children = 0, ...flight } = state;

  const selectedCabin = cabine || "Economy";
  const cabinData = CABINS[selectedCabin];

  // ⭐ Prix service (enfant gratuit)
  const pricing = useMemo(() => {
    const flightPrice = flight.price;
    const serviceRate = cabinData.serviceRate;

    const servicePerAdult = Math.round(flightPrice * serviceRate);
    const servicePerChild = 0; // ⭐ ENFANT GRATUIT

    return {
      servicePerAdult,
      servicePerChild,
    };
  }, [flight, selectedCabin]);

  const handleNext = () => {
    navigate("/flight-passengers", {
      state: {
        booking: {
          flight: {
            ...flight,
            departure: flight.temps_aller,
            arrival: flight.temps_arriver,
          },
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

      {/* ---- BENEFITS ---- */}
      <div className="details-extra">
        <h2>Cabin Benefits</h2>
        <p className="muted">{cabinData.desc}</p>

        <div className="extra-grid">
          <div className="extra-card">
            <h3>Baggage Allowance</h3>
            <ul>
              {cabinData.baggage.map((b, i) => (
                <li key={i}>✔ {b}</li>
              ))}
            </ul>
          </div>

          <div className="extra-card">
            <h3>Meals</h3>
            <p>{cabinData.meals}</p>
          </div>

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

      {/* ---- SERVICE PRICE (ADULT + CHILD FREE) ---- */}
      <div className="fare-breakdown">
        <h3>Cabin Services Price</h3>

        <div className="fare-row">
          Service price per adult ({pricing.servicePerAdult}€)
          <span>{pricing.servicePerAdult} €</span>
        </div>

        <div className="fare-row">
          Service price per child (free)
          <span>0 €</span>
        </div>

        <p style={{ marginTop: "10px", color: "#666", fontSize: "14px" }}>
          * These service fees apply <strong>per passenger</strong>.
        </p>
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
