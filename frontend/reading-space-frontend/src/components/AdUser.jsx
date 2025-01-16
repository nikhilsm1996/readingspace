import { useEffect, useState } from "react";

const AdUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users data from the server
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("User not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch("http://localhost:3000/users", requestOptions);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        // Filter out admin users
        const nonAdminUsers = data.filter((user) => user.role !== "admin");
        console.log("data", data);
        
        setUsers(nonAdminUsers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Users Details</h1>
      {/* Scrollable table container */}
      <div
        className="table-container"
        style={{
          maxHeight: "400px",
          overflowY: "scroll",
          overflowX: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Seat Number</th>
              <th>Status</th>
              <th>Tier</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const seat = user.seat || {}; // Destructure seat from user object
                return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{seat.seatNumber ? seat.seatNumber : "Not Booked"}</td>
                  <td>{seat.status ? seat.status : "Not Booked"}</td>
                  <td>{seat.tier && seat.tier.name ? seat.tier.name : "Not Booked"}</td>
                </tr>
                );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdUser;
