import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./ViewAnalytics.css";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import EnvironmentSwitch from "../../components/ui/EnvironmentSwitch/EnvironmentSwitch";
import Right_sidebutton from "../../components/ui/Right_sidebutton/Right_sidebutton";
import Cookies from "js-cookie";
import {
  getAnalyticsService,
  getLast7DaysHits,
  getApiErrorCount,
} from "../../utils/Apis/api";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import images from "../../Images/Images";

// Custom tick renderer for API Cost Breakdown to stack Month and Day labels or handle long names
const CustomXAxisTick = ({ x, y, payload }) => {
  if (!payload || !payload.value) return null;
  const parts = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={0} y1={0} x2={0} y2={6} stroke="#E5E7EB" />
      <text x={0} y={12} textAnchor="middle" className="chart-axis-text">
        <tspan x={0} dy="6" fill="#9CA3AF" fontWeight="400">
          {parts[0]}
        </tspan>
        {parts[1] && (
          <tspan x={0} dy="16" fill="#000000" fontWeight="600">
            {parts[1]}
          </tspan>
        )}
      </text>
    </g>
  );
};

const ViewAnalytics = () => {
  const [environment, setEnvironment] = useState("test");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hitsData, setHitsData] = useState([]);
  const [errorData, setErrorData] = useState([]);

  const fetchAnalytics = async () => {
    try {
      const currentClientId =
        Cookies.get("clientId") || localStorage.getItem("clientId");
      const [res, hitsRes, errorRes] = await Promise.all([
        getAnalyticsService(currentClientId),
        getLast7DaysHits(currentClientId).catch(() => ({
          data: { success: false },
        })),
        getApiErrorCount(currentClientId).catch(() => ({
          data: { success: false },
        })),
      ]);

      console.log("Analytics Response:", res.data);
      console.log("Hits Response:", hitsRes?.data);
      console.log("Errors Response:", errorRes?.data);

      if (res?.data?.success) {
        const rawData = res.data.data;
        const rawDailyStats = res.data.dailyStats || [];

        let clientServices = [];
        let clientDailyStats = [];

        if (currentClientId) {
          const clientRecord = rawData.find(
            (c) => c.clientId === currentClientId,
          );
          if (clientRecord) {
            clientServices = clientRecord.services || [];
          } else {
            clientServices = rawData.flatMap((c) => c.services || []);
          }
          clientDailyStats = rawDailyStats.filter(
            (item) => item.clientId === currentClientId,
          );
          if (clientDailyStats.length === 0) {
            clientDailyStats = rawDailyStats;
          }
        } else {
          clientServices = rawData.flatMap((c) => c.services || []);
          clientDailyStats = rawDailyStats;
        }

        setServices(clientServices);
        setDailyStats(clientDailyStats);
      }

      if (hitsRes?.data?.success) {
        setHitsData(hitsRes.data.data || []);
      }

      // errorRes structure is typically { data: { statusCode: 200, data: [...], message: "..." } }
      // or similar standard API response
      if (errorRes?.data?.statusCode === 200 || errorRes?.data?.success) {
        setErrorData(errorRes.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching analytics in ViewAnalytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Compute overall header metrics
  const totalRequests = services.reduce(
    (sum, s) => sum + (s.totalCount || s.count || 0),
    0,
  );
  const totalSuccess = services.reduce(
    (sum, s) => sum + (s.successCount || 0),
    0,
  );
  const totalFailed = services.reduce(
    (sum, s) => sum + (s.failedCount || 0),
    0,
  );
  const avgSuccessRate =
    totalRequests > 0 ? Math.round((totalSuccess / totalRequests) * 100) : 100;

  // Extract unique categories for filtering dropdown
  const uniqueCategories = [
    ...new Set(services.map((s) => s.category).filter(Boolean)),
  ];

  // Filter services by selected product/category
  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  // Generate list of last 7 calendar days dynamically
  const last7DaysList = (() => {
    const days = [];
    const options = { month: "short", day: "2-digit" };
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toLocaleDateString("en-US", options)); // e.g. "May 13"
    }
    return days;
  })();

  // 1. API Hit Counts Data
  const hitCountsData =
    hitsData.length > 0
      ? hitsData.map((item) => {
          const dayNum = item.date ? item.date.split("-")[2] : "";
          return {
            name: `${item.day} ${dayNum}`,
            hits: item.hits || 0,
          };
        })
      : last7DaysList.map((dayName) => ({
          name: dayName,
          hits: 0,
        }));

  // 2. Error Tracking Data (Success vs Failed transactions)
  const errTotalSuccess = errorData.reduce(
    (sum, s) => sum + (s.successCount || 0),
    0,
  );
  const errTotalFailed = errorData.reduce(
    (sum, s) => sum + (s.failedCount || 0),
    0,
  );

  const errorTrackingData = [
    { name: "Success", value: errTotalSuccess, color: "#00A63E" },
    { name: "Failed", value: errTotalFailed, color: "#FF4D4D" },
  ].filter((item) => item.value > 0);

  if (errorTrackingData.length === 0) {
    errorTrackingData.push({ name: "No Data", value: 100, color: "#E5E7EB" });
  }

  // 3. Usage by Endpoint Data (Percentage usage per service/endpoint)
  const endpointUsageData =
    totalRequests > 0
      ? services
          .map((s, index) => {
            const colors = [
              "#8B5CF6",
              "#000000",
              "#6C727F",
              "#CCFF00",
              "#00A63E",
              "#FF4D4D",
            ];
            const percentage = Math.round(
              ((s.totalCount || s.count || 0) / totalRequests) * 100,
            );
            return {
              name: s.service,
              value: percentage,
              color: colors[index % colors.length],
            };
          })
          .filter((item) => item.value > 0)
      : [{ name: "No Data", value: 100, color: "#E5E7EB" }];

  // 4. Top Endpoint Data (Highest volume endpoints)
  const sortedServices = [...services].sort(
    (a, b) => (b.totalCount || b.count || 0) - (a.totalCount || a.count || 0),
  );
  const maxCallsOfTop =
    sortedServices[0]?.totalCount || sortedServices[0]?.count || 1;

  const topEndpointsData =
    sortedServices.length > 0
      ? sortedServices.slice(0, 5).map((s, index) => {
          const colors = [
            "#000000",
            "#8B5CF6",
            "#CCFF00",
            "#6C727F",
            "#00A63E",
          ];
          const countValue = s.totalCount || s.count || 0;
          const widthPercentage =
            maxCallsOfTop > 0 ? `${(countValue / maxCallsOfTop) * 100}%` : "0%";
          return {
            path: s.service,
            count: countValue.toLocaleString(),
            width: widthPercentage,
            color: colors[index % colors.length],
          };
        })
      : [
          {
            path: "No endpoints found",
            count: "0",
            width: "0%",
            color: "#E5E7EB",
          },
        ];

  if (loading) {
    return (
      <div
        className="analytics-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            className="spinner-border"
            role="status"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              color: "#8B5CF6",
              borderWidth: "4px",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p
            style={{
              marginTop: "1.2rem",
              color: "#6C727F",
              fontFamily: "Figtree",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Loading usage statistics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytic-main-container">
        <div className="analytics-header">
          <div>
            <h1>Usage Analytics</h1>
            <p>Track your performance and usage patterns</p>
          </div>
          <div className="header-actions">
            <div className="test-live">
              <EnvironmentSwitch
                value={environment}
                onChange={setEnvironment}
                left={{ label: "Test", value: "sandbox", icon: <LuTestTube /> }}
                right={{
                  label: "Link",
                  value: "prod",
                  icon: <BsLightningCharge />,
                }}
              />
            </div>
            <Right_sidebutton
              onClick={() => setIsModalOpen(true)}
              TextonButton={"Add"}
            />
          </div>
        </div>

        {/* Metrics Row */}
        <div className="metrics-row">
          <div className="metric-card">
            <div className="stat-card-decor-analytics">
              <img className="flowblue" src={images.fldesign} alt="" />
            </div>
            <div className="metric-label">Total Requests</div>
            <div className="metric-value">{totalRequests.toLocaleString()}</div>
          </div>
          <div className="metric-card">
            <div className="stat-card-decor-analytics">
              <img className="flowblue" src={images.fldesign} alt="" />
            </div>
            <div className="metric-label">Avg Success Rate</div>
            <div
              style={{ color: avgSuccessRate >= 90 ? "#00A63E" : "#8B5CF6" }}
              className="metric-value"
            >
              {avgSuccessRate}%
            </div>
          </div>
          <div className="metric-card">
            <div className="stat-card-decor-analytics">
              <img className="flowblue" src={images.fldesign} alt="" />
            </div>
            <div className="metric-label">Avg Latency</div>
            <div className="metric-value">34ms</div>
          </div>
          <div className="metric-card">
            <div className="stat-card-decor-analytics">
              <img className="flowblue" src={images.fldesign} alt="" />
            </div>
            <div className="metric-label">Peak Usage</div>
            <div className="metric-value">400 calls/day</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* API Hit Counts Card */}
        <div className="chart-card">
          <div className="chart-header-container">
            <div>
              <h3 className="chart-title">API Hit Counts</h3>
              <p className="chart-subtitle-faint">
                Total API calls over the last 7 days
              </p>
            </div>
            <div className="dropdown-container">
              <span className="dropdown-label">Category Filter</span>
              <div className="dropdown-wrapper">
                <select
                  className="dropdown-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Products</option>
                  {uniqueCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <span className="dropdown-arrow">&#9662;</span>
              </div>
            </div>
          </div>
          <div className="chart-body-container">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart
                data={hitCountsData}
                margin={{ top: 15, right: 10, left: -25, bottom: 15 }}
              >
                <CartesianGrid vertical={false} stroke="#ECECF0" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={<CustomXAxisTick />}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  stroke="#9CA3AF"
                  fontSize={11}
                  domain={[0, "auto"]}
                />
                <Tooltip cursor={{ fill: "rgba(0,0,0,0.03)" }} />
                <Bar
                  dataKey="hits"
                  fill="#000000"
                  barSize={14}
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Tracking Card */}
        <div className="chart-card">
          <div className="chart-header-container">
            <div>
              <h3 className="chart-title">Error Tracking</h3>
              <p className="chart-subtitle-faint">
                Success vs Failed transactions
              </p>
            </div>
            <div className="chart-header-right-stats">
              <div className="stat-big-value">{errTotalFailed}</div>
              <div
                className="stat-percentage-change"
                style={{ color: errTotalFailed > 0 ? "#FF4D4D" : "#00A63E" }}
              >
                {errTotalSuccess + errTotalFailed > 0
                  ? (
                      (errTotalFailed / (errTotalSuccess + errTotalFailed)) *
                      100
                    ).toFixed(1)
                  : 0}
                % failure rate
              </div>
            </div>
          </div>
          <div className="chart-body-container error-section-flex">
            <div className="donut-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTrackingData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {errorTrackingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="error-legend-container">
              {errorTrackingData.map((error, index) => (
                <div key={index} className="legend-row-item">
                  <div className="legend-left-col">
                    <span
                      className="legend-bullet"
                      style={{ backgroundColor: error.color }}
                    ></span>
                    <span className="legend-text-name">{error.name}</span>
                  </div>
                  <span className="legend-text-value">{error.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage by Endpoint Card */}
        <div className="chart-card">
          <div className="chart-header-container">
            <div>
              <h3 className="chart-title">Usage by Endpoint</h3>
              <p className="chart-subtitle-faint">
                Percentage distribution of volume
              </p>
            </div>
          </div>
          <div className="chart-body-container endpoint-section-flex">
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={endpointUsageData}
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    dataKey="value"
                  >
                    {endpointUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="endpoint-grid-legend">
              {endpointUsageData.map((endpoint, index) => (
                <div key={index} className="grid-legend-item">
                  <span
                    className="legend-bullet"
                    style={{ backgroundColor: endpoint.color }}
                  ></span>
                  <span className="grid-legend-text">
                    {endpoint.name}: {endpoint.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Endpoint Card */}
        <div className="chart-card">
          <div className="chart-header-container">
            <div>
              <h3 className="chart-title">Top Endpoint</h3>
            </div>
          </div>
          <div className="chart-body-container progress-list-wrapper">
            {topEndpointsData.map((endpoint, index) => (
              <div key={index} className="progress-row-item">
                <div className="progress-row-header">
                  <span className="endpoint-path-text">{endpoint.path}</span>
                  <span className="endpoint-count-text">{endpoint.count}</span>
                </div>
                <div className="progress-track-bar">
                  <div
                    className="progress-fill-bar"
                    style={{
                      width: endpoint.width,
                      backgroundColor: endpoint.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
