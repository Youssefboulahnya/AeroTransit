import NavBar from "../Components/NavBar";
import Footerr from "../Components/Footerr";
import Home from "../Components/Home";
import Infos from "../Components/Infos";
import Lounge from "../Components/Lounge";
import Search from "../Components/Search";
import Subscribers from "../Components/Subscribers";
import Support from "../Components/Support";
import World from "../Components/World";
import About from "./About";
import Seats from "./Seats";
import Manage from "./Manage";
import NotFound from "./NotFound";
import { Route, Routes } from "react-router-dom";
export default function Trajet() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Search />
              <Support />
              <Infos />
              <Lounge />
              <World />
              <Subscribers />
            </>
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Seats" element={<Seats />} />
        <Route path="/Manage" element={<Manage />} />
      </Routes>
      <Footerr />
    </div>
  );
}
