import { FiBell, FiHelpCircle, FiPlusCircle, FiCode } from "react-icons/fi";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./mainContent.css";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import Images from "../../Images/Images";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiRupee } from "react-icons/bi";
import { FiAlertTriangle, FiCreditCard } from "react-icons/fi";
import { LuKey } from "react-icons/lu";
import { LuCodeXml } from "react-icons/lu";
import WalletToPop from "../WalletToPop/WalletToPop";
import { useUserkey } from "../../Store/userKeyStore";
import { GeneralKeys } from "../../Store/PubliPriviteKey";
import { encryptPayload } from "../../utils/helper";
import Cookies from "js-cookie";
import {
  fetchPublickey,
  getProductsData,
  getRecentCallData,
  getTransactionsData,
} from "../../utils/Apis/api";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { analytics } from "../../Store/analyticsStore";
import { useUserStore } from "../../Store/userStore";

const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  if (!payload || !payload.value) return null;
  const parts = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y + 12})`}>
      <text x={0} y={0} dy={0} textAnchor="middle" fill="#9ca3af" fontSize={12}>
        <tspan x={0} dy={0}>
          {parts[0]}
        </tspan>
        <tspan x={0} dy={15}>
          {parts[1]}
        </tspan>
      </text>
    </g>
  );
};

const MainContent = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("5");
  const [selectedProduct, setSelectedProduct] = useState("PAN");
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isProduction, setIsProduction] = useState(false);
  const [transactionData, setTransactionData] = useState({});
  const [slider, setSlider] = useState("");
  // const [recentCallData, setRecentCallData] = useState([]);
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();
  const whitelistIps = useUserkey((state) => state.whitelistIps);
  const TestAccessToken = useUserkey((state) => state.TestAccessToken);
  const LiveAccessToken = useUserkey((state) => state.LiveAccessToken);
  const fetchRecentCallData = analytics((state) => state.fetchRecentCallData);
  const fetchUserApiCount = analytics((state) => state.fetchUserApiCount);
  const userApiCount = analytics((state) => state.userApiCount);
  const fetchServiceNameData = analytics((state) => state.fetchServiceNameData);
  const getPublicKey = GeneralKeys((state) => state.getPublicKey);
  const PublicKey = GeneralKeys((state) => state.PublicKey);
  const publicKey = GeneralKeys((state) => state.publicKey);
  const privateKey = GeneralKeys((state) => state.privateKey);
  const users = useUserStore((state) => state.users);
  const recentCallData = analytics((state) => state.recentCallData);
  const serviceNameData = analytics((state) => state.serviceNameData);
  const getApicallAmountData = analytics((state) => state.getApicallAmountData);
  const apiCallResponse = analytics((state) => state.apiCallResponse);
  const clientId = Cookies.get("clientId");

  console.log("walletBalance and recentCallData =====>>", apiCallResponse);

  useEffect(() => {
    getUserApiCount();
  }, [LiveAccessToken, TestAccessToken, PublicKey]);

  const getUserApiCount = async () => {
    try {
      const accesstoken = LiveAccessToken || TestAccessToken;

      if (accesstoken && publicKey && PublicKey) {
        console.log("Token available, calling API", publicKey);
        const data = {
          clientId: Cookies.get("clientId"),
        };
        const encryptedPayload = await encryptPayload(data, PublicKey);
        console.log("encryptedPayload ===>>", encryptedPayload);
        fetchUserApiCount(accesstoken, encryptedPayload, publicKey);
      }
    } catch (error) {
      console.log("error ====>", error);
    }
  };

  // const getPublickey = async () => {
  //   await ApirequestHandler(
  //     async () => fetchPublickey(),
  //     null,
  //     (res) => {
  //       const { publicKey } = res;
  //       console.log("publickey is this :", publicKey);
  //       setPublickey(publicKey);
  //     },
  //     (errMessage) => {
  //       console.log("error ===>>", errMessage);
  //     },
  //   );
  // };

  useEffect(() => {
    fetchProductsData();
    fetchTransactionData();
    getPublicKey();
    fetchServiceNameData();
  }, []);

  useEffect(() => {
    const clientId = Cookies.get("clientId");
    fetchRecentCallData(clientId);
  }, []);
  useEffect(() => {
    const clientId = Cookies.get("clientId");
    getApicallAmountData(clientId, selectedProduct, selectedDuration);
  }, [selectedDuration, selectedProduct]);

  // const fetchRecentCallData = async () => {
  //   const clientId = Cookies.get("clientId");
  //   try {
  //     await ApirequestHandler(
  //       () => getRecentCallData(clientId),
  //       null,
  //       (res) => {
  //         console.log("res of recent calls in dashboard ======>>>>", res);
  //         if (res.success) {
  //           const result = res?.data;
  //           const formattedData = result?.filter((item) => {
  //             return item?.type == "DEBIT";
  //           });
  //           const slicedData = formattedData?.slice(0, 10);
  //           setRecentCallData(slicedData);
  //         } else {
  //           setRecentCallData([]);
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       },
  //     );
  //   } catch (error) {
  //     console.log("error while getting transaction data ===>>", error);
  //   }
  // };

  const fetchProductsData = async () => {
    const payload = {
      clientId: Cookies.get("clientId"),
    };
    try {
      await ApirequestHandler(
        () => getProductsData(payload),
        null,
        (res) => {
          console.log("res of products in dashboard ======>>>>", res);
          if (res.success) {
            setProductData(res?.data);
          } else {
            setProductData({});
          }
        },
        (err) => {
          console.log(err);
        },
      );
    } catch (error) {
      console.log("error while getting transaction data ===>>", error);
    }
  };

  const fetchTransactionData = async () => {
    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formatted = `${year}-${month}`;

    console.log("formatted ====>>", formatted);
    const payload = {
      clientId: Cookies.get("clientId"),
      month: formatted,
    };
    try {
      await ApirequestHandler(
        () => getTransactionsData(payload),
        null,
        (res) => {
          console.log("res in dashboard ======>>>>", res);
          if (res.success) {
            setTransactionData(res?.data);
          } else {
            setTransactionData({});
          }
        },
        (err) => {
          console.log(err);
        },
      );
    } catch (error) {
      console.log("error while getting transaction data ===>>", error);
    }
  };

  const NavigateToBalance = () => {
    navigate("/dashboard/Billing_Plans");
  };

  const NavigateToProducts = () => {
    navigate("/dashboard/Products");
  };

  const NavigateToViewRequests = () => {
    navigate("/dashboard/Products", {
      state: { defaultFilter: "Pendding Approvals" },
    });
  };

  const quickActions = [
    {
      title: "View API Keys",
      subtext: "Manage your API credentials",
      icon: Images.Apikey,
      href: "/dashboard/apiKeys",
    },
    {
      title: "Integration Guide",
      subtext: "Step-by-step documentation",
      icon: Images.Integrationguide,
    },
    {
      title: "View Analytics",
      subtext: "Step-by-step documentation",
      icon: Images.viewanalytics,
      href: "/dashboard/viewAnalytics",
    },
    {
      title: "API Logs",
      subtext: "Request & response logs",
      icon: Images.startfree,
      href: "/dashboard/Trial_Center",
    },
  ];

  const quickActionssecond = [
    {
      type: "stat",
      title: "Total API Calls",
      value: "0",
      icon: Images.graphicon,
      extra: "sparkline",
    },
    {
      type: "stat",
      title: "Active APIs",
      value: "0",
      icon: Images.graphicon,
      extra: "badge",
    },
    {
      type: "action",
      title: "Total Transactions",
      value: "0",
      icon: Images.graphicon,
      extra: "button",
    },
    {
      type: "stat",
      title: "Whitelist IPs",
      value: "54",
      icon: Images.graphicon,
      extra: "simple",
    },
  ];

  const appsRunning = [
    { name: "Test App", keys: 3, products: 3 },
    { name: "Live App", keys: 3, products: 3 },
  ];

  const navigationGuide = (item) => {
    if (item?.title?.toLowerCase() == "integration guide") {
      // window.location.href = "http://localhost:5173/"
      window.open("http://localhost:5173/", "_blank");
    } else {
      navigate(item?.href);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="Dashboard-name-content">
        <div className="stat-card-decor-name">
          <img className="flowblue" src={Images.fldesign} />
        </div>
        <p className="welcome-text">Welcome, {users?.fullName}</p>
        <p className="name-subtitle">
          Your API dashboard is ready. Let's get started with your first API
          integration.
        </p>
      </div>

      <div className="dashboard-top">
        <div className="dash-secone">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="star-card-boxes-maincon">
                <p className="stat-title">Today Transactions</p>
                <h3 className="stat-value">
                  {transactionData?.totalCount || 0}
                </h3>
                <span className="stat-sub">
                  This Month
                  <span style={{ color: "var(--black)", fontWeight: 600 }}>
                    vs
                  </span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>
                    0.00%
                  </span>
                </span>
              </div>
              <div className="stat-card-decor-overview">
                <img className="flowblue" src={Images.fldesign} />
              </div>
            </div>


            <div className="stat-card">
              <div className="star-card-boxes-maincon">
                <p className="stat-title">Transaction Volume</p>
                <h3 className="stat-value">{`₹ ${transactionData?.totalAmount || 0}`}</h3>
                <span className="stat-sub">
                  This Month
                  <span style={{ color: "var(--black)", fontWeight: 600 }}>
                    vs
                  </span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>
                    0.00%
                  </span>
                </span>
              </div>
              <div>
                <div className="right-arrow-logo"></div>
              </div>
              {/* Decorative circle */}
              <div className="stat-card-decor-overview">
                <img className="flowblue" src={Images.fldesign} />
              </div>
            </div>

            <div className="stat-card">
              <div className="star-card-boxes-maincon">
                <div className="button-stat-card">
                  <div className="head-sub-one">
                    <p className="stat-title">Product Subscribed</p>
                    <h3 className="stat-value">
                      {productData?.subscribedCount}
                    </h3>
                  </div>
                  <button
                    onClick={NavigateToProducts}
                    className="outline-btn small"
                  >
                    More Products
                  </button>
                </div>
                <span className="stat-sub">
                  This Month
                  <span style={{ color: "var(--black)", fontWeight: 600 }}>
                    vs
                  </span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>
                    0.00%
                  </span>
                </span>
              </div>

              {/* Decorative circle */}
              <div className="stat-card-decor-overview">
                <img className="flowblue" src={Images.fldesign} />
              </div>
            </div>

            <div className="stat-card">
              <div className="star-card-boxes-maincon">
                <div className="button-stat-card">
                  <div className="head-sub-one">
                    <p className="stat-title">Product Requests</p>
                    <h3 className="stat-value">{productData?.pendingCount}</h3>
                  </div>
                  <button
                    onClick={NavigateToViewRequests}
                    className="outline-btn small"
                  >
                    View Requests
                  </button>
                </div>
                <span className="stat-sub">
                  This Month
                  <span style={{ color: "var(--black)", fontWeight: 600 }}>
                    vs
                  </span>
                  <span style={{ color: "var(--green)", fontWeight: 600 }}>
                    0.00%
                  </span>
                </span>
              </div>
              {/* Decorative circle */}
              <div className="stat-card-decor-overview">
                <img className="flowblue" src={Images.fldesign} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="quick-actions-bg">
        <h3 className="section-title-mc">Quick Actions</h3>
        <div className="quick-action-main">
          <div className="quick-action-column">
            <div className="quick-actions">
              {quickActions.map((item, idx) => (
                <div
                  onClick={() => navigationGuide(item)}
                  className="quick-card"
                  key={idx}
                >
                  <div className="stat-card-decor-quickactions">
                    <img className="flowblue" src={Images.fldesign} />
                  </div>
                  <div className="quick-icon">
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <h4>{item.title}</h4>
                  <p>Manage your API credentials</p>
                  <span
                    onClick={() => navigationGuide(item)}
                    className="quick-link"
                  >
                    Get started →
                  </span>
                  {/* Decorative circle */}
                  <div className="quick-card-decor"></div>
                </div>
              ))}
            </div>

            <div className="quick-actions">
              {quickActionssecond.map((item, idx) => (
                <div className="quick-card second-row" key={idx}>
                  <div className="graph-border-div">
                    <div className="quick-icon-litepur">
                      <img src={item.icon} alt={item.title} />
                    </div>
                    <div className="length-border-main">+2 this month</div>
                  </div>

                  {item.type === "stat" && (
                    <div style={{ marginTop: 5 }}>
                      <p className="quick-card-label-sm">{item.title}</p>
                      <h4 className="quick-card-val-lg">
                        {item.extra == "simple"
                          ? whitelistIps?.length
                          : item?.extra == "sparkline"
                            ? userApiCount?.apiCount
                            : userApiCount?.apiStore}

                      </h4>
                    </div>
                  )}

                  {item.type === "action" && (
                    <div style={{ marginTop: 5 }}>
                      <p className="quick-card-label-sm">{item.title}</p>
                      <span className="quick-link-badge">{transactionData?.totalCount || 0}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="quick-action-rightsection">
            {/* <div className="recent-activity-card">
            <div className="recent-activity-header">
              <h3 className="recent-activity-title">Recent Activity</h3>
              <img
                className="recent-activity-bell"
                src={Images.bellicon}
                alt="notifications"
              />
            </div>
            <div className="recent-activity-list">
              <div className="recent-activity-item">
                <div className="activity-icon warning">
                  <FiAlertTriangle />
                </div>

                <div className="activity-content">
                  <p className="activity-title">API call spike detected</p>
                  <p className="activity-subtitle">
                    Weather API exceeded 80% of quota
                  </p>
                </div>
                <span className="activity-time">8h ago</span>
              </div>
              <div className="recent-activity-item">
                <div className="activity-icon success">
                  <LuKey />
                </div>

                <div className="activity-content">
                  <p className="activity-title">New API key created</p>
                  <p className="activity-subtitle">
                    Production key for Payment API
                  </p>
                </div>

                <span className="activity-time">5h ago</span>
              </div>

              <div className="recent-activity-item">
                <div className="activity-icon info">
                  <FiCreditCard />
                </div>

                <div className="activity-content">
                  <p className="activity-title">Invoice generated</p>
                  <p className="activity-subtitle">
                    December billing cycle: $127.50
                  </p>
                </div>

                <span className="activity-time">1d ago</span>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
      <div className="dashboard-detailed-section">
        <div className="detailed-row-one">
          <div className="product-usage-chart-card">
            <div className="chart-header">
              <h3>Product Usage</h3>
              <div className="chart-controls">
                <div className="control-group">
                  <label>Duration</label>
                  <select
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    <option value="15">Last 15 days</option>
                    <option value="10">Last 10 days</option>
                    <option value="5">Last 5 days</option>
                  </select>
                </div>
                <div className="control-group">
                  <label>All Products</label>
                  <select defaultValue="All Products" onChange={(e) => setSelectedProduct(e.target.value)}>
                    {serviceNameData?.length > 0 &&
                      serviceNameData?.map((service, i) => {
                        return (
                          <option value={service?.serviceId}>
                            {service?.serviceName}
                          </option>
                        );
                      })}
                    {/* <option>Pan Lite</option>
                    <option>Driving License Advance</option>
                    <option>GST Verification Lite</option>
                    <option>Aadhaar Based e-sign</option>
                    <option>Pan Advance</option>
                    <option>Face match</option>
                    <option>Aadhaar Pro</option>
                    <option>IFSC Verification Lite</option>
                    <option>Bank Account Verification Advance</option> */}
                  </select>
                </div>
                <div className="toggle-group">
                  <button
                    className={`toggle-btn ${slider ? "" : "active"}`}
                    onClick={() => {
                      setSlider(false);
                    }}
                  >
                    Production
                  </button>
                  {/* <button className={`toggle-btn ${slider ? "active" : ""}`} onClick={()=>{setSlider(true)}}>Test</button> */}
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart data={apiCallResponse}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--purple-main)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--purple-main)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#eef2f6" />
                  {/* <XAxis
                    dataKey="date"
                    axisLine={{ stroke: "#111827", strokeWidth: 1 }}
                    tickLine={{ stroke: "#9ca3af", strokeWidth: 1 }}
                    tick={<CustomXAxisTick />}
                    dy={10}
                  /> */}
                  {/* <XAxis
                    dataKey="date"
                    interval={0}
                    angle={0}
                    textAnchor="end"
                    height={60}
                    tickFormatter={(value) => {
                      const [day, month, year] = value.split("-");

                      const monthName = new Date(
                        year,
                        month - 1,
                      ).toLocaleString("default", { month: "short" });

                      return `${day} ${monthName}`;
                    }}
                  /> */}
                  <XAxis
                    dataKey="date"
                    interval={0}
                    angle={0}
                    textAnchor="middle"
                    height={40}
                    tick={({ x, y, payload }) => {
                      const [day, month, year] = payload.value.split("-");

                      const monthName = new Date(
                        year,
                        month - 1
                      ).toLocaleString("default", { month: "short" });

                      return (
                        <g transform={`translate(${x},${y + 16})`}>
                          <text
                            textAnchor="middle"
                            fill="var(--gray-200)"
                            fontSize="14"
                          >
                            <tspan x="0" dy="0">
                              {monthName}
                            </tspan>

                            <tspan x="0" dy="18">
                              {day}
                            </tspan>
                          </text>
                        </g>
                      );
                    }}
                  />
                  <YAxis
                    hide={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 14, fill: "var(--gray-200)" }}
                    domain={[0, 800]}
                    ticks={[0, 200, 400, 600, 800]}
                  />
                  <Tooltip />
                  {/* <Area
                    type="monotone"
                    dataKey="amt"
                    stroke="none"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  /> */}
                  {/* <Line
                    type="monotone"
                    dataKey="amt"
                    stroke="var(--purple-main)"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "#fff",
                      stroke: "var(--purple-main)",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "#fff",
                      stroke: "var(--purple-main)",
                      strokeWidth: 2,
                    }}
                  /> */}
                  <Bar
                    dataKey="totalAmount"
                    barSize={16}
                    fill="var(--purple-main)"
                    radius={[10, 10, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARDS LIST */}
          <div className="pan-lite-cards-container">
            {recentCallData &&
              recentCallData?.map((item, index) => (
                <div className="pan-lite-card" key={index}>
                  <div className="pan-icon-box">
                    <LuCodeXml
                      className="code-box-border"
                      size={20}
                      color="var(--purple-main)"
                    />
                  </div>

                  <div className="pan-card-content">
                    <div className="pan-card-header">
                      <h4>{item.serviceName || item?.serviceId}</h4>
                      <span>{item.period}</span>
                    </div>

                    <div className="pan-card-stats">
                      <div className="stat-block">
                        <span className="stat-val">{item.amount}</span>
                        <span className="stat-lbl">Amount</span>
                      </div>
                      <div className="stat-block">
                        <span className="stat-val">{item.status}</span>
                        {/* <span className="stat-lbl">Money spent</span> */}
                        <span className="stat-lbl">Status</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative shape – now on ALL cards */}
                  {/* <div className="pan-card-decor"></div> */}
                  <div className="stat-card-decor-panlite">
                    <img className="flowblue" src={Images.fldesign} />
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ROW 2: Tables */}
        <div className="detailed-row-two">
          {/* TRANSACTIONS TABLE */}
          <div className="transactions-table-card">
            <div className="table-header-row">
              <h3>Transactions stats</h3>
              <div className="table-controls">
                {/* <div
                  className="toggle-switch"
                  onClick={() => setIsProduction(!isProduction)}
                >
                  <span
                    className={`trail-color ${!isProduction ? "active-text" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProduction(false);
                    }}
                  >
                    Trial
                  </span>
                  <div
                    className={`switch-track ${isProduction ? "active" : ""}`}
                  >
                    <div className="switch-thumb"></div>
                  </div>
                  <span
                    className={`trail-color ${isProduction ? "active-text" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProduction(true);
                    }}
                  >
                    Production
                  </span>
                </div> */}

                {/* <div className="control-group-sm">
                  <p className="duration-p">Duration</p>
                  <select>
                    <option>Last 30 days</option>
                  </select>
                </div> */}
                {/* <div className="control-group-sm">
                  <p className="duration-p">Apps</p>
                  <select>
                    <option>Test App</option>
                  </select>
                </div> */}
              </div>
            </div>

            {
              // isProduction ? (
              <div className="table-wrapper-main">
                <table className="custom-table-main">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Billable transactions</th>
                      <th>success</th>
                      <th>Failed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userApiCount?.apisData?.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.service}</td>
                        <td
                          style={{ color: "var(--black)", fontWeight: "600" }}
                        >
                          {row.successCount}
                        </td>
                        <td>{row.successCount}</td>
                        <td>{row.failedCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              // ) : (
              //   <div className="empty-state-container">
              //     <img
              //       src={Images.trailimg}
              //       alt="No records found"
              //       className="empty-state-img"
              //     />
              //     <h4>No records found!</h4>
              //     <p>Looks like you have no records yet in this category.</p>
              //   </div>
              // )
            }
          </div>

          {/* <div className="apps-running-card">
            <h3>Apps Running</h3>
            <div className="small-table-wrapper-main">
              <table className="custom-table-main small">
                <thead>
                  <tr>
                    <th>App Name</th>
                    <th>Keys</th>
                    <th>Products</th>
                  </tr>
                </thead>
                <tbody>
                  {appsRunning.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.name}</td>
                      <td>{row.keys}</td>
                      <td>{row.products}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> */}
          <div className="quick-action-rightsection">
            <div className="recent-activity-card">
              {/* Header */}
              <div className="recent-activity-header">
                <h3 className="recent-activity-title">Recent Activity</h3>
                <img
                  className="recent-activity-bell"
                  src={Images.bellicon}
                  alt="notifications"
                />
              </div>
              <div className="recent-activity-list">
                <div className="recent-activity-item">
                  <div className="activity-icon warning">
                    <FiAlertTriangle />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">API call spike detected</p>
                    <p className="activity-subtitle">
                      Weather API exceeded 80% of quota
                    </p>
                  </div>
                  <span className="activity-time">8h ago</span>
                </div>

                <div className="recent-activity-item">
                  <div className="activity-icon success">
                    <LuKey />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">New API key created</p>
                    <p className="activity-subtitle">
                      Production key for Payment API
                    </p>
                  </div>
                  <span className="activity-time">5h ago</span>
                </div>

                <div className="recent-activity-item">
                  <div className="activity-icon info">
                    <FiCreditCard />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">Invoice generated</p>
                    <p className="activity-subtitle">
                      December billing cycle: $127.50
                    </p>
                  </div>
                  <span className="activity-time">1d ago</span>
                </div>

                {/* Add more items to test scroll */}
                <div className="recent-activity-item">
                  <div className="activity-icon warning">
                    <FiAlertTriangle />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">Service maintenance</p>
                    <p className="activity-subtitle">
                      Scheduled maintenance for Database API
                    </p>
                  </div>
                  <span className="activity-time">2d ago</span>
                </div>

                <div className="recent-activity-item">
                  <div className="activity-icon success">
                    <LuKey />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">New subscription</p>
                    <p className="activity-subtitle">
                      User subscribed to Email Verification API
                    </p>
                  </div>
                  <span className="activity-time">3d ago</span>
                </div>

                <div className="recent-activity-item">
                  <div className="activity-icon info">
                    <FiCreditCard />
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">Payment received</p>
                    <p className="activity-subtitle">
                      Payment of $49.99 received from user #12345
                    </p>
                  </div>
                  <span className="activity-time">4d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side Slider Overlay */}
      {isSliderOpen && (
        <div className="BillingPlans_slider-overlay">
          <div className="BillingPlans_slider-container">
            <div className="BillingPlans_slider-header">
              <h2>Add Money</h2>
              <button
                className="BillingPlans_close-btn"
                onClick={() => setIsSliderOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="BillingPlans_slider-content">
              <WalletToPop />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MainContent;
