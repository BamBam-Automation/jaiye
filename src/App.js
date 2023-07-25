import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Membership from './Pages/Membership';
import Welcome from './Pages/Welcome';
import Location from './Pages/Location';
import Explore from './Pages/Explore';
import Clubpage from './Pages/Clubpage';


function App() {
  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Membership />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path='location' element={<Location />} />
          <Route path='explore' element={<Explore />} />
          <Route path="club" element={<Clubpage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
