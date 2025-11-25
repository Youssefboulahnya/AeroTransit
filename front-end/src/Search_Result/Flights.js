import React, { useMemo } from "react";
import "./Flights.css";
import co_logo from "../pictures/iconV2.png";
import { useNavigate, useLocation } from "react-router-dom";
import { mockFlights } from "../data/mockFlights";

const Flights_infos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};

  const { origin, destination, departure, passengers, cabine } = searchParams;

  const filteredFlights = useMemo(() => {
    if (!origin || !destination || !departure) return [];

    return mockFlights.filter((flight) => {
      const matchOrigin = flight.origin.toLowerCase() === origin.toLowerCase();
      const matchDest =
        flight.destination.toLowerCase() === destination.toLowerCase();
      const matchDate = flight.departureDate === departure;

      return matchOrigin && matchDest && matchDate;
    });
  }, [origin, destination, departure]);

  const handleSelect = (flight) => {
    // Pass the flight AND the passenger count AND cabin to the next page
    navigate("/flight-details", {
      state: {
        ...flight,
        passengers: passengers || 1,
        cabine: cabine || "Economy",
      },
    });
  };

  return (
    <div className="flights-page">
      <div className="flights-container">
        <h2 className="title-center">Direct flights operated by AeroTransit</h2>

        <div
          className="search-summary"
          style={{ textAlign: "center", marginBottom: "20px", color: "#666" }}
        >
          Searching for: <strong>{origin}</strong> to{" "}
          <strong>{destination}</strong> on <strong>{departure}</strong> (
          {passengers} passengers)
        </div>

        {filteredFlights.length === 0 ? (
          <div
            className="no-flights"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <h3>No flights found for these dates.</h3>
            <p>
              Try changing your search criteria (e.g. Paris to London on
              2025-11-25).
            </p>
          </div>
        ) : (
          filteredFlights.map((flight) => (
            <div key={flight.id} className="flight-card">
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
          ))
        )}
      </div>
    </div>
  );
};

export default Flights_infos;
