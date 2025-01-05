

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row g-4">
          {/* About Section */}
          <div className="col-md-4">
            <h5 className="text-uppercase fw-bold">About ReadingSpace</h5>
            <p className="text-muted mt-2">
              ReadingSpace offers a serene, distraction-free environment to enhance your productivity. Designed for students and professionals alike, we provide the perfect space to focus on what truly matters.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-2">
            <h5 className="text-uppercase fw-bold">Quick Links</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <a href="#home" className="text-light text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-light text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="#features" className="text-light text-decoration-none">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-light text-decoration-none">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#contact" className="text-light text-decoration-none">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div className="col-md-3">
            <h5 className="text-uppercase fw-bold">Contact</h5>
            <ul className="list-unstyled mt-2">
              <li>
                <i className="fas fa-map-marker-alt me-2"></i> 123 Study Lane, Bengaluru, India
              </li>
              <li>
                <i className="fas fa-phone-alt me-2"></i> +91-9876543210
              </li>
              <li>
                <i className="fas fa-envelope me-2"></i> support@readingspace.in
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-3">
            <h5 className="text-uppercase fw-bold">Follow Us</h5>
            <div className="mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="fab fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="row mt-4">
          <div className="col-12">
            <h5 className="text-uppercase fw-bold">Our Location</h5>
            <iframe
              title="ReadingSpace Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31109.992229675317!2d77.59456387621282!3d12.971598705477203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670d0f453e3%3A0x30421a7ccabb32a!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sin!4v1690479928401!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Back to Top Button */}
        <div className="text-center mt-4">
          <button
            className="btn btn-outline-light rounded-pill px-4 py-2"
            onClick={scrollToTop}
          >
            <i className="fas fa-arrow-up me-2"></i> Back to Top
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p className="text-muted mb-0">&copy; {new Date().getFullYear()} ReadingSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
