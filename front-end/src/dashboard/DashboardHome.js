// import { useState } from "react";
// import Logo from "../pictures/iconV3.png";
// import "./DashboardHome.css";

// export default function DashboardHome() {
//   const data = [
//     {
//       id: 1,
//       serial: "#A1001",
//       origine: "Paris",
//       destination: "Londres",
//       date: "12/11/2025",
//       heure: "08:45",
//     },

//   ];

//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [newFlight, setNewFlight] = useState(null);
//   const closeForm = () => setSelectedFlight(null);
//   const [dataChanged, setDataChanged] = useState({
//     id: "",
//     serial: "",
//     origine: "",
//     destination: "",
//     date: "",
//     heure: "",
//     delete: false,
//   });
//   const [addFlight,setAddFlight]=useState({
//     id: "",
//     serial: "",
//     origine: "",
//     destination: "",
//     date: "",
//     heure: "",
//     delete: false,
//   });

//   return (
//     <div className="dashboard">
//       <div className="bloc1">
//         <div className="bloc1_1">
//           <img src={Logo} alt="logo" className="Logo1" />
//         </div>
//         <div className="bloc1_2">AeroTransit Dashboard</div>
//       </div>
//       <div>
//         <button
//           className="add_flight"
//           onClick={() => {
//             setNewFlight(1);
//           }}
//         >
//           Add Flight
//         </button>
//       </div>
//       <table className="flight_list">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Serial</th>
//             <th>Origine</th>
//             <th>Destination</th>
//             <th>Date</th>
//             <th>Heure</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((flight) => (
//             <tr key={flight.id}>
//               <td data-label="ID">{flight.id}</td>
//               <td data-label="Serial">{flight.serial}</td>
//               <td data-label="Origine">{flight.origine}</td>
//               <td data-label="Destination">{flight.destination}</td>
//               <td data-label="Date">{flight.date}</td>
//               <td data-label="Heure">{flight.heure}</td>
//               <td className="actions">
//                 <span
//                   className="edit"
//                   onClick={() => {
//                     setSelectedFlight(flight);
//                     setDataChanged({
//                       id: flight.id,
//                       serial: flight.serial,
//                       origine: flight.origine,
//                       destination: flight.destination,
//                       date: flight.date,
//                       heure: flight.heure,
//                     });
//                   }}
//                 >
//                   Modifier
//                 </span>{" "}
//                 | <span className="delete">Supprimer</span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {selectedFlight && (
//         <div className="edit-form">
//           <h3>Modifier le vol #{selectedFlight.id}</h3>

//           <label>ID:</label>
//           <input
//             type="text"
//             value={dataChanged.id}
//             onChange={(event) =>
//               setDataChanged({ ...dataChanged, id: event.target.value })
//             }
//           />

//           <label>Serial:</label>
//           <input
//             type="text"
//             value={dataChanged.serial}
//             onChange={(event) =>
//               setDataChanged({ ...dataChanged, serial: event.target.value })
//             }
//           />

//           <label>Origine:</label>
//           <input
//             type="text"
//             value={dataChanged.origine}
//             onChange={(event) =>
//               setDataChanged({ ...dataChanged, origine: event.target.value })
//             }
//           />

//           <label>Destination:</label>
//           <input
//             type="text"
//             value={dataChanged.destination}
//             onChange={(event) =>
//               setDataChanged({
//                 ...dataChanged,
//                 destination: event.target.value,
//               })
//             }
//           />

//           <label>Date:</label>
//           <input
//             type="text"
//             value={dataChanged.date}
//             onChange={(event) =>
//               setDataChanged({ ...dataChanged, date: event.target.value })
//             }
//           />

//           <label>Heure:</label>
//           <input
//             type="text"
//             value={dataChanged.heure}
//             onChange={(event) =>
//               setDataChanged({ ...dataChanged, heure: event.target.value })
//             }
//           />

//           <div className="form-buttons">
//             <button onClick={closeForm}>Fermer</button>
//             <button className="save">Sauvegarder</button>
//           </div>
//         </div>
//       )}

//       {newFlight && (
//         <div className="edit-form">
//           <h3>Add Your New Flight</h3>

//           <label>ID:</label>
//           <input
//             type="text"
//             value={addFlight.id}
//             onChange={(event) =>
//               setAddFlight({ ...addFlight, id: event.target.value })
//             }
//           />

//           <label>Serial:</label>
//           <input
//             type="text"
//             value={addFlight.serial}
//             onChange={(event) =>
//               setAddFlight({ ...addFlight, serial: event.target.value })
//             }
//           />

//           <label>Origine:</label>
//           <input
//             type="text"
//             value={addFlight.origine}
//             onChange={(event) =>
//               setAddFlight({ ...addFlight, origine: event.target.value })
//             }
//           />

//           <label>Destination:</label>
//           <input
//             type="text"
//             value={addFlight.destination}
//             onChange={(event) =>
//               setAddFlight({
//                 ...addFlight,
//                 destination: event.target.value,
//               })
//             }
//           />

//           <label>Date:</label>
//           <input
//             type="text"
//             value={addFlight.date}
//             onChange={(event) =>
//               setAddFlight({ ...addFlight, date: event.target.value })
//             }
//           />

//           <label>Heure:</label>
//           <input
//             type="text"
//             value={addFlight.heure}
//             onChange={(event) =>
//               setAddFlight({ ...addFlight, heure: event.target.value })
//             }
//           />

//           <div className="form-buttons">
//             <button onClick={() => setNewFlight(null)}>Fermer</button>
//             <button className="save">Sauvegarder</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import Logo from "../pictures/iconV3.png";
import "./DashboardHome.css";
import api from "../api"; // axios instance

export default function DashboardHome() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newFlight, setNewFlight] = useState(null);

  // ====== fetch flights from backend ======
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

  // ====== delete flight ======
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce vol ?")) return;

    try {
      await api.delete(`/flights/${id}`);
      setFlights(flights.filter((f) => f.ID_flight !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ====== values for editing ======
  const [dataChanged, setDataChanged] = useState({
    ID_flight: "",
    Origin: "",
    Destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    seats: "",
  });

  // ====== values for adding new flight ======
  const [addFlight, setAddFlight] = useState({
    Origin: "",
    Destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    seats: "",
  });

  // ====== update flight ======
  const saveEdit = async () => {
    try {
      await api.put(`/flights/${dataChanged.ID_flight}`, dataChanged);
      fetchFlights();
      setSelectedFlight(null);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // ====== add flight ======
  const saveNewFlight = async () => {
    try {
      await api.post("/flights", addFlight);
      fetchFlights();
      setNewFlight(null);
    } catch (err) {
      console.error("Create error:", err);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading flights...</p>;

  return (
    <div className="dashboard">
      {/* ===== HEADER ===== */}
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">AeroTransit Dashboard</div>
      </div>

      {/* ===== ADD FLIGHT BUTTON ===== */}
      <button className="add_flight" onClick={() => setNewFlight(true)}>
        Add Flight
      </button>

      {/* ===== FLIGHT TABLE ===== */}
      <table className="flight_list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Origine</th>
            <th>Destination</th>
            <th>Temps Aller</th>
            <th>Temps Arriver</th>
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
                    setSelectedFlight(f);
                    setDataChanged(f);
                  }}
                >
                  Modifier
                </span>{" "}
                |{" "}
                <span
                  className="delete"
                  onClick={() => handleDelete(f.ID_flight)}
                >
                  Supprimer
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== EDIT FLIGHT POPUP ===== */}
      {selectedFlight && (
        <div className="edit-form">
          <h3>Modifier le vol #{selectedFlight.ID_flight}</h3>

          <label>Origine:</label>
          <input
            type="text"
            value={dataChanged.Origin}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, Origin: e.target.value })
            }
          />

          <label>Destination:</label>
          <input
            type="text"
            value={dataChanged.Destination}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, Destination: e.target.value })
            }
          />

          <label>Temps Aller:</label>
          <input
            type="text"
            value={dataChanged.temps_aller}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, temps_aller: e.target.value })
            }
          />

          <label>Temps Arriver:</label>
          <input
            type="text"
            value={dataChanged.temps_arriver}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, temps_arriver: e.target.value })
            }
          />

          <label>Seats:</label>
          <input
            type="number"
            value={dataChanged.seats}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, seats: e.target.value })
            }
          />

          <label>Price (€):</label>
          <input
            type="number"
            value={dataChanged.price}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, price: e.target.value })
            }
          />

          <label>Flight Status :</label>
          <input
            type="status"
            value={dataChanged.status}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, status: e.target.value })
            }
          />

          <div className="form-buttons">
            <button onClick={() => setSelectedFlight(null)}>Fermer</button>
            <button className="save" onClick={saveEdit}>
              Sauvegarder
            </button>
          </div>
        </div>
      )}

      {/* ===== ADD NEW FLIGHT POPUP ===== */}
      {newFlight && (
        <div className="edit-form">
          <h3>Add New Flight</h3>

          <label>Origine:</label>
          <input
            type="text"
            value={addFlight.Origin}
            onChange={(e) =>
              setAddFlight({ ...addFlight, Origin: e.target.value })
            }
          />

          <label>Destination:</label>
          <input
            type="text"
            value={addFlight.Destination}
            onChange={(e) =>
              setAddFlight({ ...addFlight, Destination: e.target.value })
            }
          />

          <label>Temps Aller:</label>
          <input
            type="text"
            value={addFlight.temps_aller}
            onChange={(e) =>
              setAddFlight({ ...addFlight, temps_aller: e.target.value })
            }
          />

          <label>Temps Arriver:</label>
          <input
            type="text"
            value={addFlight.temps_arriver}
            onChange={(e) =>
              setAddFlight({ ...addFlight, temps_arriver: e.target.value })
            }
          />

          <label>Seats:</label>
          <input
            type="number"
            value={addFlight.seats}
            onChange={(e) =>
              setAddFlight({ ...addFlight, seats: e.target.value })
            }
          />

          <label>Price (€):</label>
          <input
            type="number"
            value={addFlight.price}
            onChange={(e) =>
              setAddFlight({ ...addFlight, price: e.target.value })
            }
          />

          <label>Flight Status :</label>
          <input
            type="status"
            value={addFlight.status}
            onChange={(e) =>
              setAddFlight({ ...addFlight, status: e.target.value })
            }
          />

          <div className="form-buttons">
            <button onClick={() => setNewFlight(null)}>Fermer</button>
            <button className="save" onClick={saveNewFlight}>
              Sauvegarder
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
