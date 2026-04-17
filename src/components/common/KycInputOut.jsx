import axios from "axios";
import EXResponse from "../../components/common/response";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco, atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ERROR_RESPONSES } from "../../utils/KYCContext/kycContex";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../../utils/Apis/apiRequestHandler";
import { ApiVerification, fetchPublickey } from "../../utils/Apis/api";
import { encryptPayload, generateFrontendKeyPair } from "../../utils/helper";
import { useUserStore } from "../../Store/userStore";
import { useUserkey } from "../../Store/userKeyStore";
import { ShieldAlert } from "lucide-react";
import "./KycInputOut.css";
import Lottie from "lottie-react";
import Images from "../../Images/Images";
import { GeneralKeys } from "../../Store/PubliPriviteKey";

const KycReuseComponet = ({ data }) => {
  console.log('Data: ', data);
  console.log('Is Valid', `${data?.isDisable}`)
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      if (currentTheme !== theme) {
        setTheme(currentTheme);
      }
    };

    // Listen for custom event from Dashboard
    window.addEventListener("themeChange", checkTheme);

    // Also keep the interval as a fallback for cross-tab sync
    const interval = setInterval(checkTheme, 1000);

    return () => {
      window.removeEventListener("themeChange", checkTheme);
      clearInterval(interval);
    };
  }, [theme]);

  const { IskycApproved, kycCompleted } = useUserStore();
  const {
    LiveAccessToken,
    TestAccessToken,
    whitelistIps,
    currentPublicIp,
    detectCurrentIp,
    fetchWhitelistIPs
  } = useUserkey();

  const { setPubKey } = GeneralKeys();
  const [formData, setFormData] = useState({});      // text fields
  const [fileData, setFileData] = useState({}); 
  const [accessToken, setAccessToken] = useState("");
  const [Publickey, setPublickey] = useState("");
  const [publickeyLoading, setPublickeyLoading] = useState(false);
  const [publickeyError, setPublickeyError] = useState("");
  const [apiResponse, setApiResponse] = useState({});
  const [Loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrormessage] = useState("");
  const [errors, setErrors] = useState({}); // Only for regex
  const [showAlert, setShowAlert] = useState(false);
  const [selectedExampleCode, setSelectedExampleCode] = useState(
    data?.exampleResponse
  );

  useEffect(() => {
    if (data?.isDisable && data?.inputParams && data?.Inputvalues) {
      const initialFormData = {};
      data.inputParams.forEach((param, index) => {
        initialFormData[param] = data.Inputvalues[index];
      });
      setFormData(initialFormData);
    } else {
      setFormData({});
    }
    setFileData({});
    // Auto-populate Access Token
    if (data?.isToken) {
      const isLive = data?.apiUrl?.LiveUrl?.includes('/LIVE/') || data?.apiUrl?.URLS?.includes('/LIVE/');
      setAccessToken(isLive ? LiveAccessToken : TestAccessToken);
    }

    setApiResponse(null);
    setSelectedExampleCode(data?.exampleResponse || {});
    setApiErrormessage("");
    setErrors({}); // Reset validation errors when switching services
    setPublickeyError(""); // Reset key error on transition
  }, [data, LiveAccessToken, TestAccessToken]);

  useEffect(() => {
    if (!currentPublicIp) detectCurrentIp();
    if (whitelistIps.length === 0) fetchWhitelistIPs();
  }, []);

  const isIpWhitelisted = whitelistIps.some(item => item.ip === currentPublicIp);
  const showIpWarning = currentPublicIp && !isIpWhitelisted && data?.isMicro !== "SupperAdmin";


  // const HandleChangeInput = (e) => {
  //   console.log("Handle input change is trigred");
  //   setApiErrormessage("");
  //   const { name, value, pattern } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));

  //   if (pattern) {
  //     const regex = new RegExp(pattern);
  //     if (!regex?.test(value)) {
  //       setErrors((prev) => ({
  //         ...prev,
  //         [name]: "Invalid Input format",
  //       }));
  //     } else {
  //       setErrors((prev) => {
  //         const updated = { ...prev };
  //         delete updated[name];
  //         console.log(updated);
  //         return updated;
  //       });
  //     }
  //   }
  // };

  const HandleChangeInput = (e) => {
    setApiErrormessage("");
    const { name, value, pattern, type, files } = e.target;

    if (type === "file") {
      // Store the File object; ignore for disabled inputs
      const file = files?.[0] || null;
      setFileData((prev) => ({ ...prev, [name]: file }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (pattern) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        setErrors((prev) => ({ ...prev, [name]: "Invalid Input format" }));
      } else {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const buildPayload = (jsonFields, files) => {
    const hasFiles = Object.values(files).some(Boolean);

    if (!hasFiles) return jsonFields; // ← plain JSON path (no change)

    // ← multipart path
    const fd = new FormData();
    // Send all JSON fields as a single "data" blob so the API can parse them
    fd.append("data", JSON.stringify(jsonFields));
    // Attach each file under its own field name
    Object.entries(files).forEach(([fieldName, file]) => {
      if (file) fd.append(fieldName, file, file.name);
    });
    return fd;
  };

  // const HandleVerificaton = async () => {
  //   let locationData = {};
  //   setApiErrormessage("");

  //   const isEncryptedFlow = data?.isMicro !== "SupperAdmin";
  //   let currentKey = Publickey;

  //   if (isEncryptedFlow && !currentKey) {
  //     setPublickeyLoading(true);
  //     currentKey = await GetPublickey(true); // Attempt to fetch immediately and capture the result
  //     if (!currentKey) {
  //       setApiErrormessage("Encryption keys not loaded. Please ensure you have a stable connection.");
  //       return;
  //     }
  //   }

  //   if (data?.isGeoLocation) {
  //     try {
  //       const position = await new Promise((resolve, reject) => {
  //         navigator.geolocation.getCurrentPosition(resolve, reject, {
  //           enableHighAccuracy: true,
  //           timeout: 10000,
  //           maximumAge: 0,
  //         });
  //       });

  //       locationData = {
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       };
  //     } catch (error) {
  //       let errorMsg = "Location access failed.";
  //       if (error.code === error.PERMISSION_DENIED) {
  //         errorMsg = "Location permission denied. Please allow location access to proceed.";
  //       } else if (error.code === error.POSITION_UNAVAILABLE) {
  //         errorMsg = "Location information is unavailable.";
  //       } else if (error.code === error.TIMEOUT) {
  //         errorMsg = "The request to get user location timed out.";
  //       }
  //       setApiErrormessage(errorMsg);
  //       return;
  //     }
  //   }

  //   const payloadForApi = { ...formData, ...locationData };

  //   if (isEncryptedFlow) {
  //     const encrypted = await encryptPayload(payloadForApi, currentKey);
  //     const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair();
  //     await setPubKey({ publicKey: publicKeyPem, privateKey: privateKeyPem });

  //     setLoading(true);
  //     await EncryptedApirequestHandler(
  //       async () => await ApiVerification(data?.isMicro, data?.apiUrl?.URLS, { ...encrypted, publicKeyPem }, accessToken, data?.apiUrl?.Method || 'Post'),
  //       setLoading,
  //       (res) => {
  //         setApiResponse(res);
  //         setApiErrormessage('');
  //       },
  //       (errorMessage) => {
  //         setApiErrormessage(errorMessage);
  //         setLoading(false);
  //       }
  //     );
  //   } else {
  //     setLoading(true);
  //     await ApirequestHandler(
  //       async () => await ApiVerification(data?.isMicro, data?.apiUrl?.URLS, payloadForApi, accessToken, data?.apiUrl?.Method || 'Post'),
  //       setLoading,
  //       (res) => {
  //         setApiResponse(res);
  //         setApiErrormessage('');
  //       },
  //       (errorMessage) => {
  //         setApiErrormessage(errorMessage);
  //         setLoading(false);
  //       }
  //     );
  //   }
  // };
 
  
  const HandleVerificaton = async () => { // in production use above one 
    let locationData = {};
    setApiErrormessage("");

    const isEncryptedFlow = data?.isMicro !== "SupperAdmin";
    let currentKey = Publickey;

    // if (isEncryptedFlow && !currentKey) {
    //   setPublickeyLoading(true);
    //   currentKey = await GetPublickey(true); // Attempt to fetch immediately and capture the result
    //   if (!currentKey) {
    //     setApiErrormessage("Encryption keys not loaded. Please ensure you have a stable connection.");
    //     return;
    //   }
    // }

    if (data?.isGeoLocation) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        });

        locationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      } catch (error) {
        let errorMsg = "Location access failed.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. Please allow location access to proceed.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMsg = "Location information is unavailable.";
        } else if (error.code === error.TIMEOUT) {
          errorMsg = "The request to get user location timed out.";
        }
        setApiErrormessage(errorMsg);
        return;
      }
    }

    const payload = { ...formData, ...locationData };
    const payloadForApi = buildPayload(payload, fileData);

    if (isEncryptedFlow) {
      // // const encrypted = await encryptPayload(payloadForApi, currentKey);
      // const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair();
      // await setPubKey({ publicKey: publicKeyPem, privateKey: privateKeyPem });

      setLoading(true);
      await ApirequestHandler(
        async () => await ApiVerification(data?.isMicro, data?.apiUrl?.URLS, payloadForApi, accessToken, data?.apiUrl?.Method || 'Post'),
        setLoading,
        (res) => {
          setApiResponse(res);
          setApiErrormessage('');
        },
        (errorMessage) => {
          setApiErrormessage(errorMessage);
          setLoading(false);
        }
      );
    } else {
      setLoading(true);
      await ApirequestHandler(
        async () => await ApiVerification(data?.isMicro, data?.apiUrl?.URLS, payloadForApi, accessToken, data?.apiUrl?.Method || 'Post'),
        setLoading,
        (res) => {
          setApiResponse(res);
          setApiErrormessage('');
        },
        (errorMessage) => {
          setApiErrormessage(errorMessage);
          setLoading(false);
        }
      );
    }
  };

  const [showCopyTip, setShowCopyTip] = useState(false);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyTip(true);
      setTimeout(() => setShowCopyTip(false), 2000);
    } catch (err) {
      console.log("Clipboard blocked, using fallback");
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setShowCopyTip(true);
      setTimeout(() => setShowCopyTip(false), 2000);
    }
  };

  const GetPublickey = async (force = false) => {
    // Only fetch if missing or forced
    if (!force && Publickey && !publickeyError) return Publickey;
    
    return new Promise(async (resolve) => {
      console.log('Get publickey is called here')
      setPublickeyLoading(true);
      setPublickeyError("");
      await ApirequestHandler(
        async () => fetchPublickey(),
        null,
        (res) => {
          const { publicKey } = res;
          console.log('publickey is this :', publicKey);
          setPublickey(publicKey);
          setPublickeyLoading(false);
          setPublickeyError(""); // Clear any previous error
          resolve(publicKey);
        },
        (errMessage) => {
          setPublickeyError("Failed to load encryption keys.");
          setPublickeyLoading(false);
          resolve(null);
        }
      );
    });
  };

  useEffect(() => {
    // Only trigger fetch if needed
    if (!Publickey && !publickeyLoading) {
        GetPublickey();
    }
  }, [data]); // Re-check when service changes

  return (
    <div className="kyc-input-container">
      {showCopyTip && <div className="kyc-copy-tip">✓ Copied to clipboard</div>}
      <Eachpage_header headertitle={"KYC"} />
      <div className="kyc-grid-container">
        {/* LEFT INPUT SECTION */}
        <div className="kyc-card kyc-left-section">
          <div className="kyc-mono-header">{data?.title?.header}</div>
          <p className="kyc-subheader">{data?.title?.headerTitle}</p>

          <div className="kyc-form-container">
            {/* IP Whitelist Warning */}
            {showIpWarning && (
              <div className="kyc-ip-warning">
                <div className="flex items-center gap-2">
                  <ShieldAlert size={18} className="text-orange-500" />
                  <div>
                    <p className="warning-title">IP Not Whitelisted</p>
                    <p className="warning-desc">Your current IP <strong>{currentPublicIp}</strong> is not authorized. Please whitelist it to avoid API errors.</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/dashboard/WhitelistIP')}
                  className="whitelist-now-btn"
                >
                  Whitelist Now
                </button>
              </div>
            )}

            {/* Access Token Input */}
            {
              data?.isToken && (
                <div className="kyc-input-group">
                  <div className="kyc-label">
                    ACCESS TOKEN <span className="kyc-label-sub">HEADER PARAM</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter (secret_token)"
                    value={accessToken}
                    onChange={(e) => setAccessToken(e.target.value)}
                    className="kyc-input-field"
                  />
                </div>
              )
            }

            {data?.inputParams?.map((input, index) => (
              <div key={index} className="kyc-input-group">
                <div className="kyc-label">
                  {input.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
                  <span className="kyc-label-sub">{data?.bodyParams || 'BODY'}</span>
                </div>
                <input
                  type="text"
                  placeholder={!data?.isDisable ? `Enter ${input} ` : ""}
                  name={input}
                  pattern={data?.regexValues?.[index]}
                  value={
                    data?.isDisable
                      ? data?.Inputvalues[index]
                      : formData?.[input] || ""
                  }
                  disabled={data?.isDisable}
                  className={`kyc-input-field ${errors?.[input]
                    ? "error"
                    : (formData?.[input] && !data?.isDisable && formData?.[input]?.trim() !== "")
                      ? "success"
                      : ""
                    }`}
                  onChange={HandleChangeInput}
                />
                {errors?.[input] && (
                  <p className="kyc-error-msg">
                    <svg style={{ width: '12px', height: '12px', marginRight: '4px', verticalAlign: 'middle' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors[input]}
                  </p>
                )}
              </div>
            ))}

            {data?.inputFile?.map((input, index) => (
              <div key={index} className="kyc-input-group">
                <div className="kyc-label">
                  {input.replace(/([A-Z])/g, " $1").toUpperCase()}{" "}
                  <span className="kyc-label-sub">{data?.bodyParams || 'BODY'}</span>
                </div>
                <input
                  type="file"
                  name={input}
                  disabled={data?.isDisable}
                  className={`kyc-input-field ${errors?.[input] ? "error" : fileData?.[input] ? "success" : ""}`}
                  onChange={HandleChangeInput}
                  // ← no value prop: file inputs are uncontrolled
                />
                {fileData?.[input] && (
                  <p className="kyc-success-msg" style={{ fontSize: '11px', color: 'var(--color-text-success)', marginTop: '4px' }}>
                    Selected: {fileData[input].name} ({(fileData[input].size / 1024).toFixed(1)} KB)
                  </p>
                )}
                {errors?.[input] && (
                  <p className="kyc-error-msg">
                    <svg style={{ width: '12px', height: '12px', marginRight: '4px', verticalAlign: 'middle' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors[input]}
                  </p>
                )}
              </div>
            ))}

            

            <button
              className="kyc-submit-button"
              onClick={HandleVerificaton}
              disabled={data?.isDisable || Loading || publickeyLoading}
            >
              {Loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (data?.isMicro !== "SupperAdmin" && publickeyLoading) ? "Initializing Keys..." : (
                <>
                  <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {data?.title?.submitButton} 
                </>
              )}
            </button>
            {apiErrorMessage && (
              <div className="kyc-api-error">
                <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {apiErrorMessage}
              </div>
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
              className={`kyc-method-label ${data?.apiUrl?.Method?.toLowerCase() === "get" ? "get" : "post"}`}
            >
              {data?.apiUrl?.Method}
            </span>
            {/* URL Display */}
            <div className="kyc-custom-select-container">
              <div className="kyc-custom-select-trigger" style={{ cursor: "default" }}>
                <div className="kyc-lottie-icon-wrapper">
                  <Lottie
                    animationData={Images.LIVEAnimation}
                    loop
                    autoplay
                    className="kyc-lottie-small"
                  />
                </div>
                <span className="selected-value">
                  {data?.apiUrl?.LiveUrl}
                </span>
                <button
                  className="kyc-copy-btn-small"
                  onClick={() => handleCopy(data?.apiUrl?.LiveUrl)}
                  title="Copy URL"
                >
                  <img src={Images.copyicon} className="kyc-copy-icon-img" alt="copy" />
                </button>
              </div>
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
              <div className="kyc-curl">
                <div className="kyc-badge-pill">CURL</div>
                <button
                  className="kyc-copy-btn-outline"
                  onClick={() =>
                    handleCopy(data?.exampleCurl || selectedExampleCode)
                  }
                >
                  <img className="copyicon" src={Images.copyicon} alt="copy" />
                  Copy
                </button>
              </div>
            </div>

            <div className="kyc-code-block">
              <SyntaxHighlighter
                language="bash"
                style={theme === 'dark' ? atomOneDark : docco}
                customStyle={{
                  backgroundColor: theme === 'dark' ? "transparent" : "#f9fafb",
                  padding: "1.5rem",
                  fontSize: "0.85rem",
                  margin: 0
                }}
                wrapLongLines={true}
              >
                {data?.exampleCurl || EXResponse.AadhaarNumberCurl}
              </SyntaxHighlighter>
            </div>
          </div>
          <div className="kyc-card">
            <div className="kyc-card-header-row">
              <div className="kyc-mono-header" style={{ fontSize: "1.125rem" }}>
                Example Response
              </div>

              <div className="kyc-curl">
                <div className="kyc-status-group">
                  <button
                    className={`kyc-status-pill ${!apiResponse && selectedExampleCode === data?.exampleResponse ? 'active' : ''}`}
                    onClick={() => {
                      setApiResponse(null);
                      setSelectedExampleCode(data?.exampleResponse || {});
                    }}
                  >
                    200
                  </button>
                  {[400, 403, 404, 429, 500, 503].map((code) => (
                    <button
                      key={code}
                      className={`kyc-status-pill kyc-status-${code} ${selectedExampleCode?.httpCode === code ? 'active' : ''}`}
                      onClick={() => {
                        setApiResponse(null);
                        setSelectedExampleCode(ERROR_RESPONSES[code]);
                      }}
                    >
                      {code}
                    </button>
                  ))}
                </div>

                <button
                  className="kyc-copy-btn-outline"
                  onClick={() =>
                    handleCopy(JSON.stringify(apiResponse || selectedExampleCode, null, 2))
                  }
                >
                  <img className="copyicon" src={Images.copyicon} />
                  Copy
                </button>
              </div>
            </div>
            <div className="kyc-code-block" style={{ border: 'none' }}>
              <SyntaxHighlighter
                language="json"
                style={theme === 'dark' ? atomOneDark : docco}
                customStyle={{
                  backgroundColor: theme === 'dark' ? "transparent" : "#f9fafb",
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  fontSize: "0.85rem",
                  wordBreak: 'break-all',
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}
                wrapLongLines={true}
              >
                {(() => {
                  const displayData = apiResponse || selectedExampleCode;
                  // Detection logic to NOT show raw encrypted data
                  if (displayData?.encryptedKey && !apiResponse?._decrypted) {
                    return JSON.stringify({
                      status: "Response is Encrypted",
                      message: "Data has been received and is being processed...",
                      details: "Decryption is handled in the background."
                    }, null, 2);
                  }
                  return JSON.stringify(displayData, null, 2);
                })()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycReuseComponet;
