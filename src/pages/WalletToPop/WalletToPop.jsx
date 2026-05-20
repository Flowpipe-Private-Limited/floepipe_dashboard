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
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleQrPaymentResponse, HandleQrResponse, HandleQrstatus } from "../../utils/Apis/api";
import { connectSocket, disconnectSocket } from "../../utils/socket";

const WalletToPop = ({
  setPopupTitle,
  setHideHeader,
  Balance,
  onClose,
}) => {
  const CLIENT_ID = localStorage.getItem("clientId");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [geoCode, setGeoCode] = useState("");
  const [currentView, setCurrentView] = useState("MAIN");
  const [paymentStatus, setPaymentStatus] = useState("PENDING");
  const [orderId, setOrderId] = useState("");
  const [transactionDetails, setTransactionDetails] = useState({});
  const [qr, setQr] = useState({});
  const BASE_URL = import.meta.env.REACT_APP_API_BASE_URL;
  const BACKEND_URL = import.meta.env.REACT_APP_KYC_URL;

  const getLocation = async (req, res) => {
    if (!navigator.geolocation) {
      console.log("No Geo Location in this browser");
      return;
    }

    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    try {
      const position = await getPosition();
      const coords = position.coords;
      const constructedGeoCode = `${position?.coords?.latitude}, ${position?.coords?.longitude}`;
      console.log("coords", coords);
      setGeoCode(constructedGeoCode);
    } catch (err) {
      console.log("err while getting location", err);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (setHideHeader) {
      setHideHeader(
        currentView === "SCAN_PAY" ||
        currentView === "RECEIPT" ||
        currentView === "INVOICE",
      );
    }
  }, [currentView, setHideHeader]);


  const handleTopUp = async () => {
    console.log("TopUp Initiated");

    if (!amount || amount <= 0) {
      console.warn("Invalid amount entered:", amount);
      alert("Please enter a valid amount");
      return;
    }

    // :small_blue_diamond: Get clientId from localStorage
    const clientId = localStorage.getItem("clientId");
    console.log("clientId from localStorage:", clientId);

    if (!clientId) {
      console.error("clientId not found in localStorage");
      alert("Client ID not found. Please login again.");
      return;
    }

    const payload = {
      amount: String(amount),
      currency: "INR",
      geoCode: "IN",
      geoLocation: "Hyderabad,TG",
      clientId: clientId,
    };

    console.log("Final Payload:", payload);

    try {
      console.log("entered into handletopup")
      await ApirequestHandler(
        () => HandleQrResponse(payload),
        null,
        (res) => {
          console.log("API Success Response:", res);

          if (res.success) {
            console.log("QR Data:", res.data);

            setQr(res?.data);
            setCurrentView("SCAN_PAY");

            const txnId = res?.data?.orderId;
            console.log("Generated Order ID:", txnId);

            setOrderId(txnId);

            console.log("Connecting socket for txnId:", txnId);


            connectSocket(txnId, (data) => {
              console.log("Socket Data Received:", data);

              const status =
                data?.paymentStatus?.toUpperCase() ||
                data?.status?.toUpperCase();

              console.log("Payment Status:", status);

              setPaymentStatus(status);

              const updatedBalance =
                status === "SUCCESS"
                  ? Number(Balance) + Number(amount)
                  : Number(Balance);

              const txnDetails = {
                id: txnId,
                mobile: "",
                dateTime: new Date().toLocaleString(),
                amount: amount,
                gst: gst,
                newBalance: updatedBalance,
                status,
              };

              setTransactionDetails(txnDetails);

              if (status === "SUCCESS" || status === "FAILED") {
                setCurrentView("RECEIPT");
              }
            });

            pollStatus(txnId);
          } else {
            console.warn("API returned success=false:", res);
            setQr({});
          }
        },
        (err) => {
          console.error("API Error Callback:", err);
        }
      );
    } catch (error) {
      console.error(" Unexpected Error:", error);
    }

    if (setPopupTitle) {
      console.log("Clearing popup title");
      setPopupTitle("");
    }
  };
  const getQrPaymentStatus = async (orderId) => {
    try {
      console.log("[STATUS API] Checking for:", orderId);

      const res = await HandleQrstatus(orderId);

      const status = res?.data?.data?.paymentStatus?.toUpperCase();

      console.log(" Status:", status);


      console.log("[STATUS RESPONSE]:", res?.data);
      console.log("[CURRENT STATUS]:", status);

      return status;
    } catch (err) {
      console.error("[STATUS ERROR]:", err?.response?.data || err.message);
      return null;
    }
  };
  const pollStatus = async (orderId) => {
    console.log("Polling started in getQrPaymentStatus:", orderId);

    const wait = (ms) => new Promise((res) => setTimeout(res, ms));

    for (let i = 0; i < 20; i++) {
      try {
        console.log(`Attempt ${i + 1}`);

        const res = await HandleQrstatus(orderId);

        console.log("status response getQrPaymentStatus:", res?.data);

        const status = res?.data?.data?.status?.toUpperCase(); 

        console.log("Current Status in getQrPaymentStatus:", status);

        if (status === "SUCCESS" || status === "FAILED") {
          console.log("Moving to RECEIPT with status getQrPaymentStatus:", status);

          setTransactionDetails({
            id: res?.data?.data?.orderId,
            amount: res?.data?.data?.amount,
            status: status,
            dateTime: new Date().toLocaleString(),
          });

          setPaymentStatus(status);
          setCurrentView("RECEIPT");

          // setCurrentView("RECEIPT");

          return;
        }

      } catch (err) {
        console.error("Status Error:", err?.response?.data || err.message);
      }

      await wait(3000);
    }

    console.warn("Polling stopped (max attempts)");
  };
  // const handleTopUp = async () => {
  //   if (!amount || amount <= 0) {
  //     alert("Please enter a valid amount");
  //     return;
  //   }

  //   const payload = {
  //     amount: Number(amount),
  //     geo_code: geoCode,
  //     geo_location: "Hyderabad,TG",
  //   };

  //   await ApirequestHandler(
  //     () => HandleQrResponse(payload),
  //     null,
  //     (res) => {
  //       console.log("res", res);
  //       if (res.success) {
  //         setQr(res?.data);
  //         setCurrentView("SCAN_PAY");
  //         const txnId = res?.data?.orderId;
  //         setOrderId(txnId);
  //         connectSocket(txnId, (data) => {
  //           const status = data?.paymentStatus?.toUpperCase();

  //           setPaymentStatus(status);

  //           setTransactionDetails({
  //             id: txnId,
  //             mobile: "",
  //             dateTime: new Date().toLocaleString(),
  //             amount: amount,
  //             gst: gst,
  //             newBalance:
  //               status === "SUCCESS"
  //                 ? Number(Balance) + Number(amount)
  //                 : Number(Balance),
  //             status,
  //           });

  //           if (status === "SUCCESS" || status === "FAILED") {
  //             setCurrentView("RECEIPT");
  //           }
  //         });
  //       } else {
  //         setQr({});
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //   );

  //   if (setPopupTitle) setPopupTitle("");
  // };

  const handleScanSuccess = async () => {
    await ApirequestHandler(
      () => HandleQrPaymentResponse(orderId),
      null,
      (res) => {
        if (res.status === "SUCCESS") {
          setPaymentStatus("SUCCESS");
        } else {
          setPaymentStatus("FAILED");
        }

        setCurrentView("RECEIPT");
      },
      (err) => {
        console.log(err);
        setPaymentStatus("FAILED");
        setCurrentView("RECEIPT");
      },
    );

    setCurrentView("RECEIPT");

    socket.disconnect();
    if (setPopupTitle) setPopupTitle("");
  };

  const quickAmounts = [500, 1000, 2000, 3000];

  const gst = amount ? (Number(amount) * 0.18).toFixed(2) : 0;
  const total = amount ? (Number(amount) + Number(gst)).toFixed(2) : 0;

  // const handleClose = async (e) => {
  //   if (e) e.stopPropagation();

  //   if (currentView === "SCAN_PAY") {
  //     disconnectSocket();

  //     setPaymentStatus("FAILED");

  //     setTransactionDetails({
  //       id: orderId,
  //       mobile: "",
  //       dateTime: new Date().toLocaleString(),
  //       amount: amount,
  //       gst: gst,
  //       newBalance: Number(Balance),
  //       status: "FAILED",
  //     });

  //     setCurrentView("RECEIPT");

  //     return;
  //   }

  //   if (onClose) onClose();
  // };

  const handleClose = () => {
    if (currentView === "SCAN_PAY") {
      disconnectSocket();

      setPaymentStatus("FAILED");

      setTransactionDetails({
        id: orderId,
        amount,
        gst,
        dateTime: new Date().toLocaleString(),
        status: "FAILED"
      });

      setCurrentView("RECEIPT");
      return;
    }

    onClose();
  };

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
    return (
      <div className="backdrop" onClick={(e) => handleClose(e)}>
        <Scan_Pay amount={total} reponse={qr} onTimerEnd={handleScanSuccess} />
      </div>
    );
  }

  if (currentView === "RECEIPT") {
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
          <p className="balance-amount">₹ {Balance}</p>
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
          <div
            className="payment-method-item"
            onClick={handleBankTransferClick}
          >
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
