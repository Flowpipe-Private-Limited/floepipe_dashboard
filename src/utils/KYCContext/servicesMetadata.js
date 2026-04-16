import images from "../../Images/Images";
import { KYC_BASE, apiExamples, ERROR_RESPONSES, RECHARGE_BASE, BBPS_BASE } from "./kycContex";

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
      apiUrl: { Method: 'Post', URLS: "client/pan/verify", LiveUrl: `${KYC_BASE}/internal/pan/verify` },
      title: { header: "PAN Verification", headerTitle: "Verify PAN details basic", submitButton: 'Verify PAN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/verify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/pan/knowDirector", LiveUrl: `${KYC_BASE}/internal/pan/knowDirector` },
      title: { header: "PAN Director Search", headerTitle: "Know Director details using PAN", submitButton: 'Search Director' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/knowDirector' \\
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
      apiUrl: { Method: 'Post', URLS: "client/pan/getgst_in/withpan", LiveUrl: `${KYC_BASE}/internal/pan/getgst_in/withpan` },
      title: { header: "GSTIN via PAN", headerTitle: "Fetch GSTIN details for a given PAN", submitButton: 'Fetch GSTIN' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/getgst_in/withpan' \\
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
      apiUrl: { Method: 'Post', URLS: "client/pan/tan/verify", LiveUrl: `${KYC_BASE}/internal/pan/tan/verify` },
      title: { header: "PAN/TAN Verification", headerTitle: "Verify PAN or TAN details", submitButton: 'Verify' },
      inputParams: ["panNumber", "tanNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/tan/verify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/pan/panNameMatch", LiveUrl: `${KYC_BASE}/internal/pan/panNameMatch` },
      title: { header: "PAN Name Match", headerTitle: "Match Name with PAN database", submitButton: 'Match Name' },
      inputParams: ["panNumber", "name"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/panNameMatch' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F", "name": "RAM BABU" }'`,
      exampleResponse: apiExamples.find(e => e.name === "NM")?.examples[0]?.message || {}
    }
  },
  {
    id: "gst_with_pan",
    categoryId: "PAN_SERVICES",
    label: "GST WITH PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/gst/with/pan", LiveUrl: `${KYC_BASE}/internal/pan/gst/with/pan` },
      title: { header: "GST WITH PAN", headerTitle: "Know gst with Pan", submitButton: 'submit pan' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/gst/with/pan' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse: apiExamples.find(e => e.name === "NM")?.examples[0]?.message || {}
    }
  },
  {
    id: "verify_dob_with_pan",
    categoryId: "PAN_SERVICES",
    label: "VERIFY DOB WITH PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/panName/DobVerify", LiveUrl: `${KYC_BASE}/internal/pan/panName/DobVerify` },
      title: { header: "VERIFY DOB WITH PAN", headerTitle: "Verify you Date of Birth with Pan", submitButton: 'submit pan' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/panName/DobVerify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse: apiExamples.find(e => e.name === "NM")?.examples[0]?.message || {}
    }
  },
  {
    id: "father_name_with_pan",
    categoryId: "PAN_SERVICES",
    label: "Know FatherName WITH PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/panName/DobVerify", LiveUrl: `${KYC_BASE}/internal/pan/panName/DobVerify` },
      title: { header: "KNOW FATHER NAME WITH PAN", headerTitle: "Know Father Name with pan Number", submitButton: 'submit pan' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/panName/DobVerify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F"}'`,
      exampleResponse: apiExamples.find(e => e.name === "NM")?.examples[0]?.message || {}
    }
  },
  {
    id: "generate_pan_itd",
    categoryId: "PAN_SERVICES",
    label: "PAN ITD GENERATE",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/know/itdStatus/otp_generate", LiveUrl: `${KYC_BASE}/internal/pan/know/itdStatus/otp_generate` },
      title: { header: "PAN ITD GENERATE", headerTitle: "Generate OTP for ITD with pan", submitButton: 'Generate OTP' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/know/itdStatus/otp_generate' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "verify_pan_itd",
    categoryId: "PAN_SERVICES",
    label: "PAN ITD Verify",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/know/itdStatus/otp_validate", LiveUrl: `${KYC_BASE}/internal/pan/know/itdStatus/otp_validate` },
      title: { header: "PAN ITD Verify", headerTitle: "Verify OTP for ITD with pan", submitButton: 'Generate OTP' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/know/itdStatus/otp_validate' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber": "ABCDE1234F" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "aadhaar_verify_with_pan",
    categoryId: "PAN_SERVICES",
    label: "Aadhaar Verify with PAN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/pan/verify_to_aadhaar", LiveUrl: `${KYC_BASE}/internal/pan/verify_to_aadhaar` },
      title: { header: "Aadhaar Verify with PAN", headerTitle: "Aadhaar Verify with PAN", submitButton: 'Generate OTP' },
      inputParams: ["panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/pan/verify_to_aadhaar' \\
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
      apiUrl: { Method: 'Post', URLS: "client/gst/comprehensivegst/verify", LiveUrl: `${KYC_BASE}/internal/gst/comprehensivegst/verify` },
      title: { header: "GSTIN Verification", headerTitle: "Verify GSTIN details", submitButton: 'Verify GSTIN' },
      inputParams: ["gstNo","year"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/gst/comprehensivegst/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "gstNo": "33AACCC1234F1Z1", "year":"2025-26" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GST")?.examples[0]?.message || {}
    }
  },
  {
    id: "gst_advanced",
    categoryId: "GST_SERVICES",
    label: "GST Advanced Search",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/gst/gstAdvance/verify", LiveUrl: `${KYC_BASE}/internal/gst/gstAdvance/verify` },
      title: { header: "GST Advanced", headerTitle: "Advanced GSTIN lookup and tracking", submitButton: 'Search' },
      inputParams: ["GstNo"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/gst/gstAdvance/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "GstNo": "33AACCC1234F1Z1" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GST")?.examples[0]?.message || {} // dummy
    }
  },

  // 3. Aadhaar & DigiLocker
  {
    id: "aadhaar_masking",
    categoryId: "AADHAAR_DIGILOCKER",
    label: "Aadhaar Masking",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/pan/maskedverify", LiveUrl: `${KYC_BASE}/internal/aadhaar/pan/maskedverify` },
      title: { header: "Aadhaar Masking", headerTitle: "Mask Aadhaar details for security", submitButton: 'Mask Aadhaar' },
      inputParams: ["aadhaarNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/aadhaar/pan/maskedverify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/aadhaar/digilocker/verify", LiveUrl: `${KYC_BASE}/internal/aadhaar/digilocker/verify` },
      title: { header: "DigiLocker Verification", headerTitle: "Verify DigiLocker account details", submitButton: 'Verify Account' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/aadhaar/digilocker/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },

  // 4. Banking & Financial
  {
    id: "bank_account_verification",
    categoryId: "BANKING_FINANCIAL",
    label: "BANK ACCOUNT VERIFICAION",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/bank/bankAccount/Verify", LiveUrl: `${KYC_BASE}/internal/bank/bankAccount/Verify` },
      title: { header: "BANK ACCOUNT VERIFICATION", headerTitle: "Verify Bank IFSC details", submitButton: 'Verify IFSC' },
      inputParams: ["accountNumber", "ifscCode"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/bank/bankAccount/Verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "accountNumber":"XXXXXX9648" "ifscCode": "SBIN0001234" }'`,
      exampleResponse: apiExamples.find(e => e.name === "SHOP")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "cibil_verification",
    categoryId: "BANKING_FINANCIAL",
    label: "CIBIL VERIFICAION",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/bank/cibil/verify", LiveUrl: `${KYC_BASE}/internal/bank/cibil/verify` },
      title: { header: "CIBIL VERIFICATION", headerTitle: "Cibil verification", submitButton: 'Verify IFSC' },
      inputParams: ["panNumber", "customerName", "customerMobile"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/bank/cibil/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "panNumber":"XXXXXX58657", "customerName":"JOHN", "customerMobile":"XXXXX7485"}'`,
      exampleResponse: apiExamples.find(e => e.name === "SHOP")?.examples[0]?.message || {} // dummy
    }
  },

  // 5. Business & Company
  {
    id: "business_cin",
    categoryId: "BUSINESS_COMPANY",
    label: "CIN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Cin/verify", LiveUrl: `${KYC_BASE}/internal/business/Cin/verify` },
      title: { header: "CIN Verification", headerTitle: "Verify Corporate Identification Number", submitButton: 'Verify CIN' },
      inputParams: ["CIN"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Cin/verify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/business/udyam/verify", LiveUrl: `${KYC_BASE}/internal/business/udyam/verify` },
      title: { header: "Udyam Verification", headerTitle: "Verify Udyam Registration details", submitButton: 'Verify Udyam' },
      inputParams: ["udyamNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyam/verify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/business/IEC/verify", LiveUrl: `${KYC_BASE}/internal/business/IEC/verify` },
      title: { header: "IEC Verification", headerTitle: "Verify Import Export Code", submitButton: 'Verify IEC' },
      inputParams: ["iecNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/IEC/verify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/business/cinbased/company/search", LiveUrl: `${KYC_BASE}/internal/business/cinbased/company/search` },
      title: { header: "CIN Based Company Search", headerTitle: "CIN Based Company Search", submitButton: 'Search company' },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/cinbased/company/search' \\
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
      apiUrl: { Method: 'Post', URLS: "client/business/companylist/verify", LiveUrl: `${KYC_BASE}/internal/business/companylist/verify` },
      title: { header: "Company Search", headerTitle: "Search company details", submitButton: 'Search' },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/companylist/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName": "XYZ PVT LIT" }'`,
      exampleResponse: apiExamples.find(e => e.name === "COMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "din_verification",
    categoryId: "BUSINESS_COMPANY",
    label: "VERIFY DIN",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/din/verify", LiveUrl: `${KYC_BASE}/internal/business/din/verify` },
      title: { header: "VEFIFY DIN", headerTitle: "Verify DIN", submitButton: ' Verify din' },
      inputParams: ["dinNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/din/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "dinNumber": "xxxxxx4578" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DIN")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "gstin_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN VERIFY",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Gstin/verify", LiveUrl: `${KYC_BASE}/internal/business/Gstin/verify` },
      title: { header: "VERIFY GSTNUMBER", headerTitle: "Verify GSTIN", submitButton: 'Verify GSTING' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstin/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GSTIN")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "gstin_to_pan",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN TO PAN VERIFY",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Gstintopan/verify", LiveUrl: `${KYC_BASE}/internal/business/Gstintopan/verify` },
      title: { header: "GSTIN TO PAN VERIFY", headerTitle: "Gstin to Pan Verify", submitButton: 'Verify GSTING' },
      inputParams: ["gstinNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstintopan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PANUSINGGSTIN")?.examples[0]?.message || {} // dummy
    }
  },

  {
    id: "gstin_verify_and_track",
    categoryId: "BUSINESS_COMPANY",
    label: "GSTIN VIEW AND TRACK VERIFY",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/Gstin/ViewAndTrack/verify", LiveUrl: `${KYC_BASE}/internal/business/Gstin/ViewAndTrack/verify` },
      title: { header: "GSTIN VIEW AND TRACK VERIFY", headerTitle: "Gsting View and Track Verify", submitButton: 'Verify GSTING' },
      inputParams: ["gstinNumber","Financialyear"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/Gstin/ViewAndTrack/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "gstinNumber": "XYZ PVT LIT","Financialyear":"2025-26" }'`,
      exampleResponse: apiExamples.find(e => e.name === "GSTINVIEWTRACK")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "dgft_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "DGFT VERIFY",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/DGFT/verify", LiveUrl: `${KYC_BASE}/internal/business/DGFT/verify` },
      title: { header: "DGFT VERIFY", headerTitle: "DGFT Verify", submitButton: 'Verify DGFT' },
      inputParams: ["DGFT"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/DGFT/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "DGFT":"2025-26" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "lei_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "lei VERIFY",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/LEI/verify", LiveUrl: `${KYC_BASE}/internal/business/LEI/verify` },
      title: { header: "LEI VERIFY", headerTitle: "LEI Verify", submitButton: 'Verify LEI' },
      inputParams: ["CompanyName"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/LEI/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "CompanyName":"2025-26" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "udoyog_aadhaar_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "Udoyog Aadhaar verify",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/udyogAadhaar/verify", LiveUrl: `${KYC_BASE}/internal/business/udyogAadhaar/verify` },
      title: { header: "udoyog Aadhaar VERIFY", headerTitle: "Udoyog Aadhaar Verify", submitButton: 'Verify Udoyog Aadhaar' },
      inputParams: ["UAMNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyogAadhaar/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "UAMNumber":"2025-26" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "shop_establishment_verify",
    categoryId: "BUSINESS_COMPANY",
    label: "shop establishment Verify",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/shopest/verify", LiveUrl: `${KYC_BASE}/internal/business/shopest/verify` },
      title: { header: "Shop Verify", headerTitle: "Shop Establishment Verification", submitButton: 'Verify' },
      inputParams: ["registrationNumber", "state"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/shopest/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "registrationNumber":"", "state":"" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "udyog_phone_aadhaar",
    categoryId: "BUSINESS_COMPANY",
    label: "UdyogAadhaar with Phone Verify",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/business/udyogAadhaar/verify", LiveUrl: `${KYC_BASE}/internal/business/udyogAadhaar/verify` },
      title: { header: "udoyog Aadhaar with Phone VERIFY", headerTitle: "Udoyog Aadhaar With Phone Verify", submitButton: 'Verify' },
      inputParams: ["UAMNumber", "customerNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/business/udyogAadhaar/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "UAMNumber":"2025-26", "customerNumber":"" }'`,
      exampleResponse: apiExamples.find(e => e.name === "CINBASECOMPANYSEARCH")?.examples[0]?.message || {} // dummy
    }
  },


  // 6. Employment & Income
  {
    id: "employment_uan_basic",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Basic UAN Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/uan/basic", LiveUrl: `${KYC_BASE}/internal/employee/uan/basic` },
      title: { header: "UAN Verification", headerTitle: "Verify Basic UAN details", submitButton: 'Verify UAN' },
      inputParams: ["uanNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/employee/uan/basic' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "uanNumber": "123456789012" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },
  {
    id: "employment_dual_check",
    categoryId: "EMPLOYMENT_INCOME",
    label: "Dual Employment Check",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/employee/dual_employment/check", LiveUrl: `${KYC_BASE}/internal/employee/dual_employment/check` },
      title: { header: "Dual Employment Check", headerTitle: "Check for duplicate employment records", submitButton: 'Check' },
      inputParams: ["uanNumber", "panNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/employee/dual_employment/check' \\
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
      apiUrl: { Method: 'Post', URLS: "client/vehicle/rcverify", LiveUrl: `${KYC_BASE}/internal/vehicle/rcverify` },
      title: { header: "RC Verification", headerTitle: "Verify Vehicle RC details", submitButton: 'Verify RC' },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/rcverify' \\
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
      apiUrl: { Method: 'Post', URLS: "client/vehicle/driving_license/verify", LiveUrl: `${KYC_BASE}/internal/vehicle/driving_license/verify` },
      title: { header: "DL Verification", headerTitle: "Verify Driving License details", submitButton: 'Verify DL' },
      inputParams: ["licenseNo", "DateOfBirth"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/driving_license/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "licenseNo": "DL-1234567890123", "DateOfBirth": "1990-01-01" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DL")?.examples[0]?.message || {}
    }
  },
  {
    id: "vehicle_reg",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Vehicle Registeration",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/register", LiveUrl: `${KYC_BASE}/internal/vehicle/register` },
      title: { header: "Vehicle Registeration", headerTitle: "Register Vehicle details", submitButton: 'Verify' },
      inputParams: ["RegistrationNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/register' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "RegistrationNumber": "DL-1234567890123" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DL")?.examples[0]?.message || {}
    }
  },
  {
    id: "stolen_vehicle",
    categoryId: "VEHICLE_TRANSPORT",
    label: "Stolen Vehicle Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/stolen_vehicle/verification", LiveUrl: `${KYC_BASE}/internal/vehicle/stolen_vehicle/verification` },
      title: { header: "Stolen vehicle verification", headerTitle: "Stolen Vehicle verification", submitButton: 'Verify' },
      inputParams: ["vehicleRegisterationNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/stolen_vehicle/verification' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "vehicleRegisterationNumber": "DL-1234567890123" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DL")?.examples[0]?.message || {}
    }
  },
  {
    id: "challan_via_rc",
    categoryId: "VEHICLE_TRANSPORT",
    label: "ChallanVie RC",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/vehicle/challan_via_rc", LiveUrl: `${KYC_BASE}/internal/vehicle/challan_via_rc` },
      title: { header: "ChallanVia RC", headerTitle: "Check Challan with RC", submitButton: 'Verify' },
      inputParams: ["rcNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/vehicle/challan_via_rc' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "rcNumber": "DL-1234567890123" }'`,
      exampleResponse: apiExamples.find(e => e.name === "DL")?.examples[0]?.message || {}
    }
  },

  // 8. Face & AI Verification
  {
    id: "face_match",
    categoryId: "FACE_AI",
    label: "Face Match",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/face/match", LiveUrl: `${KYC_BASE}/internal/face/match` },
      title: { header: "Face Match", headerTitle: "Match two faces for similarity", submitButton: 'Compare' },
      inputParams: ["image1", "image2"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/face/match' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "image1": "base64_string", "image2": "base64_string" }'`,
      exampleResponse: apiExamples.find(e => e.name === "FACE")?.examples[0]?.message || {}
    }
  },

  // 9. OCR & Document AI
  {
    id: "ocr_pan",
    categoryId: "OCR_DOCUMENT_AI",
    label: "PAN OCR",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/ocr/pan", LiveUrl: `${KYC_BASE}/internal/ocr/pan` },
      title: { header: "PAN OCR", headerTitle: "Extract details from PAN image", submitButton: 'Extract' },
      inputParams: ["image"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/ocr/pan' \\
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
      apiUrl: { Method: 'Post', URLS: "client/government/voterId/verify", LiveUrl: `${KYC_BASE}/internal/government/voterId/verify` },
      title: { header: "Voter ID Verification", headerTitle: "Verify Voter ID details", submitButton: 'Verify Voter ID' },
      inputParams: ["voterId"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/voterId/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "voterId": "ABC1234567" }'`,
      exampleResponse: apiExamples.find(e => e.name === "VOTER")?.examples[0]?.message || {}
    }
  },
  {
    id: "gov_electricity",
    categoryId: "GOVERNMENT_ID",
    label: "Electricity Bill",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/electricity_bill", LiveUrl: `${KYC_BASE}/internal/government/electricity_bill` },
      title: { header: "Electricity Bill", headerTitle: "Verify Electricity Bill details", submitButton: 'Verify' },
      inputParams: ["passportFileNo", "DateOfBirth"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/electricity_bill' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo": "123456789", "DateOfBirth": "TNEB" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },
  {
    id: "passport_fileno",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport File No",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/passport_fileNo/verify", LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify` },
      title: { header: "Passport FileNo", headerTitle: "Verify Passport FileNO details", submitButton: 'Verify' },
      inputParams: ["passportFileNo", "DateOfBirth"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo": "123456789", "DateOfBirth": "TNEB" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },
  {
    id: "passport_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/passport_fileNo/verify", LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify` },
      title: { header: "Passport Verify", headerTitle: "Verify Passport details", submitButton: 'Verify' },
      inputParams: ["passportFileNo", "surname","firstName","gender", "countryCode","dateOfBirth","passportType","dateOfExpiry","mrz1","mrz2"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },
  {
    id: "passport_ocr_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify Passport OCR",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/passport_fileNo/verify", LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify` },
      title: { header: "Passport OCR Verify", headerTitle: "Verify Passport OCR details", submitButton: 'Verify' },
      inputParams: ["passportFileNo", "surname","firstName","gender", "countryCode","dateOfBirth","passportType","dateOfExpiry","mrz1","mrz2"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ ""passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },
  {
    id: "tin_verify",
    categoryId: "GOVERNMENT_ID",
    label: "Verify tin",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/government/passport_fileNo/verify", LiveUrl: `${KYC_BASE}/internal/government/passport_fileNo/verify` },
      title: { header: "Tin Verify", headerTitle: "Verify Tin details", submitButton: 'Verify' },
      inputParams: ["TIN"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/government/passport_fileNo/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "passportFileNo":"", "surname":"","firstName":"","gender":"", "countryCode":"","dateOfBirth":"","passportType":"","dateOfExpiry":"","mrz1":"","mrz2":"" }'`,
      exampleResponse: apiExamples.find(e => e.name === "ELEC")?.examples[0]?.message || {}
    }
  },

  // 11. Contact & Communication
  {
    id: "pan_verify",
    categoryId: "CONTACT_COMMUNICATION",
    label: "pan Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/contact/pan/verify", LiveUrl: `${KYC_BASE}/internal/contact/pan/verify` },
      title: { header: "pan Verification", headerTitle: "Get pan with Mobile Number", submitButton: 'submit' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/pan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },
  {
    id: "uan_verify",
    categoryId: "CONTACT_COMMUNICATION",
    label: "uan Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/contact/uan/verify", LiveUrl: `${KYC_BASE}/internal/contact/uan/verify` },
      title: { header: "uan Verification", headerTitle: "Get uan with Mobile Number", submitButton: 'submit' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/uan/verify' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },
  {
    id: "advance_data",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Advance Data with Mobile Number",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/contact/advanceData/getOtp", LiveUrl: `${KYC_BASE}/internal/contact/advanceData/getOtp` },
      title: { header: "Advance Data with Mobile Number", headerTitle: "Advance Details with Mobile Number, send OTP", submitButton: 'submit' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/advanceData/getOtp' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },
  {
    id: "advance_data_verify_otp",
    categoryId: "CONTACT_COMMUNICATION",
    label: "Advance Data with Mobile Number verify OTP",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/contact/advanceData/getOtp", LiveUrl: `${KYC_BASE}/internal/contact/advanceData/getOtp` },
      title: { header: "Advance Data with Mobile Number", headerTitle: "Advance Details with Mobile Number, Verify OTP", submitButton: 'submit' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/contact/advanceData/getOtp' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },

  // 12. Mobile numbers
  {
    id: "contact_mobile_otp",
    categoryId: "MOBILE_NUMBER",
    label: "Mobile OTP Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/mobileNumber/otp_generation", LiveUrl: `${KYC_BASE}/internal/mobileNumber/otp_generation` },
      title: { header: "Mobile OTP", headerTitle: "Send OTP to mobile number", submitButton: 'Send OTP' },
      inputParams: ["mobileNumber"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/mobileNumber/otp_generation' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobileNumber": "9876543210" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },
  {
    id: "contact_mobile_otp",
    categoryId: "MOBILE_NUMBER",
    label: "Mobile OTP Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/mobileNumber/otp_verification", LiveUrl: `${KYC_BASE}/internal/mobileNumber/otp_verification` },
      title: { header: "Mobile OTP", headerTitle: "Send OTP to mobile number", submitButton: 'Send OTP' },
      inputParams: ["mobile", "submittedOtp"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/mobileNumber/otp_verification' \\
          --header 'Content-Type: application/json' \\
          --header 'secret_token: {{secret_token}}' \\
          --data '{ "mobile": "9876543210", "submittedOtp":"4758" }'`,
      exampleResponse: apiExamples.find(e => e.name === "MOG")?.examples[0]?.message || {}
    }
  },

  // Pre-configured for Sidebar Navigation
  { id: "recharge_operators", config: { apiUrl: { URLS: "/Operators", LiveUrl: `${RECHARGE_BASE}/Operators` }, title: { header: "Fetch Operators", submitButton: "Fetch" }, inputParams: ["mobileNumber"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  { id: "recharge_plans", config: { apiUrl: { URLS: "/Plans", LiveUrl: `${RECHARGE_BASE}/Plans` }, title: { header: "Fetch Plans" }, inputParams: ["operatorcode", "circle"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  { id: "recharge_offers", config: { apiUrl: { URLS: "/OffersPlans", LiveUrl: `${RECHARGE_BASE}/OffersPlans` }, title: { header: "Fetch Offers" }, inputParams: ["operator_code", "mobile_no"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  { id: "recharge_recharge_url", config: { apiUrl: { URLS: "/RechargeURL", LiveUrl: `${RECHARGE_BASE}/RechargeURL` }, title: { header: "Recharge URL" }, inputParams: ["mobile", "amount"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  { id: "recharge_old_plans", config: { apiUrl: { URLS: "/OldPlans", LiveUrl: `${RECHARGE_BASE}/OldPlans` }, title: { header: "Old Plans" }, inputParams: ["mobile"], isMicro: 'RECHARGE', isDisable: false, exampleResponse: {} } },
  
  { id: "bbps_category", config: { apiUrl: { URLS: "/billerInfo/Category", LiveUrl: `${BBPS_BASE}/billerInfo/Category` }, title: { header: "Fetch Category" }, inputParams: [], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  { id: "bbps_biller_info", config: { apiUrl: { URLS: "/billerInfo/Biller", LiveUrl: `${BBPS_BASE}/billerInfo/Biller` }, title: { header: "Fetch Biller Info" }, inputParams: ["billerId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  { id: "bbps_bill_fetch", config: { apiUrl: { URLS: "/billFetch", LiveUrl: `${BBPS_BASE}/billFetch` }, title: { header: "Bill Fetch" }, inputParams: ["customerNumber"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  { id: "bbps_bill_pay", config: { apiUrl: { URLS: "/billPay", LiveUrl: `${BBPS_BASE}/billPay` }, title: { header: "Bill Pay" }, inputParams: ["billId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  { id: "bbps_bill_validation", config: { apiUrl: { URLS: "/billValidation", LiveUrl: `${BBPS_BASE}/billValidation` }, title: { header: "Bill Validation" }, inputParams: ["billId"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },
  { id: "bbps_quick_pay", config: { apiUrl: { URLS: "/quickPay", LiveUrl: `${BBPS_BASE}/quickPay` }, title: { header: "Quick Pay" }, inputParams: ["mobile"], isMicro: 'BBPS', isDisable: true, exampleResponse: {} } },

  // 12. Geo & Location
  {
    id: "geo_pincode",
    categoryId: "GEO_LOCATION",
    label: "Pincode Geofencing",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/location/pincode/geofencing", LiveUrl: `${KYC_BASE}/internal/location/pincode/geofencing` },
      title: { header: "Pincode Geofencing", headerTitle: "Verify Pincode specific geofence", submitButton: 'Verify Range' },
      inputParams: ["pincode", "latitude", "longitude"],
      isToken: true,
      isMicro: 'KYC',
      isDisable: false,
      exampleCurl: `curl --location '${KYC_BASE}/internal/location/pincode/geofencing' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "pincode": "560001", "latitude": "12.9716", "longitude": "77.5946" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  },

  // 14. Professional Verification
  {
    id: "prof_doctor",
    categoryId: "PROFESSIONAL_VERIFICATION",
    label: "Doctor Verification",
    config: {
      apiUrl: { Method: 'Post', URLS: "client/professional/docter/verify", LiveUrl: `${KYC_BASE}/internal/professional/docter/verify` },
      title: { header: "Doctor Verification", headerTitle: "Verify Medical Professional details", submitButton: 'Verify Doctor' },
      inputParams: ["registrationNumber"],
      isToken: true,
      isMicro: 'KYC',
      exampleCurl: `curl --location '${KYC_BASE}/internal/professional/docter/verify' \\
        --header 'Content-Type: application/json' \\
        --header 'secret_token: {{secret_token}}' \\
        --data '{ "registrationNumber": "DOC12345" }'`,
      exampleResponse: apiExamples.find(e => e.name === "PAN")?.examples[0]?.message || {} // dummy
    }
  }
];

export const getServiceById = (id) => SERVICES_METADATA.find(s => s.id === id);
