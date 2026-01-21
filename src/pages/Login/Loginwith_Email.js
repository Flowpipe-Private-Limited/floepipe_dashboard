import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp } from "../../utils/Apis/api";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import Background_Login from "../../components/ui/Background_Folder/Background_Login";

const Loginwith_Email = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const HandleFromChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = async () => {
    if (!validateForm()) return;

    setErrorMessage("");
    setLoading(true);

    await ApirequestHandler(
      async () => HandleGetOtp(formData),
      setLoading,
      (res) => {
        console.log("Login Success:", res);
      },
      (errMessage) => {
        setErrorMessage(errMessage);
      },
    );
  };

  const handleForgetPassword = () => {
    navigate("/Forget_Password"); // change route if needed
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="Image-bg-conatiner">
            <img src={Images.LoginLogoImg} alt="logo" className="login-logo" />
          </div>

          <h2 className="login-title">Login to flowpipe</h2>
          <div className="input-email-password">
            {/* Email */}
            <div>
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={HandleFromChange}
                  placeholder=" "
                  className="peer block w-full px-4 py-2 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
                focus:outline-none focus:ring-1 focus:ring-[#424D64]"
                />
                <label className="floating-label">Email</label>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative w-full mb-1">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={HandleFromChange}
                  placeholder=" "
                  className="peer block w-full px-4 py-2 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
                focus:outline-none focus:ring-1 focus:ring-[#424D64]"
                />
                <label className="floating-label">Password</label>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </div>
          {/* Forget Password */}
          <div className="flex justify-end mb-3">
            <span
              className="resend-link-password cursor-pointer"
              onClick={handleForgetPassword}
            >
              Forget Password
            </span>
          </div>

          {errorMessage && (
            <p className="text-red-400 text-xs mb-2">{errorMessage}</p>
          )}
          <Purple_Button
            textonchange={"Confirm"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Please wait..." : "Confirm"}
          </Purple_Button>

          <br />
          <br />
          <br />
          <div>
            <button
              className="back-button-bg-register"
              onClick={() => navigate(-1)}
            >
              <IoChevronBackOutline />
            </button>
          </div>
        </div>
      </div>
       <div className="desktop-background">
          <Background_Login />
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

export default Loginwith_Email;
