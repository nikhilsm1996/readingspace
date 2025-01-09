import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [cabins, setCabins] = useState([]);
  const [payments, setPayments] = useState({ pending: 0, completed: 0 });
  const [revenue, setRevenue] = useState([]);
  const [issues, setIssues] = useState([]);
  const [vacationNotices, setVacationNotices] = useState([]);

  useEffect(() => {
    fetchCabins();
    fetchPayments();
    fetchRevenue();
    fetchIssues();
    fetchVacationNotices();
  }, []);

  const fetchCabins = async () => {
    const response = await fetch("http://localhost:3000/cabins");
    const data = await response.json();
    setCabins(data);
  };

  const fetchPayments = async () => {
    const response = await fetch("http://localhost:3000/payments");
    const data = await response.json();
    const pending = data.filter((payment) => payment.status === "pending").length;
    const completed = data.filter((payment) => payment.status === "completed").length;
    setPayments({ pending, completed });
  };

  const fetchRevenue = async () => {
    const response = await fetch("http://localhost:3000/revenue");
    const data = await response.json();
    setRevenue(data);
  };

  const fetchIssues = async () => {
    const response = await fetch("http://localhost:3000/issues");
    const data = await response.json();
    setIssues(data);
  };

  const fetchVacationNotices = async () => {
    const response = await fetch("http://localhost:3000/vacation-notices");
    const data = await response.json();
    setVacationNotices(data);
  };

  return (
    <div className="container-fluid">
      {/* Sidebar */}
      <div className="row">
        <nav className="col-md-2 d-md-block bg-light sidebar">
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "dashboard" ? "active" : ""}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "cabin-layout" ? "active" : ""}`}
                  onClick={() => setActiveTab("cabin-layout")}
                >
                  Cabin Layout
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "tier-management" ? "active" : ""}`}
                  onClick={() => setActiveTab("tier-management")}
                >
                  Tier Management
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "vacation-notices" ? "active" : ""}`}
                  onClick={() => setActiveTab("vacation-notices")}
                >
                  Vacation Notices
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link btn btn-link ${activeTab === "issues" ? "active" : ""}`}
                  onClick={() => setActiveTab("issues")}
                >
                  Issues Reported
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {activeTab === "dashboard" && (
            <div>
              {/* Dashboard Cards */}
              <div className="row my-4">
                <div className="col-md-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Total Cabins</h5>
                      <p className="card-text display-4">{cabins.length}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Occupied Cabins</h5>
                      <p className="card-text display-4">{cabins.filter((c) => c.status === "occupied").length}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Pending Payments</h5>
                      <p className="card-text display-4">{payments.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card text-center">
                    <div className="card-body">
                      <h5 className="card-title">Monthly Revenue</h5>
                      <p className="card-text display-4">
                        ₹{revenue.reduce((sum, r) => sum + r.revenue, 0)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "issues" && (
            <div>
              <h3>Issues Reported</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Issue</th>
                    <th>Cabin Number</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((issue, index) => (
                    <tr key={index}>
                      <td>{issue.issue}</td>
                      <td>{issue.cabinNumber}</td>
                      <td>
                        <span
                          className={`badge ${
                            issue.status === "resolved"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {issue.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "vacation-notices" && (
            <div>
              <h3>Vacation Notices</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Cabin Number</th>
                    <th>Vacation Date</th>
                  </tr>
                </thead>
                <tbody>
                  {vacationNotices.map((notice, index) => (
                    <tr key={index}>
                      <td>{notice.userName}</td>
                      <td>{notice.cabinNumber}</td>
                      <td>{notice.vacationDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
