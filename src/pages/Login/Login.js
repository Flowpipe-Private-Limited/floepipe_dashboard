import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp } from "../../utils/Apis/api";
import { CiMail } from "react-icons/ci";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});
   const navigate = useNavigate();


  const HandleFromChange = (e) => {
    const formName = e.target.name;
    const formValue = e.target.value;
    setFormData({ ...formData, [formName]: formValue });
  };

 const handleNavigateEmail = () => {
    navigate("/Loginwith_Email");
  };

  const handleNavigateRegisterForm=()=>{
    navigate("/Register_Form");

  }

  const GetOtp = async () => {
    setErrorMessage("");
    setLoading(true);
    await ApirequestHandler(
      async () => HandleGetOtp(formData),
      setLoading,
      (res) => {
        const { data, message } = res;
        if (message === "OTP sent to 8688571181") {
        }
        console.log("OTP Response:", message);
      },
      (errMessage) => {
        console.log("Error:", errMessage);
        setErrorMessage(errMessage);
      }
    );
  };

  return (
    <>
      <div>
        <img
          src={Images.FlowLoginImage}
          alt="Flow Login"
          className="login-background-image"
        />
        <div className="lighting-lines">
          <div className="hrlines-img">
            <div className="login-divider-lineAn"></div>
            <div className="login-divider-lineAn"></div>
            <div className="login-divider-lineAn"></div>
          </div>

          <div className="hrlines-img2">
            <div className="login-divider-lineAn2"></div>
            <div className="login-divider-lineAn2"></div>
            <div className="login-divider-lineAn2"></div>
          </div>

          <div className="hrlines-img3">
            <div className="login-divider-lineAn3"></div>
            <div className="login-divider-lineAn3"></div>
            <div className="login-divider-lineAn3"></div>
          </div>

          <div className="hrlines-img4">
            <div className="login-divider-lineAn4"></div>
            <div className="login-divider-lineAn4"></div>
            <div className="login-divider-lineAn4"></div>
          </div>
        </div>
        <div className="login-container">
          <div className="login-card">
            <div className="Image-bg-conatiner">
              <img
                src={Images.LoginLogoImg}
                alt="logo"
                className="login-logo"
              />
            </div>
            <h2 className="login-title">Sign in to flowpipe</h2>
            <div className="relative w-full mb-6">
              <input
                 type="tel"
                name="mobileNumber"
                maxLength={10}
                placeholder=" "
                onChange={(e) => HandleFromChange(e)}
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

            <button className="login-btn-primary" onClick={() => GetOtp()}>
              Proceed
            </button>

            <div className="login-divider">
              <div className="login-divider-line"></div>
              <span className="login-divider-text">OR</span>
              <div className="login-divider-line2"></div>
            </div>

            <div className="Login-two-buttons">
              <button className="login-btn-google">
                <span
                  style={{ fontWeight: "700", fontSize: "24px" }}
                  className="text-lg"
                >
                  <FaGoogle />
                </span>{" "}
                Continue with Google
              </button>

              <button onClick={handleNavigateEmail} className="login-btn-google">
                <span
                  style={{ fontWeight: "700", fontSize: "27px" }}
                  className="text-lg"
                >
                  <CiMail />
                </span>{" "}
                Login with Email & Password
              </button>
            </div>
            <p className="login-footer">
              Don’t have an account?{" "}
              <span onClick={handleNavigateRegisterForm} className="login-footer-link">Sign up</span>
            </p>
          </div>

          {/* <div className="Video-class">
           <video
            src={Images.loadernew}
            autoPlay
            loop
            muted
            playsInline
            className="loader-video"
          />
        </div> */}

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
      </div>
    </>
  );
};
export default Login;
