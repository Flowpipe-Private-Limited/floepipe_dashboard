import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import "./Reports.css";

const DateRangePicker = ({ isOpen, onClose, onApply }) => {
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [activePreset, setActivePreset] = useState("This Month");
  // Calendars state, default to current month and next month
  const [leftMonth, setLeftMonth] = useState(moment().startOf("month"));
  const [rightMonth, setRightMonth] = useState(
    moment().add(1, "month").startOf("month"),
  );

  // Day Selection helper
  const [selectingStart, setSelectingStart] = useState(true); // Toggle between start/end selection if custom

  if (!isOpen) return null;

  const presets = [
    {
      label: "Today",
      action: () => {
        setRange(moment(), moment());
      },
    },
    {
      label: "Yesterday",
      action: () => {
        setRange(moment().subtract(1, "days"), moment().subtract(1, "days"));
      },
    },
    {
      label: "Last 7 Days",
      action: () => {
        setRange(moment().subtract(6, "days"), moment());
      },
    },
    {
      label: "This Week",
      action: () => {
        setRange(moment().startOf("week"), moment().endOf("week"));
      },
    },
    {
      label: "Last Week",
      action: () => {
        setRange(
          moment().subtract(1, "week").startOf("week"),
          moment().subtract(1, "week").endOf("week"),
        );
      },
    },
    {
      label: "Last 30 Days",
      action: () => {
        setRange(moment().subtract(29, "days"), moment());
      },
    },
    {
      label: "This Month",
      action: () => {
        setRange(moment().startOf("month"), moment().endOf("month"));
      },
    },
    {
      label: "Last Month",
      action: () => {
        setRange(
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        );
      },
    },
    // Input box for custom days not fully implemented logic wise, usually just text.
    // Keeping standard presets for now.
  ];

  const setRange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    // Update calendar views to show selection
    setLeftMonth(moment(start).startOf("month"));
    setRightMonth(moment(start).add(1, "month").startOf("month"));
  };

  const handlePresetClick = (preset) => {
    setActivePreset(preset.label);
    preset.action();
  };

  const handleDayClick = (day) => {
    // Simple logic: If we are 'Custom' mode or just clicking.
    // For this UI, let's assume if you click, you are starting a new range or modifying end.
    // But with presets dominating, we'll keep it simple: Click Start -> Click End.
    if (activePreset !== "Custom") setActivePreset("Custom");

    if (selectingStart) {
      setStartDate(day);
      setEndDate(day); // Reset end to start
      setSelectingStart(false);
    } else {
      if (day.isBefore(startDate)) {
        setStartDate(day);
        setSelectingStart(false);
      } else {
        setEndDate(day);
        setSelectingStart(true); // Reset for next interaction
      }
    }
  };

  const renderCalendar = (monthMoment) => {
    const startDay = moment(monthMoment).startOf("month").day(); // 0-6
    const daysInMonth = monthMoment.daysInMonth();
    const days = [];

    // Empty slots
    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    // Days
    for (let d = 1; d <= daysInMonth; d++) {
      const currentDay = moment(monthMoment).date(d);
      const isSelected =
        currentDay.isSame(startDate, "day") ||
        currentDay.isSame(endDate, "day");
      const isInRange =
        currentDay.isAfter(startDate, "day") &&
        currentDay.isBefore(endDate, "day");
      const isStart = currentDay.isSame(startDate, "day");
      const isEnd = currentDay.isSame(endDate, "day");

      let classes = "day-cell";
      if (isInRange) classes += " in-range";
      if (isStart) classes += " range-start";
      if (isEnd) classes += " range-end";
      if (isStart || isEnd) classes += " selected";

      days.push(
        <div
          key={d}
          className={classes}
          onClick={() => handleDayClick(currentDay)}
        >
          {d}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="modal-overlay">
      <div className="date-picker-modal">
        {/* Sidebar */}
        <div className="presets-sidebar">
          {presets.map((p) => (
            <button
              key={p.label}
              className={`preset-btn ${activePreset === p.label ? "active" : ""}`}
              onClick={() => handlePresetClick(p)}
            >
              {p.label}
            </button>
          ))}
          <div
            style={{
              marginTop: "auto",
              fontSize: "0.8rem",
              color: "#888",
              padding: "0.5rem",
            }}
          >
            days up to today
          </div>
        </div>

        {/* Main Content */}
        <div className="calendar-container">
          <div className="date-inputs-row">
            <div className="date-display-box">
              {startDate.format("MMM D, YYYY")}
            </div>
            <div className="date-display-box">
              {endDate.format("MMM D, YYYY")}
            </div>
          </div>

          <div className="calendars-wrapper">
            {/* Left Calendar */}
            <div className="single-calendar">
              <div className="calendar-header">
                <button
                  className="nav-btn"
                  onClick={() =>
                    setLeftMonth(moment(leftMonth).subtract(1, "month"))
                  }
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="month-label">
                  {leftMonth.format("MMMM YYYY")}
                </span>
                <div></div> {/* Spacer */}
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="day-label">
                    {d}
                  </div>
                ))}
                {renderCalendar(leftMonth)}
              </div>
            </div>

            {/* Right Calendar */}
            <div className="single-calendar">
              <div className="calendar-header">
                <div></div>
                <span className="month-label">
                  {rightMonth.format("MMMM YYYY")}
                </span>
                <button
                  className="nav-btn"
                  onClick={() =>
                    setRightMonth(moment(rightMonth).add(1, "month"))
                  }
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="calendar-grid">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="day-label">
                    {d}
                  </div>
                ))}
                {renderCalendar(rightMonth)}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="modal-btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="modal-btn confirm"
              onClick={() => onApply(startDate, endDate)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  // Dropdown States
  const [productsOpen, setProductsOpen] = useState(false);
  const [appNameOpen, setAppNameOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // Filter Values
  const [selectedProduct, setSelectedProduct] = useState("Select option");
  const [selectedAppName, setSelectedAppName] = useState("Select option");
  const [selectedStatus, setSelectedStatus] = useState("Select option");
  const [duration, setDuration] = useState("Select Duration");

  // Date Picker state
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  // Filter Options
  const productsList = [
    "All Products",
    "Pan Lite",
    "Driving License Advance",
    "GST Verification Lite",
    "Aadhaar based e-sign",
    "Pan Advance",
    "Face Match",
  ];
  const appsList = ["Test app", "Live app"];
  const statusList = ["All", "Success", "Failure"];

  const handleDateApply = (start, end) => {
    setDuration(`${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`);
    setIsDatePickerOpen(false);
  };

  return (
    <div className="reports-container">
      <div className="page-header-card">
        <h1 className="page-title">Report</h1>
      </div>

      <div className="filter-card">
        <div className="filter-header">
          <h2 className="filter-title">Filter By</h2>
          <button className="clear-all-btn">Clear All</button>
        </div>

        <div className="filter-grid">
          <div className="form-group">
            <label className="label">Products</label>
            <div
              className="custom-select-trigger"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              {selectedProduct} <ChevronDown size={16} />
            </div>
            {productsOpen && (
              <div className="select-dropdown-menu">
                {productsList.map((item) => (
                  <div
                    key={item}
                    className="select-option"
                    onClick={() => {
                      setSelectedProduct(item);
                      setProductsOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* App Name Dropdown */}
          <div className="form-group">
            <label className="label">APP Name</label>
            <div
              className="custom-select-trigger"
              onClick={() => setAppNameOpen(!appNameOpen)}
            >
              {selectedAppName} <ChevronDown size={16} />
            </div>
            {appNameOpen && (
              <div className="select-dropdown-menu">
                {appsList.map((item) => (
                  <div
                    key={item}
                    className="select-option"
                    onClick={() => {
                      setSelectedAppName(item);
                      setAppNameOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="label">Status</label>
            <div
              className="custom-select-trigger"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              {selectedStatus} <ChevronDown size={16} />
            </div>
            {statusOpen && (
              <div className="select-dropdown-menu">
                {statusList.map((item) => (
                  <div
                    key={item}
                    className="select-option"
                    onClick={() => {
                      setSelectedStatus(item);
                      setStatusOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Duration */}
          <div className="form-group">
            <label className="label">Duration</label>
            <div
              className="input-trigger"
              onClick={() => setIsDatePickerOpen(true)}
            >
              {duration}
            </div>
            <DateRangePicker
              isOpen={isDatePickerOpen}
              onClose={() => setIsDatePickerOpen(false)}
              onApply={handleDateApply}
            />
          </div>

          {/* Charge Type Radio */}
          <div className="form-group">
            <label className="label">Charge Type</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="chargeType" /> Billing
              </label>
              <label className="radio-label">
                <input type="radio" name="chargeType" /> Non Billing
              </label>
            </div>
          </div>

          {/* Environment Radio */}
          <div className="form-group">
            <label className="label">Environment</label>
            <div className="radio-group">
              <label className="radio-label">
                <input type="radio" name="env" /> Test
              </label>
              <label className="radio-label">
                <input type="radio" name="env" /> Production
              </label>
            </div>
          </div>
        </div>

        <div className="run-report-container">
          <button className="run-report-btn">Run Report</button>
        </div>
      </div>

      <div className="page-header-card">
        <h2 className="filter-title">Result Set</h2>
        <div className="result-placeholder">
          <FileText size={40} color="#c4b5fd" />
          <div>
            Search/Filter parameters and "Run report" to generate the result set
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
