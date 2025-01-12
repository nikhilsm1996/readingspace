import { useEffect, useState } from 'react';
import { Card, CardBody, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdPayment = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    const response = await fetch('http://localhost:5000/api/payments');
    const result = await response.json();
    setPayments(result);
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
                <th>Name</th>
                <th>Phone Number</th>
                <th>Tier</th>
                <th>Subscription Period</th>
                <th>Next Payment Due</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr key={payment.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{payment.name}</td>
                  <td>{payment.phoneNumber}</td>
                  <td>{payment.tier}</td>
                  <td>{`${payment.startDate} to ${payment.endDate}`}</td>
                  <td>{payment.nextPaymentDue}</td>
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