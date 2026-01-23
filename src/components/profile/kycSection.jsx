
import { useState } from "react";
import { Pencil, Upload } from "lucide-react";
import CompanyKycForm from "./kycparts/company";
import IndividualKycForm from "./kycparts/indivisual";
import "./kycSection.css";

export default function KycDetails() {
    const [kycType, setKycType] = useState("company");

    return (
        <div className="kyc-container">

            {/* KYC Header */}
            <div className="kyc-header">
                <h3 className="kyc-title">KYC Details</h3>
            </div>

            {/* Toggle */}
            <div className="kyc-tabs">
                <button
                    onClick={() => setKycType("company")}
                    className={`kyc-tab-btn ${kycType === "company" ? "active" : "inactive"}`}
                >
                    Company KYC
                </button>

                <button
                    onClick={() => setKycType("individual")}
                    className={`kyc-tab-btn ${kycType === "individual" ? "active" : "inactive"}`}
                >
                    Individual KYC
                </button>
            </div>

            {/* Render KYC Forms */}
            {kycType === "company" ? <CompanyKycForm /> : <IndividualKycForm />}
        </div>
    );
}
