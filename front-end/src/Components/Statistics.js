import React from "react";
import "./Statistics.css";

export default function Statistics() {
  return (
    <div className="statistics section">
      <div className="sectionContainer container">
        <div className="statsContainer grid">

          <div className="singleStat">
            <span className="statNumber">1000+</span>
            <span className="statLabel">Flights Booked</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">950+</span>
            <span className="statLabel">Flights Completed</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">5000+</span>
            <span className="statLabel">Reservations</span>
          </div>

          <div className="singleStat">
            <span className="statNumber">20000+</span>
            <span className="statLabel">Passengers</span>
          </div>
          
        </div>
      </div>
    </div>
  );
}
