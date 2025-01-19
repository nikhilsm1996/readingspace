import { useState, useEffect } from "react";

const IssueManagement = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all issues
  const fetchIssues = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      const response = await fetch("http://localhost:3000/issue/", requestOptions);
      const result = await response.json();

      if (response.ok) {
        setIssues(result.issues);
      } else {
        throw new Error(result.message || "Failed to fetch issues");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Resolve an issue
  const resolveIssue = async (issueId) => {
    try {
      const token = localStorage.getItem("authToken");
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${token}`);

      const raw = JSON.stringify({
        resolved: true,
      });

      const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(`http://localhost:3000/issue/${issueId}`, requestOptions);
      const result = await response.json();

      if (response.ok) {
        // Update the issue list after resolving
        fetchIssues();
      } else {
        throw new Error(result.message || "Failed to resolve issue");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading issues...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-5">Error: {error}</div>;
  }

  return (
    <section id="issue-management" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold text-dark mb-5" style={{ fontFamily:  "'Open Sans', sans-serif"}}>
          Issue Management
        </h2>
        <div className="row">
          {issues.length === 0 ? (
            <div className="col-12 text-center">
              <p className="text-dark">No issues found.</p>
            </div>
          ) : (
            issues.map((issue) => (
              <div key={issue.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark" style={{ fontFamily:  "'Open Sans', sans-serif" }}>
                      {issue.title}
                    </h5>
                    <p className="card-text text-dark" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      <strong>Seat Number:</strong> {issue.seatNumber}
                    </p>
                    <p className="card-text text-dark" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      <strong>Description:</strong> {issue.description}
                    </p>
                    <p className="card-text text-dark">
                      <strong>Status:</strong>{" "}
                      <span className={`badge ${issue.resolved ? "bg-success" : "bg-warning"}`}>
                        {issue.resolved ? "Resolved" : "Pending"}
                      </span>
                    </p>
                    <p className="card-text text-dark" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                      <strong>Created At:</strong> {new Date(issue.createdAt).toLocaleString()}
                    </p>
                    {!issue.resolved && (
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => resolveIssue(issue.id)}
                      >
                        Mark as Resolved
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default IssueManagement;