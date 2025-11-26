import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState("");

  const booking = state?.booking;
  const passengersData = state?.passengersData || [];
  const email = state?.email || "";
  const totalAmount = state?.totalAmount || 0;

  useEffect(() => {
    const generateBookingId = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      return `ART-${year}${month}${day}-${random}`;
    };

    setBookingId(generateBookingId());
  }, []);

  const handleManageBooking = () => {
    navigate("/Manage", {
      state: {
        bookingId,
        email,
      },
    });
  };

  if (!booking) {
    return (
      <div className="confirmation-page">
        <div className="error-container">
          <h2>No booking data found.</h2>
          <button onClick={() => navigate("/")} className="home-btn">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="success-header">
          <div className="success-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#4CAF50" />
              <path
                d="M7 12L10.5 15.5L17 9"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Payment Successful!</h1>
          <p className="success-subtitle">
            Your booking has been successfully confirmed
          </p>
        </div>

        <div className="credentials-card">
          <h2>Login Information</h2>
          <p className="credentials-intro">
            Use this information to manage your booking:
          </p>

          <div className="credential-item">
            <div className="credential-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L10.89 13.26C11.5 13.67 12.5 13.67 13.11 13.26L21 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Email
            </div>
            <div className="credential-value">{email}</div>
          </div>

          <div className="credential-item">
            <div className="credential-label">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 11V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V11M12 14V17M7 21H17C18.1 21 19 20.1 19 19V13C19 11.9 18.1 11 17 11H7C5.9 11 5 11.9 5 13V19C5 20.1 5.9 21 7 21Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Booking ID
            </div>
            <div className="credential-value booking-id">{bookingId}</div>
          </div>

          <div className="info-box">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 16V12M12 8H12.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p>
              Keep this information safe. You will need it to access your
              booking management area and get your tickets.
            </p>
          </div>
        </div>

        <div className="booking-details-card">
          <h3>Booking Summary</h3>

          <div className="detail-section">
            <h4>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 16V8C21 6.9 20.1 6 19 6H5C3.9 6 3 6.9 3 8V16C3 17.1 3.9 18 5 18H19C20.1 18 21 17.1 21 16ZM12 9L21 4V8L12 13L3 8V4L12 9Z"
                  fill="currentColor"
                />
              </svg>
              Flight Details
            </h4>

            <div className="detail-row">
              <span className="label">Airline</span>
              <span className="value">{booking.flight.company}</span>
            </div>

            <div className="detail-row">
              <span className="label">Route</span>
              <span className="value">
                {booking.flight.origin} → {booking.flight.destination}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Schedule</span>
              <span className="value">
                {booking.flight.departure} → {booking.flight.arrival}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Date</span>
              <span className="value">{booking.flight.departureDate}</span>
            </div>

            <div className="detail-row">
              <span className="label">Class</span>
              <span className="value">{booking.selectedCabin}</span>
            </div>
          </div>

          <div className="detail-section">
            <h4>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z"
                  fill="currentColor"
                />
              </svg>
              Passengers ({passengersData.length})
            </h4>

            {passengersData.map((passenger, index) => (
              <div key={index} className="detail-row">
                <span className="label">
                  {passenger.firstName} {passenger.lastName}
                </span>
                <span className="value">Seat {passenger.seat}</span>
              </div>
            ))}
          </div>

          <div className="detail-section total-section">
            <div className="detail-row total-row">
              <span className="label">Total Amount Paid</span>
              <span className="value total-amount">{totalAmount} €</span>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button onClick={handleManageBooking} className="manage-booking-btn">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6H12L10 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM14 16H10V14H14V16ZM17 12H7V10H17V12Z"
                fill="currentColor"
              />
            </svg>
            Manage My Booking
          </button>

          <p className="cta-description">
            Access your management space to get your tickets, modify your
            booking, or add extra services.
          </p>

          <button onClick={() => navigate("/")} className="home-link-btn">
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
