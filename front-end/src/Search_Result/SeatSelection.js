import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SeatSelection.css";

// Mock occupied seats (these would come from backend in real app)
const OCCUPIED_SEATS = [3, 7, 12, 15, 25, 30, 35, 45, 50];

const SeatSelection = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const passengersData = state?.passengersData || [];
  const email = state?.email || "";

  const selectedCabin = booking?.selectedCabin || "Economy";
  const numPassengers = passengersData.length;

  // Determine seat range based on cabin
  const seatRange = useMemo(() => {
    if (selectedCabin === "Business") {
      return { min: 1, max: 20 };
    } else {
      return { min: 21, max: 60 };
    }
  }, [selectedCabin]);

  // Initialize seat selections
  const [selectedSeats, setSelectedSeats] = useState(
    Array(numPassengers).fill("")
  );

  // Get available seats for a specific passenger
  const getAvailableSeats = (passengerIndex) => {
    const allSeats = [];
    for (let i = seatRange.min; i <= seatRange.max; i++) {
      allSeats.push(i);
    }

    // Filter out occupied seats and seats selected by other passengers
    return allSeats.filter((seat) => {
      const isOccupied = OCCUPIED_SEATS.includes(seat);
      const isSelectedByOther = selectedSeats.some(
        (s, idx) => idx !== passengerIndex && s === seat
      );
      return !isOccupied && !isSelectedByOther;
    });
  };

  const handleSeatChange = (passengerIndex, seatNumber) => {
    const updated = [...selectedSeats];
    updated[passengerIndex] = seatNumber;
    setSelectedSeats(updated);
  };

  const handleConfirm = () => {
    // Add seat numbers to passenger data
    const passengersWithSeats = passengersData.map((p, i) => ({
      ...p,
      seat: selectedSeats[i],
    }));

    navigate("/payment", {
      state: {
        booking,
        passengersData: passengersWithSeats,
        email,
      },
    });
  };

  const allSeatsSelected = selectedSeats.every((seat) => seat !== "");

  if (!booking) {
    return (
      <div className="seat-selection-page">
        <h2>No booking data found.</h2>
      </div>
    );
  }

  return (
    <div className="seat-selection-page">
      <h2 className="title">Select Your Seats</h2>

      <div className="flight-summary">
        <span>
          <strong>{booking.flight.company}</strong> — {booking.flight.departure}{" "}
          → {booking.flight.arrival}
        </span>
        <span>Cabin: {selectedCabin}</span>
        <span>
          Seat Range: {seatRange.min}-{seatRange.max}
        </span>
      </div>

      <div className="passengers-seats">
        {passengersData.map((passenger, index) => {
          const availableSeats = getAvailableSeats(index);

          return (
            <div key={index} className="passenger-seat-card">
              <h3>
                Passenger {index + 1}: {passenger.firstName}{" "}
                {passenger.lastName}
              </h3>

              <div className="seat-selection-group">
                <label>Select Seat Number</label>
                <select
                  value={selectedSeats[index]}
                  onChange={(e) =>
                    handleSeatChange(index, parseInt(e.target.value))
                  }
                  className="seat-select"
                >
                  <option value="">-- Choose a seat --</option>
                  {availableSeats.map((seat) => (
                    <option key={seat} value={seat}>
                      Seat {seat}
                    </option>
                  ))}
                </select>
              </div>

              {selectedSeats[index] && (
                <div className="selected-seat-info">
                  ✓ Selected: Seat {selectedSeats[index]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="confirmation-section">
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={!allSeatsSelected}
        >
          Confirm Booking →
        </button>
        {!allSeatsSelected && (
          <p className="warning">Please select seats for all passengers</p>
        )}
      </div>
    </div>
  );
};

export default SeatSelection;
