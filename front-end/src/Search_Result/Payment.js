import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const passengersData = state?.passengersData || [];
  const email = state?.email || "";

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  // Calculate total price (unchanged)
  const calculateTotal = () => {
    if (!booking) return 0;
    const basePrice = booking.flight.price;
    const cabinMultiplier = booking.selectedCabin === "Business" ? 2 : 1;
    const numPassengers = passengersData.length;
    const subtotal = basePrice * cabinMultiplier * numPassengers;
    const taxes = Math.round(subtotal * 0.15);
    return subtotal + taxes;
  };

  // Cabin service fee (5% economy, 15% business, child = free)
  const cabinServiceFee = passengersData.reduce((sum, p) => {
    const percent =
      booking.selectedCabin === "Business"
        ? p.type === "Child"
          ? 0
          : 0.15
        : p.type === "Child"
        ? 0
        : 0.05;

    return sum + booking.flight.price * percent;
  }, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      setPaymentData({ ...paymentData, [name]: formatted });
    } else if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{0,2})/, "$1/$2");
      setPaymentData({ ...paymentData, [name]: formatted });
    } else {
      setPaymentData({ ...paymentData, [name]: value });
    }

    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (
      !paymentData.cardNumber ||
      paymentData.cardNumber.replace(/\s/g, "").length !== 16
    ) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!paymentData.cardName || paymentData.cardName.length < 3) {
      newErrors.cardName = "Please enter cardholder name";
    }

    if (
      !paymentData.expiryDate ||
      !/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)
    ) {
      newErrors.expiryDate = "Format: MM/YY";
    }

    if (!paymentData.cvv || paymentData.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/booking-confirmation", {
        state: {
          booking,
          passengersData,
          email,
          paymentData,
          totalAmount: calculateTotal(), // unchanged
        },
      });
    }
  };

  if (!booking) {
    return (
      <div className="payment-page">
        <h2>No booking data found.</h2>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <h2 className="page-title">Payment</h2>

      <div className="payment-container">
        {/* Booking Summary */}
        <div className="booking-summary-card">
          <h3>Booking Summary</h3>

          <div className="summary-section">
            <h4>Flight Details</h4>
            <p>
              <strong>{booking.flight.company}</strong>
            </p>
            <p>
              {booking.flight.origin} → {booking.flight.destination}
            </p>
            <p>
              {booking.flight.departure} → {booking.flight.arrival}
            </p>
            <p>{booking.flight.departureDate}</p>
            <p>Cabin: {booking.selectedCabin}</p>
          </div>

          <div className="summary-section">
            <h4>Passengers ({passengersData.length})</h4>
            {passengersData.map((passenger, index) => (
              <p key={index}>
                {passenger.firstName} {passenger.lastName} - Seat{" "}
                {passenger.seat}
              </p>
            ))}
          </div>

          <div className="summary-section">
            <h4>Contact</h4>
            <p>{email}</p>
          </div>

          <div className="price-breakdown">
            <div className="price-row">
              <span>Base Price × {passengersData.length}</span>
              <span>{booking.flight.price * passengersData.length} €</span>
            </div>

            <div className="price-row">
              <span>Cabin ({booking.selectedCabin})</span>
              <span>×{booking.selectedCabin === "Business" ? 2 : 1}</span>
            </div>

            {/* ✔ REPLACED TAXES BLOCK */}
            <div className="price-row">
              <span>Cabin Service Fee</span>
              <span>{cabinServiceFee.toFixed(2)} €</span>
            </div>

            <div className="price-row total">
              <span>Total</span>
              <span>{calculateTotal()} €</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="payment-form-card">
          <h3>Payment Details</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                maxLength="19"
                className={errors.cardNumber ? "error" : ""}
              />
              {errors.cardNumber && (
                <span className="error-msg">{errors.cardNumber}</span>
              )}
            </div>

            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardName"
                value={paymentData.cardName}
                onChange={handleInputChange}
                placeholder="BOULAHNIYA YOUSSEF"
                className={errors.cardName ? "error" : ""}
              />
              {errors.cardName && (
                <span className="error-msg">{errors.cardName}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  className={errors.expiryDate ? "error" : ""}
                />
                {errors.expiryDate && (
                  <span className="error-msg">{errors.expiryDate}</span>
                )}
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  maxLength="3"
                  className={errors.cvv ? "error" : ""}
                />
                {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
              </div>
            </div>

            <button type="submit" className="pay-btn">
              Pay {calculateTotal()} € →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
