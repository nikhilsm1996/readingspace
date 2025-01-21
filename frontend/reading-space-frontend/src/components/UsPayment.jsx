import { useState, useEffect } from "react";
import { Container, Card, Alert, Table, Button } from "react-bootstrap";
import Payment from "./Payment"; // Import the Payment component


// Utility function to format date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const UsPayment = () => {
  const [paymentHistory, setPaymentHistory] = useState([]); // Payment history
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message
  const [showPayment, setShowPayment] = useState(false); // State to toggle payment section
 

  // Fetch payment history from the backend
  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem("authToken")}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch("http://localhost:3000/payment/mypayments", requestOptions);
        const result = await response.json();
        console.log("result", result);

        if (response.ok) {
          setPaymentHistory(result.payments);
        } else {
          setError(result.message || "Failed to fetch payment history.");
        }
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setError("An error occurred. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);//

  // Handle navigation to the user dashboard


  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Payment History</h1>
      <Card className="shadow-sm">
        <Card.Body>
          {/* Display error message */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Payment History Table */}
          {paymentHistory.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Date</th>
                  <th>Tier</th>
                  <th>Tier Price</th>
                  <th>Deposit</th>
                  <th>Total Amount</th>
                  <th>Payment Method</th>
                  <th>Next Payment Due</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr key={payment.transactionId}>
                    <td>{payment.transactionId}</td>
                    <td>{formatDate(payment.paymentDate)}</td> {/* Use formatDate here */}
                    <td>{payment.tierName}</td>
                    <td>₹{payment.tierPrice}</td>
                    <td>₹{payment.totalAmount - payment.tierPrice}</td> {/* Calculate deposit */}
                    <td>₹{payment.totalAmount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>
                      {payment.nextPaymentDueDate
                        ? formatDate(payment.nextPaymentDueDate) // Use formatDate here
                        : "Not specified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No payment history available.</p>
          )}

          {/* Button to initiate payment */}
          <div className="text-center mt-4">
            <Button variant="primary" onClick={() => setShowPayment(true)}>
              Pay Next Payment
            </Button>
          </div>

          {/* Display Payment Component */}
          {showPayment && (
            <div className="mt-4">
              <Payment />
              <div className="text-center mt-3">
                <Button variant="secondary" onClick={() => setShowPayment(false)}>
                  Cancel Payment
                </Button>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsPayment;