import React from "react";
import "../Trial_Center/RunTrailModal.css"
import { X } from "lucide-react";

const RunTrialModal = ({ product, onClose }) => {
  return (
    <div className="Trail-modal-backdrop" onClick={onClose}>
      <div
        className="Trail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="Trail-modal-header">
          <div>
            <p className="Trail-modal-subtitle">Running Trial on</p>
            <h2 className="Trail-modal-title">
              {/* {product?.title || "PAN Lite"} */}
              PAN Lite
            </h2>
          </div>

          <button className="Trail-modal-close" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="Trail-modal-body">
          <p className="Trail-modal-desc">
            Fill in the below details to run verification
          </p>

          <p className="Trail-modal-label">PAN Number</p>
          <input
            type="text"
            placeholder="Enter PAN Number"
            className="Trail-modal-input"
          />

          <div className="Trail-modal-checkbox">
            <input type="checkbox" checked readOnly />
            <span>
              I hereby agree, to let flowpipe verify my data for verification
            </span>
          </div>

          <button className="Trail-modal-submit">
            Run verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunTrialModal;
