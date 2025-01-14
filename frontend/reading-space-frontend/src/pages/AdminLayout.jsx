import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens)
    navigate('/login');
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />
      {/* Main Content Area */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: isCollapsed ? '80px' : '250px',
          width: isCollapsed ? 'calc(100% - 80px)' : 'calc(100% - 250px)',
          minHeight: '100vh',
          padding: '20px',
          marginTop: '0', 
          overflowY: 'auto', 
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;