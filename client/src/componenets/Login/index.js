import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "./style.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URI;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const userDetails = { username, password };

    try {
      const response = await axios.post(`${API_URL}/login`, userDetails);
      const token = response.data?.token;
      Cookies.set("money_matters", token, { expires: 2 });

      setError("");
      navigate("/");
    } catch (err) {
      setError(err.response?.data || "failed to Login");
    }
  };

  return (
    <div className="main-login">
      <div className="login-container">
        <h2>Login</h2>

        <form className="login-form" onSubmit={handleLogin} id="login">
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              type={showPassword ? "text" : "password"}
              autoComplete="off"
            />
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="showPassword"
              onClick={(e) => setShowPassword(e.target.checked)}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>

          {error && <p className="error-msg">*{error}</p>}

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>
        </form>

        <p className="have-an-account">
          Don't have an account?
          <Link to="/register" className="link text-primary">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
