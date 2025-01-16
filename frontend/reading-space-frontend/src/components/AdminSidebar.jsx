/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, Clock, Settings, ChevronLeft, ChevronRight, LogOut, Armchair, LogOut as VacateIcon } from 'lucide-react';

const AdminSidebar = ({ isCollapsed, toggleSidebar, handleLogout }) => {
  const menuItems = [
    { path: 'dashboard', label: 'Dashboard', icon: Home },
    { path: 'tier-management', label: 'Tier Management', icon: BookOpen },
    { path: 'user', label: 'User', icon: Armchair },
    { path: 'live-seats', label: 'Live Seats', icon: Users },
    { path: 'payment', label: 'Payment', icon: Clock },
    { path: 'settings', label: 'Settings', icon: Settings },
    { path: 'vacate', label: 'Vacate Requests', icon: VacateIcon },
  ];

  return (
    <div
      className={`d-flex flex-column vh-100 shadow-lg position-fixed ${
        isCollapsed ? 'collapsed-sidebar' : ''
      }`}
      style={{
        width: isCollapsed ? '90px' : '260px',
        transition: 'width 0.3s ease-in-out',
        background: 'linear-gradient(to bottom, #4A90E2, #003B73)',
        color: 'white',
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center">
          <span className="fs-4 fw-bold">
            {isCollapsed ? 'RS' : 'Reading Space'}
          </span>
        </div>
        <button
          className="btn btn-light btn-sm"
          onClick={toggleSidebar}
          style={{
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            padding: '0',
          }}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-3">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            to={path}
            key={path}
            className="d-flex align-items-center p-3 text-white text-decoration-none hover-effect"
            style={{
              borderRadius: '8px',
              margin: '0 10px',
              transition: 'background 0.2s',
            }}
          >
            <Icon size={24} className="me-3" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-auto p-3">
        <button
          className="btn btn-danger w-100 d-flex align-items-center"
          onClick={handleLogout}
          style={{
            borderRadius: '8px',
            backgroundColor: '#FF4A4A',
            border: 'none',
            transition: 'background 0.2s',
          }}
        >
          <LogOut size={20} className="me-3" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;