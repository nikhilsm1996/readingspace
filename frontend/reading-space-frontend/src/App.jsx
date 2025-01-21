import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
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
import UserLayout from './pages/UserLayout';
import UsDashboard from './components/UsDashboard';
import UsSwitchSeat from './components/UsSwitchSeat';
import UsVacateSeat from './components/UsVacateSeat';
import UsPayment from './components/UsPayment';
import UsReportIssue from './components/UsReportIssue';
import SeatSelection from './pages/SeatSelection';
import Payment from './components/Payment';
import UsProfile from './components/UsProfile';
import AdBlog from './components/AdBlog';
import AdNotification from './components/AdNotification';
import AdIssue from './components/AdIssue';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<Navigate to="dashboard" />} />
          <Route path="/admin" element={<AdDashboard />} />
          <Route path="dashboard" element={<AdDashboard />} />
          <Route path="tier-management" element={<TierManagement />} />
          <Route path="user" element={<AdUser />} />
          <Route path="live-seats" element={<AdLiveSeats />} />
          <Route path="payment" element={<AdPayment />} />
          <Route path="settings" element={<AdSettings />} />
          <Route path="vacate" element={<AdVacate />} />
          <Route path="blog" element={<AdBlog />} />
          <Route path="notification" element={<AdNotification />} />
          <Route path="issue-reported" element={<AdIssue /> } />
        </Route>
        <Route path="/user" element={<UserLayout />} >
          <Route path="/user" element={<Navigate to="dashboard" />} />
          <Route path="/user" element={<UsDashboard />} />
          <Route path="dashboard" element={<UsDashboard />} />
          <Route path="profile" element={<UsProfile />} />
          <Route path="switch-seat" element={<UsSwitchSeat/>} />
          <Route path="vacate-seat" element={<UsVacateSeat/>} />
          <Route path="payment" element={<UsPayment/>} />
          <Route path="report-issue" element={<UsReportIssue/>} />
        </Route>
        <Route path="/seat-selection" element={<SeatSelection />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;