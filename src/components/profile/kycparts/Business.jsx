import { useState, useRef } from "react";
import { Paperclip } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useUserStore } from "../../../Store/userStore";

export default function BusinessKycForm({ onBack }) {
  // Steps: 1. Company PAN, 2. Company CIN, 3. Director PAN, 4. Director Aadhaar, 5. GST Number, 6. Review
  const { users, IskycApproved, kycCompleted, updateUsers, isCompany, businessKycData, setBusinessKycData } = useUserStore();
  // Steps: 1. Company PAN, 2. Company CIN, 3. Director PAN, 4. Director Aadhaar, 5. GST Number, 6. Review
  const [step, setStep] = useState(isCompany ? 6 : 1);
  const fileInputRef = useRef(null);


  // Form state
  const [formData, setFormData] = useState(businessKycData || {
    companyPan: "",
    companyPanFile: null,
    companyCin: "",
    companyCinFile: null,
    directorPan: "",
    directorPanFile: null,
    directorAadhaar: "",
    directorAadhaarFile: null,
    gstNumber: "",
    gstNumberFile: null,
    useCase: "",
  });

  const handleNext = () => {
    if (step < 6) setStep((prev) => prev + 1);
    else {
      console.log("Submitting Business KYC...", formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
    else if (onBack) onBack();
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (step === 1) setFormData({ ...formData, companyPanFile: file });
      if (step === 2) setFormData({ ...formData, companyCinFile: file });
      if (step === 3) setFormData({ ...formData, directorPanFile: file });
      if (step === 4) setFormData({ ...formData, directorAadhaarFile: file });
      if (step === 5) setFormData({ ...formData, gstNumberFile: file });
    }
  };

  // --- Render Step 6: Review / Summary ---
  if (step === 6) {
    return (
      <div className="individual-main-width">
        <div className="review-wrapper">
          <h2 className="review-header">Company KYC</h2>

          {/* Section 1: Company Details */}
          <h3 className="review-section-title">Company KYC</h3>
          <div className="review-grid">
            <div className="review-field">
              <p>Company PAN number</p>
              <input
                type="text"
                className="review-input"
                value={formData.companyPan || "nnjuguyfdsb"}
                readOnly
              />
            </div>
            <div className="review-field">
              <p>Company CIN number</p>
              <input
                type="text"
                className="review-input"
                value={formData.companyCin || "******5641"}
                readOnly
              />
            </div>
          </div>

          {/* Section 2: Director Details */}
          <div className="review-grid">
            <div className="review-field">
              <p>Director PAN number</p>
              <input
                type="text"
                className="review-input"
                value={formData.directorPan || "gdfuaifcsaiucv"}
                readOnly
              />
            </div>
            <div className="review-field">
              <p>Director Aadhaar number</p>
              <input
                type="text"
                className="review-input"
                value={formData.directorAadhaar || "******5641"}
                readOnly
              />
            </div>
          </div>

          {/* GST */}
          <div className="review-field" style={{ marginBottom: "1rem" }}>
            <p>GST Number</p>
            <input
              type="text"
              className="review-input"
              value={formData.gstNumber || "gdfuaifcsaiucv"}
              readOnly
            />
          </div>

          {/* Use Case */}
          <div className="review-field" style={{ marginBottom: "1rem" }}>
            <p>Use case</p>
            <textarea
              className="review-input"
              rows={2}
              readOnly
              value={formData.useCase || "knowing test cases"}
            />
          </div>

          {/* Status */}
          <div className="review-field">
            <p>Approval status</p>
            <input
              type="text"
              className="review-input status-input"
              value="Pending"
              readOnly
            />
          </div>

          {/* Actions */}
          <div className="review-actions">
            <button className="btn-cancel" onClick={() => setStep(1)}>
              Back
            </button>
            <button
              className="btn-verify"
              onClick={() => {
                console.log("Final Business Submit", formData);
                setBusinessKycData(formData);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Steps 1-5 ---
  return (
    <div className="kyc-container-business">
      <div className="kyc-header">
        <div>
          <h3 className="kyc-title">Verify Account</h3>
          <p className="sub-one-kyc">
            Identity verification, you have to complete both steps to verify
            account
          </p>
        </div>
        <button className="close-btn" onClick={() => setView("selection")}>
          <IoCloseCircleOutline size={25} />
        </button>
      </div>
      <div className="individual-kyc-wrapper">
        {" "}
        {/* Reusing wrapper style */}
        <h2 className="ind-kyc-header">Company KYC</h2>
        {/* Stepper - 5 Steps */}
        <div className="stepper-container">
          {/* Step 1 */}
          <div
            className={`stepper-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
          >
            <div className="step-circle">1</div>
            <span className="step-label">Company PAN</span>
          </div>
          <div className={`stepper-line ${step >= 2 ? "filled" : ""}`}></div>

          {/* Step 2 */}
          <div
            className={`stepper-step ${step >= 2 ? "active" : ""} ${step > 2 ? "completed" : ""}`}
          >
            <div className="step-circle">2</div>
            <span className="step-label">Company CIN</span>
          </div>
          <div className={`stepper-line ${step >= 3 ? "filled" : ""}`}></div>

          {/* Step 3 */}
          <div
            className={`stepper-step ${step >= 3 ? "active" : ""} ${step > 3 ? "completed" : ""}`}
          >
            <div className="step-circle">3</div>
            <span className="step-label">Director PAN</span>
          </div>
          <div className={`stepper-line ${step >= 4 ? "filled" : ""}`}></div>

          {/* Step 4 */}
          <div
            className={`stepper-step ${step >= 4 ? "active" : ""} ${step > 4 ? "completed" : ""}`}
          >
            <div className="step-circle">4</div>
            <span className="step-label">Director Aadhaar</span>
          </div>
          <div className={`stepper-line ${step >= 5 ? "filled" : ""}`}></div>

          {/* Step 5 */}
          <div
            className={`stepper-step ${step >= 5 ? "active" : ""} ${step > 5 ? "completed" : ""}`}
          >
            <div className="step-circle">5</div>
            <span className="step-label">GST Number</span>
          </div>
        </div>
        {/* Form Content */}
        <div className="form-content">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          {/* Dynamic Field rendering based on step */}
          <div className="form-field">
            <span className="field-title">
              {step === 1 && "Company PAN"}
              {step === 2 && "Company CIN"}
              {step === 3 && "Director PAN"}
              {step === 4 && "Director Aadhaar"}
              {step === 5 && "GST Number"}
            </span>
            <input
              style={{ width: "80%" }}
              type="text"
              className="custom-input"
              placeholder={`Enter ${step === 1
                ? "Company PAN"
                : step === 2
                  ? "Company CIN"
                  : step === 3
                    ? "Director PAN"
                    : step === 4
                      ? "Director Aadhaar"
                      : "GST Number"
                }`}
              value={
                step === 1
                  ? formData.companyPan
                  : step === 2
                    ? formData.companyCin
                    : step === 3
                      ? formData.directorPan
                      : step === 4
                        ? formData.directorAadhaar
                        : formData.gstNumber
              }
              onChange={(e) => {
                const val = e.target.value;
                if (step === 1) setFormData({ ...formData, companyPan: val });
                if (step === 2) setFormData({ ...formData, companyCin: val });
                if (step === 3) setFormData({ ...formData, directorPan: val });
                if (step === 4)
                  setFormData({ ...formData, directorAadhaar: val });
                if (step === 5) setFormData({ ...formData, gstNumber: val });
              }}
            />
          </div>

          <div className="form-field">
            <div className="file-upload-box-business" onClick={handleFileClick}>
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M13.4489 9.40921L17 12.8664L15.8623 13.9741L14.2534 12.4081V16H12.6444V12.4081L11.0355 13.9741L9.8978 12.8664L13.4489 9.40921ZM7.99883 0L9.02294 0.997811L2.46248 7.38404C1.10938 8.70216 1.10938 10.8458 2.46248 12.1631C3.11813 12.8014 3.99016 13.1531 4.91691 13.1531C5.84366 13.1531 6.71572 12.8014 7.37134 12.1631L13.8618 5.84424C14.6687 5.0587 14.6687 3.78128 13.8618 2.99575C13.0799 2.2337 11.7163 2.23605 10.9359 2.99497L4.57986 9.17829C4.44629 9.30833 4.3731 9.48139 4.3731 9.66547C4.3731 9.84954 4.44629 10.0226 4.58065 10.1526C4.84775 10.415 5.31512 10.4134 5.58222 10.1526L10.9183 4.9584L11.9423 5.95621L6.60712 11.1504C5.76484 11.9688 4.39723 11.9673 3.55658 11.1504C2.71588 10.3319 2.71588 8.99895 3.55658 8.18129L9.91262 1.99874C10.5755 1.3526 11.4596 0.996233 12.3993 0.996233C13.3381 0.996233 14.2214 1.35179 14.8866 1.99874C16.2575 3.33409 16.2575 5.5067 14.8866 6.84205L8.39545 13.1601C7.46629 14.0647 6.23142 14.5628 4.91691 14.5628C3.60322 14.5628 2.36756 14.0647 1.4384 13.1601C-0.479466 11.293 -0.479466 8.25416 1.4384 6.38703L7.99883 0Z"
                  fill="#7E48FF"
                />
              </svg>

              <span className="upload-place">
                {step === 1 &&
                  (formData.companyPanFile
                    ? formData.companyPanFile.name
                    : "Upload Company PAN")}
                {step === 2 &&
                  (formData.companyCinFile
                    ? formData.companyCinFile.name
                    : "Upload Company CIN")}
                {step === 3 &&
                  (formData.directorPanFile
                    ? formData.directorPanFile.name
                    : "Upload Director PAN")}
                {step === 4 &&
                  (formData.directorAadhaarFile
                    ? formData.directorAadhaarFile.name
                    : "Upload Director Aadhaar")}
                {step === 5 &&
                  (formData.gstNumberFile
                    ? formData.gstNumberFile.name
                    : "Upload GST Certificate")}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="form-actions">
        <button className="btn-back" onClick={handleBack}>
          Back
        </button>
        <button
          className="btn-verify"
          onClick={handleNext}
          disabled={
            (step === 1 && (!formData.companyPan || !formData.companyPanFile)) ||
            (step === 2 && (!formData.companyCin || !formData.companyCinFile)) ||
            (step === 3 && (!formData.directorPan || !formData.directorPanFile)) ||
            (step === 4 && (!formData.directorAadhaar || !formData.directorAadhaarFile)) ||
            (step === 5 && (!formData.gstNumber || !formData.gstNumberFile))
          }
        >
          {step === 5 ? "Verify" : "Next"}
        </button>
      </div>
    </div>
  );
}
