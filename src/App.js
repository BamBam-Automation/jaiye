import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Membership from './Pages/Membership';
import Welcome from './Pages/Welcome';
import Location from './Pages/Location';
import Explore from './Pages/Explore';
import Clubpage from './Pages/Clubpage';
import Ticket from './Pages/Ticket';


function App() {
  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen overflow-y-scroll">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Membership />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path='location' element={<Location />} />
          <Route path='explore' element={<Explore />} />
          <Route path="club" element={<Clubpage />} />
          <Route path="ticket" element={<Ticket />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
