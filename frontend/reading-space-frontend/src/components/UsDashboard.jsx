import { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { User, Mail, Hash, Clock, CreditCard, Wallet } from 'lucide-react';
import './UsDashboard.css';

const UsDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch('http://localhost:3000/users/me', requestOptions);
        const result = await response.json();

        if (response.ok) {
          setUserData(result.user);
        } else {
          setError(result.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">User Dashboard</h1>
      <p className="text-center mb-4">Welcome to your dashboard, {userData?.name || 'User'}!</p>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body>
              {/* User Details */}
              <div className="mb-4">
                <div className="d-flex align-items-center mb-3">
                  <User size={24} className="me-2 text-primary" />
                  <Card.Title className="mb-0">{userData?.name || 'Not specified'}</Card.Title>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Mail size={20} className="me-2 text-secondary" />
                  <span>Email: {userData?.email || 'Not specified'}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Hash size={20} className="me-2 text-secondary" />
                  <span>Phone: {userData?.phone || 'Not specified'}</span>
                </div>
              </div>

              {/* Seat Details */}
              {userData?.seat ? (
                <div className="mb-4">
                  <h5 className="mb-3">Seat Details</h5>
                  <div className="d-flex align-items-center mb-2">
                    <Hash size={20} className="me-2 text-secondary" />
                    <span>Seat Number: {userData.seat.seatNumber || 'Not specified'}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Hash size={20} className="me-2 text-secondary" />
                    <span>Tier: {userData.seat.tier?.name || 'Not specified'}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <CreditCard size={20} className="me-2 text-secondary" />
                    <span>Price: ₹{userData.seat.price || 'Not specified'}</span>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Wallet size={20} className="me-2 text-secondary" />
                    <span>Deposit: ₹{userData.seat.deposit || 'Not specified'}</span>
                  </div>
                </div>
              ) : (
                <p className="text-muted">No seat assigned.</p>
              )}

              {/* Next Payment Due Date */}
              <div className="d-flex align-items-center">
                <Clock size={20} className="me-2 text-secondary" />
                <span>
                  Next Payment Due:{' '}
                  {userData?.nextPaymentDueDate
                    ? new Date(userData.nextPaymentDueDate).toLocaleDateString()
                    : 'Not specified'}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsDashboard;