import { RxCalendar } from "react-icons/rx";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaPlaneArrival } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdAirlineSeatReclineExtra } from "react-icons/md";
import { useState } from "react";



export default function Search() {
  const [inputDisabel, setInputDisabel] = useState({disabled:"",icon:"iconDiv"});
  const [color1, setColor1] = useState("singleBtn");
  const [color2, setColor2] = useState("singleBtn");
  const [search, setSearch] = useState({
    direction: "",
    origin: "",
    destination: "",
    depurture: "",
    arrival: "",
    passangers: 1,
    cabine: "",
  });
  const condition =
    search.direction === "" ||
    search.origin === "" ||
    search.destination === "" ||
    search.depurture === "" ||
    search.arrival === "" ||
   
    search.cabine === "";
   
   


  return (
    <div className="search container section">
      <div className="sectionContainer grid">
        <div className=" btns dFlex">
          <div
            className={color1}
            onClick={() => {
              setColor1("singleBtn clicked");
              setColor2("singleBtn");
              setSearch({ ...search, direction: "One Way" });
              setInputDisabel({
                ...inputDisabel,
                disabled: "disabled",
                icon: "iconDisabled",
              });
            }}
          >
            <span>One Way</span>
          </div>
          <div
            className={color2}
            onClick={() => {
              setColor2("singleBtn clicked");
              setColor1("singleBtn");
              setSearch({ ...search, direction: "Return" });
              setInputDisabel({
                ...inputDisabel,
                disabled: "",
                icon: "iconDiv",
              });
            }}
          >
            <span>Return</span>
          </div>
        </div>

        <div className="searchInputs dFlex">
          <div className="into">
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
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        origin: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
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
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        destination: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <RxCalendar className="icon" />
                </div>
                <div className="texts">
                  <h4>Check in</h4>
                  <input
                    value={search.depurture}
                    type="date"
                    placeholder="Add date"
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        depurture: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="border">
              <div className="singleInput dFlex">
                <div className={inputDisabel.icon}>
                  <RxCalendar className="icon" />
                </div>
                <div className="texts">
                  <h4>Check out</h4>
                  <input
                    disabled={inputDisabel.disabled}
                    value={search.arrival}
                    type="date"
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        arrival: event.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="into exception">
            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <FiUser className="icon" />
                </div>
                <div className="texts">
                  <h4>Passangers</h4>
                  <input
                    value={search.passangers}
                    type="number"
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        passangers: event.target.value,
                      });
                    }}
                  />
                  
                </div>
              </div>
            </div>

            <div className="border">
              <div className="singleInput dFlex">
                <div className="iconDiv">
                  <MdAirlineSeatReclineExtra className="icon" />
                </div>
                <div className="texts">
                  <h4>Cabine</h4>
                  {/* <input type="text" /> */}
                  <select
                    value={search.cabine}
                    style={{ border: "none" }}
                    onChange={(event) => {
                      setSearch({
                        ...search,
                        cabine: event.target.value,
                      });
                    }}
                  >
                    <option>Economy</option>
                    <option>Business</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button
            className={
              condition ? "btnDisabled btnBlock dFlex" : "btn btnBlock dFlex"
            }
          >
            Searching
          </button>
        </div>
      </div>
    </div>
  );
}
