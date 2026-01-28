import React, { useEffect, useState } from "react";
import "../../styles/WalletToPop.css";
import axios from "axios";

const WalletToPop = () => {
  const CLIENT_ID = "CID_1766992391408";

  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
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
          <p className="wallet-title">API WALLET</p>

          <div className="wallet-balance-row">
            <h2 className="wallet-balance">₹ {balance}</h2>
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
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button className="pay-btn" onClick={handleTopUp}>
              Pay
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