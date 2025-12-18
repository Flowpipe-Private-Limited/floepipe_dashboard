import React from "react";
import "../../styles/WalletToPop.css";

const WalletToPop = () => {
  return (
    <div className="wallet-container">
      <div className="wallet-wrapper">

     
        <div className="wallet-card">
          <p className="wallet-title">APIWALLET</p>

          <div className="wallet-balance-row">
            <h2 className="wallet-balance">₹ 2,465.08</h2>
            <div className="wallet-logo"></div>
          </div>

          <div className="wallet-statement">
            <span className="statement-icon">📄</span>
            <span>View Statement</span>
          </div>
        </div>

       
        <div className="add-money-card">
          <h3>Add Money via UPI</h3>

          <div className="upi-input-row">
            <span className="currency">₹</span>
            <input type="number" placeholder="0.00" />
            <button className="pay-btn">pay</button>
          </div>

          <div className="amount-buttons">
            <button>500</button>
            <button>1000</button>
            <button>2000</button>
            <button>3000</button>
          </div>
        </div>

      
        <div className="other-ways">
          <h3>Other ways to add Money</h3>

          <div className="bank-transfer">
            <div className="bank-left">
              <div className="bank-icon">🏦</div>
              <span>Bank Transfer</span>
            </div>
            <span className="arrow">›</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WalletToPop;
