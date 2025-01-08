import React, { useState } from 'react';

const Features = () => {
  const features = [
    {
      title: "Quiet Environment",
      description: "Enjoy a serene workspace free from distractions.",
      image: "https://images.pexels.com/photos/8101057/pexels-photo-8101057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Comfortable Seating",
      description: "Ergonomic chairs to keep you comfortable all day.",
      image: "https://images.pexels.com/photos/3952068/pexels-photo-3952068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "High-Speed WiFi",
      description: "Blazing fast internet for all your work needs.",
      image: "https://images.pexels.com/photos/17775083/pexels-photo-17775083/free-photo-of-woman-hands-on-laptop.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Coffee Service",
      description: "Complimentary coffee to keep you energized.",
      image: "https://images.pexels.com/photos/28403017/pexels-photo-28403017/free-photo-of-cozy-reading-with-coffee-and-laptop-setup.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Study Desks",
      description: "Work at spacious and well-lit desks.",
      image: "https://images.pexels.com/photos/5905435/pexels-photo-5905435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Printing Service",
      description: "Print your documents at affordable rates.",
      image: "https://images.pexels.com/photos/23534017/pexels-photo-23534017/free-photo-of-printer.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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
              <div key={index} className="card mx-2" style={{ width: '250px' }}>
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
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
