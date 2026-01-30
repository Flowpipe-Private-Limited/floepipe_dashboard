import React, { useState, useEffect } from "react";
import axios from "axios";
import WalletToPop from "./WalletToPop";
import "./Billing_plans.css";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { LuDownload } from "react-icons/lu";
import Images from "../../Images/Images";
import { LuCircleAlert } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { HiOutlineBolt } from "react-icons/hi2";
import { LuCreditCard } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const BillingPlans = () => {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [autoRecharge, setAutoRecharge] = useState(false);
  const [usageAlerts, setUsageAlerts] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState("Last 30 days");

  // Wallet Logic State
  const CLIENT_ID = "CID_1766992391408";
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleTopUp = async () => {
    if (!rechargeAmount || rechargeAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const payload = {
      clientId: CLIENT_ID,
      transactionId: "TNX-" + Date.now(),
      amount: Number(rechargeAmount),
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
        setRechargeAmount("");
      }
    } catch (error) {
      console.error("Wallet top-up failed", error);
    }
  };

  const transactions = [
    {
      date: "Dec 21, 2024",
      type: "Top-up",
      mode: "UPI",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
    {
      date: "Dec 22, 2024",
      type: "Invoice",
      mode: "Auto-debit",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
    {
      date: "Dec 23, 2024",
      type: "Invoice",
      mode: "Net Banking",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
    {
      date: "Dec 24, 2024",
      type: "Top-up",
      mode: "Credit Card",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
    {
      date: "Dec 25, 2024",
      type: "Invoice",
      mode: "Auto-debit",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
    {
      date: "Dec 26, 2024",
      type: "Top-up",
      mode: "UPI",
      amount: "₹2,450",
      status: "Completed",
      invoice: true,
    },
  ];

  const dateOptions = [
    "Last 120 days",
    "Last 60 days",
    "Last 30 days",
    "Last 7 days",
    "Custom",
  ];

  const handleDateSelect = (option) => {
    setSelectedDateRange(option);
    setDateDropdownOpen(false);
  };

  return (
    <div className="BillingPlans_page">
      <div className="BillingPlans_wrapper">
        <div className="BillingPlans_header">
          <div className="BillingPlans_header-left">
            <h1>Billing & Plans</h1>
            <p>Manage balance, plans, and payment history</p>
          </div>
          <div className="BillingPlans_header-right">
            <div className="BillingPlans_mode-toggle">
              <button className="BillingPlans_mode-btn">
                <LuTestTube />
                Test
              </button>
              <button className="BillingPlans_mode-btn active">
                <BsLightningCharge />
                Live
              </button>
            </div>
            <button
              className="BillingPlans_add-balance-main-btn"
              onClick={() => setIsSliderOpen(true)}
            >
              + Add Balance
            </button>
          </div>
        </div>
      </div>

      <div className="BillingPlans_stats-row">
        <div className="BillingPlans_stat-card">
          <div className="BillingPlans_stat-header">
            <div className="BillingPlans_stat-icon">
              <LuCreditCard size={20} color="#155DFC" />
            </div>
            <p className="BillingPlans_stat-label">Current Plan</p>
          </div>
          <div className="BillingPlans_stat-value-group">
            <h3>Pro Plan</h3>
            <span className="BillingPlans_badge yellow">Prepaid</span>
          </div>
        </div>
        <div className="BillingPlans_stat-card">
          <div className="BillingPlans_stat-header">
            <div className="BillingPlans_stat-icon">
              <HiOutlineBolt size={20} color="#00A63E" />
            </div>
            <p className="BillingPlans_stat-label">Plan Status</p>
          </div>
          <div className="BillingPlans_stat-value-group">
            <h3>On going</h3>
            <span className="BillingPlans_badge">Active</span>
          </div>
        </div>
        <div className="BillingPlans_stat-card">
          <div className="BillingPlans_stat-header">
            <div
              style={{ color: "#00A63E" }}
              className="BillingPlans_stat-icon"
            >
              ₹{" "}
            </div>
            <p className="BillingPlans_stat-label">Available Balance</p>
          </div>
          <div>
            <h3>₹{balance}</h3>
            <p className="BillingPlans_stat-sub">Est. 18 days remaining</p>
          </div>
        </div>
        <div className="BillingPlans_stat-card">
          <div className="BillingPlans_stat-header">
            <div className="BillingPlans_stat-icon">
              <FaArrowTrendUp size={20} color="#155DFC" />
            </div>
            <p className="BillingPlans_stat-label">API Usage</p>
          </div>
          <div>
          <h3>245K / 500k</h3>
          <div className="BillingPlans_progress-bar">
            <div
              className="BillingPlans_progress-fill"
              style={{ width: "49%" }}
            ></div>
          </div>
          </div>
        </div>
        <div className="BillingPlans_stat-card">
          <div className="BillingPlans_stat-header">
            <div className="BillingPlans_stat-icon">
              <LuCircleAlert size={20} color="#E17100" />
            </div>
            <p className="BillingPlans_stat-label">Alert Threshold</p>
          </div>
          <div className="BillingPlans_threshold-row">
            <h3>₹5,000</h3>
            <span className="BillingPlans_info-icon">
              <LuCircleAlert size={20} color="#99A1AF" />
            </span>
          </div>
          <a href="#" className="BillingPlans_edit-link">
            Edit threshold <FiEdit size={20} color="#00000099" />
          </a>
        </div>
      </div>

      <div className="BillingPlans_content-grid">
        <div className="BillingPlans_transactions-section">
          <div className="BillingPlans_section-header">
            <h2>Recent Transactions</h2>

            <div className="BillingPlans_custom-dropdown-container">
              <button
                className="BillingPlans_dropdown-trigger"
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
              >
                {selectedDateRange}{" "}
                <span className="BillingPlans_arrow">▼</span>
              </button>
              {dateDropdownOpen && (
                <div className="BillingPlans_dropdown-menu">
                  {dateOptions.map((option) => (
                    <div
                      key={option}
                      className="BillingPlans_dropdown-item"
                      onClick={() => handleDateSelect(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <table className="BillingPlans_transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Mode</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, idx) => (
                <tr key={idx}>
                  <td>{tx.date}</td>
                  <td>
                    <span
                      className={`BillingPlans_tx-type ${
                        tx.type === "Top-up" ? "topup" : "invoice"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td>{tx.mode}</td>
                  <td>{tx.amount}</td>
                  <td>
                    <span className="BillingPlans_status-pill completed">
                      {tx.status}
                    </span>
                  </td>
                  <td>
                    <button className="BillingPlans_download-btn">
                      <LuDownload color="black" size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="BillingPlans_sidebar-section">
          <div className="BillingPlans_sidebar-card BillingPlans_plan-history">
            <h3>Plan History</h3>
            <div className="BillingPlans_history-timeline">
              <div className="BillingPlans_timeline-item">
                <div className="BillingPlans_timeline-dot"></div>
                <div className="BillingPlans_timeline-line"></div>
                <div className="BillingPlans_timeline-content">
                  <div className="BillingPlans_timeline-header-row">
                    <div className="BillingPlans_plan-name-group">
                      <h4>Mini</h4>
                      <span className="BillingPlans_badge yellow">Prepaid</span>
                    </div>
                    <span className="BillingPlans_badge purple-solid">
                      Active
                    </span>
                  </div>
                  <p className="BillingPlans_timeline-date">
                    May 28, 2022 → Active
                  </p>
                </div>
              </div>

              <div className="BillingPlans_timeline-item">
                <div className="BillingPlans_timeline-dot"></div>
                {/* Last item might not need a line if we want it to stop, but the image shows a continuous feel or just connecting. 
                       Usually the line connects FROM this dot downwards. The last one doesn't need a line going down. */}
                <div className="BillingPlans_timeline-content">
                  <div className="BillingPlans_timeline-header-row">
                    <div className="BillingPlans_plan-name-group">
                      <h4>Plus</h4>
                      <span className="BillingPlans_badge yellow">Prepaid</span>
                    </div>
                  </div>
                  <p className="BillingPlans_timeline-date">
                    Feb 28, 2022 → May 28, 2022
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="BillingPlans_sidebar-card BillingPlans_auto-recharge">
            <div className="BillingPlans_card-header-toggle">
              <h3>Auto-recharge</h3>
              <div
                className="BillingPlans_switch"
                onClick={() => setAutoRecharge(!autoRecharge)}
              >
                <input type="checkbox" checked={autoRecharge} readOnly />
                <span className="BillingPlans_slider round"></span>
              </div>
            </div>
            <p className="BillingPlans_card-sub">Add Money via UPI</p>
            <div className="BillingPlans_recharge-input-group">
              <div className="BillingPlans_input-wrapper">
                <span className="BillingPlans_currency-img">
                  <img className="bhim-img" src={Images.bhim} />
                </span>
                <span className="BillingPlans_currency-symbol">₹</span>
                <input
                  type="number"
                  placeholder="5000"
                  value={rechargeAmount}
                  onChange={(e) => setRechargeAmount(e.target.value)}
                />
                <button
                  className="BillingPlans_pay-small-btn"
                  onClick={handleTopUp}
                >
                  pay
                </button>
              </div>
            </div>
            <div className="BillingPlans_quick-amounts">
              <button onClick={() => setRechargeAmount(500)}>500</button>
              <button onClick={() => setRechargeAmount(1000)}>1000</button>
              <button onClick={() => setRechargeAmount(2000)}>2000</button>
              <button onClick={() => setRechargeAmount(3000)}>3000</button>
            </div>
            <div className="BillingPlans_usage-alerts">
              <div className="BillingPlans_card-header-toggle">
                <h4 style={{ fontFamily: "JetBrainsMono" }}>Usage Alerts</h4>
                <div
                  className="BillingPlans_switch"
                  onClick={() => setUsageAlerts(!usageAlerts)}
                >
                  <input type="checkbox" checked={usageAlerts} readOnly />
                  <span className="BillingPlans_slider round"></span>
                </div>
              </div>
              <div className="BillingPlans_alert-options">
                <div className="BillingPlans_checkbox-row">
                  <input type="checkbox" /> E-mail
                </div>
                <div className="BillingPlans_checkbox-row">
                  <input type="checkbox" /> Whatsapp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="BillingPlans_warning-banner">
        <span className="BillingPlans_warning-icon">⚠️</span>
        Your account balance is running low. Add balance to avoid service
        interruption.
      </div>

      {/* Side Slider Overlay */}
      {isSliderOpen && (
        <div className="BillingPlans_slider-overlay">
          <div className="BillingPlans_slider-container">
            <div className="BillingPlans_slider-header">
              <h2>Add Money</h2>
              <button
                className="BillingPlans_close-btn"
                onClick={() => setIsSliderOpen(false)}
              >
                <MdClose color="#7C3AED" size={28} />
              </button>
            </div>
            <div className="BillingPlans_slider-content">
              <WalletToPop />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingPlans;
