import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./APILogs.css";
import { X, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import DateRangePicker from "../../../components/ui/Calender/DateRangePicker";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import Images from "../../../Images/Images";

const APILogs = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRequestedModal, setShowRequestedModal] = useState(false);
  const [activeMode, setActiveMode] = useState("test");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState(null);
  const navigate = useNavigate();

  // Sample API logs data - set to empty array [] to show empty state
  const [apiLogsData] = useState([
    {
      id: 1,
      clientId: "Rakesh Pamula",
      serviceId: "id : 23456789",
      serviceName: "Aadhaar Card",
      count: 10,
      chargedAmount: "₹5,000",
      records: [
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 10, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 9, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 8, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 7, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 6, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 5, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 4, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 3, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 2, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 1, chargedAmount: "₹5,000" },


      ]
    },
    {
      id: 2,
      clientId: "Rakesh Pamula",
      serviceId: "id : 23456789",
      serviceName: "Aadhaar Card",
      count: 10,
      chargedAmount: "₹5,000",
      records: [
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 10, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 9, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 8, chargedAmount: "₹5,000" },
      ]
    },
    {
      id: 3,
      clientId: "Rakesh Pamula",
      serviceId: "id : 23456789",
      serviceName: "Aadhaar Card",
      count: 9,
      chargedAmount: "₹5,000",
      records: [
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 9, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 8, chargedAmount: "₹5,000" },
      ]
    },
    {
      id: 4,
      clientId: "Rakesh Pamula",
      serviceId: "id : 23456789",
      serviceName: "Aadhaar Card",
      count: 8,
      chargedAmount: "₹5,000",
      records: [
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 8, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 7, chargedAmount: "₹5,000" },
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 6, chargedAmount: "₹5,000" },
      ]
    },
    {
      id: 5,
      clientId: "Rakesh Pamula",
      serviceId: "id : 23456789",
      serviceName: "Aadhaar Card",
      count: 7,
      chargedAmount: "₹5,000",
      records: [
        { clientId: "Rakesh Pamula", serviceId: "id : 23456789", serviceName: "Aadhaar Card", count: 7, chargedAmount: "₹5,000" },
      ]
    },
  ]);

  const handleExpand = (log) => {
    navigate("/dashboard/APILogsDetail", {
      state: {
        records: log.records,
        clientId: log.clientId,
        serviceName: log.serviceName
      }
    });
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
                    <th>Client ID</th>
                    <th>Service ID</th>
                    <th>Service Name</th>
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