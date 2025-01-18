const Testimonials = () => {
  const reviews = [
    {
      name: "Aman Verma",
      message:
        "ReadingSpace has been a lifesaver for my UPSC preparation. The quiet cabins and fast internet were just what I needed.",
      image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Priya Sharma",
      message:
        "The environment is perfect for focused study sessions. I cleared my CAT exams with the help of this amazing facility.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Rohan Gupta",
      message:
        "Affordable pricing and excellent amenities make ReadingSpace my go-to place for work and study.",
      image: "https://images.pexels.com/photos/2117283/pexels-photo-2117283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Neha Patel",
      message:
        "Highly recommended for anyone looking for a peaceful place to study or work. Great facilities and friendly staff.",
      image: "https://images.pexels.com/photos/1520760/pexels-photo-1520760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <section id="reviews" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-primary mb-5" style={{ fontFamily: "'Times New Roman', serif" }}>
          What Our Users Say
        </h2>
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div
                className="card text-center shadow-sm h-100 border-0"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="rounded-circle mt-4 mx-auto shadow-sm"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    border: "3px solid #fff",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold" style={{ fontFamily: "'Times New Roman', serif" }}>
                    {review.name}
                  </h5>
                  <p className="card-text text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {review.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;