import React, { useState } from "react";
import "../../styles/Login.css";
import logo from "../../assets/images/Asset 41@300x-8.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    const { name, email, mobileNumber } = formData;

    if (!name || !email || !mobileNumber) {
      setErrorMessage("Please fill all fields");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      console.log("Register API called with:", formData);
      const response = await axios.post(`${BASE_URL}/api/v1/client/register`, {
        fullName: name,
        email: email,
        mobile: mobileNumber,
        module: "API_MODULE",
      });
      console.log("Register response:", response?.data);
      if (response.data?.success) {
        const clientId = response?.data?.clientId;
        console.log("clientId in handleregister", clientId);
        if (clientId) {
          localStorage.setItem("clientId", clientId);
          console.log("Client ID stored in localStorage:", clientId);
        }
        navigate("/login");
      } else {
        setErrorMessage(response.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Register API error:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <img src={logo} alt="logo" className="login-logo" />
        <h2 className="login-title">Register to Flowpipe</h2>

        <label className="login-label">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="login-input"
          onChange={handleChange}
        />

        <label className="login-label">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="login-input"
          onChange={handleChange}
        />

        <label className="login-label">Mobile Number</label>
        <input
          type="text"
          name="mobileNumber"
          placeholder="Enter your mobile number"
          className="login-input"
          onChange={handleChange}
        />

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <Purple_Button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Purple_Button>
      </div>
    </div>
  );
};

export default RegisterPage;
