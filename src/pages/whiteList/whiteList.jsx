import { useEffect, useState } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { HandleCreateIP, HandleFetchIP } from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./whiteList.css";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";

const WhiteListIP = () => {
  const [whitelistIPs, setWhitelistIPs] = useState([]);
  const [ipAddress, setIpAddress] = useState("");
  const [comments, setComments] = useState("");
  const [apierrorMessage, setApiErrormessage] = useState("");
  const [loading, setLoading] = useState(false);

  const MerchatID = "MERCHANT39309978";

  const ipRegex =
    /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/;

  const CreateIP = async () => {
    if (!ipRegex.test(ipAddress)) {
      setApiErrormessage("Please enter a valid IP address");
      return;
    }

    setApiErrormessage("");
    setLoading(true);
    const detailsTosend = {
      MerchatID: MerchatID,
      ip_address: ipAddress,
      comments: comments,
    };
    console.log("data to send ", detailsTosend);
    await ApirequestHandler(
      async () => await HandleCreateIP(detailsTosend),
      setLoading,
      (res) => {
        const { WhiteListData } = res;
        console.log(res);
        setWhitelistIPs(WhiteListData);
        setIpAddress("");
        setComments("");
        setLoading(false);
      },
      (errMessage) => {
        console.log("Error:", errMessage);
        setApiErrormessage(errMessage);
        setLoading(false);
      },
    );
  };

  const FetchIPs = async () => {
    setApiErrormessage("");
    setLoading(true);

    await ApirequestHandler(
      async () => HandleFetchIP({ MerchatID: MerchatID }),
      setLoading,
      (res) => {
        const { whitelistIP } = res;
        console.log(res);
        setWhitelistIPs(whitelistIP || []);
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
    FetchIPs();
  }, []);

  return (
    <div className="whitelist-container-main">
      <Eachpage_header headertitle={"Whitelist IPs"} />
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
            <button onClick={CreateIP} className="add-ip-btn">
              Add IP
            </button>
          )}
        </div>

        <p className="note-text">Note: You can add a maximum of 3 IPs.</p>

        {apierrorMessage && <p className="error-text">{apierrorMessage}</p>}
      </div>

      {/* Table */}
      <div className="whitelist-table-container">
        <table className="whitelist-table">
          <thead>
            <tr>
              <th>SI.NO</th>
              <th>IP Address</th>
              <th>ActiveStatus</th>
            </tr>
          </thead>

          <tbody>
            {whitelistIPs && whitelistIPs.length > 0 ? (
              whitelistIPs.map((ip, ind) => (
                <tr key={ind} className="border-t">
                  <td>{ind + 1}</td>
                  <td>{ip?.ipAddress}</td>
                  <td>
                    <button
                      className={`status-btn ${ip?.Active ? "active" : "inactive"}`}
                    >
                      {ip?.Active ? "Active" : "DeActive"}
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
