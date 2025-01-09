// src/pages/UserDashboard.jsx

import { useState } from 'react';
import { Home, BookOpen, Clock, History, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'bookings', label: 'Current Booking', icon: BookOpen },
    { id: 'upcoming', label: 'Upcoming Sessions', icon: Clock },
    { id: 'history', label: 'Booking History', icon: History },
  ];

  const bookingHistory = [
    {
      id: 1,
      seat: 'Premium-5',
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      status: 'Active',
    },
    {
      id: 2,
      seat: 'Standard-3',
      startDate: '2024-12-01',
      endDate: '2024-12-15',
      status: 'Completed',
    },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="row gy-4">
            <div className="col-lg-3 col-md-6">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h3 className="card-title mb-3">Quick Stats</h3>
                  <div className="d-grid gap-3">
                    <div className="p-3 bg-primary bg-opacity-10 rounded">
                      <p className="text-primary mb-1">Active Booking</p>
                      <p className="h5 fw-bold">Premium Seat</p>
                    </div>
                    <div className="p-3 bg-success bg-opacity-10 rounded">
                      <p className="text-success mb-1">Days Remaining</p>
                      <p className="h5 fw-bold">7 Days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Recent Activity</h3>
                  <div className="d-grid gap-3">
                    <div className="p-3 border rounded">
                      <p className="text-muted small">Booking Confirmed</p>
                      <p className="mb-0">Premium Seat for 15 days</p>
                    </div>
                    <div className="p-3 border rounded">
                      <p className="text-muted small">Payment Completed</p>
                      <p className="mb-0">₹500 via UPI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Current Booking Details</h3>
              <div className="row g-4">
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded">
                    <p className="text-muted small">Seat Number</p>
                    <p className="h5 fw-bold">Premium-5</p>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="p-3 bg-light rounded">
                    <p className="text-muted small">Status</p>
                    <p className="h5 fw-bold text-success">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">Booking History</h3>
              <div className="d-grid gap-3">
                {bookingHistory.map((booking) => (
                  <div key={booking.id} className="p-3 border rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <h4 className="fw-bold">Seat {booking.seat}</h4>
                      <span
                        className={`badge ${
                          booking.status === 'Active'
                            ? 'bg-success'
                            : 'bg-secondary'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="text-muted small">
                      <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
                      <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'upcoming':
        return (
          <div className="card text-center py-5">
            <div className="card-body">
              <Clock size={48} className="mb-3 text-muted" />
              <p className="text-muted">No upcoming sessions scheduled</p>
              <button
                onClick={() => navigate('/post-login')}
                className="btn btn-primary mt-3"
              >
                Book a Seat
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      {/* Sidebar */}
      <aside className="bg-white border-end p-3" style={{ width: '250px' }}>
        <h1 className="h4 fw-bold text-primary mb-3">Reading Space</h1>
        <p className="text-muted small mb-4">User Dashboard</p>
        <nav className="nav flex-column gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`btn btn-light text-start d-flex align-items-center gap-3 ${
                  currentView === item.id
                    ? 'bg-primary bg-opacity-10 text-primary'
                    : 'text-muted'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        {/* Top Bar */}
        <div className="bg-white border-bottom p-3 mb-4">
          <div className="d-flex justify-content-end">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                type="button"
                data-bs-toggle="dropdown"
              >
                <User size={20} />
                John Doe
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    onClick={handleLogout}
                    className="dropdown-item text-danger d-flex align-items-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Page Content */}
        {renderContent()}
      </main>
    </div>
  );
};

export default UserDashboard;
