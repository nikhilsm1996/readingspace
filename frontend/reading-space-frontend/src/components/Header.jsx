import { LogOut } from 'lucide-react';

const Header = ({ onLogout }) => (
  <div className="d-flex justify-content-between align-items-center bg-white p-3 shadow-sm">
    <h4 className="m-0">Welcome back, Admin!</h4>
    <div className="d-flex align-items-center">
      <img
        src="https://via.placeholder.com/40"
        alt="Admin Profile"
        className="rounded-circle me-3"
      />
      <div className="dropdown">
        <button
          className="btn btn-light dropdown-toggle"
          type="button"
          id="profileDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Admin
        </button>
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
          <li>
            <button className="dropdown-item" onClick={onLogout}>
              <LogOut size={18} className="me-2" />
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default Header;
