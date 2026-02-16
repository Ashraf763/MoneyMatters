import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URI;

const Register = () => {
  const [newpassword, setNewPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("money_matters");
    if (token !== undefined) {
      navigate("/");
    }
  });

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== newpassword) {
      setError("Passwords do not match");
      return;
    } else if (
      password === username ||
      password.toLocaleLowerCase() === username.toLowerCase()
    ) {
      setError("Username and Password should not match");
      return;
    }

    try {
      const userDetails = { username, password };
      const response = await axios.post(`${API_URL}/register`, userDetails);

      console.log(response);
      alert("User Created Successfully, Now Login");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };
  return (
    <div className="main-login">
      <div className="login-container">
        <h2>Register</h2>
        <form
          className="login-form"
          onSubmit={handleRegistration}
          id="registration"
        >
          <div className="input-container">
            <input
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              required
              autoComplete="off"
            />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              placeholder="Password"
            />
            <input
              type="password"
              id="newpassword"
              placeholder="Re-type New Password"
              autoComplete="off"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newpassword}
              className="user-input"
            />
          </div>

          {error && <p className="error-msg">*{error}</p>}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Register
          </button>
        </form>

        <p className="have-an-account">
          Already have an account?
          <Link to="/login" className="link text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
