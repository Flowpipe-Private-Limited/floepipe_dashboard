
import { useState, useRef } from "react";
import { Paperclip } from "lucide-react";

export default function BusinessKycForm({ onBack }) {
  // Steps: 1. Company PAN, 2. Company CIN, 3. Director PAN, 4. Director Aadhaar, 5. GST Number, 6. Review
  const [step, setStep] = useState(1);
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    companyPan: "",
    companyCin: "",
    directorPan: "",
    directorAadhaar: "",
    gstNumber: "",
    useCase: "",
    file: null
  });

  const handleNext = () => {
    if (step < 6) setStep(prev => prev + 1);
    else {
      console.log("Submitting Business KYC...", formData);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
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

  // --- Render Step 6: Review / Summary ---
  if (step === 6) {
    return (
      <div className="review-wrapper">
        <h2 className="review-header">Company KYC</h2>

        {/* Section 1: Company Details */}
        <h3 className="review-section-title">Company KYC</h3>
        <div className="review-grid">
          <div className="review-field">
            <p>Company PAN number</p>
            <input type="text" className="review-input" value={formData.companyPan || "nnjuguyfdsb"} readOnly />
          </div>
          <div className="review-field">
            <p>Company CIN number</p>
            <input type="text" className="review-input" value={formData.companyCin || "******5641"} readOnly />
          </div>
        </div>

        {/* Section 2: Director Details */}
        <div className="review-grid">
          <div className="review-field">
            <p>Director PAN number</p>
            <input type="text" className="review-input" value={formData.directorPan || "gdfuaifcsaiucv"} readOnly />
          </div>
          <div className="review-field">
            <p>Director Aadhaar number</p>
            <input type="text" className="review-input" value={formData.directorAadhaar || "******5641"} readOnly />
          </div>
        </div>

        {/* GST */}
        <div className="review-field" style={{ marginBottom: '1rem' }}>
          <p>GST Number</p>
          <input type="text" className="review-input" value={formData.gstNumber || "gdfuaifcsaiucv"} readOnly />
        </div>

        {/* Use Case */}
        <div className="review-field" style={{ marginBottom: '1rem' }}>
          <p>Use case</p>
          <textarea className="review-input" rows={2} readOnly value={formData.useCase || "knowing test cases"} />
        </div>

        {/* Status */}
        <div className="review-field">
          <p>Approval status</p>
          <input type="text" className="review-input status-input" value="Pending" readOnly />
        </div>

        {/* Actions */}
        <div className="review-actions">
          <button className="btn-cancel" onClick={() => setStep(1)}>Back</button>
          <button className="btn-verify" onClick={() => console.log("Final Business Submit")}>Submit</button>
        </div>
      </div>
    );
  }

  // --- Render Steps 1-5 ---
  return (
    <div className="individual-kyc-wrapper"> {/* Reusing wrapper style */}
      <h2 className="ind-kyc-header">Company KYC</h2>

      {/* Stepper - 5 Steps */}
      <div className="stepper-container" style={{ maxWidth: '800px' }}> {/* Wider for 5 steps */}

        {/* Step 1 */}
        <div className={`stepper-step ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-circle">1</div>
          <span className="step-label" style={{ fontSize: '0.75rem' }}>Company PAN</span>
        </div>
        <div className={`stepper-line ${step >= 2 ? 'filled' : ''}`}></div>

        {/* Step 2 */}
        <div className={`stepper-step ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-circle">2</div>
          <span className="step-label" style={{ fontSize: '0.75rem' }}>Company CIN</span>
        </div>
        <div className={`stepper-line ${step >= 3 ? 'filled' : ''}`}></div>

        {/* Step 3 */}
        <div className={`stepper-step ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>
          <div className="step-circle">3</div>
          <span className="step-label" style={{ fontSize: '0.75rem' }}>Director PAN</span>
        </div>
        <div className={`stepper-line ${step >= 4 ? 'filled' : ''}`}></div>

        {/* Step 4 */}
        <div className={`stepper-step ${step >= 4 ? 'active' : ''} ${step > 4 ? 'completed' : ''}`}>
          <div className="step-circle">4</div>
          <span className="step-label" style={{ fontSize: '0.75rem' }}>Director Aadhaar</span>
        </div>
        <div className={`stepper-line ${step >= 5 ? 'filled' : ''}`}></div>

        {/* Step 5 */}
        <div className={`stepper-step ${step >= 5 ? 'active' : ''} ${step > 5 ? 'completed' : ''}`}>
          <div className="step-circle">5</div>
          <span className="step-label" style={{ fontSize: '0.75rem' }}>GST Number</span>
        </div>

      </div>

      {/* Form Content */}
      <div className="form-content">
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
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
            type="text"
            className="custom-input"
            placeholder={`Enter ${step === 1 ? "Company PAN" :
                step === 2 ? "Company CIN" :
                  step === 3 ? "Director PAN" :
                    step === 4 ? "Director Aadhaar" : "GST Number"
              }`}
            value={
              step === 1 ? formData.companyPan :
                step === 2 ? formData.companyCin :
                  step === 3 ? formData.directorPan :
                    step === 4 ? formData.directorAadhaar : formData.gstNumber
            }
            onChange={(e) => {
              const val = e.target.value;
              if (step === 1) setFormData({ ...formData, companyPan: val });
              if (step === 2) setFormData({ ...formData, companyCin: val });
              if (step === 3) setFormData({ ...formData, directorPan: val });
              if (step === 4) setFormData({ ...formData, directorAadhaar: val });
              if (step === 5) setFormData({ ...formData, gstNumber: val });
            }}
          />
        </div>

        <div className="form-field">
          <div className="file-upload-box" onClick={handleFileClick}>
            <Paperclip size={18} />
            <span>{formData.file ? formData.file.name : "Upload your files here"}</span>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="form-actions">
        <button className="btn-back" onClick={handleBack}>
          Back
        </button>
        <button className="btn-verify" onClick={handleNext}>
          {step === 5 ? 'Verify' : 'Next'}
        </button>
      </div>
    </div>
  );
}
