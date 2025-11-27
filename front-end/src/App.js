import NavBar from "./Components/NavBar";
import Footerr from "./Components/Footerr";
import Home from "./Components/Home";
import Infos from "./Components/Infos";
import Lounge from "./Components/Lounge";
import Search from "./Components/Search";
import Feedback from "./Components/Feedback";
import Support from "./Components/Support";
import World from "./Components/World";
import Statistics from "./Components/Statistics";
import About from "./Pages/About";
import Seats from "./Pages/Seats";
import Manage from "./Pages/Manage";
import NotFound from "./Pages/NotFound";
import ProgRules from "./Pages/ProgRules";
import FAQ from "./Pages/FAQ";
import LogIn from "./dashboard/LogIn";
import DashboardHome from "./dashboard/DashboardHome";
import ProtectedRoute from "./dashboard/ProtectedRoute";
import Flights from "./Search_Result/Flights";
import FlightDetails from "./Search_Result/FlightDetails";
import FlightPassengers from "./Search_Result/PassengersInfos";
import Payment from "./Search_Result/Payment";
import { Route, Routes, useLocation } from "react-router-dom";
import BookingConfirmation from "./Search_Result/BookingConfirmation";

import ManageBooking from "./Pages/ManageBooking";

// import Footer from "./Components/Footerr";

function App() {
  const location = useLocation();
  const hideNavAndFooter =
    location.pathname.startsWith("/Manage") ||
    location.pathname.startsWith("/dashboard");
  return (
    <div>
      {!hideNavAndFooter && <NavBar />}

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
              <Statistics />
              <Feedback />
            </>
          }
        />
        <Route path="/About" element={<About />} />
        <Route path="/Seats" element={<Seats />} />
        <Route path="/Manage" element={<Manage />} />
        <Route path="/Manage/dashboard" element={<ManageBooking />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Rules" element={<ProgRules />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/dashboard" element={<LogIn />} />
        <Route
          path="/dashboard/Home"
          element={
            <ProtectedRoute>
              <DashboardHome />
            </ProtectedRoute>
          }
        />
        <Route path="/Flights" element={<Flights />} />
        <Route path="/flight-details" element={<FlightDetails />} />
        <Route path="/flight-passengers" element={<FlightPassengers />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
      {!hideNavAndFooter && <Footerr />}
      {/* <LogIn/> */}
      {/* <DashboardHome/> */}
    </div>
  );
}
export default App;
