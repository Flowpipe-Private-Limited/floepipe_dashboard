import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./APILogs.css";
import { X, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import DateRangePicker from "../../../components/ui/Calender/DateRangePicker";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import Images from "../../../Images/Images";
import { useEffect } from "react";
import {getAnalyticsService} from "../../../utils/Apis/api";
const APILogs = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRequestedModal, setShowRequestedModal] = useState(false);
  const [activeMode, setActiveMode] = useState("test");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);
  const navigate = useNavigate();
const [apiLogsData, setApiLogsData] = useState([]);


  const handleExpand = (log) => {
    navigate("/dashboard/APILogsDetail", {
      state: {
        records: log.records,
        clientId: log.clientId,
        serviceName: log.serviceName
      }
    });
  };
useEffect(() => {
  fetchAnalytics();
}, []);

const fetchAnalytics = async () => {
  console.log(" Fetching analytics data...");

  try {
    const res = await getAnalyticsService();

    console.log("Full API Response:", res.data);

    if (res?.data?.success) {
      const rawData = res.data.data;
      console.log("Raw Data from Backend:", rawData);
      console.log("Number of Clients:", rawData.length);
      const formatted = rawData.flatMap((client, index) => {
        console.log(` Processing Client ${index + 1}`);
        console.log("Client ID:", client.clientId);
        console.log("Services Count:", client.services.length);

        return client.services.map((service, i) => {
          console.log(`Service ${i + 1}:`, service);

          return {
            id: `${index}-${i}`,
            clientId: client.clientId,
            serviceId: service._id,
            serviceName: service.service,
            count: service.count,
            records: [service]
          };
        });
      });

      console.log("Final Flattened Data:", formatted);
      console.log("Total Table Rows:", formatted.length);

      setApiLogsData(formatted);
    } else {
      console.warn("⚠ API Success is FALSE");
    }

  } catch (error) {
    console.error("Error Fetching Analytics:", error);
  }
};


  return (
    <>
      <div className="api-logs-container">
        <div className="logs-content">
          {apiLogsData.length === 0 ? (
            <div className="empty-state-illustration">
              <img className="reportsempty-img" src={Images.reportsempty} alt="No data" />
            </div>
          ) : (
            <div className="api-logs-table-wrapper">
              <table className="api-logs-table">
                <thead colSpan="6">
                  <tr colSpan="6">
                    <th>ClientID</th>
                    <th>Service ID</th>
                    <th>Service Namess</th>
                    <th>Count</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {apiLogsData.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr colSpan="6">
                        <td>{log.clientId}</td>
                        <td>{log.serviceId}</td>
                        <td>{log.serviceName}</td>
                        <td>{log.count}</td>
                        <td>
                          <button
                            className="expand-btn"
                            onClick={() => handleExpand(log)}
                            aria-label="Expand"
                          >
                            <ChevronDown size={18} />
                          </button>
                        </td>
                      </tr>
                      {/* Expanded content row removed - now navigates to separate page */}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
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
                className={`request-mode-btn ${activeMode === "test" ? "active" : ""
                  }`}
                onClick={() => setActiveMode("test")}
              >
                <span className="request-mode-icon">
                  <LuTestTube size={16} />
                </span>
                Test
              </button>

              <button
                className={`request-mode-btn ${activeMode === "live" ? "active" : ""
                  }`}
                onClick={() => setActiveMode("live")}
              >
                <span className="request-mode-icon">
                  <BsLightningCharge size={16} />
                </span>
                Live
              </button>
            </div>

            {/* Date Fields */}
            <div className="request-form">
              {/* From Date */}
              <div className="request-field">
                <p className="request-label">From date</p>
                <div className="request-date-input-wrapper">
                  <input
                    type="text"
                    className="request-date-input"
                    placeholder="dd-mm-yy"
                    value={fromDate}
                    readOnly
                    onClick={() => {
                      setActiveDateField("from");
                      setIsDatePickerOpen(true);
                    }}
                  />
                  <Calendar size={18} className="request-calendar-icon" />
                </div>
              </div>

              {/* To Date */}
              <div className="request-field">
                <p className="request-label">To date</p>
                <div className="request-date-input-wrapper">
                  <input
                    type="text"
                    className="request-date-input"
                    placeholder="dd-mm-yy"
                    value={toDate}
                    readOnly
                    onClick={() => {
                      setActiveDateField("to");
                      setIsDatePickerOpen(true);
                    }}
                  />
                  <Calendar size={18} className="request-calendar-icon" />
                </div>
              </div>
            </div>

            {/* Date Picker */}
            {isDatePickerOpen && (
              <div className="request-calendar-dropdown">
                <DateRangePicker
                  isOpen={isDatePickerOpen}
                  onClose={() => {
                    setIsDatePickerOpen(false);
                    setActiveDateField(null);
                  }}
                  onApply={(start, end) => {
                    if (activeDateField === "from") {
                      setFromDate(start.format("DD/MM/YYYY"));
                    }

                    if (activeDateField === "to") {
                      setToDate(end.format("DD/MM/YYYY"));
                    }

                    setIsDatePickerOpen(false);
                    setActiveDateField(null);
                  }}
                />
              </div>
            )}

            {/* Submit */}
            <div className="request-footer">
              <button className="request-submit-btn">Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Requested Logs Modal */}
      {showRequestedModal && (
        <div className="requested-overlay">
          <div className="requested-modal">
            {/* Header */}
            <div className="requested-header">
              <h3>Requested Logs</h3>
              <span
                className="requested-close"
                onClick={() => setShowRequestedModal(false)}
              >
                ✕
              </span>
            </div>

            {/* Table */}
            <div className="requested-table-wrapper">
              <table className="requested-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>From Date</th>
                    <th>To Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="5" className="requested-empty">
                      No Requested logs
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="requested-footer">
              <button className="request-new-btn">Request new</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default APILogs;