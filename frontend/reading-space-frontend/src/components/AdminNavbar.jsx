import { Bell, LogOut } from 'lucide-react';

const AdminNavbar = () => {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm px-3">
      <h5 className="navbar-brand mb-0">Admin Panel</h5>
      <div className="d-flex align-items-center">
        <button className="btn btn-light me-3 position-relative">
          <Bell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            3
          </span>
        </button>
        <button className="btn btn-outline-danger">
          <LogOut size={20} className="me-2" /> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
