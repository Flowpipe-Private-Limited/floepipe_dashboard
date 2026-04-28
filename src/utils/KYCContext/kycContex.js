export const KYC_BASE =
  import.meta.env.REACT_APP_KYC_URL || "https://localhost:7010";
export const RECHARGE_BASE =
  import.meta.env.REACT_APP_RECHARGE_URL || "https://localhost:7010";
export const BBPS_BASE =
  import.meta.env.REACT_APP_BBPS_URL || "https://localhost:7010";
export const ADMIN_BASE =
  import.meta.env.REACT_APP_SUPPERADMIN_URL || "https://localhost:7010/api/v1/";

export const ERROR_RESPONSES = {
  400: {
    message: "Bad Request / Missing Parameters",
    success: false,
    httpCode: 400,
  },
  403: { message: "Access Denied", success: false, httpCode: 403 },
  404: { message: "Not Found", success: false, httpCode: 404 },
  429: {
    message: "Too Many Requests / Rate Limit Exceeded",
    success: false,
    httpCode: 429,
  },
  500: { message: "Internal Server Error", success: false, httpCode: 500 },
  503: { message: "Service Unavailable", success: false, httpCode: 503 },
};

export const apiExamples = [
  {
    name: "PAN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            PAN: "ABCDE1234F",
            Name: "RAM BABU",
            PAN_Status: "VALID",
            PAN_Holder_Type: "Person",
          },
        },
      },
    ],
  },
  {
    name: "PAN_DIRECTOR",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: { din: "ABCDEXXXXXXXX", name: "RAM" },
        },
      },
    ],
  },
  {
    name: "PAN_TO_GST",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: { gstin: "ABCDXXXXXXXX", authStatus: "", stateCd: "" },
        },
      },
    ],
  },
  {
    name: "PTA",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            code: 200,
            message: "Data Found Successfully.",
            result: { aadhaar: "53XXXXXXXX11" },
          },
        },
      },
    ],
  },
  {
    name: "NM",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            firstName: "SAI BABA",
            secondName: "RAM BABU",
            result: 100,
          },
        },
      },
    ],
  },
  {
    name: "PANFN",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            additional_check: [],
            category: "",
            client_id: "",
            dob: "",
            dob_check: false,
            dob_verified: false,
            father_name: "",
            full_name: "",
            less_info: false,
            pan_number: "",
          },
          message: "Valid",
          success: true,
        },
      },
    ],
  },
  {
    name: "FCV",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            card_number: "7854XXXXXXXX8569",
            is_valid: true,
            issuer_info: {
              Brand: "visa",
              Category: "platinum/Business",
              CountryName: "India",
              Issuer: "Sbi Cards And Payment Services, Ltd.",
              Type: "Credit/Debit",
              isoCode2: "In",
              isoCode3: "Ind",
            },
          },
        },
      },
    ],
  },
  {
    name: "BIN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            Brand: "visa",
            Category: "platinum/Business",
            CountryName: "India",
            Issuer: "Sbi Cards And Payment Services, Ltd.",
            Type: "Credit/Debit",
            isoCode2: "In",
            isoCode3: "Ind",
          },
        },
      },
    ],
  },
  {
    name: "AVI",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "DigiLocker link generate successfully.",
          transId: "TS-1766728568969",
          ts_trans_id: "PX-PBJ-340999",
          link: "https://www.truthscreen.com/eaadhaarDigilocker/dgl_auth_validate/MzY5MzAwMw==",
        },
      },
    ],
  },
  {
    name: "AVS",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            success: true,
            message: "Aadhaar retrieved and verified successfully",
            data: {
              status: 1,
              msg: "Digilocker status API",
              data: {
                "DV-ABC-123456": {
                  final_status: "Completed",
                  msg: [
                    {
                      doc_type: "ADHAR",
                      doc_name: "Aadhaar Card",
                      data: {
                        name: "Ravi Kumar",
                        dob: "01-01-1995",
                        aadhar_number: "xxxxxxxx1234",
                        gender: "M",
                        address: {
                          city: "Mumbai Suburban",
                          state: "Maharashtra",
                          pc: "400069",
                        },
                      },
                    },
                  ],
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: "MOG",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            message: "OTP sent to 91XXXXXX78",
            success: "Otp sent to Your Mobile Number 91XXXXXX78",
          },
        },
      },
    ],
  },
  {
    name: "MOV",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            message: "Mobile Number 91XXXXXX78 is Verified with OTP 23XX",
          },
        },
      },
    ],
  },
  {
    name: "GST",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          data: {
            gstinNumber: "11AAAAA1111A1Z1",
            companyName: "ABC PRIVATE LIMITED",
            taxpayer_type: "Regular",
            primary_business_address: {
              city: "Demo City",
              pincode: "123456",
              full_address:
                "Demo Building, 12345, Demo Street, Demo Location, Demo District, DemoState - 123456",
            },
          },
        },
      },
    ],
  },
  {
    name: "FACE",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            result: "Clear",
          },
          message: "Valid",
          success: true,
        },
      },
    ],
  },
  {
    name: "SHOP",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            registrationNumber: "registrationNumber",
            shop_name: "GOODWILL ENTERPRISES",
            status: "Active",
          },
        },
      },
    ],
  },
  {
    name: "CIN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            CompanyCharge: [],
            MasterDirector: [],
            active_compliance: "ACTIVE Compliant",
            activity_code: "62",
            activity_description:
              "Computer programming, consultancy and related activities",
            address_books_of_account_paper_maintained: "-",
            address_city: "",
            address_country: "India",
            address_line1: null,
            address_line2: null,
            address_pincode: "",
            address_state: "Telangana",
            api_status: "2",
            authorised_capital: "",
            cin: "XXXXXXXXXXXXXXX5856",
            class_of_company: "Private",
            company_category: "Company limited by shares",
            company_charge_new_status: "0",
            company_charges_status: "0",
            company_name: "ABC PRIVATE LIMITED",
            company_pan: "XXXXXXX5M",
            company_status: "Active",
            company_sub_category: "government company",
            company_type: "1",
            company_updated_date: "2020-04-14 18:20:55",
            country_of_incorporation: "Indian",
            created: "2020-02-21 10:16:58",
            created_by: null,
            date_of_annual_return_filing: null,
            date_of_balance_sheet: "2020-03-31",
            date_of_incorporation: "2020-06-24",
            date_of_last_agm: "2020-09-30",
            defaulting_status: null,
            description_of_main_division:
              "COMPUTER PROGRAMMING, CONSULTANCYAND RELATEDACTIVITIES",
            details: null,
            director_status: "0",
            email_id: "XYZ@gmail.com",
            end_date_for_accounts_solvency_filed: null,
            end_date_for_annual_returned_filed: null,
            fax: null,
            foreign_company_with_share_capital: null,
            global_location_number: null,
            id: "",
            index_charges_status: null,
            index_of_charges_status: "0",
            is_gstin_pan_sync: "1",
            is_lei_sync: "0",
            is_redis_sync: "20",
            line_of_business: null,
            listing_status: null,
            lot: null,
            main_division_of_business: null,
            master_id: null,
            migrate_status: null,
            modified: "2024-04-14 18:20:55",
            modified_by: null,
            no_of_members: "",
            no_of_patterns: null,
            no_of_present_directors: "0",
            number_of_designated_partners: null,
            other_address: null,
            paid_up_capital: "100000",
            previous_company_firm_details: null,
            previous_firm: null,
            product_services: null,
            registered_address: "",
            registered_office: null,
            registration_no: "",
            roc_code: "",
            roc_id: null,
            signatory_document_status: null,
            signatory_modified: null,
            status: "1",
            sum_of_active_charges: null,
            sum_of_satisfied_sharges: null,
            suspended_at_stock_exchange: null,
            suspended_stock_exchange: "N",
            telephone: null,
            total_obligation_of_contribution: null,
            type_of_company: null,
            type_of_office: null,
            update_btn_info: "2",
            update_status: null,
            website: null,
            whether_listed_or_not: "No",
          },
        },
      },
    ],
  },
  {
    name: "EMPLOYUANBASIC",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            uan: "",
            result: [
              {
                DateOfExitEpf: "",
                Doj: "",
                "Establishment Name": "",
                MemberId: "",
                "father or Husband Name": "",
                name: "",
                uan: "",
              },
            ],
          },
          message: "Valid",
          success: true,
        },
      },
    ],
  },
  {
    name: "CINBASECOMPANYSEARCH",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: [
            {
              cin: "",
              company_name: "XYZ PRIVATE LIMITED",
            },
          ],
        },
      },
    ],
  },
  {
    name: "COMPANYSEARCH",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: [
            {
              id: "12327498",
              cin: "XXXXXXXXXXXXXX856",
              city: "",
              email: "XYZ@gmail.com",
              state: "Telangana",
              status: "Active",
              country: "India",
              pincode: "",
              address1: "",
              address2: null,
              company_name: "ABC PRIVATE LIMITED",
              directorDetail: [],
              date_of_incorporation: "",
            },
          ],
        },
      },
    ],
  },
  {
    name: "UDAM",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            udyamdata: {
              "DIC Name": "HYDERABAD",
              "Date of Commencement of Production/Business": "28/08/2022",
              "Date of Incorporation": "28/08/2022",
              "Date of Udyam Registration": "23/09/2023",
              "Enterprise Type": [
                {
                  "Classification Date": "23/09/2023",
                  "Classification Year": "2023-24",
                  "Enterprise Type": "Micro",
                },
              ],
              "MSME-DFO": "HYDERABAD",
              "Major Activity": "Services",
              "Name of Enterprise": "XYZ SERVICES",
              "National Industry Classification Code(S)": [
                {
                  Activity: "Services",
                  Date: "23/09/2023",
                  "Nic 2 Digit": "",
                  "Nic 4 Digit": "",
                  "Nic 5 Digit": "",
                },
              ],
              "Official address of Enterprise": {
                Block: "0",
                City: "Hyderabad",
                District: "HYDERABAD",
                Email: "XYZ@gmail.com",
                "Flat/Door/Block No": "",
                Mobile: "XXXXXXXX42",
                "Name of Premises/ Building": "",
                Pin: "",
                "Road/Street/Lane": "",
                State: "TELANGANA",
                "Village/Town": "",
              },
              "Organisation Type": "Proprietary",
              "Social Category": "",
              "Type of Enterprise": "",
              "Unit(s) Details": [
                {
                  Block: "0",
                  Building: "",
                  City: "Hyderabad",
                  District: "HYDERABAD",
                  Flat: "",
                  Pin: "",
                  Road: "",
                  SN: 1,
                  State: "TELANGANA",
                  Unit_Name: "",
                  "Village/Town": "",
                },
              ],
            },
            udyam: "",
          },
        },
      },
    ],
  },
  {
    name: "DIN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            address: "",
            companyDetail: [
              {
                cin: "XXXXXXXXXX6856",
                company_address: "",
                company_category: "",
                company_name: "XYZ PRIVATE LIMITED",
                date_of_incorporation: "2024-06-24",
                email_id: "ABC@gmail.com",
                last_updated: "",
                roc_code: "",
                status: "Active",
              },
            ],
            din: "",
            name: "",
          },
        },
      },
    ],
  },
  {
    name: "GSTIN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            AdministrativeOffice: "",
            AnnualAggregateTurnover: "",
            ConstitutionOfBusiness: "Private Limited Company",
            "Date of Cancellation": "NA",
            "Date of registration": "01/03/2021",
            "GSTIN / UIN Status": "Active",
            "GSTIN/ UIN": "",
            GrossTotalIncome: "",
            "Legal Name of Business": "XYZ PRIVATE LIMITED",
            NatureOfBusinessActivities: "Supplier of Services",
            NatureOfCoreBusinessActivity: "",
            OtherOffice: "",
            PercentageOfTaxPaymentInCash: "NA",
            "Taxpayer Type": "Regular",
            "Trade Name": "XYZ PRIVATE LIMITED",
            WhetherAadhaarAuthenticated: "Yes",
            "WhetherE-KYCVerified": "Not Applicable",
            field_visit_conducted: "No",
            filingData: {
              GSTR1: [
                {
                  DateOfFiling: "22/04/2024",
                  FinancialYear: "2023-2024",
                  ModeOfFiling: "ONLINE",
                  ReturnType: "GSTR1",
                  Status: "Filed",
                  TaxPeriod: "March",
                },
              ],
            },
            goods_n_service: {
              goods: null,
              services: [],
            },
            placeOfBusinessData: [],
            proprietor_name: [],
          },
        },
      },
    ],
  },
  {
    name: "PANUSINGGSTIN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            GSTIN: "",
            LastUpdate: "",
            Name: "XYZ PRIVATE LIMITED",
            NameOnTheCard: "  XYZ PRIVATE LIMITED",
            PanNumber: "XXXXXXXX1C",
            STATUS: "Active",
            StatusDescription: "Existing and Valid",
            panHolderStatusType: "Company",
            source_id: "",
          },
        },
      },
    ],
  },
  {
    name: "GSTINVIEWTRACK",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: [
            {
              address: "",
              addressMatchPercentage: 100,
              advocateName: null,
              bothMatchPercentage: null,
              caseActType: null,
              caseCourtDetails: "",
              caseId: "",
              caseSection: null,
              case_code: "",
              case_disposed_date: "",
              category: "Criminal",
              courtDistid: "2",
              courtId: null,
              courtStateid: "29",
              data_source: "DC",
              fatherPercentage: null,
              flagged_address: 1,
              id: "",
              link: "",
              name: "",
              nameMatchPercentage: "",
              partyAddress_highlighted: "",
              partyDistid: "2",
              partyDistname: "hyderabad",
              partyFather: null,
              partyId: "",
              partyName_highlighted: "",
              partyStateid: "29",
              partyStatename: "telangana",
              partyType: "Petitioner",
              query_type: "",
              rank: 1,
              registration_year: "2017",
              score: 96.97,
              solr_source: "",
              stageOfCase: "hearing",
              weightedPercentage: 96.97,
            },
          ],
        },
      },
    ],
  },
  {
    name: "GSTINTAXPAYER",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            "Principal Place of Business Address": null,
            address: {
              building_name: "",
              door_number: "",
              floor_number: "",
              lattitude: "",
              location: "",
              longitude: "",
              pin_code: "",
              state_name: "",
              street: "",
            },
            centre_jurisdiction: "",
            centre_jurisdiction_code: "",
            constitution_of_business: "",
            date_of_cancellation: "",
            date_of_registration: "",
            frequency_type: "MONTHLY",
            gstin: "",
            gstin_status: "Active",
            last_updated_date: "",
            legal_name_of_business: "",
            nature_of_pricipal_place_of_business: "",
            state_jurisdiction: "",
            state_jurisdiction_code: "",
            taxpayer_type: "",
            trade_name: "",
            gstinNumber: "",
          },
          message: "Valid",
          success: true,
        },
      },
    ],
  },
  {
    name: "MOP",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: [
            {
              address: "",
              addressMatchPercentage: 100,
              advocateName: null,
              bothMatchPercentage: null,
              caseActType: null,
              caseCourtDetails: "",
              caseId: "",
              caseSection: null,
              case_code: "",
              case_disposed_date: "",
              category: "Criminal",
              courtDistid: "2",
              courtId: null,
              courtStateid: "29",
              data_source: "DC",
              fatherPercentage: null,
              flagged_address: 1,
              id: "",
              link: "",
              name: "",
              nameMatchPercentage: "",
              partyAddress_highlighted: "",
              partyDistid: "2",
              partyDistname: "hyderabad",
              partyFather: null,
              partyId: "",
              partyName_highlighted: "",
              partyStateid: "29",
              partyStatename: "telangana",
              partyType: "Petitioner",
              query_type: "",
              rank: 1,
              registration_year: "2017",
              score: 96.97,
              solr_source: "",
              stageOfCase: "hearing",
              weightedPercentage: 96.97,
            },
          ],
        },
      },
    ],
  },
  {
    name: "UDYAM",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            udyam: "UDYAM-XXXXXXXX",
            "Name of Enterprise": "Dummy Enterprise Pvt Ltd",
            Mobile: "9999999999",
          },
        },
      },
    ],
  },
  {
    name: "BPD",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            name: "SAI BABA",
            status: "VALID",
            account_no: "3864XXXXXXX",
            ifsc: "SBINXXXXXXX",
          },
        },
      },
    ],
  },
  {
    name: "IFSC",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            BRANCH: "Demo Branch",
            ADDRESS: "123 Demo Street",
            CITY: "Demo City",
            BANK: "Demo Bank Ltd",
            IFSC: "DMBC0001234",
          },
        },
      },
    ],
  },
  {
    name: "GEWPINCODE",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            District: "",
            Pincode: "",
            "Post Office": "",
            State: "",
            Subdistrict: "",
          },
          message: "",
          success: true,
        },
      },
    ],
  },
  {
    name: "GEWLATLONG",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            District: "",
            Pincode: "",
            "Post Office": "",
            State: "",
            Subdistrict: "",
          },
          message: "",
          success: true,
        },
      },
    ],
  },
  {
    name: "BANKVALID",
    examples: [
      {
        statusCode: 200,
        message: {
          httpCode: 200,
          data: {
            "Account Holder Name": "",
            "Bank Account Number": "",
            "Bank Branch - Address": {
              Address: "",
              Branch: "",
              City: "",
              Contact: "",
              District: "",
              State: "",
            },
            "Bank Name": "",
            "IFSC Code": "",
          },
          message: "Success",
          success: true,
        },
      },
    ],
  },
  {
    name: "PCG",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            District: "Agra",
            Pincode: "282003",
            State: "UTTAR PRADESH",
          },
        },
      },
    ],
  },
  {
    name: "IB",
    examples: [
      {
        statusCode: 200,
        message: { success: true, data: { result: "Clear" } },
      },
    ],
  },
  {
    name: "AIC",
    examples: [
      {
        statusCode: 200,
        message: { success: true, data: { ai_generated: 0.01 } },
      },
    ],
  },
  {
    name: "DIC",
    examples: [
      { statusCode: 200, message: { success: true, data: { deepfake: 0.01 } } },
    ],
  },
  {
    name: "ADIC",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: { ai_generated: 0.01, deepfake: 0.01 },
        },
      },
    ],
  },
  {
    name: "FO",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            Mobile: "918688571181",
            Operator: "Reliance Jio",
            OpCode: "11",
            Circle: "Andhra Pradesh",
          },
        },
      },
    ],
  },
  {
    name: "FP",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          data: {
            Operator: "RELIANCE JIO",
            Circle: "AP",
            RDATA: { "Popular Plans": [] },
          },
        },
      },
    ],
  },
  {
    name: "RP",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            status: "VALID",
            success: true,
            message: "Transaction Successful",
            account_no: "3864XXXXXXX",
          },
        },
      },
    ],
  },
  {
    name: "BillerInfo",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            billerName: "XXXX XXXX",
            billerCategory: "Credit Card",
            billerStatus: "ACTIVE",
          },
        },
      },
    ],
  },
  {
    name: "BillFetch",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            billAmount: "XXXXXX",
            customerName: "XXXXXXXX XXXXXXX",
            dueDate: "XXXX-XX-XX",
          },
        },
      },
    ],
  },
  {
    name: "BillPay",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            responseReason: "Successful",
            txnRefId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          },
        },
      },
    ],
  },
  {
    name: "InstantPay",
    examples: [
      {
        status: "Transaction Successful",
        data: {
          externalRef: "XXXXXXXXXXXX",
          txnValue: "4.00",
          payer: { name: "Sample Store" },
          payee: { name: "Instantpay India Ltd" },
        },
      },
    ],
  },
  {
    name: "VoterID",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            voterid_number: "ABC1234567",
            full_name: "JOHN DOE",
            dob: "01-01-1990",
            gender: "M",
          },
        },
      },
    ],
  },
  {
    name: "DL",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            dl_number: "SS-01-20230001234",
            name: "RAVI KUMAR",
            dob: "15-05-1985",
            expiry: "2040-01-01",
          },
        },
      },
    ],
  },
  {
    name: "Passport",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            passport_number: "A1234567",
            name: "AMIT SHARMA",
            dob: "20-10-1992",
            type: "P",
          },
        },
      },
    ],
  },
  {
    name: "RC",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            rc_number: "TN-01-AB-1234",
            owner_name: "SURESH BABU",
            model: "MARUTI SWIFT",
            fuel: "PETROL",
          },
        },
      },
    ],
  },
  {
    name: "Utility",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          response: {
            bill_status: "PAID",
            customer_name: "MAHESH REDDY",
            amount: "1250.00",
            due_date: "2024-05-10",
          },
        },
      },
    ],
  },
  {
    name: "RC_CHALLAN",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            challan_number: "DL12345678",
            amount: "500",
            status: "PENDING",
            date: "2024-03-01",
          },
        },
      },
    ], // dummy for future update
  },
  {
    name: "IEC",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            iec_number: "0123456789",
            company_name: "EXIM CORP",
            status: "ACTIVE",
          },
        },
      },
    ], // dummy for future update
  },
  {
    name: "BANK_STATEMENT",
    examples: [
      {
        statusCode: 200,
        message: {
          success: true,
          message: "Valid",
          response: {
            account_number: "1234567890",
            transactions: [
              { date: "2024-03-01", type: "CR", amount: "1000.00" },
            ],
          },
        },
      },
    ], // dummy for future update
  },
];
const validationPatterns = [
  {
    key: "mobile",
    label: "Mobile Number",
    regex: "^[6-9]\\d{9}$",
    message: "Enter a valid 10-digit mobile number",
  },
  {
    key: "otp",
    label: "OTP",
    regex: "^\\d{4}$",
    message: "Enter a valid 4-digit OTP",
  },
  {
    key: "gstin",
    label: "GSTIN",
    regex: "^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}Z[A-Z\\d]{1}$",
    message: "Enter a valid GSTIN",
  },
  {
    key: "email",
    label: "Email",
    regex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    message: "Enter a valid email address",
  },
  {
    key: "password",
    label: "Password",
    regex:
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    message:
      "Password must be at least 8 characters with upper, lower, number & special char",
  },
  {
    key: "name",
    label: "Full Name",
    regex: "^[A-Za-z\\s]+$",
    message: "Only alphabets are allowed",
  },
  {
    key: "number",
    label: "Only Numbers",
    regex: "^\\d+$",
    message: "Only numeric values are allowed",
  },
  {
    key: "ifsc",
    label: "IFSC Code",
    regex: "^[A-Z]{4}0[A-Z0-9]{6}$",
    message: "Enter a valid IFSC code",
  },
  {
    key: "pan",
    label: "PAN Number",
    regex: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
    message: "Enter a valid PAN number",
  },
  {
    key: "pincode",
    label: "Pincode",
    regex: "^[1-9]\\d{5}$",
    message: "Enter a valid 6-digit pincode",
  },
];

export const SecretToken = {
  apiUrl: {
    Method: "Post",
    URLS: "/client/generate/clientToken",
    LiveUrl: `${ADMIN_BASE}client/generate/clientToken`,
  },
  title: {
    header: "Generate Access Token",
    headerTitle: "Generate Access Token using ClientId, SecretKey",
    submitButton: "Create Token",
  },
  inputParams: ["clientId", "clientSecret", "expDate"],
  isToken: false,
  isMicro: "SupperAdmin",
  isDisable: false,
  exampleCurl: `curl --location '${ADMIN_BASE}client/generate/clientToken' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "clientId": "",
      "clientSecret": ""
  }'`,
  exampleResponse: {
    httpCode: 200,
    data: {
      secret_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6Ik.....",
      environment: "LIVE",
    },
    message: "Token generated successfully",
    success: true,
  },
};

// KYC Services
export const Aadhaar = {
  apiUrl: {
    Method: "Post",
    URLS: "client/aadhaar/pan/maskedverify",
    LiveUrl: `${KYC_BASE}/aadhaar/Aadhaarmaskedverify`,
  },
  title: {
    header: "Aadhaar Verification",
    headerTitle: "Verify Aadhaar using OTP-less masked verification service",
    submitButton: "Verify Aadhaar",
  },
  inputParams: ["aadharNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^[2-9][0-9]{11}$"],
  exampleCurl: `curl --location '${KYC_BASE}/aadhaar/Aadhaarmaskedverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "aadharNumber": "XXXXXXXXXXXX"
  }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "AVS")?.examples[0]?.message || {},
};
export const GstIN = {
  apiUrl: {
    Method: "Post",
    URLS: "client/business/Gstin/verify",
    LiveUrl: `${KYC_BASE}/GSTIN/Gstinverify`,
  },
  title: {
    header: "GSTIN Verification",
    headerTitle: "Verify GSTIN using government records",
    submitButton: "Verify GSTIN",
  },
  inputParams: ["gstinNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}Z[A-Z\\d]{1}$"],
  exampleCurl: `curl --location '${KYC_BASE}/GSTIN/Gstinverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "gstinNumber": "33AACCC1234F1Z1" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "GST")?.examples[0]?.message || {},
};
export const SHOP = {
  apiUrl: {
    Method: "Post",
    URLS: "shop/shopest",
    LiveUrl: `${KYC_BASE}/shop/shopest`,
  },
  title: {
    header: "Shop & Establishment Verification",
    headerTitle: "Verify business using registration number",
    submitButton: "Verify Shop",
  },
  inputParams: ["registrationNumber", "state"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/shop/shopest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "registrationNumber": "12345/ABC", "state": "Maharashtra" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "SHOP")?.examples[0]?.message || {},
};
export const SendOTP = {
  apiUrl: {
    Method: "Post",
    URLS: "mobileNumber/mobileOtp",
    LiveUrl: `${KYC_BASE}/mobileNumber/mobileOtp`,
  },
  title: {
    header: "Mobile OTP (Send)",
    headerTitle: "Send a verification OTP to the provided mobile number",
    submitButton: "Send OTP",
  },
  inputParams: ["mobileNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location '${KYC_BASE}/mobileNumber/mobileOtp' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "mobileNumber": "9876543210" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "MOG")?.examples[0]?.message || {},
};
export const VerifyOTP = {
  apiUrl: {
    Method: "Post",
    URLS: "mobileNumber/mobileotpVerify",
    LiveUrl: `${KYC_BASE}/mobileNumber/mobileotpVerify`,
  },
  title: {
    header: "Mobile OTP (Verify)",
    headerTitle: "Submit the 4-digit OTP received",
    submitButton: "Verify OTP",
  },
  inputParams: ["submittedOtp", "mobile"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^\\d{4}$", "^[6-9]\\d{9}$"],
  exampleCurl: `curl --location '${KYC_BASE}/mobileNumber/mobileotpVerify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "submittedOtp": "1234", "mobile": "9876543210" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "MOV")?.examples[0]?.message || {},
};
export const PanVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "pan/verify",
    LiveUrl: `${KYC_BASE}/pan/verify`,
  },
  title: {
    header: "PAN Card Verification",
    headerTitle: "Verify PAN details against records",
    submitButton: "Verify PAN",
  },
  inputParams: ["panNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location '${KYC_BASE}/pan/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "panNumber": "ABCDE1234F" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "PAN")?.examples[0]?.message || {},
};
export const panAadhaarVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "pan/verify_to_aadhaar",
    LiveUrl: `${KYC_BASE}/pan/verify_to_aadhaar`,
  },
  title: {
    header: "PAN-Aadhaar Link",
    headerTitle: "Check link status",
    submitButton: "Check Link Status",
  },
  inputParams: ["panNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^[A-Z]{5}[0-9]{4}[A-Z]{1}$"],
  exampleCurl: `curl --location '${KYC_BASE}/pan/verify_to_aadhaar' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "panNumber": "ABCDE1234F" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "PTA")?.examples[0]?.message || {},
};
export const accountVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "bank/penny/drop",
    LiveUrl: `${KYC_BASE}/bank/penny/drop`,
  },
  title: {
    header: "Bank Account Penny Drop",
    headerTitle: "Verify bank account by depositing 1 rupee",
    submitButton: "Verify Account",
  },
  inputParams: ["accountNumber", "ifsc"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^\\d{9,18}$", "^[A-Z]{4}0[A-Z0-9]{6}$"],
  exampleCurl: `curl --location '${KYC_BASE}/bank/penny/drop' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "accountNumber": "1234567890", "ifsc": "SBIN0012345" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BPD")?.examples[0]?.message || {},
};
export const CINVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "business/CinNumberverify",
    LiveUrl: `${KYC_BASE}/business/CinNumberverify`,
  },
  title: {
    header: "CIN Verification",
    headerTitle: "Verify Corporate Identification Number (CIN)",
    submitButton: "Verify CIN",
  },
  inputParams: ["CIN"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^([LU])\\d{5}[A-Z]{2}\\d{4}[A-Z]{3}\\d{6}$"],
  exampleCurl: `curl --location '${KYC_BASE}/business/CinNumberverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "CIN": "U72200TN2020PTC123456" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "CIN")?.examples[0]?.message || {},
};
export const UdamVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "udyam/verify",
    LiveUrl: `${KYC_BASE}/udyam/verify`,
  },
  title: {
    header: "Udyam Aadhaar Verification",
    headerTitle: "Verify MSME Udyam Registration number",
    submitButton: "Verify Udyam",
  },
  inputParams: ["udyamNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/udyam/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "udyamNumber": "UDYAM-TN-01-1234567" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "UDYAM")?.examples[0]?.message || {},
};
export const cardVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "card/cardVerify",
    LiveUrl: `${KYC_BASE}/card/cardVerify`,
  },
  title: {
    header: "Credit Card Verification",
    headerTitle: "Verify Credit Card details",
    submitButton: "Verify Credit Card",
  },
  inputParams: ["creditCardNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/card/cardVerify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "creditCardNumber": "4532XXXXXXXX1234" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "FCV")?.examples[0]?.message || {},
};
export const NameMatch = {
  apiUrl: {
    Method: "Post",
    URLS: "client/match/nameMatch",
    LiveUrl: `${KYC_BASE}/match/nameMatch`,
  },
  title: {
    header: "Name Match",
    headerTitle: "Compare two names for similarity score",
    submitButton: "Match Names",
  },
  inputParams: ["firstName", "secondName"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/match/nameMatch' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "firstName": "John Doe", "secondName": "John" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "NM")?.examples[0]?.message || {},
};

// Recharge Services
export const RechargeOperators = {
  apiUrl: {
    Method: "Post",
    URLS: "/Operators",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify",
  },
  title: {
    header: "STEP 1: Fetch Operators",
    headerTitle: "Fetch Service operators using NTAR service",
    submitButton: "Operators Fetch",
  },
  inputParams: ["mobileNumber"],
  isToken: true,
  isMicro: "RECHARGE",
  isDisable: false,
  regexValues: ["^[6-9]\\d{9}$"],
  exampleCurl: `curl --location '${RECHARGE_BASE}/Operators' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "mobileNumber": "9876543210"
  }'`,
  exampleResponse: {
    message: "Success",
    data: {
      ERROR: "0",
      STATUS: "1",
      Mobile: "918688571181",
      Operator: "Reliance Jio Infocomm Limited",
      OpCode: "11",
      Circle: "Andhra Pradesh",
      CircleCode: "49",
      Message: "Successfully",
    },
    success: true,
  },
};
export const RechargePlans = {
  apiUrl: {
    Method: "Post",
    URLS: "/Plans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify",
  },
  title: {
    header: "STEP 2: Fetch Plans",
    headerTitle: "Fetch plans using NTAR service",
    submitButton: "Fetch Plans",
  },
  inputParams: ["operatorcode", "cricle"],
  isToken: true,
  isMicro: "RECHARGE",
  isDisable: false,
  exampleCurl: `curl --location '${RECHARGE_BASE}/Plans' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operatorcode": "11",
      "cricle": "49"
  }'`,
  exampleResponse: {
    message: "Success",
    data: {
      ERROR: "0",
      STATUS: "0",
      Operator: "RELIANCE JIO",
      Circle: "AP",
      RDATA: {
        "Popular Plans": [],
      },
      MESSAGE: "Operator Plan Successfully",
    },
    success: true,
  },
};
export const RechargeOldPlans = {
  apiUrl: {
    Method: "Post",
    URLS: "/OldPlans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify",
  },
  title: {
    header: "Fetch Old Plans",
    headerTitle: "Fetch old plans using NTAR service",
    submitButton: "Fetch oldPlans",
  },
  inputParams: ["operatorcode", "cricle"],
  isToken: true,
  isMicro: "RECHARGE",
  isDisable: false,
  exampleCurl: `curl --location '${RECHARGE_BASE}/OldPlans' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operatorcode": "11",
      "cricle": "49"
  }'`,
  exampleResponse: {
    message: "Success",
    data: {
      ERROR: "0",
      STATUS: "0",
      Operator: "RELIANCE JIO",
      Circle: "AP",
      RDATA: {
        "Popular Plans": [],
      },
      MESSAGE: "Operator Plan Successfully",
    },
    success: true,
  },
};
export const RechargeOffersPlans = {
  apiUrl: {
    Method: "Post",
    URLS: "/OffersPlans",
    LiveUrl: "https://localhost:7007/V1/KYC/LIVE/GSTIN/Gstinverify",
  },
  title: {
    header: "STEP 3: Fetch OffersPlans",
    headerTitle: "Fetch Offersplans using NTAR service",
    submitButton: "Fetch Offers",
  },
  inputParams: ["operator_code", "mobile_no"],
  isToken: true,
  isMicro: "RECHARGE",
  isDisable: false,
  exampleCurl: `curl --location '${RECHARGE_BASE}/OffersPlans' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{
      "operator_code": "11",
      "mobile_no": "9876543210"
  }'`,
  exampleResponse: {
    message: "Success",
    data: {
      ERROR: "11",
      STATUS: "3",
      MOBILENO: "",
      RDATA: null,
      MESSAGE: "Roffer Check service only availble in Airtel and VI.",
    },
    success: true,
  },
};

export const RechargeURL = {
  apiUrl: {
    Method: "Post",
    URLS: "/RechargeURL",
    LiveUrl: "https://localhost:7007/V1/RECHARGE/LIVE/RechargeURL",
  },
  title: {
    header: "STEP 4: Mobile Recharge",
    headerTitle: "Initiate a mobile recharge transaction",
    submitButton: "Process Recharge",
  },
  isGeoLocation: true,
  inputParams: [
    "MobileNumber",
    "actualAmount",
    "spKey",
    "transactionId",
    "customerNumber",
  ],
  isToken: true,
  isMicro: "RECHARGE",
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
    message: "Success",
    data: {
      ERROR: "0",
      STATUS: "1",
      Mobile: "918688571181",
      Operator: "Reliance Jio Infocomm Limited",
      OpCode: "11",
      Circle: "Andhra Pradesh",
      CircleCode: "49",
      Message: "Successfully",
    },
    success: true,
  },
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
    Method: "Get",
    URLS: "/billerInfo/:category",
    LiveUrl: `${BBPS_BASE}/billerInfo/:category`,
  },
  title: {
    header: "STEP 1: BBPS Categories",
    headerTitle: "Fetch BBPS categories",
    submitButton: "List Categories",
  },
  inputParams: ["category"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: ["Credit Card"],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billerInfo/Credit%20Card' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BillerInfo")?.examples[0]?.message ||
    {},
};
export const BBPSBillerInfo = {
  apiUrl: {
    Method: "Get",
    URLS: "/billerInfo/:billerId",
    LiveUrl: `${BBPS_BASE}/billerInfo/:billerId`,
  },
  title: {
    header: "STEP 2: Biller Information",
    headerTitle: "Fetch detailed biller info",
    submitButton: "Get Biller Info",
  },
  inputParams: ["billerId"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: ["SBIC00000NATDN"],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billerInfo/SBIC00000NATDN' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BillerInfo")?.examples[0]?.message ||
    {},
};
export const BBPSBillFetch = {
  apiUrl: {
    Method: "Get",
    URLS: "/billFetch",
    LiveUrl: `${BBPS_BASE}/billFetch`,
  },
  title: {
    header: "STEP 3: BBPS Bill Fetch",
    headerTitle: "Fetch pending bills",
    submitButton: "Fetch Bill",
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: [
    "77TRLSNG7N000HENTL",
    "1.0",
    "instituteId",
    "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg",
  ],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billFetch?accessCode=77TRLSNG7N000HENTL&ver=1.0&instituteId={{instituteId}}&secretKey={{secretKey}}' \\
    --header 'secret_token: {{secret_token}}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BillFetch")?.examples[0]?.message || {},
};
export const BBPSBillPay = {
  apiUrl: {
    Method: "POST",
    URLS: "/billPayRequest",
    LiveUrl: `${BBPS_BASE}/billPayRequest`,
  },
  title: {
    header: "STEP 4: Get Bill Pay",
    headerTitle: "Process bill payment",
    submitButton: "Bill Pay",
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: [
    "77TRLSNG7N000HENTL",
    "1.0",
    "instituteId",
    "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg",
    "8d57XXX99ac4dXXXXX09011XXXXX",
  ],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billPayRequest' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "accessCode": "77TRLSNG7N000HENTL", "ver": "1.0", "requestId": "8d57XXX99ac4dXXXXX09011XXXXX", "instituteId": "{{instituteId}}", "secretKey": "{{secretKey}}" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BillPay")?.examples[0]?.message || {},
};
export const BBPSBillValidation = {
  apiUrl: {
    Method: "POST",
    URLS: "/billValidation",
    LiveUrl: `${BBPS_BASE}/billValidation`,
  },
  title: {
    header: "STEP 4: Bill Validation",
    headerTitle: "Validate bill details before payment",
    submitButton: "Bill Validate",
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: [
    "77TRLSNG7N000HENTL",
    "1.0",
    "instituteId",
    "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg",
  ],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billValidation' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "accessCode": "77TRLSNG7N000HENTL", "ver": "1.0", "instituteId": "{{instituteId}}", "secretKey": "{{secretKey}}" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BillFetch")?.examples[0]?.message || {},
};
export const BBPSBillQuickPay = {
  apiUrl: {
    Method: "POST",
    URLS: "/billQuickPay",
    LiveUrl: `${BBPS_BASE}/billQuickPay`,
  },
  title: {
    header: "STEP 5: BBPS Quick Pay",
    headerTitle: "Process immediate bill payment",
    submitButton: "Quick Pay",
  },
  inputParams: ["accessCode", "ver", "instituteId", "secretKey", "requestId"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: [
    "77TRLSNG7N000HENTL",
    "1.0",
    "instituteId",
    "Tlxnsh4.43fjdsj6.dfsdkf.9gd565fdfg",
    "8d57XXX99ac4dXXXXX09011XXXXX",
  ],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/billQuickPay' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "accessCode": "77TRLSNG7N000HENTL", "ver": "1.0", "requestId": "8d57XXX99ac4dXXXXX09011XXXXX", "instituteId": "{{instituteId}}", "secretKey": "{{secretKey}}" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "InstantPay")?.examples[0]?.message ||
    {},
};
export const InstantBillPay = {
  apiUrl: {
    Method: "POST",
    URLS: "/instantpay/billPay",
    LiveUrl: `${BBPS_BASE}/instantpay/billPay`,
  },
  title: {
    header: "InstantPay Bill Pay",
    headerTitle: "Instant bill payment via InstantPay",
    submitButton: "Bill Pay",
  },
  inputParams: ["cardNumber"],
  isMicro: "BBPS",
  bodyParams: "(params)",
  Inputvalues: ["****************"],
  isDisable: true,
  exampleCurl: `curl --location '${BBPS_BASE}/instantpay/billPay' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{ "cardNumber": "****************" }'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "InstantPay")?.examples[0]?.message ||
    {},
};

// Identity Services (Expanded)
export const VoterID = {
  apiUrl: {
    Method: "Post",
    URLS: "client/government/voterId/verify",
    LiveUrl: `${KYC_BASE}/government/voterId/verify`,
  },
  title: {
    header: "Voter ID Verification",
    headerTitle: "Verify Voter ID details",
    submitButton: "Verify Voter ID",
  },
  inputParams: ["voterIdNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  regexValues: ["^[A-Z]{3}[0-9]{7}$"],
  exampleCurl: `curl --location '${KYC_BASE}/government/voterId/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"voterIdNumber": "ABC1234567"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "VoterID")?.examples[0]?.message || {},
};

export const Passport = {
  apiUrl: {
    Method: "Post",
    URLS: "client/government/passport/verify",
    LiveUrl: `${KYC_BASE}/government/passport/verify`,
  },
  title: {
    header: "Passport Verification",
    headerTitle: "Verify Passport details",
    submitButton: "Verify Passport",
  },
  inputParams: ["passportNumber", "dob"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/government/passport/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"passportNumber": "S1234567", "dob": "1990-01-01"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "Passport")?.examples[0]?.message || {},
};

export const DLVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "client/vehicle/driving_license/verify",
    LiveUrl: `${KYC_BASE}/vehicle/driving_license/verify`,
  },
  title: {
    header: "Driving License Verification",
    headerTitle: "Verify DL details",
    submitButton: "Verify DL",
  },
  inputParams: ["dlNumber", "dob"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/vehicle/driving_license/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"dlNumber": "DL-1234567890123", "dob": "1990-01-01"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "DL")?.examples[0]?.message || {},
};

// Vehicle Services (Expanded)
export const RCVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "client/vehicle/rcverify",
    LiveUrl: `${KYC_BASE}/vehicle/rcverify`,
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
  exampleCurl: `curl --location '${KYC_BASE}/vehicle/rcverify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"rcNumber": "DL1CA1234"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "RC")?.examples[0]?.message || {},
};

export const RCChallan = {
  apiUrl: {
    Method: "Post",
    URLS: "client/vehicle/challan_via_rc",
    LiveUrl: `${KYC_BASE}/vehicle/challan_via_rc`,
  },
  title: {
    header: "RC Challan Search",
    headerTitle: "Fetch traffic challan details",
    submitButton: "Fetch Challans",
  },
  inputParams: ["rcNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/vehicle/challan_via_rc' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"rcNumber": "DL1CA1234"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "RC_CHALLAN")?.examples[0]?.message ||
    {}, // dummy for future update
};

// Business Services (Expanded)
export const DINVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "client/business/din/verify",
    LiveUrl: `${KYC_BASE}/business/din/verify`,
  },
  title: {
    header: "DIN Verification",
    headerTitle: "Verify Director Identification Number",
    submitButton: "Verify DIN",
  },
  inputParams: ["din"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/business/din/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"din": "01234567"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "PAN_DIRECTOR")?.examples[0]?.message ||
    {},
};

export const IECVerify = {
  apiUrl: {
    Method: "Post",
    URLS: "client/business/IEC/verify",
    LiveUrl: `${KYC_BASE}/business/IEC/verify`,
  },
  title: {
    header: "IEC Verification",
    headerTitle: "Verify Import Export Code details",
    submitButton: "Verify IEC",
  },
  inputParams: ["iecNumber"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/business/IEC/verify' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"iecNumber": "0123456789"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "IEC")?.examples[0]?.message || {}, // dummy for future update
};

// Utility Services (Expanded)
export const ElectricityBill = {
  apiUrl: {
    Method: "Post",
    URLS: "client/government/electricity_bill",
    LiveUrl: `${KYC_BASE}/government/electricity_bill`,
  },
  title: {
    header: "Electricity Bill Verification",
    headerTitle: "Fetch electricity bill details",
    submitButton: "Fetch Bill",
  },
  inputParams: ["consumerId", "biller"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/government/electricity_bill' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"consumerId": "123456789", "biller": "TNEB"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "Utility")?.examples[0]?.message || {},
};

// Finance Services (Expanded)
export const BankStatement = {
  apiUrl: {
    Method: "Post",
    URLS: "client/bank/statement",
    LiveUrl: `${KYC_BASE}/bank/statement`,
  },
  title: {
    header: "Bank Statement Fetch",
    headerTitle: "Fetch bank statement details",
    submitButton: "Fetch Statement",
  },
  inputParams: ["accountId", "bankName"],
  isToken: true,
  isMicro: "KYC",
  isDisable: false,
  exampleCurl: `curl --location '${KYC_BASE}/bank/statement' \\
    --header 'Content-Type: application/json' \\
    --header 'secret_token: {{secret_token}}' \\
    --data '{"accountId": "1234567890", "bankName": "SBI"}'`,
  exampleResponse:
    apiExamples.find((e) => e.name === "BANK_STATEMENT")?.examples[0]
      ?.message || {}, // dummy for future update
};
