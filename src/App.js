// App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import Membership from "./Pages/Membership";
// import Welcome from "./Pages/Welcome";
// import Location from "./Pages/Location";
import Explore from "./Pages/Explore";
import Clubpage from "./Pages/Clubpage";
import Ticket from "./Pages/Ticket";
import QRCode from "./Pages/QRCode";
import History from "./Pages/History";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import EventPage from "./Pages/EventPage";
import AllEvents from "./Pages/AllEvents";
import CocoFest from "./Pages/CocoFest";
import PurchaseSummary from "./Pages/PurchaseSummary";

function App() {
  // Access the isAuthenticated state from Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen overflow-y-scroll md:overflow-hidden">
      <BrowserRouter>
        <Routes>
          <Route path="join" element={<Membership />} />

          <Route path="/" element={<Explore />} />
          <Route path="cocoFest" element={<CocoFest />} />
          <Route
            path="events"
            element={<EventPage />}
            // element={isAuthenticated ? <EventPage /> : <Membership />}
          />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={isAuthenticated ? <Home /> : <Membership />}
          />
          <Route
            path="summary"
            element={isAuthenticated ? <PurchaseSummary /> : <Membership />}
          />
          <Route
            path="club"
            element={<Clubpage />}
            // element={isAuthenticated ? <Clubpage /> : <Membership />}
          />
          <Route
            path="ticket"
            element={isAuthenticated ? <Ticket /> : <Membership />}
          />
          <Route
            path="event-booking"
            element={isAuthenticated ? <AllEvents /> : <Membership />}
          />
          <Route
            path="scan"
            element={isAuthenticated ? <QRCode /> : <Membership />}
          />
          <Route
            path="history"
            element={isAuthenticated ? <History /> : <Membership />}
          />
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Membership />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
