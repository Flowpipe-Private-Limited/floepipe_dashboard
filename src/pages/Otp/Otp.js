import React, { useState, useRef } from "react";
import "../../styles/Otp.css";
import logo from "../../assets/images/Asset 41@300x-8.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const token = location.state?.token;
  const mobileNumber = location.state?.mobileNumber;
     const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  if (!token || !mobileNumber) {
    console.warn("Token or mobile number missing, redirecting to login");
    navigate("/login");
  }

  const handleInput = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (!finalOtp || finalOtp.length < 4) {
      setErrorMessage("Please enter complete OTP");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      console.log("Verifying OTP:", finalOtp, "with token:", token);
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/login/verify-otp`,
        { token, otp: finalOtp }
      );
      console.log("OTP verification response:", response.data);

      if (response.data?.success) {
        navigate("/Maindashboard");
      } else {
        setErrorMessage(response.data?.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verify API error:", error.response || error);
      setErrorMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-bg">
      <div className="otp-card">
        <div className="otp-logo">
          <img src={logo} alt="logo" />
        </div>

        <h2 className="text-center text-white text-xl font-semibold mb-6">
          Verify OTP
        </h2>

        <div className="flex gap-3 mb-3">
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              value={value}
              maxLength={1}
              onChange={(e) => handleInput(e.target.value, index)}
              className="otp-input-box"
            />
          ))}
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button className="otp-submit-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? "Verifying..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default OtpScreen;
