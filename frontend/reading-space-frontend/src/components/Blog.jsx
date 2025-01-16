const Blog = () => {
  const blog = [
    {
      name: "Transforming Workspaces: How Design Impacts Productivity",
      message:
        "In today’s dynamic world, workspace design has evolved beyond aesthetics to become a critical factor in influencing productivity, creativity, and well-being...",
      image: "https://images.pexels.com/photos/245240/pexels-photo-245240.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      url: "https://diladesign.com/transforming-workspaces-the-impact-of-interior-design-on-employee-productivity/",
    },
    {
      name: "The Power of Minimalism: Creating Spaces That Inspire",
      message:
        "In a world filled with distractions, the concept of minimalism has emerged as a game-changer for creating inspiring and functional spaces...",
      image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      url: "https://medium.com/@interiorinks/the-power-of-minimalism-how-less-can-be-more-in-interior-spaces-b2f64ee63025",
    },
    {
      name: "Elevating Everyday Spaces: The Art of Functional Design",
      message:
        "Great design is more than aesthetics—it’s about combining beauty and functionality...",
      image: "https://images.pexels.com/photos/4108806/pexels-photo-4108806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      url: "https://www.artsoullifemagazine.com/elevating-spaces-the-art-of-interior-design",
    },
  ];

  const handleReadMore = (url) => {
    window.location.href = url; 
  };

  return (
    <section id="blog" className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-4">Our Blog</h2>
        <div className="row g-4">
          {blog.map((item, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card text-left shadow-sm h-100">
                <div
                  className="bg-image hover-overlay"
                  data-mdb-ripple-init
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid"
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <a href="#!">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </a>
                </div>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text flex-grow-1">{item.message}</p>
                  <button
                    onClick={() => handleReadMore(item.url)}
                    className="btn btn-primary mt-auto"
                    data-mdb-ripple-init
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
