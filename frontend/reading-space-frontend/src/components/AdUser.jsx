import  { useEffect, useState } from 'react';

const AdUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data using Fetch API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      <h1 className="text-center mb-4">Admin Dashboard</h1>
      {/* Scrollable table container */}
      <div
        className="table-container"
        style={{
          maxHeight: '400px', // Set a fixed height for the table container
          overflowY: 'scroll', // Enable vertical scrolling
          overflowX: 'auto',  // Enable horizontal scrolling if needed
          border: '1px solid #ccc', // Optional: Add a border for aesthetics
          padding: '10px', // Optional: Add padding inside the scrollable area
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
              const seat = user.seat || {}; // If seat is null, fallback to an empty object
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>{seat.seatNumber || 'Not Booked'}</td>
                  <td>{seat.status || 'Not Booked'}</td>
                  <td>{seat.tier || 'Not Booked'}</td>
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
