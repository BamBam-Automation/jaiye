import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Membership from './Pages/Membership';


function App() {
  return (
    <div className="bg-[#F9F9F9] text-tertiary min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
