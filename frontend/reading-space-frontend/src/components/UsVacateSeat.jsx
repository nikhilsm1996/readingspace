import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { Calendar, Hash } from 'lucide-react';

const UsVacateSeat = () => {
  const [vacationDate, setVacationDate] = useState(''); // Vacation date
  const [seatNumber, setSeatNumber] = useState(''); // User's seat number (fetched from API)
  const [message, setMessage] = useState(''); // Feedback message after submission
  const [error, setError] = useState(''); // Error message
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch user data (including seat number) from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);
// Compare this snippet from frontend/reading-space-frontend/src/components/UsPayment.jsx:
        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch('http://localhost:3000/users/me', requestOptions);
        const result = await response.json();
// Compare this snippet from frontend/reading-space-frontend/src/components/UsPayment.jsx:
        if (response.ok) {
          setSeatNumber(result.user.seat?.seatNumber || 'Not assigned');
        } else {
          setError(result.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('An error occurred. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle form submission for creating a vacate request
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!vacationDate) {
      setError('Please select a vacation date.');
      return;
    }
// Compare this snippet from frontend/reading-space-frontend/src/components/UsReportIssue.jsx:
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

      const raw = JSON.stringify({
        vacationDate: new Date(vacationDate).toISOString(),
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/vacation/create', requestOptions);
      const result = await response.json();
// Compare this snippet from frontend/reading-space-frontend/src/components/UsPayment.jsx:
      if (response.ok) {
        setMessage('Vacate seat request created successfully!');
        setError('');
        setVacationDate('');
      } else {
        setError(result.message || 'Failed to create vacate request.');
      }
    } catch (error) {
      console.error('Error creating vacate request:', error);
      setError('An error occurred. Please check your connection.');
    }
  };

  // Handle form submission for updating a vacate request
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!vacationDate) {
      setError('Please select a vacation date.');
      return;
    }
    
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

      const raw = JSON.stringify({
        vacationDate: new Date(vacationDate).toISOString(),
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/vacation/update', requestOptions);
      const result = await response.json();

      if (response.ok) {
        setMessage('Vacate seat request updated successfully!');
        setError('');
        setVacationDate('');
      } else {
        setError(result.message || 'Failed to update vacate request.');
      }
    } catch (error) {
      console.error('Error updating vacate request:', error);
      setError('An error occurred. Please check your connection.');
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Vacate Seat</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {/* Display success message */}
          {message && <Alert variant="success">{message}</Alert>}

          {/* Display error message */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form>
            {/* Seat Number */}
            <Form.Group className="mb-3">
              <Form.Label>
                <Hash size={20} className="me-2 text-secondary" />
                Seat Number
              </Form.Label>
              <Form.Control
                type="text"
                value={seatNumber}
                readOnly
                disabled
              />
            </Form.Group>

            {/* Vacation Date */}
            <Form.Group className="mb-3">
              <Form.Label>
                <Calendar size={20} className="me-2 text-secondary" />
                Vacation Date
              </Form.Label>
              <Form.Control
                type="date"
                value={vacationDate}
                onChange={(e) => setVacationDate(e.target.value)}
                required
              />
            </Form.Group>

            {/* Submit Button for Create Request */}
            <Button variant="primary" onClick={handleSubmit} className="w-100 mb-3">
              Submit Vacate Request
            </Button>

            {/* Submit Button for Update Request */}
            <Button variant="secondary" onClick={handleUpdate} className="w-100">
              Update Vacate Request
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsVacateSeat;