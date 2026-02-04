import React from "react";
import "./Logout.css";

function Logout({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="logout-overlay" onClick={onClose}>
      <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="logout-title">Confirm Logout</h3>
        <p className="logout-message">Are you sure you want to logout?</p>
        <div className="logout-actions">
          <button className="logout-btn logout-btn-cancel" onClick={onClose}>
            No, Cancel
          </button>
          <button className="logout-btn logout-btn-confirm" onClick={onConfirm}>
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
