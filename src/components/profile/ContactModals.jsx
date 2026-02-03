import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

export const ChangeEmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header-change-email">
          <h2 className="modal-title">Email</h2>
          <button className="close-btn" onClick={onClose}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <div className="modal-body-change-email">
          <p className="modal-label">E-mail</p>
          <input
            type="email"
            className="modal-input"
            placeholder="Enter New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="send-otp-btn">Send OTP</button>
        </div>
      </div>
    </div>
  );
};

export const ChangePhoneModal = ({ isOpen, onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header-change-email">
          <h2 className="modal-title">Add PHONE NUMBER</h2>
          <button className="close-btn" onClick={onClose}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <div className="modal-body-change-email">
          <p className="modal-label">Phone Number</p>
          <div className="phone-input-group">
            <div className="country-code">
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="flag-icon"
              />
              <span style={{ color: "black" }}>+91</span>
            </div>
            <input
              type="text"
              className="modal-input-phone-input"
              placeholder="Enter New Number"
              value={phoneNumber}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                // Only set state if it's a number or empty
                if (/^\d*$/.test(value)) {
                  setPhoneNumber(value);
                }
              }}
            />
          </div>
          <button className="send-otp-btn">Send OTP</button>
        </div>
      </div>
    </div>
  );
};
