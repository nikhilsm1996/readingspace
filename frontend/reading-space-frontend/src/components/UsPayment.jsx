import { useState, useEffect } from "react";
import { Container, Card, Alert, Table } from "react-bootstrap";

const UsPayment = () => {
  const [paymentHistory, setPaymentHistory] = useState([]); // Payment history
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

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
  }, []);

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
                    <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
                    <td>{payment.tierName}</td>
                    <td>₹{payment.tierPrice}</td>
                    <td>₹{payment.totalAmount - payment.tierPrice}</td> {/* Calculate deposit */}
                    <td>₹{payment.totalAmount}</td>
                    <td>{payment.paymentMethod}</td>
                    <td>
                      {payment.nextPaymentDueDate
                        ? new Date(payment.nextPaymentDueDate).toLocaleDateString()
                        : "Not specified"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-muted">No payment history available.</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsPayment;