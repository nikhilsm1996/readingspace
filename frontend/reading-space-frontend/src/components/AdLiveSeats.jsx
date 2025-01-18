import { useState, useEffect } from 'react';

const AdminSeatManagement = () => {
  const [selectedTier, setSelectedTier] = useState('standard');
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [showSeatInfo, setShowSeatInfo] = useState(false);
  const [seatData, setSeatData] = useState({
    standard: { seats: [] },
    premium: { seats: [] },
    supreme: { seats: [] },
  });
  const [seatCounts, setSeatCounts] = useState({
    standard: { vacant: 0, blocked: 0, booked: 0 },
    premium: { vacant: 0, blocked: 0, booked: 0 },
    supreme: { vacant: 0, blocked: 0, booked: 0 },
    total: { vacant: 0, blocked: 0, booked: 0 },
  });

  // Store the token in a ref so it's only fetched once
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

        // Fetch all seats
        const response = await fetch('http://localhost:3000/seats/', requestOptions);
        const result = await response.json();

        // Organize seats by tier
        const tierData = {
          standard: { seats: [] },
          premium: { seats: [] },
          supreme: { seats: [] },
        };

        const counts = {
          standard: { vacant: 0, blocked: 0, booked: 0 },
          premium: { vacant: 0, blocked: 0, booked: 0 },
          supreme: { vacant: 0, blocked: 0, booked: 0 },
          total: { vacant: 0, blocked: 0, booked: 0 },
        };

        result.forEach((seat) => {
          const tier = seat.tier.name;
          tierData[tier].seats.push(seat);

          if (seat.status === 'vacant') counts[tier].vacant++;
          else if (seat.status === 'blocked') counts[tier].blocked++;
          else if (seat.status === 'booked') counts[tier].booked++;
        });

        // Calculate total counts
        counts.total.vacant = counts.standard.vacant + counts.premium.vacant + counts.supreme.vacant;
        counts.total.blocked = counts.standard.blocked + counts.premium.blocked + counts.supreme.blocked;
        counts.total.booked = counts.standard.booked + counts.premium.booked + counts.supreme.booked;

        setSeatData(tierData);
        setSeatCounts(counts);
      } catch (error) {
        console.error('Error fetching seat data:', error);
      }
    };

    fetchSeatData();
  }, [token]); // Empty dependency array ensures this runs only once on mount

  // Handle seat actions (block/unblock)
  const handleSeatAction = async (action) => {
    if (!selectedSeat) return;

    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      const newStatus = action === 'block' ? 'blocked' : 'vacant';

      const requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify({ status: newStatus }),
        redirect: 'follow',
      };

      const response = await fetch(
        `http://localhost:3000/seats/status/${selectedSeat.seatNumber}`,
        requestOptions
      );

      if (response.ok) {
        const updatedSeat = await response.json();
        setSeatData((prev) => ({
          ...prev,
          [selectedTier]: {
            ...prev[selectedTier],
            seats: prev[selectedTier].seats.map((seat) =>
              seat.seatNumber === updatedSeat.seatNumber ? updatedSeat : seat
            ),
          },
        }));

        // Refresh seat counts
        const countResponse = await fetch('http://localhost:3000/seats/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const countData = await countResponse.json();
        const counts = {
          standard: { vacant: 0, blocked: 0, booked: 0 },
          premium: { vacant: 0, blocked: 0, booked: 0 },
          supreme: { vacant: 0, blocked: 0, booked: 0 },
          total: { vacant: 0, blocked: 0, booked: 0 },
        };

        countData.forEach((seat) => {
          const tier = seat.tier.name;
          if (seat.status === 'vacant') counts[tier].vacant++;
          else if (seat.status === 'blocked') counts[tier].blocked++;
          else if (seat.status === 'booked') counts[tier].booked++;
        });

        counts.total.vacant = counts.standard.vacant + counts.premium.vacant + counts.supreme.vacant;
        counts.total.blocked = counts.standard.blocked + counts.premium.blocked + counts.supreme.blocked;
        counts.total.booked = counts.standard.booked + counts.premium.booked + counts.supreme.booked;

        setSeatCounts(counts);
      }
    } catch (error) {
      console.error('Error updating seat:', error);
    }

    setShowSeatInfo(false);
  };

  // Get seat color based on status
  const getSeatColor = (status) => {
    switch (status) {
      case 'booked':
        return 'btn-danger'; // Red for booked seats
      case 'blocked':
        return 'btn-dark'; // Black for blocked seats
      case 'vacant':
        return 'btn-success'; // Green for vacant seats
      default:
        return 'btn-light'; // Default color
    }
  };

  return (
    <div className="container-fluid bg-light py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3">Live Seats </h1>
          <div className="d-flex gap-4">
            <div className="d-flex align-items-center">
              <span className="badge bg-danger me-2">&nbsp;</span>
              <span>Booked</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-dark me-2">&nbsp;</span>
              <span>Blocked</span>
            </div>
            <div className="d-flex align-items-center">
              <span className="badge bg-success me-2">&nbsp;</span>
              <span>Vacant</span>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="row mb-4">
          {Object.entries(seatCounts).map(([tier, counts]) => {
            if (tier === 'total') return null;
            return (
              <div key={tier} className="col-md-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title text-capitalize">{tier}</h5>
                    <div className="mt-3">
                      <div className="d-flex justify-content-between">
                        <span>Vacant:</span>
                        <span className="text-success">{counts.vacant}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Blocked:</span>
                        <span>{counts.blocked}</span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>Booked:</span>
                        <span className="text-danger">{counts.booked}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier Selection */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title">Select Tier to Manage</h4>
            <div className="d-flex gap-3">
              {Object.keys(seatData).map((tier) => (
                <button
                  key={tier}
                  className={`btn flex-fill ${
                    selectedTier === tier ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
                  onClick={() => setSelectedTier(tier)}
                >
                  <div className="fw-bold text-capitalize">{tier}</div>
                  <div className="small">₹{seatData[tier].price}/month</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Seat Management */}
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Seat Management</h4>
            <div className="row row-cols-5 g-2">
              {seatData[selectedTier].seats.map((seat) => (
                <div key={seat.seatNumber} className="col">
                  <button
                    className={`btn ${getSeatColor(seat.status)} w-100`}
                    onClick={() => {
                      setSelectedSeat(seat);
                      setShowSeatInfo(true);
                    }}
                  >
                    {seat.seatNumber}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Seat Information Modal */}
        {showSeatInfo && selectedSeat && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Seat {selectedSeat.seatNumber} Information</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowSeatInfo(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>
                    <strong>Status:</strong> {selectedSeat.status}
                  </p>
                  <p>
                    <strong>Price:</strong> ₹{selectedSeat.price}
                  </p>
                  <p>
                    <strong>Deposit:</strong> ₹{selectedSeat.deposit}
                  </p>

                  {selectedSeat.user && (
                    <div className="mt-3">
                      <p>
                        <strong>User:</strong> {selectedSeat.user.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedSeat.user.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {selectedSeat.user.phone}
                      </p>
                    </div>
                  )}

                  <div className="mt-3">
                    {selectedSeat.status === 'vacant' ? (
                      <button className="btn btn-danger" onClick={() => handleSeatAction('block')}>
                        Block Seat
                      </button>
                    ) : selectedSeat.status === 'blocked' ? (
                      <button className="btn btn-success" onClick={() => handleSeatAction('unblock')}>
                        Make Vacant
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSeatManagement;