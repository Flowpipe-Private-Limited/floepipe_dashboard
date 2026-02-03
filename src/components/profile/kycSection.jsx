import { useState } from "react";
import { Check } from "lucide-react";
import "./kycSection.css";
import IndividualKycForm from "./kycparts/Individual";
import BusinessKycForm from "./kycparts/Business";
import Images from "../../Images/Images";
import { IoCloseCircleOutline } from "react-icons/io5";


export default function KycDetails() {
  // view: 'incomplete' | 'selection' | 'form'
  const [view, setView] = useState("incomplete");
  const [kycType, setKycType] = useState("individual"); // 'individual' | 'company'

  // Handlers
  const handleStartKyc = () => setView("selection");
  const handleCloseSelection = () => setView("incomplete");
  const handleNext = () => setView("form");

  // --- Render View 1: Incomplete ---
  if (view === "incomplete") {
    return (
      <div className="kyc-container-no">
        <div className="kyc-incomplete-wrapper">
          <div className="kyc-illustration">
            {/* Using a Lucide Shield icon as a placeholder for the graphical illustration */}
            <div className="kyc-shield-icon">
              <img src={Images.kyccomplete} alt="KYC Complete Illustration" />
            </div>
          </div>
          <h2 className="kyc-title-large">KYC incomplete!</h2>
          <p className="kyc-subtitle">
            Looks like your KYC verification is not yet complete. Please click
            on Complete KYC to finish the process, or click Refresh if you have
            already completed your verification.
          </p>
          <button className="btn-primary" onClick={handleStartKyc}>
            Complete KYC
          </button>
        </div>
      </div>
    );
  }

  // --- Render View 2: Selection ---
  if (view === "selection") {
    return (
      <div className="kyc-container-base">
        <div className="kyc-selection-wrapper">
          <div className="kyc-selection-header">
            <div>
              <h2 className="kyc-selection-title">Verify account</h2>
              <p className="kyc-selection-subtitle">
                Identify verification, you have to complete both steps to verify
                account
              </p>
            </div>
            <button className="close-btn" onClick={handleCloseSelection}>
              <IoCloseCircleOutline size={25} />
            </button>
          </div>

          <div className="selection-card-container">
            <h3 className="selection-card-title">Complete KYC</h3>
            <p className="selection-card-desc">
              Choose any one way to complete KYC
            </p>

            {/* Individual Option */}
            <div
              className={`kyc-option-card ${kycType === "individual" ? "selected" : ""}`}
              onClick={() => setKycType("individual")}
            >
              <div className="checkbox-visual">
                {kycType === "individual" && (
                  <Check size={14} strokeWidth={4} />
                )}
              </div>
              <div className="option-text">
                <h4>Individual KYC</h4>
                <p>Enter PAN and aadhar details</p>
              </div>
            </div>

            {/* Business Option */}
            <div
              className={`kyc-option-card ${kycType === "company" ? "selected" : ""}`}
              onClick={() => setKycType("company")}
            >
              <div className="checkbox-visual">
                {kycType === "company" && <Check size={14} strokeWidth={4} />}
              </div>
              <div className="option-text">
                <h4>Business KYC</h4>
                <p>Enter company PAN and CIN number</p>
              </div>
            </div>
          </div>
          <div className="kyc-footer">
            <button className="btn-primary btn-full" onClick={handleNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {kycType === "company" ? (
        <>
          <BusinessKycForm onBack={() => setView("selection")} />
        </>
      ) : (
        <IndividualKycForm onBack={() => setView("selection")} />
      )}
    </>
  );
}
