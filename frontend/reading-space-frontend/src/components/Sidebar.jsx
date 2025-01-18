
import { NavLink } from 'react-router-dom';
import { Home, Layout, Settings, Calendar, AlertCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Cabin Layout', icon: Layout, path: '/cabin-layout' },
    { name: 'Tier Management', icon: Settings, path: '/tier-management' },
    { name: 'Vacation Notices', icon: Calendar, path: '/vacation-notices' },
    { name: 'Issues Reported', icon: AlertCircle, path: '/issues-reported' },
    
  ];

  return (
    <div className="sidebar bg-white shadow-lg h-100">
      <div className="p-3 border-bottom text-center">
        <h2 className="text-primary">Reading Space</h2>
      </div>
      <nav className="p-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="d-flex align-items-center p-2 mb-2 text-dark text-decoration-none"
            activeClassName="bg-light"
          >
            <item.icon size={20} className="me-2" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
