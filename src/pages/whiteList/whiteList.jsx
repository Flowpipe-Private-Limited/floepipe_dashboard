import { useEffect, useState } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleCreateIP, HandleDeleteIP } from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./whiteList.css";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import { useUserkey } from "../../Store/userKeyStore";
import Cookies from 'js-cookie';
import { Trash2, Globe, Plus } from "lucide-react";
import { toast } from "react-toastify";

const WhiteListIP = () => {
  const clientId = Cookies.get('clientId');
  
  const { 
    whitelistIps, 
    fetchWhitelistIPs, 
    addWhitelistIP, 
    deleteWhitelistIP, 
    currentPublicIp, 
    detectCurrentIp 
  } = useUserkey();

  const [ipAddress, setIpAddress] = useState("");
  const [comments, setComments] = useState("");
  const [apierrorMessage, setApiErrormessage] = useState("");
  const [loading, setLoading] = useState(false);

  const ipRegex =/^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

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
      setApiErrormessage("Maximum limit of 3 IPs reached. Please delete an existing IP to add a new one.");
      return;
    }

    setApiErrormessage("");
    setLoading(true);
    const detailsTosend = {
      clientId: clientId,
      ip: targetIp,
      comment: comments || (customIp ? "Added via Detection" : ""),
    };

    await ApirequestHandler(
      async () => await HandleCreateIP(detailsTosend),
      setLoading,
      (res) => {
        addWhitelistIP({ ...detailsTosend, _id: res?.data?._id || Date.now().toString() });
        setIpAddress("");
        setComments("");
        setLoading(false);
        toast.success("IP Whitelisted Successfully");
      },
      (errMessage) => {
        setApiErrormessage(errMessage);
        setLoading(false);
      },
    );
  };

  const RemoveIP = async (ip) => {
    if (!window.confirm(`Are you sure you want to remove IP: ${ip}?`)) return;

    setLoading(true);
    await ApirequestHandler(
      async () => await HandleDeleteIP({ clientId, ip }),
      setLoading,
      () => {
        deleteWhitelistIP(ip);
        toast.success("IP Removed Successfully");
        setLoading(false);
      },
      (err) => {
        setApiErrormessage(err);
        setLoading(false);
      }
    );
  };

  const isCurrentIpWhitelisted = whitelistIps.some(item => item.ip === currentPublicIp);

  return (
    <div className="whitelist-container-main">
      <Eachpage_header headertitle={"Whitelist IPs"} />
      
      {/* IP Detection Banner */}
      {currentPublicIp && (
        <div className={`ip-detection-banner ${isCurrentIpWhitelisted ? 'whitelisted' : 'not-whitelisted'}`}>
          <div className="flex items-center gap-2">
            <Globe size={18} />
            <span>Your current public IP: <strong>{currentPublicIp}</strong></span>
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
            <button onClick={() => CreateIP()} className="add-ip-btn" disabled={whitelistIps.length >= 3}>
              Add IP
            </button>
          )}
        </div>

        <p className="note-text">Note: You can add a maximum of 3 IPs. ({whitelistIps.length}/3 used)</p>

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
                      {ip?.ip}
                      {ip?.ip === currentPublicIp && <span className="current-tag">Current</span>}
                    </div>
                  </td>
                  <td>
                    {ip?.comment || "NA"}
                  </td>
                  <td>
                    <button 
                      onClick={() => RemoveIP(ip.ip)} 
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
