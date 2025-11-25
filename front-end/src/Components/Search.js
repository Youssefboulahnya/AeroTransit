import { RxCalendar } from "react-icons/rx";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Search() {
  const navigate = useNavigate();
  const [color1, setColor1] = useState("singleBtn");
  const [color2, setColor2] = useState("singleBtn");

  const [search, setSearch] = useState({
    cabine: "",
    origin: "",
    destination: "",
    departure: "",
    passengers: 1,
  });

  const condition =
    search.cabine === "" ||
    search.origin === "" ||
    search.destination === "" ||
    search.departure === "" ;

  const handleSearch = () => {
    navigate("/flights", {
      state: {
        ...search,
      },
    });
  };

  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className="btns dFlex">
          <div
            className={color1}
            onClick={() => {
              setColor1("singleBtn clicked");
              setColor2("singleBtn");
              setSearch({ ...search, cabine: "Business"});
            }}
          >
            <span>Business</span>
          </div>

          <div
            className={color2}
            onClick={() => {
              setColor2("singleBtn clicked");
              setColor1("singleBtn");
              setSearch({ ...search, cabine: "Economy" });
            }}
          >
            <span>Economy</span>
          </div>
        </div>

        <div className="searchInputs dFlex">
          <div className="into">
            {/* Coming from */}
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <FaPlaneDeparture className="icon" />
                </div>
                <div className="texts">
                  <h4>Coming from</h4>
                  <input
                    value={search.origin}
                    type="text"
                    placeholder="From..."
                    onChange={(e) =>
                      setSearch({ ...search, origin: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Going to */}
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <FaPlaneArrival className="icon" />
                </div>
                <div className="texts">
                  <h4>Going to</h4>
                  <input
                    value={search.destination}
                    type="text"
                    placeholder="To..."
                    onChange={(e) =>
                      setSearch({ ...search, destination: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Check in */}
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <RxCalendar className="icon" />
                </div>
                <div className="texts">
                  <h4>Check in</h4>
                  <input
                    value={search.departure}
                    type="date"
                    onChange={(e) =>
                      setSearch({ ...search, departure: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Passengers */}
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <FiUser className="icon" />
                </div>
                <div className="texts">
                  <h4>Passengers</h4>
                  <input
                    value={search.passengers}
                    type="number"
                    min="1"
                    onChange={(e) =>
                      setSearch({ ...search, passengers: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            disabled={condition}
            className={
              condition ? "btnDisabled btnBlock dFlex" : "btn btnBlock dFlex"
            }
            onClick={handleSearch}
          >
            Searching
          </button>
        </div>
      </div>
    </div>
  );
}
