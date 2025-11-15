import plane_info from "../pictures/plane_info.png";
export default function Lounge() {
  return (
    <div className="lounge container section">
      <div className="sectionContainer grid">
        <div className="imgDiv">
          <img src={plane_info} alt="" />
        </div>

        <div className="textDiv">
          <h2>Care Beyond The Clouds</h2>
          <div className="grids grid">
            <div className="singleGrid">
              <span className="gridTitle">
                Your comfort, from the ground to the sky
              </span>
              <p>
                From your first step at the airport to the final landing, every
                detail is cared for. A dedicated team guides you, fast-tracks
                your boarding, and ensures every part of your journey feels
                effortless.
              </p>
            </div>

            <div className="singleGrid">
              <span className="gridTitle">Priority Boarding</span>
              <p>
                Enjoy a smooth and stress-free departure with dedicated assistance and early boarding access - so you can settle in and relax before takeoff.
              </p>
            </div>

            <div className="singleGrid">
              <span className="gridTitle">Travel that feels personal</span>
              <p>
                Beyond check-ins and greatings, our purpose is simple - to make you
                feel at ease, wherever you fly. 
                Someone is always there to great you, carry your bags, and make sure you smile before takeoff.
              </p>
            </div>

            <div className="singleGrid">
              <span className="gridTitle">Safe journeys, happy memories</span>
              <p>
                We know how important it is to feel secure when your child flies alone.
                Our dedicated companions guide them every step - from check-in to landing - ensuring comfort, fun, and safety throughout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
