import React, { useState, useEffect } from "react";
import styles from "./KycForm.module.css";
import { useUserStore } from "../../../Store/userStore";
import { FaUpload } from "react-icons/fa";
import { Pencil } from "lucide-react";

const IndividualKycForm = () => {
  const { users, updateUsers } = useUserStore();

  const initialKycData =
    users?.IndividualKYC || {
      panName: "",
      panNumber: "",
      panFile: null,
      panFileName: "",
      aadhaarNumber: "",
      address: "",
      aadhaarFile: null,
      aadhaarFileName: "",
      gender: "",
      useCase: "",
      approvalStatus: "",
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
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (r) => {
      setKycData((prev) => ({
        ...prev,
        [field]: r.target.result,
        [`${field}Name`]: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = () => setIsEditing(!isEditing);

  const handleSubmit = () => {
    updateUsers({
      ...users,
      IndividualKYC: kycData,
    });

    setIsEditing(false);
    alert("Individual KYC updated successfully!");
  };

  const handleCancel = () => {
    setKycData(initialKycData);
    setIsEditing(false);
  };

  return (
    <div>
      <header className={styles.formHeader}>
        <h2>Individual KYC</h2>
        <button
          onClick={handleEdit}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
        </button>
      </header>

      <hr className={styles.divider} />

      {/* PAN DETAILS */}
      <div className={styles.sectionTitle}>Pan details</div>
      <div className={styles.formGrid}>

        {/* Pan Name */}
        <div className={styles.formGroup}>
          <label>Name on PAN card</label>
          <input
            id="panName"
            type="text"
            value={kycData.panName}
            readOnly={!isEditing}
            onChange={handleChange}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {/* File Upload */}
          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.panFileName || "Upload PAN"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("panFile", e)}
                hidden
              />
            </label>
          )}
          {!isEditing && kycData.panFileName && (
            <span className={styles.fileNameDisplay}>
              File: {kycData.panFileName}
            </span>
          )}
        </div>

        {/* PAN Number */}
        <div className={styles.formGroup}>
          <label>PAN number</label>
          <input
            id="panNumber"
            type="text"
            value={kycData.panNumber}
            readOnly={!isEditing}
            onChange={handleChange}
            className={!isEditing ? styles.readOnlyInput : ""}
          />
        </div>
      </div>

      <hr className={styles.divider} />

      {/* AADHAAR DETAILS */}
      <div className={styles.sectionTitle}>Aadhaar details</div>
      <div className={styles.formGrid}>

        {/* Aadhaar Number */}
        <div className={styles.formGroup}>
          <label>Aadhaar number</label>
          <input
            id="aadhaarNumber"
            type="text"
            value={kycData.aadhaarNumber}
            readOnly={!isEditing}
            onChange={handleChange}
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {/* File Upload */}
          {isEditing && (
            <label className={styles.uploadButton}>
              <FaUpload size={14} />
              {kycData.aadhaarFileName || "Upload Aadhaar"}
              <input
                type="file"
                onChange={(e) => handleFileUpload("aadhaarFile", e)}
                hidden
              />
            </label>
          )}
          {!isEditing && kycData.aadhaarFileName && (
            <span className={styles.fileNameDisplay}>
              File: {kycData.aadhaarFileName}
            </span>
          )}
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            id="address"
            type="text"
            value={kycData.address}
            readOnly={!isEditing}
            onChange={handleChange}
            className={!isEditing ? styles.readOnlyInput : ""}
          />
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Gender */}
      <div className={styles.formGroupWide}>
        <label>Gender</label>
        <input
          id="gender"
          type="text"
          value={kycData.gender}
          readOnly={!isEditing}
          onChange={handleChange}
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Use Case */}
      <div className={styles.formGroupWide}>
        <label>Use case</label>
        <textarea
          id="useCase"
          rows="3"
          value={kycData.useCase}
          readOnly={!isEditing}
          onChange={handleChange}
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Approval Status */}
      <div className={styles.formGroupWide}>
        <label>Approval status</label>
        <input
          id="approvalStatus"
          readOnly
          value={users.approvalStatus}
        />
      </div>

      <hr className={styles.divider} />

      {isEditing && (
        <footer className={styles.formFooterRight}>
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

export default IndividualKycForm;
