import { BsBookmarkCheck, BsShieldCheck } from "react-icons/bs";
import { RxCalendar } from "react-icons/rx";
import { GiMeal } from "react-icons/gi";
import { BsLuggage } from "react-icons/bs";
import { RiPlayLargeLine } from "react-icons/ri";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { Ri24HoursLine } from "react-icons/ri";

export default function infos() {
  const infos = [
    {
      id: 1,
      title: "Comfortable Cabines",
      infoContent:
        "With AeroTransit , you travel on board modern, comfortable and safe aircraft.",
      iconName: MdOutlineAirlineSeatReclineExtra,
      style_classes: "iconDiv dFlex ",
    },
    {
      id: 2,
      title: "Highest flexibility",
      infoContent:
        "Customise, change or cancel or your booking with ease using Manage My Booking",
      iconName: RxCalendar,
      style_classes: "iconDiv dFlex colorOne",
    },
    {
      id: 3,
      title: "Travel Confidence",
      infoContent:
        "Fly with peace of mind. From trip prep to final landing, every detail is checked, secured, and cared for.",
      iconName: BsShieldCheck,
      style_classes: "iconDiv dFlex colorTwo",
    },
    {
      id: 4,
      title: "Smart Savings",
      infoContent:
        "Discover flexible fares and time-limited offers for smart travelers",
      iconName: BsBookmarkCheck,
      style_classes: "iconDiv dFlex colorTree",
    },
    {
      id: 5,
      title: "Meals on Board",
      infoContent:
        "We've brought the best of Moroccan hospitality to our flights to offer you a truly inspiring culinary experience.",
      iconName: GiMeal,
      style_classes: "iconDiv dFlex colorFour",
    },
    {
      id: 6,
      title: "Baggage Informations",
      infoContent:
        "Acceptance of passenger baggage is subject to general conditions relating to the number of pieces, volume, packaging and/or nature of the baggage contents",
      iconName: BsLuggage,
      style_classes: "iconDiv dFlex colorFive",
    },
    {
      id: 7,
      title: "Onboard Entertainment",
      infoContent:
        "The best in-flight entertainment. From Hollywood blockbusters to classics, with a wide selection of films, series and documentaries.",
      iconName: RiPlayLargeLine,
      style_classes: "iconDiv dFlex colorSex",
    },
    {
      id: 8,
      title: "Best value",
      infoContent:
        "Earn extra Asia Miles and instant discounts when you book directly with us - subject to availability",
      iconName: RiMoneyDollarCircleLine,
      style_classes: "iconDiv dFlex colorSeven",
    },
    {
      id: 9,
      title: "Greatest assurance",
      infoContent:
        "24-hour free cancellation for AeroTransit members - Terms and conditions apply",
      iconName: Ri24HoursLine,
      style_classes: "iconDiv dFlex colorEight",
    },
  ];
  return (
    <div>
      <div className="info section">
        <div className="infoContainer container">
          <div className="titleDiv dFlex">
            <h2>
              Where Every Journey Becomes a Story, So Start Collecting Moments
              Not Just Miles
            </h2>
          </div>
          <div className="cardsDiv grid">
            {/*  */}{" "}
            {infos.map((element) => {
              return (
                <div className="singleCard grid">
                  <div className={element.style_classes}>
                    <element.iconName className="icon" />
                  </div>
                  <span className="cardTitle">{element.title}</span>
                  <p>{element.infoContent}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
