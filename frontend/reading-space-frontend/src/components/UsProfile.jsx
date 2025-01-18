import { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Mail, Hash } from 'lucide-react';

const UsProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');


  // Fetch user data from the backend
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
          setName(result.user.name);
          setEmail(result.user.email);
          setPhone(result.user.phone);
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
    if (!name || !email || !phone) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${localStorage.getItem('authToken')}`);

      const raw = JSON.stringify({
        name,
        email,
        phone,
      });

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/users/me', requestOptions);
      const result = await response.json();

      if (response.ok) {
        setMessage('Profile updated successfully!');
        setError('');
      } else {
        setError(result.message || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred. Please check your connection.');
    }
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Edit Profile</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {/* Display success message */}
          {message && <Alert variant="success">{message}</Alert>}

          {/* Display error message */}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>
                <User size={20} className="me-2 text-secondary" />
                Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3">
              <Form.Label>
                <Mail size={20} className="me-2 text-secondary" />
                Email
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            {/* Phone */}
            <Form.Group className="mb-3">
              <Form.Label>
                <Hash size={20} className="me-2 text-secondary" />
                Phone
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsProfile;