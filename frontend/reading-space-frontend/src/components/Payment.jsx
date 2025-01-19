import { useState } from 'react';
import { Container, Row, Col, Card, Button, Alert, Form, Spinner } from 'react-bootstrap';
import { Check, Printer, Download, CreditCard, Wallet, Hash, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // Default to UPI
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle payment initiation
  const initiatePayment = async () => {
    setLoading(true);
    setError(null);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

    const raw = JSON.stringify({
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
  const fetchPaymentStatus = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch('http://localhost:3000/payment/mypayments', requestOptions);
      const result = await response.json();

      if (response.ok && result.message === 'Payments retrieved successfully.') {
        setPaymentDetails(result.payments[0]); // Assuming we only care about the first payment
        setPaymentStatus('completed');
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
Seat Number: ${paymentDetails.seatNumber}
Tier: ${paymentDetails.tier}
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
console.log("Payment details",paymentDetails);

  // Navigate to user dashboard
  const goToDashboard = () => {
    navigate('/user');
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <Card.Title className="mb-0">Payment</Card.Title>
            </Card.Header>
            <Card.Body>
              {!paymentStatus && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <CreditCard size={20} className="me-2" />
                      Payment Method
                    </Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      required
                    >
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                    </Form.Select>
                  </Form.Group>
                  <Button
                    variant="primary"
                    onClick={initiatePayment}
                    disabled={loading}
                    className="w-100"
                  >
                    {loading ? (
                      <>
                        <Spinner as="span" size="sm" animation="border" role="status" />
                        <span className="ms-2">Processing...</span>
                      </>
                    ) : (
                      'Initiate Payment'
                    )}
                  </Button>
                </Form>
              )}

              {paymentStatus === 'processing' && (
                <Alert variant="info" className="text-center">
                  <p>Your payment is being processed. Please wait...</p>
                  <Button variant="secondary" onClick={fetchPaymentStatus}>
                    Check Payment Status
                  </Button>
                </Alert>
              )}

              {paymentStatus === 'completed' && paymentDetails && (
                <div>
                  <Alert variant="success" className="text-center">
                    <Check size={32} className="mb-3" />
                    <h2>Payment Successful!</h2>
                    <p>Your transaction has been completed successfully.</p>
                  </Alert>

                  {/* Payment Details */}
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-4">Payment Details</h5>
                      <Row>
                        <Col md={6}>
                          <div className="d-flex align-items-center mb-3">
                            <Hash size={20} className="me-2 text-secondary" />
                            <span><strong>Transaction ID:</strong> {paymentDetails.transactionId}</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <Calendar size={20} className="me-2 text-secondary" />
                            <span><strong>Date:</strong> {new Date(paymentDetails.paymentDate).toLocaleDateString()}</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <Hash size={20} className="me-2 text-secondary" />
                            <span><strong>Seat Number:</strong> {paymentDetails.seatNumber}</span>
                          </div>
                        </Col>
                        <Col md={6}>
                          <div className="d-flex align-items-center mb-3">
                            <CreditCard size={20} className="me-2 text-secondary" />
                            <span><strong>Tier:</strong> {paymentDetails.tierName}</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <Wallet size={20} className="me-2 text-secondary" />
                            <span><strong>Total Amount:</strong> ₹{paymentDetails.totalAmount}</span>
                          </div>
                          <div className="d-flex align-items-center mb-3">
                            <CreditCard size={20} className="me-2 text-secondary" />
                            <span><strong>Payment Method:</strong> {paymentMethod}</span>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>

                  {/* Action Buttons */}
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