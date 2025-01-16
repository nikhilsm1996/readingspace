import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  CardBody,
  FormGroup,
  Label,
  Alert,
  Container,
} from "reactstrap";

const TierCreation = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    deposit: "",
    seats: "", // Field for the number of seats
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const tierOptions = ["standard", "premium", "supreme"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name) {
      setMessage({ text: "Please select a tier name", type: "danger" });
      return false;
    }
    if (!formData.price || formData.price <= 0) {
      setMessage({ text: "Please enter a valid price", type: "danger" });
      return false;
    }
    if (!formData.deposit || formData.deposit <= 0) {
      setMessage({ text: "Please enter a valid deposit amount", type: "danger" });
      return false;
    }
    if (!formData.seats || formData.seats <= 0) {
      setMessage({ text: "Please enter a valid number of seats", type: "danger" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      setMessage({
        text: "User not authenticated. Please log in.",
        type: "danger",
      });
      setLoading(false);
      return;
    }

    try {
      // Tier creation request
      const tierResponse = await fetch("http://localhost:3000/tier", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name.toLowerCase(),
          price: Number(formData.price),
          deposit: Number(formData.deposit),
        }),
      });

      const tierData = await tierResponse.json();

      if (!tierResponse.ok) {
        throw new Error(tierData.message || "Failed to create tier");
      }

      // Seats creation request
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        [`total${formData.name.charAt(0).toUpperCase() + formData.name.slice(1)}Seats`]: Number(formData.seats),
      });

      const seatResponse = await fetch(`http://localhost:3000/seats/${formData.name}`, {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      });

      const seatData = await seatResponse.json();

      if (!seatResponse.ok) {
        throw new Error(seatData.message || "Failed to create seats");
      }

      setMessage({
        text: `Successfully created ${formData.name} tier with price ${formData.price}, deposit ${formData.deposit}, and ${formData.seats} seats.`,
        type: "success",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        price: "",
        deposit: "",
        seats: "",
      });
    } catch (error) {
      setMessage({
        text: error.message || "Error creating tier or seats",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: "", type: "" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <Container className="my-4">
      <Card>
        <CardBody>
          <h2 className="text-center mb-4">Create New Tier</h2>

          {message.text && (
            <Alert color={message.type} className="mb-4">
              {message.text}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="tierName">Tier Name</Label>
              <Input
                type="select"
                name="name"
                id="tierName"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-3"
              >
                <option value="">Select a tier...</option>
                {tierOptions.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="price">Monthly Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Enter monthly price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="mb-3"
              />
            </FormGroup>

            <FormGroup>
              <Label for="deposit">Deposit Amount</Label>
              <Input
                type="number"
                name="deposit"
                id="deposit"
                placeholder="Enter deposit amount"
                value={formData.deposit}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                className="mb-3"
              />
            </FormGroup>

            <FormGroup>
              <Label for="seats">Number of Seats</Label>
              <Input
                type="number"
                name="seats"
                id="seats"
                placeholder="Enter the number of seats"
                value={formData.seats}
                onChange={handleInputChange}
                min="1"
                className="mb-3"
              />
            </FormGroup>

            <Button
              color="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? "Creating Tier and Seats..." : "Create Tier and Seats"}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default TierCreation;
