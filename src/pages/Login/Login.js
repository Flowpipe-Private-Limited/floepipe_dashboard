import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp, SendOTP } from "../../utils/Apis/api";
import { CiMail } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import Background_Login from "../../components/ui/Background_Folder/Background_Login";
import axios from "axios";
import Cookies from 'js-cookie';

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const HandleFromChange = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;

    // Only update if the value is a number or empty
    if (formValue === "" || /^\d+$/.test(formValue)) {
      setFormData({ ...formData, [formName]: formValue });
    }
    // Optionally: prevent default behavior to block non-numeric input
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
  };

  const handleNavigateEmail = () => {
    navigate("/Loginwith_Email");
  };

  const handleNavigateRegisterForm = () => {
    navigate("/Register_Form");
  };

  const GetOtp = async () => {
    if (!formData?.mobileNumber) {
      setErrorMessage("Please enter mobile number");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    const dataToSend = {
      identifier: formData?.mobileNumber,
      channel: "MOBILE",
      // clientId
      module: 'API_MODULE'
    }
    await ApirequestHandler(
      async () => await SendOTP(dataToSend),
      setLoading,
      (resdata) => {
        const { success, accessToken, message } = resdata;
        console.log('Response Data', resdata)
        if (success) {
          console.log('Received token:', accessToken);
          navigate("/otpVerify", { state: { token: accessToken, mobileNumber: formData?.mobileNumber } })
        } else {
          setErrorMessage(message || "Login failed");
        }
        setLoading(false)
      },
      (errMessage) => {
        console.log('LoginError:', errMessage);
        setLoading(false)
      }
    )
  };

  return (
    <>
      {/* <Background_Login> */}
      <div className="login-container">
        <div className="login-card">
          <div className="Image-bg-conatiner">
            <img src={Images.LoginLogoImg} alt="logo" className="login-logo" />
          </div>
          <h2 className="login-title">Sign in to flowpipe</h2>
          <div className="relative w-full mb-6">
            <input
              type="tel"
              name="mobileNumber"
              maxLength={10}
              placeholder=" "
              // onChange={(e) => HandleFromChange(e)}
              onChange={HandleFromChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  GetOtp();
                }
              }}
              // onKeyPress={(e) => {
              //   // Prevent non-numeric key presses
              //   if (!/[0-9]/.test(e.key)) {
              //     e.preventDefault();
              //   }
              // }}
              pattern="[0-9]*"
              className="peer block w-full px-4 py-3 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
               focus:outline-none focus:ring-1 focus:ring-[#424D64]"
            />
            <label
              htmlFor="mobileNumber"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base transition-all duration-200
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[0.8rem]
               peer-focus:top-0 peer-focus:-translate-y--10 peer-focus:text-[#424D64] peer-focus:text-sm peer-valid:bg-[#181818]"
            >
              Mobile Number
            </label>
          </div>
          <Purple_Button textonchange={"Proceed"} onClick={() => GetOtp()} />
          <div className="login-divider">
            <div className="login-divider-line"></div>
            <span className="login-divider-text">OR</span>
            <div className="login-divider-line2"></div>
          </div>

          <div className="Login-two-buttons">
            <button className="login-btn-google">
              <span
                style={{ fontWeight: "700", fontSize: "22px" }}
                className="text-lg"
              >
                <FaGoogle />
              </span>{" "}
              Continue with Google
            </button>

            <button onClick={handleNavigateEmail} className="login-btn-google">
              <span
                style={{ fontWeight: "700", fontSize: "25px" }}
                className="text-lg"
              >
                <CiMail />
              </span>{" "}
              Login with Email & Password
            </button>
          </div>
          <p className="login-footer">
            Don’t have an account?{" "}
            <span
              onClick={handleNavigateRegisterForm}
              className="login-footer-link"
            >
              Sign up
            </span>
          </p>
        </div>
        <div className="desktop-background">
          <Background_Login />
        </div>
      </div>

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
    </>
  );
};
export default Login;
