// ErrorResponse
export const ERROR_RESPONSES = {
  400: { message: "Bad Request", success: false },
  503: { message: "Service Unavailable", success: false },
  504: { message: "Gateway Timeout", success: false }
};
// Regex partern

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

// success Response
export const Aadhaar = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/aadhaar/Aadhaarmaskedverify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "AadhaarNumber Verification",
    headerTitle: "Verify AadhaarNumber using government KYC service",
    submitButton: 'Verify AadhaarNumber'
  },
  inputParams: ["aadharNumber"],
  isDisable: false,
  regexValues: ["^[2-9][0-9]{11}$"],
  exampleCurl: `curl --location 'http://localhost:7006/business/Gstinverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "aadharNumber": ""
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
export const GstIN = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/business/Gstinverify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "GSTIN Verification",
    headerTitle: "Verify GSTIN using government KYC service",
    submitButton: 'Verify GSTIN'
  },
  inputParams: ["gstinNumber"],
  isDisable: false,
  regexValues: ["^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}Z[A-Z\\d]{1}$"],
  exampleCurl: `curl --location 'http://localhost:7006/business/Gstinverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "gstinNumber": ""
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
export const SHOP = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/shop/shopest",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "SHOP Verification",
    headerTitle: "Verify shop using government KYC service",
    submitButton: 'Verify Shop'
  },
  inputParams: ['registrationNumber', 'state'],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "gstinNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const SendOTP = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/mobileNumber/mobileOtp",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "MobileNumber Verification (Send OTP To Number)",
    headerTitle: "Verify MobileNumber using government KYC service",
    submitButton: 'Send OTP to Number'
  },
  inputParams: ['mobileNumber'],
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "gstinNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const VerifyOTP = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/mobileNumber/mobileotpVerify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "MobileNumber Verification (Verify OTP)",
    headerTitle: "Verify MobileNumber using government KYC service",
    submitButton: 'Verify OTP'
  },
  inputParams: ["submittedOtp", "mobile"],
  isDisable: false,
  regexValues: ["^\\d{4}$", "^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "gstinNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const panVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/pan/verify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Pan Verification",
    headerTitle: "Verify Pan using government KYC service",
    submitButton: 'Verify Pan'
  },
  inputParams: ["panNumber"],
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const panAadhaarVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/pan/verify_to_aadhaar",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Pan Verification",
    headerTitle: "Verify pan To Aadhaar using government KYC service",
    submitButton: 'Verify PantoAadhaar'
  },
  inputParams: ["panNumber"],
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const accountVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/accounts/verify/penny-drop",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Bank Account Verification",
    headerTitle: "Verify Account using government KYC service",
    submitButton: 'Verify Account'
  },
  inputParams: ["account_no", "ifsc"],
  isDisable: false,
  regexValues: ["^\\d{9,18}$", "^[A-Z]{4}0[A-Z0-9]{6}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "essentials": {
      "registrationNumber": "registrationNumber",
      "state": "State",
      "category": ""
    },
    "id": "",
    "patronId": "",
    "result": {
      "registrationNumber": "registrationNumber",
      "previousRegistrationCertificate": "NA",
      "nameOfTheShop": "",
      "address": "",
      "act": "Shops and Establishments",
      "dateOfCommencment": "",
      "summary": {
        "registrationNumber": "registrationNumber",
        "name": "",
        "status": "",
        "dateOfCommencement": "",
        "address": "",
        "splitAddress": {
          "district": [
            ""
          ],
          "state": [
            [
              "state",
              ""
            ]
          ],
          "city": [
            ""
          ],
          "pincode": "",
          "country": [],
          "addressLine": ""
        }
      },
      "detailed": {
        "registrationNumber": "registrationNumber",
        "previousRegistrationCertificate": "NA",
        "nameOfTheShop": "name of Shop",
        "act": ""
      }
    }
  }
};
export const CINVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/business/CinNumberverify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "CIN Verification",
    headerTitle: "Verify CIN using government KYC service",
    submitButton: 'Verify CIN'
  },
  inputParams: ["CIN"],
  isDisable: false,
  regexValues: ["^([LU])\\d{5}[A-Z]{2}\\d{4}[A-Z]{3}\\d{6}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/udyam/verify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "udyam Verification",
    headerTitle: "Verify Udyam number using government KYC service",
    submitButton: 'Verify Udyam number'
  },
  inputParams: ["udyamNumber"],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/udyam/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
export const cardVerify = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/card/cardVerify",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Credit Card Verification",
    headerTitle: "Verify CreditCard using government KYC service",
    submitButton: 'Verify CreditCard'
  },
  inputParams: ["creditCardNumber"],
  isDisable: false,

  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/name/compareNames",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Name Verification",
    headerTitle: "Verify Name using government KYC service",
    submitButton: 'Verify Name'
  },
  inputParams: ["firstName", "secondName"],
  isDisable: false,
  regexValues: ["^[A-Za-z\\s]+$", "^[A-Za-z\\s]+$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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

// Recharge Responses
export const RechargeOperators = {
  apiUrl: {
    Method: 'Post',
    URLS: "http://localhost:7006/Recharge/Operators",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 1: Fetch Operators",
    headerTitle: "Fetch Service operators using NTAR service",
    submitButton: 'Operators Fetch'
  },
  inputParams: ["mobileNumber"],
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/Recharge/Plans",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 2: Fetch Plans",
    headerTitle: "Fetch plans using NTAR service",
    submitButton: 'Fetch Plans'
  },
  inputParams: ["operatorcode", "cricle"],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/Recharge/OldPlans",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "Fetch Old Plans",
    headerTitle: "Fetch old plans using NTAR service",
    submitButton: 'Fetch oldPlans'
  },
  inputParams: ["operatorcode", "cricle"],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/Recharge/OffersPlans",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 3: Fetch OffersPlans",
    headerTitle: "Fetch Offersplans using NTAR service",
    submitButton: 'Fetch Offers'
  },
  inputParams: ["operator_code", "mobile_no"],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/Recharge/RechargeURL",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 4: RechargeURL",
    headerTitle: "Recharge using NTAR service",
    submitButton: 'Recharge'
  },
  inputParams: ["account", "actualAmount", "spKey", "transactionId", "geoCode", "customerNumber", "pincode"],
  isDisable: false,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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

// BBPS Responses
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
    URLS: "http://localhost:7006/BBPS/bbps/billerInfo/:category",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 1: Get Category",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Get Category'
  },
  inputParams: ["category"],
  bodyParams: "(params)",
  Inputvalues: ["Credit Card"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": {}
  }
};
export const BBPSBillerInfo = {
  apiUrl: {
    Method: 'Get',
    URLS: "http://localhost:7006/BBPS/bbps/billerInfo/:category",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 2: Get Biller Info",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Get Biller Info'
  },
  inputParams: ["billerId"],
  bodyParams: "(params)",
  Inputvalues: ["SBIC00000NATDN"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "jsonData": { "billerInfoResponse": { "biller": { "billerId": "SBIC00000NATDN", "billerName": "SBI Card", "billerAdhoc": "true", "billerStatus": "ACTIVE", "billerTimeout": "120", "supportDeemed": "Yes", "billerCategory": "Credit Card", "billerCoverage": "IND", "billerAliasName": "SBI Card", "billerDescription": "Please do not initiate payment more than the Maximum Permissible Amount limit", "billerInputParams": { "paramInfo": [{ "regEx": "^[0-9]{4,4}$", "dataType": "NUMERIC", "maxLength": "4", "minLength": "4", "paramName": "Last 4 digit of primary credit card number", "isOptional": "false", "visibility": "true" }, { "regEx": "^[6-9][0-9]{9}$", "dataType": "NUMERIC", "maxLength": "10", "minLength": "10", "paramName": "Mobile Number", "isOptional": "false", "visibility": "true" }] }, "billerPaymentModes": { "paymentModeInfo": [{ "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "AEPS" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Account Transfer" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Cash" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Debit Card" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "Internet Banking" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentMode": "UPI" }] }, "billerResponseType": "SINGLE", "interchangeFeeCCF1": { "feeCode": "CCF1", "flatFee": "0", "feeMaxAmt": "2147483647", "feeMinAmt": "1", "percentFee": "0.00", "feeDirection": "C2B" }, "planAdditionalInfo": "", "planMdmRequirement": "NOT_SUPPORTED", "billerAmountOptions": "BASE_BILL_AMOUNT,,,", "billerAdditionalInfo": { "paramInfo": [{ "paramName": "Minimum Amount Due" }, { "paramName": "Maximum Permissible Amount" }] }, "supportPendingStatus": "Yes", "billerFetchRequiremet": "MANDATORY", "billerPaymentChannels": { "paymentChannelInfo": [{ "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "ATM" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "AGT" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "BNKBRNCH" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "BSC" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "INT" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "INTB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "KIOSK" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MPOS" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MOB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "MOBB" }, { "maxAmount": "99999999900", "minAmount": "100", "paymentChannelName": "POS" }] }, "billerPaymentExactness": "", "billerPlanResponseParams": "", "billerAdditionalInfoPayment": "", "billerSupportBillValidation": "NOT_SUPPORTED", "rechargeAmountInValidationRequest": "" }, "responseCode": "000" } } }
  }
};
export const BBPSBillFetch = {
  apiUrl: {
    Method: 'Get',
    URLS: "http://localhost:7006/BBPS/bbps/billerInfo/:category",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 3: Get Bill Fetch",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Get Bill Fetch'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": { "jsonData": { "billFetchResponse": { "responseCode": "000", "inputParams": { "input": [{ "paramName": "Last 4 digit of primary credit card number", "paramValue": "8584" }, { "paramName": "Mobile Number", "paramValue": "8099781613" }] }, "billerResponse": { "billAmount": "1953604", "billDate": "2025-11-23", "customerName": "CHITRA KASTURI", "dueDate": "2025-12-13" }, "additionalInfo": { "info": [{ "infoName": "Minimum Amount Due", "infoValue": "6171.56" }, { "infoName": "Maximum Permissible Amount", "infoValue": "23038.51" }] } } }, "requestId": "v4UteaitqfmcHAWcaYX9q3bEqWC53300535" }
  }
};
export const BBPSBillPay = {
  apiUrl: {
    Method: 'POST',
    URLS: "http://localhost:7006/BBPS/bbps/billPayRequest",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 4: Get Bill Pay",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Get Bill Fetch'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg", "8d57XXX99ac4dXXXXX09011XXXXX"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/BBPS/bbps/billValidation",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 4: Bill Validation Fetch",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Bill Validate'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
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
    URLS: "http://localhost:7006/BBPS/bbps/billQuickPay",
    testUrl: "https://localhost:7007/V1/KYC/TEST/GSTIN/Gstinverify",
    liveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify"
  },
  title: {
    header: "STEP 5: Bill QuickPay",
    headerTitle: "BBPS using NTAR service",
    submitButton: 'Quick pay'
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  bodyParams: "(params)",
  Inputvalues: ["77TRLSNG7N000HENTL", "1.0", "instituteId", "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg", "8d57XXX99ac4dXXXXX09011XXXXX"],
  isDisable: true,
  exampleCurl: `curl --location 'http://localhost:7006/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secretKey: {{secretKey}}' \\
    --header 'clientId: {{clientId}}' \\
    --data '{
      "panNumber": ""
  }'`,
  exampleResponse: {
    "message": "Success",
    "success": true,
    "data": {
      "ERROR": "0",
      "STATUS": "1",
      "Mobile": "918688571181",
      "Operator": "Reliance Jio Infocomm Limited",
      "OpCode": "11",
      "Circle": "Andhra Pradesh",
      "CircleCode": "49",
      "Message": "Successfully"
    }
  }
};
