
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  // on accepte l'ID depuis plusieurs clés possibles dans state
  const incomingId =
    state?.reservation_ID ||
    state?.reservationId ||
    state?.booking?.reservation_id ||
    state?.booking?.reservationId ||
    null;

  // si le backend a déjà renvoyé des données complètes dans state,
  // on peut les utiliser sans refetch
  const initialBookingFromState = state?.booking || null;
  const initialPassengersFromState =
    state?.passengersData || state?.passengers || [];
  const initialEmailFromState = state?.email || "";

  const [email, setEmail] = useState(initialEmailFromState);
  const [reservationId, setReservationId] = useState(incomingId);
  const [bookingData, setBookingData] = useState(initialBookingFromState);
  const [passengersData, setPassengersData] = useState(
    initialPassengersFromState
  );
  const [totalAmount, setTotalAmount] = useState(state?.totalAmount || 0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // si on n'a pas d'ID, on arrête
    if (!incomingId) {
      setLoading(false);
      return;
    }

    // Si on a déjà toutes les infos dans le state, on les utilise et on évite l'appel
    const haveAllFromState =
      !!initialBookingFromState && initialPassengersFromState.length > 0;

    if (haveAllFromState) {
      setReservationId(incomingId);
      setBookingData(initialBookingFromState);
      setPassengersData(initialPassengersFromState);
      setEmail(initialEmailFromState);
      setTotalAmount((prev) => prev || state?.totalAmount || 0);
      setLoading(false);
      return;
    }

    // Sinon on récupère depuis le backend l'objet de confirmation complet
    const fetchConfirmationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/reservation/confirmation/${incomingId}`
        );

        const data = response.data || {};

        setEmail(data.email || "");
        setBookingData(data.booking || data.reservation || null);
        setPassengersData(data.passengers || data.passenger_list || []);
        setTotalAmount(data.totalAmount || data.prix_total || 0);
        setReservationId(incomingId);
      } catch (error) {
        console.error("Error fetching confirmation data:", error);
        // si fetch echoue, on laisse reservationId pour affichage mais on notifie l'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmationData();
  }, [
    incomingId,
    initialBookingFromState,
    initialPassengersFromState,
    initialEmailFromState,
    state?.totalAmount,
  ]);

  const handleManageBooking = () => {
    navigate("/Manage", {
      state: {
        email,
        reservationId,
      },
    });
  };

  if (loading) {
    return (
      <div className="confirmation-page">
        <h2 style={{ textAlign: "center", paddingTop: "50px" }}>
          Loading booking details...
        </h2>
      </div>
    );
  }

  if (!bookingData) {
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
            {/* sucess */}
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

        {/* LOGIN INFO CARD */}
        <div className="credentials-card">
          <h2>Login Information</h2>
          <p className="credentials-intro">
            Use this information to manage your booking:
          </p>

          <div className="credential-item">
            <div className="credential-label">Email</div>
            <div className="credential-value">{email}</div>
          </div>

          <div className="credential-item">
            <div className="credential-label">Reservation ID</div>
            <div className="credential-value booking-id">
              {reservationId || "—"}
            </div>
          </div>

          <div className="info-box">
            <p>
              Keep this information safe. You will need it to access your
              booking management area and get your tickets.
            </p>
          </div>
        </div>

        {/* BOOKING DETAILS */}
        <div className="booking-details-card">
          <h3>Booking Summary</h3>

          <div className="detail-section">
            <h4>Flight Details</h4>

            <div className="detail-row">
              <span className="label">Airline</span>
              <span className="value">
                AeroTransit
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Route</span>
              <span className="value">
                {bookingData.flight?.origin || bookingData.origin || "—"} →{" "}
                {bookingData.flight?.destination ||
                  bookingData.destination ||
                  "—"}
              </span>
            </div>

            <div className="detail-row">
              <span className="label">Schedule</span>
              <span className="value">
                {bookingData.flight?.departure || bookingData.departure || "—"}{" "}
                → {bookingData.flight?.arrival || bookingData.arrival || "—"}
              </span>
            </div>

            

            <div className="detail-row">
              <span className="label">Class</span>
              <span className="value">
                {bookingData.selectedCabin || bookingData.class || "—"}
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h4>Passengers ({passengersData.length})</h4>

            {passengersData.map((p, index) => (
              <div key={index} className="detail-row">
                <span className="label">
                  {p.first_name || p.firstName || "-"}{" "}
                  {p.last_name || p.lastName || ""}
                </span>
                <span className="value">
                  Seat {p.Numero_place ?? p.seat ?? "—"}
                </span>
              </div>
            ))}
          </div>

          <div
            className="detail-section total-section"
            style={{ background: "transparent" }}
          >
            <div className="detail-row total-row">
              <span className="label">Total Amount Paid</span>
              <span className="value total-amount">{totalAmount} €</span>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <button onClick={handleManageBooking} className="manage-booking-btn">
            Manage My Booking
          </button>

          <p className="cta-description">
            Access your management space to get your tickets, modify your
            booking, or cancel the reservation.
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


