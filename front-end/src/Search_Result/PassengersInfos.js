// import React, { useState, useMemo } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./FlightPassengers.css";

// // Mock occupied seats (these would come from backend in real app)
// const OCCUPIED_SEATS = [3, 7, 12, 15, 25, 30, 35, 45, 50];

// const FlightPassengers = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

//   const booking = state?.booking;

//   const passengers = booking?.passengers || 0;
//   const flight = booking?.flight;
//   const selectedCabin = booking?.selectedCabin;

//   // Determine seat range based on cabin
//   const seatRange = useMemo(() => {
//     if (selectedCabin === "Business") {
//       return { min: 1, max: 20 };
//     } else {
//       return { min: 21, max: 60 };
//     }
//   }, [selectedCabin]);

//   const initialForms = Array.from({ length: passengers }, () => ({
//     firstName: "",
//     lastName: "",
//     type: "Adult",
//     idNumber: "",
//     seat: "",
//   }));

//   const [forms, setForms] = useState(initialForms);
//   const [email, setEmail] = useState("");

//   // Get available seats for a specific passenger
//   const getAvailableSeats = (passengerIndex) => {
//     const allSeats = [];
//     for (let i = seatRange.min; i <= seatRange.max; i++) {
//       allSeats.push(i);
//     }

//     // Filter out occupied seats and seats selected by other passengers
//     return allSeats.filter((seat) => {
//       const isOccupied = OCCUPIED_SEATS.includes(seat);
//       const isSelectedByOther = forms.some(
//         (p, idx) => idx !== passengerIndex && parseInt(p.seat) === seat
//       );
//       return !isOccupied && !isSelectedByOther;
//     });
//   };

//   // Mise à jour d'un champ
//   const updateField = (index, field, value) => {
//     const updated = [...forms];
//     updated[index][field] = value;
//     setForms(updated);
//   };

//   // Navigation vers payment directement
//   const handleNext = () => {
//     navigate("/payment", {
//       state: {
//         booking,
//         passengersData: forms,
//         email: email,
//       },
//     });
//   };

//   if (!booking) {
//     return (
//       <div className="passenger-page">
//         <h2>No booking data found.</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="passenger-page">
//       <h2 className="title">Passengers Information</h2>

//       <div className="flight-summary">
//         <div>
//           <strong>{flight.company}</strong> — {flight.departure} →{" "}
//           {flight.arrival}
//         </div>
//         <span>Cabin: {selectedCabin}</span>
//       </div>

//       {forms.map((p, i) => {
//         const availableSeats = getAvailableSeats(i);
//         return (
//           <div className="passenger-card" key={i}>
//             <h3>Passenger {i + 1}</h3>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>First name</label>
//                 <input
//                   type="text"
//                   value={p.firstName}
//                   onChange={(e) => updateField(i, "firstName", e.target.value)}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>Last name</label>
//                 <input
//                   type="text"
//                   value={p.lastName}
//                   onChange={(e) => updateField(i, "lastName", e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Type</label>
//                 <select
//                   value={p.type}
//                   onChange={(e) => updateField(i, "type", e.target.value)}
//                 >
//                   <option>Adult</option>
//                   <option>Child</option>
//                 </select>
//               </div>

//               {/* Seat Selection Input (number) */}
//               <div className="form-group">
//                 <label>Select Seat</label>
//                 <input
//                   type="number"
//                   value={p.seat}
//                   onChange={(e) => updateField(i, "seat", e.target.value)}
//                   placeholder={`Range: ${seatRange.min} - ${seatRange.max}`}
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>ID / Passport number</label>
//               <input
//                 type="text"
//                 value={p.idNumber}
//                 onChange={(e) => updateField(i, "idNumber", e.target.value)}
//               />
//             </div>
//           </div>
//         );
//       })}

//       {/* Single email field for all passengers (use to login for the manage your booking interface)*/}
//       <div
//         className="email-section"
//         style={{
//           marginTop: "2rem",
//           padding: "1.5rem",
//           background: "#f9f9f9",
//           borderRadius: "8px",
//         }}
//       >
//         <h3 style={{textAlign:"center"}}>Contact Information</h3>
//         <div className="form-group">
//           <label>Email (tickets will be sent here)</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="youssef.boulahniya@email.com"
//             style={{ width: "100%" }}
//           />
//         </div>
//       </div>

//       <div className="next-section">
//         <button className="next-btn" onClick={handleNext}>
//           Proceed to Payment →
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlightPassengers;
import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FlightPassengers.css";
import api from "../api"; // Axios instance

const FlightPassengers = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const booking = state?.booking;

  const passengers = booking?.passengers || 0;
  const flight = booking?.flight;
  const selectedCabin = booking?.selectedCabin;

  // Determine seat range based on cabin
  const seatRange = useMemo(() => {
    if (selectedCabin === "Business") {
      return { min: 1, max: 20 };
    } else {
      return { min: 21, max: 60 };
    }
  }, [selectedCabin]);

  const initialForms = Array.from({ length: passengers }, () => ({
    firstName: "",
    lastName: "",
    type: "Adult",
    idNumber: "",
    seat: "",
  }));

  const [forms, setForms] = useState(initialForms);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateField = (index, field, value) => {
    const updated = [...forms];
    updated[index][field] = value;
    setForms(updated);
  };

  const handleNext = async () => {
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Send passengers data
      const passengersPayload = forms.map((p) => ({
        first_name: p.firstName,
        last_name: p.lastName,
        type: p.type.toLowerCase(), // ensure backend enum matches
        Passport_ID: p.idNumber,
        Numero_place: parseInt(p.seat), // convert seat to int
      }));

      await api.post("/passengers/store", {
        reservation_ID: booking.reservation_id,
        Flight_ID: flight.ID_flight,
        passengers: passengersPayload,
      });

      // 2️⃣ Send email
      await api.put(`/reservations/${booking.reservation_id}/email`, {
        email,
      });

      // Navigate to payment page
      navigate("/payment", {
        state: { booking, passengersData: forms, email },
      });
    } catch (err) {
      console.error("Error storing passengers:", err);
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="passenger-page">
        <h2>No booking data found.</h2>
      </div>
    );
  }

  return (
    <div className="passenger-page">
      <h2 className="title">Passengers Information</h2>

      <div className="flight-summary">
        <div>
          <strong>{flight.company}</strong> — {flight.departure} →{" "}
          {flight.arrival}
        </div>
        <span>Cabin: {selectedCabin}</span>
      </div>

      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "1rem" }}
        >
          {error}
        </div>
      )}

      {forms.map((p, i) => {
        const allSeats = [];
        for (let s = seatRange.min; s <= seatRange.max; s++) allSeats.push(s);

        return (
          <div className="passenger-card" key={i}>
            <h3>Passenger {i + 1}</h3>

            <div className="form-row">
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  value={p.firstName}
                  onChange={(e) => updateField(i, "firstName", e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  value={p.lastName}
                  onChange={(e) => updateField(i, "lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select
                  value={p.type}
                  onChange={(e) => updateField(i, "type", e.target.value)}
                >
                  <option>Adult</option>
                  <option>Child</option>
                </select>
              </div>

              <div className="form-group">
                <label>Select Seat</label>
                <input
                  type="number"
                  min={seatRange.min}
                  max={seatRange.max}
                  value={p.seat}
                  onChange={(e) => updateField(i, "seat", e.target.value)}
                  placeholder={`Range: ${seatRange.min} - ${seatRange.max}`}
                />
              </div>
            </div>

            <div className="form-group">
              <label>ID / Passport number</label>
              <input
                type="text"
                value={p.idNumber}
                onChange={(e) => updateField(i, "idNumber", e.target.value)}
              />
            </div>
          </div>
        );
      })}

      <div
        className="email-section"
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h3>Contact Information</h3>
        <div className="form-group">
          <label>Email (tickets will be sent here)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div className="next-section">
        <button className="next-btn" onClick={handleNext} disabled={loading}>
          {loading ? "Processing..." : "Proceed to Payment →"}
        </button>
      </div>
    </div>
  );
};

export default FlightPassengers;
