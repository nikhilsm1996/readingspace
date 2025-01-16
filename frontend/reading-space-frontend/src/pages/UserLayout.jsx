import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserSidebar from '../components/UserSidebar';

const UserLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  const handleLogout = () => {
    // Add logout logic (e.g., clear tokens)
    navigate('/login');
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <UserSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: isCollapsed ? '90px' : '260px',
          width: isCollapsed ? 'calc(100% - 90px)' : 'calc(100% - 260px)',
          minHeight: '100vh',
        }}
      >
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
          style={{
            padding: '10px 20px',
            position: 'sticky',
            top: 0,
            zIndex: 1020,
          }}
        >
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">Dashboard</span>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-primary me-2"
                onClick={() => navigate('/profile')}
              >
                Profile
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Outlet */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
