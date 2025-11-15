import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="footer">
      <div className="sectionContainer container grid">
        <div className="title">
          <p>The sky connect us all</p>
        </div>
        <div className="socialIcon dFlex">
          <a href="https://www.facebook.com/" target="_blank">
            <FaFacebook className="icon" />
          </a>
          <a href="https://www.instagram.com/" target="_blank">
            <RiInstagramFill className="icon" />
          </a>
          <a href="https://www.x.com/" target="_blank">
            <BsTwitterX className="icon" />
          </a>
          <a href="https://www.youtube.com/" target="_blank">
            <FaYoutube className="icon" />
          </a>
        </div>
        <div className="this">
          <div className="footerLinks">
            <span className="linkTitle">Travel Information</span>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>

            <li>
              <Link to="/Manage">Manage your booking</Link>
            </li>
          </div>

          <div className="footerLinks">
            <span className="linkTitle">Quick Guide</span>
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>

            <li>
              <Link to="https://www.flightaware.com/">
                Track your flight with our partners
              </Link>
            </li>
            <li>
              <Link to="/Seats">Seats</Link>
            </li>
          </div>

          <div className="footerLinks">
            <span className="linkTitle">Other Informations</span>

            <li>
              <Link to="/">Destination</Link>
            </li>

            <li>
              <Link to="/Rules">Programme Rules</Link>
            </li>
            <li>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aerotransit.assistance@gmail.com&su=Contact%20depuis%20AeroTransit"
                className="listItem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact with us
              </a>
            </li>
          </div>
        </div>
      </div>

      <div className="copyRightDiv dFlex">
        <p>© 2025 AeroTransit. All rights reserved.</p>
      </div>
    </div>
  );
}
