import { useState, useEffect } from "react";
import { LogOut, Info } from "lucide-react";
import KycDetails from "./kycSection";
import { useUserStore } from "../../Store/userStore";
import { toTitleCase } from "../../utils/simpleHellperFn";
import { HandleVerifyIPIN } from "../../common/apiCalls/CommonApiCall";
import FlowpipeUnlockModal from "./PinVerify/IpinVerify";
import { ChangeEmailModal, ChangePhoneModal } from "./ContactModals";
import "./UserProfile.css";
import Setting from "./Setting";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");
  const { users, IskycApproved, kycCompleted, updateUsers } = useUserStore();
  console.log("user Data", users);

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="profile-page-container">
      <div className="profile-header">
        <h2 className="profile-title">Profile Details</h2>
        <button onClick={handleLogout} className="logout-button">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="profile-card">
        <img
          src="https://randomuser.me/api/portraits/men/45.jpg"
          alt="User Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <h3 className="user-name">
            {toTitleCase(users?.name || "Guest User")}{" "}
          </h3>
          <p className="user-detail">{users?.email || "N/A"}</p>
          <p className="user-detail">{users?.mobileNumber || "N/A"}</p>
        </div>
      </div>

      <div className="tabs-container-userpro">
        <div className="tabs-group">
          {["basic", "kyc", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`tab-button ${activeTab === tab ? "active" : "inactive"}`}
            >
              {tab === "basic" && "Basic Details"}
              {tab === "kyc" && "KYC Details"}
              {tab === "settings" && "Settings"}
            </button>
          ))}
        </div>
      </div>

      <div className="content-section-1">
        {activeTab === "basic" && <BasicDetails />}
      </div>

      <div className="content-section-2">
        {activeTab === "kyc" && <KycDetails />}
      </div>

      <div className="content-section-3">
        {activeTab === "settings" && <Setting />}
      </div>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  readOnly = false,
  name,
  fullWidth = false,
}) {
  return (
    <div className={`input-group ${fullWidth ? "col-span-2" : ""}`}>
      <label className="input-label">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`input-field ${readOnly ? "readonly" : ""}`}
      />
    </div>
  );
}

function BasicDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const { users, updateUsers } = useUserStore();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    companyDetails: {
      businessName: "",
      addressLine1: "",
      addressLine2: "",
      cityState: "",
      pincode: "", // Added for completeness if needed based on image
      landmark: "", // Added for completeness
      location: "", // Added for completeness
      city: "",
      state: "",
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (users) {
      const [first = "", last = ""] = users?.name?.split(" ") || ["", ""];

      setFormData({
        firstName: first,
        lastName: last,
        email: users?.email || "",
        mobileNumber: users?.mobileNumber || "",
        companyDetails: {
          businessName: users?.companyDetails?.businessName || "",
          addressLine1: users?.companyDetails?.addressLine1 || "",
          addressLine2: users?.companyDetails?.addressLine2 || "",
          cityState: users?.companyDetails?.cityState || "",
          pincode: users?.companyDetails?.pincode || "",
          landmark: users?.companyDetails?.landmark || "",
          location: users?.companyDetails?.location || "",
          city: users?.companyDetails?.city || "",
          state: users?.companyDetails?.state || "",
        },
      });
    }
  }, [users]);

  const handleBasicChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      companyDetails: {
        ...prev.companyDetails,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    const dataToSave = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      companyDetails: formData.companyDetails,
    };

    console.log("Data saved:", dataToSave);
    updateUsers({ ...users, ...dataToSave });
    setIsEditing(false);
  };

  const handleEditToggle = async () => {
    if (!isEditing) {
      handleOpenModal();
    } else {
      setIsEditing(false);
    }
  };

  if (isModalOpen) {
    return (
      <FlowpipeUnlockModal
        isVisible={isModalOpen}
        onClose={handleCloseModal}
        IsValidPIN={setIsEditing}
      />
    );
  }

  return (
    <>
      <div className="details-card">
        <div className="section-header">
          <h3 className="section-title">Basic Details</h3>
        </div>
        <div className="details-grid">
          <Input
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleBasicChange}
            placeholder="First Name"
          />
          <Input
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleBasicChange}
            // readOnly={!isEditing}
            placeholder="Last Name"
          />
          <div className="input-group col-span-1">
            <label className="input-label">E-mail</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleBasicChange}
              // readOnly={!isEditing}
              className={`input-field ${!isEditing ? "readonly" : ""}`}
              placeholder="E-mail"
            />
            <button
              className="change-link-btn"
              onClick={() => setIsEmailModalOpen(true)}
            >
              <Info size={14} className="info-icon" /> change E-mail
            </button>
            <ChangeEmailModal
              isOpen={isEmailModalOpen}
              onClose={() => setIsEmailModalOpen(false)}
            />
          </div>

          <div className="input-group col-span-1">
            <label className="input-label">Phone Number</label>
            <div className="phone-input-wrapper">
              <span className="phone-country">
                <img
                  src="https://flagcdn.com/w20/in.png"
                  alt="India"
                  style={{ width: 20, marginRight: 5 }}
                />
                +91
              </span>
              <input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleBasicChange}
                // readOnly={!isEditing}
                className="phone-field"
                placeholder="9854641567"
              />
            </div>
            <button
              className="change-link-btn"
              onClick={() => setIsPhoneModalOpen(true)}
            >
              <Info size={14} className="info-icon" /> Change Phone Number
            </button>
            <ChangePhoneModal
              isOpen={isPhoneModalOpen}
              onClose={() => setIsPhoneModalOpen(false)}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="details-card">
        <div className="section-header">
          <h3 className="section-title">Company Details</h3>
        </div>

        <div className="details-grid">
          <Input
            label="Business/Company Name"
            name="businessName"
            value={formData?.companyDetails?.businessName}
            onChange={handleCompanyChange}
            placeholder="Enter Business Name"
            fullWidth={false}
          />
          <Input
            label="Landmark"
            name="landmark"
            value={formData?.companyDetails?.landmark}
            onChange={handleCompanyChange}
            placeholder="Area colony,street ,sector"
          />
          <Input
            label="Address, H-No, Apartment"
            name="addressLine1"
            value={formData?.companyDetails?.addressLine1}
            onChange={handleCompanyChange}
            placeholder="Enter Address"
          />
          <Input
            label="City"
            name="city"
            value={formData?.companyDetails?.city}
            onChange={handleCompanyChange}
            placeholder="Enter City"
          />
          <Input
            label="Pincode"
            name="pincode"
            value={formData?.companyDetails?.pincode}
            onChange={handleCompanyChange}
            placeholder="Enter Pincode"
          />
          <Input
            label="State"
            name="state"
            value={formData?.companyDetails?.state}
            onChange={handleCompanyChange}
            // readOnly={!isEditing}
            placeholder="Enter State"
          />
          <div className="col-span-2">
            <Input
              label="Location"
              name="location"
              value={formData?.companyDetails?.location}
              onChange={handleCompanyChange}
              placeholder="Area/region"
            />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="btn-cancel" onClick={handleEditToggle}>
          {isEditing ? "Cancel" : "Cancel"}
        </button>
        <button
          className="btn-save"
          onClick={isEditing ? handleSave : handleEditToggle}
          disabled={!isEditing}
        >
          Save
        </button>
      </div>
    </>
  );
}
