import React, { useState } from "react";
import "../../styles/Login.css";
import logo from "../../assets/images/Asset 41@300x-8.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleLogin = async () => {
    if (!mobileNumber) {
      setErrorMessage("Please enter mobile number");
      return;
    }
    setLoading(true);
    setErrorMessage("");
     try {
      console.log("Login API called with mobile:", mobileNumber);
      const clientId = localStorage.getItem("clientId");
      console.log("clientId in handleLogin", clientId);
      if (!clientId) {
        setErrorMessage("Client ID not found. Please register first.");
        setLoading(false);
        return;
      }
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/login/send-otp`,
        {
          identifier: mobileNumber,
          channel: "MOBILE",
          clientId
        }
      );
      console.log("Login response:", response?.data);

      if (response.data?.success) {

        const token = response?.data?.token;
        console.log("Received token:", token);
        navigate("/loginOtp", { state: { token, mobileNumber } });
      } else {
        setErrorMessage(response.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Login API error:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />
        <h2 className="login-title">Login to Flowpipe</h2>

        <label className="login-label">Mobile Number</label>
        <input
          type="text"
          className="login-input"
          placeholder="Enter your mobile number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button className="login-btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? "Sending OTP..." : "Get OTP"}
        </button>
      </div>
    </div>
  );
};

export default Login;
