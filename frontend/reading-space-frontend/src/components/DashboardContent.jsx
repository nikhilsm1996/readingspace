
import { Card, Row, Col } from "react-bootstrap";

const DashboardContent = () => {
  return (
    <div>
      <h3 className="mb-4">Dashboard Overview</h3>
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Total Users</Card.Title>
              <Card.Text>1,234</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>$12,345</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Active Projects</Card.Title>
              <Card.Text>45</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Pending Tasks</Card.Title>
              <Card.Text>12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardContent;