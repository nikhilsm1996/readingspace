import { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { User, Mail, Hash, Clock, CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './UsDashboard.css';

const UsDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [nextPaymentDue, setNextPaymentDue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

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
      }
    };

    fetchUserData();
  }, []);

  // Fetch payment data to get the next payment due date
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch('http://localhost:3000/payment/mypayments', requestOptions);
        const result = await response.json();

        if (response.ok) {
          // Extract the next payment due date from the latest payment
          const latestPayment = result.payments[0];
          if (latestPayment) {
            setNextPaymentDue(latestPayment.nextPaymentDueDate);
          }
        } else {
          setError(result.message || 'Failed to fetch payment data.');
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError('An error occurred. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  // Handle edit profile button click
  const handleEditProfile = () => {
    navigate('../profile'); // Navigate to the edit profile page
  };

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
                  {nextPaymentDue
                    ? new Date(nextPaymentDue).toLocaleDateString()
                    : 'Not specified'}
                </span>
              </div>

              {/* Edit Profile Button */}
              <div className="d-flex justify-content-center mt-4">
                <Button variant="primary" onClick={handleEditProfile}>
                  Edit Profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsDashboard;