import { useState } from "react";
import "./Setting.css";

export default function Setting() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Password Reset Submitted:", formData);
  };

  return (
    <div className="setting-container">
      {/* Header */}
      <div className="setting-header">
        <h2 className="setting-title">Settings</h2>
      </div>

      {/* Content */}
      <h3 className="setting-subsection-title">Reset Password</h3>

      <div className="setting-form">
        <div className="setting-field">
          <p className="setting-label">New password</p>
          <input
            type="password"
            name="newPassword"
            className="setting-input"
            placeholder="Enter Password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="setting-field">
          <p className="setting-label">Confirm password</p>
          <input
            type="password"
            name="confirmPassword"
            className="setting-input"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="setting-actions">
          <button className="btn-next-setting" onClick={handleSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
