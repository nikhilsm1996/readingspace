import  { useEffect, useState } from 'react';
import { Card, CardBody, Table, Button } from 'reactstrap';


const Vacate = () => {
  const [vacateRequests, setVacateRequests] = useState([]);

  const fetchVacateRequests = async () => {
    const response = await fetch('http://localhost:5000/api/vacate-requests');
    const result = await response.json();
    setVacateRequests(result);
  };

  const handleAcceptVacate = async (userId) => {
    await fetch(`http://localhost:5000/api/vacate-requests/${userId}`, {
      method: 'POST',
    });
    fetchVacateRequests();
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
                <th>Phone Number</th>
                <th>Tier</th>
                <th>Seat Number</th>
                <th>Deposit Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vacateRequests.map((request, index) => (
                <tr key={request.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{request.name}</td>
                  <td>{request.phoneNumber}</td>
                  <td>{request.tier}</td>
                  <td>{request.seatNumber}</td>
                  <td>₹{request.depositAmount}</td>
                  <td>
                    <Button color="success" onClick={() => handleAcceptVacate(request.id)}>
                      Accept
                    </Button>
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