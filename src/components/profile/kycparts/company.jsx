import React, { useState, useEffect, useRef } from "react";
import styles from "./KycForm.module.css";
import { FaUpload } from "react-icons/fa";
import { useUserStore } from "../../../Store/userStore";
import { Pencil } from "lucide-react";

const CompanyKycForm = () => {
  const { users, updateUsers } = useUserStore();

  const initialKycData = users?.companyKYC || {
    companyPan: "",
    companyPanFile: null,
    companyPanFileName: "",

    companyCin: "",
    companyCinFile: null,
    companyCinFileName: "",

    directorPan: "",
    directorPanFile: null,
    directorPanFileName: "",

    directorAadhaar: "",
    directorAadhaarFile: null,
    directorAadhaarFileName: "",

    useCase: "",
    approvalStatus: "Pending",
  };

  const [kycData, setKycData] = useState(initialKycData);
  const [isEditing, setIsEditing] = useState(false);

  // Refs for file inputs
  const panRef = useRef();
  const cinRef = useRef();
  const directorPanRef = useRef();
  const aadhaarRef = useRef();

  useEffect(() => {
    setKycData(initialKycData);
  }, [users]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setKycData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (field, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setKycData((prev) => ({
        ...prev,
        [field]: event.target.result,
        [`${field}Name`]: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    updateUsers({ ...users, companyKYC: kycData });
    setIsEditing(false);
    alert("Company KYC updated!");
  };

  const handleCancel = () => {
    setKycData(initialKycData);
    setIsEditing(false);
  };

  return (
    <div>
      {/* Header */}
      <header className={styles.formHeader}>
        <h2>Company KYC</h2>
        <button
          onClick={() => setIsEditing((p) => !p)}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
        </button>
      </header>

      <div className={styles.formGrid}>
        {/* Company PAN */}
        <div className={styles.formGroup}>
          <input
            id="companyPan"
            value={kycData.companyPan}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Company PAN Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => panRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.companyPanFileName || "Upload Company PAN"}
              </button>
              <input
                ref={panRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("companyPanFile", e.target.files[0])
                }
              />
            </>
          )}
        </div>

        {/* Company CIN */}
        <div className={styles.formGroup}>
          <input
            id="companyCin"
            value={kycData.companyCin}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Company CIN Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => cinRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.companyCinFileName || "Upload Company CIN"}
              </button>
              <input
                ref={cinRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("companyCinFile", e.target.files[0])
                }
              />
            </>
          )}
        </div>

        {/* Director PAN */}
        <div className={styles.formGroup}>
          <input
            id="directorPan"
            value={kycData.directorPan}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Director PAN Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => directorPanRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.directorPanFileName || "Upload Director PAN"}
              </button>
              <input
                ref={directorPanRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("directorPanFile", e.target.files[0])
                }
              />
            </>
          )}
        </div>

        {/* Director Aadhaar */}
        <div className={styles.formGroup}>
          <input
            id="directorAadhaar"
            value={kycData.directorAadhaar}
            onChange={handleChange}
            readOnly={!isEditing}
            placeholder="Director Aadhaar Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => aadhaarRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.directorAadhaarFileName || "Upload Aadhaar"}
              </button>
              <input
                ref={aadhaarRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("directorAadhaarFile", e.target.files[0])
                }
              />
            </>
          )}
        </div>
      </div>

      {/* Use Case */}
      <div className={styles.formGroupWide}>
        <textarea
          id="useCase"
          rows="3"
          value={kycData.useCase}
          onChange={handleChange}
          readOnly={!isEditing}
          placeholder="Describe your business use case"
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Approval Status */}
      <div className={styles.formGroupWide}>
        <input
          value={kycData.approvalStatus}
          readOnly
          placeholder="Approval Status"
          className={styles.statusPending}
        />
      </div>

      {isEditing && (
        <footer className={styles.formFooter}>
          <button onClick={handleCancel} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={styles.submitButton}>
            Save
          </button>
        </footer>
      )}
    </div>
  );
};

export default CompanyKycForm;
