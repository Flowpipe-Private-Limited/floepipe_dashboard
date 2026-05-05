import React from "react";
import { MdClose } from "react-icons/md";
import "./Popup.css";

const Popup = ({ isOpen, onClose, title, children, hideHeader = false }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        {!hideHeader && (
          <div className="popup-header">
            <h2 className="popup-title">{title}</h2>
            <button className="popup-close-btn" onClick={onClose}>
              <MdClose color="var(--purple-main)" size={28} />
            </button>
          </div>
        )}
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default Popup;