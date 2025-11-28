import places from "../pictures/places.png";
export default function Support() {
  return (
    <div className="support container section">
      <div className="sectionContainer">
        <div className="titlesDiv">
          <small>Assistance</small>

          <h2>Plan your travel with confidence</h2>
          <p>
            Find help with booking and travel plans, see what to expect along
            the journy!
          </p>
        </div>

        <div className="infoDiv grid">
          <div className="textDiv grid">
            <div className="singleInfo">
              <span className="number">01</span>
              <h4>Prepare Your Journey: Essential Travel Guidance</h4>
              <p>
                Stay ahead of every requirement before you take off. From visa
                information and entry permits to customs rules and local health
                updates, we provide everything you need to prepare your trip
                with confidence.
              </p>
            </div>

            <div className="singleInfo">
              <span className="number colorOne">02</span>
              <h4>Travel Smart: Comprehensive Insurance Coverage</h4>
              <p>
                Travel with total security. Our comprehensive insurance plans
                protect you from unexpected events, so you can focus on what
                truly matters - experiencing your journey to the fullest.
              </p>
            </div>

            <div className="singleInfo">
              <span className="number colorTwo">03</span>
              <h4>Seamless Arrival: Chauffeur Meet & Greet</h4>
              <p>
                Enjoy a stress-free transition from airport to destination. Our
                professional chauffeurs are ready to greet you upon arrival,
                ensuring comfort, punctuality, and personalized assistance.
              </p>
            </div>
          </div>
          <div className="imgDiv">
            <img src={places} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
