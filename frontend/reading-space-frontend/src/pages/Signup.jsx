import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

let Signup = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", userData);
  };

  const goToLogin = () => {
    navigate("/login"); 
  };

  return (
    <>
      <h1>Create an Account</h1>
      <p>Please fill in your details to register</p>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={userData.fullName}
          onChange={handleInputChange}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={userData.email}
          onChange={handleInputChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={userData.password}
          onChange={handleInputChange}
        />


        <br/>
        <label>Confirm Password</label>
        <input
          type="confirmpassword"
          name="confirmpassword"
          placeholder="Enter your password"
          value={userData.password}
          onChange={handleInputChange}
        />

        




        <br />
        <br/>
        <button onClick={handleSubmit}>Create Account</button>
        <div>
  <p>
    Already have an account?{" "}
    <span onClick={goToLogin} style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}>
      Sign in here
    </span>
  </p>
</div>
       
      </div>
    </>
  );
};

export default Signup;
