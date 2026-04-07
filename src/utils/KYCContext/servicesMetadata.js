import images from "../../Images/Images";

export const KYC_CATEGORIES = {
  PAN_SERVICES: { label: "PAN Services", icon: "FileText" },
  GST_SERVICES: { label: "GST Service", icon: "Briefcase" },
  AADHAAR_DIGILOCKER: { label: "Aadhaar & DigiLocker", icon: "User" },
  BANKING_FINANCIAL: { label: "Banking & Financial", icon: "CreditCard" },
  BUSINESS_COMPANY: { label: "Business & Company", icon: "Building2" },
  EMPLOYMENT_INCOME: { label: "Employment & Income", icon: "BadgeCheck" },
  VEHICLE_TRANSPORT: { label: "Vehicle & Transport", icon: "Car" },
  FACE_AI: { label: "Face & AI Verification", icon: "ScanFace" },
  OCR_DOCUMENT_AI: { label: "OCR & Document AI", icon: "FileSearch" },
  GOVERNMENT_ID: { label: "Government ID Services", icon: "Files" },
  CONTACT_COMMUNICATION: { label: "Contact & Communication", icon: "Phone" },
  GEO_LOCATION: { label: "Geo & Location", icon: "MapPin" },
  RISK_DUE_DILIGENCE: { label: "Risk & Due Diligence", icon: "ShieldAlert" },
  PROFESSIONAL_VERIFICATION: { label: "Professional Verification", icon: "Stethoscope" },
  OTHER_SERVICES: { label: "Other Services", icon: "MoreHorizontal" },
};

export const SERVICES_METADATA = [
  // 1. PAN Services
  {
    id: "pan_verify",
    categoryId: "PAN_SERVICES",
    label: "PAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/verify" },
      title: { header: "PAN Verification", headerTitle: "Verify PAN details basic", submitButton: 'Verify PAN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
    id: "pan_director",
    categoryId: "PAN_SERVICES",
    label: "PAN - Director",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/knowDirector", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/knowDirector" },
      title: { header: "PAN Director Search", headerTitle: "Know Director details using PAN", submitButton: 'Search Director' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
    id: "pan_gstin",
    categoryId: "PAN_SERVICES",
    label: "Know your GSTIN using PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/getgst_in/withpan", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/getgst_in/withpan" },
      title: { header: "GSTIN via PAN", headerTitle: "Fetch GSTIN details for a given PAN", submitButton: 'Fetch GSTIN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
    id: "pan_tan_verify",
    categoryId: "PAN_SERVICES",
    label: "PAN/TAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/tan/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/tan/verify" },
      title: { header: "PAN/TAN Verification", headerTitle: "Verify PAN or TAN details", submitButton: 'Verify' },
      inputParams: ["number"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
    id: "pan_name_match",
    categoryId: "PAN_SERVICES",
    label: "PAN Name Match",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/panNameMatch", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/panNameMatch" },
      title: { header: "PAN Name Match", headerTitle: "Match Name with PAN database", submitButton: 'Match Name' },
      inputParams: ["panNumber", "name"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
      id: "pan_itd_status",
      categoryId: "PAN_SERVICES",
      label: "PAN ITD Status",
      config: {
        apiUrl: { Method: 'Post', URLS: "client/pan/know/itdStatus/otp_generate", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/itdStatus" },
        title: { header: "PAN ITD Status", headerTitle: "Know PAN ITD Status via OTP", submitButton: 'Generate OTP' },
        inputParams: ["panNumber"],
        isToken: true,
        isMicro: 'KYC'
      }
  },

  // 2. GST Service
  {
    id: "gst_verify",
    categoryId: "GST_SERVICES",
    label: "Comprehensive GST Solution",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Gstin/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/Gstin/verify" },
      title: { header: "GSTIN Verification", headerTitle: "Verify GSTIN details", submitButton: 'Verify GSTIN' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC',
    }
  },
  {
    id: "gst_advanced",
    categoryId: "GST_SERVICES",
    label: "GST Advanced Search",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/GstIn/ViewAndTrack/verfiy", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/GstIn/ViewAndTrack" },
      title: { header: "GST Advanced", headerTitle: "Advanced GSTIN lookup and tracking", submitButton: 'Search' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 3. Aadhaar & DigiLocker
  {
    id: "aadhaar_masking",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Aadhaar Masking",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/pan/maskedverify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/aadhaar/pan/maskedverify" },
      title: { header: "Aadhaar Masking", headerTitle: "Mask Aadhaar details for security", submitButton: 'Mask Aadhaar' },
      inputParams: ["aadhaarNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "digilocker_verify",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Digilocker Verify Account",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/digilocker/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/aadhaar/digilocker/verify" },
      title: { header: "DigiLocker Verification", headerTitle: "Verify DigiLocker account details", submitButton: 'Verify Account' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 4. Banking & Financial
  {
    id: "bank_penny_drop",
    categoryId: "BANKING_FINANCIAL",
    label: "Bank Account Validation (Penny Drop)",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/account/verify/penny-drop", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/account/verify/penny-drop" },
      title: { header: "Bank Penny Drop", headerTitle: "Validate bank account via Penny Drop", submitButton: 'Validate Account' },
      inputParams: ["accountNumber", "ifsc"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "ifsc_check",
    categoryId: "BANKING_FINANCIAL",
    label: "IFSC Code Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Shop/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/bank/ifsc" },
      title: { header: "IFSC Search", headerTitle: "Verify Bank IFSC details", submitButton: 'Verify IFSC' },
      inputParams: ["ifsc"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 5. Business & Company
  {
    id: "business_cin",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Cin/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/Cin/verify" },
      title: { header: "CIN Verification", headerTitle: "Verify Corporate Identification Number", submitButton: 'Verify CIN' },
      inputParams: ["cin"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "business_udyam",
    categoryId: "BUSINESS_COMPANY",
    label: "Udyam Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/udyam/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/udyam/verify" },
      title: { header: "Udyam Verification", headerTitle: "Verify Udyam Registration details", submitButton: 'Verify Udyam' },
      inputParams: ["udyamNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
      id: "business_iec",
      categoryId: "BUSINESS_COMPANY",
      label: "Import Export Certificate / IEC",
      config: {
        apiUrl: { Method: 'Post', URLS: "client/business/IEC/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/IEC/verify" },
        title: { header: "IEC Verification", headerTitle: "Verify Import Export Code", submitButton: 'Verify IEC' },
        inputParams: ["iecNumber"],
        isToken: true,
        isMicro: 'KYC'
      }
  },

  // 6. Employment & Income
  {
    id: "employment_uan_basic",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Basic UAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/uan/basic", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/employee/uan/basic" },
      title: { header: "UAN Verification", headerTitle: "Verify Basic UAN details", submitButton: 'Verify UAN' },
      inputParams: ["uanNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "employment_dual_check",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Dual Employment Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/dual_employment/check", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/employee/dual_employment/check" },
      title: { header: "Dual Employment Check", headerTitle: "Check for duplicate employment records", submitButton: 'Check' },
      inputParams: ["uanNumber", "panNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 7. Vehicle & Transport
  {
    id: "vehicle_rc",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Vehicle RC",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/rcverify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/vehicle/rcverify" },
      title: { header: "RC Verification", headerTitle: "Verify Vehicle RC details", submitButton: 'Verify RC' },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "vehicle_dl",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Driving License",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/driving_license/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/vehicle/driving_license/verify" },
      title: { header: "DL Verification", headerTitle: "Verify Driving License details", submitButton: 'Verify DL' },
      inputParams: ["dlNumber", "dob"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 8. Face & AI Verification
  {
      id: "face_match",
      categoryId: "FACE_AI",
      label: "Face Match",
      config: {
        apiUrl: { Method: 'Post', URLS: "client/face/match", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/face/match" },
        title: { header: "Face Match", headerTitle: "Match two faces for similarity", submitButton: 'Compare' },
        inputParams: ["image1", "image2"],
        isToken: true,
        isMicro: 'KYC'
      }
  },

  // 9. OCR & Document AI
  {
      id: "ocr_pan",
      categoryId: "OCR_DOCUMENT_AI",
      label: "PAN OCR",
      config: {
        apiUrl: { Method: 'Post', URLS: "client/ocr/pan", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/ocr/pan" },
        title: { header: "PAN OCR", headerTitle: "Extract details from PAN image", submitButton: 'Extract' },
        inputParams: ["image"],
        isToken: true,
        isMicro: 'KYC'
      }
  },

  // 10. Government ID Services
  {
    id: "gov_voter_id",
    categoryId: "GOVERNMENT_ID",
    label: "Voter Id",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/voterId/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/government/voterId/verify" },
      title: { header: "Voter ID Verification", headerTitle: "Verify Voter ID details", submitButton: 'Verify Voter ID' },
      inputParams: ["voterIdNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  },
  {
    id: "gov_electricity",
    categoryId: "GOVERNMENT_ID",
    label: "Electricity Bill",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/electricity_bill", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/government/electricity_bill" },
      title: { header: "Electricity Bill", headerTitle: "Verify Electricity Bill details", submitButton: 'Fetch Bill' },
      inputParams: ["consumerId", "biller"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 11. Contact & Communication
  {
      id: "contact_mobile_otp",
      categoryId: "CONTACT_COMMUNICATION",
      label: "Mobile OTP Verification",
      config: {
        apiUrl: { Method: 'Post', URLS: "client/mobileNumber/sentAadhaarotp", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/mobileNumber/sentAadhaarotp" },
        title: { header: "Mobile OTP", headerTitle: "Send OTP to mobile number", submitButton: 'Send OTP' },
        inputParams: ["mobileNumber"],
        isToken: true,
        isMicro: 'KYC'
      }
  },

  // 12. Geo & Location
  {
    id: "geo_pincode",
    categoryId: "GEO_LOCATION",
    label: "Pincode Geofencing",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/location/pincode/geofencing", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/location/pincode/geofencing" },
      title: { header: "Pincode Geofencing", headerTitle: "Verify Pincode specific geofence", submitButton: 'Verify Range' },
      inputParams: ["pincode", "latitude", "longitude"],
      isToken: true,
      isMicro: 'KYC'
    }
  },

  // 14. Professional Verification
  {
    id: "prof_doctor",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Doctor Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/professional/docter/verify", LiveUrl: "https://localhost:7007/V1/KYC/LIVE/professional/docter/verify" },
      title: { header: "Doctor Verification", headerTitle: "Verify Medical Professional details", submitButton: 'Verify Doctor' },
      inputParams: ["registrationNumber"],
      isToken: true,
      isMicro: 'KYC'
    }
  }
];

export const getServiceById = (id) => SERVICES_METADATA.find(s => s.id === id);
