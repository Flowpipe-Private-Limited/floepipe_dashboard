import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp, Register } from "../../utils/Apis/api";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import Background_Login from "../../components/ui/Background_Folder/Background_Login";
import axios from "axios";

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    // pan: "",
    name: ""
  });

  const HandleFromChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "mobileNumber"
          ? value.replace(/\D/g, "") // Remove ALL non-digit characters
          : name === "pan"
            ? value.toUpperCase()
            : value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const nameRegex = /^[A-Za-z]+$/;

    if (!formData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!mobileRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter valid 10-digit mobile number";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter valid email address";
    }

    // if (!formData.pan) {
    //   newErrors.pan = "PAN number is required";
    // } else if (!panRegex.test(formData.pan)) {
    //   newErrors.pan = "PAN format: ABCDE1234F";
    // }
    if (!formData.name) {
      newErrors.name = "name is required";
    } else if (!panRegex.test(formData.name)) {
      newErrors.name = "name format: Sham, John, ";
    }

    // if (!formData.panName) {
    //   newErrors.panName = "Name is required";
    // }

    setErrorMessage(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    const { mobileNumber, email, name } = formData;
    // if (!validateForm()) return;

    setLoading(true);
    setErrorMessage("");

    const dataToSend = {
      fullName: name,
      email: email,
      mobile: mobileNumber,
      module: "API_MODULE",
    };

    console.log('handle Register form', dataToSend)

    await ApirequestHandler(
      async () => Register(dataToSend),
      setLoading,
      (resData) => {
        const { success, clientId, message } = resData;
        console.log( success, clientId, message );
        if (success || clientId) {
          localStorage.setItem("clientId", clientId);
          navigate("/login");
        } else {
          setErrorMessage(message || "Registration failed");
        }
        setLoading(false)
      },
      (errMessage) => {
        console.log('REGISTER ERROR:', errMessage);
        setLoading(false)
      }
    )

  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="Image-bg-conatiner">
            <img
              src={Images.LoginLogoImg}
              alt="logo"
              className="login-logo"
            />
          </div>
          <h2 className="login-title">Signup to flowpipe</h2>
          <div className="input-email-password">
            <div>
              <div className="relative w-full">
                <input
                  type="tel"
                  name="mobileNumber"
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={HandleFromChange}
                  placeholder=""
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
              {errors.mobileNumber && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.mobileNumber}
                </p>
              )}
            </div>

            <div>
              <div className="relative w-full">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={HandleFromChange}
                  placeholder=" "
                  className="peer block w-full px-4 py-3 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
               focus:outline-none focus:ring-1 focus:ring-[#424D64]"
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base transition-all duration-200
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[0.8rem]
               peer-focus:top-0 peer-focus:-translate-y--10 peer-focus:text-[#424D64] peer-focus:text-sm peer-valid:bg-[#181818]"
                >
                  Email
                </label>
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* <div>
              <div className="relative w-full">
                <input
                  type="text"
                  name="pan"
                  value={formData.pan}
                  maxLength={10}
                  onChange={HandleFromChange}
                  placeholder=" "
                  className="peer block w-full px-4 py-3 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
               focus:outline-none focus:ring-1 focus:ring-[#424D64]"
                  />
                  <label
                    htmlFor="pan"
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base transition-all duration-200
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[0.8rem]
               peer-focus:top-0 peer-focus:-translate-y--10 peer-focus:text-[#424D64] peer-focus:text-sm peer-valid:bg-[#181818]"
                  >
                    PAN
                  </label>
                </div>
                {errors.pan && (
                  <p className="text-red-400 text-xs mt-1">{errors.pan}</p>
                )}
              </div> */}
            <div>
              <div className="relative w-full">
                <input
                  type="text"
                  name="name"
                  value={formData?.name}
                  maxLength={10}
                  onChange={HandleFromChange}
                  placeholder=" "
                  className="peer block w-full px-4 py-3 rounded-lg bg-zinc-900 border border-[#424D64] text-white placeholder-transparent
               focus:outline-none focus:ring-1 focus:ring-[#424D64]"
                />
                <label
                  htmlFor="name"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-base transition-all duration-200
               peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-[0.8rem]
               peer-focus:top-0 peer-focus:-translate-y--10 peer-focus:text-[#424D64] peer-focus:text-sm peer-valid:bg-[#181818]"
                >
                  Name
                </label>
              </div>
              {errors.pan && (
                <p className="text-red-400 text-xs mt-1">{errors?.name}</p>
              )}
            </div>
          </div>
          <br />
          <Purple_Button textonchange={"Continue"} onClick={() => handleRegister()} />
          <br />
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
export default Login;
