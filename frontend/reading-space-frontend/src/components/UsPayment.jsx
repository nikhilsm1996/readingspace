/* eslint-disable no-unused-vars */
import  { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, FormGroup, Label, Input } from 'reactstrap';
// import './UsPayment.css';

const UsPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeat, startDate, endDate } = location.state;

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      alert('Payment successful!');
      // Navigate to user dashboard
      navigate('/user-dashboard');
    }, 2000);
  };

  return (
    <div className="container my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Payment</h2>
          <FormGroup>
            <Label for="paymentMethod">Select Payment Method</Label>
            <Input
              type="select"
              id="paymentMethod"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Select</option>
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="netbanking">NetBanking</option>
            </Input>
          </FormGroup>
          <Button color="primary" className="mt-4" onClick={handlePayment}>
            Pay Now
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UsPayment;