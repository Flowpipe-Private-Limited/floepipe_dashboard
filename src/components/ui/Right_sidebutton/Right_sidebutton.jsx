import React from "react";
import { HiMiniPlus } from "react-icons/hi2";
import "./Right_sidebutton.css";

const Right_sidebutton = ({TextonButton, onClick}) => {
  return (
    <div>
      <button className="btn-primary" onClick={onClick}>
        <HiMiniPlus size={20} /> {TextonButton}
      </button>
    </div>
  );
};

export default Right_sidebutton;
