import React from "react";
import "./Flights.css";
import co_logo from "../pictures/iconV2.png";
import { useNavigate } from "react-router-dom";

const flightsData = [
  {
    company: "AeroTransit",
    departure: "19:00",
    arrival: "05:30",
    price: 510,
  },
  {
    company: "AeroTransit",
    departure: "08:35",
    arrival: "15:10",
    price: 625,
  },
  {
    company: "AeroTransit",
    departure: "05:30",
    arrival: "12:05",
    price: 530,
  },
  {
    company: "AeroTransit",
    departure: "06:00",
    arrival: "13:40",
    price: 560,
  },
];

const Flights_infos = () => {
  const navigate = useNavigate();

  const handleSelect = (flight) => {
    navigate("/flight-details", { state: flight });
  };

  return (
    <div className="flights-page">
      <div className="flights-container">
        <h2 className="title-center">Direct flights operated by AeroTransit</h2>

        {flightsData.map((flight, index) => (
          <div key={index} className="flight-card">
            <div className="flight-left">
              <img src={co_logo} alt="AeroTransit" className="flight-logo" />
              <div>
                <strong>{flight.company}</strong>
                <p className="flight-info">
                  {flight.departure} → {flight.arrival}
                </p>
              </div>
            </div>

            <div className="flight-right">
              <strong className="price">{flight.price} €</strong>
              <button
                className="select-btn"
                onClick={() => handleSelect(flight)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flights_infos;
