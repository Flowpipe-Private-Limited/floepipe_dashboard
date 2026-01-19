import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleGetOtp } from "../../utils/Apis/api";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import Background_Login from "../../components/ui/Background_Folder/Background_Login";

const Login = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    pan: "",
  });

  const HandleFromChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "pan" ? value.toUpperCase() : value,
    });

    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let newErrors = {};
    const mobileRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

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

    if (!formData.pan) {
      newErrors.pan = "PAN number is required";
    } else if (!panRegex.test(formData.pan)) {
      newErrors.pan = "PAN format: ABCDE1234F";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const GetOtp = async () => {
    if (!validateForm()) return;

    setErrorMessage("");
    setLoading(true);

    await ApirequestHandler(
      async () => HandleGetOtp(formData),
      setLoading,
      (res) => {
        console.log("OTP Response:", res);
      },
      (errMessage) => {
        setErrorMessage(errMessage);
      },
    );
  };

  // const handleRegister = async () => {
  //   const { name, email, mobileNumber } = formData;

  //   if (!name || !email || !mobileNumber) {
  //     setErrorMessage("Please fill all fields");
  //     return;
  //   }

  //   setLoading(true);
  //   setErrorMessage("");

  //   try {
  //     console.log("Register API called with:", formData);
  //     const response = await axios.post(`${BASE_URL}/api/v1/client/register`, {
  //       fullName: name,
  //       email: email,
  //       mobile: mobileNumber,
  //       module: "API_MODULE",
  //     });
  //     console.log("Register response:", response?.data);

  //     if (response.data?.success) {
  //       const clientId = response?.data?.clientId;
  //       console.log("clientId in handleregister", clientId);
  //       if (clientId) {
  //         localStorage.setItem("clientId", clientId);

  //         console.log("Client ID stored in localStorage:", clientId);
  //       }
  //       navigate("/login");
  //     } else {
  //       setErrorMessage(response.data?.message || "Registration failed");
  //     }
  //   } catch (error) {
  //     console.error("Register API error:", error.response || error);
  //     setErrorMessage(error.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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

              <div>
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
              </div>
            </div>
            <br />
            <Purple_Button textonchange={"Continue"} onClick={() => GetOtp()} />
            <br />
            <br />
            <div>
              <button  onClick={() => navigate(-1)} className="back-button-bg-register">
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
    </>
  );
};
export default Login;
