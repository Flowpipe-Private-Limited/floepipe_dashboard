import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import "../../../pages/Reports/Reports.css";

const DateRangePicker = ({ isOpen, onClose, onApply }) => {
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [activePreset, setActivePreset] = useState("This Month");
  const [leftMonth, setLeftMonth] = useState(moment().startOf("month"));
  const [rightMonth, setRightMonth] = useState(
    moment().add(1, "month").startOf("month")
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
          moment().subtract(1, "week").endOf("week")
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
          moment().subtract(1, "month").endOf("month")
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
        </div>
      );
    }
    return days;
  };

  return (
    // <div className="drp-modal-overlay" onClick={onClose}>
    //   <div className="drp-modal" onClick={(e) => e.stopPropagation()}>
    //     {/* Sidebar */}
    //     <div className="drp-presets-sidebar">
    //       {presets.map((p) => (
    //         <button
    //           key={p.label}
    //           className={`drp-preset-btn ${activePreset === p.label ? "active" : ""}`}
    //           onClick={() => handlePresetClick(p)}
    //         >
    //           {p.label}
    //         </button>
    //       ))}
    //       <div className="drp-sidebar-footer">days up to today</div>
    //     </div>

    //     {/* Main Content */}
    //     <div className="drp-calendar-container">
    //       <div className="drp-date-inputs-row">
    //         <div className="drp-date-display-box">
    //           {startDate.format("MMM D, YYYY")}
    //         </div>
    //         <div className="drp-date-display-box">
    //           {endDate.format("MMM D, YYYY")}
    //         </div>
    //       </div>

    //       <div className="drp-calendars-wrapper">
    //         {/* Left Calendar */}
    //         <div className="drp-single-calendar">
    //           <div className="drp-calendar-header">
    //             <button
    //               className="drp-nav-btn"
    //               onClick={() =>
    //                 setLeftMonth(moment(leftMonth).subtract(1, "month"))
    //               }
    //             >
    //               <ChevronLeft size={20} />
    //             </button>
    //             <span className="drp-month-label">
    //               {leftMonth.format("MMMM YYYY")}
    //             </span>
    //             <div></div>
    //           </div>
    //           <div className="drp-calendar-grid">
    //             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
    //               <div key={d} className="drp-day-label">
    //                 {d}
    //               </div>
    //             ))}
    //             {renderCalendar(leftMonth)}
    //           </div>
    //         </div>

    //         {/* Right Calendar */}
    //         <div className="drp-single-calendar">
    //           <div className="drp-calendar-header">
    //             <div></div>
    //             <span className="drp-month-label">
    //               {rightMonth.format("MMMM YYYY")}
    //             </span>
    //             <button
    //               className="drp-nav-btn"
    //               onClick={() =>
    //                 setRightMonth(moment(rightMonth).add(1, "month"))
    //               }
    //             >
    //               <ChevronRight size={20} />
    //             </button>
    //           </div>
    //           <div className="drp-calendar-grid">
    //             {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
    //               <div key={d} className="drp-day-label">
    //                 {d}
    //               </div>
    //             ))}
    //             {renderCalendar(rightMonth)}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="drp-modal-footer">
    //         <button className="drp-modal-btn drp-cancel" onClick={onClose}>
    //           Cancel
    //         </button>
    //         <button
    //           className="drp-modal-btn drp-confirm"
    //           onClick={() => onApply(startDate, endDate)}
    //         >
    //           Confirm
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
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

export default DateRangePicker;