import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

function Forgotpassword() {
  const navigate = useNavigate(); // Get the navigate function

  const handleResetPassword = () => {
    // Navigate to the 404 page when the button is clicked
    navigate("/404");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img
            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7631/password_reset.png"
            alt="Lock Illustration"
            style={styles.image}
          />
        </div>
        <h1 style={styles.title}>Forgot Your Password?</h1>
        <p style={styles.text}>
        If you didn't request to change your brand password, you don't have to do anything. So that's easy.

        </p>
        <div style={styles.buttonContainer}>
          <button style={styles.button} onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f7f7f7",
    margin: 0,
    padding: 0,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "30px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxSizing: "border-box",
  },
  imageContainer: {
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    maxWidth: "300px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "10px",
  },
  text: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center", // This centers the button
    width: "100%",
  },
  button: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "500px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    width: "200px", // Set width as desired
  },
};

export default Forgotpassword;
