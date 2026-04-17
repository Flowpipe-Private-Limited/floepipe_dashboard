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
import { useState } from "react";
import "./mainContent.css";
import { GoArrowUpRight, GoArrowDownLeft } from "react-icons/go";
import Images from "../../Images/Images";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { BiRupee } from "react-icons/bi";
import { FiAlertTriangle, FiCreditCard } from "react-icons/fi";
import { LuKey } from "react-icons/lu";
import { LuCodeXml } from "react-icons/lu";
import WalletToPop from "../WalletToPop/WalletToPop";

const MainContent = () => {
  const [showBalance, setShowBalance] = useState(false);
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const [isProduction, setIsProduction] = useState(false);
  const navigate = useNavigate();

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
      icon: Images.Apikey,
      href: "/dashboard/apiKeys",
    },
    {
      title: "Integration Guide",
      icon: Images.Integrationguide,
    },
    {
      title: "View Analytics",
      icon: Images.viewanalytics,
      href: "/dashboard/viewAnalytics",
    },
    {
      title: "Start Free Trial",
      icon: Images.startfree,
      href: "/dashboard/Trial_Center",
    },
  ];

  const quickActionssecond = [
    {
      type: "stat",
      title: "Total API Calls",
      value: "1.2M",
      icon: Images.graphicon,
      extra: "sparkline",
    },
    {
      type: "stat",
      title: "Active APIs",
      value: "40.72 x 40.72",
      icon: Images.graphicon,
      extra: "badge",
    },
    {
      type: "stat",
      title: "Whitelist IPs",
      value: "54",
      icon: Images.graphicon,
      extra: "simple",
    },
    {
      type: "action",
      title: "Deploy to production",
      value: "Go Live",
      icon: Images.graphicon,
      extra: "button",
    },
  ];

  const productUsageData = [
    { name: "Jan", usage: 4000, amt: 2400 },
    { name: "Feb", usage: 3000, amt: 1398 },
    { name: "Mar", usage: 2000, amt: 9800 },
    { name: "Apr", usage: 2780, amt: 3908 },
    { name: "May", usage: 1890, amt: 4800 },
    { name: "Jun", usage: 2390, amt: 3800 },
    { name: "Jul", usage: 3490, amt: 4300 },
    { name: "Aug", usage: 4000, amt: 2400 },
    { name: "Sep", usage: 3000, amt: 1398 },
    { name: "Oct", usage: 2000, amt: 9800 },
    { name: "Nov", usage: 2780, amt: 3908 },
    { name: "Dec", usage: 1890, amt: 4800 },
  ];

  const panLiteData = [
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
    {
      title: "Pan Lite",
      period: "Last 7 days",
      amount: "₹ 800",
      spent: "₹ 8000",
    },
  ];

  const transactionStats = [
    { name: "Driving License Advance", billable: 10, success: 10, failed: 8 },
    { name: "GST Verification Lite", billable: 80, success: 80, failed: 6 },
    { name: "Pan Advance", billable: 12, success: 12, failed: 6 },
    { name: "IFSC Verification Lite", billable: 24, success: 24, failed: 3 },
    { name: "Bank A/c Verification Lite", billable: 4, success: 4, failed: 9 },
    { name: "FSSAI API", billable: 5, success: 5, failed: 4 },
  ];

  const appsRunning = [
    { name: "Test App", keys: 3, products: 3 },
    { name: "Live App", keys: 3, products: 3 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-top">
        <div className="dash-secone">
          <div className="wallet-card-main">
            <div className="wallet-top-check">
              <span className="wallet-label">WALLET BALANCE</span>
            </div>

            <div className="wallet-middle">
              <span className="wallet-dots">
                {showBalance ? "₹ 1,50,000" : "*******"}
              </span>
              <span
                className="wallet-eye-icon"
                onClick={() => setShowBalance(!showBalance)}
                style={{ cursor: "pointer" }}
              >
                {showBalance ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>

            <div className="wallet-actions">
              {/* <div className="w-action" onClick={NavigateToBalance}>
                <img
                  className="statement-icon"
                  src={Images.statement}
                  alt="View Statement"
                />
                <span>View Statement</span>
              </div> */}
              <div
                onClick={() => setIsSliderOpen(true)}
                className="w-action-rupee"
              >
                <BiRupee size={20} />
                Add Money
              </div>
            </div>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="star-card-boxes-maincon">
                <p className="stat-title">Total Transactions</p>
                <h3 className="stat-value">₹ 15,432</h3>
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
                <div className="button-stat-card">
                  <div className="head-sub-one">
                    <p className="stat-title">Product Subscribed</p>
                    <h3 className="stat-value">15,432</h3>
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
                <p className="stat-title">Transaction Volume</p>
                <h3 className="stat-value">₹ 15,432</h3>
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
                    <p className="stat-title">Product Requests</p>
                    <h3 className="stat-value">15,432</h3>
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

        {/* PROMO */}
        <div className="promo-card">
          <img className="dashboardright-img" src={Images.dashboardrightnew} />
          <div className="promo-content">
            <h3>Manage your finance at your fingertips</h3>
            <p className="promo-sub">Download App Now</p>
            <div className="app-buttons">
              <img className="app-btn-mock" src={Images.playstore} />
              <img className="app-btn-mock" src={Images.Appstore} />
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
                  onClick={() => navigate(item.href)}
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
                  <p>Lorem ipsum dolor sit amet</p>
                  <span
                    onClick={() => navigate(item.href)}
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
                      <h4 className="quick-card-val-lg">{item.value}</h4>
                    </div>
                  )}

                  {item.type === "action" && (
                    <div style={{ marginTop: 5 }}>
                      <p className="quick-card-label-sm">{item.title}</p>
                      <span className="quick-link-badge">Go Live</span>
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
                  <p>Duration</p>
                  <select defaultValue="Last 30 days">
                    <option>Last 30 days</option>
                    <option>Last 60 days</option>
                    <option>Last 120 days</option>
                    <option>Last 7 days</option>
                    <option>Last Custom</option>
                  </select>
                </div>
                <div className="control-group">
                  <p>All Products</p>
                  <select defaultValue="All Products">
                    <option>Pan Lite</option>
                    <option>Driving License Advance</option>
                    <option>GST Verification Lite</option>
                    <option>Aadhaar Based e-sign</option>
                    <option>Pan Advance</option>
                    <option>Face match</option>
                    <option>Aadhaar Pro</option>
                    <option>IFSC Verification Lite</option>
                    <option>Bank Account Verification Advance</option>
                  </select>
                </div>
                <div className="toggle-group">
                  <button className="toggle-btn active">Production</button>
                  <button className="toggle-btn">Test</button>
                </div>
              </div>
            </div>
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer>
                <ComposedChart data={productUsageData}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    dy={10}
                  />
                  <YAxis
                    hide={false}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="amt"
                    stroke="#d8b4fe"
                    fillOpacity={1}
                    fill="url(#colorUv)"
                  />
                  <Line
                    type="monotone"
                    dataKey="amt"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={false}
                  />
                  <Bar
                    dataKey="usage"
                    barSize={6}
                    fill="#7c3aed"
                    radius={[10, 10, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CARDS LIST */}
          <div className="pan-lite-cards-container">
            {panLiteData.map((item, index) => (
              <div className="pan-lite-card" key={index}>
                <div className="pan-icon-box">
                  <LuCodeXml
                    className="code-box-border"
                    size={20}
                    color="#7c3aed"
                  />
                </div>

                <div className="pan-card-content">
                  <div className="pan-card-header">
                    <h4>{item.title}</h4>
                    <span>{item.period}</span>
                  </div>

                  <div className="pan-card-stats">
                    <div className="stat-block">
                      <span className="stat-val">{item.amount}</span>
                      <span className="stat-lbl">Amount</span>
                    </div>
                    <div className="stat-block">
                      <span className="stat-val">{item.spent}</span>
                      <span className="stat-lbl">Money spent</span>
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
                <div
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
                </div>

                <div className="control-group-sm">
                  <p className="duration-p">Duration</p>
                  <select>
                    <option>Last 30 days</option>
                  </select>
                </div>
                <div className="control-group-sm">
                  <p className="duration-p">Apps</p>
                  <select>
                    <option>Test App</option>
                  </select>
                </div>
              </div>
            </div>

            {isProduction ? (
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
                    {transactionStats.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.name}</td>
                        <td
                          style={{ color: "var(--black)", fontWeight: "600" }}
                        >
                          {row.billable}
                        </td>
                        <td>{row.success}</td>
                        <td>{row.failed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state-container">
                <img
                  src={Images.trailimg}
                  alt="No records found"
                  className="empty-state-img"
                />
                <h4>No records found!</h4>
                <p>Looks like you have no records yet in this category.</p>
              </div>
            )}
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
