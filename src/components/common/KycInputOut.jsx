import axios from "axios";
import EXResponse from "../../components/common/response";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { ERROR_RESPONSES } from "../../utils/KYCContext/kycContex";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../../utils/Apis/apiRequestHandler";
import { ApiVerification, fetchPublickey } from "../../utils/Apis/api";
import { encryptPayload, generateFrontendKeyPair } from "../../utils/helper";
// import { useUserStore } from "../../Store/userStore";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../Store/userStore";
import "./KycInputOut.css";
import Lottie from "lottie-react";
import Images from "../../Images/Images";

const KycReuseComponet = ({ data }) => {
  const { IskycApproved, kycCompleted } = useUserStore();
  const [formData, setFormData] = useState({});
  const [Publickey, setPublickey] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const [Loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrormessage] = useState("");
  const [errors, setErrors] = useState({}); // ONly for the regex
  const [showAlert, setShowAlert] = useState(false);
  const [selectedExampleCode, setSelectedExampleCode] = useState(
    data?.exampleResponse || {},
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(data?.apiUrl?.liveUrl);

  const HandleChangeInput = (e) => {
    console.log("Handle input change is trigred");
    setApiErrormessage("");
    const { name, value, pattern } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex?.test(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: "Invalid Input format",
        }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          console.log(updated);
          return updated;
        });
      }
    }
  };

  const HandleVerificaton = async () => {
    let locationData = {};
    setApiErrormessage("");

    if (data?.isGeoLocation) {
      try {
        // Wrapping callback-based API in a Promise is the standard/best way in modern JS
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true, // Request best possible results
            timeout: 10000, // Wait max 10 seconds
            maximumAge: 0, // Force fresh location
          });
        });

        locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (error) {
        console.error("Geolocation error:", error);

        let errorMsg = "Location access failed.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg =
            "Location permission denied. Please allow location access to proceed.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "The request to get user location timed out.";
        }

        // You can choose to block or just warn.
        // Currently setting message and returning, effectively blocking.
        setApiErrormessage(errorMsg);
        return;
      }
    }
    console.log(locationData);

    // Merge form data with location data
    const payloadToEncrypt = { ...formData, ...locationData };
    console.log(payloadToEncrypt);

    let finalPayload = await encryptPayload(payloadToEncrypt, Publickey);
    console.log('is called', finalPayload);
    const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair()
    window.PRIVITEKEY = privateKeyPem;
    console.log(finalPayload, publicKeyPem, privateKeyPem);
    // if (!IskycApproved || !kycCompleted) {
    //     console.log('is trigred')
    //     setShowAlert(true);
    //     return;
    // };

    setLoading(true);

    await ApirequestHandler(
      async () => await ApiVerification(data?.isMicro, data?.apiUrl?.URLS, { ...finalPayload, publicKeyPem }),
      setLoading,
      (res) => {
        const { data } = res;
        console.log(res)
        setApiResponse(res);
        setApiErrormessage('');
        setLoading(false)
      },
      (errorMessage) => {
        console.log('Error:', errorMessage);
        setApiErrormessage(errorMessage);
        setLoading(false);
      }
    )
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log("Clipboard blocked, using fallback");
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  };

  const GetPublickey = async () => {
    console.log('is GetPublickey');
    await ApirequestHandler(
      async () => fetchPublickey(),
      null,
      (res) => {
        const { publicKey } = res;
        console.log(publicKey)
        setPublickey(publicKey);
      },
      (errMessage) => {
        console.log(errMessage)
      }
    )
    // const response = await axios.get(`${import.meta.env.REACT_APP_DASHBOARD_URL}ApiModuel/key/Publickey`);
    // const { publicKey } = response.data;
    // console.log(response)
    // setPublickey(publicKey);
  }

  useEffect(() => {
    GetPublickey();
  }, []);

  return (
    <div className="kyc-input-container">
      <Eachpage_header headertitle={"KYC"} />
      <div className="kyc-grid-container">
        {/* LEFT INPUT SECTION */}
        <div className="kyc-card kyc-left-section">
          <div className="kyc-mono-header">{data?.title?.header}</div>
          <p className="kyc-subheader">{data?.title?.headerTitle}</p>

          <div className="kyc-form-container">
            {data?.inputParams?.map((input, index) => (
              <div key={index} className="kyc-input-group">
                <div className="kyc-label">
                  {input.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
                  <span className="kyc-label-sub">{data?.bodyParams}</span>
                </div>
                <input
                  type="text"
                  placeholder={!data?.isDisable ? `Enter ${input}` : ""}
                  name={input}
                  pattern={data?.regexValues?.[index]}
                  value={
                    data?.isDisable
                      ? data?.Inputvalues[index]
                      : formData?.[input] || ""
                  }
                  disabled={data?.isDisable}
                  className={`kyc-input-field
                                            ${errors?.[input]
                      ? "error"
                      : formData?.[input]
                        ? "success"
                        : ""
                    }`}
                  onChange={HandleChangeInput}
                />
                {errors?.[input] && (
                  <p className="kyc-error-msg">{errors[input]}</p>
                )}
              </div>
            ))}
            <button
              className="kyc-submit-button"
              onClick={HandleVerificaton}
              disabled={data?.isDisable}
            >
              {Loading ? "Loading ..." : data?.title?.submitButton}
            </button>
            {apiErrorMessage && (
              <p className="kyc-api-error">{apiErrorMessage}</p>
            )}
            {(!IskycApproved || !kycCompleted) && showAlert && (
              <div className="kyc-alert-box">
                <svg
                  className="kyc-alert-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p style={{ paddingRight: "2rem" }}>
                  Please complete your KYC verification. Once submitted, kindly
                  wait for approval
                </p>
                <button
                  onClick={() => setShowAlert(false)}
                  className="kyc-alert-close"
                  aria-label="Close alert"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="kyc-right-section">
          <div className="kyc-card kyc-method-card">
            <span
              className={`kyc-method-label ${data?.apiUrl?.Method === "Get" ? "get" : "post"}`}
            >
              {data?.apiUrl?.Method}:
            </span>
            {/* Custom Dropdown */}
            <div className="kyc-custom-select-container">
              <div
                className="kyc-custom-select-trigger"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="selected-value">
                  {selectedUrl || data?.apiUrl?.liveUrl}
                </span>
                <span className={`arrow ${isDropdownOpen ? "open" : ""}`}>
                  ▼
                </span>
              </div>
              {isDropdownOpen && (
                <div className="kyc-custom-options">
                  <div
                    className="kyc-option"
                    onClick={() => {
                      setSelectedUrl(data?.apiUrl?.liveUrl);
                      setIsDropdownOpen(false);
                    }}
                  >

                         <div className="kyc-lottie-icon-wrapper">
                      <Lottie
                        animationData={Images.LIVEAnimation}
                        loop
                        autoplay
                        className="kyc-lottie-small"
                      />
                    </div>
                    <span>{data?.apiUrl?.liveUrl}</span>
                  </div>
                  <div
                    className="kyc-option"
                    onClick={() => {
                      setSelectedUrl(data?.apiUrl?.testUrl);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="kyc-lottie-icon-wrapper">
                      <Lottie
                        animationData={Images.TESTAnimation}
                        loop
                        autoplay
                        className="kyc-lottie-small"
                      />
                    </div>

                    <span>{data?.apiUrl?.testUrl}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="kyc-card">
            <div className="kyc-card-header-row">
              <div
                className="kyc-mono-header"
                style={{ fontSize: "1.125rem", marginBottom: 0 }}
              >
                Example Request
              </div>
              <div className="flex gap-2"></div>
              <div className="kyc-curl">
                <div className="kyc-badge-pill">Crul</div>
                <button
                  className="kyc-copy-btn-outline"
                  onClick={() =>
                    handleCopy(data?.exampleCurl || selectedExampleCode)
                  }
                >
                  <img className="copyicon" src={Images.copyicon} />
                  Copy
                </button>
              </div>
            </div>

            <div className="kyc-light-code-theme">
              <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>
                {data?.exampleCurl || EXResponse.AadhaarNumberCurl}
              </pre>
            </div>
          </div>
          <div className="kyc-card">
            <div className="kyc-card-header-row">
              <div className="kyc-mono-header" style={{ fontSize: "1.125rem" }}>
                Example Response
              </div>

              <div className="kyc-curl">
                <div className="kyc-status-group">
                  <button className="kyc-status-pill">Response</button>
                  <button
                    className="kyc-status-pill kyc-status-200"
                    onClick={() =>
                      setSelectedExampleCode(
                        data?.exampleResponse || selectedExampleCode,
                      )
                    }
                  >
                    200
                  </button>
                  <button
                    className="kyc-status-pill kyc-status-400"
                    onClick={() => setSelectedExampleCode(ERROR_RESPONSES[400])}
                  >
                    400
                  </button>
                  <button
                    className="kyc-status-pill kyc-status-503"
                    onClick={() => setSelectedExampleCode(ERROR_RESPONSES[503])}
                  >
                    503
                  </button>
                  <button
                    className="kyc-status-pill kyc-status-504"
                    onClick={() => setSelectedExampleCode(ERROR_RESPONSES[504])}
                  >
                    504
                  </button>
                </div>

                <button
                  className="kyc-copy-btn-outline"
                  onClick={() =>
                    handleCopy(JSON.stringify(selectedExampleCode, null, 2))
                  }
                >
                  <img className="copyicon" src={Images.copyicon} />
                  Copy
                </button>
              </div>
            </div>
            <SyntaxHighlighter
              language="json"
              style={docco}
              customStyle={{
                backgroundColor: "#f9fafb",
                padding: "1rem",
                borderRadius: "0.5rem",
                fontSize: "0.875rem",
              }}
              wrapLongLines={true}
            >
              {JSON.stringify(
                apiResponse ? apiResponse : selectedExampleCode,
                null,
                2,
              )}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycReuseComponet;
