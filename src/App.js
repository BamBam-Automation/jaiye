import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen overflow-y-scroll">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Membership />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path='location' element={<Location />} />
          <Route path='dashboard' element={<Home />} />
          <Route path='explore' element={<Explore />} />
          <Route path="club" element={<Clubpage />} />
          <Route path="ticket" element={<Ticket />} />
          <Route path='scan' element={<QRCode />} />
          <Route path='history' element={<History />} />
          <Route path='profile' element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
