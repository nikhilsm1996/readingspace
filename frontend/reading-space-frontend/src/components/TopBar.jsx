
import { Search, Bell, ChevronDown } from 'lucide-react';

const TopBar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-white shadow-sm">
      <div className="d-flex align-items-center bg-light rounded px-3">
        <Search className="text-secondary" size={20} />
        <input type="text" className="form-control border-0 bg-transparent ms-2" placeholder="Search..." />
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-light position-relative me-3">
          <Bell size={20} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">3</span>
        </button>
        <div className="d-flex align-items-center">
          <img src="https://via.placeholder.com/40" className="rounded-circle me-2" alt="Admin" />
          <span>Admin User</span>
          <ChevronDown size={20} className="ms-2" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
