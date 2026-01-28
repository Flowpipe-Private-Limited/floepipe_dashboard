import React, { useState } from "react";
import { X } from "lucide-react";

export const ChangeEmailModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">Email</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">E-mail</label>
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
        <div className="modal-header">
          <h2 className="modal-title">Add PHONE NUMBER</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <label className="modal-label">Phone Number</label>
          <div className="phone-input-group">
            <div className="country-code">
              <img
                src="https://flagcdn.com/w20/in.png"
                alt="India"
                className="flag-icon"
              />
              <span>+91</span>
            </div>
            <input
              type="text"
              className="modal-input phone-input"
              placeholder="Enter New Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <button className="send-otp-btn">Send OTP</button>
        </div>
      </div>
    </div>
  );
};
