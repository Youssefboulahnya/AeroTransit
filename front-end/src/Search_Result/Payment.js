
// export default Payment;
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;
  const passengersData = state?.passengersData || [];
  const email = state?.email || "";
  const paymentResponse = state?.paymentDataFromDB;

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  // --- Hooks / calculs (toujours avant tout return) ---
  const basePrice = booking?.flight?.price || 0;
  const cabinMultiplier = booking?.selectedCabin === "Business" ? 2 : 1;
  const numPassengers = passengersData.length || 0;

  const subtotal = useMemo(
    () => basePrice * cabinMultiplier * numPassengers,
    [basePrice, cabinMultiplier, numPassengers]
  );

  const taxes = useMemo(() => Math.round(subtotal * 0.15), [subtotal]);

  const cabinServiceFee = useMemo(() => {
    if (!booking) return 0;
    return passengersData.reduce((sum, p) => {
      const percent =
        booking.selectedCabin === "Business"
          ? p.type === "Child"
            ? 0
            : 0.15
          : p.type === "Child"
          ? 0
          : 0.05;
      return sum + basePrice * percent;
    }, 0);
  }, [passengersData, booking, basePrice]);

  const totalFromBackend = Number(paymentResponse?.prix_total);

  // si booking manquant, on affiche message (après hooks)
  if (!booking) {
    return (
      <div className="payment-page">
        <h2>No booking data found.</h2>
      </div>
    );
  }

  const formattedAmount = (value, { decimalsIfInteger = 0 } = {}) => {
    if (typeof value !== "number" || Number.isNaN(value)) return "0.00";
    // si c'est entier on peut afficher sans décimales comme sur la 1ère image
    if (decimalsIfInteger === 0 && Number.isInteger(value)) return `${value} €`;
    return `${value.toFixed(2)} €`;
  };

  //modification se fait sur quel champ
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
    } else if (name === "cvv") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 3);
      setPaymentData({ ...paymentData, [name]: digitsOnly });
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
    e.preventDefault();//ne resseye pas
    if (validateForm()) {
      navigate("/booking-confirmation", {
        state: {
          booking,
          passengersData,
          email,
          paymentData,
          totalAmount: !Number.isNaN(totalFromBackend)
            ? totalFromBackend
            : subtotal + taxes + cabinServiceFee, // fallback si backend absent
        },
      });
    }
  };

  return (
    <div className="payment-page">
      <h2 className="page-title">Payment</h2>

      <div className="payment-container">
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
            <h4>Passengers ({numPassengers})</h4>
            {passengersData.map((passenger, index) => (
              <p key={index}>
                {passenger.firstName} {passenger.lastName} – Seat{" "}
                {passenger.seat}
              </p>
            ))}
          </div>

          <div className="summary-section">
            <h4>Contact</h4>
            <p>{email}</p>
          </div>

          <div className="price-breakdown">
            {/* Comme image 1 : Base Price × {numPassengers}  */}
            <div className="price-row">
              <span>Base Price × {numPassengers}</span>
              <span>
                {formattedAmount(basePrice * numPassengers, {
                  decimalsIfInteger: 0,
                })}
              </span>
            </div>

            {/* Afficher Cabin (Business) puis à droite ×{numPassengers} (tu voulais que le 2 = passagers) */}
            <div className="price-row">
              <span>Cabin ({booking.selectedCabin})</span>
              <span>×{numPassengers}</span>
            </div>

            {/* Cabin Service Fee (est.) */}
            <div className="price-row">
              <span>Cabin Service Fee</span>
              <span>
                {formattedAmount(cabinServiceFee, { decimalsIfInteger: 1 })}
              </span>
            </div>

            {/* Total (backend) en grand — affiche le prix envoyé par le serveur */}
            <div
              className="price-row total"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <strong style={{ fontSize: "1.2rem" }}>Total</strong>
              <strong style={{ fontSize: "1.4rem" }}>
                {!Number.isNaN(totalFromBackend)
                  ? formattedAmount(totalFromBackend, { decimalsIfInteger: 0 })
                  : formattedAmount(subtotal + taxes + cabinServiceFee)}
              </strong>
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
              Pay{" "}
              {!Number.isNaN(totalFromBackend)
                ? `${formattedAmount(totalFromBackend, {
                    decimalsIfInteger: 0,
                  })} →`
                : `${formattedAmount(subtotal + taxes + cabinServiceFee)} →`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
