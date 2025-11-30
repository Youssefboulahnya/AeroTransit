
import React, { useEffect, useState } from "react";
import "./Statistics.css";
import api from "../api";

export default function Statistics() {
  const [stats, setStats] = useState({
    scheduledFlights: 0,
    arrivedFlights: 0,
    reservationsCount: 0,
    passengersCount: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard/stats");

      setStats({
        scheduledFlights: res.data.scheduled_flights || 0,
        arrivedFlights: res.data.arrived_flights || 0,
        reservationsCount: res.data.reservations_count || 0,
        passengersCount: res.data.passengers_count || 0,
      });
    } catch (err) {
      console.error("Error loading statistics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Loading statistics...
      </p>
    );
  }

  return (
    <div className="statistics section">
      <div className="sectionContainer container">
        <div className="statsContainer grid">
          <div className="singleStat">
            <span className="statNumber">{stats.scheduledFlights}+</span>
            <span className="statLabel">Flights Available</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">{stats.arrivedFlights}+</span>
            <span className="statLabel">Flights Arrived</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">{stats.reservationsCount}+</span>
            <span className="statLabel">Reservations</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">{stats.passengersCount}+</span>
            <span className="statLabel">Passengers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
