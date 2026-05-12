import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import "./Reports.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";

const DateRangePicker = ({ isOpen, onClose, onApply }) => {
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [activePreset, setActivePreset] = useState("This Month");
  const [leftMonth, setLeftMonth] = useState(moment().startOf("month"));
  const [rightMonth, setRightMonth] = useState(
    moment().add(1, "month").startOf("month"),
  );

  const [selectingStart, setSelectingStart] = useState(true);

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
  ];

  const setRange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setLeftMonth(moment(start).startOf("month"));
    setRightMonth(moment(start).add(1, "month").startOf("month"));
  };

  const handlePresetClick = (preset) => {
    setActivePreset(preset.label);
    preset.action();
  };

  const handleDayClick = (day) => {
    if (activePreset !== "Custom") setActivePreset("Custom");

    if (selectingStart) {
      setStartDate(day);
      setEndDate(day);
      setSelectingStart(false);
    } else {
      if (day.isBefore(startDate)) {
        setStartDate(day);
        setSelectingStart(false);
      } else {
        setEndDate(day);
        setSelectingStart(true);
      }
    }
  };
  const renderCalendar = (monthMoment) => {
    const startDay = moment(monthMoment).startOf("month").day();
    const daysInMonth = monthMoment.daysInMonth();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

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
        <div className="calendar-container">
          <div className="date-inputs-row">
            <div className="date-display-box">
              {startDate.format("MMM D, YYYY")}
            </div>
            <div className="date-display-box">
              {endDate.format("MMM D, YYYY")}
              {endDate.format("MMM D,YYY")}
            </div>
          </div>
          <div className="calendars-wrapper">
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
                <div></div>
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
  const [productsOpen, setProductsOpen] = useState(false);
  const [appNameOpen, setAppNameOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Select option");
  const [selectedAppName, setSelectedAppName] = useState("Select option");
  const [selectedStatus, setSelectedStatus] = useState("Select option");
  const [duration, setDuration] = useState("Select Duration");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
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
      <Eachpage_header headertitle={"Reports"} />
      <div className="filter-card">
        <div className="filter-header">
          <h2 className="filter-title">Filter By</h2>
          <button className="clear-all-btn">Clear All</button>
        </div>

        <div className="filter-grid">
          <div className="form-group">
            <p className="label">Products</p>
            <div
              className="custom-select-trigger"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              {selectedProduct} <MdOutlineArrowDropDown size={22} />
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

          {/* <div className="form-group">
            <p className="label">APP Name</p>
            <div
              className="custom-select-trigger"
              onClick={() => setAppNameOpen(!appNameOpen)}
            >
              {selectedAppName} <MdOutlineArrowDropDown size={22} />
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
          </div> */}

          <div className="form-group">
            <p className="label">Status</p>
            <div
              className="custom-select-trigger"
              onClick={() => setStatusOpen(!statusOpen)}
            >
              {selectedStatus} <MdOutlineArrowDropDown size={22} />
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

          <div className="form-group">
            <p className="label">Duration</p>
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

          {/* <div className="form-group">
            <p className="label">Charge Type</p>
            <div className="radio-group">
              <p className="radio-label">
                <input type="radio" name="chargeType" /> Billing
              </p>
              <p className="radio-label">
                <input type="radio" name="chargeType" /> Non Billing
              </p>
            </div>
          </div>

          <div className="form-group">
            <p className="label">Environment</p>
            <div className="radio-group">
              <p className="radio-label">
                <input type="radio" name="env" /> Test
              </p>
              <p className="radio-label">
                <input type="radio" name="env" /> Production
              </p>
            </div>
          </div> */}
        </div>

        <div className="run-report-container">
          <button className="run-report-btn">Run Report</button>
        </div>
      </div>

      <div className="page-header-card">
        <h2 className="filter-title">Result Set</h2>
        <div className="result-placeholder">
          <FileText size={24} color="#00000099" />
          <div className="report-set-placeholder">
            Search/Filter parameters and "Run report" to generate the result set
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
