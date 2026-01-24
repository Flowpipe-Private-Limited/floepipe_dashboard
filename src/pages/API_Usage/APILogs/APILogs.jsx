import React, { useState } from "react";
import "./APILogs.css";
import { X, Calendar } from "lucide-react";
import DateRangePicker from "../../../components/ui/Calender/DateRangePicker";
import { LuTestTube } from "react-icons/lu";
import { BsLightningCharge } from "react-icons/bs";
import Images from "../../../Images/Images"

const APILogs = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRequestedModal, setShowRequestedModal] = useState(false);
  const [activeMode, setActiveMode] = useState("test");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState("Select Duration");
  const [activeDateField, setActiveDateField] = useState(null);

  const handleDateApply = (startDate, endDate) => {
    // Format the dates as needed
    const formattedRange = `${startDate.format("DD/MM/YYYY")} - ${endDate.format("DD/MM/YYYY")}`;
    setSelectedDuration(formattedRange);
    setIsDatePickerOpen(false);

    // You can also access the moment objects directly
    console.log("Start Date:", startDate.format("YYYY-MM-DD"));
    console.log("End Date:", endDate.format("YYYY-MM-DD"));
  };

  return (
    <>
      <div className="api-logs-container">
        <div className="logs-header">
          <h2 className="secondary-title">API Logs</h2>
          <div className="logs-actions">
            <button
              className="log-btn primary"
              onClick={() => setShowRequestModal(true)}
            >
              Request Logs
            </button>

            <button
              className="log-btn secondary"
              onClick={() => setShowRequestedModal(true)}
            >
              Requested Logs
            </button>
          </div>
        </div>

        <div className="logs-content">
          <div className="empty-state-illustration">
            {/* existing empty illustration */}
            <img className="reportsempty-img" src={Images.reportsempty}/>
          </div>
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
                className={`request-mode-btn ${
                  activeMode === "test" ? "active" : ""
                }`}
                onClick={() => setActiveMode("test")}
              >
                <span className="request-mode-icon"><LuTestTube size={16}/></span>
                Test
              </button>

              <button
                className={`request-mode-btn ${
                  activeMode === "live" ? "active" : ""
                }`}
                onClick={() => setActiveMode("live")}
              >
                <span className="request-mode-icon"><BsLightningCharge size={16} /></span>
                Live
              </button>
            </div>

            {/* ================= Date Fields ================= */}
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

            {/* ================= Single Date Picker ================= */}
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

      {/* ================= Requested Logs Modal ================= */}
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
