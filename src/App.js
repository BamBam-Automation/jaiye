import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Membership from './Pages/Membership';
import('preline')


function App() {
  return (
    <div className="bg-[#F9F9F9] p-7">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Membership />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
