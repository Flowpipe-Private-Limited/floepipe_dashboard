import React, { useEffect, useState } from "react";
import "./WalletToPop.css";
import axios from "axios";

const WalletToPop = () => {
  const CLIENT_ID = "CID_1766992391408";

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const getWalletBalance = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/apimodule/get-wallte-balance?clientId=${CLIENT_ID}`
      );
      console.log("Wallet API Response:", res);
      console.log("Wallet API Response:", res.data);

      if (res.data?.success) {
        setBalance(res.data?.data?.balance);
      } else {
        setError(res.data?.message || "Failed to fetch balance");
      }
    } catch (err) {
      console.error("Error fetching wallet balance:", err.response || err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getWalletBalance();
  }, []);
  const handleTopUp = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const payload = {
      clientId: CLIENT_ID,
      transactionId: "TNX-" + Date.now(),
      amount: Number(amount),
    };

    try {
      const res = await fetch(
        `${BASE_URL}/api/v1/apimodule/wallet-topup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          `Top-up successful!\nCredited: ₹${data.data.creditedAmount}\nGST: ₹${data.data.gstAmount}`
        );

        setBalance(data?.data?.remainingBalance);
        setAmount("");
      }
    } catch (error) {
      console.error("Wallet top-up failed", error);
    }
  };
  return (
    <div className="wallet-container">
      <div className="wallet-wrapper">

        <div className="wallet-card">
          <div className="wallet-card-header">
            <p className="wallet-title">P E R S O N A L W A L L E T</p>
            <div className="wallet-sun-icon">
              {/* Simple CSS sunburst representation or SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d9f99d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
          </div>

          <div className="wallet-balance-row">
            <h2 className="wallet-balance">₹ {balance}</h2>
            <span className="wallet-eye-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </span>
          </div>

          <div className="wallet-card-footer">
            <div className="wallet-action">
              <span className="action-icon">📨</span> {/* Using emoji or generic icon for statement */}
              <span>View Statement</span>
            </div>
            <div className="wallet-action">
              <span className="action-icon">₹</span>
              <span>Add Money</span>
            </div>
          </div>
        </div>

        <div className="add-money-card">
          <h3>Add Money via UPI</h3>

          <div className="upi-input-row">
            <div className="upi-icon-box">
              <span className="upi-app-icon">▶️</span> {/* Placeholder for UPI app logo */}
            </div>
            <span className="currency">₹</span>
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="pay-btn" onClick={handleTopUp}>
              pay
            </button>
          </div>

          <div className="amount-buttons">
            <button onClick={() => setAmount(500)}>500</button>
            <button onClick={() => setAmount(1000)}>1000</button>
            <button onClick={() => setAmount(2000)}>2000</button>
            <button onClick={() => setAmount(3000)}>3000</button>
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