import { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { ArrowUp, ArrowDown } from 'lucide-react';

import './AdDashboard.css';

const AdDashboard = () => {
  const [data, setData] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    revenue: 0,
    monthlyRevenue: [],
  });

  const fetchData = async () => {
    const response = await fetch('http://localhost:5000/api/dashboard');
    const result = await response.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4 bg-primary text-white">
            <h5>Total Users</h5>
            <h2>{data.totalUsers}</h2>
            <ArrowUp color="white" />
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4 bg-success text-white">
            <h5>Active Subscriptions</h5>
            <h2>{data.activeSubscriptions}</h2>
            <ArrowUp color="white" />
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4 bg-danger text-white">
            <h5>Revenue</h5>
            <h2>₹{data.revenue}</h2>
            <ArrowDown color="white" />
          </Card>
        </div>
      </div>

      {/* Performance Overview */}
      <Card className="shadow-sm p-3 mb-4">
        <CardBody>
          <h5>Performance Overview</h5>
          <div className="performance-overview">
            {data.monthlyRevenue.map((revenue, index) => (
              <div key={index} className="performance-bar">
                <div className="bar" style={{ height: `${revenue / 100}px` }}>
                  ₹{revenue}
                </div>
                <div className="label">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdDashboard;