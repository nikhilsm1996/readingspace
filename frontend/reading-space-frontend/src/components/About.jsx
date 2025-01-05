

const About = () => {
  return (
    <section id="about" className="py-5">
      <div className="container">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="row">
          <div className="col-lg-6">
            <p className="lead">
              We provide the perfect environment for focused reading and studying.
            </p>
          </div>
          <div className="col-lg-6">
            <img
              src="/api/placeholder/600/400"
              alt="About"
              className="img-fluid rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
