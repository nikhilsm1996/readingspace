import { useState } from 'react';

const TierManagement = () => {
  const [selectedTier, setSelectedTier] = useState('standard');

  const tiers = {
    standard: { seats: 40, price: 500, deposit: 1000 },
    premium: { seats: 25, price: 1000, deposit: 2000 },
    supreme: { seats: 10, price: 1500, deposit: 3000 },
  };

  return (
    <div className="container mt-4">
      <h4>Tier Management</h4>
      <select
        className="form-select my-3"
        value={selectedTier}
        onChange={(e) => setSelectedTier(e.target.value)}
      >
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
        <option value="supreme">Supreme</option>
      </select>
      <div>
        <h5>{selectedTier.toUpperCase()} Tier</h5>
        <p>Seats: {tiers[selectedTier].seats}</p>
        <p>Price: ₹{tiers[selectedTier].price}</p>
        <p>Deposit: ₹{tiers[selectedTier].deposit}</p>
      </div>
    </div>
  );
};

export default TierManagement;
