import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      price: "₹1,999",
      features: [
        "5 hours/day",
        "Comfortable Seating",
        "High-Speed WiFi",
        "Basic Amenities",
        "Access to Reading Materials",
        "Power Outlets for Charging",
      ],
    },
    {
      name: "Normal",
      price: "₹2,999",
      features: [
        "10 hours/day",
        "Comfortable Seating",
        "High-Speed WiFi",
        "Basic Amenities",
        "Access to Reading Materials",
        "Dedicated Quiet Zone",
      ],
    },
    {
      name: "Premium",
      price: "₹3,999",
      features: [
        "Unlimited Access",
        "Private Cabin",
        "Complimentary Coffee",
        "All Premium Amenities",
        "Exclusive Access to Premium Reading Materials",
        "On-Demand Assistance",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-primary mb-5" style={{ fontFamily: "'Open Sans', sans-serif" }}>
          Pricing Plans
        </h2>
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-4">
              <div
                className="card h-100 shadow-sm border-0"
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
                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-bold mb-3" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    {plan.name}
                  </h5>
                  <h2 className="card-text text-primary mb-4">{plan.price}</h2>
                  <ul className="list-unstyled mb-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2 text-muted" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link to="/login">
                    <button className="btn btn-primary btn-lg shadow-sm" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      Choose Plan
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;