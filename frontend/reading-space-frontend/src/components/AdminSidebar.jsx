/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, Clock, Settings, ChevronLeft, ChevronRight, LogOut, Armchair, LogOut as VacateIcon } from 'lucide-react';
// import './AdminSidebar.css';

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
      className={`d-flex flex-column bg-light border-end vh-100 p-3 position-fixed transition-width ${
        isCollapsed ? 'collapsed-sidebar' : ''
      }`}
      style={{
        width: isCollapsed ? '95px' : '250px',
        transition: 'width 0.3s ease-in-out',
        top: '0', // Stick to the top
        height: '100vh', // Take full height
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-primary" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </div>
      <div className="sidebar-header text-center mb-6">
        <h4 className="text-primary">{isCollapsed ? 'RS' : 'Reading Space'}</h4>
      </div>
      <nav className="flex-column">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            to={path}
            key={path}
            className="btn btn-light text-start mb-2 d-flex align-items-center"
          >
            <Icon size={isCollapsed ? 30 : 20} className="me-2" />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      <button
        className="btn btn-danger text-start mt-auto d-flex align-items-center"
        onClick={handleLogout}
      >
        <LogOut size={isCollapsed ? 30 : 20} className="me-2" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default AdminSidebar;