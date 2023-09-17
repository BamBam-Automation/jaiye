// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import Membership from './Pages/Membership';
import Welcome from './Pages/Welcome';
import Location from './Pages/Location';
import Explore from './Pages/Explore';
import Clubpage from './Pages/Clubpage';
import Ticket from './Pages/Ticket';
import QRCode from './Pages/QRCode';
import History from './Pages/History';
import Home from './Pages/Home';
import Profile from './Pages/Profile';

function App() {
  // Access the isAuthenticated state from your Redux store
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen overflow-y-scroll">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Membership />} />
          <Route path="welcome" element={<Welcome />} />

          {/* Protected routes */}
          <Route
            path="dashboard"
            element={isAuthenticated ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="location"
            element={isAuthenticated ? <Location /> : <Navigate to="/" />}
          />
          <Route
            path="explore"
            element={isAuthenticated ? <Explore /> : <Navigate to="/" />}
          />
          <Route
            path="club"
            element={isAuthenticated ? <Clubpage /> : <Navigate to="/" />}
          />
          <Route
            path="ticket"
            element={isAuthenticated ? <Ticket /> : <Navigate to="/" />}
          />
          <Route
            path="scan"
            element={isAuthenticated ? <QRCode /> : <Navigate to="/" />}
          />
          <Route
            path="history"
            element={isAuthenticated ? <History /> : <Navigate to="/" />}
          />
          <Route
            path="profile"
            element={isAuthenticated ? <Profile /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
