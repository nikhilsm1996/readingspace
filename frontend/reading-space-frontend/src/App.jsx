import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LandingPage from "./pages/LandingPage";
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
// import Cards from "./components/Cards";
// import Profile from './pages/Profile';
// import Payment from './pages/Payment';
import AdminLayout from './components/AdminLayout';
// import Dashboard from './components/Dashboard';
// import TierManagement from './components/TierManagement';
// import Settings from './components/Settings';

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LandingPage theme={theme} setTheme={setTheme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/layout" element={<AdminLayout />} /> 
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/user" element={<UserDashboard />} />
          {/* <Route index element={<Cards />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          {/* <Route path="/tier-management" element={<TierManagement />} /> */}
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* <Route path="payment" element={<Payment />} /> */}
          {/* <Route path="settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
