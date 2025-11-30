import React from "react";
import "./Statistics.css";

export default function Statistics() {
  return (
    <div className="statistics section">
      <div className="sectionContainer container">
        <div className="statsContainer grid">
          <div className="singleStat">
            <span className="statNumber">5+</span>
            <span className="statLabel">Flights Available</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">1+</span>
            <span className="statLabel">Flights Arrived</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">23+</span>
            <span className="statLabel">Reservations</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">40+</span>
            <span className="statLabel">Passengers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
