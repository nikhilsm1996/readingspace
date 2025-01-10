

const Cards = () => {
  const stats = [
    { title: "Total Revenue", value: "₹50,000", change: "+15% this month", bg: "bg-primary" },
    { title: "Active Members", value: "75", change: "+5 this week", bg: "bg-success" },
    { title: "Total Bookings", value: "120", change: "+8 today", bg: "bg-info" },
    { title: "Available Seats", value: "45", change: "Across all tiers", bg: "bg-warning" },
  ];

  return (
    <div className="row g-4">
      {stats.map((stat, index) => (
        <div key={index} className="col-md-3">
          <div className={`card text-white ${stat.bg}`}>
            <div className="card-body">
              <h5>{stat.title}</h5>
              <h3>{stat.value}</h3>
              <p className="mb-0">{stat.change}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
