import { useState } from "react";
import Logo from "../pictures/iconV3.png";
import "./DashboardHome.css";

export default function DashboardHome() {
  const data = [
    {
      id: 1,
      serial: "#A1001",
      origine: "Paris",
      destination: "Londres",
      date: "12/11/2025",
      heure: "08:45",
    },
    {
      id: 2,
      serial: "#A1002",
      origine: "Casablanca",
      destination: "Madrid",
      date: "12/11/2025",
      heure: "09:15",
    },
    {
      id: 3,
      serial: "#A1003",
      origine: "Rome",
      destination: "Berlin",
      date: "12/11/2025",
      heure: "10:30",
    },
    {
      id: 4,
      serial: "#A1004",
      origine: "New York",
      destination: "Toronto",
      date: "12/11/2025",
      heure: "11:20",
    },
    {
      id: 5,
      serial: "#A1005",
      origine: "Tokyo",
      destination: "Séoul",
      date: "12/11/2025",
      heure: "13:00",
    },
    {
      id: 6,
      serial: "#A1006",
      origine: "Londres",
      destination: "Dubaï",
      date: "13/11/2025",
      heure: "02:45",
    },
    {
      id: 7,
      serial: "#A1007",
      origine: "Moscou",
      destination: "Pékin",
      date: "13/11/2025",
      heure: "06:30",
    },
    {
      id: 8,
      serial: "#A1008",
      origine: "Tunis",
      destination: "Istanbul",
      date: "13/11/2025",
      heure: "07:00",
    },
    {
      id: 9,
      serial: "#A1009",
      origine: "Alger",
      destination: "Paris",
      date: "13/11/2025",
      heure: "07:45",
    },
    {
      id: 10,
      serial: "#A1010",
      origine: "Marseille",
      destination: "Rome",
      date: "13/11/2025",
      heure: "08:15",
    },
    {
      id: 11,
      serial: "#A1011",
      origine: "Madrid",
      destination: "Casablanca",
      date: "14/11/2025",
      heure: "09:00",
    },
    {
      id: 12,
      serial: "#A1012",
      origine: "Londres",
      destination: "Paris",
      date: "14/11/2025",
      heure: "10:45",
    },
    {
      id: 13,
      serial: "#A1013",
      origine: "Berlin",
      destination: "Prague",
      date: "14/11/2025",
      heure: "11:15",
    },
    {
      id: 14,
      serial: "#A1014",
      origine: "Lisbonne",
      destination: "Dakar",
      date: "14/11/2025",
      heure: "12:30",
    },
    {
      id: 15,
      serial: "#A1015",
      origine: "Los Angeles",
      destination: "Tokyo",
      date: "14/11/2025",
      heure: "16:00",
    },
    {
      id: 16,
      serial: "#A1016",
      origine: "Montréal",
      destination: "New York",
      date: "15/11/2025",
      heure: "06:00",
    },
    {
      id: 17,
      serial: "#A1017",
      origine: "Pékin",
      destination: "Bangkok",
      date: "15/11/2025",
      heure: "07:45",
    },
    {
      id: 18,
      serial: "#A1018",
      origine: "Séoul",
      destination: "Tokyo",
      date: "15/11/2025",
      heure: "08:30",
    },
    {
      id: 19,
      serial: "#A1019",
      origine: "Dubaï",
      destination: "Londres",
      date: "15/11/2025",
      heure: "09:00",
    },
    {
      id: 20,
      serial: "#A1020",
      origine: "Johannesburg",
      destination: "Nairobi",
      date: "15/11/2025",
      heure: "11:00",
    },
    {
      id: 21,
      serial: "#A1021",
      origine: "Paris",
      destination: "Montréal",
      date: "15/11/2025",
      heure: "13:20",
    },
    {
      id: 22,
      serial: "#A1022",
      origine: "Bruxelles",
      destination: "Rome",
      date: "16/11/2025",
      heure: "07:30",
    },
    {
      id: 23,
      serial: "#A1023",
      origine: "Lyon",
      destination: "Nice",
      date: "16/11/2025",
      heure: "09:15",
    },
    {
      id: 24,
      serial: "#A1024",
      origine: "Tunis",
      destination: "Casablanca",
      date: "16/11/2025",
      heure: "11:00",
    },
    {
      id: 25,
      serial: "#A1025",
      origine: "Alger",
      destination: "Dakar",
      date: "16/11/2025",
      heure: "12:45",
    },
    {
      id: 26,
      serial: "#A1026",
      origine: "Rome",
      destination: "Lisbonne",
      date: "16/11/2025",
      heure: "14:30",
    },
    {
      id: 27,
      serial: "#A1027",
      origine: "Paris",
      destination: "Londres",
      date: "17/11/2025",
      heure: "06:45",
    },
    {
      id: 28,
      serial: "#A1028",
      origine: "Marseille",
      destination: "Alger",
      date: "17/11/2025",
      heure: "08:10",
    },
    {
      id: 29,
      serial: "#A1029",
      origine: "Berlin",
      destination: "Vienne",
      date: "17/11/2025",
      heure: "09:20",
    },
    {
      id: 30,
      serial: "#A1030",
      origine: "Madrid",
      destination: "Barcelone",
      date: "17/11/2025",
      heure: "10:00",
    },
    {
      id: 31,
      serial: "#A1031",
      origine: "Dubaï",
      destination: "Doha",
      date: "17/11/2025",
      heure: "11:45",
    },
    {
      id: 32,
      serial: "#A1032",
      origine: "Tokyo",
      destination: "Osaka",
      date: "18/11/2025",
      heure: "08:20",
    },
    {
      id: 33,
      serial: "#A1033",
      origine: "Londres",
      destination: "Dublin",
      date: "18/11/2025",
      heure: "09:00",
    },
    {
      id: 34,
      serial: "#A1034",
      origine: "Pékin",
      destination: "Shanghai",
      date: "18/11/2025",
      heure: "10:45",
    },
    {
      id: 35,
      serial: "#A1035",
      origine: "New York",
      destination: "Miami",
      date: "18/11/2025",
      heure: "12:00",
    },
    {
      id: 36,
      serial: "#A1036",
      origine: "Montréal",
      destination: "Toronto",
      date: "18/11/2025",
      heure: "13:15",
    },
    {
      id: 37,
      serial: "#A1037",
      origine: "Bruxelles",
      destination: "Amsterdam",
      date: "18/11/2025",
      heure: "14:00",
    },
    {
      id: 38,
      serial: "#A1038",
      origine: "Paris",
      destination: "Lyon",
      date: "19/11/2025",
      heure: "06:30",
    },
    {
      id: 39,
      serial: "#A1039",
      origine: "Casablanca",
      destination: "Rabat",
      date: "19/11/2025",
      heure: "07:45",
    },
    {
      id: 40,
      serial: "#A1040",
      origine: "Rome",
      destination: "Venise",
      date: "19/11/2025",
      heure: "09:10",
    },
  ];

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newFlight, setNewFlight] = useState(null);
  const closeForm = () => setSelectedFlight(null);
  const [dataChanged, setDataChanged] = useState({
    id: "",
    serial: "",
    origine: "",
    destination: "",
    date: "",
    heure: "",
    delete: false,
  });
  const [addFlight,setAddFlight]=useState({
    id: "",
    serial: "",
    origine: "",
    destination: "",
    date: "",
    heure: "",
    delete: false,
  });

  return (
    <div className="dashboard">
      <div className="bloc1">
        <div className="bloc1_1">
          <img src={Logo} alt="logo" className="Logo1" />
        </div>
        <div className="bloc1_2">AeroTransit Dashboard</div>
      </div>
      <div>
        <button
          className="add_flight"
          onClick={() => {
            setNewFlight(1);
          }}
        >
          Add Flight
        </button>
      </div>
      <table className="flight_list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Serial</th>
            <th>Origine</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((flight) => (
            <tr key={flight.id}>
              <td data-label="ID">{flight.id}</td>
              <td data-label="Serial">{flight.serial}</td>
              <td data-label="Origine">{flight.origine}</td>
              <td data-label="Destination">{flight.destination}</td>
              <td data-label="Date">{flight.date}</td>
              <td data-label="Heure">{flight.heure}</td>
              <td className="actions">
                <span
                  className="edit"
                  onClick={() => {
                    setSelectedFlight(flight);
                    setDataChanged({
                      id: flight.id,
                      serial: flight.serial,
                      origine: flight.origine,
                      destination: flight.destination,
                      date: flight.date,
                      heure: flight.heure,
                    });
                  }}
                >
                  Modifier
                </span>{" "}
                | <span className="delete">Supprimer</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedFlight && (
        <div className="edit-form">
          <h3>Modifier le vol #{selectedFlight.id}</h3>

          <label>ID:</label>
          <input
            type="text"
            value={dataChanged.id}
            onChange={(event) =>
              setDataChanged({ ...dataChanged, id: event.target.value })
            }
          />

          <label>Serial:</label>
          <input
            type="text"
            value={dataChanged.serial}
            onChange={(event) =>
              setDataChanged({ ...dataChanged, serial: event.target.value })
            }
          />

          <label>Origine:</label>
          <input
            type="text"
            value={dataChanged.origine}
            onChange={(event) =>
              setDataChanged({ ...dataChanged, origine: event.target.value })
            }
          />

          <label>Destination:</label>
          <input
            type="text"
            value={dataChanged.destination}
            onChange={(event) =>
              setDataChanged({
                ...dataChanged,
                destination: event.target.value,
              })
            }
          />

          <label>Date:</label>
          <input
            type="text"
            value={dataChanged.date}
            onChange={(event) =>
              setDataChanged({ ...dataChanged, date: event.target.value })
            }
          />

          <label>Heure:</label>
          <input
            type="text"
            value={dataChanged.heure}
            onChange={(event) =>
              setDataChanged({ ...dataChanged, heure: event.target.value })
            }
          />

          <div className="form-buttons">
            <button onClick={closeForm}>Fermer</button>
            <button className="save">Sauvegarder</button>
          </div>
        </div>
      )}

      {newFlight && (
        <div className="edit-form">
          <h3>Add Your New Flight</h3>

          <label>ID:</label>
          <input
            type="text"
            value={addFlight.id}
            onChange={(event) =>
              setAddFlight({ ...addFlight, id: event.target.value })
            }
          />

          <label>Serial:</label>
          <input
            type="text"
            value={addFlight.serial}
            onChange={(event) =>
              setAddFlight({ ...addFlight, serial: event.target.value })
            }
          />

          <label>Origine:</label>
          <input
            type="text"
            value={addFlight.origine}
            onChange={(event) =>
              setAddFlight({ ...addFlight, origine: event.target.value })
            }
          />

          <label>Destination:</label>
          <input
            type="text"
            value={addFlight.destination}
            onChange={(event) =>
              setAddFlight({
                ...addFlight,
                destination: event.target.value,
              })
            }
          />

          <label>Date:</label>
          <input
            type="text"
            value={addFlight.date}
            onChange={(event) =>
              setAddFlight({ ...addFlight, date: event.target.value })
            }
          />

          <label>Heure:</label>
          <input
            type="text"
            value={addFlight.heure}
            onChange={(event) =>
              setAddFlight({ ...addFlight, heure: event.target.value })
            }
          />

          <div className="form-buttons">
            <button onClick={() => setNewFlight(null)}>Fermer</button>
            <button className="save">Sauvegarder</button>
          </div>
        </div>
      )}
    </div>
  );
}
