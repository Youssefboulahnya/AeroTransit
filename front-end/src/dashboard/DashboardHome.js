// import { useEffect, useState } from "react";
// import Logo from "../pictures/iconV3.png";
// import "./DashboardHome.css";
// import api from "../api"; // axios instance

// export default function DashboardHome() {
//   const [flights, setFlights] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [selectedFlight, setSelectedFlight] = useState(null);
//   const [newFlight, setNewFlight] = useState(null);

//   // ====== fetch flights ======
//   const fetchFlights = async () => {
//     try {
//       const res = await api.get("/flights");
//       setFlights(res.data);
//     } catch (err) {
//       console.error("Error loading flights:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFlights();
//   }, []);

//   // ====== delete flight ======
//   const handleDelete = async (id) => {
//     if (!window.confirm("Voulez-vous vraiment supprimer ce vol ?")) return;

//     try {
//       await api.delete(`/flights/${id}`);
//       setFlights((prev) => prev.filter((f) => f.ID_flight !== id));
//     } catch (err) {
//       console.error("Delete error:", err);
//     }
//   };

//   // ====== values for editing ======
//   const [dataChanged, setDataChanged] = useState({
//     ID_flight: "",
//     origin: "",
//     destination: "",
//     temps_aller: "",
//     temps_arriver: "",
//     price: "",
//     status: "",
//     seats: "",
//   });

//   // ====== values for adding ======
//   const [addFlight, setAddFlight] = useState({
//     origin: "",
//     destination: "",
//     temps_aller: "",
//     temps_arriver: "",
//     price: "",
//     status: "",
//     seats: "",
//   });

//   // ====== update flight ======
//   const saveEdit = async () => {
//     // 🚨 Vérification logique avant d'envoyer au backend
//     if (
//       dataChanged.origin.trim().toLowerCase() ===
//       dataChanged.destination.trim().toLowerCase()
//     ) {
//       alert(
//         "⚠️ Attention : la destination ne peut pas être identique à l'origine."
//       );
//       return;
//     }

//     try {
//       const res = await api.put(
//         `/flights/${dataChanged.ID_flight}`,
//         dataChanged
//       );

//       // update front-end
//       setFlights((prev) =>
//         prev.map((f) =>
//           f.ID_flight === dataChanged.ID_flight ? res.data.flight : f
//         )
//       );

//       setSelectedFlight(null);
//     } catch (err) {
//       console.error("Update error:", err);
//     }
//   };

//   // ====== add flight ======
//   const saveNewFlight = async () => {
//     try {
//       await api.post("/flights", addFlight);
//       fetchFlights();
//       setNewFlight(null);
//     } catch (err) {
//       console.error("Create error:", err);
//     }
//   };

//   if (loading) return <p style={{ textAlign: "center" }}>Loading flights...</p>;

//   return (
//     <div className="dashboard">
//       {/* HEADER */}
//       <div className="bloc1">
//         <div className="bloc1_1">
//           <img src={Logo} alt="logo" className="Logo1" />
//         </div>
//         <div className="bloc1_2">AeroTransit Dashboard</div>
//       </div>

//       {/* BUTTON ADD */}
//       <button className="add_flight" onClick={() => setNewFlight(true)}>
//         Add Flight
//       </button>

//       {/* TABLE */}
//       <table className="flight_list">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Origin</th>
//             <th>Destination</th>
//             <th>Departure</th>
//             <th>Arrival</th>
//             <th>Seats</th>
//             <th>Price</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {flights.map((f) => (
//             <tr key={f.ID_flight}>
//               <td>{f.ID_flight}</td>
//               <td>{f.origin}</td>
//               <td>{f.destination}</td>
//               <td>{f.temps_aller}</td>
//               <td>{f.temps_arriver}</td>
//               <td>{f.seats}</td>
//               <td>{f.price} €</td>
//               <td>{f.status}</td>

//               <td className="actions">
//                 <span
//                   className="edit"
//                   onClick={() => {
//                     setSelectedFlight(f);
//                     setDataChanged(f);
//                   }}
//                 >
//                   Modifier
//                 </span>{" "}
//                 |{" "}
//                 <span
//                   className="delete"
//                   onClick={() => handleDelete(f.ID_flight)}
//                 >
//                   Supprimer
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* EDIT POPUP */}
//       {selectedFlight && (
//         <div className="edit-form">
//           <h3>Edit Flight #{selectedFlight.ID_flight}</h3>

//           <label>Origin:</label>
//           <input
//             type="text"
//             value={dataChanged.origin}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, origin: e.target.value })
//             }
//           />

//           <label>Destination:</label>
//           <input
//             type="text"
//             value={dataChanged.destination}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, destination: e.target.value })
//             }
//           />

//           <label>Departure Time:</label>
//           <input
//             type="text"
//             value={dataChanged.temps_aller}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, temps_aller: e.target.value })
//             }
//           />

//           <label>Arrival Time:</label>
//           <input
//             type="text"
//             value={dataChanged.temps_arriver}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, temps_arriver: e.target.value })
//             }
//           />

//           <label>Seats:</label>
//           <input
//             type="number"
//             value={dataChanged.seats}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, seats: e.target.value })
//             }
//           />

//           <label>Price (€):</label>
//           <input
//             type="number"
//             value={dataChanged.price}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, price: e.target.value })
//             }
//           />

//           <label>Status:</label>
//           <select
//             value={dataChanged.status}
//             onChange={(e) =>
//               setDataChanged({ ...dataChanged, status: e.target.value })
//             }
//           >
//             <option value="scheduled">scheduled</option>
//             <option value="arrived">arrived</option>
//           </select>

//           <div className="form-buttons">
//             <button onClick={() => setSelectedFlight(null)}>Fermer</button>
//             <button className="save" onClick={saveEdit}>
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ADD POPUP */}
//       {newFlight && (
//         <div className="edit-form">
//           <h3>Add New Flight</h3>

//           <label>Origin:</label>
//           <input
//             type="text"
//             value={addFlight.origin}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, origin: e.target.value })
//             }
//           />

//           <label>Destination:</label>
//           <input
//             type="text"
//             value={addFlight.destination}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, destination: e.target.value })
//             }
//           />

//           <label>Departure Time:</label>
//           <input
//             type="text"
//             value={addFlight.temps_aller}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, temps_aller: e.target.value })
//             }
//           />

//           <label>Arrival Time:</label>
//           <input
//             type="text"
//             value={addFlight.temps_arriver}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, temps_arriver: e.target.value })
//             }
//           />

//           <label>Seats:</label>
//           <input
//             type="number"
//             value={addFlight.seats}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, seats: e.target.value })
//             }
//           />

//           <label>Price (€):</label>
//           <input
//             type="number"
//             value={addFlight.price}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, price: e.target.value })
//             }
//           />

//           <label>Status:</label>
//           <select
//             value={addFlight.status}
//             onChange={(e) =>
//               setAddFlight({ ...addFlight, status: e.target.value })
//             }
//           >
//             <option value="scheduled">scheduled</option>
//             <option value="arrived">arrived</option>
//           </select>

//           <div className="form-buttons">
//             <button onClick={() => setNewFlight(null)}>back</button>
//             <button className="save" onClick={saveNewFlight}>
//               Save
//             </button>
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

  // ====== fetch flights ======
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
      setFlights((prev) => prev.filter((f) => f.ID_flight !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ====== values for editing ======
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

  // ====== values for adding ======
  const [addFlight, setAddFlight] = useState({
    origin: "",
    destination: "",
    temps_aller: "",
    temps_arriver: "",
    price: "",
    status: "",
    seats: "",
  });

  // ====== update flight ======
  const saveEdit = async () => {
    // 🚨 Vérification 1 : origin = destination
    if (
      dataChanged.origin.trim().toLowerCase() ===
      dataChanged.destination.trim().toLowerCase()
    ) {
      alert(
        "⚠️ Attention : la destination ne peut pas être identique à l'origine."
      );
      return;
    }

    // 🚨 Vérification 2 : departure < arrival
    const dep = new Date(dataChanged.temps_aller);
    const arr = new Date(dataChanged.temps_arriver);

    if (isNaN(dep.getTime()) || isNaN(arr.getTime())) {
      alert("⚠️ Format de la date/heure invalide !");
      return;
    }

    if (dep >= arr) {
      alert(
        "⚠️ L'heure de départ doit être strictement inférieure à l'heure d'arrivée."
      );
      return;
    }

    try {
      const res = await api.put(
        `/flights/${dataChanged.ID_flight}`,
        dataChanged
      );

      // update front-end
      setFlights((prev) =>
        prev.map((f) =>
          f.ID_flight === dataChanged.ID_flight ? res.data.flight : f
        )
      );

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
      {/* HEADER */}
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">AeroTransit Dashboard</div>
      </div>

      {/* BUTTON ADD */}
      <button className="add_flight" onClick={() => setNewFlight(true)}>
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

          <label>Destination:</label>
          <input
            type="text"
            value={dataChanged.destination}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, destination: e.target.value })
            }
          />

          <label>Departure Time:</label>
          <input
            type="text"
            value={dataChanged.temps_aller}
            onChange={(e) =>
              setDataChanged({ ...dataChanged, temps_aller: e.target.value })
            }
          />

          <label>Arrival Time:</label>
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

          <label>Destination:</label>
          <input
            type="text"
            value={addFlight.destination}
            onChange={(e) =>
              setAddFlight({ ...addFlight, destination: e.target.value })
            }
          />

          <label>Departure Time:</label>
          <input
            type="text"
            value={addFlight.temps_aller}
            onChange={(e) =>
              setAddFlight({ ...addFlight, temps_aller: e.target.value })
            }
          />

          <label>Arrival Time:</label>
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
            <button onClick={() => setNewFlight(null)}>back</button>
            <button className="save" onClick={saveNewFlight}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
