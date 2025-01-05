import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        {/* Top Section */}
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start text-center">
            <h5 className="fw-bold">Stay Connected</h5>
            <p>Follow us on social media for updates and promotions.</p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-light me-3">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="col-md-6 text-md-end text-center mt-4 mt-md-0">
            <button
              className="btn btn-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <FaArrowUp className="me-2" /> Back to Top
            </button>
          </div>
        </div>

        <hr className="my-4" />

        {/* Middle Section */}
        <div className="row">
          <div className="col-md-4">
            <h6 className="fw-bold">Contact Us</h6>
            <p>
              <FaMapMarkerAlt className="me-2" /> 123 ReadingSpace Lane, Ernakulam, Kerala, India
            </p>
            <p>
              <FaPhoneAlt className="me-2" /> +91 98765 43210
            </p>
            <p>
              <FaEnvelope className="me-2" /> info@readingspace.in
            </p>
          </div>
          <div className="col-md-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.39537820656!2d76.28366031528955!3d9.981129226184847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080a94118d5d19%3A0x51ecdb5b4b7c69b5!2sErnakulam%20South%20Railway%20Station!5e0!3m2!1sen!2sin!4v1639990633413!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="ReadingSpace Location"
            ></iframe>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Section */}
        <div className="text-center">
          <p className="mb-0">&copy; 2025 ReadingSpace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
