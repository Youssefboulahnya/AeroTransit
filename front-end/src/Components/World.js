import antalya from "../pictures/antalya.jpg";
import chicago from "../pictures/chicago.jpg";
import istanbul from "../pictures/istanbul.jpg";
import london from "../pictures/london.jpg";
import marrakech from "../pictures/marrakech.webp";
import petra from "../pictures/petra.jpg";
import nablus from "../pictures/nablus.jpg";
import luxor from "../pictures/luxor.jpg";
import diriyah from "../pictures/diriyah.jpg";
import lisbon from "../pictures/lisbon.jpg";
import marseille from "../pictures/marseille.jpg";
import porto from "../pictures/porto.jpg";
import turkey from "../pictures/turkey.jpg";
import usa from "../pictures/usa.jpg";
import uni from "../pictures/uni.jpg";
import portugal from "../pictures/portugal.jpg";
import france from "../pictures/france.jpg";
import jordanie from "../pictures/jordanie.jpg";
import morocco from "../pictures/morocco.jpg";
import palestine from "../pictures/palestine.jpg";
import egypt from "../pictures/egypt.jpg";
import saudi_arabiya from "../pictures/saudi_arabia.jpg";

export default function Travelers() {
  const travelers = [
    {
      id: 1,
      destinationImage: antalya,
      countryImage: turkey,
      placeName: "Ruins of Apollo's Temple",
      cityName: "Antalya,Turkey",
    },
    {
      id: 2,
      destinationImage: chicago,
      countryImage: usa,
      placeName: "Millennium Park",
      cityName: "Chicago,Usa",
    },
    {
      id: 3,
      destinationImage: istanbul,
      countryImage: turkey,
      placeName: "Ortaköy Mosque",
      cityName: "Istanbul,Turkey",
    },
    {
      id: 4,
      destinationImage: london,
      countryImage: uni,
      placeName: "Purple Foot Bridge",
      cityName: "London,UNI",
    },
    {
      id: 5,
      destinationImage: lisbon,
      countryImage: portugal,
      placeName: "Ascensor da Bica",
      cityName: "Lisbon,Portugal",
    },
    {
      id: 6,
      destinationImage: marseille,
      countryImage: france,
      placeName: "Old Port (Vieux-Port)",
      cityName: "Marseille,France",
    },
    {
      id: 7,
      destinationImage: porto,
      countryImage: usa,
      placeName: "Dom Luís I Bridge",
      cityName: "Porto Rico,USA",
    },
    {
      id: 8,
      destinationImage: marrakech,
      countryImage: morocco,
      placeName: "Jemaa el-fna",
      cityName: "Marrakech,Morocco",
    },
    {
      id: 9,
      destinationImage: petra,
      countryImage: jordanie,
      placeName: "Rock-cut facades",
      cityName: "Petra,Jordanie",
    },
    {
      id: 10,
      destinationImage: nablus,
      countryImage: palestine,
      placeName: "Old city of nablus",
      cityName: "Nablus,Palestine",
    },
    {
      id: 11,
      destinationImage: diriyah,
      countryImage: saudi_arabiya,
      placeName: "Turaif District",
      cityName: "Diriyah,Saudi Arabia",
    },
    {
      id: 12,
      destinationImage: luxor,
      countryImage: egypt,
      placeName: "Valley of the kings",
      cityName: "Luxor,Egypt",
    },
  ];
  return (
    <div className="travelers container section">
      <div className="sectionContainer">
        <h2>
          Every step outside is a step closer to the infinite
          <br />
          The map starts where your walls end
        </h2>
        <h2>
          Step outside!
          <br />
          The world is waiting you
        </h2>

        <div className="travelersContainer grid">
          {travelers.map((place) => {
            return (
              <div key={place.id} className="singleTraveler">
                <img
                  src={place.destinationImage}
                  alt=""
                  className="destinationImage"
                />
                <div className="travelerDetails">
                  <div className="travelerPicture">
                    <img
                      src={place.countryImage}
                      alt=""
                      className="travelerImage"
                    />
                  </div>
                  <div className="travelerName">
                    <span>{place.placeName}</span>
                    <p>{place.cityName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
