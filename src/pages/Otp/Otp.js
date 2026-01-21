import React, { useState, useRef, useEffect } from "react";
import "../../styles/Otp.css";
import Images from "../../Images/Images";
import { IoChevronBackOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import axios from "axios";
import Cookies from 'js-cookie'
import Background_Login from "../../components/ui/Background_Folder/Background_Login";

const OtpScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Changed to 4 elements for 4-digit OTP
  const [otpError, setOtpError] = useState("");
  const [inputStates, setInputStates] = useState(["", "", "", ""]); // Track border colors for each input (4 elements)
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const token = location.state?.token;
  const mobileNumber = location.state?.mobileNumber;
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;

  if (!token || !mobileNumber) {
    console.warn("Token or mobile number missing, redirecting to login");
    navigate("/login");
  }

  // Function to update border colors
  const updateInputState = (index, state) => {
    const newStates = [...inputStates];
    newStates[index] = state;
    setInputStates(newStates);
  };

  const handleInput = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (otpError) setOtpError("");

    // Set border color while typing (active/focus state)
    updateInputState(index, "typing");

    // Move to next input (3 because index 0-3, last index is 3)
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    // If backspace pressed, move to previous input
    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleFocus = (index) => {
    // Set typing color when input is focused
    if (!otpError) {
      updateInputState(index, "typing");
    }
  };

  const handleBlur = (index) => {
    // Only reset if there's no error and no value
    if (!otpError && !otp[index]) {
      updateInputState(index, "");
    }
  };

  // const handleSubmit = async () => {
  //   const finalOtp = otp.join("");

  //   if (finalOtp.length !== 4) {
  //     // Changed to 4
  //     setOtpError("Sorry! OTP is invalid, Please try again.");
  //     // Set all inputs to error state
  //     const newStates = ["error", "error", "error", "error"]; // 4 elements
  //     setInputStates(newStates);
  //     return;
  //   }

  //   // 🔴 Example incorrect OTP check (replace with API)
  //   if (finalOtp !== "1234") {
  //     // Changed to 4-digit check
  //     setOtpError("Sorry! OTP is invalid, Please try again.");
  //     // Set all inputs to error state
  //     const newStates = ["error", "error", "error", "error"]; // 4 elements
  //     setInputStates(newStates);
  //     return;
  //   }

  //   // If OTP is correct
  //   setOtpError("");
  //   const newStates = ["correct", "correct", "correct", "correct"]; // 4 elements
  //   setInputStates(newStates);

  //   console.log("Submitted OTP:", finalOtp);
  //   // navigation.navigate("Maindashboard");
  // };

  // Reset input states when OTP error is cleared
  const handleSubmit = async () => {
    const finalOtp = otp.join("");
    if (!finalOtp || finalOtp.length < 4) {
      setErrorMessage("Please enter complete OTP");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      console.log("Verifying OTP in registerotp:", finalOtp, "with token:", token);
      const response = await axios.post(
        `${BASE_URL}/api/v1/client/login/verify-otp`,
        { token, otp: finalOtp, "channel": "MOBILE" }
      );
      console.log("OTP verification response:", response?.data);

      if (response?.data?.success === true) {
        Cookies.set('token', token);

        navigate("/dashboard");
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

  useEffect(() => {
    if (!otpError && otp.join("").length === 4) {
      // Changed to 4
      const newStates = ["correct", "correct", "correct", "correct"]; // 4 elements
      setInputStates(newStates);
    }
  }, [otpError, otp]);

  // Get border color class based on state
  const getBorderColorClass = (index) => {
    const state = inputStates[index];
    if (state === "correct") return "correct-border";
    if (state === "error") return "error-border";
    if (state === "typing") return "typing-border";
    return "";
  };

  return (
    <div>
      <div className="otp-bg">
        <div className="otp-card">
          <div className="Image-bg-conatiner">
            <img src={Images.LoginLogoImg} alt="logo" className="login-logo" />
          </div>

          <h2 className="text-center text-white text-l font-Medium mb-6">
            Sign in to flowpipe
          </h2>

          <div>
            <p className="text-gray-300 text-sm mb-3">Enter the OTP</p>
            <div className="flex justify-center gap-5 mb-3">
              {otp.map(
                (
                  value,
                  index, // This will now render exactly 4 inputs
                ) => (
                  <input
                    key={index}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    value={value}
                    maxLength={1}
                    onChange={(e) => handleInput(e.target.value, index)}
                    onFocus={() => handleFocus(index)}
                    onBlur={() => handleBlur(index)}
                    className={`otp-input-box ${getBorderColorClass(index)}`}
                  />
                ),
              )}
            </div>
          </div>

          <div className="flex justify-end mb-3">
            <div className="flex-1">
              {otpError && <p className="otp-error-text">{otpError}</p>}
            </div>
            <span className="resend-link">Resend OTP</span>
          </div>
          <Purple_Button textonchange={"Submit"} onClick={handleSubmit} />
          <br />
          <br />
          <br />
          <div>
            <button className="back-button-bg-register">
              <IoChevronBackOutline />
            </button>
          </div>
        </div>
      </div>
      <Background_Login/>
      <div className="Video-class">
        <video
          src={Images.loadernew2}
          autoPlay
          loop
          muted
          playsInline
          className="loader-video"
        />
      </div>
    </div>
  );
};

export default OtpScreen;
