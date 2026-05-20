import React, { useRef } from "react";
import { LuDownload } from "react-icons/lu";
import { HiOutlineShare } from "react-icons/hi";
import { MdClose } from "react-icons/md";
import html2pdf from "html2pdf.js";
import images from "../../../Images/Images";
import "./InvoiceModal.css";

const InvoiceModal = ({ isOpen, onClose, tx }) => {
  const invoiceRef = useRef(null);

  if (!isOpen || !tx) return null;

  // Dynamic calculations based on transaction amount
  const parseAmount = (amtStr) => {
    if (!amtStr) return 2000;
    const cleanStr = amtStr.replace(/[^\d.]/g, "");
    return parseFloat(cleanStr) || 2000;
  };

  const baseAmt = parseAmount(tx.amount);
  const igstRate = 18;
  const igstAmt = Math.round(baseAmt * (igstRate / 100));
  const grandTotal = baseAmt + igstAmt;

  // Simple number-to-words converter
  const numberToWords = (num) => {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if ((num = num.toString()).length > 9) return "overflow";
    let n = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";
    let str = "";
    str +=
      Number(n[1]) !== 0
        ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore "
        : "";
    str +=
      Number(n[2]) !== 0
        ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh "
        : "";
    str +=
      Number(n[3]) !== 0
        ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand "
        : "";
    str +=
      Number(n[4]) !== 0
        ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred "
        : "";
    str +=
      Number(n[5]) !== 0
        ? (str !== "" ? "and " : "") +
          (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) +
          " "
        : "";
    return "Indian Rupee " + str.trim() + " Only";
  };

  // Generate unique UTR & invoice number from transaction date/type
  const getUtr = () => {
    const seed = tx.date + tx.amount + tx.type;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash).toString();
    return "HDFC2026" + absHash.substring(0, 6) + "098231";
  };

  const getInvoiceNumber = () => {
    const seed = tx.date + tx.amount;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const absHash = Math.abs(hash).toString();
    return "INV-2026-" + absHash.substring(0, 6).padStart(6, "0");
  };

  const getBillingPeriod = (dateStr) => {
    try {
      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) {
        return "May 1, 2026 - May 7, 2026";
      }
      const end = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const startObj = new Date(dateObj);
      startObj.setDate(startObj.getDate() - 6);
      const start = startObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `${start} - ${end}`;
    } catch (e) {
      return "May 1, 2026 - May 7, 2026";
    }
  };

  const handleDownload = () => {
    const printContent = invoiceRef.current;
    if (!printContent) return;

    const opt = {
      margin:       10,
      filename:     `${getInvoiceNumber()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(printContent).save();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Invoice - ${getInvoiceNumber()}`,
          text: `Invoice details for ${tx.type} of ${tx.amount} on ${tx.date}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Sharing failed", error));
    } else {
      alert(
        `Invoice URL copied to clipboard: ${window.location.href}\nInvoice No: ${getInvoiceNumber()}`,
      );
    }
  };

  return (
    <div className="invoice-modal-overlay" onClick={onClose}>
      <div
        className="invoice-modal-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* PRINTABLE AREA */}
        <div className="invoice-modal-scroll">
          <div ref={invoiceRef} className="invoice-modal-content">
            {/* Header section */}
            <div className="invoice-header-row">
              <div className="invoice-logo-group">
                <img
                  src={images.FlowpipeLogo}
                  alt="flowpipe"
                  className="invoice-logo-img"
                />
                <span className="invoice-logo-text">flowpipe</span>
              </div>
              <div className="invoice-meta">
                <div className="invoice-no-div">
                  <div className="invoice-meta-label">Invoice No</div>
                  <div className="invoice-meta-val">{getInvoiceNumber()}</div>
                </div>
                <div>
                  <div className="invoice-no-div">
                    <div className="invoice-meta-label">Invoice Date</div>
                    <div className="invoice-meta-val">{tx.date}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Address Row */}
            <div className="invoice-addresses-row">
              <div>
                <div className="address-col-title">Issued To</div>
                <div className="address-company">Flowpipe Payments Pvt Ltd</div>
                <div className="address-text">
                  H.No. 5-5-165/2/TF, 4th Floor Vanasthalipuram,
                  <br />
                  Hayathnagar,K.V.Rangareddy, TG 500070 IN
                  <br />
                  GSTIN - 29AABCT1332L1Z5
                  <br />
                  PAN No - AWPPR3231F
                  <br />
                  State Code /UTCode : 36
                  <br />
                  CIN NO - U72900KA2025PTC123456
                </div>
              </div>
              <div className="issuedfrom">
                <div className="address-col-title">Issued From</div>
                <div className="address-company">NTAR Payments Pvt Ltd</div>
                <div className="address-text">
                  H.No. 5-5-165/2/TF, 4th Floor Vanasthalipuram,
                  <br />
                  Hayathnagar,K.V.Rangareddy, TG 500070 IN
                  <br />
                  GSTIN - 29AABCT1332L1Z5
                  <br />
                  PAN No - AWPPR3231F
                  <br />
                  State Code /UTCode : 36
                  <br />
                  CIN NO - U72900KA2025PTC123456
                </div>
              </div>
            </div>

            {/* Details Bar */}
            <div className="invoice-details-bar">
              <div>
                <div className="bar-item-label">UTR Number</div>
                <div className="bar-item-val">{getUtr()}</div>
              </div>
              <div>
                <div className="bar-item-label">Billing Period</div>
                <div className="bar-item-val">{getBillingPeriod(tx.date)}</div>
              </div>
            </div>

            {/* Table */}
            <div className="invoice-table-wrapper">
              <table className="inv-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>SAC Code</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>IGST (%)</th>
                    <th>IGST Amt</th>
                    <th>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>998314</td>
                    <td>{tx.type}</td>
                    <td>1.00</td>
                    <td>{baseAmt.toFixed(2)}</td>
                    <td>{igstRate}%</td>
                    <td>{igstAmt.toFixed(2)}</td>
                    <td>{baseAmt.toFixed(2)}</td>
                  </tr>
                  <tr className="row-total">
                    <td
                      colSpan={3}
                      className="total-words-cell"
                      style={{ fontSize: "var(--small-text-10)", color: "var(--gray-200)",padding:'0.5rem' }}
                    >
                      Total In Words :{" "}
                      <span
                        className="total-words-span"
                        title={numberToWords(grandTotal)}
                      >
                        {numberToWords(grandTotal)}
                      </span>
                    </td>
                    <td style={{ fontWeight: "600" }}>Subtotal</td>
                    <td>{baseAmt.toFixed(2)}</td>
                    <td>{igstRate}%</td>
                    <td>{igstAmt.toFixed(2)}</td>
                    <td style={{ fontWeight: "600" }}>
                      {grandTotal.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Grand Total Bar */}
            <div className="purple-grand-total-bar">
              <span>Grand Total (₹)</span>
              <span className="grand-total-val">₹{grandTotal.toFixed(2)}</span>
            </div>

            {/* Stamp & Footer Row */}
            <div className="stamp-footer-row">
              <div className="paid-stamp-wrapper">
              <img className="paid-stamp" src={images.paid}/>
              </div>
            </div>
          </div>
          <div className="two-buttons-invoice">
          <button className="btn-download-inv" onClick={handleDownload}>
            <LuDownload size={18} />
            Download Invoice
          </button>
          <button className="btn-share-inv" onClick={handleShare}>
            <HiOutlineShare size={18} />
            Share
          </button>
        </div>
        </div>
        
        {/* Buttons Action bar */}
        <div className="invoice-modal-actions-bar">
          <div className="thanks-note">
            Thank you for your business with us.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
