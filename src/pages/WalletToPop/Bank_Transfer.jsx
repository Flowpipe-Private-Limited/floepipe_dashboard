import React from "react";
import "./Bank_Transfer.css";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { LuCopy } from "react-icons/lu";
import Images from "../../Images/Images";

const Bank_Transfer = ({ onBack }) => {
  const bankDetails = [
    {
      name: "Axis Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg",
      accountNumber: "IPAY80999993843",
      ifsc: "UTISBBSGDBE",
      color: "#971C44"
    },
    {
      name: "ICICI Bank",
      logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/ICICI_Bank_Logo.svg",
      accountNumber: "IPAY80999993843",
      ifsc: "UTISBBSGDBE",
      color: "#F37021"
    }
  ];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
  };

  return (
    <div className="bank-transfer-container">
      <div className="bank-transfer-header">
        <button className="back-btn" onClick={onBack}>
          <HiOutlineArrowLeft size={22} color="var(--purple-main)" />
        </button>
      </div>

      <div className="bank-list">
        {bankDetails.map((bank, index) => (
          <div className="bank-card" key={index}>
            <div className="bank-card-header">
              <div className="bank-logo-name">
                <img src={bank.logo} alt={bank.name} className="bank-logo" />
                <span className="bank-name">{bank.name}</span>
              </div>
              <button
                className="copy-btn-main"
                onClick={() => handleCopy(`${bank.accountNumber}\n${bank.ifsc}`)}
              >
                <LuCopy size={18} color="#9ca3af" />
              </button>
            </div>
            <div className="bank-details-box">
              <div className="detail-row">
                <span className="detail-label">Account Number</span>
                <span className="detail-value">{bank.accountNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">IFSC</span>
                <span className="detail-value">{bank.ifsc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bank-footer-contact">
        <p className="contact-helpdesk">Contact Helpdesk</p>
      </div>
    </div>
  );
};

export default Bank_Transfer;