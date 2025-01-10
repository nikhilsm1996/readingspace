const DashboardCards = () => (
    <div className="row g-4">
      <div className="col-md-3">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <h5>Total Revenue</h5>
            <h3>₹50,000</h3>
            <p>+15% this month</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-success text-white">
          <div className="card-body">
            <h5>Active Members</h5>
            <h3>75</h3>
            <p>+5 this week</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-info text-white">
          <div className="card-body">
            <h5>Total Bookings</h5>
            <h3>120</h3>
            <p>+8 today</p>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card bg-warning text-white">
          <div className="card-body">
            <h5>Available Seats</h5>
            <h3>45</h3>
            <p>Across all tiers</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  export default DashboardCards;
  