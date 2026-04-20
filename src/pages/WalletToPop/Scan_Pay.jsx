import React, { useEffect, useState } from "react";
import "./WalletToPop.css";
// I'll share some styles but I'll add specific ones to WalletToPop.css for now or separate them.
// Actually let's just make Scan_Pay.jsx clean.

const Scan_Pay = ({ amount, reponse, onTimerEnd }) => {
    const [seconds, setSeconds] = useState(180);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            if (onTimerEnd) onTimerEnd();
        }
    }, [seconds, onTimerEnd]);

    return (
        <div className="scan-pay-container" onClick={(e) => e.stopPropagation()}>
            <div className="scan-pay-content">
                <h2 className="scan-title">Scan & Pay</h2>
                <p className="scan-sub">Use any UPI app to complete payment</p>

                <div className="qr-wrapper">
                    <div className="qr-placeholder">
                        {/* Using a placeholder service for QR or just styling a box */}
                        <img
                            src={reponse?.qrCode}
                            alt="Payment QR"
                            className="qr-img"
                        />
                    </div>
                </div>

                <div className="payment-amount-display">
                    <p className="amt-label">Amount to Pay</p>
                    <p className="amt-value">₹{amount}</p>
                </div>

                <div className="waiting-status">
                    <div className="loading-spinner-small"></div>
                    <span>Waiting for payment...</span>
                </div>

                <div className="qr-expiry-info">
                    <p className="expiry-text">
                        QR expires in <span className="timer-highlight">{seconds}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Scan_Pay;
