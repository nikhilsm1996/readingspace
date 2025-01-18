import { useEffect, useState } from "react";
import { Card, CardBody, Table, Button } from "reactstrap";

const Vacate = () => {
  const [vacateRequests, setVacateRequests] = useState([]);

  // Fetch vacate requests from the backend
  const fetchVacateRequests = async () => {
    const token = localStorage.getItem("authToken"); // Get the admin's token from localStorage
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/vacation/all", requestOptions);
      const result = await response.json();
      if (response.ok) {
        setVacateRequests(result.vacationRequests);
      } else {
        throw new Error(result.message || "Failed to fetch vacate requests");
      }
    } catch (error) {
      console.error("Error fetching vacate requests:", error);
    }
  };

  // Handle accepting a vacate request
  const handleAcceptVacate = async (requestId) => {
    const token = localStorage.getItem("authToken"); // Get the admin's token from localStorage
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      depositAdjustment: 0, // Adjust deposit if needed
      status: "approved", // Set status to approved
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:3000/vacation/confirm/${requestId}`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("Vacate request approved:", result);
        // Refresh the vacate requests list
        fetchVacateRequests();
      } else {
        throw new Error(result.message || "Failed to approve vacate request");
      }
    } catch (error) {
      console.error("Error approving vacate request:", error);
    }
  };

  // Handle rejecting a vacate request
  const handleRejectVacate = async (requestId) => {
    const token = localStorage.getItem("authToken"); // Get the admin's token from localStorage
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(`http://localhost:3000/vacation/delete/${requestId}`, requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("Vacate request rejected:", result);
        // Refresh the vacate requests list
        fetchVacateRequests();
      } else {
        throw new Error(result.message || "Failed to reject vacate request");
      }
    } catch (error) {
      console.error("Error rejecting vacate request:", error);
    }
  };

  useEffect(() => {
    fetchVacateRequests();
  }, []);

  return (
    <div className="container my-4">
      <Card className="shadow-sm p-3 mb-4">
        <CardBody>
          <h2 className="text-center mb-4">Vacate Requests</h2>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Seat Number</th>
                <th>Tier</th>
                <th>Vacation Date</th>
                <th>Deposit Adjustment</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vacateRequests.map((request, index) => (
                <tr key={request._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{request.user?.name}</td>
                  <td>{request.user?.email}</td>
                  <td>{request.user?.phone}</td>
                  <td>{request.seat?.seatNumber}</td>
                  <td>{request.seat?.tier?.name}</td>
                  <td>{new Date(request.vacationDate).toLocaleDateString()}</td>
                  <td>₹{request.depositAdjustment}</td>
                  <td>{request.status}</td>
                  <td>
                    {request.status === "pending" && (
                      <>
                        <Button
                          color="success"
                          size="sm"
                          onClick={() => handleAcceptVacate(request._id)}
                          className="me-2"
                        >
                          Accept
                        </Button>
                        <Button
                          color="danger"
                          size="sm"
                          onClick={() => handleRejectVacate(request._id)}
                        >
                          Reject
                        </Button>
                      </>
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

export default Vacate;