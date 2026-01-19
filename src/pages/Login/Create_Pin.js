import React, { useState } from "react";
import "../../styles/Login.css";
import Images from "../../Images/Images";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";

const Create_Pin = () => {
  const [Loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});
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
          <div className="login-card-ipin">
            <div className="ipin-arrow">
              <IoIosArrowRoundBack size={34} />
              <h2 className="login-title-Pin">Create iPIN</h2>
            </div>
            <div className="ipin-padding-section">
              <h6 className="ipin-subtext">
                IPIN is your 4-digit code used to authenticate Transactions and
                log-in to your flowpipe account.
              </h6>
              <div className="ipin-section">
                <p className="ipin-label">Create iPIN</p>
                <div className="ipin-box-wrapper">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="password"
                      maxLength={1}
                      inputMode="numeric"
                      className="ipin-box"
                      onChange={(e) => handlePinChange(e, index, "create")}
                      onKeyDown={(e) => handleKeyDown(e, index, "create")}
                    />
                  ))}
                </div>
              </div>
              <div className="ipin-section">
                <p className="ipin-label">Confirm iPIN</p>

                <div className="ipin-box-wrapper">
                  {[...Array(4)].map((_, index) => (
                    <input
                      key={index}
                      type="password"
                      maxLength={1}
                      inputMode="numeric"
                      className="ipin-box"
                      onChange={(e) => handlePinChange(e, index, "confirm")}
                      onKeyDown={(e) => handleKeyDown(e, index, "confirm")}
                    />
                  ))}
                </div>
              </div>
            </div>
            <br />
            <button className="login-btn-primary">Confirm</button>
            <div>
              {/* <button className="back-button-bg-register">
                <IoChevronBackOutline />
              </button> */}
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
export default Create_Pin;
