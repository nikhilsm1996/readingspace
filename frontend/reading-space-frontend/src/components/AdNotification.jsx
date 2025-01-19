import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

const AdminNotification = () => {
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [notificationType, setNotificationType] = useState("all"); // 'all' or 'specific'
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [notifications, setNotifications] = useState([]); // Notifications state

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    const token = localStorage.getItem("authToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/notification/admin", requestOptions);
      const result = await response.json();
      if (response.ok) {
        setNotifications(result.notifications);
      } else {
        throw new Error(result.message || "Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Handle sending notifications
  const handleSendNotification = async () => {
    if (!message) {
      setAlert({ show: true, message: "Please enter a message.", type: "danger" });
      return;
    }

    if (notificationType === "specific" && !userId) {
      setAlert({ show: true, message: "Please enter a user ID.", type: "danger" });
      return;
    }

    const token = localStorage.getItem("authToken");
    const url =
      notificationType === "all"
        ? "http://localhost:3000/notification/send"
        : `http://localhost:3000/notification/send/${userId}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const result = await response.json();

      if (response.ok) {
        setAlert({ show: true, message: result.message, type: "success" });
        setMessage("");
        setUserId("");
        fetchNotifications(); // Refresh notifications after sending
      } else {
        setAlert({ show: true, message: result.message || "Failed to send notification.", type: "danger" });
      }
    } catch (error) {
      setAlert({ show: true, message: "An error occurred. Please try again.", type: "danger",error:error });
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Send Notification</h3>

              {alert.show && (
                <div className={`alert alert-${alert.type}`} role="alert">
                  {alert.message}
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="notificationType" className="form-label">
                  Send To:
                </label>
                <select
                  id="notificationType"
                  className="form-select"
                  value={notificationType}
                  onChange={(e) => setNotificationType(e.target.value)}
                >
                  <option value="all">All Users</option>
                  <option value="specific">Specific User</option>
                </select>
              </div>

              {notificationType === "specific" && (
                <div className="mb-3">
                  <label htmlFor="userId" className="form-label">
                    User ID:
                  </label>
                  <input
                    type="text"
                    id="userId"
                    className="form-control"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message:
                </label>
                <textarea
                  id="message"
                  className="form-control"
                  placeholder="Enter notification message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="4"
                />
              </div>

              <button className="btn btn-primary w-100 mb-4" onClick={handleSendNotification}>
                Send Notification
              </button>

              {/* Notification History Table */}
              <h4 className="text-center mb-3">Notification History</h4>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Message</th>
                    <th>User</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notification, index) => (
                    <tr key={notification._id}>
                      <td>{index + 1}</td>
                      <td>{notification.message}</td>
                      <td>{notification.user?.name || "All Users"}</td>
                      <td>{new Date(notification.createdAt).toLocaleString()}</td>
                      <td>
                        <span className={`badge ${notification.read ? "bg-success" : "bg-warning"}`}>
                          {notification.read ? "Read" : "Unread"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;