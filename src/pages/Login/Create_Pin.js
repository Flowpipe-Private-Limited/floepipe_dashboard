import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import Purple_Button from "../../components/ui/Buttons/Purple_Button/Purple_Button";
import Background_Login from "../../components/ui/Background_Folder/Background_Login";
import { useNavigate } from "react-router-dom";

const Create_Pin = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    email: "",
    pan: "",
  });

  const [createPin, setCreatePin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  const handlePinChange = (e, index, type) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const pin = type === "create" ? [...createPin] : [...confirmPin];
    pin[index] = value;

    type === "create" ? setCreatePin(pin) : setConfirmPin(pin);

    // move focus forward
    if (index < 3) {
      e.target.nextSibling?.focus();
    }
  };

  const handleKeyDown = (e, index, type) => {
    if (e.key === "Backspace") {
      const pin = type === "create" ? [...createPin] : [...confirmPin];
      pin[index] = "";
      type === "create" ? setCreatePin(pin) : setConfirmPin(pin);

      if (index > 0) {
        e.target.previousSibling?.focus();
      }
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card-fpin">
          <div onClick={() => navigate(-1)} className="fpin-arrow">
            <IoIosArrowRoundBack size={34} />
            <h2 className="login-title-Pin">Create fPIN</h2>
          </div>
          <div className="fpin-padding-section">
            <h6 className="fpin-subtext">
              fPIN is your 4-digit code used to authenticate Transactions and
              log-in to your flowpipe account.
            </h6>
            <div className="fpin-section">
              <p className="fpin-label">Create fPIN</p>
              <div className="fpin-box-wrapper">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    inputMode="numeric"
                    className="fpin-box"
                    onChange={(e) => handlePinChange(e, index, "create")}
                    onKeyDown={(e) => handleKeyDown(e, index, "create")}
                  />
                ))}
              </div>
            </div>
            <div className="fpin-section">
              <p className="fpin-label">Confirm fPIN</p>

              <div className="fpin-box-wrapper">
                {[...Array(4)].map((_, index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    inputMode="numeric"
                    className="fpin-box"
                    onChange={(e) => handlePinChange(e, index, "confirm")}
                    onKeyDown={(e) => handleKeyDown(e, index, "confirm")}
                  />
                ))}
              </div>
            </div>
          </div>
          <br />
          <Purple_Button textonchange={"Confirm"} />
          <div>
            {/* <button className="back-button-bg-register">
                <IoChevronBackOutline />
              </button> */}
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
export default Create_Pin;
