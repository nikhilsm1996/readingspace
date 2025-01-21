/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Nav, Dropdown, Button } from "react-bootstrap";
import { FaHome, FaThLarge, FaCogs, FaCalendarAlt, FaExclamationCircle, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardContent from "../components/DashboardContent";
import Charts from "../components/Charts";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate(); // Hook for navigation

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <DashboardContent />;
      case "charts":
        return <Charts />;
      default:
        return <h4>Select a valid option from the sidebar.</h4>;
    }
  };

  const handleLogout = () => {
    // Perform logout actions (e.g., clear session/token)
    navigate("/"); // Redirect to the index page
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          height: "100vh",
          width: "250px",
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          position: "fixed",
        }}
      >
        <h4 className="text-primary mb-4">Admin Dashboard</h4>
        <Nav className="flex-column">
          <Nav.Link
            onClick={() => setCurrentView("dashboard")}
            className={`mb-3 ${currentView === "dashboard" ? "text-primary" : "text-dark"}`}
            style={{ cursor: "pointer" }}
          >
            <FaHome className="me-2" />
            Dashboard
          </Nav.Link>
          <Nav.Link
            onClick={() => setCurrentView("charts")}
            className={`mb-3 ${currentView === "charts" ? "text-primary" : "text-dark"}`}
            style={{ cursor: "pointer" }}
          >
            <FaThLarge className="me-2" />
            Charts
          </Nav.Link>
          <Nav.Link className="mb-3 text-dark" style={{ cursor: "pointer" }}>
            <FaCogs className="me-2" />
            Tier Management
          </Nav.Link>
          <Nav.Link className="mb-3 text-dark" style={{ cursor: "pointer" }}>
            <FaCalendarAlt className="me-2" />
            Vacation Notices
          </Nav.Link>
          <Nav.Link className="mb-3 text-dark" style={{ cursor: "pointer" }}>
            <FaExclamationCircle className="me-2" />
            Issues Reported
          </Nav.Link>
          
        </Nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: "250px", padding: "2rem", width: "100%" }}>
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          {/* Profile Dropdown */}
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              id="dropdown-profile"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaUserCircle className="me-2" size={20} />
              Admin
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* Render Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;