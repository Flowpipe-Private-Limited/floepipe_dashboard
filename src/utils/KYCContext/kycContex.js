export const ERROR_RESPONSES = {
  400: { message: "Bad Request", success: false },
  503: { message: "Service Unavailable", success: false },
  504: { message: "Gateway Timeout", success: false }
};
const validationPatterns = [
  {
    key: "mobile",
    label: "Mobile Number",
    regex: "^[6-9]\\d{9}$",
    message: "Enter a valid 10-digit mobile number"
  },
  {
    key: "otp",
    label: "OTP",
    regex: "^\\d{4}$",
    message: "Enter a valid 4-digit OTP"
  },
  {
    key: "gstin",
    label: "GSTIN",
    regex: "^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}Z[A-Z\\d]{1}$",
    message: "Enter a valid GSTIN"
  },
  {
    key: "email",
    label: "Email",
    regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    message: "Enter a valid email address"
  },
  {
    key: "password",
    label: "Password",
    regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message: "Password must be at least 8 characters with upper, lower, number & special char"
  },
  {
    key: "name",
    label: "Full Name",
    regex: "^[A-Za-z\\s]+$",
    message: "Only alphabets are allowed"
  },
  {
    key: "number",
    label: "Only Numbers",
    regex: "^\\d+$",
    message: "Only numeric values are allowed"
  },
  {
    key: "ifsc",
    label: "IFSC Code",
    regex: "^[A-Z]{4}0[A-Z0-9]{6}$",
    message: "Enter a valid IFSC code"
  },
  {
    key: "pan",
    label: "PAN Number",
    regex: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    message: "Enter a valid PAN number"
  },
  {
    key: "pincode",
    label: "Pincode",
    regex: "^[1-9]\\d{5}$",
    message: "Enter a valid 6-digit pincode"
  }
];

export const SecretToken = {
  apiUrl: {
    Method: 'Post',
    URLS: "/client/generate/clientToken",
    LiveUrl: "https://localhost:7007/api/v1/client/generate/clientToken"
  },
  title: {
    header: "Generate Access Token",
    headerTitle: "Generate Access Token using ClientId, SecretKey",
    submitButton: 'Create Token'
  },
  inputParams: ["clientId", "clientSecret", "expDate" ],
  isToken:false,
  isMicro: 'SupperAdmin',
  isDisable: false,
  // regexValues: ["^[2-9][0-9]{11}$",],
  exampleCurl: `curl --location 'https://localhost:7007/api/v1/client/generate/clientToken' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "clientId": "",
      "clientSecret": ""
  }'`,
  exampleResponse: {
    "message": {
      "request_id": "",
      "task_id": "",
      "group_id": "",
      "success": "",
      "response_code": "100",
      "response_message": "Valid Authentication",
      "metadata": {
        "billable": "Y"
      },
      "result": {
        "business_constitution": "Private Limited Company",
        "business_nature": [
          "Supplier of Services"
        ],
        "central_jurisdiction": "",
        "central_jurisdiction_code": "NA",
        "current_registration_status": "Active",
        "gstin": "",
        "last_updated": "NA",
        "legal_name": "ABC PRIVATE LIMITED",
        "other_business_address": "",
        "primary_business_address": {
          "building_name": "3rd Floor",
          "building_number": "H.No. 5-5-165/2/TF Plot no. 4",
          "city": "",
          "district": "",
          "flat_number": "",
          "latitude": "",
          "location": "",
          "longitude": "",
          "business_nature": "",
          "pincode": "",
          "street": "",
          "state_code": "",
          "full_address": ""
        },
        "register_cancellation_date": "",
        "register_date": "",
        "state_jurisdiction": "",
        "state_jurisdiction_code": "NA",
        "tax_payer_type": "Regular",
        "trade_name": "ABC PRIVATE LIMITED"
      },
      "request_timestamp": "",
      "response_timestamp": ""
    },
    "success": true
  }
};

// KYC Services
export const Aadhaar = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/aadhaar/pan/maskedverify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/aadhaar/Aadhaarmaskedverify"
  },
  title: {
    header: "Aadhaar Verification",
    headerTitle: "Verify Aadhaar using OTP-less masked verification service",
    submitButton: 'Verify Aadhaar'
  },
  inputParams: ["aadharNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[2-9][0-9]{11}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/aadhaar/Aadhaarmaskedverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "aadharNumber": "XXXXXXXXXXXX"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "aadhaar_number": "XXXXXXXXXXXX",
      "full_name": "JOHN DOE",
      "gender": "M",
      "dob": "01-01-1990",
      "address": "123, Sample Street, Example City, State - 123456",
      "mobile_verified": "Y",
      "masked_aadhaar": "XXXXXXXXXXXX"
    },
    "success": true
  }
};
export const GstIN = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/business/Gstin/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "GSTIN Verification",
    headerTitle: "Verify GSTIN using official government GST records",
    submitButton: 'Verify GSTIN'
  },
  inputParams: ["gstinNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}Z[A-Z\\d]{1}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "gstinNumber": "33AACCC1234F1Z1"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "gstin": "33AACCC1234F1Z1",
      "legal_name": "EXAMPLE ENTERPRISE PVT LTD",
      "trade_name": "EXAMPLE ENTERPRISE",
      "registration_date": "01/01/2017",
      "status": "Active",
      "taxpayer_type": "Regular",
      "principal_place": "123, Business Park, Chennai, Tamil Nadu - 600001"
    },
    "success": true
  }
};
export const SHOP = {
  apiUrl: {
    Method: 'Post',
    URLS: "shop/shopest",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/shop/shopest"
  },
  title: {
    header: "Shop & Establishment Verification",
    headerTitle: "Verify business using Shop & Establishment registration number",
    submitButton: 'Verify Shop'
  },
  inputParams: ['registrationNumber', 'state'],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "registrationNumber": "12345/ABC",
      "state": "Maharashtra"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "registration_number": "12345/ABC",
      "shop_name": "GOODWILL ENTERPRISES",
      "owner_name": "JANE SMITH",
      "address": "Flat 402, Sunshine Plaza, Mumbai, Maharashtra - 400001",
      "status": "Active",
      "commencement_date": "10/05/2020"
    },
    "success": true
  }
};
export const SendOTP = {
  apiUrl: {
    Method: 'Post',
    URLS: "mobileNumber/mobileOtp",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/mobileNumber/mobileOtp"
  },
  title: {
    header: "Mobile OTP Verification (Send)",
    headerTitle: "Send a verification OTP to the provided mobile number",
    submitButton: 'Send OTP'
  },
  inputParams: ['mobileNumber'],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/mobileNumber/mobileOtp' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "mobileNumber": "9876543210"
  }'`,
  exampleResponse: {
    "message": "OTP sent successfully",
    "data": {
      "mobileNumber": "9876543210",
      "status": "SENT"
    },
    "success": true
  }
};
export const VerifyOTP = {
  apiUrl: {
    Method: 'Post',
    URLS: "mobileNumber/mobileotpVerify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/mobileNumber/mobileotpVerify"
  },
  title: {
    header: "Mobile OTP Verification (Verify)",
    headerTitle: "Submit the 4-digit OTP received on the mobile number",
    submitButton: 'Verify OTP'
  },
  inputParams: ["submittedOtp", "mobile"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^\\d{4}$", "^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/mobileNumber/mobileotpVerify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "submittedOtp": "1234",
      "mobile": "9876543210"
  }'`,
  exampleResponse: {
    "message": "OTP verified successfully",
    "data": {
      "mobile": "9876543210",
      "status": "VERIFIED"
    },
    "success": true
  }
};
export const panVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "pan/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/verify"
  },
  title: {
    header: "PAN Card Verification",
    headerTitle: "Verify PAN details against Income Tax Department records",
    submitButton: 'Verify PAN'
  },
  inputParams: ["panNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/pan/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "panNumber": "ABCDE1234F"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "pan": "ABCDE1234F",
      "full_name": "JOHN DOE",
      "status": "VALID",
      "category": "Individual"
    },
    "success": true
  }
};
export const panAadhaarVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "pan/verify_to_aadhaar",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/pan/verify_to_aadhaar"
  },
  title: {
    header: "PAN to Aadhaar Link Verification",
    headerTitle: "Check if a PAN is linked with an Aadhaar number",
    submitButton: 'Check Link Status'
  },
  inputParams: ["panNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/pan/verify_to_aadhaar' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "panNumber": "ABCDE1234F"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "pan": "ABCDE1234F",
      "is_linked": true,
      "masked_aadhaar": "XXXXXXXX1234"
    },
    "success": true
  }
};
export const accountVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "accounts/verify/penny-drop",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/accounts/verify/penny-drop"
  },
  title: {
    header: "Bank Account Verification",
    headerTitle: "Verify bank account details using Penny Drop service",
    submitButton: 'Verify Account'
  },
  inputParams: ["account_no", "ifsc"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^\\d{9,18}$", "^[A-Z]{4}0[A-Z0-9]{6}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/accounts/verify/penny-drop' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "account_no": "1234567890",
      "ifsc": "SBIN0001234"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "account_no": "1234567890",
      "ifsc": "SBIN0001234",
      "bank_name": "STATE BANK OF INDIA",
      "account_holder": "JOHN DOE",
      "status": "VALID"
    },
    "success": true
  }
};
export const CINVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "business/CinNumberverify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/CinNumberverify"
  },
  title: {
    header: "CIN Verification",
    headerTitle: "Verify Corporate Identification Number (CIN) for businesses",
    submitButton: 'Verify CIN'
  },
  inputParams: ["CIN"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^([LU])\\d{5}[A-Z]{2}\\d{4}[A-Z]{3}\\d{6}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/business/CinNumberverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "CIN": "U72200TN2020PTC123456"
  }'`,
  exampleResponse: {
    "CIN": "",
    "COMPANY_NAME": "",
    "DATE_OF_REGISTRATION": "",
    "CITY": "",
    "DISTRICT": "",
    "STATE": "",
    "COUNTRY": "India",
    "PINCODE": "",
    "ROC": "",
    "CATEGORY": "",
    "SUBCATEGORY": "",
    "CLASS": "",
    "AUTHORIZED_CAPITAL": "",
    "PAIDUP_CAPITAL": "",
    "NUMBER_OF_MEMBERS": "",
    "ACTIVITY_DESCRIPTION": "0",
    "REGISTERED_OFFICE_ADDRESS": "",
    "GETDATA": 1,
    "TIMESTAMP": "",
    "COUNTRY_INC": "Indian",
    "F_COMPANY_SHARE_CAP": "null",
    "STATUS": "Active",
    "TYPE_OF_OFFICE": "",
    "FOREIGN_DETAILS": null,
    "FOREIGN_ADDRESS": null,
    "ACTIVITY_CODE": "null",
    "ADDRESS_OTHER_THAN_RO": "-",
    "EMAIL": "xyz@gmail.com",
    "LISTING_STATUS": "Unlisted",
    "ACTIVE_COMPLIANCE": "",
    "COMPANY_FILING_STATUS_16_17_18": "",
    "SUSPENDED_AT_STOCK": "-",
    "LAST_AGM": "09/30/2023",
    "LAST_BALANCESHEET": "03/31/2023",
    "CIRP": "",
    "PARTNERS": "",
    "PREVIOUS_FIRM": null,
    "SOLVENCY_FILED": "null",
    "COMPANY_STATUS": "Active",
    "old_cin": null,
    "PAN": "AAICC7291C",
    "has_financials": 1,
    "has_charges": 1,
    "IS_DOCS_PROCESSED": 0,
    "IS_AUDITOR_MOVED": 100,
    "PRIORITY_1": 100,
    "DOCS_PROCESS_ON": "2024-11-24T18:19:06.000Z",
    "MULTIPLE_ADDRESS": [
      {
        "city": "",
        "state": "",
        "country": "",
        "district": "",
        "locality": "",
        "officeType": "",
        "postalCode": "",
        "addressType": "",
        "activeStatus": "Y",
        "migrationFlag": "",
        "streetAddress": "",
        "streetAddress2": "",
        "streetAddress3": "",
        "streetAddress4": "",
        "establishmentDate": ""
      },
      {
        "city": "",
        "state": "",
        "country": "",
        "district": "",
        "locality": "NA",
        "officeType": "",
        "postalCode": "",
        "addressType": "",
        "activeStatus": "Y",
        "migrationFlag": "N",
        "streetAddress": "",
        "streetAddress2": "",
        "streetAddress3": "",
        "streetAddress4": "",
        "establishmentDate": ""
      },
      {
        "city": "",
        "state": "",
        "country": "",
        "district": "",
        "locality": "NA",
        "officeType": "",
        "postalCode": "",
        "addressType": "",
        "activeStatus": "Y",
        "migrationFlag": "N",
        "streetAddress": "",
        "streetAddress2": "",
        "streetAddress3": "",
        "streetAddress4": "",
        "establishmentDate": ""
      }
    ],
    "IS_ADDRESS_UPDATED": 1,
    "STOCKS": null,
    "WEBSITE": null,
    "LOGO": null,
    "INDUSTRY": null,
    "COMPANY_AGE": null,
    "MOBILE": null,
    "SHOWN_TO_WEBSITE": 1,
    "IS_PAN_SAVED": 0,
    "IS_MASKED_EMAIL_DONE": 1,
    "IS_CIN_DIN_MAP": 0,
    "ANNUAL_RETURNS_3YRS": [
      {
        "dataOfFilling": "",
        "financialYear": ""
      },
      {
        "dataOfFilling": "",
        "financialYear": ""
      },
      {
        "dataOfFilling": "",
        "financialYear": ""
      }
    ],
    "BALANCESHEET_3YRS": [
      {
        "dataOfFilling": "",
        "financialYear": ""
      },
      {
        "dataOfFilling": "",
        "financialYear": ""
      },
      {
        "dataOfFilling": "",
        "financialYear": ""
      }
    ],
    "MOVED_TO_NEW_DB": 0,
    "DIN_CONTACT_UPDATE": 0,
    "IS_BASIC": 1,
    "NEW_UPDATED_TIME": "",
    "NICCode1": "",
    "NICCode1Desc": "",
    "NICCode2": null,
    "NICCode2Desc": null,
    "NICCode3": null,
    "NICCode3Desc": null
  }
};
export const UdamVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "udyam/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/udyam/verify"
  },
  title: {
    header: "Udyam Aadhaar Verification",
    headerTitle: "Verify MSME Udyam Registration number",
    submitButton: 'Verify Udyam'
  },
  inputParams: ["udyamNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/udyam/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "udyamNumber": "UDYAM-TN-01-1234567"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "udyam_number": "UDYAM-TN-01-1234567",
      "enterprise_name": "ABC TECH SOLUTIONS",
      "enterprise_type": "Micro",
      "major_activity": "Services",
      "status": "Active"
    },
    "success": true
  }
};
export const cardVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "card/cardVerify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Credit Card Verification",
    headerTitle: "Verify CreditCard using government KYC service",
    submitButton: 'Verify CreditCard'
  },
  inputParams: ["creditCardNumber"],
  isToken:true,
  isMicro: 'KYC',
  isDisable: false,

  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "creditCardNumber": "",
      "serviceId": "",
      "categoryId": ""
  }'`,
  exampleResponse: {
    "success": true,
    "response": {
      "message": "valid",
      "success": true,
      "response": {
        "bin": "6 digit of Credit card Number",
        "brand": "Card brand",
        "type": "",
        "category": "WORLD",
        "issuer": "",
        "issuer_phone": "",
        "issuer_url": "",
        "iso2": "",
        "iso3": "",
        "country": ""
      }
    }
  }
};
export const NameMatch = {
  apiUrl: {
    Method: 'Post',
    URLS: "name/compareNames",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/name/compareNames"
  },
  title: {
    header: "Name Comparison Service",
    headerTitle: "Calculate similarity score between two names",
    submitButton: 'Compare Names'
  },
  inputParams: ["firstName", "secondName"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[A-Za-z\\s]+$", "^[A-Za-z\\s]+$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/name/compareNames' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "firstName": "JOHN DOE",
      "secondName": "JON DOE"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "score": 0.95,
      "status": "Match",
      "algorithm": "Levenshtein"
    },
    "success": true
  }
};

// Recharge Services
export const RechargeOperators = {
  apiUrl: {
    Method: 'Post',
    URLS: "/Operators",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 1: Fetch Operators",
    headerTitle: "Fetch Service operators using NTAR service",
    submitButton: 'Operators Fetch'
  },
  inputParams: ["mobileNumber"],
  isToken:true,
  isMicro: 'RECHARGE',
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "mobileNumber": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "ERROR": "0",
      "STATUS": "1",
      "Mobile": "918688571181",
      "Operator": "Reliance Jio Infocomm Limited",
      "OpCode": "11",
      "Circle": "Andhra Pradesh",
      "CircleCode": "49",
      "Message": "Successfully"
    },
    "success": true
  }
};
export const RechargePlans = {
  apiUrl: {
    Method: 'Post',
    URLS: "/Plans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 2: Fetch Plans",
    headerTitle: "Fetch plans using NTAR service",
    submitButton: 'Fetch Plans'
  },
  inputParams: ["operatorcode", "cricle"],
  isToken:true,
  isMicro: 'RECHARGE',
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operatorcode": "",
      "cricle": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "ERROR": "0",
      "STATUS": "0",
      "Operator": "RELIANCE JIO",
      "Circle": "AP",
      "RDATA": {
        "Popular Plans": []
      },
      "MESSAGE": "Operator Plan Successfully"
    },
    "success": true
  }
};
export const RechargeOldPlans = {
  apiUrl: {
    Method: 'Post',
    URLS: "/OldPlans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Fetch Old Plans",
    headerTitle: "Fetch old plans using NTAR service",
    submitButton: 'Fetch oldPlans'
  },
  inputParams: ["operatorcode", "cricle"],
  isToken:true,
  isMicro: 'RECHARGE',
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operatorcode": "",
      "cricle": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "ERROR": "0",
      "STATUS": "0",
      "Operator": "RELIANCE JIO",
      "Circle": "AP",
      "RDATA": {
        "Popular Plans": []
      },
      "MESSAGE": "Operator Plan Successfully"
    },
    "success": true
  }
};
export const RechargeOffersPlans = {
  apiUrl: {
    Method: 'Post',
    URLS: "/OffersPlans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 3: Fetch OffersPlans",
    headerTitle: "Fetch Offersplans using NTAR service",
    submitButton: 'Fetch Offers'
  },
  inputParams: ["operator_code", "mobile_no"],
  isToken:true,
  isMicro: 'RECHARGE',
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operator_code": "",
      "mobile_no": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "ERROR": "11",
      "STATUS": "3",
      "MOBILENO": "",
      "RDATA": null,
      "MESSAGE": "Roffer Check service only availble in Airtel and VI."
    },
    "success": true
  }
};

export const RechargeURL = {
  apiUrl: {
    Method: 'Post',
    URLS: "/RechargeURL",
    LiveUrl: "https://localhost:7007/V1/RECHARGE/LIVE/RechargeURL"
  },
  title: {
    header: "STEP 4: Mobile Recharge",
    headerTitle: "Initiate a mobile recharge transaction",
    submitButton: 'Process Recharge'
  },
  isGeoLocation: true,
  inputParams: ["MobileNumber", "actualAmount", "spKey", "transactionId", "customerNumber"],
  isToken: true,
  isMicro: 'RECHARGE',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/RECHARGE/LIVE/RechargeURL' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "MobileNumber": "9876543210",
      "actualAmount": "199",
      "spKey": "JIO",
      "transactionId": "TXN12345",
      "customerNumber": "9876543210"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "ERROR": "0",
      "STATUS": "1",
      "Mobile": "918688571181",
      "Operator": "Reliance Jio Infocomm Limited",
      "OpCode": "11",
      "Circle": "Andhra Pradesh",
      "CircleCode": "49",
      "Message": "Successfully"
    },
    "success": true
  }
};

// BBPS Services
// export const BBPSServices = {
//   apiUrl: {
//     URLS: "http://localhost:7006/BBPS/bbps/services",
//     testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
//     liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
//   },
//   title: {
//     header: "STEP 1: Get Services",
//     headerTitle: "BBPS using NTAR service",
//     submitButton: 'Get Services'
//   },
//   inputParams: [],
//   exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
//     --header 'Content-Type: application/json' \\
//     --header 'secretKey: {{secretKey}}' \\
//     --header 'clientId: {{clientId}}' \\
//     --data '{
//       "panNumber": ""
//   }'`,
//   exampleResponse: {
//     "message": "Success",
//     "success": true,
//     "data": {
//       "ERROR": "0",
//       "STATUS": "1",
//       "Mobile": "918688571181",
//       "Operator": "Reliance Jio Infocomm Limited",
//       "OpCode": "11",
//       "Circle": "Andhra Pradesh",
//       "CircleCode": "49",
//       "Message": "Successfully"
//     } 
//   }
// };
export const BBPSCategory = {
  apiUrl: {
    Method: 'Get',
    URLS: "/billerInfo/:category",
    LiveUrl: "https://localhost:7007/V1/BBPS/LIVE/billerInfo/:category"
  },
  title: {
    header: "STEP 1: BBPS Categories",
    headerTitle: "Fetch available BBPS service categories",
    submitButton: 'List Categories'
  },
  inputParams: ["category"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["Credit Card"],
  isDisable: true,
  exampleCurl: `curl --location 'https://localhost:7007/V1/BBPS/LIVE/billerInfo/Credit%20Card' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": {}
  }
};
export const BBPSBillerInfo = {
  apiUrl: {
    Method: 'Get',
    URLS: "/billerInfo/:billerId",
    LiveUrl: "https://localhost:7007/V1/BBPS/LIVE/billerInfo/:billerId"
  },
  title: {
    header: "STEP 2: Biller Information",
    headerTitle: "Fetch detailed information for a specific BBPS biller",
    submitButton: 'Get Biller Info'
  },
  inputParams: ["billerId"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["SBIC00000NATDN"],
  isDisable: true,
  exampleCurl: `curl --location 'https://localhost:7007/V1/BBPS/LIVE/billerInfo/SBIC00000NATDN' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "jsonData": { "billerInfoResponse": { "biller": { "billerId": "SBIC00000NATDN", "billerName": "SBI Card", "billerAdhoc": "true", "billerStatus": "ACTIVE", "billerTimeout": "120", "supportDeemed": "Yes", "billerCategory": "Credit Card", "billerCoverage": "IND", "billerAliasName": "SBI Card", "billerDescription": "Please do not initiate payment more than the Maximum Permissible Amount limit", "billerInputParams": { "paramInfo": [{ "regEx": "^[0-9]{4,4}$", "dataType": "NUMERIC", "maxLength": "4", "minLength": "4", "paramName": "Last 4 digit of primary credit card number", "isOptional": "false", "visibility": "true" }, { "regEx": "^[6-9][0-9]{9}$", "dataType": "NUMERIC", "maxLength": "10", "minLength": "10", "paramName": "Mobile Number", "isOptional": "false", "visibility": "true" }] }, "billerPaymentModes": { "paymentModeInfo": [{ "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "AEPS" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Account Transfer" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Cash" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Debit Card" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Internet Banking" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "UPI" }] }, "billerResponseType": "SINGLE", "interchangeFeeCCF1": { "feeCode": "CCF1", "flatFee": "0", "feeMaxAmt": "2147483647", "feeMinAmt": "1", "percentFee": "0.00", "feeDirection": "C2B" }, "planAdditionalInfo": "", "planMdmRequirement": "NOT_SUPPORTED", "billerAmountOptions": "BASE_BILL_AMOUNT,,,", "billerAdditionalInfo": { "paramInfo": [{ "paramName": "Minimum Amount Due" }, { "paramName": "Maximum Permissible Amount" }] }, "supportPendingStatus": "Yes", "billerFetchRequiremet": "MANDATORY", "billerPaymentChannels": { "paymentChannelInfo": [{ "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "ATM" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "AGT" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "BNKBRNCH" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "BSC" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "INT" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "INTB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "KIOSK" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MPOS" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MOB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MOBB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "POS" }] }, "billerPaymentExactness": "", "billerPlanResponseParams": "", "billerAdditionalInfoPayment": "", "billerSupportBillValidation": "NOT_SUPPORTED", "rechargeAmountInValidationRequest": "" }, "responseCode": "000" } } }
  }
};
export const BBPSBillFetch = {
  apiUrl: {
    Method: 'Get',
    URLS: "/billFetch",
    LiveUrl: "https://localhost:7007/V1/BBPS/LIVE/billFetch"
  },
  title: {
    header: "STEP 3: BBPS Bill Fetch",
    headerTitle: "Fetch pending bills for a user from a specific biller",
    submitButton: 'Fetch Bill'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg"],
  isDisable: true,
  exampleCurl: `curl --location 'https://localhost:7007/V1/BBPS/LIVE/billFetch?accessCode=77TRLSNG7N000HENTL&ver=1.0' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "jsonData": { "billFetchResponse": { "responseCode": "000", "inputParams": { "input": [{ "paramName": "Last 4 digit of primary credit card number", "paramValue": "8584" }, { "paramName": "Mobile Number", "paramValue": "8099781613" }] }, "billerResponse": { "billAmount": "1953604", "billDate": "2025-11-23", "customerName": "CHITRA KASTURI", "dueDate": "2025-12-13" }, "additionalInfo": { "info": [{ "infoName": "Minimum Amount Due", "infoValue": "6171.56" }, { "infoName": "Maximum Permissible Amount", "infoValue": "23038.51" }] } } }, "requestId": "v4UteaitqfmcHAWcaYX9q3bEqWC53300535" }
  }
};
export const BBPSBillPay = {
  apiUrl: {
    Method: 'POST',
    URLS: "/billPayRequest",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 4: Get Bill Pay",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Get Bill Fetch'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg", "8d57XXX99ac4dXXXXX09011XXXXX"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "accessCode": "",
      "ver": "",
      "instituteId": "",
      "secretKey": "",
      "requestId": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "responseCode": "000", "responseReason": "Successful", "txnRefId": "CC015330CBAA98155678", "approvalRefNumber": "RneKliUJVyXjAOEJvC6GwhtL15d53300529", "txnRespType": "FORWARD TYPE RESPONSE", "inputParams": { "input": [{ "paramName": "Last 4 digit of primary credit card number", "paramValue": "8584" }, { "paramName": "Mobile Number", "paramValue": "8099781613" }] }, "CustConvFee": "0", "RespAmount": "100", "RespBillDate": "2025-11-23", "RespCustomerName": "CHITRA KASTURI", "RespDueDate": "2025-12-13" }
  }
};
export const BBPSBillValidation = {
  apiUrl: {
    Method: 'POST',
    URLS: "/billValidation",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 4: Bill Validation Fetch",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Bill Validate'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "accessCode": "",
      "ver": "",
      "instituteId": "",
      "secretKey": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "jsonData": { "billValidationResponse": { "responseCode": "000", "responseReason": "Successful", "complianceCode": "", "complianceReason": "", "approvalRefNo": "262914526361914" } }, "requestId": "6ssI9l5Lizr9veFhTzEYd8DQkKd53300551" }
  }
};
export const BBPSBillQuickPay = {
  apiUrl: {
    Method: 'POST',
    URLS: "/billQuickPay",
    LiveUrl: "https://localhost:7007/V1/BBPS/LIVE/billQuickPay"
  },
  title: {
    header: "STEP 5: BBPS Quick Pay",
    headerTitle: "Process immediate bill payment via BBPS",
    submitButton: 'Quick Pay'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg", "8d57XXX99ac4dXXXXX09011XXXXX"],
  isDisable: true,
  exampleCurl: `curl --location 'https://localhost:7007/V1/BBPS/LIVE/billQuickPay' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "accessCode": "77TRLSNG7N000HENTL",
      "ver": "1.0",
      "requestId": "8d57XXX99ac4dXXXXX09011XXXXX"
  }'`,
  exampleResponse: {
    "message": "Success",
    "data": {
      "status": "SUCCESS",
      "txn_id": "BBPS88776655",
      "approval_ref": "321456",
      "amount": "500",
      "date": "2024-04-06"
    },
    "success": true
  }
};
export const InstantBillPay = {
  apiUrl: {
    Method: 'POST',
    URLS: "/instantpay/billPay",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 1: InstantBill Pay",
    headerTitle: "InstantPay using NTAR service",
    submitButton: 'InatantBill Pay'
  },
  inputParams: ["cardNumber"],
  isMicro: 'BBPS',
  bodyParams: "(params)",
  Inputvalues: ["****************"],
  // isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/instant/cardPayment' \\
    --header 'Content-Type: application/json' \\
    --header 'X-Ipay-Auth-Code: "' \\
    --header 'X-Ipay-Client-Id: "' \\
    --header 'X-Ipay-Client-Secret: "' \\
    --header 'X-Ipay-Endpoint-Ip: "' \\
    --data '{
    "payer": {
        "bankId": "",
        "bankProfileId": "",
        "accountNumber": "",
        "name": "Instantpay",
        "paymentMode": "",
        "cardNumber": "",
        "cardSecurityCode": "",
        "cardExpiry": {
            "month": "",
            "year": ""
        },
        "referenceNumber": ""
    },
    "payee": {
        "accountNumber": "",
        "name": "Instantpay"
    },
    "transferMode": "",
    "transferAmount": "",
    "externalRef": "",
    "latitude": "",
    "longitude": "",
    "remarks": "",
    "alertEmail": ""
}'`,
  exampleResponse: {
    statusCode: "TXN",
    actcode: null,
    status: "Transaction Successful",
    data: {
      externalRef: "XXXXXXXXXXXX",
      poolReferenceId: "XXXXXXXXXXXX",
      txnValue: "4.00",
      txnReferenceId: "XXXXXXXX",
      pool: {
        account: "7428XXXXXX42",
        openingBal: "3697.27",
        mode: "DR",
        amount: "9.90",
        closingBal: "3687.37"
      },
      payer: {
        account: "7428XXXXXX42",
        name: "Sample Store"
      },
      payee: {
        account: "3798XXXXXXXX2004",
        name: "Instantpay India Ltd"
      }
    },
    timestamp: "2022-03-15 18:08:13",
    ipay_uuid: "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    orderid: "XXXXXXXXXXXX",
    environment: "LIVE",
    internalCode: null
  }
};

// Identity Services (Expanded)
export const VoterID = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/government/voterId/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/government/voterId/verify"
  },
  title: {
    header: "Voter ID Verification",
    headerTitle: "Verify Voter ID details using official EPIC number",
    submitButton: 'Verify Voter ID'
  },
  inputParams: ["voterIdNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  regexValues: ["^[A-Z]{3}[0-9]{7}$"],
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/government/voterId/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"voterIdNumber": "ABC1234567"}'`,
  exampleResponse: { "message": "Success", "data": { "epic_no": "ABC1234567", "name": "JOHN DOE", "gender": "M", "state": "Delhi" }, "success": true }
};

export const Passport = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/government/passport/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/government/passport/verify"
  },
  title: {
    header: "Passport Verification",
    headerTitle: "Verify Indian Passport details using Passport Number and DOB",
    submitButton: 'Verify Passport'
  },
  inputParams: ["passportNumber", "dob"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/government/passport/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"passportNumber": "S1234567", "dob": "1990-01-01"}'`,
  exampleResponse: { "message": "Success", "data": { "passportNumber": "S1234567", "full_name": "JOHN DOE", "dob": "01/01/1990" }, "success": true }
};

export const DLVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/vehicle/driving_license/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/vehicle/driving_license/verify"
  },
  title: {
    header: "Driving License Verification",
    headerTitle: "Verify DL details using License Number and Date of Birth",
    submitButton: 'Verify DL'
  },
  inputParams: ["dlNumber", "dob"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/vehicle/driving_license/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"dlNumber": "DL-1234567890123", "dob": "1990-01-01"}'`,
  exampleResponse: { "message": "Success", "data": { "license_number": "DL-1234567890123", "name": "JOHN DOE", "expiry_date": "2030-01-01" }, "success": true }
};

// Vehicle Services (Expanded)
export const RCVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/vehicle/rcverify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/vehicle/rcverify"
  },
  title: {
    header: "RC Verification",
    headerTitle: "Verify Vehicle Registration Certificate (RC) details",
    submitButton: 'Verify RC'
  },
  inputParams: ["rcNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/vehicle/rcverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"rcNumber": "DL1CA1234"}'`,
  exampleResponse: { "message": "Success", "data": { "rc_number": "DL1CA1234", "owner_name": "JOHN DOE", "vehicle_model": "MARUTI SWIFT" }, "success": true }
};

export const RCChallan = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/vehicle/challan_via_rc",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/vehicle/challan_via_rc"
  },
  title: {
    header: "RC Challan Search",
    headerTitle: "Fetch traffic challan details using Vehicle RC Number",
    submitButton: 'Fetch Challans'
  },
  inputParams: ["rcNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/vehicle/challan_via_rc' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"rcNumber": "DL1CA1234"}'`,
  exampleResponse: { "message": "Success", "data": { "rc_number": "DL1CA1234", "challans": [] }, "success": true }
};

// Business Services (Expanded)
export const DINVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/business/din/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/din/verify"
  },
  title: {
    header: "DIN Verification",
    headerTitle: "Verify Director Identification Number (DIN) details",
    submitButton: 'Verify DIN'
  },
  inputParams: ["din"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/business/din/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"din": "01234567"}'`,
  exampleResponse: { "message": "Success", "data": { "din": "01234567", "name": "JOHN DOE", "status": "Active" }, "success": true }
};

export const IECVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/business/IEC/verify",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/business/IEC/verify"
  },
  title: {
    header: "IEC Verification",
    headerTitle: "Verify Import Export Code (IEC) details",
    submitButton: 'Verify IEC'
  },
  inputParams: ["iecNumber"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/business/IEC/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"iecNumber": "0123456789"}'`,
  exampleResponse: { "message": "Success", "data": { "iec": "0123456789", "entity_name": "ABC EXPORTS", "status": "Active" }, "success": true }
};

// Utility Services (Expanded)
export const ElectricityBill = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/government/electricity_bill",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/government/electricity_bill"
  },
  title: {
    header: "Electricity Bill Verification",
    headerTitle: "Fetch electricity bill details using Consumer ID and Biller",
    submitButton: 'Fetch Bill'
  },
  inputParams: ["consumerId", "biller"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/government/electricity_bill' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"consumerId": "123456789", "biller": "TNEB"}'`,
  exampleResponse: { "message": "Success", "data": { "consumerId": "123456789", "amount": "500", "due_date": "2024-05-01" }, "success": true }
};

export const PincodeGeofencing = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/location/pincode/geofencing",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/location/pincode/geofencing"
  },
  title: {
    header: "Pincode Geofencing",
    headerTitle: "Verify if a coordinate falls within a specific Pincode area",
    submitButton: 'Verify Geofence'
  },
  inputParams: ["pincode", "latitude", "longitude"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/location/pincode/geofencing' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"pincode": "600001", "latitude": "13.0827", "longitude": "80.2707"}'`,
  exampleResponse: { "message": "Success", "data": { "in_range": true, "distance": "0.5km" }, "success": true }
};

// Finance Services (Expanded)
export const BankStatement = {
  apiUrl: {
    Method: 'Post',
    URLS: "client/bank/statement",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/bank/statement"
  },
  title: {
    header: "Bank Statement Fetch",
    headerTitle: "Fetch bank statement details via Net Banking integration",
    submitButton: 'Fetch Statement'
  },
  inputParams: ["accountId", "bankName"],
  isToken: true,
  isMicro: 'KYC',
  isDisable: false,
  exampleCurl: `curl --location 'https://localhost:7007/V1/KYC/LIVE/bank/statement' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"accountId": "1234567890", "bankName": "SBI"}'`,
  exampleResponse: { "message": "Success", "data": { "transactions": [] }, "success": true }
};




