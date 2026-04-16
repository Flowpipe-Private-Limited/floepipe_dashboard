import React, { useEffect, useState } from "react";
import "./WalletToPop.css";
import axios from "axios";
import Images from "../../Images/Images";
import { BiRupee } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { LuClock, LuInfo } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import Bank_Transfer from "./Bank_Transfer";
import Scan_Pay from "./Scan_Pay";
import Wallet_Receipt from "./Wallet_Receipt/Wallet_Receipt";
import Wallet_Invoice from "./Wallet_Receipt/Wallet_Invoice";

const WalletToPop = ({ setPopupTitle, setHideHeader, onClose }) => {
  const CLIENT_ID = "CID_1766992391408";
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentView, setCurrentView] = useState("MAIN");
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;

  const getWalletBalance = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/apimodule/get-wallte-balance?clientId=${CLIENT_ID}`,
      );
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

  useEffect(() => {
    if (setHideHeader) {
      setHideHeader(currentView === "SCAN_PAY" || currentView === "RECEIPT" || currentView === "INVOICE");
    }
  }, [currentView, setHideHeader]);

  const handleTopUp = async () => {
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    setCurrentView("SCAN_PAY");
    if (setPopupTitle) setPopupTitle("");
  };

  const handleScanSuccess = () => {
    setCurrentView("RECEIPT");
    if (setPopupTitle) setPopupTitle("");
  };

  const quickAmounts = [500, 1000, 2000, 3000];

  const gst = amount ? (Number(amount) * 0.18).toFixed(2) : 0;
  const total = amount ? (Number(amount) + Number(gst)).toFixed(2) : 0;

  const handleBankTransferClick = () => {
    setCurrentView("BANK");
    if (setPopupTitle) setPopupTitle("Bank Transfer");
  };

  const handleBackToMain = () => {
    setCurrentView("MAIN");
    if (setPopupTitle) setPopupTitle("Add Money");
  };

  if (currentView === "BANK") {
    return <Bank_Transfer onBack={handleBackToMain} />;
  }

  if (currentView === "SCAN_PAY") {
    return <Scan_Pay amount={total} onTimerEnd={handleScanSuccess} />;
  }

  if (currentView === "RECEIPT") {
    const transactionDetails = {
      id: "TXN" + Date.now().toString().slice(-10),
      mobile: "+91 9876543210",
      dateTime: new Date().toLocaleString(),
      amount: amount,
      gst: gst,
      newBalance: Number(balance) + Number(amount),
    };
    return (
      <Wallet_Receipt
        transactionDetails={transactionDetails}
        onViewInvoice={() => setCurrentView("INVOICE")}
        onBack={() => {
          if (onClose) onClose();
        }}
      />
    );
  }

  if (currentView === "INVOICE") {
    return (
      <Wallet_Invoice
        amount={amount}
        onBack={() => setCurrentView("RECEIPT")}
      />
    );
  }

  return (
    <div className="wallet-modal-content">
      <div className="wallet-balance-section">
        <div className="balance-info">
          <p className="balance-label">Primary Wallet</p>
          <p className="balance-amount">₹ {balance}</p>
        </div>
        <div className="set-alert">
          <div className="alert-icon-box">
            <LuClock size={20} color="#7C3AED" />
          </div>
          <span className="alert-text">Set Alert</span>
        </div>
      </div>

      <div className="amount-input-section">
        <div className="amount-input-box">
          <span className="rupee-symbol">₹</span>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>

      <div className="quick-select-section">
        <p className="quick-label">Quick Select</p>
        <div className="quick-amounts">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              className={`quick-btn ${Number(amount) === amt ? "active" : ""}`}
              onClick={() => setAmount(amt)}
            >
              ₹ {amt}
            </button>
          ))}
        </div>
      </div>

      <div className="info-box">
        <div className="info-icon">
          <LuInfo size={16} />
        </div>
        <p className="info-text">
          Wallet balance will be used for API consumption. Charges are deducted
          automatically based on your usage.
        </p>
      </div>

      {amount > 0 && (
        <div className="payment-summary-section">
          <h3>Payment Summary</h3>
          <div className="summary-card">
            <div className="summary-row">
              <span>Amount</span>
              <span>₹{amount}</span>
            </div>
            <div className="summary-row">
              <span>GST (18%)</span>
              <span>+₹{gst}</span>
            </div>
            <div className="summary-total">
              <span>Total Payable</span>
              <span>₹{total}</span>
            </div>
            <button className="proceed-pay-btn" onClick={handleTopUp}>
              Proceed to Pay
            </button>
          </div>
        </div>
      )}

      {!amount && (
        <div className="other-payment-ways">
          <h3>Other ways to add Money</h3>
          <div className="payment-method-item" onClick={handleBankTransferClick}>
            <div className="method-left">
              <div className="method-icon-box bank">
                <AiOutlineBank size={20} color="#7C3AED" />
              </div>
              <span className="method-name">Bank Transfer</span>
            </div>
            <div className="expand-arrow">
              <IoIosArrowDown />
            </div>
          </div>
        </div>
      )}

      <div className="modal-footer">
        <a href="#" className="contact-helpdesk">
          Contact Helpdesk
        </a>
      </div>
    </div>
  );
};

export default WalletToPop;
