import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { ArrowLeft } from 'lucide-react';

const SeatSelection = () => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [bookingStage, setBookingStage] = useState('tiers'); // tiers, seats
  const [seatData, setSeatData] = useState({
    standard: [],
    premium: [],
    supreme: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('authToken');

  // Fetch seat data from the backend
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

        const response = await fetch('http://localhost:3000/seats/', requestOptions);
        const result = await response.json();

        const tierData = {
          standard: [],
          premium: [],
          supreme: [],
        };

        result.forEach((seat) => {
          const tier = seat.tier.name;
          tierData[tier].push(seat);
        });

        setSeatData(tierData);
      } catch (error) {
        console.error('Error fetching seat data:', error);
        setError('Failed to fetch seat data. Please try again.');
      }
    };

    fetchSeatData();
  }, [token]);

  // Get seat statistics for a tier
  const getSeatStats = (tier) => {
    const seats = seatData[tier];
    return {
      total: seats.length,
      vacant: seats.filter((s) => s.status === 'vacant').length,
      booked: seats.filter((s) => s.status === 'booked').length,
      blocked: seats.filter((s) => s.status === 'blocked').length,
    };
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

  // Handle tier selection
  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
    setBookingStage('seats');
  };

  // Handle seat selection
  const handleSeatSelect = (seat) => {
    if (seat.status === 'vacant') {
      setSelectedSeat(seat.seatNumber === selectedSeat ? null : seat.seatNumber);
    }
  };

  // Handle seat confirmation
  const handleConfirmSeat = async () => {
    if (!selectedSeat) return;

    setLoading(true);
    setError(null);

    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Authorization', `Bearer ${token}`);

      const raw = JSON.stringify({
        seatNumber: selectedSeat,
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      const response = await fetch('http://localhost:3000/seats/assign', requestOptions);
      const result = await response.json();

      if (response.ok) {
        // Update the seat status in the local state
        const updatedSeatData = { ...seatData };
        const tierSeats = updatedSeatData[selectedTier];
        const updatedSeat = tierSeats.find((s) => s.seatNumber === selectedSeat);
        if (updatedSeat) {
          updatedSeat.status = 'booked';
          setSeatData(updatedSeatData);
        }

        // Navigate to the payment screen with the selected tier and seat
        navigate('/payment', { state: { selectedTier, selectedSeat } });
      } else {
        setError(result.message || 'Failed to book the seat. Please try again.');
      }
    } catch (error) {
      console.error('Error booking seat:', error);
      setError('An error occurred. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container className="py-5">
        {bookingStage === 'tiers' && (
          <>
            <h2 className="text-center text-white mb-4">Select Your Tier</h2>
            <Row className="g-4">
              {Object.keys(seatData).map((tier) => {
                const stats = getSeatStats(tier);
                return (
                  <Col key={tier} md={4}>
                    <Card
                      className="h-100 shadow-lg border-0 cursor-pointer hover-scale"
                      onClick={() => handleTierSelect(tier)}
                    >
                      <Card.Body className="text-center">
                        <h3 className="card-title text-capitalize fw-bold">{tier}</h3>
                        <div className="text-muted">
                          <p>Total Seats: {stats.total}</p>
                          <p className="text-success">Available: {stats.vacant}</p>
                          <p className="text-danger">Booked: {stats.booked}</p>
                          <p>Blocked: {stats.blocked}</p>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </>
        )}

        {bookingStage === 'seats' && (
          <Card className="shadow-lg border-0">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="text-capitalize">{selectedTier} Tier Seats</h2>
                <Button variant="outline-primary" onClick={() => setBookingStage('tiers')}>
                  <ArrowLeft size={20} className="me-2" />
                  Back to Tiers
                </Button>
              </div>

              {/* Seat Grid */}
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

              {/* Proceed to Payment Button */}
              <Button
                variant="primary"
                className="w-100"
                onClick={handleConfirmSeat}
                disabled={!selectedSeat || loading}
              >
                {loading ? (
                  <>
                    <Spinner as="span" size="sm" animation="border" role="status" />
                    <span className="ms-2">Booking Seat...</span>
                  </>
                ) : (
                  'Proceed to Payment'
                )}
              </Button>

              {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            </Card.Body>
          </Card>
        )}
      </Container>

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

          .hover-scale {
            transition: transform 0.2s;
          }

          .hover-scale:hover {
            transform: scale(1.02);
          }
        `}
      </style>
    </Container>
  );
};

export default SeatSelection;