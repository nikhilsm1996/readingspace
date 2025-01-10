import { Link } from 'react-router-dom';
import { Home, Users, BookOpen, Clock, Settings } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/tier-management', label: 'Tier Management', icon: BookOpen },
    { path: '/profile', label: 'Profile', icon: Users },
    { path: '/payment', label: 'Payment', icon: Clock },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="d-flex flex-column bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
      <h3 className="text-primary mb-4">Admin Panel</h3>
      <nav className="nav flex-column">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <Link
            to={path}
            key={path}
            className="btn btn-light text-start mb-2 d-flex align-items-center"
          >
            <Icon size={18} className="me-2" />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default AdminSidebar;
