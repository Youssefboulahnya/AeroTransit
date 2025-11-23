import { useEffect, useState } from "react";
import Logo from "../pictures/iconV3.png";
import "./DashboardHome.css";
import api from "../api";

export default function DashboardHome() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newFlight, setNewFlight] = useState(null);

  const [errors, setErrors] = useState({});

  // For delete popup
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });

  const fetchFlights = async () => {
    try {
      const res = await api.get("/flights");
      setFlights(res.data);
    } catch (err) {
      console.error("Error loading flights:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // ===== DELETE FLIGHT =====
  const confirmDelete = (id) => {
    setDeletePopup({ show: true, id });
  };

  const deleteFlight = async () => {
    try {
      await api.delete(`/flights/${deletePopup.id}`);

      setFlights((prev) => prev.filter((f) => f.ID_flight !== deletePopup.id));

      setDeletePopup({ show: false, id: null });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // DATA FOR EDITING
  const [dataChanged, setDataChanged] = useState({
    ID_flight: "",
    origin: "",
    destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    seats: "",
  });

  // DATA FOR ADDING
  const [addFlight, setAddFlight] = useState({
    origin: "",
    destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    seats: "",
  });

  // ===== VALIDATION: Add Flight Form =====
  const isAddFormValid = () => {
    return (
      addFlight.origin.trim() !== "" &&
      addFlight.destination.trim() !== "" &&
      addFlight.temps_aller.trim() !== "" &&
      addFlight.temps_arriver.trim() !== "" &&
      addFlight.seats !== "" &&
      addFlight.price !== "" &&
      addFlight.status.trim() !== ""
    );
  };

  // ===== UPDATE FLIGHT =====
  const saveEdit = async () => {
    setErrors({});

    try {
      const res = await api.put(
        `/flights/${dataChanged.ID_flight}`,
        dataChanged
      );

      setFlights((prev) =>
        prev.map((f) =>
          f.ID_flight === dataChanged.ID_flight ? res.data.flight : f
        )
      );

      setSelectedFlight(null);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Update error:", err);
      }
    }
  };

  // ===== CREATE FLIGHT =====
  const saveNewFlight = async () => {
    setErrors({});

    try {
      await api.post("/flights", {
        origin: addFlight.origin,
        destination: addFlight.destination,
        temps_aller: addFlight.temps_aller,
        temps_arriver: addFlight.temps_arriver,
        seats: addFlight.seats,
        price: addFlight.price,
        status: addFlight.status,
        created_by: localStorage.getItem("admin_id"),
      });

      fetchFlights();
      setNewFlight(null);
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error("Create error:", err);
      }
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading flights...</p>;

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">AeroTransit Dashboard</div>
      </div>

      {/* ADD BUTTON */}
      <button
        className="add_flight"
        onClick={() => {
          setErrors({});
          setAddFlight({
            origin: "",
            destination: "",
            temps_aller: "",
            temps_arriver: "",
            price: "",
            status: "",
            seats: "",
          });
          setNewFlight(true);
        }}
      >
        Add Flight
      </button>

      {/* TABLE */}
      <table className="flight_list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {flights.map((f) => (
            <tr key={f.ID_flight}>
              <td>{f.ID_flight}</td>
              <td>{f.origin}</td>
              <td>{f.destination}</td>
              <td>{f.temps_aller}</td>
              <td>{f.temps_arriver}</td>
              <td>{f.seats}</td>
              <td>{f.price} €</td>
              <td>{f.status}</td>

              <td className="actions">
                <span
                  className="edit"
                  onClick={() => {
                    setErrors({});
                    setSelectedFlight(f);
                    setDataChanged(f);
                  }}
                >
                  Modifier
                </span>{" "}
                |{" "}
                <span
                  className="delete"
                  onClick={() => confirmDelete(f.ID_flight)}
                >
                  Supprimer
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* DELETE POPUP */}
      {deletePopup.show && (
        <div className="overlay">
          <div className="center-popup">
            <h3>Do you want to cancel this flight?</h3>

            <div className="popup-buttons">
              <button
                className="no"
                onClick={() => setDeletePopup({ show: false, id: null })}
              >
                Non
              </button>

              <button className="yes" onClick={deleteFlight}>
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT POPUP */}
      {selectedFlight && (
        <div className="edit-form">
          <h3>Edit Flight #{selectedFlight.ID_flight}</h3>

          <label>Origin:</label>
          <input
            type="text"
            value={dataChanged.origin}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, origin: e.target.value })
            }
          />
          {errors.origin && <p className="error">{errors.origin[0]}</p>}

          <label>Destination:</label>
          <input
            type="text"
            value={dataChanged.destination}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, destination: e.target.value })
            }
          />
          {errors.destination && (
            <p className="error">{errors.destination[0]}</p>
          )}

          <label>Departure Time:</label>
          <input
            type="datetime-local"
            value={dataChanged.temps_aller}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, temps_aller: e.target.value })
            }
          />
          {errors.temps_aller && (
            <p className="error">{errors.temps_aller[0]}</p>
          )}

          <label>Arrival Time:</label>
          <input
            type="datetime-local"
            value={dataChanged.temps_arriver}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, temps_arriver: e.target.value })
            }
          />
          {errors.temps_arriver && (
            <p className="error">{errors.temps_arriver[0]}</p>
          )}

          <label>Seats:</label>
          <input
            type="number"
            value={dataChanged.seats}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, seats: e.target.value })
            }
          />
          {errors.seats && <p className="error">{errors.seats[0]}</p>}

          <label>Price (€):</label>
          <input
            type="number"
            value={dataChanged.price}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, price: e.target.value })
            }
          />
          {errors.price && <p className="error">{errors.price[0]}</p>}

          <label>Status:</label>
          <select
            value={dataChanged.status}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, status: e.target.value })
            }
          >
            <option value="scheduled">scheduled</option>
            <option value="arrived">arrived</option>
          </select>
          {errors.status && <p className="error">{errors.status[0]}</p>}

          <div className="form-buttons">
            <button onClick={() => setSelectedFlight(null)}>Fermer</button>
            <button className="save" onClick={saveEdit}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* ADD POPUP */}
      {newFlight && (
        <div className="edit-form">
          <h3>Add New Flight</h3>

          <label>Origin:</label>
          <input
            type="text"
            value={addFlight.origin}
            onChange={(e) =>
              setAddFlight({ ...addFlight, origin: e.target.value })
            }
          />
          {errors.origin && <p className="error">{errors.origin[0]}</p>}

          <label>Destination:</label>
          <input
            type="text"
            value={addFlight.destination}
            onChange={(e) =>
              setAddFlight({ ...addFlight, destination: e.target.value })
            }
          />
          {errors.destination && (
            <p className="error">{errors.destination[0]}</p>
          )}

          <label>Departure Time:</label>
          <input
            type="datetime-local"
            value={addFlight.temps_aller}
            onChange={(e) =>
              setAddFlight({ ...addFlight, temps_aller: e.target.value })
            }
          />
          {errors.temps_aller && (
            <p className="error">{errors.temps_aller[0]}</p>
          )}

          <label>Arrival Time:</label>
          <input
            type="datetime-local"
            value={addFlight.temps_arriver}
            onChange={(e) =>
              setAddFlight({ ...addFlight, temps_arriver: e.target.value })
            }
          />
          {errors.temps_arriver && (
            <p className="error">{errors.temps_arriver[0]}</p>
          )}

          <label>Seats:</label>
          <input
            type="number"
            value={addFlight.seats}
            onChange={(e) =>
              setAddFlight({ ...addFlight, seats: e.target.value })
            }
          />
          {errors.seats && <p className="error">{errors.seats[0]}</p>}

          <label>Price (€):</label>
          <input
            type="number"
            value={addFlight.price}
            onChange={(e) =>
              setAddFlight({ ...addFlight, price: e.target.value })
            }
          />
          {errors.price && <p className="error">{errors.price[0]}</p>}

          <label>Status:</label>
          <select
            value={addFlight.status}
            onChange={(e) =>
              setAddFlight({ ...addFlight, status: e.target.value })
            }
          >
            <option value="scheduled">scheduled</option>
            <option value="arrived">arrived</option>
          </select>
          {errors.status && <p className="error">{errors.status[0]}</p>}

          <div className="form-buttons">
            <button onClick={() => setNewFlight(null)}>back</button>

            <button
              className="save"
              onClick={saveNewFlight}
              disabled={!isAddFormValid()}
              style={{
                opacity: isAddFormValid() ? 1 : 0.5,
                cursor: isAddFormValid() ? "pointer" : "not-allowed",
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
