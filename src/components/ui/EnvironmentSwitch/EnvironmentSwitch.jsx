import React from "react";
import "./EnvironmentSwitch.css";

const EnvironmentSwitch = ({
  value,
  onChange,
  left = { label: "Test", value: "test", icon: "🧪" },
  right = { label: "Live", value: "live", icon: "⚡" }
}) => {
  const isLeft = value === left.value;

  return (
    <div className="env-switch">
      <div
        className={`env-switch-slider ${isLeft ? "left" : "right"}`}
      />

      <button
        className={`env-btn ${isLeft ? "active" : ""}`}
        onClick={() => onChange(left.value)}
      >
        {left.icon} <span>{left.label}</span>
      </button>

      <button
        className={`env-btn ${!isLeft ? "active" : ""}`}
        onClick={() => onChange(right.value)}
      >
        {right.icon} <span>{right.label}</span>
      </button>
    </div>
  );
};

export default EnvironmentSwitch;
