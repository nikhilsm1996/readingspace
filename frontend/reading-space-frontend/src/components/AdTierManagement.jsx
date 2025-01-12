import { useEffect, useState } from 'react';
import { Button, Input, Card, CardBody, FormGroup, Label } from 'reactstrap';
import './AdTierManagement.css';

const TierManagement = () => {
  const [tiers, setTiers] = useState([]);
  const [selectedTier, setSelectedTier] = useState(null);
  const [seatCount, setSeatCount] = useState('');
  const [price, setPrice] = useState('');
  const [deposit, setDeposit] = useState('');

  const fetchTiers = async () => {
    const response = await fetch('http://localhost:5000/api/seats');
    const data = await response.json();
    setTiers(data);
  };

  useEffect(() => {
    fetchTiers();
  }, []);

  const handleSaveTier = async () => {
    if (!selectedTier || !seatCount || !price || !deposit) return;

    await fetch('http://localhost:5000/api/seats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: selectedTier,
        price: parseInt(price, 10),
        deposit: parseInt(deposit, 10),
        seatCount: parseInt(seatCount, 10),
      }),
    });

    fetchTiers();
  };

  const handleTierClick = (tier) => {
    setSelectedTier(tier);
    const selectedTierData = tiers.find((t) => t.name === tier);
    if (selectedTierData) {
      setSeatCount(selectedTierData.seatCount);
      setPrice(selectedTierData.price);
      setDeposit(selectedTierData.deposit);
    }
  };

  return (
    <div className="container my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Seat Management</h2>
          <div className="d-flex justify-content-center gap-3 mb-3">
            {['Standard', 'Premium', 'Supreme'].map((tier) => (
              <Button
                key={tier}
                color={selectedTier === tier ? 'primary' : 'secondary'}
                onClick={() => handleTierClick(tier)}
              >
                {tier}
              </Button>
            ))}
          </div>
          {selectedTier && (
            <div className="mt-4">
              <h5 className="text-center">{selectedTier} Seats</h5>
              <FormGroup className="mt-3">
                <Label for="seatCount">Seat Count</Label>
                <Input
                  type="number"
                  id="seatCount"
                  placeholder="Enter seat count"
                  value={seatCount}
                  onChange={(e) => setSeatCount(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label for="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormGroup>
              <FormGroup className="mt-3">
                <Label for="deposit">Deposit</Label>
                <Input
                  type="number"
                  id="deposit"
                  placeholder="Enter deposit"
                  value={deposit}
                  onChange={(e) => setDeposit(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" onClick={handleSaveTier} className="mt-3 w-100">
                Save
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default TierManagement;