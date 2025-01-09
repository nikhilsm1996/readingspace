import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  Clock, 
  History, 
  Settings, 
  LogOut, 
  User 
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Manage Users', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: BookOpen },
    { id: 'sessions', label: 'Sessions', icon: Clock },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
  ];

  const bookings = [
    { id: 1, user: 'John Doe', seat: 'Premium-5', startDate: '2025-01-01', endDate: '2025-01-15', status: 'Active' },
    { id: 2, user: 'Jane Smith', seat: 'Standard-3', startDate: '2024-12-01', endDate: '2024-12-15', status: 'Completed' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Quick Stats</h3>
                  <div className="d-grid gap-3">
                    <div className="p-3 bg-primary bg-opacity-10 rounded">
                      <p className="text-primary mb-1">Total Users</p>
                      <p className="h4 fw-bold">123</p>
                    </div>
                    <div className="p-3 bg-success bg-opacity-10 rounded">
                      <p className="text-success mb-1">Active Bookings</p>
                      <p className="h4 fw-bold">15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Recent Activity</h3>
                  <div className="d-grid gap-3">
                    <div className="p-3 border rounded">
                      <p className="text-muted small">New User Registered</p>
                      <p className="mb-0">Alice Johnson</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="text-muted small">Booking Confirmed</p>
                      <p className="mb-0">Premium Seat for 15 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Manage Users</h3>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <button className="btn btn-sm btn-primary me-2">Edit</button>
                          <button className="btn btn-sm btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      // Add other views here, similar to "dashboard" and "users".

      default:
        return null;
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-flex flex-column bg-light border-end vh-100 p-3" style={{ width: '250px' }}>
        <h3 className="text-primary mb-4">Admin Panel</h3>
        <nav className="nav flex-column">
          {menuItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`btn btn-light text-start mb-2 d-flex align-items-center ${
                  currentView === item.id ? 'active bg-primary text-white' : ''
                }`}
              >
                <Icon size={18} className="me-2" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="btn btn-danger mt-auto d-flex align-items-center"
        >
          <LogOut size={18} className="me-2" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
