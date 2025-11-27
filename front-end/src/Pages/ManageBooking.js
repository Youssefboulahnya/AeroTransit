import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ManageBooking.css";

export default function ManageBooking() {
  const location = useLocation();
  const navigate = useNavigate();

  const reservation_ID = location.state?.reservation_ID;
  const email = location.state?.email;

  const [booking, setBooking] = useState(null);
  const [localPassengers, setLocalPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);

  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteRefundModal, setShowDeleteRefundModal] = useState(false);
  const [deletingPassenger, setDeletingPassenger] = useState(null);

  const [deleteRefundAmount, setDeleteRefundAmount] = useState(null);
  const [reservationRefundAmount, setReservationRefundAmount] = useState(null);

  const [showDownloadModal, setShowDownloadModal] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchTickets() {
      if (!reservation_ID) {
        if (!mounted) return;
        setError("No reservation ID found.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:8000/api/reservation/${encodeURIComponent(
            reservation_ID
          )}/tickets`
        );
        const data = await res.json();

        if (!data.success) {
          setError(data.message || "Failed to load reservation.");
        } else {
          const formattedPassengers = data.tickets.map((t, index) => ({
            id: index + 1,
            firstName: t.passenger_first_name || "",
            lastName: t.passenger_last_name || "",
            type: t.passenger_type || "",
            seat: t.seat_number || "",
            passportId: t.passport_ID || "",
            ticketId: t.ticket_serial_number || "",
            price: Number(t.prix) || 0,
          }));

          if (!mounted) return;
          setBooking({
            reservationId: data.reservation_ID,
            flight: data.flight,
            passengers: formattedPassengers,
            totalPrice: formattedPassengers.reduce(
              (sum, p) => sum + Number(p.price || 0),
              0
            ),
          });

          setLocalPassengers(formattedPassengers);
        }
      } catch (err) {
        console.error(err);
        setError("Server error.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchTickets();
    return () => {
      mounted = false;
    };
  }, [reservation_ID]);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCancelFlight = () => {
    setShowConfirmModal(true);
  };

  const confirmCancellation = async () => {
    setShowConfirmModal(false);
    try {
      const res = await fetch(
        `http://localhost:8000/api/reservation/${encodeURIComponent(
          reservation_ID
        )}/delete`,
        { method: "DELETE" }
      );

      let data = {};
      try {
        data = await res.json();
      } catch (e) {
        data = {};
      }

      if (!res.ok) {
        alert(
          `Cancellation failed (status ${res.status})${
            data?.message ? `: ${data.message}` : ""
          }`
        );
        return;
      }

      const backendAmount =
        data?.refund_amount ??
        data?.refund ??
        data?.total_price_refund ??
        data?.totalPrice ??
        data?.payment?.prix_total ??
        null;

      const amountToShow =
        backendAmount != null
          ? Number(backendAmount)
          : Number(booking?.totalPrice || 0);

      setReservationRefundAmount(amountToShow);

      setBooking(null);
      setLocalPassengers([]);

      setShowRefundModal(true);
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Cancellation failed (network error).");
    }
  };

  const closeConfirmModal = () => setShowConfirmModal(false);
  const handleCloseRefundModal = () => {
    setShowRefundModal(false);
    setReservationRefundAmount(null);
    navigate("/");
  };

  // -----------------------------
  // EDIT PASSENGER
  // -----------------------------
  const handleEditPassenger = (id) => {
    const p = localPassengers.find((x) => x.id === id);
    if (!p) return;
    setEditingPassenger({ ...p });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPassenger((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePassenger = async (e) => {
    e.preventDefault();
    if (!editingPassenger) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/passenger/update/${encodeURIComponent(
          editingPassenger.ticketId
        )}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: editingPassenger.firstName,
            last_name: editingPassenger.lastName,
            passport_ID: editingPassenger.passportId,
          }),
        }
      );

      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (!res.ok) {
        alert(
          `Update failed (status ${res.status})\n${
            data?.message || data?.raw || JSON.stringify(data)
          }`
        );
        return;
      }

      setLocalPassengers((prev) =>
        prev.map((p) => (p.id === editingPassenger.id ? editingPassenger : p))
      );
      setShowEditModal(false);
      setEditingPassenger(null);
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed (network error).");
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingPassenger(null);
  };

  const handleDeletePassenger = (id) => {
    const p = localPassengers.find((x) => x.id === id);
    if (!p) return;
    setDeletingPassenger(p);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeletePassenger = async () => {
    if (!deletingPassenger) return;

    try {
      const url = `http://localhost:8000/api/ticket/${encodeURIComponent(
        deletingPassenger.ticketId
      )}/delete`;
      const res = await fetch(url, { method: "DELETE" });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        alert(
          `Deletion failed (status ${res.status})${
            data?.message ? `: ${data.message}` : ""
          }`
        );
        setShowDeleteConfirmModal(false);
        setDeletingPassenger(null);
        return;
      }

      setLocalPassengers((prev) =>
        prev.filter((p) => p.id !== deletingPassenger.id)
      );

      const backendAmount =
        data?.refund_amount ?? data?.refund ?? data?.deleted_price ?? null;
      const amountToShow =
        backendAmount != null
          ? Number(backendAmount)
          : Number(deletingPassenger.price || 0);

      setDeleteRefundAmount(amountToShow);
      setShowDeleteConfirmModal(false);
      setShowDeleteRefundModal(true);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Deletion failed (network error).");
      setShowDeleteConfirmModal(false);
      setDeletingPassenger(null);
    }
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
    setDeletingPassenger(null);
  };

  const closeDeleteRefundModal = () => {
    setShowDeleteRefundModal(false);
    setDeletingPassenger(null);
    setDeleteRefundAmount(null);
  };

  // -----------------------------
  // DOWNLOAD TICKET
  // -----------------------------
  const handleDownloadTicket = (p) => {
    const flight = booking?.flight || {};
    const content = `
--- TICKET INFORMATION ---
Reservation: ${booking?.reservationId}
Ticket: ${p.ticketId}
Flight: ${flight.origin || ""} -> ${flight.destination || ""}
Departure: ${flight.temps_aller || ""} → Arrival: ${flight.temps_arriver || ""}
Passenger: ${p.firstName} ${p.lastName}
Passport: ${p.passportId}
Seat: ${p.seat}
Price: ${p.price}
--------------------------
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TICKET_${p.ticketId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setShowDownloadModal(true);
  };

  const closeDownloadModal = () => setShowDownloadModal(false);

  // -----------------------------
  // RENDER TIKETS
  // -----------------------------
  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (error)
    return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
  if (!booking)
    return (
      <h2 style={{ textAlign: "center", color: "red" }}>
        Reservation Not Found
      </h2>
    );

  return (
    <div className="manage-booking-container">
      <div className="booking-header">
        <h1>
          Welcome to your management interface {booking.reservationId} for trip{" "}
          {booking.flight?.origin} → {booking.flight?.destination}
        </h1>
      </div>

      <div className="tickets-section">
        {localPassengers.map((p) => (
          <div key={p.id} className="ticket-card">
            <div className="ticket-details">
              <div className="ticket-row">
                <strong>Ticket ID:</strong> {p.ticketId}
              </div>
              <div className="ticket-row">
                <strong>Passenger:</strong> {p.firstName} {p.lastName}
              </div>
              <div className="ticket-row">
                <strong>Type:</strong> {p.type}
              </div>
              <div className="ticket-row">
                <strong>Passport:</strong> {p.passportId}
              </div>
              <div className="ticket-row">
                <strong>Seat:</strong> {p.seat}
              </div>
              <div className="ticket-row">
                <strong>Price:</strong> {p.price}€
              </div>
              <div className="ticket-row">
                <strong>Departure:</strong> {booking.flight?.temps_aller}
              </div>
              <div className="ticket-row">
                <strong>Arrival:</strong> {booking.flight?.temps_arriver}
              </div>
            </div>

            <div className="ticket-actions">
              <button
                className="action-btn btn-download"
                onClick={() => handleDownloadTicket(p)}
              >
                Download
              </button>
              <button
                className="action-btn btn-edit"
                onClick={() => handleEditPassenger(p.id)}
              >
                Edit
              </button>
              <button
                className="action-btn btn-delete"
                onClick={() => handleDeletePassenger(p.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="booking-actions-footer">
        <div className="danger-zone">
          <button className="action-btn btn-change" onClick={handleLogout}>
            Logout
          </button>
          <button
            className="action-btn btn-cancel"
            onClick={handleCancelFlight}
          >
            Cancel Reservation
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Confirmation</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="modal-actions">
              <button
                className="action-btn btn-confirm"
                onClick={confirmCancellation}
              >
                Yes, Cancel
              </button>
              <button
                className="action-btn btn-close"
                onClick={closeConfirmModal}
              >
                No, Keep it
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && editingPassenger && (
        <div className="modal-overlay">
          <div className="modal-content modal-edit">
            <h3>Edit Passenger</h3>
            <form onSubmit={handleSavePassenger} className="edit-form">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editingPassenger.firstName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editingPassenger.lastName}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>ID / Passport</label>
                <input
                  type="text"
                  name="passportId"
                  value={editingPassenger.passportId}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="action-btn btn-confirm">
                  Save
                </button>
                <button
                  type="button"
                  className="action-btn btn-close"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showDeleteConfirmModal && deletingPassenger && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Delete Passenger</h3>
            <p>
              Are you sure you want to delete {deletingPassenger.firstName}{" "}
              {deletingPassenger.lastName}?
            </p>
            <div className="modal-actions">
              <button
                className="action-btn btn-confirm"
                onClick={confirmDeletePassenger}
              >
                Yes, Delete
              </button>
              <button
                className="action-btn btn-close"
                onClick={closeDeleteConfirmModal}
              >
                No, Keep
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteRefundModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Passenger Deleted</h3>
            <p>
              Thank you — you will receive{" "}
              <strong>
                {deleteRefundAmount != null
                  ? deleteRefundAmount.toFixed(2)
                  : "0.00"}
              </strong>{" "}
              € to your account within <strong>42–48 hours</strong>.
            </p>
            <button
              className="action-btn btn-confirm"
              onClick={closeDeleteRefundModal}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showDownloadModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Download Ticket</h3>
            <p>Ticket has been downloaded.</p>
            <button
              className="action-btn btn-confirm"
              onClick={closeDownloadModal}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {showRefundModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reservation Cancelled</h3>
            <p>
              The total reservation amount of{" "}
              <strong>
                {reservationRefundAmount != null
                  ? reservationRefundAmount.toFixed(2)
                  : (booking?.totalPrice ?? 0).toFixed?.(2) ??
                    booking?.totalPrice}
              </strong>{" "}
              € will be refunded to your account within{" "}
              <strong>24-48 hours</strong>.
            </p>
            <button
              className="action-btn btn-confirm"
              onClick={handleCloseRefundModal}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
