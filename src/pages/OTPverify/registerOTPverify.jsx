import { useRef, useState } from "react";
import logo from "../../assets/images/Asset 41@300x-8.png"
import { VerifyOTP } from "../../utils/Apis/api";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function OtpLogin() {

  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [error, setError] = useState(false);
  const navigate = useNavigate()
  const inputRefs = useRef([]);
  const location = useLocation();
  const formData = location.state;

  const token = location.state?.token;
  const mobileNumber = location.state?.mobileNumber;
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

  const CORRECT_OTP = "123456";

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(false);

    if (index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
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

  // const handleSubmit = async () => {
  //   const fullOtp = otp.join("")
  //   setErrorMessage("");
  //   setLoading(true);
  //   await ApirequestHandler(
  //     async () => VerifyOTP({submittedOtp:fullOtp,mobileNumber:formData?.mobileNumber}),
  //     setLoading,
  //     (res) => { 
  //       const { token, message,success } = res;
  //       console.log('OTP Response:',res, message);
  //       if(success){
  //         Cookies.set('token',token);
  //         navigate('/dashboard');
  //       }
  //     },
  //     (errMessage) => {
  //       console.log('Error:', errMessage);
  //       setErrorMessage(errMessage);
  //     }
  //   )
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0f] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gray-800 bg-[#111] p-6 shadow-xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-xl flex items-center justify-center">
            {/* <div className="h-8 w-8 rounded-full bg-lime-400"></div> */}
            <img src={logo} alt="logo" className="login-logo" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-semibold text-white mb-6">
          Sign in to flowpipe
        </h2>

        {/* OTP Label */}
        <p className="text-sm text-gray-300 mb-3">Enter the OTP</p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-2">
          {otp.map((value, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={value}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={`h-12 w-12 rounded-lg border text-center text-lg text-white outline-none bg-transparent 
                ${error ? "border-red-500" : "border-gray-700 focus:border-purple-500"}`}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center mb-3">
            Wrong OTP. Please try again.
          </p>
        )}

        <div className="flex justify-end mb-6">
          <button className="text-sm text-purple-500 hover:underline">
            Resend OTP
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-purple-600 py-3 font-semibold text-white hover:bg-purple-700 transition"
        >
          Submit
        </button>

        <div className="mt-6 flex items-center">
          <button className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white">
            ←
          </button>
        </div>
      </div>
    </div>
  );
}
