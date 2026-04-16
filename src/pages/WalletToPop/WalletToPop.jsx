import React, { useEffect, useState } from "react";
import "./WalletToPop.css";
import Images from "../../Images/Images";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiRupee } from "react-icons/bi";
import { AiOutlineBank } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { GetWalletBalance, GenerateStaticQrApi } from "../../utils/Apis/api";

const WalletToPop = () => {
  const navigate = useNavigate();

  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrData, setQrData] = useState(null);
  const [showQRScreen, setShowQRScreen] = useState(false); // ✅ important

  // ================= WALLET BALANCE =================
  const getWalletBalance = async () => {
    console.log("========== WALLET BALANCE START ==========");

    try {
      setLoading(true);

      const clientId = localStorage.getItem("clientId");
      console.log("Client ID:", clientId);

      const res = await GetWalletBalance(clientId);

      console.log("Wallet API Response:", res.data);

      if (res?.data?.success) {
        setBalance(res.data.data.balance);
        console.log("✅ Balance Set:", res.data.data.balance);
      } else {
        console.warn("❌ Failed:", res.data.message);
        setError(res.data.message);
      }

    } catch (err) {
      console.error("❌ Wallet Error:", err.response || err.message);
      setError("Error fetching wallet balance");
    } finally {
      setLoading(false);
      console.log("========== WALLET BALANCE END ==========\n");
    }
  };

  useEffect(() => {
    getWalletBalance();
  }, []);

  // ================= STATIC QR =================
  const handleTopUp = async () => {
    console.log("========== STATIC QR START ==========");

    try {
      setLoading(true);

      console.log("Calling Static QR API...");

      const res = await GenerateStaticQrApi();

      console.log("📥 Full Response:", res);
      console.log("📥 Response Data:", res.data);

      if (res?.data?.success) {
        console.log("✅ Static QR Generated");

        const finalQR = {
          ...res.data.data
        };

        setQrData(finalQR);
        setShowQRScreen(true); // ✅ show full screen QR

        console.log("📦 QR Stored:", finalQR);

      } else {
        console.warn("❌ API Failed:", res.data.message);
        alert(res.data.message);
      }

    } catch (error) {
      console.log("========== STATIC QR ERROR ==========");

      console.error("❌ Error:", error.message);

      if (error.response) {
        console.error("❌ API Error:", error.response.data);
      }

      alert("Failed to generate Static QR");

    } finally {
      setLoading(false);
      console.log("========== STATIC QR END ==========\n");
    }
  };

  const NavigateToBalance = () => {
    navigate("/dashboard/Billing_Plans");
  };

  // ================= UI =================
  return (
    <div className="wallet-container">

      {/* ================= WALLET UI ================= */}
      {!showQRScreen && (
        <div className="wallet-wrapper">

          {/* WALLET CARD */}
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
                >
                  {showBalance ? <GoEye /> : <GoEyeClosed />}
                </span>
              </div>
            </div>

            <div className="wallet-card-footer">
              <div onClick={NavigateToBalance} className="wallet-action">
                <img src={Images.statement} alt="Statement" />
                <span>View Statement</span>
              </div>

              <div className="wallet-action">
                <BiRupee size={20} />
                <span>Add Money</span>
              </div>
            </div>
          </div>

          {/* ADD MONEY */}
          <div className="add-money-card">
            <h3>Add Money via UPI</h3>

            <div className="upi-input-row">
              <div className="upi-icon-box">
                <img className="bhim-img" src={Images.bhim} />
              </div>

              <span className="currency">₹</span>

              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  console.log("Typing Amount:", e.target.value);
                  setAmount(e.target.value);
                }}
              />

              <button className="pay-btn" onClick={handleTopUp}>
                {loading ? "Processing..." : "Pay"}
              </button>
            </div>

            <div className="amount-buttons">
              <button onClick={() => setAmount("500")}>500</button>
              <button onClick={() => setAmount("1000")}>1000</button>
              <button onClick={() => setAmount("2000")}>2000</button>
              <button onClick={() => setAmount("3000")}>3000</button>
            </div>
          </div>

          {/* OTHER */}
          <div className="other-ways">
            <h3>Other ways to add Money</h3>

            <div className="bank-transfer">
              <AiOutlineBank size={22} />
              <span>Bank Transfer</span>
            </div>
          </div>

        </div>
      )}

      {/* ================= FULL SCREEN QR ================= */}
      {showQRScreen && qrData && (
        <div className="qr-fullscreen">
          <h2>Scan & Pay</h2>

          <img
            src={qrData.qrCode}
            alt="QR Code"
            style={{ width: "300px", height: "300px" }}
          />

          <p><b>Name:</b> {qrData.payeeName}</p>
          <p><b>UPI:</b> {qrData.payeeAddress}</p>

          <button
            onClick={() => {
              console.log("🔙 Back to Wallet");
              setShowQRScreen(false);
              setQrData(null);
            }}
          >
            Back
          </button>
        </div>
      )}

    </div>
  );
};

export default WalletToPop;