import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../pictures/iconV3.png";
import "./ReservationList.css";
import api from "../api"; //voila api j'ai l'import alors si tu construit le route fait gitpush et dit moi

export default function ReservationList() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePopup, setDeletePopup] = useState({
    show: false,
    id: null,
    type: null,
  }); // type: 'reservation' or 'ticket'

  const formatDate = (d) => (d && d.includes("T") ? d.replace("T", " ") : d);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");

      const flattened = [];

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.reservations || [];

      data.forEach((r) => {
        if (r.tickets && r.tickets.length > 0) {
          r.tickets.forEach((t) => {
            flattened.push({
              reservation_ID: r.reservation_ID || r._id,
              ticket_serial: t.ticket_serial_number,
              origin: r.flight?.origin || "N/A",
              destination: r.flight?.destination || "N/A",
              price: t.prix,
              firstName: t.passenger_first_name,
              lastName: t.passenger_last_name,
              type: t.passenger_type,
              passportId: t.passport_ID,
              uniqueId: t.ticket_serial_number,
            });
          });
        } else {
          // If no tickets, maybe just show reservation info? But user asked for ticket details.
          // We'll skip empty reservations or handle them if needed.
        }
      });

      setReservations(flattened);
    } catch (err) {
      console.error("Error loading reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const confirmDelete = (id) => setDeletePopup({ show: true, id });

  const deleteReservation = async () => {
    try {
      
      await api.delete(`/ticket/${deletePopup.id}/delete`);

      setReservations((prev) =>
        prev.filter((r) => r.uniqueId !== deletePopup.id)
      );
      setDeletePopup({ show: false, id: null });
    } catch (err) {
      console.error("Delete error:", err);
     
    }
  };

  if (loading)
    return <p style={{ textAlign: "center" }}>Loading reservations...</p>;

  return (
    <div className="dashboard">
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((r, index) => (
            <tr key={r.uniqueId || index}>
              <td data-label="Res. ID">{r.reservation_ID}</td>
              <td data-label="Ticket Serial">{r.ticket_serial}</td>
              <td data-label="Origin">{r.origin}</td>
              <td data-label="Destination">{r.destination}</td>
              <td data-label="Price">{r.price} €</td>
              <td data-label="First Name">{r.firstName}</td>
              <td data-label="Last Name">{r.lastName}</td>
              <td data-label="Type">{r.type}</td>
              <td data-label="Passport/ID">{r.passportId}</td>

              <td data-label="Actions" className="actions">
                <span
                  className="delete"
                  onClick={() => confirmDelete(r.ticket_serial)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE POPUP */}
      {deletePopup.show && (
        <div className="overlay">
          <div className="popup-box">
            <h3>Do you want to delete this ticket?</h3>

            <div className="popup-buttons">
              <button
                className="no"
                onClick={() => setDeletePopup({ show: false, id: null })}
              >
                No
              </button>

              <button className="yes" onClick={deleteReservation}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
