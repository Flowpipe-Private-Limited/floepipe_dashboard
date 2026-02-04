import { useState, useRef } from "react";
import { Paperclip } from "lucide-react";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function IndividualKycForm({ onBack }) {
  // Step 1: PAN, Step 2: Aadhaar, Step 3: Review
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    pan: "",
    aadhaar: "",
    address: "",
    gender: "",
    useCase: "",
    file: null,
  });

  const handleNext = () => {
    if (step < 3) setStep((prev) => prev + 1);
    else {
      console.log("Submitting...", formData);
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
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleusecaseChange = (e) => {
    setFormData({ ...formData, useCase: e.target.value });
  };

  if (step === 3) {
    return (
      <div className="individual-main-width">
        <div className="review-wrapper">
          <h2 className="review-header">Individual KYC</h2>

          <h3 className="review-section-title">Pan details</h3>
          <div className="review-grid">
            <div className="review-field">
              <p>Name on PAN card</p>
              <input
                type="text"
                className="review-input"
                value={formData.name || "chennuri srikanth"}
                readOnly
              />
            </div>
            <div className="review-field">
              <p>PAN number</p>
              <input
                type="text"
                className="review-input"
                value={formData.pan || "******5641"}
                readOnly
              />
            </div>
          </div>

          <h3 className="review-section-title">Aadhaar details</h3>
          <div className="review-grid">
            <div className="review-field">
              <p>Aadhaar number</p>
              <input
                type="text"
                className="review-input"
                value={formData.aadhaar || "********6343"}
                readOnly
              />
            </div>
            <div className="review-field">
              <p>Address</p>
              <input
                type="text"
                className="review-input"
                value={formData.address || "Telangana"}
                readOnly
              />
            </div>
            <div
              className="review-field col-span-1"
              style={{ marginBottom: "1rem" }}
            >
              <p>Gender</p>
              <input
                type="text"
                className="review-input"
                value={formData.gender || "Male"}
                readOnly
              />
            </div>
          </div>

          {/* Use Case */}
          <div className="review-field" style={{ marginBottom: "1rem" }}>
            <p>Use case</p>
            <textarea
              className="review-input"
              rows={2}
              onChange={handleusecaseChange}
              placeholder="knowing test cases"
              // value={formData.useCase || "knowing test cases"}
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
              Cancel
            </button>
            <button
              style={{ fontFamily: "JetBrainsMono" }}
              className="btn-verify"
              onClick={() => console.log("Final Submit")}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Render Steps 1 & 2 ---
  return (
    <>
      <div className="kyc-container-base">
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
          <h2 className="ind-kyc-header">Individual KYC</h2>

          {/* Stepper */}
          <div className="stepper-container">
            <div
              className={`stepper-step ${step >= 1 ? "active" : ""} ${step > 1 ? "completed" : ""}`}
            >
              <div className="step-circle">1</div>
              <span className="step-label">PAN Card verification</span>
            </div>
            <div className={`stepper-line ${step >= 2 ? "filled" : ""}`}></div>
            <div className={`stepper-step ${step >= 2 ? "active" : ""}`}>
              <div className="step-circle">2</div>
              <span className="step-label">Aadhaar card verification</span>
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

            {step === 1 && (
              <div className="form-step-1">
                <div className="form-field">
                  <span className="field-title">PAN number</span>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Enter PAN Number"
                    value={formData.pan}
                    onChange={(e) =>
                      setFormData({ ...formData, pan: e.target.value })
                    }
                  />
                </div>

                <div className="form-field-upload">
                  <div className="file-upload-box" onClick={handleFileClick}>
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
                      {formData.file
                        ? formData.file.name
                        : "Upload your files here"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="form-step-2">
                <div className="form-field">
                  <span className="field-title">Aadhaar number</span>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="Enter Aadhaar Number"
                    value={formData.aadhaar}
                    onChange={(e) =>
                      setFormData({ ...formData, aadhaar: e.target.value })
                    }
                  />
                </div>

                <div className="form-field-upload">
                  <div className="file-upload-box" onClick={handleFileClick}>
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
                      {formData.file
                        ? formData.file.name
                        : "Upload your files here"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Actions */}
        <div className="form-actions">
          <button className="btn-back" onClick={handleBack}>
            Back
          </button>
          <button className="btn-verify" onClick={handleNext}>
            {step === 1 ? "Next" : "Verify"}
          </button>
        </div>
      </div>
    </>
  );
}
