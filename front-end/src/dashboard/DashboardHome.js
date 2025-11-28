import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../pictures/iconV3.png";
import "./DashboardHome.css";
import api from "../api";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newFlight, setNewFlight] = useState(null);

  const [errors, setErrors] = useState({});
  const [deletePopup, setDeletePopup] = useState({ show: false, id: null });

  const formatDate = (d) => (d.includes("T") ? d.replace("T", " ") + ":00" : d);

  const fetchFlights = async () => {
    try {
      const res = await api.get("/flights");

      const updated = res.data.map((f) => ({
        ...f,
        seats: f.places_business_classe + f.places_business_economy,
      }));

      setFlights(updated);
    } catch (err) {
      console.error("Error loading flights:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const confirmDelete = (id) => setDeletePopup({ show: true, id });

  const deleteFlight = async () => {
    try {
      await api.delete(`/flights/${deletePopup.id}`);
      setFlights((prev) => prev.filter((f) => f.ID_flight !== deletePopup.id));
      setDeletePopup({ show: false, id: null });
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const [dataChanged, setDataChanged] = useState({
    ID_flight: "",
    origin: "",
    destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    places_business_classe: "",
    places_business_economy: "",
  });

  // ************* VALIDATION FRONT *************
  const validateFlight = (flight) => {
    const e = {};

    if (flight.origin.trim() === flight.destination.trim()) {
      e.destination = ["Destination must be different from origin"];
    }

    if (new Date(flight.temps_arriver) <= new Date(flight.temps_aller)) {
      e.temps_arriver = ["Arrival must be after departure"];
    }

    const b = Number(flight.businessSeats);
    const eco = Number(flight.economySeats);

    if (b < 1 || b > 30) e.businessSeats = ["Business seats must be 1–30"];
    if (eco < 31 || eco > 120)
      e.economySeats = ["Economy seats must be 31–120"];

    return e;
  };

  // ************* ADD NEW FLIGHT *************
  const [addFlight, setAddFlight] = useState({
    origin: "",
    destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "scheduled",
    businessSeats: "",
    economySeats: "",
  });

  const saveNewFlight = async () => {
    setErrors({});

    const e = validateFlight(addFlight);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    try {
      const res = await api.post("/flights", {
        origin: addFlight.origin,
        destination: addFlight.destination,
        temps_aller: formatDate(addFlight.temps_aller),
        temps_arriver: formatDate(addFlight.temps_arriver),
        places_business_classe: Number(addFlight.businessSeats),
        places_business_economy: Number(addFlight.economySeats),
        price: Number(addFlight.price),
        status: addFlight.status,
      });

      const newF = {
        ...res.data.flight,
        seats: Number(addFlight.businessSeats) + Number(addFlight.economySeats),
      };

      setFlights((prev) => [...prev, newF]);
      setNewFlight(null);
    } catch (err) {
      console.log("CREATE ERROR:", err.response?.data || err);
      if (err.response?.status === 422) setErrors(err.response.data.errors);
    }
  };

  // ************* SAVE EDIT *************
  const saveEdit = async () => {
    setErrors({});

    const editData = {
      origin: dataChanged.origin,
      destination: dataChanged.destination,
      temps_aller: dataChanged.temps_aller,
      temps_arriver: dataChanged.temps_arriver,
      businessSeats: dataChanged.places_business_classe,
      economySeats: dataChanged.places_business_economy,
      price: dataChanged.price,
      status: dataChanged.status,
    };

    const e = validateFlight(editData);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    try {
      const res = await api.put(`/flights/${dataChanged.ID_flight}`, {
        ...dataChanged,
        temps_aller: formatDate(dataChanged.temps_aller),
        temps_arriver: formatDate(dataChanged.temps_arriver),
        places_business_classe: Number(dataChanged.places_business_classe),
        places_business_economy: Number(dataChanged.places_business_economy),
        price: Number(dataChanged.price),
      });

      const updated = {
        ...res.data.flight,
        seats:
          res.data.flight.places_business_classe +
          res.data.flight.places_business_economy,
      };

      setFlights((prev) =>
        prev.map((f) => (f.ID_flight === dataChanged.ID_flight ? updated : f))
      );

      setSelectedFlight(null);
    } catch (err) {
      console.log("EDIT ERROR:", err.response?.data);
      if (err.response?.status === 422) setErrors(err.response.data.errors);
    }
  };

  // ************* RENDER *************
  if (loading) return <p style={{ textAlign: "center" }}>Loading flights...</p>;

  return (
    <div className="dashboard">
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">AeroTransit Dashboard</div>
      </div>
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
            status: "scheduled",
            businessSeats: "",
            economySeats: "",
          });
          setNewFlight(true);
        }}
      >
        Add Flight
      </button>

      <button
        className="add_flight"
        style={{
          right: "130px",
          background: "#007bff",
          color: "white",
          borderColor: "black",
        }}
        onClick={() => navigate("/dashboard/reservations")}
      >
        Reservations List
      </button>
      <button
        className="add_flight"
        style={{
          right: "280px",
          background: "#d63031",
          color: "white",
          borderColor: "#007bff",
        }}
        onClick={() => navigate("/")}
      >
        LogOut
      </button>

      <table className="flight_list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origin</th>
            <th>Destination</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Business</th>
            <th>Economy</th>
            <th>Total Seats</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {flights.map((f) => (
            <tr key={f.ID_flight}>
              <td data-label="ID">{f.ID_flight}</td>
              <td data-label="Origin">{f.origin}</td>
              <td data-label="Destination">{f.destination}</td>
              <td data-label="Departure">{f.temps_aller}</td>
              <td data-label="Arrival">{f.temps_arriver}</td>
              <td data-label="Business">{f.places_business_classe}</td>
              <td data-label="Economy">{f.places_business_economy}</td>
              <td data-label="Total Seats">{f.seats}</td>
              <td data-label="Price">{f.price} €</td>
              <td data-label="Status">{f.status}</td>

              <td data-label="Actions" className="actions">
                <span
                  className="edit"
                  onClick={() => {
                    setErrors({});
                    setSelectedFlight(f);
                    setDataChanged({
                      ...f,
                      temps_aller: f.temps_aller.replace(" ", "T"),
                      temps_arriver: f.temps_arriver.replace(" ", "T"),
                    });
                  }}
                >
                  Edit
                </span>{" "}
                |{" "}
                <span
                  className="delete"
                  onClick={() => confirmDelete(f.ID_flight)}
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

          <label>Business Seats (1–30):</label>
          <input
            type="number"
            value={addFlight.businessSeats}
            onChange={(e) =>
              setAddFlight({ ...addFlight, businessSeats: e.target.value })
            }
          />
          {errors.businessSeats && (
            <p className="error">{errors.businessSeats[0]}</p>
          )}

          <label>Economy Seats (31–120):</label>
          <input
            type="number"
            value={addFlight.economySeats}
            onChange={(e) =>
              setAddFlight({ ...addFlight, economySeats: e.target.value })
            }
          />
          {errors.economySeats && (
            <p className="error">{errors.economySeats[0]}</p>
          )}

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

          <div className="form-buttons">
            <button onClick={() => setNewFlight(null)}>Back</button>
            <button className="save" onClick={saveNewFlight}>
              Add
            </button>
          </div>
        </div>
      )}

      {/* EDIT POPUP */}
      {selectedFlight && (
        <div className="edit-form">
          <h3>Edit Flight</h3>

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

          <label>Business Seats (1–30):</label>
          <input
            type="number"
            value={dataChanged.places_business_classe}
            onChange={(e) =>
              setDataChanged({
                ...dataChanged,
                places_business_classe: e.target.value,
              })
            }
          />
          {errors.businessSeats && (
            <p className="error">{errors.businessSeats[0]}</p>
          )}

          <label>Economy Seats (31–120):</label>
          <input
            type="number"
            value={dataChanged.places_business_economy}
            onChange={(e) =>
              setDataChanged({
                ...dataChanged,
                places_business_economy: e.target.value,
              })
            }
          />
          {errors.economySeats && (
            <p className="error">{errors.economySeats[0]}</p>
          )}

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

          <div className="form-buttons">
            <button onClick={() => setSelectedFlight(null)}>Cancel</button>
            <button className="save" onClick={saveEdit}>
              Save
            </button>
          </div>
        </div>
      )}

      {/* DELETE POPUP */}
      {deletePopup.show && (
        <div className="overlay">
          <div className="popup-box">
            <h3>Do you want to delete this flight ?</h3>

            <div className="popup-buttons">
              <button
                className="no"
                onClick={() => setDeletePopup({ show: false, id: null })}
              >
                No
              </button>

              <button className="yes" onClick={deleteFlight}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
