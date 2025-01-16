import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form } from 'react-bootstrap';
import { Check, Printer, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle payment initiation
  const initiatePayment = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      email: email,
      paymentMethod: paymentMethod,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch('http://localhost:3000/payment/start-payment', requestOptions);
      const result = await response.json();

      if (response.ok && result.message === 'Payment initiated successfully.') {
        setPaymentStatus('processing');
        setPaymentDetails(result.payment);
        setError(null);
      } else {
        setError(result.message || 'Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please check your connection.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment status
  const fetchPaymentStatus = async (status) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    try {
      const response = await fetch(`http://localhost:3000/payment?status=${status}`, requestOptions);
      const result = await response.json();

      if (response.ok && result.message === 'Payments retrieved successfully.') {
        setPaymentDetails(result.payments[0]); // Assuming we only care about the first payment
        setPaymentStatus(status);
        setError(null);
      } else {
        setError(result.message || 'Failed to fetch payment status.');
      }
    } catch (error) {
      setError('An error occurred. Please check your connection.');
      console.error(error);
    }
  };

  // Handle print receipt
  const handlePrint = () => {
    window.print();
  };

  // Handle download receipt
  const generateReceipt = () => {
    const receipt = `
Payment Receipt
------------------------------
Transaction ID: ${paymentDetails.transactionId}
Date: ${new Date(paymentDetails.paymentDate).toLocaleDateString()}
Email: ${paymentDetails.userEmail || email}
Tier: ${paymentDetails.tier || paymentDetails.tierName}
Payment Method: ${paymentMethod}
Total Amount: ₹${paymentDetails.totalAmount}

Thank you for your payment!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Payment_Receipt_${paymentDetails.transactionId}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Navigate to user dashboard
  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Card.Title>Payment Screen</Card.Title>
            </Card.Header>
            <Card.Body>
              {!paymentStatus && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="UPI">UPI</option>
                      <option value="cash">Cash</option>
                    </Form.Select>
                  </Form.Group>
                  <Button variant="primary" onClick={initiatePayment} disabled={loading}>
                    {loading ? 'Processing...' : 'Initiate Payment'}
                  </Button>
                </Form>
              )}

              {paymentStatus === 'processing' && (
                <Alert variant="info">
                  <p>Your payment is being processed. Please wait...</p>
                  <Button variant="secondary" onClick={() => fetchPaymentStatus('completed')}>
                    Check Payment Status
                  </Button>
                </Alert>
              )}

              {paymentStatus === 'completed' && paymentDetails && (
                <div>
                  <Alert variant="success">
                    <Check size={32} className="mb-3" />
                    <h2>Payment Successful!</h2>
                    <p>Your transaction has been completed successfully.</p>
                  </Alert>
                  <div className="text-start">
                    <p><strong>Transaction ID:</strong> {paymentDetails.transactionId}</p>
                    <p><strong>Date:</strong> {new Date(paymentDetails.paymentDate).toLocaleDateString()}</p>
                    <p><strong>Email:</strong> {paymentDetails.userEmail || email}</p>
                    <p><strong>Tier:</strong> {paymentDetails.tier || paymentDetails.tierName}</p>
                    <p><strong>Total Amount:</strong> ₹{paymentDetails.totalAmount}</p>
                  </div>
                  <div className="d-flex justify-content-center gap-3 mt-4">
                    <Button variant="primary" onClick={handlePrint}>
                      <Printer className="me-2" />
                      Print Receipt
                    </Button>
                    <Button variant="outline-primary" onClick={generateReceipt}>
                      <Download className="me-2" />
                      Download Receipt
                    </Button>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <Button variant="success" onClick={goToDashboard}>
                      Go to User Dashboard
                    </Button>
                  </div>
                </div>
              )}

              {error && <Alert variant="danger">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;