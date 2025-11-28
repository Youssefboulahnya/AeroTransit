import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logoo from "../pictures/iconV2.png";
import "./ReservationList.css";
import api from "../api";

export default function ReservationList() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/admin/reservations/all");

      // Backend already gives a flat array, so set it directly
      setReservations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading reservations...</p>;

  return (
    <div className="dashboard">
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logoo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">Reservations List</div>
      </div>

      <button
        className="add_flight"
        style={{
          right: "10px",
          background: "#d63031",
          color: "white",
          borderColor: "#007bff",
        }}
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <table className="flight_list">
        <thead>
          <tr>
            <th>Res. ID</th>
            <th>Ticket Serial</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Price</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Type</th>
            <th>Passport/ID</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r, index) => (
            <tr key={index}>
              <td data-label="Res. ID">{r.reservation_ID}</td>
              <td data-label="Ticket Serial">{r.ticket_serial_number}</td>
              <td data-label="Origin">{r.origin}</td>
              <td data-label="Destination">{r.destination}</td>
              <td data-label="Price">{r.prix} €</td>
              <td data-label="First Name">{r.first_name}</td>
              <td data-label="Last Name">{r.last_name}</td>
              <td data-label="Type">{r.type}</td>
              <td data-label="Passport/ID">{r.Passport_ID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
