import { useEffect, useState } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import {
  HandleCreateLiveKeys,
  HandleCreateTestKeys,
  HandleFetchLiveKeys,
  HandleFetchTestKeys,
} from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./apikeys.css";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import { X, Calendar } from "lucide-react";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";

const ApiKeys = () => {
  const [activeTab, setActiveTab] = useState("Live");
  const [LiveKeys, setLiveKeys] = useState([]);
  const [TestKeys, setTestKeys] = useState([]);
  const [apierrorMessage, setApiErrormessage] = useState("");
  const [loading, setLoading] = useState(false);
  const MerchatID = "MERCHANT39309978";
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [activeMode, setActiveMode] = useState("test");
  const [keyName, setKeyName] = useState("");
  const [ipWhitelist, setIpWhitelist] = useState("");
  const [rateLimit, setRateLimit] = useState("");
  const [permissions, setPermissions] = useState([]);

  const togglePermission = (value) => {
    setPermissions((prev) => {
      if (prev.includes(value)) {
        return prev.filter((p) => p !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const CreateKeys = async () => {
    setApiErrormessage("");
    setLoading(true);
    const ApiURL =
      activeTab === "Live"
        ? HandleCreateLiveKeys({ MerchatID: MerchatID })
        : HandleCreateTestKeys({ MerchatID: MerchatID });
    await ApirequestHandler(
      async () => await ApiURL,
      setLoading,
      (res) => {
        const { response } = res;
        console.log(res);
        activeTab === "Live"
          ? setLiveKeys([...LiveKeys, response])
          : setTestKeys([...TestKeys, response]);
        setApiErrormessage("");
        setLoading(false);
      },
      (errMessage) => {
        console.log("Error:", errMessage);
        setApiErrormessage(errMessage);
        setLoading(false);
      },
    );
  };

  const FetchKeys = async () => {
    setApiErrormessage("");
    setLoading(true);
    const ApiURL =
      activeTab === "Live"
        ? HandleFetchLiveKeys({ MerchatID: MerchatID })
        : HandleFetchTestKeys({ MerchatID: MerchatID });
    await ApirequestHandler(
      async () => ApiURL,
      setLoading,
      (res) => {
        const { response } = res;
        console.log(res);
        activeTab === "Live" ? setLiveKeys(response) : setTestKeys(response);
        setApiErrormessage("");
        setLoading(false);
      },
      (errMessage) => {
        console.log("Error:", errMessage);
        setApiErrormessage(errMessage);
        setLoading(false);
      },
    );
  };
  useEffect(() => {
    FetchKeys();
  }, [activeTab]);

  const handleGenerateKey = async () => {
    if (!keyName || !rateLimit) {
      setApiErrormessage("Key name and rate limit are required");
      return;
    }

    setLoading(true);

    const payload = {
      MerchantId: MerchatID,
      key_name: keyName,
      ip_whitelist: ipWhitelist.split(",").map((ip) => ip.trim()),
      rate_limit: Number(rateLimit),
      permissions,
    };

    const ApiURL =
      activeMode === "live"
        ? HandleCreateLiveKeys(payload)
        : HandleCreateTestKeys(payload);

    await ApirequestHandler(
      async () => ApiURL,
      setLoading,
      (res) => {
        const { response } = res;

        activeMode === "live"
          ? setLiveKeys((prev) => [...prev, response])
          : setTestKeys((prev) => [...prev, response]);

        // reset + close
        setKeyName("");
        setIpWhitelist("");
        setRateLimit("");
        setPermissions([]);
        setShowRequestModal(false);
        setLoading(false);
      },
      (err) => {
        setApiErrormessage(err);
        setLoading(false);
      },
    );
  };

  return (
    <div className="api-keys-container">
      <Eachpage_header headertitle={"API Keys"} />

      {/* Tabs */}
      <div className="tabs-wrapper">
        <button
          className={`tab-btn ${activeTab === "Live" ? "active" : ""}`}
          onClick={() => setActiveTab("Live")}
        >
          Live API Keys
        </button>

        <button
          className={`tab-btn-two ${activeTab === "Test" ? "active" : ""}`}
          onClick={() => setActiveTab("Test")}
        >
          Test API Keys
        </button>
      </div>

      {/* Add Key Box */}
      <div className="add-key-box">
        {loading ? (
          <Loader />
        ) : (
          <button
            className="add-key-btn"
            onClick={() => setShowRequestModal(true)}
          >
            Add {activeTab} New
          </button>
        )}
        <p className="note-text">
          Note: You can add a maximum of 3 IPs, 3 left.
        </p>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead className="thead-header">
            <tr>
              <th className="th-api">SI.No</th>
              <th className="th-api">MerchantId</th>
              <th className="th-api">ClientId</th>
              <th className="th-api">SecretKey</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === "Live" ? LiveKeys : TestKeys)?.length === 0 ? (
              <tr>
                <td colSpan="4" className="empty-table-text">
                  No {activeTab} API Keys found
                </td>
              </tr>
            ) : (
              (activeTab === "Live" ? LiveKeys : TestKeys).map((keys, ind) => (
                <tr key={ind}>
                  <td className="td-one">{ind + 1}</td>
                  <td className="td-one">{keys?.MerchantId}</td>
                  <td className="td-one">{keys?.client_id}</td>
                  <td className="td-one">{keys?.secret_key}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showRequestModal && (
        <div className="request-overlay">
          <div className="request-modal">
            {/* Header */}
            <div className="requested-header">
              <h3>Request logs</h3>
              <button
                className="requested-close"
                onClick={() => setShowRequestModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Mode Toggle */}
            <div className="request-mode-toggle">
              <button
                className={`request-mode-btn ${activeMode === "test" ? "active" : ""}`}
                onClick={() => setActiveMode("test")}
              >
                <span className="request-mode-icon">
                  <LuTestTube size={16} />
                </span>
                Test
              </button>

              <button
                className={`request-mode-btn ${activeMode === "live" ? "active" : ""}`}
                onClick={() => setActiveMode("live")}
              >
                <span className="request-mode-icon">
                  <BsLightningCharge size={16} />
                </span>
                Live
              </button>
            </div>

            {/* ================= Date Fields ================= */}
            <div className="request-form">
              {/* Key Name */}
              <div className="request-field">
                <p className="request-label">Key Name</p>
                <div className="request-date-input-wrapper">
                  <input
                    type="text"
                    className="request-date-input"
                    placeholder="e.g. Payments Service Key"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                  />
                </div>
              </div>

              {/* IP Whitelist */}
              <div className="request-field">
                <p className="request-label">IP Whitelist</p>
                <div className="request-date-input-wrapper">
                  <input
                    type="text"
                    className="request-date-input"
                    placeholder="e.g. 192.168.1.1, 10.0.0.1"
                    value={ipWhitelist}
                    onChange={(e) => setIpWhitelist(e.target.value)}
                  />
                </div>
              </div>

              {/* Rate Limit */}
              <div className="request-field">
                <p className="request-label">
                  Rate Limit (requests/minute) <IoIosInformationCircleOutline />
                </p>
                <div className="request-date-input-wrapper">
                  <input
                    type="text"
                    className="request-date-input"
                    placeholder="e.g., 1000"
                    value={rateLimit}
                    onChange={(e) => setRateLimit(e.target.value)}
                  />
                </div>
              </div>

              {/* Permissions */}
              <div className="request-field">
                <p className="request-label">Permissions</p>
                <div className="permission-group">
                  {["read", "write", "delete"].map((p) => (
                    <div key={p} className="permission-card">
                      <input
                        type="checkbox"
                        name="permission"
                        value={p}
                        checked={permissions.includes(p)}
                        onChange={() => togglePermission(p)}
                      />
                      <span className="custom-radio"></span>
                      <span className="key-radio">
                        {p.charAt(0).toUpperCase() + p.slice(1)} Access
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="request-footer-api">
              <button
                className="request-cancel-btn"
                onClick={() => setShowRequestModal(false)}
              >
                Cancel
              </button>

              <button
                className="request-submit-btn"
                onClick={handleGenerateKey}
              >
                Generate API Key
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeys;