import images from "../../Images/Images";
import {
  KYC_BASE,
  apiExamples,
  ERROR_RESPONSES,
  RECHARGE_BASE,
  BBPS_BASE,
} from "./kycContex";

export const KYC_CATEGORIES = {
  PAN_SERVICES: { label: "PAN Services", icon: "FileText" },
  GST_SERVICES: { label: "GST Service", icon: "Briefcase" },
  MOBILE_NUMBER: { label: "Mobile Number", icon: "Phone" },
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
  PROFESSIONAL_VERIFICATION: {
    label: "Professional Verification",
    icon: "Stethoscope",
  },
  OTHER_SERVICES: { label: "Other Services", icon: "MoreHorizontal" },
};

export const SERVICES_METADATA = [
  // 1. PAN Services
  {
    id: "pan_verify",
    categoryId: "PAN_SERVICES",
    label: "PAN Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/pan/verify",
        LiveUrl: `${KYC_BASE}/pan/verify`,
      },
      title: {
        header: "PAN Verification",
        headerTitle: "Verify PAN details basic",
        submitButton: "Verify PAN",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  {
    id: "pan_deatiled",
    categoryId: "PAN_SERVICES",
    label: "PAN Detailed",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/pan/detailed",
        LiveUrl: `${KYC_BASE}/pan/detailed`,
      },
      title: {
        header: "PAN Deatiled",
        headerTitle: "Get PAN Detailed",
        submitButton: "Get Detailed PAN",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/detailed' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN_DETAILED")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "business_pan",
    categoryId: "PAN_SERVICES",
    label: "Business Pan Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/verify",
        LiveUrl: `${KYC_BASE}/pan/business/verify`,
      },
      title: {
        header: "PAN Verification",
        headerTitle: "Verify PAN details basic",
        submitButton: "Verify PAN",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/pan/business/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BUSINESS_PAN")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "pan_director",
    categoryId: "PAN_SERVICES",
    label: "PAN - Director",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/knowDirector",
        LiveUrl: `${KYC_BASE}/internal/pan/knowDirector`,
      },
      title: {
        header: "PAN Director Search",
        headerTitle: "Know Director details using PAN",
        submitButton: "Search Director",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/knowDirector' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN_DIRECTOR")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "pan_gstin",
    categoryId: "PAN_SERVICES",
    label: "Know your GSTIN using PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/getgst_in/withpan",
        LiveUrl: `${KYC_BASE}/internal/pan/getgst_in/withpan`,
      },
      title: {
        header: "GSTIN via PAN",
        headerTitle: "Fetch GSTIN details for a given PAN",
        submitButton: "Fetch GSTIN",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/getgst_in/withpan' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN_TO_GST")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "pan_tan_verify",
    categoryId: "PAN_SERVICES",
    label: "PAN/TAN Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/tan/verify",
        LiveUrl: `${KYC_BASE}/internal/pan/tan/verify`,
      },
      title: {
        header: "PAN/TAN Verification",
        headerTitle: "Verify PAN or TAN details",
        submitButton: "Verify",
      },
      inputParams: ["panNumber", "tanNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/tan/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "number": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  {
    id: "pan_name_match",
    categoryId: "PAN_SERVICES",
    label: "PAN Name Match",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/panNameMatch",
        LiveUrl: `${KYC_BASE}/internal/pan/panNameMatch`,
      },
      title: {
        header: "PAN Name Match",
        headerTitle: "Match Name with PAN database",
        submitButton: "Match Name",
      },
      inputParams: ["panNumber", "name"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/panNameMatch' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F", "name": "RAM BABU" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "NM")?.examples[0]?.message || {},
    },
  },
  {
    id: "gst_with_pan",
    categoryId: "PAN_SERVICES",
    label: "GST WITH PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/gst/with/pan",
        LiveUrl: `${KYC_BASE}/internal/pan/gst/with/pan`,
      },
      title: {
        header: "GST WITH PAN",
        headerTitle: "Know gst with Pan",
        submitButton: "submit pan",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/gst/with/pan' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "NM")?.examples[0]?.message || {},
    },
  },
  {
    id: "verify_dob_with_pan",
    categoryId: "PAN_SERVICES",
    label: "VERIFY DOB WITH PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/panName/DobVerify",
        LiveUrl: `${KYC_BASE}/internal/pan/panName/DobVerify`,
      },
      title: {
        header: "VERIFY DOB WITH PAN",
        headerTitle: "Verify you Date of Birth with Pan",
        submitButton: "submit pan",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/panName/DobVerify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "NM")?.examples[0]?.message || {},
    },
  },
  {
    id: "father_name_with_pan",
    categoryId: "PAN_SERVICES",
    label: "Know FatherName WITH PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/know/fatherName",
        LiveUrl: `${KYC_BASE}/internal/pan/know/fatherName`,
      },
      title: {
        header: "KNOW FATHER NAME WITH PAN",
        headerTitle: "Know Father Name with pan Number",
        submitButton: "submit pan",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/know/fatherName' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PANFN")?.examples[0]?.message || {},
    },
  },
  {
    id: "generate_pan_itd",
    categoryId: "PAN_SERVICES",
    label: "PAN ITD GENERATE",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/know/itdStatus/otp_generate",
        LiveUrl: `${KYC_BASE}/internal/pan/know/itdStatus/otp_generate`,
      },
      title: {
        header: "PAN ITD GENERATE",
        headerTitle: "Generate OTP for ITD with pan",
        submitButton: "Generate OTP",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/know/itdStatus/otp_generate' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "verify_pan_itd",
    categoryId: "PAN_SERVICES",
    label: "PAN ITD Verify",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/know/itdStatus/otp_validate",
        LiveUrl: `${KYC_BASE}/internal/pan/know/itdStatus/otp_validate`,
      },
      title: {
        header: "PAN ITD Verify",
        headerTitle: "Verify OTP for ITD with pan",
        submitButton: "Generate OTP",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/know/itdStatus/otp_validate' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "aadhaar_verify_with_pan",
    categoryId: "PAN_SERVICES",
    label: "Aadhaar Verify with PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "pan/verify_to_aadhaar",
        LiveUrl: `${KYC_BASE}/internal/pan/verify_to_aadhaar`,
      },
      title: {
        header: "Aadhaar Verify with PAN",
        headerTitle: "Aadhaar Verify with PAN",
        submitButton: "Generate OTP",
      },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/verify_to_aadhaar' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },

  // 2. GST Service
  {
    id: "gst_verify",
    categoryId: "GST_SERVICES",
    label: "Comprehensive GST Solution",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "gst/comprehensivegst/verify",
        LiveUrl: `${KYC_BASE}/internal/gst/comprehensivegst/verify`,
      },
      title: {
        header: "GSTIN Verification",
        headerTitle: "Verify GSTIN details",
        submitButton: "Verify GSTIN",
      },
      inputParams: ["gstNo", "year"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/gst/comprehensivegst/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "gstNo": "33AACCC1234F1Z1", "year":"2025-26" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GST")?.examples[0]?.message || {},
    },
  },
  {
    id: "gst_advanced",
    categoryId: "GST_SERVICES",
    label: "GST Advanced Search",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "gst/gstAdvance/verify",
        LiveUrl: `${KYC_BASE}/internal/gst/gstAdvance/verify`,
      },
      title: {
        header: "GST Advanced",
        headerTitle: "Advanced GSTIN lookup and tracking",
        submitButton: "Search",
      },
      inputParams: ["GstNo"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/gst/gstAdvance/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "GstNo": "33AACCC1234F1Z1" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GST")?.examples[0]?.message || {},
    },
  },

  // 3. Aadhaar & DigiLocker
  {
    id: "digilocker_verify",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Digilocker Verify Account",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "aadhaar/digilocker/verify",
        LiveUrl: `${KYC_BASE}/internal/aadhaar/digilocker/verify`,
      },
      title: {
        header: "DigiLocker Verification",
        headerTitle: "Verify DigiLocker account details",
        submitButton: "Verify Account",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/aadhaar/digilocker/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  // E Aadhaar Verification (Digilocker)
  {
    id: "e-aadhaar_verification",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "E Aadhaar Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "aadhaar/pan/maskedverify",
        LiveUrl: `${KYC_BASE}/internal/aadhaar/pan/maskedverify`,
      },
      title: {
        header: "E Aadhaar Verification",
        headerTitle: "Verify e aadhaar verification in details",
        submitButton: "Verify",
      },
      inputParams: ["aadhaarNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/aadhaar/pan/maskedverify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "aadhaarNumber": "123456789012" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "AVS")?.examples[0]?.message || {},
    },
  },

  // 4. Banking & Financial

  // 1. Account Penny Drop
  {
    id: "account_penny_drop",
    categoryId: "BANKING_FINANCIAL",
    label: "ACCOUNT PENNY DROP",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "account/verify/penny-drop",
        LiveUrl: `${KYC_BASE}/account/verify/penny-drop`,
      },
      title: {
        header: "BANK ACCOUNT VERIFICATION",
        headerTitle: "Verify Bank IFSC details",
        submitButton: "Verify Account",
      },
      inputParams: ["accountNumber", "ifscCode"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/account/verify/penny-drop' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "accountNumber":"XXXXXX9648", "ifscCode": "SBIN0001234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message ||
        {},
    },
  },

  // 2. Account Penny Less
  {
    id: "account_penny_less",
    categoryId: "BANKING_FINANCIAL",
    label: "ACCOUNT PENNY LESS",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "account/verify/penny-less",
        LiveUrl: `${KYC_BASE}/account/verify/penny-less`,
      },
      title: {
        header: "BANK ACCOUNT VERIFICATION",
        headerTitle: "Verify Bank IFSC details",
        submitButton: "Verify Account",
      },
      inputParams: ["accountNumber", "ifscCode"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/bank/bankAccount/Verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "accountNumber":"XXXXXX9648", "ifscCode": "SBIN0001234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message ||
        {},
    },
  },
  // 3. Advanced Bank Account Verify
  {
    id: "advanced_bank_account_verify",
    categoryId: "BANKING_FINANCIAL",
    label: "ADVANCED BANK ACCOUNT VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "bank/bankAccount/Verify",
        LiveUrl: `${KYC_BASE}/bank/bankAccount/Verify`,
      },
      title: {
        header: "BANK ACCOUNT VERIFICATION",
        headerTitle: "Verify Bank IFSC details",
        submitButton: "Verify Account",
      },
      inputParams: ["accountNumber", "ifscCode"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/bank/bankAccount/Verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "accountNumber":"XXXXXX9648", "ifscCode": "SBIN0001234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message ||
        {},
    },
  },
  // 4. IFSC Code Check
  {
    id: "ifsc_code_check",
    categoryId: "BANKING_FINANCIAL",
    label: "IFSC CODE CHECK",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "bin/getBankDetails",
        LiveUrl: `${KYC_BASE}/bin/getBankDetails`,
      },
      title: {
        header: "IFSC CODE CHECK",
        headerTitle: "Verify IFSC Code Details",
        submitButton: "Verify IFSC",
      },
      inputParams: ["ifscCode"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/bin/getBankDetails' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "ifscCode": "SBIN0001234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message ||
        {},
    },
  },
  // 5. Cheque Classification
  {
    id: "cheque_classification",
    categoryId: "BANKING_FINANCIAL",
    label: "CHEQUE CLASSIFICATION",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "bank/bankAccount/Verify",
        LiveUrl: `${KYC_BASE}/internal/bank/bankAccount/Verify`,
      },
      title: {
        header: "CHEQUE CLASSIFICATION",
        headerTitle: "Classify Cheque Details",
        submitButton: "Classify Cheque",
      },
      inputParams: ["accountNumber", "ifscCode"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/bank/bankAccount/Verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "accountNumber":"XXXXXX9648", "ifscCode": "SBIN0001234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message ||
        {},
    },
  },
  // cibil verification
  {
    id: "cibil_verification",
    categoryId: "BANKING_FINANCIAL",
    label: "CIBIL VERIFICAION",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "bank/cibil/verify",
        LiveUrl: `${KYC_BASE}/internal/bank/cibil/verify`,
      },
      title: {
        header: "CIBIL VERIFICATION",
        headerTitle: "Cibil verification",
        submitButton: "Verify IFSC",
      },
      inputParams: ["panNumber", "customerName", "customerMobile"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/bank/cibil/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber":"XXXXXX58657", "customerName":"JOHN", "customerMobile":"XXXXX7485"}'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "BANKVALID")?.examples[0]?.message || {},
    },
  },

  // 5. Business & Company
  {
    id: "business_cin",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/Cin/verify",
        LiveUrl: `${KYC_BASE}/internal/business/Cin/verify`,
      },
      title: {
        header: "CIN Verification",
        headerTitle: "Verify Corporate Identification Number",
        submitButton: "Verify CIN",
      },
      inputParams: ["CIN"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Cin/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "CIN": "L01234MH2021PLC123456" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CIN")?.examples[0]?.message || {},
    },
  },
  {
    id: "business_udyam",
    categoryId: "BUSINESS_COMPANY",
    label: "Udyam Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/udyam/verify",
        LiveUrl: `${KYC_BASE}/internal/business/udyam/verify`,
      },
      title: {
        header: "Udyam Verification",
        headerTitle: "Verify Udyam Registration details",
        submitButton: "Verify Udyam",
      },
      inputParams: ["udyamNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyam/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "udyamNumber": "UDYAM-KR-00-1234567" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "UDAM")?.examples[0]?.message || {},
    },
  },
  {
    id: "business_iec",
    categoryId: "BUSINESS_COMPANY",
    label: "Import Export Certificate / IEC",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/IEC/verify",
        LiveUrl: `${KYC_BASE}/internal/business/IEC/verify`,
      },
      title: {
        header: "IEC Verification",
        headerTitle: "Verify Import Export Code",
        submitButton: "Verify IEC",
      },
      inputParams: ["iecNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/IEC/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "iecNumber": "0123456789" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "IEC")?.examples[0]?.message || {},
    },
  },
  {
    id: "cinbased_companysearch",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Based Company Search",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/cinbased/company/search",
        LiveUrl: `${KYC_BASE}/internal/business/cinbased/company/search`,
      },
      title: {
        header: "CIN Based Company Search",
        headerTitle: "CIN Based Company Search",
        submitButton: "Search company",
      },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/cinbased/company/search' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName": "XYZ PVT LIT" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "company_search",
    categoryId: "BUSINESS_COMPANY",
    label: "Company Search",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/companylist/verify",
        LiveUrl: `${KYC_BASE}/internal/business/companylist/verify`,
      },
      title: {
        header: "Company Search",
        headerTitle: "Search company details",
        submitButton: "Search",
      },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/companylist/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName": "XYZ PVT LIT" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "COMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "din_verification",
    categoryId: "BUSINESS_COMPANY",
    label: "VERIFY DIN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/din/verify",
        LiveUrl: `${KYC_BASE}/internal/business/din/verify`,
      },
      title: {
        header: "VEFIFY DIN",
        headerTitle: "Verify DIN",
        submitButton: " Verify din",
      },
      inputParams: ["dinNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/din/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "dinNumber": "xxxxxx4578" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DIN")?.examples[0]?.message || {},
    },
  },
  {
    id: "gstin_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/Gstin/verify",
        LiveUrl: `${KYC_BASE}/internal/business/Gstin/verify`,
      },
      title: {
        header: "VERIFY GSTNUMBER",
        headerTitle: "Verify GSTIN",
        submitButton: "Verify GSTING",
      },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstin/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GSTIN")?.examples[0]?.message || {},
    },
  },
  {
    id: "gstin_to_pan",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN TO PAN VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/Gstintopan/verify",
        LiveUrl: `${KYC_BASE}/internal/business/Gstintopan/verify`,
      },
      title: {
        header: "GSTIN TO PAN VERIFY",
        headerTitle: "Gstin to Pan Verify",
        submitButton: "Verify GSTING",
      },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstintopan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PANUSINGGSTIN")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "gstin_tax_payer",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN TAX PAYER VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/GstIn/TaxPayer/verify",
        LiveUrl: `${KYC_BASE}/internal/business/GstIn/TaxPayer/verify`,
      },
      title: {
        header: "GSTIN TAXPAYER VERIFY",
        headerTitle: "Gsting TAXPAYER Verify",
        submitButton: "Verify",
      },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/GstIn/TaxPayer/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT"}'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GSTINTAXPAYER")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "gstin_verify_and_track",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN VIEW AND TRACK VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/Gstin/ViewAndTrack/verify",
        LiveUrl: `${KYC_BASE}/internal/business/Gstin/ViewAndTrack/verify`,
      },
      title: {
        header: "GSTIN VIEW AND TRACK VERIFY",
        headerTitle: "Gsting View and Track Verify",
        submitButton: "Verify GSTING",
      },
      inputParams: ["gstinNumber", "Financialyear"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstin/ViewAndTrack/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT","Financialyear":"2025-26" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GSTINVIEWTRACK")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "dgft_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "DGFT VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/DGFT/verify",
        LiveUrl: `${KYC_BASE}/internal/business/DGFT/verify`,
      },
      title: {
        header: "DGFT VERIFY",
        headerTitle: "DGFT Verify",
        submitButton: "Verify DGFT",
      },
      inputParams: ["DGFT"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/DGFT/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "DGFT":"2025-26" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "lei_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "lei VERIFY",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/LEI/verify",
        LiveUrl: `${KYC_BASE}/internal/business/LEI/verify`,
      },
      title: {
        header: "LEI VERIFY",
        headerTitle: "LEI Verify",
        submitButton: "Verify LEI",
      },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/LEI/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName":"2025-26" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "udoyog_aadhaar_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "Udoyog Aadhaar verify",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/udyogAadhaar/verify",
        LiveUrl: `${KYC_BASE}/internal/business/udyogAadhaar/verify`,
      },
      title: {
        header: "udoyog Aadhaar VERIFY",
        headerTitle: "Udoyog Aadhaar Verify",
        submitButton: "Verify Udoyog Aadhaar",
      },
      inputParams: ["UAMNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyogAadhaar/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "UAMNumber":"2025-26" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "shop_establishment_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "shop establishment Verify",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/shopest/verify",
        LiveUrl: `${KYC_BASE}/internal/business/shopest/verify`,
      },
      title: {
        header: "Shop Verify",
        headerTitle: "Shop Establishment Verification",
        submitButton: "Verify",
      },
      inputParams: ["registrationNumber", "state"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/shopest/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "registrationNumber":"", "state":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "udyog_phone_aadhaar",
    categoryId: "BUSINESS_COMPANY",
    label: "UdyogAadhaar with Phone Verify",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "business/udyogAadhaar/verify",
        LiveUrl: `${KYC_BASE}/internal/business/udyogAadhaar/verify`,
      },
      title: {
        header: "udoyog Aadhaar with Phone VERIFY",
        headerTitle: "Udoyog Aadhaar With Phone Verify",
        submitButton: "Verify",
      },
      inputParams: ["UAMNumber", "customerNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyogAadhaar/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "UAMNumber":"2025-26", "customerNumber":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CINBASECOMPANYSEARCH")?.examples[0]
          ?.message || {},
    },
  },

  // 6. Employment & Income
  {
    id: "uan_basic",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Basic UAN Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "employee/uan/basic",
        LiveUrl: `${KYC_BASE}/internal/employee/uan/basic`,
      },
      title: {
        header: "UAN Verification",
        headerTitle: "Verify Basic UAN details",
        submitButton: "Verify UAN",
      },
      inputParams: ["uanNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/employee/uan/basic' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "uanNumber": "123456789012" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "EMPLOYUANBASIC")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "employment_dual_check",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Dual Employment Check",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "employee/dual_employment/check",
        LiveUrl: `${KYC_BASE}/internal/employee/dual_employment/check`,
      },
      title: {
        header: "Dual Employment Check",
        headerTitle: "Check for duplicate employment records",
        submitButton: "Check",
      },
      inputParams: ["uanNumber", "panNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/employee/dual_employment/check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "uanNumber": "123456789012", "panNumber": "ABCDE1234F" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },

  // 7. Vehicle & Transport
  {
    id: "vehicle_rc",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Vehicle RC",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "vehicle/rcverify",
        LiveUrl: `${KYC_BASE}/internal/vehicle/rcverify`,
      },
      title: {
        header: "RC Verification",
        headerTitle: "Verify Vehicle RC details",
        submitButton: "Verify RC",
      },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/rcverify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "rcNumber": "DL1CA1234" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "RC")?.examples[0]?.message || {},
    },
  },
  {
    id: "vehicle_dl",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Driving License",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "vehicle/driving_license/verify",
        LiveUrl: `${KYC_BASE}/internal/vehicle/driving_license/verify`,
      },
      title: {
        header: "DL Verification",
        headerTitle: "Verify Driving License details",
        submitButton: "Verify DL",
      },
      inputParams: ["licenseNo", "DateOfBirth"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/driving_license/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "licenseNo": "DL-1234567890123", "DateOfBirth": "1990-01-01" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DL")?.examples[0]?.message || {},
    },
  },
  {
    id: "vehicle_reg",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Vehicle Registeration",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "vehicle/register",
        LiveUrl: `${KYC_BASE}/internal/vehicle/register`,
      },
      title: {
        header: "Vehicle Registeration",
        headerTitle: "Register Vehicle details",
        submitButton: "Verify",
      },
      inputParams: ["RegistrationNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/register' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "RegistrationNumber": "DL-1234567890123" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DL")?.examples[0]?.message || {},
    },
  },
  {
    id: "stolen_vehicle",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Stolen Vehicle Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "vehicle/stolen_vehicle/verification",
        LiveUrl: `${KYC_BASE}/internal/vehicle/stolen_vehicle/verification`,
      },
      title: {
        header: "Stolen vehicle verification",
        headerTitle: "Stolen Vehicle verification",
        submitButton: "Verify",
      },
      inputParams: ["vehicleRegisterationNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/stolen_vehicle/verification' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "vehicleRegisterationNumber": "DL-1234567890123" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DL")?.examples[0]?.message || {},
    },
  },
  {
    id: "challan_via_rc",
    categoryId: "VEHICLE_TRANSPORT",
    label: "ChallanVie RC",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "vehicle/challan_via_rc",
        LiveUrl: `${KYC_BASE}/internal/vehicle/challan_via_rc`,
      },
      title: {
        header: "ChallanVia RC",
        headerTitle: "Check Challan with RC",
        submitButton: "Verify",
      },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/challan_via_rc' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "rcNumber": "DL-1234567890123" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DL")?.examples[0]?.message || {},
    },
  },

  // 8. Face & AI Verification
  {
    id: "face_match",
    categoryId: "FACE_AI",
    label: "Face Match",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "face/facematch",
        LiveUrl: `${KYC_BASE}/internal/face/facematch`,
      },
      title: {
        header: "Face Match",
        headerTitle: "Match two faces for similarity",
        submitButton: "Compare",
      },
      inputFile: [{ name: "userImages" }, { name: "aadhaarImages" }],
      isBase64: true,
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/face/facematch' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "userImage": "base64_string", "aadhaarImage": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "FACE")?.examples[0]?.message || {},
    },
  },
  {
    id: "blur_check",
    categoryId: "FACE_AI",
    label: "Blur Check",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "image/blur_Check",
        LiveUrl: `${KYC_BASE}/image/blur_Check`,
      },
      title: {
        header: "Face Match",
        headerTitle: "Match two faces for similarity",
        submitButton: "Compare",
      },
      // inputParams: ["file"],
      inputFile: [{ name: "file" }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/image/blur_Check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'file=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "FACE")?.examples[0]?.message || {},
    },
  },
  {
    //AI and Deepfake Detection
    id: "ai_deepfake_detection",
    categoryId: "FACE_AI",
    label: "AI and deepfake detection",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "image/ai_deepfake_check",
        LiveUrl: `${KYC_BASE}/image/ai_deepfake_check`,
      },
      title: {
        header: "AI and Deepfake Detection",
        headerTitle: "AI and Deepfake Detection",
        submitButton: "Compare",
      },
      // inputParams: ["file"],
      inputFile: [{ name: "file" }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/image/ai_deepfake_check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'file=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "FACE")?.examples[0]?.message || {},
    },
  },
  {
    //AI and Deepfake Detection
    id: "deepfake_detection",
    categoryId: "FACE_AI",
    label: "deepfake detection",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "image/deepfake_check",
        LiveUrl: `${KYC_BASE}/image/deepfake_check`,
      },
      title: {
        header: "Deepfake Detection",
        headerTitle: "Image Deepfake Detection",
        submitButton: "Compare",
      },
      // inputParams: ["file"],
      inputFile: [{ name: "file" }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/image/deepfake_check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'file=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "FACE")?.examples[0]?.message || {},
    },
  },
  {
    //AI and Deepfake Detection
    id: "image_check",
    categoryId: "FACE_AI",
    label: "Image Check",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "image/ai_image_check",
        LiveUrl: `${KYC_BASE}/image/ai_image_check`,
      },
      title: {
        header: "Image check",
        headerTitle: "Image Check",
        submitButton: "Compare",
      },
      // inputParams: ["file"],
      inputFile: [{ name: "file" }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/image/ai_image_check' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'file=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "FACE")?.examples[0]?.message || {},
    },
  },
  {
    //image liveness check
    id: "image_liveness_check",
    categoryId: "FACE_AI",
    label: "Image Liveness Check",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/image/liveness",
        LiveUrl: `${KYC_BASE}/image/liveness`,
      },
      title: {
        header: "Image livenesscheck",
        headerTitle: "Image Liveness Check",
        submitButton: "Liveness Check",
      },
      // inputParams: ["file"],
      inputFile: [{ name: "person" }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/image/liveness' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --form 'person=@/C:/Users/ntar3/OneDrive/Desktop/Expensive-Things-Owned-By-5_610bb04b6af3a.jpeg'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "ILC")?.examples[0]?.message || {},
    },
  },

  // 9. OCR & Document AI
  {
    id: "ocr_pan",
    categoryId: "OCR_DOCUMENT_AI",
    label: "PAN OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "ocr/pan",
        LiveUrl: `${KYC_BASE}/internal/ocr/pan`,
      },
      title: {
        header: "PAN OCR",
        headerTitle: "Extract details from PAN image",
        submitButton: "Extract Pan Details",
      },
      inputFile: [{ name: "front" }, { name: "back", optional: true }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/ocr/pan' \\
        --header 'content-type: multipart/form-data' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN_OCR")?.examples[0]?.message ||
        {},
    },
  },
  {
    id: "ocr_voter",
    categoryId: "OCR_DOCUMENT_AI",
    label: "VOTER OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/ocr/voter",
        LiveUrl: `${KYC_BASE}/ocr/voter`,
      },
      title: {
        header: "VOTER OCR",
        headerTitle: "Extract details from VOTER image",
        submitButton: "Extract Voter Details",
      },
      inputFile: [{ name: "front" }, { name: "back", optional: true }],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/ocr/voter' \\
        --header 'content-type: multipart/form-data' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "VoterID")?.examples[0]?.message ||
        {},
      URLS: "ocr/voter",
      LiveUrl: `${KYC_BASE}/internal/ocr/voter`,
    },
  },
  {
    id: "ocr_dl",
    categoryId: "OCR_DOCUMENT_AI",
    label: "DRIVING LICENCE OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "ocr/Dl/verify",
        LiveUrl: `${KYC_BASE}/internal/ocr/Dl/verify`,
      },
      title: {
        header: "DRIVING LICENCE OCR",
        headerTitle: "Extract details from driving licence image",
        submitButton: "Extract",
      },
      inputFile: [{ name: "front" }, { name: "back", optional: true }],
      isBase64: true,
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/ocr/Dl/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  {
    id: "ocr_passport",
    categoryId: "OCR_DOCUMENT_AI",
    label: "PASSPORT OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "ocr/passport/verify",
        LiveUrl: `${KYC_BASE}/internal/ocr/passport/verify`,
      },
      title: {
        header: "DRIVING LICENCE OCR",
        headerTitle: "Extract details from passport image",
        submitButton: "Extract",
      },
      inputFile: [{ name: "front" }, { name: "back", optional: true }],
      isBase64: true,
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/ocr/passport/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  {
    id: "ocr_aadhaar",
    categoryId: "OCR_DOCUMENT_AI",
    label: "AADHAAR OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/ocr/aadhaar/verify",
        LiveUrl: `${KYC_BASE}/ocr/aadhaar/verify`,
      },
      title: {
        header: "AADHAAR OCR",
        headerTitle: "Extract details from Aadhar image",
        submitButton: "Extract Aadhar Details",
      },
      inputFile: [
        { name: "front image" },
        { name: "back image", optional: true },
      ],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/ocr/aadhaar/verify' \\
        --header 'content-type: multipart/form-data' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "AVS")?.examples[0]?.message ||
        {},
    },
  },
  {
    id: "ocr_cheque",
    categoryId: "OCR_DOCUMENT_AI",
    label: "CHEQUE OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/ocr/cheque/verify",
        LiveUrl: `${KYC_BASE}/ocr/cheque/verify`,
      },
      title: {
        header: "CHEQUE OCR",
        headerTitle: "Extract details from Cheque image",
        submitButton: "Extract Cheque Details",
      },
      inputFile: [
        { name: "front image" },

        { name: "back image", optional: true },
      ],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/ocr/cheque/verify' \\
      --header 'content-type: multipart/form-data' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{ "image": "base64_string" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "CHEQUE_OCR")?.examples[0]?.message ||
        {},
    },
  },
  // 10. Government ID Services
  {
    id: "gov_voter_id",
    categoryId: "GOVERNMENT_ID",
    label: "Voter Id",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "government/voterId/verify",
        LiveUrl: `${KYC_BASE}/internal/government/voterId/verify`,
      },
      title: {
        header: "Voter ID Verification",
        headerTitle: "Verify Voter ID details",
        submitButton: "Verify Voter ID",
      },
      inputParams: ["voterId"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/voterId/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "voterId": "ABC1234567" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "VoterID")?.examples[0]?.message || {},
    },
  },
  {
    id: "passport_fileno",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport File No",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "government/passport_fileNo/verify",
        LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify`,
      },
      title: {
        header: "Passport FileNo",
        headerTitle: "Verify Passport FileNO details",
        submitButton: "Verify",
      },
      inputParams: ["passportFileNo", "DateOfBirth"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo": "123456789", "DateOfBirth": "TNEB" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "ELEC")?.examples[0]?.message || {},
    },
  },
  {
    id: "passport_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "government/passport_fileNo/verify",
        LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify`,
      },
      title: {
        header: "Passport Verify",
        headerTitle: "Verify Passport details",
        submitButton: "Verify",
      },
      inputParams: [
        "passportFileNo",
        "surname",
        "firstName",
        "gender",
        "countryCode",
        "dateOfBirth",
        "passportType",
        "dateOfExpiry",
        "mrz1",
        "mrz2",
      ],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "ELEC")?.examples[0]?.message || {},
    },
  },
  {
    id: "passport_ocr_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport OCR",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "government/passport_fileNo/verify",
        LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify`,
      },
      title: {
        header: "Passport OCR Verify",
        headerTitle: "Verify Passport OCR details",
        submitButton: "Verify",
      },
      inputParams: [
        "passportFileNo",
        "surname",
        "firstName",
        "gender",
        "countryCode",
        "dateOfBirth",
        "passportType",
        "dateOfExpiry",
        "mrz1",
        "mrz2",
      ],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ ""passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "ELEC")?.examples[0]?.message || {},
    },
  },
  {
    id: "tin_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify tin",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "government/passport_fileNo/verify",
        LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify`,
      },
      title: {
        header: "Tin Verify",
        headerTitle: "Verify Tin details",
        submitButton: "Verify",
      },
      inputParams: ["TIN"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "ELEC")?.examples[0]?.message || {},
    },
  },

  // 11. Contact & Communication
  {
    id: "pan_verify",
    categoryId: "CONTACT_COMMUNICATION",
    label: "pan Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "contact/pan/verify",
        LiveUrl: `${KYC_BASE}/internal/contact/pan/verify`,
      },
      title: {
        header: "pan Verification",
        headerTitle: "Get pan with Mobile Number",
        submitButton: "submit",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/pan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "uan_verify",
    categoryId: "CONTACT_COMMUNICATION",
    label: "uan Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "contact/uan/verify",
        LiveUrl: `${KYC_BASE}/internal/contact/uan/verify`,
      },
      title: {
        header: "uan Verification",
        headerTitle: "Get uan with Mobile Number",
        submitButton: "submit",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/uan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "advance_data",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Advance Data with Mobile Number",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "contact/advanceData/getOtp",
        LiveUrl: `${KYC_BASE}/internal/contact/advanceData/getOtp`,
      },
      title: {
        header: "Advance Data with Mobile Number",
        headerTitle: "Advance Details with Mobile Number, send OTP",
        submitButton: "submit",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/advanceData/getOtp' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "advance_data_verify_otp",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Advance Data with Mobile Number verify OTP",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "contact/advanceData/getOtp",
        LiveUrl: `${KYC_BASE}/internal/contact/advanceData/getOtp`,
      },
      title: {
        header: "Advance Data with Mobile Number",
        headerTitle: "Advance Details with Mobile Number, Verify OTP",
        submitButton: "submit",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/advanceData/getOtp' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "contact_mobile_otp",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Mobile OTP Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "mobileNumber/otp_generation",
        LiveUrl: `${KYC_BASE}/internal/mobileNumber/otp_generation`,
      },
      title: {
        header: "Mobile OTP",
        headerTitle: "Send OTP to mobile number",
        submitButton: "Send OTP",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/mobileNumber/otp_generation' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
    },
  },
  {
    id: "mobile_pan",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Mobile TO PAN",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "mobileNumber/pan/verify",
        LiveUrl: `${KYC_BASE}/mobileNumber/pan/verify`,
      },
      title: {
        header: "Mobile to Pan",
        headerTitle: "Mobile to pan Verification",
        submitButton: "verify",
      },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/mobileNumber/pan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOP")?.examples[0]?.message || {},
    },
  },
  {
    id: "mobile_to_address",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Mobile TO ADDRESS",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "/contact/address/search",
        LiveUrl: `${KYC_BASE}/contact/address/search`,
      },
      title: {
        header: "Mobile to Address",
        headerTitle: "Mobile to Address",
        submitButton: "verify",
      },
      inputParams: ["mobile"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/contact/address/search' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobile": "9876543210" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MTA")?.examples[0]?.message || {},
    },
  },

  // RISK DUE DILIGENCE
  {
    id: "court_record_check_diy",
    categoryId: "RISK_DUE_DILIGENCE",
    label: "Check court record",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "diligence/court/record",
        LiveUrl: `${KYC_BASE}/diligence/court/record`,
      },
      title: {
        header: "check court record",
        headerTitle: "Check court recores history",
        submitButton: "Check",
      },
      inputParams: ["recordName", "address"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/diligence/court/record' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "recordName": "9876543210", "address":"XYZ@gmail.com" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "MOP")?.examples[0]
          ?.message || {},
    },
  },

  // Pre-configured for Sidebar Navigation
  // {
  //   id: "recharge_operators",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/Operators",
  //       LiveUrl: `${RECHARGE_BASE}/Operators`,
  //     },
  //     title: {
  //       header: "Fetch Operators",
  //       headerTitle: "Fetch mobile operator details",
  //       submitButton: "Fetch Operators",
  //     },
  //     inputParams: ["mobileNumber"],
  //     Inputvalues: ["9876543210"],
  //     isToken: true,
  //     isMicro: "RECHARGE",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${RECHARGE_BASE}/Operators' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "mobileNumber": "9876543210" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "recharge_plans",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/Plans",
  //       LiveUrl: `${RECHARGE_BASE}/Plans`,
  //     },
  //     title: {
  //       header: "Fetch Plans",
  //       headerTitle: "Fetch recharge plans",
  //       submitButton: "Fetch Plans",
  //     },
  //     inputParams: ["operatorcode", "circle"],
  //     Inputvalues: ["AT", "1"],
  //     isToken: true,
  //     isMicro: "RECHARGE",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${RECHARGE_BASE}/Plans' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "operatorcode": "AT", "circle": "1" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "recharge_offers",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/OffersPlans",
  //       LiveUrl: `${RECHARGE_BASE}/OffersPlans`,
  //     },
  //     title: {
  //       header: "Fetch Offers",
  //       headerTitle: "Fetch special offers",
  //       submitButton: "Fetch Offers",
  //     },
  //     inputParams: ["operator_code", "mobile_no"],
  //     Inputvalues: ["AT", "9876543210"],
  //     isToken: true,
  //     isMicro: "RECHARGE",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${RECHARGE_BASE}/OffersPlans' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "operator_code": "AT", "mobile_no": "9876543210" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "recharge_recharge_url",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/RechargeURL",
  //       LiveUrl: `${RECHARGE_BASE}/RechargeURL`,
  //     },
  //     title: {
  //       header: "Recharge URL",
  //       headerTitle: "Initiate Recharge",
  //       submitButton: "Recharge",
  //     },
  //     inputParams: ["mobile", "amount"],
  //     Inputvalues: ["9876543210", "100"],
  //     isToken: true,
  //     isMicro: "RECHARGE",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${RECHARGE_BASE}/RechargeURL' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "mobile": "9876543210", "amount": "100" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "recharge_old_plans",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/OldPlans",
  //       LiveUrl: `${RECHARGE_BASE}/OldPlans`,
  //     },
  //     title: {
  //       header: "Old Plans",
  //       headerTitle: "Fetch old plans",
  //       submitButton: "Fetch Old Plans",
  //     },
  //     inputParams: ["mobile"],
  //     Inputvalues: ["9876543210"],
  //     isToken: true,
  //     isMicro: "RECHARGE",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${RECHARGE_BASE}/OldPlans' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "mobile": "9876543210" }'`,
  //     exampleResponse: {},
  //   },
  // },

  // {
  //   id: "bbps_category",
  //   config: {
  //     apiUrl: {
  //       Method: "Get",
  //       URLS: "/billerInfo/Category",
  //       LiveUrl: `${BBPS_BASE}/billerInfo/Category`,
  //     },
  //     title: {
  //       header: "Fetch Category",
  //       headerTitle: "Fetch all BBPS categories",
  //       submitButton: "Fetch Category",
  //     },
  //     inputParams: [],
  //     Inputvalues: [],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/billerInfo/Category' \\\n--header 'secret_token: {{secret_token}}'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "bbps_biller_info",
  //   config: {
  //     apiUrl: {
  //       Method: "Get",
  //       URLS: "/billerInfo/Biller",
  //       LiveUrl: `${BBPS_BASE}/billerInfo/Biller`,
  //     },
  //     title: {
  //       header: "Fetch Biller Info",
  //       headerTitle: "Fetch biller information",
  //       submitButton: "Fetch Biller Info",
  //     },
  //     inputParams: ["billerId"],
  //     Inputvalues: ["XYZ"],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/billerInfo/Biller?billerId=XYZ' \\\n--header 'secret_token: {{secret_token}}'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "bbps_bill_fetch",
  //   config: {
  //     apiUrl: {
  //       Method: "Get",
  //       URLS: "/billFetch",
  //       LiveUrl: `${BBPS_BASE}/billFetch`,
  //     },
  //     title: {
  //       header: "Bill Fetch",
  //       headerTitle: "Fetch bill details",
  //       submitButton: "Fetch Bill",
  //     },
  //     inputParams: ["customerNumber"],
  //     Inputvalues: ["9876543210"],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/billFetch?customerNumber=9876543210' \\\n--header 'secret_token: {{secret_token}}'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "bbps_bill_pay",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/billPay",
  //       LiveUrl: `${BBPS_BASE}/billPay`,
  //     },
  //     title: {
  //       header: "Bill Pay",
  //       headerTitle: "Pay a fetched bill",
  //       submitButton: "Pay Bill",
  //     },
  //     inputParams: ["billId"],
  //     Inputvalues: ["BILL123"],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/billPay' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "billId": "BILL123" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "bbps_bill_validation",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/billValidation",
  //       LiveUrl: `${BBPS_BASE}/billValidation`,
  //     },
  //     title: {
  //       header: "Bill Validation",
  //       headerTitle: "Validate bill details",
  //       submitButton: "Validate Bill",
  //     },
  //     inputParams: ["billId"],
  //     Inputvalues: ["BILL123"],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/billValidation' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "billId": "BILL123" }'`,
  //     exampleResponse: {},
  //   },
  // },
  // {
  //   id: "bbps_quick_pay",
  //   config: {
  //     apiUrl: {
  //       Method: "Post",
  //       URLS: "/quickPay",
  //       LiveUrl: `${BBPS_BASE}/quickPay`,
  //     },
  //     title: {
  //       header: "Quick Pay",
  //       headerTitle: "Quickly pay a bill",
  //       submitButton: "Quick Pay",
  //     },
  //     inputParams: ["mobile"],
  //     Inputvalues: ["9876543210"],
  //     isToken: true,
  //     isMicro: "BBPS",
  //     isDisable: true,
  //     exampleCurl: `curl --location '${BBPS_BASE}/quickPay' \\\n--header 'Content-Type: application/json' \\\n--header 'secret_token: {{secret_token}}' \\\n--data '{ "mobile": "9876543210" }'`,
  //     exampleResponse: {},
  //   },
  // },

  // 12. Geo & Location
  {
    id: "geo_pincode",
    categoryId: "GEO_LOCATION",
    label: "Pincode Geofencing",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/pincode/geofencing",
        LiveUrl: `${KYC_BASE}/internal/location/pincode/geofencing`,
      },
      title: {
        header: "Pincode Geofencing",
        headerTitle: "Verify Pincode specific geofence",
        submitButton: "Verify Range",
      },
      inputParams: ["pincode", "latitude", "longitude"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/location/pincode/geofencing' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "pincode": "560001", "latitude": "12.9716", "longitude": "77.5946" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GEWPINCODE")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "Lat_long_geo",
    categoryId: "GEO_LOCATION",
    label: "Longitude/Latitude Geofencing",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/longLat/geofencing",
        LiveUrl: `${KYC_BASE}/location/longLat/geofencing`,
      },
      title: {
        header: "Longitude/Latitude Geofencing",
        headerTitle: "Longitude/Latitude Geofencing",
        submitButton: "search",
      },
      inputParams: ["latitude", "longitude"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/longLat/geofencing' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "latitude":"12.9716", "longitude": "77.5946" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GEWLATLONG")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "Lat_long_digi_pin",
    categoryId: "GEO_LOCATION",
    label: "Longitude, Latitude To Digipin",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/longLat/digipin",
        LiveUrl: `${KYC_BASE}/location/longLat/digipin`,
      },
      title: {
        header: "Longitude/Latitude To DIGIPIN",
        headerTitle: "Longitude/Latitude To DIGIPIN",
        submitButton: "search",
      },
      inputParams: ["latitude", "longitude"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/longLat/digipin' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "latitude":"12.9716", "longitude": "77.5946" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "LATLONGTODIGIPIN")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "digi_pin_Lat_long",
    categoryId: "GEO_LOCATION",
    label: "Digipin To Longitude/Latitude",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/digipin/longLat",
        LiveUrl: `${KYC_BASE}/location/digipin/longLat`,
      },
      title: {
        header: "Digipin To longitud",
        headerTitle: "Digipin To longitud",
        submitButton: "search",
      },
      inputParams: ["digiPin"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/digipin/longLat' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "digiPin": " " }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "DIGIPINTOLATLONG")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "address_digi_pin",
    categoryId: "GEO_LOCATION",
    label: "Address to Digi Pin",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/address/digipin",
        LiveUrl: `${KYC_BASE}/location/address/digipin`,
      },
      title: {
        header: "Address to Digi Pin",
        headerTitle: "Address to Digi Pin",
        submitButton: "search",
      },
      inputParams: ["address"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/address/digipin' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "address": "" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GEWLATLONG")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "Geo_tagging",
    categoryId: "GEO_LOCATION",
    label: "Geo Taggin",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/geo/tagging",
        LiveUrl: `${KYC_BASE}/location/geo/tagging`,
      },
      title: {
        header: "Geo Taggin",
        headerTitle: "Geo Taggin",
        submitButton: "search",
      },
      inputParams: ["latitude", "longitude"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/geo/tagging' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "latitude": "","longitude":"" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GEOTAGGING")?.examples[0]
          ?.message || {},
    },
  },
  {
    id: "Geo_tagging_dist_calcu",
    categoryId: "GEO_LOCATION",
    label: "Calculate Distance with geo Taggin",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "location/geo/tagging/distance_calculation",
        LiveUrl: `${KYC_BASE}/location/geo/tagging/distance_calculation`,
      },
      title: {
        header: "Geo Taggin",
        headerTitle: "Geo Taggin",
        submitButton: "search",
      },
      inputParams: ["address", "latitude", "longitude"],
      isToken: true,
      isMicro: "KYC",
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/location/geo/tagging/distance_calculation' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "address": "", "latitude": "", "longitude": "" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "GEOTAGDISTANCECALCULATE")?.examples[0]
          ?.message || {},
    },
  },
  

  // 14. Professional Verification
  {
    id: "prof_insurance",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Insurance Verification",

    config: {
      apiUrl: {
        Method: "Post",
        URLS: "professional/Insurance/verify",
        LiveUrl: `${KYC_BASE}/internal/professional/Insurance/verify`,
      },

      title: {
        header: "Insurance Verification",
        headerTitle: "Verify Insurance details",
        submitButton: "Verify Insurance",
      },

      inputParams: [
        "PanNumber",
        "MobileNumber",
      ],

      isToken: true,
      isMicro: "KYC",

      exampleCurl: `curl --location '${KYC_BASE}/internal/professional/charteredAccount/verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{
        "PanNumber": "ABCDE1234F",
        "MobileNumber": "9876543210"
      }'`,

      exampleResponse:
        apiExamples.find((e) => e.name === "INSURANCE")?.examples[0]?.message || {},
    },
  },
  {
    id: "prof_ca",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Chartered Accountant Verification",

    config: {
      apiUrl: {
        Method: "Post",
        URLS: "professional/ca/verify",
        LiveUrl: `${KYC_BASE}/internal/professional/charteredAccount/verify`,
      },

      title: {
        header: "Chartered Accountant Verification",
        headerTitle: "Verify Chartered Accountant details",
        submitButton: "Verify CA",
      },

      inputParams: [
        "MembershipNumber",
      ],

      isToken: true,
      isMicro: "KYC",

      exampleCurl: `curl --location '${KYC_BASE}/internal/professional/ca/verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{
        "MembershipNumber": "123456"
      }'`,

      exampleResponse:
        apiExamples.find((e) => e.name === "CA")?.examples[0]?.message || {},
    },
  },
  {
    id: "prof_doctor",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Doctor Verification",
    config: {
      apiUrl: {
        Method: "Post",
        URLS: "professional/docter/verify",
        LiveUrl: `${KYC_BASE}/internal/professional/docter/verify`,
      },
      title: {
        header: "Doctor Verification",
        headerTitle: "Verify Medical Professional details",
        submitButton: "Verify Doctor",
      },
      inputParams: ["registrationNumber"],
      isToken: true,
      isMicro: "KYC",
      exampleCurl: `curl --location '${KYC_BASE}/internal/professional/docter/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "registrationNumber": "DOC12345" }'`,
      exampleResponse:
        apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
    },
  },
  {
    id: "prof_dentist",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Dentist Verification",

    config: {
      apiUrl: {
        Method: "Post",
        URLS: "professional/dentist/verify",
        LiveUrl: `${KYC_BASE}/internal/professional/dentist/verify`,
      },

      title: {
        header: "Dentist Verification",
        headerTitle: "Verify Dentist details",
        submitButton: "Verify Dentist",
      },

      inputParams: [
        "RegistrationNumber",
        "state",
      ],

      isToken: true,
      isMicro: "KYC",

      exampleCurl: `curl --location '${KYC_BASE}/internal/professional/dentist/verify' \\
      --header 'Content-Type: application/json' \\
      --header 'secret_token: {{secret_token}}' \\
      --data '{
        "RegistrationNumber": "DOC12345",
        "state": "Telangana"
      }'`,

      exampleResponse:
        apiExamples.find((e) => e.name === "DENTIST")?.examples[0]?.message || {},
    },
  },

  

];




export const getServiceById = (id) =>
  SERVICES_METADATA.find((s) => s.id === id);
