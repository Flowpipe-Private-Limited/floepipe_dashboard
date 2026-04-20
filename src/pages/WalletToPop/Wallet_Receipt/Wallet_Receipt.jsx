import React, { useEffect } from "react";
import "./Wallet_Receipt.css";
import { HiOutlineArrowLeft, HiOutlineDownload } from "react-icons/hi";
import { LuEye } from "react-icons/lu";
import { IoCheckmarkCircle } from "react-icons/io5";

const Wallet_Receipt = ({ transactionDetails, onBack, onViewInvoice }) => {

  const handleBalanceUpdate = async() => {
    try {
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    if(transactionDetails?.paymentStatus){
      handleBalanceUpdate()
    }
  },[])

  return (
    <div className="receipt-container">
      <div className="success-header">
        <div className="success-icon-wrapper">
          <IoCheckmarkCircle size={60} color="#22c55e" />
        </div>
        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-sub">Your wallet has been credited successfully</p>
      </div>

      <div className="transaction-details-section">
        <h3>Transaction Details</h3>
        <div className="details-card">
          <div className="receipt-row">
            <span className="receipt-label">Transaction ID</span>
            <span className="receipt-value">{transactionDetails.id}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Mobile Number</span>
            <span className="receipt-value">{transactionDetails.mobile}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Date & Time</span>
            <span className="receipt-value">{transactionDetails.dateTime}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">Amount Added</span>
            <span className="receipt-value green-text">₹{transactionDetails.amount}</span>
          </div>
          <div className="receipt-row">
            <span className="receipt-label">GST Paid</span>
            <span className="receipt-value">+ ₹{transactionDetails.gst}</span>
          </div>
        </div>
      </div>

      <div className="wallet-update-card">
        <div className="update-label">Wallet Update</div>
        <div className="update-row">
          <span className="update-title">Updated Balance</span>
          <span className="update-value">₹{transactionDetails.newBalance}</span>
        </div>
      </div>

      <div className="receipt-actions">
        <button className="receipt-btn primary-receipt-btn">
          <HiOutlineDownload size={18} />
          Download Invoice
        </button>
        <button
          className="receipt-btn secondary-receipt-btn"
          onClick={onViewInvoice}
        >
          <LuEye size={18} />
          View Invoice
        </button>
      </div>

      <button className="back-dashboard-btn" onClick={onBack}>
        <HiOutlineArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="receipt-footer">
        <p className="contact-helpdesk">Contact Helpdesk</p>
      </div>
    </div>
  );

};

export default Wallet_Receipt;