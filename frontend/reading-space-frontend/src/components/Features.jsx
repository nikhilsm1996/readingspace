

const Features = () => {
  const features = [
    {
      title: "Quiet Environment",
      description: "Enjoy a serene workspace free from distractions.",
      image: "/path/to/quiet-environment.jpg",
    },
    {
      title: "Comfortable Seating",
      description: "Ergonomic chairs to keep you comfortable all day.",
      image: "/path/to/comfortable-seating.jpg",
    },
    {
      title: "High-Speed WiFi",
      description: "Blazing fast internet for all your work needs.",
      image: "/path/to/high-speed-wifi.jpg",
    },
    {
      title: "Coffee Service",
      description: "Complimentary coffee to keep you energized.",
      image: "/path/to/coffee-service.jpg",
    },
  ];

  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Features</h2>
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-md-3 d-flex justify-content-center">
              <div className="card h-100 text-center">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="card-img-top"
                  style={{
                    maxHeight: "180px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
