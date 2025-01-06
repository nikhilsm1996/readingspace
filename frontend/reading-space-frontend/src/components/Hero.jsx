
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className="bg-light py-5 mt-5">
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1 className="display-4 fw-bold">Welcome to ReadingSpace</h1>
            <p className="lead">Your perfect reading environment awaits</p>
            
            {/* Link to /login page */}
            <Link to="/login">
              <button className="btn btn-primary btn-lg">Get Started</button>
            </Link>
          </div>
          <div className="col-lg-6">
            <img
              src="https://img.freepik.com/free-photo/friends-library-table_23-2147678958.jpg"
              alt="Women Reading a Book"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
