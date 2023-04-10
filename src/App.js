import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage"
import ThemePage from "./ThemePage"
import SizePage from './SizePage';
import PrintPage from './PrintPage';
import PhotoShoot from './PhotoShoot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/size' element={<SizePage/>} />
        <Route path='/theme' element={<ThemePage/>} />
        <Route path='/print' element={<PrintPage/>} />
        <Route path='/photoShoot' element={<PhotoShoot/>} />
      </Routes>
    </Router>
  );
}

export default App;
