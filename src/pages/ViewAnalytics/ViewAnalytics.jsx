import React from "react";
import {
  LineChart,
  Line,
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

const ViewAnalytics = () => {
  // API Calls Over Time Data
  const apiCallsData = [
    { name: "Sun", value: 25000 },
    { name: "Mon", value: 32000 },
    { name: "Tue", value: 28000 },
    { name: "Wed", value: 35000 },
    { name: "Thu", value: 38000 },
    { name: "Fri", value: 33000 },
    { name: "Sat", value: 30000 },
  ];

  // API Cost Breakdown Data
  const costBreakdownData = [
    { name: "Mon", cost: 700 },
    { name: "Tue", cost: 650 },
    { name: "Wed", cost: 850 },
    { name: "Thu", cost: 750 },
    { name: "Fri", cost: 900 },
    { name: "Sat", cost: 600 },
    { name: "Sun", cost: 720 },
  ];

  // Payment Volume Trend Data
  const paymentVolumeData = [
    { name: "May", value: 80000 },
    { name: "Sep", value: 95000 },
    { name: "Jan", value: 110000 },
    { name: "May", value: 125000 },
    { name: "Oct", value: 142000 },
  ];

  // Error Tracking Data
  const errorTrackingData = [
    { name: "API Errors", value: 245, color: "#EF4444" },
    { name: "Payment Fails", value: 180, color: "#F97316" },
    { name: "Timeouts", value: 156, color: "#F59E0B" },
    { name: "Auth Errors", value: 98, color: "#EAB308" },
  ];

  // Usage by Endpoint Data
  const endpointUsageData = [
    { name: "users", value: 3492, color: "#8B5CF6" },
    { name: "payments", value: 2871, color: "#3B82F6" },
    { name: "webhooks", value: 1654, color: "#F59E0B" },
    { name: "transactions", value: 1203, color: "#10B981" },
  ];

  // Average Response Time Data
  const responseTimeData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 115 },
    { name: "Wed", value: 135 },
    { name: "Thu", value: 125 },
    { name: "Fri", value: 145 },
    { name: "Sat", value: 110 },
    { name: "Sun", value: 118 },
  ];

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <div>
          <h1>Usage Analytics</h1>
          <p>Track your performance and usage patterns</p>
        </div>
        <div className="header-actions">
          {/* <div className="test-live">
          <button className="btn-text">Text</button>
          <button className="btn-link">Link</button>
          </div> */}
             <div className="test-live">
                  <button className="btn-text active"> <LuTestTube />Test</button>
                  <button className="btn-link "><BsLightningCharge />Link</button>
                </div>
          <button className="btn-add"> + Add</button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="metrics-row">
        <div className="metric-card">
          <div className="metric-label">Total Requests</div>
          <div className="metric-value">10,908</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Success Rate</div>
          <div className="metric-value">97%</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg Latency</div>
          <div className="metric-value">34ms</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Peak Usage</div>
          <div className="metric-value">400 calls/day</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* API Calls Over Time */}
        <div className="chart-card large">
          <div className="chart-header-analytics">
            <div>
              <h3>API Calls Over Time</h3>
              <h2 className="lasthours">Last 7 hours</h2>
            </div>
            <div>
              <p className="chart-subtitle">456.2K </p>
              <span className="trend-text">+5.2% vs last week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={apiCallsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                fill="url(#colorValue)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* API Cost Breakdown */}
        <div className="chart-card large">
          <div className="chart-header-analytics">
            <div>
              <h3>API Cost Breakdown</h3>
              <h2 className="lasthours">Last 7 hours</h2>
            </div>
            <div>
              <p className="chart-subtitle">456.2K </p>
              <span className="trend-text">+5.2% vs last week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={costBreakdownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="cost" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Volume Trend */}
        <div className="chart-card">
          <div className="chart-header-analytics">
            <div>
              <h3>Payment Volume Trend</h3>
              <h2 className="lasthours">Last 6 months</h2>
            </div>
            <div>
              <p className="chart-subtitle">₹12.4L</p>
              <span className="trend-text">+15.8% vs last week</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={paymentVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00D9A5"
                strokeWidth={2}
                dot={{ fill: "#00D9A5", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Error Tracking */}
        <div className="chart-card">
         <div className="chart-header-analytics">
            <div>
              <h3>Error Tracking</h3>
              <h2 className="lasthours">Last 30 days</h2>
            </div>
            <div>
              <p className="chart-subtitle">₹12.4L</p>
              <span style={{color:'red'}} className="trend-text">+15.8% vs last week</span>
            </div>
          </div>
          <div className="error-chart-container">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie
                  data={errorTrackingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {errorTrackingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="error-legend">
              {errorTrackingData.map((error, index) => (
                <div key={index} className="legend-item">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: error.color }}
                  ></span>
                  <span className="legend-label">{error.name}</span>
                  <span className="legend-value">{error.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage by Endpoint */}
        <div className="chart-card">
         <div className="chart-header-analytics">
            <h3>Usage by Endpoint</h3>
          </div>
          <div className="endpoint-chart-container">
            <ResponsiveContainer width="45%" height={180}>
              <PieChart>
                <Pie
                  data={endpointUsageData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  dataKey="value"
                  label={false}
                >
                  {endpointUsageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="endpoint-legend">
              {endpointUsageData.map((endpoint, index) => (
                <div key={index} className="legend-item-horizontal">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: endpoint.color }}
                  ></span>
                  <span className="legend-label-horizontal">
                    {endpoint.name} {Math.round((endpoint.value / 9220) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Endpoints */}
        <div className="chart-card">
           <div className="chart-header-analytics">
            <h3>Top Endpoints</h3>
          </div>
          <div className="top-endpoints">
            <div className="endpoint-item">
              <div className="endpoint-info">
                <span className="endpoint-path">/api/payments</span>
                <div className="endpoint-bar">
                  <div
                    className="endpoint-bar-fill"
                    style={{ width: "85%", backgroundColor: "#3B82F6" }}
                  ></div>
                </div>
              </div>
              <span className="endpoint-count">1,247</span>
            </div>
            <div className="endpoint-item">
              <div className="endpoint-info">
                <span className="endpoint-path">/api/users</span>
                <div className="endpoint-bar">
                  <div
                    className="endpoint-bar-fill"
                    style={{ width: "65%", backgroundColor: "#8B5CF6" }}
                  ></div>
                </div>
              </div>
              <span className="endpoint-count">892</span>
            </div>
            <div className="endpoint-item">
              <div className="endpoint-info">
                <span className="endpoint-path">/api/transactions</span>
                <div className="endpoint-bar">
                  <div
                    className="endpoint-bar-fill"
                    style={{ width: "50%", backgroundColor: "#10B981" }}
                  ></div>
                </div>
              </div>
              <span className="endpoint-count">656</span>
            </div>
            <div className="endpoint-item">
              <div className="endpoint-info">
                <span className="endpoint-path">/api/webhooks</span>
                <div className="endpoint-bar">
                  <div
                    className="endpoint-bar-fill"
                    style={{ width: "35%", backgroundColor: "#F59E0B" }}
                  ></div>
                </div>
              </div>
              <span className="endpoint-count">252</span>
            </div>
          </div>
        </div>

        {/* Average Response Time */}
        <div className="chart-card full-width">
          <div className="chart-header-analytics">
            <h3>Average Response Time</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={responseTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ fill: "#3B82F6", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ViewAnalytics;
