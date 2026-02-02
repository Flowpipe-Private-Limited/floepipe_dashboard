import { useState, useRef } from "react";
import { Paperclip } from "lucide-react";

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
      // Final submit
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

  // --- Render Step 3: Review / Summary ---
  if (step === 3) {
    return (
      <div className="review-wrapper">
        <h2 className="review-header">Individual KYC</h2>

        {/* Section 1: Pan Details */}
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

        {/* Section 2: Aadhaar details */}
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
        </div>

        <div className="review-field" style={{ marginBottom: "1rem" }}>
          <p>Gender</p>
          <input
            type="text"
            className="review-input"
            value={formData.gender || "Male"}
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
            Cancel
          </button>
          <button
            className="btn-verify"
            onClick={() => console.log("Final Submit")}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  // --- Render Steps 1 & 2 ---
  return (
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
            {/* <div className="form-field">
              <span className="field-title">Name</span>
              <input
                type="text"
                className="custom-input"
                placeholder="Enter Name on PAN"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div> */}

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

            <div className="form-field">
              <div className="file-upload-box" onClick={handleFileClick}>
                <Paperclip size={18} />
                <span>
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

            <div className="form-field">
              <div className="file-upload-box" onClick={handleFileClick}>
                <Paperclip size={18} />
                <span>
                  {formData.file
                    ? formData.file.name
                    : "Upload your files here"}
                </span>
              </div>
            </div>
          </div>
        )}
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
  );
}
