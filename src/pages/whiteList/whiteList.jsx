import { useEffect, useState } from "react";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../../utils/Apis/apiRequestHandler";
import { HandleCreateIP, HandleDeleteIP } from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./whiteList.css";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import { useUserkey } from "../../Store/userKeyStore";
import Cookies from "js-cookie";
import { Trash2, Globe, Plus } from "lucide-react";
import { toast } from "react-toastify";
import { encryptPayload } from "../../utils/helper";
import { GeneralKeys } from "../../Store/PubliPriviteKey";

const WhiteListIP = () => {
  const clientId = Cookies.get("clientId");

  const {
    whitelistIps,
    addWhitelistIP,
    deleteWhitelistIP,
    currentPublicIp,
    detectCurrentIp,
  } = useUserkey();
  const fetchWhitelistIPs = useUserkey((state) => state.fetchWhitelistIPs);
  const TestSecretKey = useUserkey((state) => state.TestSecretKey);
  const TestClientId = useUserkey((state) => state.TestClientId);
  const TestAccessToken = useUserkey((state) => state.TestAccessToken);
  const LiveSecretKey = useUserkey((state) => state.LiveSecretKey);
  const LiveClientId = useUserkey((state) => state.LiveClientId);
  const LiveAccessToken = useUserkey((state) => state.LiveAccessToken);
  const PublicKey = GeneralKeys((state) => state.PublicKey);
  const publicKey = GeneralKeys((state) => state.publicKey);
  const privateKey = GeneralKeys((state) => state.privateKey);

  const [ipAddress, setIpAddress] = useState("");
  const [comments, setComments] = useState("");
  const [apierrorMessage, setApiErrormessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

  console.log("whitelistIps ===>>>", whitelistIps);

  useEffect(() => {
    detectCurrentIp();
  }, []);

  const CreateIP = async (customIp) => {
    const targetIp = customIp || ipAddress;

    if (!ipRegex.test(targetIp)) {
      setApiErrormessage("Please enter a valid IP address");
      return;
    }

    if (whitelistIps.length >= 3) {
      setApiErrormessage(
        "Maximum limit of 3 IPs reached. Please delete an existing IP to add a new one.",
      );
      return;
    }

    setApiErrormessage("");
    setLoading(true);
    const detailsTosend = {
      client: clientId,
      ip: targetIp,
      comment: comments || (customIp ? "Added via Detection" : ""),
    };
    const accesstoken = LiveAccessToken || TestAccessToken;
    const encryptedPayload = await encryptPayload(detailsTosend, PublicKey);
    await EncryptedApirequestHandler(
      async () =>
        await HandleCreateIP(encryptedPayload, accesstoken, publicKey),
      setLoading,
      (res) => {
        console.log("res in adding ip ====>>>", res);
        addWhitelistIP({
          ...detailsTosend,
          _id: res?.data?._id || Date.now().toString(),
        });
        setIpAddress("");
        setComments("");
        fetchWhitelistIPs();
        setLoading(false);
      },
      (errMessage) => {
        console.log("errMessage adding ip====>>", errMessage);
        setApiErrormessage(errMessage);
        setLoading(false);
      },
    );
  };

  const RemoveIP = async (ip) => {
    if (
      !window.confirm(`Are you sure you want to remove IP: ${ip?.ipAddress}?`)
    )
      return;

    setLoading(true);
    await ApirequestHandler(
      async () => await HandleDeleteIP(ip?._id, clientId),
      setLoading,
      () => {
        deleteWhitelistIP(ip);
        setLoading(false);
        fetchWhitelistIPs();
      },
      (err) => {
        setApiErrormessage(err);
        setLoading(false);
      },
    );
  };

  const isCurrentIpWhitelisted = whitelistIps.some(
    (item) => item.ip === currentPublicIp,
  );

  return (
    <div className="whitelist-container-main">
      <Eachpage_header
        heading={"Whitelist IPs"}
        subtitle={"Manage your whitelisted IPs"}
      />

      {/* IP Detection Banner */}
      {currentPublicIp && (
        <div
          className={`ip-detection-banner ${isCurrentIpWhitelisted ? "whitelisted" : "not-whitelisted"}`}
        >
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <span>
              Your current public IP: <strong>{currentPublicIp}</strong>
            </span>
          </div>
          {isCurrentIpWhitelisted ? (
            <span className="status-badge">Whitelisted</span>
          ) : (
            <button
              onClick={() => CreateIP(currentPublicIp)}
              className="add-detected-btn"
              disabled={loading || whitelistIps.length >= 3}
            >
              <Plus size={14} /> Add to Whitelist
            </button>
          )}
        </div>
      )}

      <div className="add-ip-section">
        <div className="input-grid">
          <input
            type="text"
            placeholder="Enter IP Address"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            className="ip-input"
          />

          <input
            type="text"
            placeholder="Comments (optional)"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="ip-input"
          />

          {loading ? (
            <Loader />
          ) : (
            <button
              onClick={() => CreateIP()}
              className="add-ip-btn"
              disabled={whitelistIps.length >= 3}
            >
              Add IP
            </button>
          )}
        </div>

        <p className="note-text">
          Note: You can add a maximum of 3 IPs. ({whitelistIps.length}/3 used)
        </p>

        {apierrorMessage && <p className="error-text">{apierrorMessage}</p>}
      </div>

      {/* Table */}
      <div className="whitelist-table-container">
        <table className="whitelist-table">
          <thead>
            <tr>
              <th>SI.NO</th>
              <th>IP ADDRESS</th>
              <th>COMMENT</th>
              <th>ACTION</th>
            </tr>
          </thead>

          <tbody>
            {whitelistIps && whitelistIps.length > 0 ? (
              whitelistIps.map((ip, ind) => (
                <tr key={ind} className="border-t">
                  <td>{ind + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {ip?.ipAddress}
                      {ip?.ipAddress === currentPublicIp && (
                        <span className="current-tag">Current</span>
                      )}
                    </div>
                  </td>
                  <td>{ip?.Comment || "NA"}</td>
                  <td>
                    <button
                      onClick={() => RemoveIP(ip)}
                      className="delete-ip-btn"
                      title="Remove IP"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="empty-message">
                  No Whitelisted IPs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WhiteListIP;
