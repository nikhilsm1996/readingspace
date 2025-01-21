
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
    <Router>
      <div className={`app ${theme}`}>
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
