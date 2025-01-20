import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';

const SwitchSeat = () => {
  const [currentSeat, setCurrentSeat] = useState(null); // Current seat details
  const [selectedSeat, setSelectedSeat] = useState(null); // New seat selected by the user
  const [seatData, setSeatData] = useState({}); // Seats grouped by tier
  const [selectedTier, setSelectedTier] = useState(null); // Selected tier
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  // Fetch current seat and all seats from the backend
  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        const requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        // Fetch current user details
        const userResponse = await fetch('http://localhost:3000/users/me', requestOptions);
        const userResult = await userResponse.json();

        if (userResponse.ok && userResult.user.seat) {
          setCurrentSeat(userResult.user.seat); // Set current seat details
        }

        // Fetch all seats
        const allSeatsResponse = await fetch('http://localhost:3000/seats/', requestOptions);
        const allSeatsResult = await allSeatsResponse.json();

        if (allSeatsResponse.ok) {
          // Group seats by tier
          const groupedSeats = allSeatsResult.reduce((acc, seat) => {
            const tier = seat.tier.name;
            if (!acc[tier]) {
              acc[tier] = [];
            }
            acc[tier].push(seat);
            return acc;
          }, {});

          setSeatData(groupedSeats);

          // Set the default selected tier to the current seat's tier
          if (userResult.user.seat) {
            setSelectedTier(userResult.user.seat.tier.name);
          }
        }
      } catch (error) {
        console.error('Error fetching seat data:', error);
        setError('Failed to fetch seat data. Please try again.');
      }
    };

    fetchSeatData();
  }, [token]);

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    if (seat.status === 'vacant') {
      const confirmSelection = window.confirm(
        `Are you sure you want to select seat ${seat.seatNumber}?`
      );
      if (confirmSelection) {
        setSelectedSeat(seat.seatNumber === selectedSeat ? null : seat.seatNumber);
      }
    }
  };

  // Handle seat switching
  const handleSwitchSeat = async () => {
    if (!selectedSeat) return;

    const confirmSwitch = window.confirm(
      `Are you sure you want to switch to seat ${selectedSeat}?`
    );
    if (!confirmSwitch) return;

    setLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const raw = JSON.stringify({
        newSeatNumber: selectedSeat,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/seats/switch', requestOptions);
      const result = await response.json();

      if (response.ok) {
        // Refresh the page after successful seat switch
        window.location.reload();
      } else {
        setError(result.message || 'Failed to switch seat. Please try again.');
      }
    } catch (error) {
      console.error('Error switching seat:', error);
      setError('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Get seat color based on status
  const getSeatColor = (status, isSelected) => {
    if (isSelected) return 'bg-primary text-white';
    switch (status) {
      case 'vacant':
        return 'bg-success text-white';
      case 'booked':
        return 'bg-danger text-white';
      case 'blocked':
        return 'bg-dark text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Card.Title>Switch Seat</Card.Title>
            </Card.Header>
            <Card.Body>
              {/* Display Current Seat */}
              {currentSeat && (
                <Alert variant="info" className="mb-4">
                  <p><strong>Current Seat:</strong> {currentSeat.seatNumber}</p>
                  <p><strong>Tier:</strong> {currentSeat.tier.name.toUpperCase()}</p> {/* Capitalize tier name */}
                  <p><strong>Price:</strong> ₹{currentSeat.price}</p>
                  <p><strong>Deposit:</strong> ₹{currentSeat.deposit}</p>
                </Alert>
              )}

              {/* Tier Buttons */}
              <div className="d-flex justify-content-center gap-3 mb-4">
                {Object.keys(seatData).map((tier) => (
                  <Button
                    key={tier}
                    variant={selectedTier === tier ? 'primary' : 'outline-primary'}
                    onClick={() => setSelectedTier(tier)}
                  >
                    {tier.toUpperCase()} {/* Capitalize tier name */}
                  </Button>
                ))}
              </div>

              {/* Seat Grid for Selected Tier */}
              {selectedTier && (
                <>
                  <div className="seat-grid mb-4">
                    {seatData[selectedTier].map((seat) => (
                      <div
                        key={seat.seatNumber}
                        className={`seat ${getSeatColor(seat.status, seat.seatNumber === selectedSeat)}`}
                        onClick={() => handleSeatSelect(seat)}
                      >
                        {seat.seatNumber}
                      </div>
                    ))}
                  </div>

                  {/* Seat Legend */}
                  <div className="d-flex justify-content-center gap-4 mb-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="seat-legend bg-success"></div>
                      <span>Vacant</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="seat-legend bg-danger"></div>
                      <span>Booked</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="seat-legend bg-dark"></div>
                      <span>Blocked</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <div className="seat-legend bg-primary"></div>
                      <span>Selected</span>
                    </div>
                  </div>

                  {/* Switch Seat Button */}
                  <Button
                    variant="warning"
                    className="w-100"
                    onClick={handleSwitchSeat}
                    disabled={!selectedSeat || loading}
                  >
                    {loading ? 'Switching Seat...' : 'Switch Seat'}
                  </Button>
                </>
              )}

              {/* Error Message */}
              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Custom CSS for Seat Grid */}
      <style>
        {`
          .seat-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 10px;
          }

          .seat {
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }

          .seat:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .seat-legend {
            width: 16px;
            height: 16px;
            border-radius: 4px;
          }
        `}
      </style>
    </Container>
  );
};

export default SwitchSeat;