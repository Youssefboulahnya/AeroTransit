
import { TbMenu2 } from "react-icons/tb";
import icon from "../pictures/iconV2.png";
import { useState } from "react";
import { MdManageAccounts } from "react-icons/md";
import { Link } from "react-router-dom";

export default function NavBar() {
  // pour hider le nav barre avec le scroll
  const [active, setActive] = useState("navBarMenu");

  function handleNavBar(){

  if(active==="navBarMenu showNavBar"){
    setActive("navBarMenu");
  }
  else{
    setActive("navBarMenu showNavBar");
  }
  }

  const [bg, addBg] = useState("navBarTwo");
// -------------------------------------
  const addBgColor = () => {
    if (window.scrollY >= 10) {
      addBg("navBarTwo navbar_With_Bg");
    } else {
      addBg("navBarTwo navbar_With_Bg");
    }
  };
// ----------------------------------------
  window.addEventListener("scroll", addBgColor);

  return (
    <div className="navBar dFlex">
      <div className="navBarOne dFlex">
       
        <div className="atb dFlex">
          <span>
            <Link to="/Manage" className="manage">
              <MdManageAccounts />
              Manage Your Booking
            </Link>
          </span>
        </div>
      </div>
      <div className={bg}>
        <div className="logoDiv">
          <Link to="/">
            <img src={icon} alt="Logo" className="Logo" />
          </Link>
        </div>

        <div className={active}>
          <ul className="menu dFlex">
            <Link to="/">
              <li onClick={handleNavBar} className="listItem">
                Home
              </li>
            </Link>
            
            <Link to="/About">
              <li onClick={handleNavBar} className="listItem">
                About
              </li>
            </Link>

            <Link to="/Seats">
              <li onClick={handleNavBar} className="listItem">
                Seats
              </li>
            </Link>

            <li onClick={handleNavBar} className="listItem no">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aerotransit.assistance@gmail.com&su=Contact%20depuis%20AeroTransit"
                className="listItem"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact
              </a>
            </li>
          </ul>
          <button onClick={handleNavBar} className=" btn dFlex btnOne">
            <a
              href="mailto:aerotransit.assistance@gmail.com"
              className="listItem"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </button>
        </div>
        <button className="btn dFlex btnTwo">Conatact</button>
        <div className="iconContainer" onClick={handleNavBar}>
          <TbMenu2 className="icon" />
        </div>
      </div>
    </div>
  );
}
