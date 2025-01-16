import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { User, Mail, Clock, Hash } from 'lucide-react';
import './UsDashboard.css';

const UsDashboard = () => {
  const [userData, setUserData] = useState([]);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/me`); // Fetch all users
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">User Dashboard</h1>
      <p className="text-center mb-4">Welcome to your dashboard!</p>
      <Row>
        {userData.map((user) => (
          <Col key={user.id} md={4} className="mb-4">
            <Card className="shadow-sm h-100">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <User size={24} className="me-2 text-primary" />
                  <Card.Title className="mb-0">{user.name}</Card.Title>
                </div>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <Hash size={20} className="me-2 text-secondary" />
                    <span>Seat Number: {user.seatNumber}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Mail size={20} className="me-2 text-secondary" />
                    <span>Email: {user.email}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <Clock size={20} className="me-2 text-secondary" />
                    <span>Next Payment: {user.nextPayment}</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UsDashboard;