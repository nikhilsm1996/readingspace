import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const handleLogout = () => {
    // Implement logout logic (e.g., clear auth tokens)
    console.log('Logged out');
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <Header onLogout={handleLogout} />
        <div className="p-4">
          <Outlet /> {/* Content changes based on the route */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
