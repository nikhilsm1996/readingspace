const Contact = () => {
  return (
    <section id="contact" className="py-5 bg-white">
      <div className="container">
        <div className="row align-items-center">
          {/* Contact Form */}
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-3">Get in Touch</h2>
            <p className="text-muted mb-4">
              Have questions or need assistance? We&apos;d love to hear from you! Fill out the form, and our team will get back to you promptly.
            </p>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="5"
                  placeholder="Write your message"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </form>
          </div>

          {/* Image */}
          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/14970229/pexels-photo-14970229/free-photo-of-plant-in-a-pot-by-the-window.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Contact Us"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
