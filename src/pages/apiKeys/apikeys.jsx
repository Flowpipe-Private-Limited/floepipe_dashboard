import { useEffect, useState } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import {
  HandleCreateKeys,
} from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./apikeys.css";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import { X, Calendar, Trash2, Download, Copy } from "lucide-react";
import { useUserStore } from "../../Store/userStore";
import { useUserkey } from "../../Store/userKeyStore";
import { toast } from 'react-toastify';
import FlowpipeUnlockModal from "../../components/profile/PinVerify/IpinVerify";
import WarningModal from "../../components/common/WarningModal";

const ApiKeys = () => {
  const [activeTab, setActiveTab] = useState("LIVE");
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);

  const TestSecretKey = useUserkey((state) => state.TestSecretKey);
  const TestClientId = useUserkey((state) => state.TestClientId);
  const TestAccessToken = useUserkey((state) => state.TestAccessToken);
  const LiveSecretKey = useUserkey((state) => state.LiveSecretKey);
  const LiveClientId = useUserkey((state) => state.LiveClientId);
  const LiveAccessToken = useUserkey((state) => state.LiveAccessToken);
  const fetchUserskeys = useUserkey((state) => state.fetchUserskeys);
  const updateLiveKeys = useUserkey((state) => state.updateLiveKeys);
  const updateTestKeys = useUserkey((state) => state.updateTestKeys);

  const [apierrorMessage, setApiErrormessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showIpinModal, setShowIpinModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    fetchUserskeys();
  }, []);

  // Action Executors
  const executeDownload = (key, clientId, accessToken) => {
    const fileContent = `ClientId: ${clientId}\nSecretKey: ${key}\nAccessToken: ${accessToken}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${activeTab}_SecretKey.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executeDelete = (keyId) => {
    console.log("Delete key:", keyId);
    // Placeholder for delete functionality
    if (confirm("Are you sure you want to delete this key?")) {
      // Call API to delete key here
      toast.info("Delete functionality coming soon!");
    }
  };

  const executeGenerateKey = async () => {
    setLoading(true);
    let userData = users;
    if (!userData?.clientId || !userData?.email) {
      await fetchUsers();
      userData = useUserStore.getState().users;
    }

    const payload = {
      clientId: userData?.clientId,
      environment: activeTab,
    };

    console.log('ApiURL', activeTab, payload)

    await ApirequestHandler(
      async () => HandleCreateKeys(payload),
      setLoading,
      (res) => {
        const { data } = res;
        console.log(data);
        if (activeTab === "LIVE") {
          updateLiveKeys(data);
        } else {
          updateTestKeys(data);
        }
        setLoading(false);
        toast.success(`${activeTab} Key Generated Successfully`);
      },
      (err) => {
        setApiErrormessage(err);
        setLoading(false);
      },
    );
  };

  // iPIN Flow Handlers
  const handleIpinSuccess = () => {
    setShowIpinModal(false);
    if (!pendingAction) return;

    const { type, args } = pendingAction;

    switch (type) {
      case 'GENERATE':
        executeGenerateKey();
        break;
      case 'DOWNLOAD':
        executeDownload(...args);
        break;
      case 'DELETE':
        executeDelete(...args);
        break;
      default:
        break;
    }
    setPendingAction(null);
  };

  const initiateGenerate = () => {
    // Check if keys already exist to show warning
    const keysExist = activeTab === "LIVE" ? !!LiveClientId : !!TestClientId;

    if (keysExist) {
      setShowWarningModal(true);
    } else {
      setPendingAction({ type: 'GENERATE', args: [] });
      setShowIpinModal(true);
    }
  };

  const confirmRegenerate = () => {
    setShowWarningModal(false);
    setPendingAction({ type: 'GENERATE', args: [] });
    setShowIpinModal(true);
  };

  const initiateDownload = (key, clientId, accessToken) => {
    setPendingAction({ type: 'DOWNLOAD', args: [key, clientId, accessToken] });
    setShowIpinModal(true);
  };

  const initiateDelete = (keyId) => {
    setPendingAction({ type: 'DELETE', args: [keyId] });
    setShowIpinModal(true);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  }

  return (
    <div className="api-keys-container">
      <Eachpage_header headertitle={"API Keys"} />

      {/* Tabs */}
      <div className="tabs-wrapper">
        <button
          className={`tab-btn ${activeTab === "LIVE" ? "active" : ""}`}
          onClick={() => setActiveTab("LIVE")}
        >
          Live API Keys
        </button>

        <button
          className={`tab-btn-two ${activeTab === "TEST" ? "active" : ""}`}
          onClick={() => setActiveTab("TEST")}
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
            onClick={initiateGenerate}
          >
            Add {activeTab} New
          </button>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table>
          <thead className="thead-header">
            <tr>
              <th className="th-api">SI.No</th>
              <th className="th-api">ClientId</th>
              <th className="th-api">SecretKey</th>
              <th className="th-api">Action</th>
            </tr>
          </thead>
          <tbody >
            {activeTab === "LIVE" ? (
              LiveClientId ? (
                <tr>
                  <td className="td-one empty-table-text">1</td>
                  <td className="td-one empty-table-text">{LiveClientId}</td>
                  <td className="td-one empty-table-text">
                    {LiveSecretKey?.substring(0, 10)}*********************
                  </td>
                  <td className="td-one empty-table-text">
                    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                      <Download
                        size={16}
                        className="action-icon"
                        style={{ cursor: "pointer", color: "#4caf50" }}
                        onClick={() => initiateDownload(LiveSecretKey, LiveClientId, LiveAccessToken)}
                      />
                      <Trash2
                        size={16}
                        className="action-icon"
                        style={{ cursor: "pointer", color: "#ff4d4d" }}
                        onClick={() => initiateDelete(LiveSecretKey)}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="empty-message">
                    No Live Keys Generated
                  </td>
                </tr>
              )
            ) : TestClientId ? (
              <tr>
                <td className="td-one empty-table-text">1</td>
                <td className="td-one empty-table-text">{TestClientId}</td>
                <td className="td-one empty-table-text">
                  {TestSecretKey?.substring(0, 10)}********************
                </td>
                <td className="td-one empty-table-text">
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <Download
                      size={16}
                      className="action-icon"
                      style={{ cursor: "pointer", color: "#4caf50" }}
                      onClick={() => initiateDownload(TestSecretKey, TestClientId, TestAccessToken)}
                    />
                    <Trash2
                      size={16}
                      className="action-icon"
                      style={{ cursor: "pointer", color: "#ff4d4d" }}
                      onClick={() => initiateDelete(TestSecretKey)}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="4" className="empty-message">
                  No Test Keys Generated
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Removed as requested */}
      <FlowpipeUnlockModal
        isVisible={showIpinModal}
        onClose={() => {
          setShowIpinModal(false);
          setPendingAction(null);
        }}
        IsValidPIN={handleIpinSuccess}
      />

      <WarningModal
        show={showWarningModal}
        onClose={() => {
          setShowWarningModal(false);
          setPendingAction(null);
        }}
        onConfirm={confirmRegenerate}
      />
    </div>
  );
};

export default ApiKeys;