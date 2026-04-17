import images from "../../Images/Images";
import { KYC_BASE, apiExamples, ERROR_RESPONSES, RECHARGE_BASE, BBPS_BASE } from "./kycContex";

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
      apiUrl: { Method: 'Post', URLS: "client/pan/verify", LiveUrl: `${KYC_BASE}/pan/verify` },
      title: { header: "PAN Verification", headerTitle: "Verify PAN details basic", submitButton: 'Verify PAN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {}
    }
  },
  {
    id: "pan_director",
    categoryId: "PAN_SERVICES",
    label: "PAN - Director",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/knowDirector", LiveUrl: `${KYC_BASE}/pan/knowDirector` },
      title: { header: "PAN Director Search", headerTitle: "Know Director details using PAN", submitButton: 'Search Director' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/knowDirector' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN_DIRECTOR")?.examples[0]?.message || {}
    }
  },
  {
    id: "pan_gstin",
    categoryId: "PAN_SERVICES",
    label: "Know your GSTIN using PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/getgst_in/withpan", LiveUrl: `${KYC_BASE}/pan/getgst_in/withpan` },
      title: { header: "GSTIN via PAN", headerTitle: "Fetch GSTIN details for a given PAN", submitButton: 'Fetch GSTIN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/getgst_in/withpan' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN_TO_GST")?.examples[0]?.message || {}
    }
  },
  {
    id: "pan_tan_verify",
    categoryId: "PAN_SERVICES",
    label: "PAN/TAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/tan/verify", LiveUrl: `${KYC_BASE}/pan/tan/verify` },
      title: { header: "PAN/TAN Verification", headerTitle: "Verify PAN or TAN details", submitButton: 'Verify' },
      inputParams: ["number"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/tan/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "number": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "pan_name_match",
    categoryId: "PAN_SERVICES",
    label: "PAN Name Match",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/panNameMatch", LiveUrl: `${KYC_BASE}/pan/panNameMatch` },
      title: { header: "PAN Name Match", headerTitle: "Match Name with PAN database", submitButton: 'Match Name' },
      inputParams: ["panNumber", "name"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/panNameMatch' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F", "name": "RAM BABU" }'`,
      exampleResponse: apiExamples.find(e => e.name === "NM")?.examples[0]?.message || {}
    }
  },
  {
    id: "pan_itd_status",
    categoryId: "PAN_SERVICES",
    label: "PAN ITD Status",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/know/itdStatus/otp_generate", LiveUrl: `${KYC_BASE}/pan/itdStatus` },
      title: { header: "PAN ITD Status", headerTitle: "Know PAN ITD Status via OTP", submitButton: 'Generate OTP' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/itdStatus' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {} // dummy
    }
  },

  // 2. GST Service
  {
    id: "gst_verify",
    categoryId: "GST_SERVICES",
    label: "Comprehensive GST Solution",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Gstin/verify", LiveUrl: `${KYC_BASE}/business/Gstin/verify` },
      title: { header: "GSTIN Verification", headerTitle: "Verify GSTIN details", submitButton: 'Verify GSTIN' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/Gstin/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "gstinNumber": "33AACCC1234F1Z1" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GST")?.examples[0]?.message || {}
    }
  },
  {
    id: "gst_advanced",
    categoryId: "GST_SERVICES",
    label: "GST Advanced Search",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/GstIn/ViewAndTrack/verfiy", LiveUrl: `${KYC_BASE}/business/GstIn/ViewAndTrack` },
      title: { header: "GST Advanced", headerTitle: "Advanced GSTIN lookup and tracking", submitButton: 'Search' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/GstIn/ViewAndTrack' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "gstinNumber": "33AACCC1234F1Z1" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GST")?.examples[0]?.message || {} // dummy
    }
  },

  // 3. Aadhaar & DigiLocker
  {
    id: "aadhaar_masking",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Aadhaar Masking",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/pan/maskedverify", LiveUrl: `${KYC_BASE}/aadhaar/pan/maskedverify` },
      title: { header: "Aadhaar Masking", headerTitle: "Mask Aadhaar details for security", submitButton: 'Mask Aadhaar' },
      inputParams: ["aadhaarNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/aadhaar/pan/maskedverify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "aadhaarNumber": "123456789012" }'`,
      exampleResponse: apiExamples.find(e => e.name === "AADHAAR")?.examples[0]?.message || {}
    }
  },
  {
    id: "digilocker_verify",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Digilocker Verify Account",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/digilocker/verify", LiveUrl: `${KYC_BASE}/aadhaar/digilocker/verify` },
      title: { header: "DigiLocker Verification", headerTitle: "Verify DigiLocker account details", submitButton: 'Verify Account' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/aadhaar/digilocker/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },

  // 4. Banking & Financial
  {
    id: "bank_penny_drop",
    categoryId: "BANKING_FINANCIAL",
    label: "Bank Account Validation (Penny Drop)",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/account/verify/penny-drop", LiveUrl: `${KYC_BASE}/account/verify/penny-drop` },
      title: { header: "Bank Penny Drop", headerTitle: "Validate bank account via Penny Drop", submitButton: 'Validate Account' },
      inputParams: ["accountNumber", "ifsc"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/account/verify/penny-drop' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "accountNumber": "1234567890", "ifsc": "SBIN0001234" }'`,
      exampleResponse: apiExamples.find(e => e.name === "BPD")?.examples[0]?.message || {}
    }
  },
  {
    id: "ifsc_check",
    categoryId: "BANKING_FINANCIAL",
    label: "IFSC Code Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Shop/verify", LiveUrl: `${KYC_BASE}/bank/ifsc` },
      title: { header: "IFSC Search", headerTitle: "Verify Bank IFSC details", submitButton: 'Verify IFSC' },
      inputParams: ["ifsc"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/bank/ifsc' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "ifsc": "SBIN0001234" }'`,
      exampleResponse: apiExamples.find(e => e.name === "SHOP")?.examples[0]?.message || {} // dummy
    }
  },

  // 5. Business & Company
  {
    id: "business_cin",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Cin/verify", LiveUrl: `${KYC_BASE}/business/Cin/verify` },
      title: { header: "CIN Verification", headerTitle: "Verify Corporate Identification Number", submitButton: 'Verify CIN' },
      inputParams: ["CIN"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/Cin/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "CIN": "L01234MH2021PLC123456" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CIN")?.examples[0]?.message || {}
    }
  },
  {
    id: "business_udyam",
    categoryId: "BUSINESS_COMPANY",
    label: "Udyam Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/udyam/verify", LiveUrl: `${KYC_BASE}/business/udyam/verify` },
      title: { header: "Udyam Verification", headerTitle: "Verify Udyam Registration details", submitButton: 'Verify Udyam' },
      inputParams: ["udyamNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/udyam/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "udyamNumber": "UDYAM-KR-00-1234567" }'`,
      exampleResponse: apiExamples.find(e => e.name === "UDAM")?.examples[0]?.message || {}
    }
  },
  {
    id: "business_iec",
    categoryId: "BUSINESS_COMPANY",
    label: "Import Export Certificate / IEC",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/IEC/verify", LiveUrl: `${KYC_BASE}/business/IEC/verify` },
      title: { header: "IEC Verification", headerTitle: "Verify Import Export Code", submitButton: 'Verify IEC' },
      inputParams: ["iecNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/IEC/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "iecNumber": "0123456789" }'`,
      exampleResponse: apiExamples.find(e => e.name === "IEC")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "cinbased_companysearch",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Based Company Search",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/cinbased/company/search", LiveUrl: `${KYC_BASE}/business/cinbased/company/search` },
      title: { header: "CIN Based Company Search", headerTitle: "CIN Based Company Search", submitButton: 'Search company' },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/cinbased/company/search' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName": "XYZ PVT LIT" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "company_search",
    categoryId: "BUSINESS_COMPANY",
    label: "Company Search",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/cinbased/company/search", LiveUrl: `${KYC_BASE}/business/cinbased/company/search` },
      title: { header: "Company Search", headerTitle: "CIN Based Company Search", submitButton: 'Search company' },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/business/cinbased/company/search' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName": "XYZ PVT LIT" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },

  // 6. Employment & Income
  {
    id: "employment_uan_basic",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Basic UAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/uan/basic", LiveUrl: `${KYC_BASE}/employee/uan/basic` },
      title: { header: "UAN Verification", headerTitle: "Verify Basic UAN details", submitButton: 'Verify UAN' },
      inputParams: ["uanNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/employee/uan/basic' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "uanNumber": "123456789012" }'`,
      exampleResponse: apiExamples.find(e => e.name === "EMPLOYUANBASIC")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "employment_dual_check",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Dual Employment Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/dual_employment/check", LiveUrl: `${KYC_BASE}/employee/dual_employment/check` },
      title: { header: "Dual Employment Check", headerTitle: "Check for duplicate employment records", submitButton: 'Check' },
      inputParams: ["uanNumber", "panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/employee/dual_employment/check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "uanNumber": "123456789012", "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },

  // 7. Vehicle & Transport
  {
    id: "vehicle_rc",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Vehicle RC",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/rcverify", LiveUrl: `${KYC_BASE}/vehicle/rcverify` },
      title: { header: "RC Verification", headerTitle: "Verify Vehicle RC details", submitButton: 'Verify RC' },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/vehicle/rcverify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "rcNumber": "DL1CA1234" }'`,
      exampleResponse: apiExamples.find(e => e.name === "RC")?.examples[0]?.message || {}
    }
  },
  {
    id: "vehicle_dl",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Driving License",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/driving_license/verify", LiveUrl: `${KYC_BASE}/vehicle/driving_license/verify` },
      title: { header: "DL Verification", headerTitle: "Verify Driving License details", submitButton: 'Verify DL' },
      inputParams: ["licenseNo", "DateOfBirth"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/vehicle/driving_license/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "licenseNo": "DL-1234567890123", "DateOfBirth": "1990-01-01" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DL")?.examples[0]?.message || {}
    }
  },

  // 8. Face & AI Verification
  {
    id: "face_match",
    categoryId: "FACE_AI",
    label: "Face Match",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/face/match", LiveUrl: `${KYC_BASE}/face/match` },
      title: { header: "Face Match", headerTitle: "Match two faces for similarity", submitButton: 'Compare' },
      inputParams: ["image1", "image2"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/face/match' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image1": "base64_string", "image2": "base64_string" }'`,
      exampleResponse: apiExamples.find(e => e.name === "FACE")?.examples[0]?.message || {}
    }
  },
  {
    id: "blur_check",
    categoryId: "FACE_AI",
    label: "Blur Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/face/blur_Check", LiveUrl: `${KYC_BASE}/face/blur_Check` },
      title: { header: "Face Match", headerTitle: "Match two faces for similarity", submitButton: 'Compare' },
      // inputParams: ["file"],
      inputFile: ["file"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/face/blur_Check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'file=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse: apiExamples.find(e => e.name === "FACE")?.examples[0]?.message || {}
    }
  },

  // 9. OCR & Document AI
  {
    id: "ocr_pan",
    categoryId: "OCR_DOCUMENT_AI",
    label: "PAN OCR",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/ocr/pan", LiveUrl: `${KYC_BASE}/ocr/pan` },
      title: { header: "PAN OCR", headerTitle: "Extract details from PAN image", submitButton: 'Extract' },
      inputParams: ["image"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/ocr/pan' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },

  // 10. Government ID Services
  {
    id: "gov_voter_id",
    categoryId: "GOVERNMENT_ID",
    label: "Voter Id",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/voterId/verify", LiveUrl: `${KYC_BASE}/government/voterId/verify` },
      title: { header: "Voter ID Verification", headerTitle: "Verify Voter ID details", submitButton: 'Verify Voter ID' },
      inputParams: ["voterIdNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/government/voterId/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "voterIdNumber": "ABC1234567" }'`,
      exampleResponse: apiExamples.find(e => e.name === "VOTER")?.examples[0]?.message || {}
    }
  },
  {
    id: "gov_electricity",
    categoryId: "GOVERNMENT_ID",
    label: "Electricity Bill",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/electricity_bill", LiveUrl: `${KYC_BASE}/government/electricity_bill` },
      title: { header: "Electricity Bill", headerTitle: "Verify Electricity Bill details", submitButton: 'Fetch Bill' },
      inputParams: ["consumerId", "biller"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/government/electricity_bill' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "consumerId": "123456789", "biller": "TNEB" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },
  {
    id: "gov_electricity",
    categoryId: "GOVERNMENT_ID",
    label: "Electricity Bill",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/electricity_bill", LiveUrl: `${KYC_BASE}/government/electricity_bill` },
      title: { header: "Electricity Bill", headerTitle: "Verify Electricity Bill details", submitButton: 'Fetch Bill' },
      inputParams: ["consumerId", "biller"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/government/electricity_bill' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "consumerId": "123456789", "biller": "TNEB" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },

  // 11. Contact & Communication
  {
    id: "contact_mobile_otp",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Mobile OTP Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/mobileNumber/sentAadhaarotp", LiveUrl: `${KYC_BASE}/mobileNumber/sentAadhaarotp` },
      title: { header: "Mobile OTP", headerTitle: "Send OTP to mobile number", submitButton: 'Send OTP' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/mobileNumber/sentAadhaarotp' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },
  {
    id: "mobile_pan",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Mobile TO PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/mobileNumber/pan/verify", LiveUrl: `${KYC_BASE}/mobileNumber/pan/verify` },
      title: { header: "Mobile to Pan", headerTitle: "Mobile to pan Verification", submitButton: 'verify' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/mobileNumber/pan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOP")?.examples[0]?.message || {}
    }
  },
  
  // RISK DUE DILIGENCE
  {
    id: "court_record_check_diy",
    categoryId: "RISK_DUE_DILIGENCE",
    label: "Check court record",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/diligence/court/record", LiveUrl: `${KYC_BASE}/diligence/court/record` },
      title: { header: "check court record", headerTitle: "Check court recores history", submitButton: 'Check' },
      inputParams: ["recordName", "address"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/diligence/court/record' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "recordName": "9876543210", "address":"XYZ@gmail.com" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CHECKCOURTRECORD")?.examples[0]?.message || {}
    }
  },

  // Pre-configured for Sidebar Navigation
  // { id: "recharge_operators", config: { apiUrl: { URLS: "/Operators", LiveUrl: `${RECHARGE_BASE}/Operators` }, title: { header: "Fetch Operators", submitButton: "Fetch" }, inputParams: ["mobileNumber"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  // { id: "recharge_plans", config: { apiUrl: { URLS: "/Plans", LiveUrl: `${RECHARGE_BASE}/Plans` }, title: { header: "Fetch Plans" }, inputParams: ["operatorcode", "circle"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  // { id: "recharge_offers", config: { apiUrl: { URLS: "/OffersPlans", LiveUrl: `${RECHARGE_BASE}/OffersPlans` }, title: { header: "Fetch Offers" }, inputParams: ["operator_code", "mobile_no"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  // { id: "recharge_recharge_url", config: { apiUrl: { URLS: "/RechargeURL", LiveUrl: `${RECHARGE_BASE}/RechargeURL` }, title: { header: "Recharge URL" }, inputParams: ["mobile", "amount"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  // { id: "recharge_old_plans", config: { apiUrl: { URLS: "/OldPlans", LiveUrl: `${RECHARGE_BASE}/OldPlans` }, title: { header: "Old Plans" }, inputParams: ["mobile"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  
  // { id: "bbps_category", config: { apiUrl: { URLS: "/billerInfo/Category", LiveUrl: `${BBPS_BASE}/billerInfo/Category` }, title: { header: "Fetch Category" }, inputParams: [], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  // { id: "bbps_biller_info", config: { apiUrl: { URLS: "/billerInfo/Biller", LiveUrl: `${BBPS_BASE}/billerInfo/Biller` }, title: { header: "Fetch Biller Info" }, inputParams: ["billerId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  // { id: "bbps_bill_fetch", config: { apiUrl: { URLS: "/billFetch", LiveUrl: `${BBPS_BASE}/billFetch` }, title: { header: "Bill Fetch" }, inputParams: ["customerNumber"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  // { id: "bbps_bill_pay", config: { apiUrl: { URLS: "/billPay", LiveUrl: `${BBPS_BASE}/billPay` }, title: { header: "Bill Pay" }, inputParams: ["billId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  // { id: "bbps_bill_validation", config: { apiUrl: { URLS: "/billValidation", LiveUrl: `${BBPS_BASE}/billValidation` }, title: { header: "Bill Validation" }, inputParams: ["billId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  // { id: "bbps_quick_pay", config: { apiUrl: { URLS: "/quickPay", LiveUrl: `${BBPS_BASE}/quickPay` }, title: { header: "Quick Pay" }, inputParams: ["mobile"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },

  // 12. Geo & Location
  {
    id: "geo_pincode",
    categoryId: "GEO_LOCATION",
    label: "Pincode Geofencing",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/location/pincode/geofencing", LiveUrl: `${KYC_BASE}/location/pincode/geofencing` },
      title: { header: "Pincode Geofencing", headerTitle: "Verify Pincode specific geofence", submitButton: 'Verify Range' },
      inputParams: ["pincode", "latitude", "longitude"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/pincode/geofencing' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "pincode": "560001", "latitude": "12.9716", "longitude": "77.5946" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GEWPINCODE")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "Lat_long_geo",
    categoryId: "GEO_LOCATION",
    label: "Longitude/Latitude Geofencing",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/location/longLat/geofencing", LiveUrl: `${KYC_BASE}/location/longLat/geofencing` },
      title: { header: "Longitude/Latitude Geofencing", headerTitle: "Longitude/Latitude Geofencing", submitButton: 'search' },
      inputParams: ["latitude", "longitude"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/longLat/geofencing' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "latitude":"12.9716", "longitude": "77.5946" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GEWLATLONG")?.examples[0]?.message || {} // dummy
    }
  },

  // 14. Professional Verification
  {
    id: "prof_doctor",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Doctor Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/professional/docter/verify", LiveUrl: `${KYC_BASE}/professional/docter/verify` },
      title: { header: "Doctor Verification", headerTitle: "Verify Medical Professional details", submitButton: 'Verify Doctor' },
      inputParams: ["registrationNumber"],
      isToken: true,
      isMicro: 'KYC',
      exampleCurl: `curl --location '${KYC_BASE}/professional/docter/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "registrationNumber": "DOC12345" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  }
];

export const getServiceById = (id) => SERVICES_METADATA.find(s => s.id === id);
