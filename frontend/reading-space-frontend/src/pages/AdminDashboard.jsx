import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/AdminSidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-grow-1">
        <Header onLogout={handleLogout} />
        <div className="p-4">
          <DashboardContent currentView={currentView} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
