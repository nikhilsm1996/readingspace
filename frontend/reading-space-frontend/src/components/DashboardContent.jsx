const DashboardContent = ({ currentView }) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', role: 'User' },
  ];

  switch (currentView) {
    case 'dashboard':
      return (
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100">
              <div className="card-body">
                <h3 className="card-title mb-4">Quick Stats</h3>
                <div className="d-grid gap-3">
                  <div className="p-3 bg-primary bg-opacity-10 rounded">
                    <p className="text-primary mb-1">Total Users</p>
                    <p className="h4 fw-bold">123</p>
                  </div>
                  <div className="p-3 bg-success bg-opacity-10 rounded">
                    <p className="text-success mb-1">Active Bookings</p>
                    <p className="h4 fw-bold">15</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'users':
      return (
        <div className="card">
          <div className="card-body">
            <h3 className="card-title mb-4">Manage Users</h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">Edit</button>
                        <button className="btn btn-sm btn-danger">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );

    default:
      return <div>Select a view from the sidebar.</div>;
  }
};

export default DashboardContent;
