import React, { useEffect, useState } from "react";
import "./WalletToPop.css";
import axios from "axios";
import Images from "../../Images/Images";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiRupee } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const WalletToPop = () => {
  const CLIENT_ID = "CID_1766992391408";
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const BASE_URL = import.meta.env.REACT_APP_SUPPERADMIN_URL;



  const getWalletBalance = async () => {
    console.log("entered into getwalletbalance")
    setLoading(true);
    setError("");
    try {
      console.log("entered into getwalletbalance")
      const res = await axios.get( `${BASE_URL}apimodule/get-wallte-balance?clientId=${CLIENT_ID}`,);
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
      const res = await fetch(`${BASE_URL}/api/v1/apimodule/wallet-topup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          `Top-up successful!\nCredited: ₹${data.data.creditedAmount}\nGST: ₹${data.data.gstAmount}`,
        );

        setBalance(data?.data?.remainingBalance);
        setAmount("");
      }
    } catch (error) {
      console.error("Wallet top-up failed", error);
    }
  };

  const NavigateToBalance = () => {
    navigate("/dashboard/Billing_Plans");
  };

  return (
    <>
      <div className="wallet-container">
        <div className="wallet-wrapper">
          <div className="wallet-card">
            <div className="wallet-card-slide">
              <div className="wallet-card-header">
                <p className="wallet-title">PERSONAL WALLET</p>
                <img className="wallet-sun-icon" src={Images.FlowpipeLogo} />
              </div>
              <div className="wallet-middle">
                <span className="wallet-dots">
                  {showBalance ? `₹ ${balance}` : "*******"}
                </span>
                <span
                  className="wallet-eye-icon"
                  onClick={() => setShowBalance(!showBalance)}
                  style={{ cursor: "pointer" }}
                >
                  {showBalance ? <GoEye /> : <GoEyeClosed />}
                </span>
              </div>
            </div>
            <div className="wallet-card-footer">
              <div onClick={NavigateToBalance} className="wallet-action">
                <img
                  className="statement-icon"
                  src={Images.statement}
                  alt="View Statement"
                />
                <span onClick={NavigateToBalance}>View Statement</span>
              </div>
              <div className="wallet-action">
                <BiRupee style={{ opacity: "0.5" }} size={20} />
                <span style={{ opacity: "0.5" }}>Add Money</span>
              </div>
            </div>
          </div>

          <div className="add-money-card">
            <h3>Add Money via UPIss</h3>

            <div className="upi-input-row">
              <div className="upi-icon-box">
                <span className="upi-app-icon">
                  <img className="bhim-img" src={Images.bhim} />
                </span>{" "}
                {/* Placeholder for UPI app logo */}
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
                <div className="bank-icon">
                  <AiOutlineBank size={22} />
                </div>
                <span>Bank Transfer</span>
              </div>
              <span className="arrow">›</span>
            </div>
          </div>
          <div className="footer-contactHelpdesk">
            <p className="ContactHelpdesk">Contact Helpdesk</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default WalletToPop;
