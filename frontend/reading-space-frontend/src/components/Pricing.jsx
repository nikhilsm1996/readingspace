

const Pricing = () => {
  const plans = [
    {
      name: "Standard",
      price: "₹1,000",
      features: [
        "5 hours/day",
        "Comfortable Seating",
        "High-Speed WiFi",
        "Basic Amenities",
      ],
    },
    {
      name: "Premium",
      price: "₹2,500",
      features: [
        "Unlimited Access",
        "Private Cabin",
        "Complimentary Coffee",
        "All Premium Amenities",
      ],
    },
  ];

  return (
    <section id="pricing" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4">Pricing Plans</h2>
        <div className="row g-4">
          {plans.map((plan, index) => (
            <div key={index} className="col-md-6">
              <div className="card h-100 shadow">
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{plan.name}</h5>
                  <h2 className="card-text text-primary">{plan.price}</h2>
                  <ul className="list-unstyled mb-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="mb-2">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary">Choose Plan</button>
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
