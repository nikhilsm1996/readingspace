import { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { BookOpen, Users, Star } from "lucide-react";

const AdminSeatManagement = () => {
  const [seatCounts, setSeatCounts] = useState({
    standard: { vacant: 0, blocked: 0, booked: 0 },
    premium: { vacant: 0, blocked: 0, booked: 0 },
    supreme: { vacant: 0, blocked: 0, booked: 0 },
  });

  const token = localStorage.getItem("authToken");

  // Fetch seat data from the backend
  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };

        const response = await fetch("http://localhost:3000/seats/", requestOptions);
        const result = await response.json();

        const counts = {
          standard: { vacant: 0, blocked: 0, booked: 0 },
          premium: { vacant: 0, blocked: 0, booked: 0 },
          supreme: { vacant: 0, blocked: 0, booked: 0 },
        };

        result.forEach((seat) => {
          const tier = seat.tier.name;
          if (seat.status === "vacant") counts[tier].vacant++;
          else if (seat.status === "blocked") counts[tier].blocked++;
          else if (seat.status === "booked") counts[tier].booked++;
        });

        setSeatCounts(counts);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      }
    };

    fetchSeatData();
  }, [token]);

  return (
    <div className="container my-4">
      <div className="row">
        {/* Standard Tier Card */}
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <BookOpen size={24} className="me-2 text-primary" />
                <h5 className="mb-0">Standard Tier</h5>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Vacant:</span>
                  <span className="badge bg-success">{seatCounts.standard.vacant}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Blocked:</span>
                  <span className="badge bg-secondary">{seatCounts.standard.blocked}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Booked:</span>
                  <span className="badge bg-danger">{seatCounts.standard.booked}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Premium Tier Card */}
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <Users size={24} className="me-2 text-success" />
                <h5 className="mb-0">Premium Tier</h5>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Vacant:</span>
                  <span className="badge bg-success">{seatCounts.premium.vacant}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Blocked:</span>
                  <span className="badge bg-secondary">{seatCounts.premium.blocked}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Booked:</span>
                  <span className="badge bg-danger">{seatCounts.premium.booked}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Supreme Tier Card */}
        <div className="col-md-4">
          <Card className="shadow-sm p-3 mb-4">
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <Star size={24} className="me-2 text-warning" />
                <h5 className="mb-0">Supreme Tier</h5>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Vacant:</span>
                  <span className="badge bg-success">{seatCounts.supreme.vacant}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Blocked:</span>
                  <span className="badge bg-secondary">{seatCounts.supreme.blocked}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span>Booked:</span>
                  <span className="badge bg-danger">{seatCounts.supreme.booked}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSeatManagement;