import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
console.log("before header");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      password: password,
      confirmPassword: confirmPassword,
      role: "user",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
console.log("before try catchy");

    try {
      const response = await fetch("http://localhost:3000/users", requestOptions);
      const result = await response.json();


    console.log("response",response);
    

      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(result.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
console.log("response2");

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f3f4f6, #e3e8ec)",
      }}
    >
      <div className="row w-100 mx-0">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            className="card shadow-lg p-4"
            style={{ maxWidth: "400px", width: "100%", opacity: 0.95 }}
          >
            <div className="text-center mb-4">
              <img
                src="public/RS-Logo.png"
                alt="Reading Space Logo"
                className="img-fluid mb-3"
                style={{ maxWidth: "80px" }}
              />
              <h3 className="text-primary">Create an Account</h3>
            </div>
            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center mb-3">
                <a href="/login" className="text-decoration-none text-primary">
                  Already have an account? Login
                </a>
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Signup
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6 d-none d-md-flex justify-content-center align-items-center">
          <img
            src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Signup Illustration"
            className="img-fluid"
            style={{ maxWidth: "80%", borderRadius: "10px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
