import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm py-3">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4 text-primary" href="#">
          <i className="fas fa-book-reader me-2"></i>ReadingSpace
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto gap-4">
            {["Home", "About", "Features", "Pricing","Blog","Reviews", "Contact" ].map(
              (section, index) => (
                <li key={index} className="nav-item">
                  <a className="nav-link text-dark fw-medium" href={`#${section.toLowerCase()}`}>
                    {section}
                  </a>
                </li>
              )
            )}
          </ul>
          <div className="d-flex gap-3">
            {/* Login Button */}
            <Link to="/login" className="btn btn-outline-primary fw-medium">
              Login
            </Link>

            {/* Sign Up Button */}
            <Link to="/signup" className="btn btn-primary fw-medium">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
