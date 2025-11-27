import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ManageBooking.css";

const ManageBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Mock data if not provided via state (for direct access testing)
  const mockBooking = {
    reservationId: "AF78923",
    email: "user@example.com",
    flight: {
      origin: "CDG",
      destination: "JFK",
      date: "2025-12-15",
      time: "10:30 AM",
      company: "Air France",
      duration: "8h 15m",
    },
    passengers: [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        type: "Adult",
        seat: "12A",
        passportId: "A12345678",
        price: 725,
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Doe",
        type: "Adult",
        seat: "12B",
        passportId: "B98765432",
        price: 725,
      },
    ],
    totalPrice: 1450,
  };

  const booking = location.state?.booking || mockBooking;

  // <<< CORRECTION : define passengers used in JSX
  const passengers = booking?.passengers || [];

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPassenger, setEditingPassenger] = useState(null);

  // Delete flow states
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showDeleteRefundModal, setShowDeleteRefundModal] = useState(false);
  const [deletingPassenger, setDeletingPassenger] = useState(null);

  const [localPassengers, setLocalPassengers] = useState(passengers);

  const handleLogout = () => {
    navigate("/");
  };

  const handleCancelFlight = () => {
    setShowConfirmModal(true);
  };

  const confirmCancellation = () => {
    setShowConfirmModal(false);
    setShowRefundModal(true);
  };

  const closeConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseRefundModal = () => {
    setShowRefundModal(false);
    navigate("/");
  };

  const handleEditPassenger = (id) => {
    const p = localPassengers.find((x) => x.id === id);
    if (!p) return;
    setEditingPassenger({ ...p });
    setShowEditModal(true);
  };

  const handleSavePassenger = (e) => {
    e.preventDefault();
    setLocalPassengers((prev) =>
      prev.map((p) => (p.id === editingPassenger.id ? editingPassenger : p))
    );
    setShowEditModal(false);
    setEditingPassenger(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingPassenger((prev) => ({ ...prev, [name]: value }));
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingPassenger(null);
  };

  // Delete Passenger Handlers
  const handleDeletePassenger = (id) => {
    const p = localPassengers.find((x) => x.id === id);
    if (!p) return;
    setDeletingPassenger(p);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeletePassenger = () => {
    if (!deletingPassenger) return;
    setLocalPassengers((prev) =>
      prev.filter((p) => p.id !== deletingPassenger.id)
    );
    setShowDeleteConfirmModal(false);
    setShowDeleteRefundModal(true);
  };

  const closeDeleteConfirmModal = () => {
    setShowDeleteConfirmModal(false);
    setDeletingPassenger(null);
  };

  const closeDeleteRefundModal = () => {
    setShowDeleteRefundModal(false);
    setDeletingPassenger(null);
  };

  return (
    <div className="manage-booking-container">
      <div className="booking-header">
        <h1>
          Welcome to your management interface {booking.reservationId} for
          trajet {booking.flight.origin} to {booking.flight.destination}
        </h1>
      </div>

      <div className="tickets-section">
        {localPassengers.map((passenger) => (
          <div className="ticket-card" key={passenger.id}>
            <div className="ticket-details">
              <div className="ticket-row">
                <strong>Trip:</strong> {booking.flight.origin} ✈{" "}
                {booking.flight.destination}
              </div>
              <div className="ticket-row">
                <strong>Date:</strong> {booking.flight.date}{" "}
                {booking.flight.time}
              </div>
              <div className="ticket-row">
                <strong>Passenger:</strong> {passenger.firstName}{" "}
                {passenger.lastName}
              </div>
              <div className="ticket-row">
                <strong>ID/Passport:</strong> {passenger.passportId}
              </div>
              <div className="ticket-row">
                <strong>Price:</strong> ${passenger.price}
              </div>
            </div>

            <div className="ticket-actions">
              <button
                className="action-btn btn-edit"
                onClick={() => handleEditPassenger(passenger.id)}
              >
                Edit Personal Data
              </button>
              <button
                className="action-btn btn-delete"
                onClick={() => handleDeletePassenger(passenger.id)}
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

      {/* Global Cancel Confirmation */}
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

      {/* Edit Passenger Modal */}
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

      {/* Delete Passenger Confirmation Modal */}
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

      {/* Delete Passenger Refund Modal */}
      {showDeleteRefundModal && deletingPassenger && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Passenger Deleted</h3>
            <p>
              Merci, vous allez recevoir le prix du billet (
              {deletingPassenger.price}) dans votre compte bancaire.
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

      {/* Global Refund Modal */}
      {showRefundModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Réservation Annulée</h3>
            <p>
              Merci, vous allez recevoir le prix de la réservation (
              {booking.totalPrice}) dans votre compte bancaire.
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
};

export default ManageBooking;
