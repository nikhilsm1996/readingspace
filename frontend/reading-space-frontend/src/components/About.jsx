const About = () => {
  return (
    <section id="about" className="py-5 bg-light">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Content */}
          <div className="col-md-6">
            <h2 className="fw-bold text-primary mb-3">About ReadingSpace</h2>
            <p className="text-muted">
              At <strong>ReadingSpace</strong>, we strive to provide the perfect environment for focused reading and productivity. Whether you&apos;re preparing for exams, working on a project, or simply diving into your favorite book, our facilities are designed to cater to your needs.
            </p>
            <p className="text-muted">
              With comfortable seating, high-speed internet, and a peaceful atmosphere, we make sure you can concentrate without distractions. Join us and experience the difference in productivity and comfort.
            </p>
            <p className="fw-bold text-primary">
              Because every mind deserves the right space to thrive.
            </p>
          </div>

          {/* Image */}
          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/6538576/pexels-photo-6538576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Reading Room Image"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
