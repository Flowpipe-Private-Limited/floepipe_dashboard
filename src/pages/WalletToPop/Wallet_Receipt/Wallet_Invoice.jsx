import React, { useRef } from "react";
import { HiOutlineShare, HiOutlineDownload } from "react-icons/hi";
import html2pdf from "html2pdf.js";
import "./Wallet_Invoice.css";
import images from "../../../Images/Images";

const Wallet_Invoice = ({ amount, onBack }) => {
  const invoiceRef = useRef(null);
  const transactionId =
    "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const invoiceNumber = "INV-WALLET-2026";

  const handleDownload = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    const opt = {
      margin:       10,
      filename:     `${invoiceNumber}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        ignoreElements: (element) => element.classList && element.classList.contains("invoice-actions")
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(printContent).save();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Invoice - ${invoiceNumber}`,
          text: `Invoice details for Wallet Top-Up of ${amount}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Sharing failed", error));
    } else {
      alert(
        `Invoice URL copied to clipboard: ${window.location.href}\nInvoice No: ${invoiceNumber}`,
      );
    }
  };
  const date =
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " at " +
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const gst = (Number(amount) * 0.18).toFixed(2);
  const total = (Number(amount) + Number(gst)).toFixed(2);

  return (
    <div className="invoice-view-container">
      <div className="invoice-paper" ref={invoiceRef}>
        <div className="invoice-top-section">
          <div className="invoice-brand">
            <div className="invoice-logo-wrapper">
              <img
                src={images.flowpipe_logo_round}
                alt="Flowpipe"
                className="invoice-main-logo"
              />
              <div className="invoice-brand-text">
                <h1>Flowpipe</h1>
                <p>API Payment Solutions</p>
              </div>
            </div>
          </div>
          <div className="invoice-biz-details">
            <div className="biz-row">
              <span className="biz-icon">📍</span>
              <p>
                GST: 36AAICC7251C1ZM <br /> H.No. 5-5-185/2/7/F, 3rd Floor,{" "}
                <br /> Vanasthalipuram, Hayathnagar, <br /> K.V.Rangareddy, TG
                500070 IN
              </p>
            </div>
            <div className="biz-row">
              <span className="biz-icon">📞</span>
              <p>+91 85858 01234</p>
            </div>
            <div className="biz-row">
              <span className="biz-icon">✉️</span>
              <p>hello@flowpipe.com</p>
            </div>
          </div>
        </div>
        <div className="invoice-content-section">
          <div className="invoice-section-title">Transaction Details</div>
          <div className="invoice-table">
            <div className="invoice-table-row">
              <span className="table-label">Type</span>
              <span className="table-value">Wallet Top-Up</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Date & Time</span>
              <span className="table-value">{date}</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Transaction ID</span>
              <span className="table-value">{transactionId}</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Invoice Number</span>
              <span className="table-value">{invoiceNumber}</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Payment Mode</span>
              <span className="table-value">UPI</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Payment Status</span>
              <span className="table-value status-badge">Paid</span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">Mobile Number</span>
              <span className="table-value">+91 9876543210</span>
            </div>
          </div>
          <div className="invoice-section-title">Pricing Summary</div>
          <div className="invoice-table">
            <div className="invoice-table-row">
              <span className="table-label">Base Amount</span>
              <span className="table-value">
                ₹
                {Number(amount).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="invoice-table-row">
              <span className="table-label">GST (18%)</span>
              <span className="table-value">+{gst}</span>
            </div>
          </div>
          <div className="invoice-total-row">
            <span className="total-label">Total Paid</span>
            <span className="total-value">₹{total}</span>
          </div>
          <div className="invoice-disclaimer">
            <p>
              <strong>
                NOTE: This is a computer-generated receipt and does not require
                a physical signature.
              </strong>
            </p>
            <p>
              At Flowpipe, your trust is our top priority. Your funds remain
              yours until you receive what you've paid for. For any assistance,
              we're here for you at hello@flowpipe.com
            </p>
          </div>
        </div>

        <div className="invoice-footer-branding">
          <div className="footer-line">
            <span>Flowpipe</span> <span className="dot">.</span>{" "}
            <span className="com">com</span>
          </div>
          <div className="footer-logo">
            <img
              src={images.flowpipe_logo_round}
              alt="Flowpipe"
              className="invoice-footer-logo"
            />
            <span>flowpipe</span>
          </div>
        </div>

        <div className="invoice-actions">
          <button className="invoice-action-btn share" onClick={handleShare}>
            <HiOutlineShare size={18} />
            Share Receipt
          </button>
          <button className="invoice-action-btn download" onClick={handleDownload}>
            <HiOutlineDownload size={18} />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wallet_Invoice;
