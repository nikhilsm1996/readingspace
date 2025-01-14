import { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import './UserDashboard.css';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    name: '',
    seatNumber: '',
    tier: '',
    startDate: '',
    endDate: '',
  });

  const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/api/user-dashboard');
    const result = await response.json();
    setUserData(result);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="container my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">User Dashboard</h2>
          <div className="user-info">
            <p><strong>Name:</strong> {userData.name}</p>
            <p><strong>Seat Number:</strong> {userData.seatNumber}</p>
            <p><strong>Tier:</strong> {userData.tier}</p>
            <p><strong>Subscription Period:</strong> {userData.startDate} to {userData.endDate}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDashboard;