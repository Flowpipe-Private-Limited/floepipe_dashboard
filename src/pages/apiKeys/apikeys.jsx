import { useEffect, useState } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import {
  HandleCreateLiveKeys,
  HandleCreateTestKeys,
  HandleFetchLiveKeys,
  HandleFetchTestKeys
} from "../../utils/Apis/api";
import Loader from "../../components/common/Loader";
import "./apikeys.css";

const ApiKeys = () => {
    const [activeTab, setActiveTab] = useState("Live");
    const [LiveKeys, setLiveKeys] = useState([]);
    const [TestKeys, setTestKeys] = useState([]);
    const [apierrorMessage, setApiErrormessage] = useState('');
    const [loading, setLoading] = useState(false)
    const MerchatID = 'MERCHANT39309978';


    const CreateKeys = async () => {
        setApiErrormessage('');
        setLoading(true)
        const ApiURL = activeTab === 'Live' ?
            HandleCreateLiveKeys({ MerchatID: MerchatID })
            : HandleCreateTestKeys({ MerchatID: MerchatID })
        await ApirequestHandler(
            async () => await ApiURL,
            setLoading,
            (res) => {
                const { response } = res;
                console.log(res)
                activeTab === 'Live' ? setLiveKeys([...LiveKeys, response]) : setTestKeys([...TestKeys, response])
                setApiErrormessage('');
                setLoading(false)
            },
            (errMessage) => {
                console.log('Error:', errMessage);
                setApiErrormessage(errMessage);
                setLoading(false)
            }
        )
    }

    const FetchKeys = async () => {
        setApiErrormessage('');
        setLoading(true)
        const ApiURL = activeTab === 'Live' ?
            HandleFetchLiveKeys({ MerchatID: MerchatID })
            : HandleFetchTestKeys({ MerchatID: MerchatID })
        await ApirequestHandler(
            async () => ApiURL,
            setLoading,
            (res) => {
                const { response } = res;
                console.log(res);
                activeTab === 'Live' ? setLiveKeys(response) : setTestKeys(response)
                setApiErrormessage('');
                setLoading(false)
            },
            (errMessage) => {
                console.log("Error:", errMessage);
                setApiErrormessage(errMessage);
                setLoading(false)
            }
        )
    }
    useEffect(() => {
        FetchKeys()
    }, [activeTab])

  return (
    <div className="api-keys-container">
      {/* Header */}
      <div className="page-header-card">
        <h2 className="page-title">API Keys</h2>
      </div>

      {/* Tabs */}
      <div className="tabs-wrapper">
        <button
          className={`tab-btn ${activeTab === "Live" ? "active" : ""}`}
          onClick={() => setActiveTab("Live")}
        >
          Live API Keys
        </button>

        <button
          className={`tab-btn ${activeTab === "Test" ? "active" : ""}`}
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
          <button className="add-key-btn" onClick={CreateKeys}>
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
              <th className="th-api">Si.no</th>
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
    </div>
  );
};

export default ApiKeys;
