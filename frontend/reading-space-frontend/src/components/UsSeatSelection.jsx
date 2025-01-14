import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

const ReadingRoomBooking = () => {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [seatData, setSeatData] = useState(null);

  useEffect(() => {
    // Fetch seat data from Postman API
    const fetchSeatData = async () => {
      try {
        const response = await fetch('https://your-postman-api-endpoint.com/seats');
        const data = await response.json();
        setSeatData(data);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchSeatData();
  }, []);

  const handlePayment = async (method) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
    setBookingComplete(true);
  };

  const getSeatColor = (status) => {
    switch (status) {
      case 'booked': return 'bg-danger';
      case 'blocked': return 'bg-dark';
      case 'vacant': return 'bg-secondary hover-bg-secondary';
      default: return 'bg-secondary';
    }
  };

  const calculateEndDate = (startDate) => {
    if (!startDate) return '';
    const date = new Date(startDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  if (bookingComplete) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
        <div className="bg-white p-5 rounded shadow text-center">
          <div className="text-success display-1 mb-4">✓</div>
          <h2 className="h2 mb-4">Booking Successful!</h2>
          <p className="text-muted">Your seat has been reserved successfully.</p>
          <p className="text-muted">You will be redirected to your dashboard shortly...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Processing your payment...</p>
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light p-4">
        <div className="bg-white p-5 rounded shadow w-100 max-w-md">
          <h2 className="h2 mb-4">Payment Details</h2>
          <div className="space-y-4">
            <div className="p-4 bg-light rounded">
              <p className="fw-bold">Selected Seat: #{selectedSeat}</p>
              <p className="fw-bold">Tier: {selectedTier}</p>
              <p className="fw-bold">Amount: ₹{seatData[selectedTier].price}</p>
            </div>
            <div className="d-grid gap-2">
              <button 
                onClick={() => handlePayment('upi')}
                className="btn btn-primary w-100 py-3"
              >
                Pay with UPI
              </button>
              <button 
                onClick={() => handlePayment('netbanking')}
                className="btn btn-success w-100 py-3"
              >
                Net Banking
              </button>
              <button 
                onClick={() => handlePayment('cash')}
                className="btn btn-warning w-100 py-3"
              >
                Cash Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!seatData) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading seat data...</p>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light p-4">
      <div className="container">
        <h1 className="h1 mb-4">Reading Space</h1>
        
        {/* Date Selection */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="d-flex align-items-center gap-3 mb-3">
            <Calendar className="text-muted" />
            <h2 className="h2">Select Dates</h2>
          </div>
          <div className="row g-3">
            <div className="col">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="col">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control bg-light"
                value={calculateEndDate(startDate)}
                disabled
              />
            </div>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="h2 mb-3">Select Tier</h2>
          <div className="row g-3">
            {Object.keys(seatData).map((tier) => (
              <div className="col" key={tier}>
                <button
                  className={`w-100 p-3 rounded border ${
                    selectedTier === tier
                      ? 'border-primary bg-primary text-white'
                      : 'border-secondary bg-light'
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <div className="fw-bold text-capitalize">{tier}</div>
                  <div className="text-muted">₹{seatData[tier].price}/month</div>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Seat Selection */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="h2 mb-3">Select Seat</h2>
          <div className="row row-cols-5 g-3 mb-4">
            {seatData[selectedTier].seats.map((seat) => (
              <div className="col" key={seat.id}>
                <button
                  className={`
                    w-100 p-3 rounded position-relative
                    ${getSeatColor(seat.status)}
                    ${selectedSeat === seat.id ? 'border border-success' : ''}
                  `}
                  disabled={seat.status !== 'vacant'}
                  onClick={() => setSelectedSeat(seat.id)}
                  title={seat.status === 'booked' ? `Booked until ${seat.bookedUntil}` : ''}
                >
                  {seat.id}
                </button>
              </div>
            ))}
          </div>
          
          <button
            className="w-100 btn btn-primary py-3"
            disabled={!selectedSeat || !startDate}
            onClick={() => setShowPayment(true)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingRoomBooking;