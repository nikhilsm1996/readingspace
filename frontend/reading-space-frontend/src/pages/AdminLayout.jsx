import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // Handle logout
  const handleLogout = () => {
    // Add any logout logic here (e.g., clearing tokens)
    localStorage.removeItem("authToken");
    navigate("/login");
  };

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

  // Display notifications using Toastify
  const displayNotifications = () => {
    notifications.forEach((notification) => {
      if (!notification.read) {
        toast.info(notification.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });
  };

  // Mark notifications as read
  const markNotificationsAsRead = async () => {
    const token = localStorage.getItem("authToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://localhost:3000/notification/mark-as-read", requestOptions);
      const result = await response.json();
      if (response.ok) {
        console.log("Notifications marked as read:", result);
        fetchNotifications(); // Refresh notifications
      } else {
        throw new Error(result.message || "Failed to mark notifications as read");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: isCollapsed ? "80px" : "250px",
          width: isCollapsed ? "calc(100% - 80px)" : "calc(100% - 250px)",
          minHeight: "100vh",
          padding: "20px",
          marginTop: "0",
          overflowY: "auto",
        }}
      >
        {/* Notification Bell Icon */}
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-light btn-sm position-relative"
            onClick={() => {
              displayNotifications();
              markNotificationsAsRead();
            }}
            style={{
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              padding: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bell size={20} />
            {notifications.filter((n) => !n.read).length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.75rem" }}
              >
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </button>
        </div>

        {/* Outlet for nested routes */}
        <Outlet />

        {/* Toastify Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminLayout;