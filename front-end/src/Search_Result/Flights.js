import React, { useEffect, useState } from "react";
import "./Flights.css";
import co_logo from "../pictures/iconV2.png";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api";

const Flights_infos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};

  const { origin, destination, departure, passengers, cabine, reservation_id } =
    searchParams;

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      if (!origin || !destination || !departure) return;

      setLoading(true);
      setError("");

      try {
        const res = await api.post("/flights/search", {
          coming_from: origin,
          going_to: destination,
          check_in: departure,
          passenger_nbr: passengers,
          class: cabine?.toLowerCase(),
          reservation_id,
        });

        if (res.data.flights.length === 0) {
          setError("No flights available for these criteria.");
        }

        setFlights(res.data.flights);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError(
          err.response?.data?.message ||
            "Something went wrong while fetching flights."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [origin, destination, departure, passengers, cabine, reservation_id]);

  const handleSelect = async (flight) => {
    try {
      // Call API to assign flight to the reservation
      await api.put(`/reservations/${reservation_id}/assign-flight`, {
        ID_flight: flight.ID_flight,
      });

      // Navigate to flight details page with all info
      navigate("/flight-details", {
        state: {
          ...flight,
          passengers: passengers || 1,
          cabine: cabine || "Economy",
          reservation_id,
        },
      });
    } catch (err) {
      console.error("Error assigning flight:", err);
      alert(
        err.response?.data?.message ||
          "Failed to assign flight to the reservation."
      );
    }
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

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Loading flights...
          </div>
        ) : error ? (
          <div
            className="no-flights"
            style={{ textAlign: "center", padding: "2rem" }}
          >
            <h3>{error}</h3>
            <p>Try changing your search criteria.</p>
          </div>
        ) : (
          flights.map((flight) => (
            <div key={flight.ID_flight} className="flight-card">
              <div className="flight-left">
                <img src={co_logo} alt="AeroTransit" className="flight-logo" />
                <div>
                  <strong>{flight.company || "AeroTransit"}</strong>
                  <p className="flight-info">
                    {flight.temps_aller} → {flight.temps_arriver}
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
