import React, { useState } from 'react';

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
    {
      title: "Study Desks",
      description: "Work at spacious and well-lit desks.",
      image: "/path/to/study-desks.jpg",
    },
    {
      title: "Printing Service",
      description: "Print your documents at affordable rates.",
      image: "/path/to/printing-service.jpg",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  const handleNext = () => {
    if (currentIndex === features.length - itemsPerPage) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(features.length - itemsPerPage); 
    } else {
      setCurrentIndex(currentIndex - 1); 
    }
  };

  const visibleFeatures = features.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="features" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Facilities We Provide for Our Libraries</h2>
        <div className="d-flex justify-content-between align-items-center">
          <button onClick={handlePrev} className="btn btn-primary">
            &lt; Prev
          </button>

          <div className="d-flex">
            {visibleFeatures.map((feature, index) => (
              <div key={index} className="card mx-2" style={{ width: '200px' }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="card-img-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{feature.title}</h5>
                  <p className="card-text">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleNext} className="btn btn-primary">
            Next &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
