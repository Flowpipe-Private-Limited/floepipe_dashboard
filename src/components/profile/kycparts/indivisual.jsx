import React, { useState, useEffect, useRef } from "react";
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
      approvalStatus: "Pending",
    };

  const [kycData, setKycData] = useState(initialKycData);
  const [isEditing, setIsEditing] = useState(false);

  // File input refs
  const panFileRef = useRef();
  const aadhaarFileRef = useRef();

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
    reader.onload = (r) => {
      setKycData((prev) => ({
        ...prev,
        [field]: r.target.result,
        [`${field}Name`]: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

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
      {/* Header */}
      <header className={styles.formHeader}>
        <h2>Individual KYC</h2>
        <button
          onClick={() => setIsEditing((p) => !p)}
          className={styles.editButton}
        >
          {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
        </button>
      </header>

      <hr className={styles.divider} />

      {/* PAN DETAILS */}
      <div className={styles.sectionTitle}>PAN Details</div>
      <div className={styles.formGrid}>
        {/* Name on PAN */}
        <div className={styles.formGroup}>
          <input
            id="panName"
            type="text"
            value={kycData.panName}
            readOnly={!isEditing}
            onChange={handleChange}
            placeholder="Name on PAN Card"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => panFileRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.panFileName || "Upload PAN"}
              </button>
              <input
                ref={panFileRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("panFile", e.target.files[0])
                }
              />
            </>
          )}

          {!isEditing && kycData.panFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.panFileName}
            </span>
          )}
        </div>

        {/* PAN Number */}
        <div className={styles.formGroup}>
          <input
            id="panNumber"
            type="text"
            value={kycData.panNumber}
            readOnly={!isEditing}
            onChange={handleChange}
            placeholder="PAN Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />
        </div>
      </div>

      <hr className={styles.divider} />

      {/* AADHAAR DETAILS */}
      <div className={styles.sectionTitle}>Aadhaar Details</div>
      <div className={styles.formGrid}>
        {/* Aadhaar Number */}
        <div className={styles.formGroup}>
          <input
            id="aadhaarNumber"
            type="text"
            value={kycData.aadhaarNumber}
            readOnly={!isEditing}
            onChange={handleChange}
            placeholder="Aadhaar Number"
            className={!isEditing ? styles.readOnlyInput : ""}
          />

          {isEditing && (
            <>
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => aadhaarFileRef.current.click()}
              >
                <FaUpload size={14} />
                {kycData.aadhaarFileName || "Upload Aadhaar"}
              </button>
              <input
                ref={aadhaarFileRef}
                type="file"
                hidden
                onChange={(e) =>
                  handleFileUpload("aadhaarFile", e.target.files[0])
                }
              />
            </>
          )}

          {!isEditing && kycData.aadhaarFileName && (
            <span className={styles.fileNameDisplay}>
              {kycData.aadhaarFileName}
            </span>
          )}
        </div>

        {/* Address */}
        <div className={styles.formGroup}>
          <input
            id="address"
            type="text"
            value={kycData.address}
            readOnly={!isEditing}
            onChange={handleChange}
            placeholder="Address"
            className={!isEditing ? styles.readOnlyInput : ""}
          />
        </div>
      </div>

      <hr className={styles.divider} />

      {/* Gender */}
      <div className={styles.formGroupWide}>
        <input
          id="gender"
          type="text"
          value={kycData.gender}
          readOnly={!isEditing}
          onChange={handleChange}
          placeholder="Gender"
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Use Case */}
      <div className={styles.formGroupWide}>
        <textarea
          id="useCase"
          rows="3"
          value={kycData.useCase}
          readOnly={!isEditing}
          onChange={handleChange}
          placeholder="Describe your use case"
          className={!isEditing ? styles.readOnlyInput : ""}
        />
      </div>

      {/* Approval Status */}
      <div className={styles.formGroupWide}>
        <input
          readOnly
          value={kycData.approvalStatus}
          placeholder="Approval Status"
          className={styles.statusPending}
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
