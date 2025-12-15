
import { useState } from "react";
import { Pencil, Upload } from "lucide-react";
import CompanyKycForm from "./kycparts/company";
import IndividualKycForm from "./kycparts/indivisual";

export default function KycDetails() {
    const [kycType, setKycType] = useState("company");

    return (
        <div className="bg-white rounded-xl shadow p-6 border">

            {/* KYC Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">KYC Details</h3>
            </div>

            {/* Toggle */}
            <div className="flex mb-8 border-b border-gray-200">
                <button
                    onClick={() => setKycType("company")}
                    className={`py-2 px-4 text-center font-medium transition duration-300 ease-in-out border-b-2
            ${kycType === "company"
                            ? "border-purple-600 text-purple-700 bg-purple-50"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Company KYC
                </button>

                <button
                    onClick={() => setKycType("individual")}
                    className={`py-2 px-4 text-center font-medium transition duration-300 ease-in-out border-b-2
            ${kycType === "individual"
                            ? "border-purple-600 text-purple-700 bg-purple-50"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                >
                    Individual KYC
                </button>
            </div>

            {/* Render KYC Forms */}
            {kycType === "company" ? <CompanyKycForm /> : <IndividualKycForm />}
        </div>
    );
}
