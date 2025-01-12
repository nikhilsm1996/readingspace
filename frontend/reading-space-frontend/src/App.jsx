import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLayout from './pages/AdminLayout';
import AdDashboard from './components/AdDashboard';
import TierManagement from './components/AdTierManagement';
import ForgotPassword from './pages/ForgotPassword';
import AdUser from './components/AdUser';
import AdLiveSeats from './components/AdLiveSeats';
import AdPayment from './components/AdPayment';
import AdSettings from './components/AdSettings';
import AdVacate from './components/AdVacate';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdDashboard />} />
          <Route path="tier-management" element={<TierManagement />} />
          <Route path="user" element={<AdUser />} />
          <Route path="live-seats" element={<AdLiveSeats />} />
          <Route path="payment" element={<AdPayment />} />
          <Route path="settings" element={<AdSettings />} />
          <Route path="vacate" element={<AdVacate />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
