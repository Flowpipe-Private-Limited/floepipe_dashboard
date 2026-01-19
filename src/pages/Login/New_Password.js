import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp } from "../../utils/Apis/api";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const New_Password = () => {
  const navigate = useNavigate();
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const HandleFromChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      }
    );
  };

  const handleForgetPassword = () => {
    navigate("/forgot-password"); // change route if needed
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

            <h2 className="login-title">Trouble in logging In</h2>
            <div className="input-email-password">
              {/* New Password */}
              <div>
            <div className="relative w-full mb-1">
  <input
    type={showNewPassword ? "text" : "password"}
    name="newPassword"
    value={formData.newPassword}
    onChange={HandleFromChange}
    placeholder=" "
    className="peer block w-full px-4 py-2 pr-10 rounded-lg bg-zinc-900
    border border-[#424D64] text-white placeholder-transparent
    focus:outline-none focus:ring-1 focus:ring-[#424D64]"
  />
  <label className="floating-label">New Password</label>

  <span
    className="password-eye-icon"
    onClick={() => setShowNewPassword(!showNewPassword)}
  >
    {showNewPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
  </span>
</div>

                {errors.newPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
               <div className="relative w-full mb-1">
  <input
    type={showConfirmPassword ? "text" : "password"}
    name="confirmPassword"
    value={formData.confirmPassword}
    onChange={HandleFromChange}
    placeholder=" "
    className="peer block w-full px-4 py-2 pr-10 rounded-lg bg-zinc-900
    border border-[#424D64] text-white placeholder-transparent
    focus:outline-none focus:ring-1 focus:ring-[#424D64]"
  />
  <label className="floating-label">Confirm Password</label>

  <span
    className="password-eye-icon"
    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
  >
    {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
  </span>
</div>

                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <br />
            <br />
            <button
              className="login-btn-primary"
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? "Please wait..." : "Confirm"}
            </button>

            <br />
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

export default New_Password;
