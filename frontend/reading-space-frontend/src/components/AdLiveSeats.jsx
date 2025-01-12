import { useEffect, useState } from 'react';
import { Button, Card, CardBody } from 'reactstrap';
import './AdLiveSeats.css';

const AdLiveSeats = () => {
  const [seats, setSeats] = useState([]);
  const [selectedTier, setSelectedTier] = useState('Standard');
  const [selectedSeat, setSelectedSeat] = useState(null);

  const fetchSeats = async (tier) => {
    const response = await fetch(`http://localhost:5000/api/seats?tier=${tier}`);
    const data = await response.json();
    setSeats(data);
  };

  useEffect(() => {
    fetchSeats(selectedTier);
  }, [selectedTier]);

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
  };

  return (
    <div className="container my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Reading Space - Live Seats</h2>
          <div className="d-flex justify-content-center gap-3 mb-3">
            {['Standard', 'Premium', 'Supreme'].map((tier) => (
              <Button
                key={tier}
                color={selectedTier === tier ? 'primary' : 'secondary'}
                onClick={() => setSelectedTier(tier)}
              >
                {tier}
              </Button>
            ))}
          </div>
          <div className="seat-grid">
            {seats.map((seat) => (
              <div
                key={seat.id}
                className={`seat ${seat.status} ${selectedSeat === seat ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seat)}
              >
                {seat.number}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdLiveSeats;