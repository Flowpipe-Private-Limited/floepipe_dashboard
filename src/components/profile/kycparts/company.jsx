import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    setKycData(initialKycData);
  }, [users]);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setKycData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileUpload = (field, e) => {
    const file = e.target.files?.[0];
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

  const handleEdit = () => setIsEditing((prev) => !prev);

  const handleSubmit = () => {
    updateUsers({
      ...users,
      companyKYC: kycData,
    });

    setIsEditing(false);
    alert("Company KYC updated!");
  };

  const handleCancel = () => {
    setKycData(initialKycData);
    setIsEditing(false);
  };

  return (
    <div>
      <header className={styles.formHeader}>
        <h2>Company KYC</h2>

        <button
          onClick={handleEdit}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
        </button>
      </header>

      <div className={styles.formGrid}>
        {/* Company PAN */}
        <div className={styles.formGroup}>
          <label>Company PAN number</label>
          <input
            id="companyPan"
            value={kycData.companyPan}
            onChange={handleChange}
            readOnly={!isEditing}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.companyPanFileName || "Upload PAN file"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("companyPanFile", e)}
                style={{ display: "none" }}
              />
            </label>
          )}

          {!isEditing && kycData.companyPanFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.companyPanFileName}
            </span>
          )}
        </div>

        {/* Company CIN */}
        <div className={styles.formGroup}>
          <label>Company CIN number</label>
          <input
            id="companyCin"
            value={kycData.companyCin}
            onChange={handleChange}
            readOnly={!isEditing}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.companyCinFileName || "Upload CIN file"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("companyCinFile", e)}
                style={{ display: "none" }}
              />
            </label>
          )}

          {!isEditing && kycData.companyCinFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.companyCinFileName}
            </span>
          )}
        </div>

        {/* Director PAN */}
        <div className={styles.formGroup}>
          <label>Director PAN number</label>
          <input
            id="directorPan"
            value={kycData.directorPan}
            onChange={handleChange}
            readOnly={!isEditing}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.directorPanFileName || "Upload Director PAN file"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("directorPanFile", e)}
                style={{ display: "none" }}
              />
            </label>
          )}

          {!isEditing && kycData.directorPanFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.directorPanFileName}
            </span>
          )}
        </div>

        {/* Director Aadhaar */}
        <div className={styles.formGroup}>
          <label>Director Aadhaar number</label>
          <input
            id="directorAadhaar"
            value={kycData.directorAadhaar}
            onChange={handleChange}
            readOnly={!isEditing}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.directorAadhaarFileName || "Upload Aadhaar file"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("directorAadhaarFile", e)}
                style={{ display: "none" }}
              />
            </label>
          )}

          {!isEditing && kycData.directorAadhaarFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.directorAadhaarFileName}
            </span>
          )}
        </div>
      </div>

      {/* Use Case */}
      <div className={styles.formGroupWide}>
        <label>Use case</label>
        <textarea
          id="useCase"
          rows="3"
          value={kycData.useCase}
          onChange={handleChange}
          readOnly={!isEditing}
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Approval Status */}
      <div className={styles.formGroupWide}>
        <label>Approval status</label>
        <input
          id="approvalStatus"
          value={kycData.approvalStatus}
          readOnly
          className={
            kycData.approvalStatus === "Pending" ? styles.statusPending : ""
          }
        />
      </div>

      {/* Footer Buttons */}
      {isEditing && (
        <footer className={styles.formFooter}>
          <button className={styles.cancelButton} onClick={handleCancel}>
            Cancel
          </button>

          <button className={styles.submitButton} onClick={handleSubmit}>
            Save
          </button>
        </footer>
      )}
    </div>
  );
};

export default CompanyKycForm;
