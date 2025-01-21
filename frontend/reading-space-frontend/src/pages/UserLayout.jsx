import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserSidebar from "../components/UserSidebar";

const UserLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state
  const [notifications, setNotifications] = useState([]); // Notifications state
  const navigate = useNavigate(); // Navigation object

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsCollapsed((prevState) => !prevState);
  };

  // Handle logout
  const handleLogout = () => {
    // Clear user session
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
      const response = await fetch("http://localhost:3000/notification/self", requestOptions);
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
      <UserSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {/* Main Content */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: isCollapsed ? "90px" : "260px",
          width: isCollapsed ? "calc(100% - 90px)" : "calc(100% - 260px)",
          minHeight: "100vh",
        }}
      >
        {/* Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
          style={{
            padding: "10px 20px",
            position: "sticky",
            top: 0,
            zIndex: 1020,
          }}
        >
          <div className="container-fluid">
            <span className="navbar-brand fw-bold">Dashboard</span>
            <div className="d-flex align-items-center">
              {/* Notification Bell Icon */}
              <button
                className="btn btn-light btn-sm position-relative me-3"
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

              {/* Logout Button */}
              <button
                className="btn btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content Outlet */}
        <div className="p-4">
          <Outlet />
        </div>

        {/* Toastify Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default UserLayout;