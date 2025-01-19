import { useEffect, useState } from "react";
import { Card, CardBody, Table, Button } from "reactstrap";


// Utility function to format date as DD-MM-YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0'); // Ensure 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AdPayment = () => {
  const [payments, setPayments] = useState([]);

  // Fetch payments from the backend
  const fetchPayments = async () => {
    const token = localStorage.getItem("authToken"); // Get the admin's token from localStorage
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/payment?status", requestOptions);
      const result = await response.json();
      if (response.ok) {
        setPayments(result.payments);
      } else {
        throw new Error(result.message || "Failed to fetch payments");
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  // Update payment status from "processing" to "completed"
  const updatePaymentStatus = async (transactionId) => {
    const token = localStorage.getItem("authToken"); // Get the admin's token from localStorage
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      transactionId: transactionId,
      paymentStatus: "completed",
      paymentCompleted: true,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/payment/confirm-payment", requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("Payment status updated:", result);
        // Refresh the payments list after updating
        fetchPayments();
      } else {
        throw new Error(result.message || "Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="container my-4">
      <Card className="shadow-sm p-3 mb-4">
        <CardBody>
          <h2 className="text-center mb-4">Payment Details</h2>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>User Email</th>
                <th>Seat Number</th>
                <th>Tier</th>
                <th>Payment Method</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.transactionId}>
                  <th scope="row">{index + 1}</th>
                  <td>{payment.transactionId}</td>
                  <td>{payment.userEmail}</td>
                  <td>{payment.seatNumber}</td>
                  <td>{payment.tierName}</td>
                  <td>{payment.paymentMethod}</td>
                  <td>{formatDate(payment.paymentDate)}</td> {/* Use the formatDate function here */}
                  <td>{payment.paymentStatus}</td>
                  <td>
                    {payment.paymentStatus === "processing" && (
                      <Button
                        color="success"
                        size="sm"
                        onClick={() => updatePaymentStatus(payment.transactionId)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdPayment;