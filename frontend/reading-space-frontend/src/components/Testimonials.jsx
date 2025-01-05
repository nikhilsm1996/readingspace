

const Testimonials = () => {
  const reviews = [
    {
      name: "Aman Verma",
      message:
        "ReadingSpace has been a lifesaver for my UPSC preparation. The quiet cabins and fast internet were just what I needed.",
      image: "/path/to/aman.jpg",
    },
    {
      name: "Priya Sharma",
      message:
        "The environment is perfect for focused study sessions. I cleared my CAT exams with the help of this amazing facility.",
      image: "/path/to/priya.jpg",
    },
    {
      name: "Rohan Gupta",
      message:
        "Affordable pricing and excellent amenities make ReadingSpace my go-to place for work and study.",
      image: "/path/to/rohan.jpg",
    },
    {
      name: "Neha Patel",
      message:
        "Highly recommended for anyone looking for a peaceful place to study or work. Great facilities and friendly staff.",
      image: "/path/to/neha.jpg",
    },
  ];

  return (
    <section id="testimonials" className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">What Our Users Say</h2>
        <div className="row g-4">
          {reviews.map((review, index) => (
            <div key={index} className="col-md-6 col-lg-3">
              <div className="card text-center shadow-sm h-100">
                <img
                  src={review.image}
                  alt={review.name}
                  className="rounded-circle mt-4 mx-auto"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{review.name}</h5>
                  <p className="card-text text-muted">{review.message}</p>
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
