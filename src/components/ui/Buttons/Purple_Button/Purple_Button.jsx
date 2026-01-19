import React from "react";
import "./Purple_Button.css";
const Purple_Button = ({textonchange,onClick, disabled, children}) => {
  return (
    <div>
      <button onClick={onClick} disabled={disabled} className="login-btn-primary">{textonchange}</button>
    </div>
  );
};

export default Purple_Button;
