import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { AlertCircle, MessageSquare, Hash } from 'lucide-react';

const UsReportIssue = () => {
  const [title, setTitle] = useState(''); // Issue title
  const [description, setDescription] = useState(''); // Issue description
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

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        const response = await fetch('http://localhost:3000/users/me', requestOptions);
        const result = await response.json();

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!title || !description) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

      const raw = JSON.stringify({
        title,
        description,
        seatNumber,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/issue/report', requestOptions);
      const result = await response.json();

      if (response.ok) {
        setMessage('Issue reported successfully!');
        setError('');
        setTitle('');
        setDescription('');
      } else {
        setError(result.message || 'Failed to report the issue.');
      }
    } catch (error) {
      console.error('Error reporting issue:', error);
      setError('An error occurred. Please check your connection.');
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Report an Issue</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {/* Display success message */}
          {message && <Alert variant="success">{message}</Alert>}

          {/* Display error message */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
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

            {/* Issue Title */}
            <Form.Group className="mb-3">
              <Form.Label>
                <AlertCircle size={20} className="me-2 text-secondary" />
                Issue Title
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter issue title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            {/* Issue Description */}
            <Form.Group className="mb-3">
              <Form.Label>
                <MessageSquare size={20} className="me-2 text-secondary" />
                Issue Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe the issue in detail"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Submit Report
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsReportIssue;