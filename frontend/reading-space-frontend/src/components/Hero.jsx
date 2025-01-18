import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="bg-light py-5 mt-5">
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-primary mb-4" style={{ fontFamily: "'Times New Roman', serif" }}>
              Welcome to ReadingSpace
            </h1>
            <p className="lead text-muted mb-4" style={{ fontFamily: "'Open Sans', sans-serif" }}>
              Your Perfect Reading Environment Awaits
            </p>
            {/* Link to /login page */}
            <Link to="/login">
              <button className="btn btn-primary btn-lg shadow-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                Get Started
              </button>
            </Link>
          </div>

          {/* Image */}
          <div className="col-lg-6">
            <img
              src="https://images.pexels.com/photos/9489906/pexels-photo-9489906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Women Reading a Book"
              className="img-fluid rounded shadow-lg"
              style={{ transition: "transform 0.3s ease" }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;