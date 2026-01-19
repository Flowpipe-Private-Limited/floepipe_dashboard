import React from 'react'
import "./Background_Login.css";
import Images from "../../../Images/Images";


const Background_Login = () => {
  return (
    <div className="Background_Login">
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
    </div>
  )
}

export default Background_Login
