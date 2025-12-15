import { useState, useEffect } from "react";
import { Pencil, LogOut } from "lucide-react";
import KycDetails from "./kycSection";
import { useUserStore } from "../../Store/userStore";
import { toTitleCase } from "../../utils/simpleHellperFn";
import { HandleVerifyIPIN } from "../../common/apiCalls/CommonApiCall";
import FlowpipeUnlockModal from "./PinVerify/IpinVerify";


const Settings = () => (
    <div className="bg-white rounded-xl shadow p-6 border">
        <h3 className="text-lg font-semibold mb-4">Settings</h3>
        <p className="text-gray-600">Settings options go here…</p>
    </div>
);

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState("basic");
    const { users, IskycApproved, kycCompleted, updateUsers } = useUserStore();

    const handleLogout = () => {
        console.log("User logged out");
    };

    return (
        <div className="w-full min-h-screen bg-[#f5f6ff] p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                    <LogOut size={16} /> Logout
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
                <img
                    src="https://randomuser.me/api/portraits/men/45.jpg"
                    alt="User Profile"
                    className="w-24 h-24 rounded-full border-4 border-purple-200 object-cover"
                />

                <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-purple-700">{toTitleCase(users?.name || "Guest User")} </h3>
                    <p className="text-gray-600">{users?.email || "N/A"}</p>
                    <p className="text-gray-600">{users?.mobileNumber || "N/A"}</p>
                    {/* Optional: Display KYC Status */}
                    <div className="mt-2">
                        <span className={`text-sm font-medium px-3 py-1 rounded-full ${IskycApproved ? 'bg-green-100 text-green-700' : kycCompleted ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            KYC Status: {IskycApproved ? 'Approved' : kycCompleted ? 'Pending Review' : 'Incomplete'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex mt-6 bg-white rounded-xl shadow overflow-hidden">
                {["basic", "kyc", "settings"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-3 text-center font-semibold capitalize transition duration-200
              ${activeTab === tab
                                ? "bg-purple-600 text-white shadow-inner"
                                : "text-gray-700 hover:bg-gray-50"}
            `}
                    >
                        {tab === "basic" && "Basic Details"}
                        {tab === "kyc" && "KYC Details"}
                        {tab === "settings" && "Settings"}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {activeTab === "basic" && <BasicDetails />}
                {activeTab === "kyc" && <KycDetails />}
                {activeTab === "settings" && <Settings />}
            </div>
        </div>
    );
}

function Input({ label, placeholder, value, onChange, readOnly = false, name }) {
    return (
        <div className="mb-4">
            <label className="text-sm text-gray-600 font-medium mb-1 block">{label}</label>
            <input
                // --- Assign the 'name' prop to the HTML input ---
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                readOnly={readOnly}
                className={`w-full px-3 py-2 border rounded-lg transition duration-150 
            ${readOnly
                        ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                        : "bg-white border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"}
        `}
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
        // Correctly initialized nested object
        companyDetails: {
            businessName: "",
            addressLine1: "",
            addressLine2: "",
            cityState: "",
        }
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        // Initialize form data when the component mounts or users changes
        if (users) {
            const [first = '', last = ''] = users?.name?.split(' ') || ['', ''];

            setFormData({
                firstName: first,
                lastName: last,
                email: users?.email || '',
                mobileNumber: users?.mobileNumber || '',
                // Use the users's nested structure
                companyDetails: {
                    businessName: users?.companyDetails?.businessName || '',
                    addressLine1: users?.companyDetails?.addressLine1 || '',
                    addressLine2: users?.companyDetails?.addressLine2 || '',
                    cityState: users?.companyDetails?.cityState || '',
                }
            });
        }
    }, [users]);

    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCompanyChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            companyDetails: {
                ...prev.companyDetails,
                [name]: value, // Update the specific nested field
            },
        }));
    };

    const handleSave = () => {
        // Construct the data payload with the new nested structure
        const dataToSave = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            mobileNumber: formData.mobileNumber,
            // Send the entire nested object back
            companyDetails: formData.companyDetails,
        };

        console.log("Data saved:", dataToSave);
        updateUsers({ ...users, ...dataToSave });
        setIsEditing(false);
    };

    const handleEditToggle = async () => {
        if (!isEditing) {
            handleOpenModal()
        } else {
            setIsEditing(false);
        }
    };

    if (isModalOpen) {
        return <FlowpipeUnlockModal isVisible={isModalOpen} onClose={handleCloseModal} IsValidPIN={setIsEditing} />
    }

    return (

        <div className="bg-white rounded-xl shadow p-6 border">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-lg font-semibold">Basic Details</h3>
                <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition"
                >
                    {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleBasicChange}
                    readOnly={!isEditing}
                />
                <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleBasicChange}
                    readOnly={!isEditing}
                />
                <Input
                    label="E-mail"
                    name="email"
                    value={formData.email}
                    onChange={handleBasicChange}
                    readOnly={!isEditing}
                />

                <div className="mb-4">
                    <label className="text-sm text-gray-600 font-medium mb-1 block">Phone Number</label>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-3 py-2 border rounded-lg bg-gray-200 text-gray-700 select-none">+91</span>
                        <input
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleBasicChange}
                            readOnly={!isEditing}
                            className={`w-full px-3 py-2 border rounded-lg ${!isEditing ? 'bg-gray-100 text-gray-700 cursor-not-allowed' : 'bg-white border-gray-300 focus:ring-2 focus:ring-purple-500'}`}
                            placeholder="9854641567"
                        />
                    </div>
                    <button disabled={!isEditing} className={`text-purple-600 text-sm mt-1 hover:text-purple-700 transition ${!isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        Change Phone Number
                    </button>
                </div>
            </div>

            <hr className="my-6 border-t border-gray-200" />

            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="text-lg font-semibold">Company Details</h3>
                <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-1 text-purple-600 hover:text-purple-700 transition"
                >
                    {isEditing ? "Cancel" : "Edit"} <Pencil size={16} />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <Input
                    label="Business Name"
                    name="businessName"
                    value={formData?.companyDetails?.businessName}
                    onChange={handleCompanyChange}
                    readOnly={!isEditing}
                />
                <Input
                    label="Area colony, street, sector"
                    name="addressLine1"
                    value={formData?.companyDetails?.addressLine1}
                    onChange={handleCompanyChange}
                    readOnly={!isEditing}
                />
                <Input
                    label="Address, Building, Apartment"
                    name="addressLine2"
                    value={formData?.companyDetails?.addressLine2}
                    onChange={handleCompanyChange}
                    readOnly={!isEditing}
                />
                <Input
                    label="City, State"
                    name="cityState"
                    value={formData?.companyDetails?.cityState}
                    onChange={handleCompanyChange}
                    readOnly={!isEditing}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-4 border-t border-gray-200">
                <button
                    className="px-4 py-2 text-gray-600 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
                    onClick={handleEditToggle}
                >
                    {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                    className={`px-6 py-2 text-white rounded-lg transition ${isEditing ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-400 cursor-not-allowed"}`}
                    onClick={handleSave}
                    disabled={!isEditing}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

