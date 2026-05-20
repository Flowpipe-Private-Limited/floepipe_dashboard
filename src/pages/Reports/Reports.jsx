import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import "./Reports.css";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../../utils/Apis/apiRequestHandler";
import {
  fetchPublickey,
  HandleCreateReportResponse,
  HandleDownloadReport,
  HandleGetProducts,
  HandlegetReports,
} from "../../utils/Apis/api";
import Cookies from "js-cookie";
import { GeneralKeys } from "../../Store/PubliPriviteKey";
import { useUserkey } from "../../Store/userKeyStore";
import { encryptPayload } from "../../utils/helper";
import { FiDownload } from "react-icons/fi";
import { analytics } from "../../Store/analyticsStore";

const DateRangePicker = ({ isOpen, onClose, onApply }) => {
  const [startDate, setStartDate] = useState(moment().startOf("month"));
  const [endDate, setEndDate] = useState(moment());
  const [activePreset, setActivePreset] = useState("This Month");
  const [leftMonth, setLeftMonth] = useState(moment().startOf("month"));
  const [rightMonth, setRightMonth] = useState(
    moment().add(1, "month").startOf("month"),
  );
  const today = moment().endOf("day");

  const getValidEndDate = (date) => {
    return date.isAfter(today) ? today : date;
  };

  const [selectingStart, setSelectingStart] = useState(true);

  if (!isOpen) return null;

  // const presets = [
  //   {
  //     label: "Today",
  //     action: () => {
  //       setRange(moment(), moment());
  //     },
  //   },
  //   {
  //     label: "Yesterday",
  //     action: () => {
  //       setRange(moment().subtract(1, "days"), moment().subtract(1, "days"));
  //     },
  //   },
  //   {
  //     label: "Last 7 Days",
  //     action: () => {
  //       setRange(moment().subtract(6, "days"), moment());
  //     },
  //   },
  //   {
  //     label: "This Week",
  //     action: () => {
  //       setRange(moment().startOf("week"), moment().endOf("week"));
  //     },
  //   },
  //   {
  //     label: "Last Week",
  //     action: () => {
  //       setRange(
  //         moment().subtract(1, "week").startOf("week"),
  //         moment().subtract(1, "week").endOf("week"),
  //       );
  //     },
  //   },
  //   {
  //     label: "Last 30 Days",
  //     action: () => {
  //       setRange(moment().subtract(29, "days"), moment());
  //     },
  //   },
  //   {
  //     label: "This Month",
  //     action: () => {
  //       setRange(moment().startOf("month"), moment().endOf("month"));
  //     },
  //   },
  //   {
  //     label: "Last Month",
  //     action: () => {
  //       setRange(
  //         moment().subtract(1, "month").startOf("month"),
  //         moment().subtract(1, "month").endOf("month"),
  //       );
  //     },
  //   },
  // ];

  const presets = [
    {
      label: "Today",
      action: () => {
        setRange(today, today);
      },
    },
    {
      label: "Yesterday",
      action: () => {
        const yesterday = moment().subtract(1, "days");
        setRange(yesterday, yesterday);
      },
    },
    {
      label: "Last 7 Days",
      action: () => {
        setRange(moment().subtract(6, "days"), today);
      },
    },
    {
      label: "This Week",
      action: () => {
        setRange(
          moment().startOf("week"),
          getValidEndDate(moment().endOf("week")),
        );
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
        setRange(moment().subtract(29, "days"), today);
      },
    },
    {
      label: "This Month",
      action: () => {
        setRange(
          moment().startOf("month"),
          getValidEndDate(moment().endOf("month")),
        );
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

  // const handleDayClick = (day) => {
  //   if (activePreset !== "Custom") setActivePreset("Custom");

  //   if (selectingStart) {
  //     setStartDate(day);
  //     setEndDate(day);
  //     setSelectingStart(false);
  //   } else {
  //     if (day.isBefore(startDate)) {
  //       setStartDate(day);
  //       setSelectingStart(false);
  //     } else {
  //       setEndDate(day);
  //       setSelectingStart(true);
  //     }
  //   }
  // };
  const handleDayClick = (day) => {
    // Prevent future dates
    if (day.isAfter(today, "day")) return;

    if (activePreset !== "Custom") setActivePreset("Custom");

    if (selectingStart) {
      setStartDate(day);
      setEndDate(day);
      setSelectingStart(false);
    } else {
      // Prevent selecting end date before start date
      if (day.isBefore(startDate, "day")) return;

      setEndDate(day);
      setSelectingStart(true);
    }
  };
  const renderCalendar = (monthMoment) => {
    const startDay = moment(monthMoment).startOf("month").day();
    const daysInMonth = monthMoment.daysInMonth();
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
    }

    // for (let d = 1; d <= daysInMonth; d++) {
    //   const currentDay = moment(monthMoment).date(d);
    //   const isSelected =
    //     currentDay.isSame(startDate, "day") ||
    //     currentDay.isSame(endDate, "day");
    //   const isInRange =
    //     currentDay.isAfter(startDate, "day") &&
    //     currentDay.isBefore(endDate, "day");
    //   const isStart = currentDay.isSame(startDate, "day");
    //   const isEnd = currentDay.isSame(endDate, "day");

    //   let classes = "day-cell";
    //   if (isInRange) classes += " in-range";
    //   if (isStart) classes += " range-start";
    //   if (isEnd) classes += " range-end";
    //   if (isStart || isEnd) classes += " selected";

    //   days.push(
    //     <div
    //       key={d}
    //       className={classes}
    //       onClick={() => handleDayClick(currentDay)}
    //     >
    //       {d}
    //     </div>,
    //   );
    // }

    for (let d = 1; d <= daysInMonth; d++) {
      const currentDay = moment(monthMoment).date(d);

      // Disable future dates
      const isFutureDate = currentDay.isAfter(today, "day");

      // Disable previous dates while selecting end date
      const isBeforeStart =
        !selectingStart && currentDay.isBefore(startDate, "day");

      const isDisabled = isFutureDate || isBeforeStart;

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
      if (isDisabled) classes += " disabled";

      days.push(
        <div
          key={d}
          className={classes}
          onClick={() => {
            if (!isDisabled) {
              handleDayClick(currentDay);
            }
          }}
        >
          {d}
        </div>,
      );
    }
    return days;
  };

  const isLeftNextDisabled = moment(leftMonth)
    .add(1, "month")
    .isSame(rightMonth, "month");

  const isRightPrevDisabled = moment(rightMonth)
    .subtract(1, "month")
    .isSame(leftMonth, "month");

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

                <button
                  className="nav-btn"
                  onClick={() => {
                    const nextLeft = moment(leftMonth).add(1, "month");

                    // Prevent overlap
                    if (!nextLeft.isSame(rightMonth, "month")) {
                      setLeftMonth(nextLeft);
                    }
                  }}
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
                {renderCalendar(leftMonth)}
              </div>
            </div>
            <div className="single-calendar">
              <div className="calendar-header">
                <button
                  className="nav-btn"
                  onClick={() => {
                    const prevRight = moment(rightMonth).subtract(1, "month");

                    // Prevent overlap
                    if (!prevRight.isSame(leftMonth, "month")) {
                      setRightMonth(prevRight);
                    }
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <span className="month-label">
                  {rightMonth.format("MMMM YYYY")}
                </span>

                <button
                  className="nav-btn"
                  onClick={() => {
                    const nextRight = moment(rightMonth).add(1, "month");

                    // Prevent future month navigation
                    if (nextRight.isSameOrBefore(moment(), "month")) {
                      setRightMonth(nextRight);
                    }
                  }}
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
  const [selectedProductId, setSelectedProductId] = useState("Select option");
  const [reportsLoading, setReportsLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState("");
  const [createReportLoading, setCreateReportLoading] = useState(false);
  // const [selectedAppName, setSelectedAppName] = useState("Select option");
  // const [selectedStatus, setSelectedStatus] = useState("Select option");
  const [rangeDropdownOpen, setRangeDropdownOpen] = useState(false);
  const [duration, setDuration] = useState("Select Duration");
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [reportsList, setReportsList] = useState([]);
  const [tempSelectedRange, setTempSelectedRange] = useState("all");
  const [productSearch, setProductSearch] = useState("");
  const [reportSearch, setReportSearch] = useState("");
  const [selectedRange, setSelectedRange] = useState("all");
  const [existError, setExistError] = useState("");
  const [Publickey, setPublickey] = useState("");
  const publicKey = GeneralKeys((state) => state.publicKey);
  const privateKey = GeneralKeys((state) => state.privateKey);
  const TestAccessToken = useUserkey((state) => state.TestAccessToken);
  const LiveAccessToken = useUserkey((state) => state.LiveAccessToken);
  const serviceNameData = analytics((state) => state.serviceNameData);

  useEffect(() => {
    getProducts();
    getPublickey();
  }, []);

  useEffect(() => {
    if (Publickey) {
      getAllReports(selectedRange);
    }
  }, [Publickey]);

  const getPublickey = async () => {
    await ApirequestHandler(
      async () => fetchPublickey(),
      null,
      (res) => {
        const { publicKey } = res;
        console.log("publickey is this :", publicKey);
        setPublickey(publicKey);
      },
      (errMessage) => {
        console.log("error");
      },
    );
  };

  const getAllReports = async (range = "all") => {
    try {
      setReportsLoading(true);

      const payload = {
        client: Cookies.get("clientId"),
        date: range,
      };

      const accesstoken = LiveAccessToken || TestAccessToken;

      if (Publickey) {
        const encryptedPayload = await encryptPayload(payload, Publickey);

        await EncryptedApirequestHandler(
          () => HandlegetReports(encryptedPayload, accesstoken, publicKey),
          null,
          (res) => {
            console.log("res in getting reports =====>>>", res);

            if (res.success) {
              const reportData = res?.data;
              setReportsList(reportData);
            } else {
              setReportsList([]);
            }
          },
          (err) => {
            console.log(err);
          },
        );
      }
    } catch (err) {
      console.log(err);
    } finally {
      setReportsLoading(false);
    }
  };

  const filteredProductsList = productsList.filter((item) =>
    item?.serviceName
      ?.toString()
      .toLowerCase()
      .includes(productSearch.toLowerCase()),
  );

  const filteredReportsList = reportsList.filter((report) =>
    report?.reportName
      ?.toString()
      .toLowerCase()
      .includes(reportSearch.toLowerCase()),
  );

  const getProducts = async () => {
    if (serviceNameData) {
      const modifiedNeededData = [
        { serviceId: "ALLPRODUCTS", serviceName: "All Products" },
        ...serviceNameData,
      ];
      setProductsList(modifiedNeededData);
    } else {
      setProductsList([]);
    }
  };

  // await ApirequestHandler(
  //   () => HandleGetProducts(),
  //   null,
  //   (res) => {
  //     console.log("res in products =====>>>", res);
  //     if (res.success) {
  //       const prodData = res?.data;
  //       const neededData = prodData.map((item) => ({
  //         serviceId: item.serviceId,
  //         serviceName: item.serviceName,
  //       }));
  //       console.log("neededData ====>>>", neededData);
  //       const modifiedNeededData = [
  //         { serviceId: "ALLPRODUCTS", serviceName: "All Products" },
  //         ...neededData,
  //       ];
  //       setProductsList(modifiedNeededData);
  //     } else {
  //       setProductsList([]);
  //     }
  //   },
  //   (err) => {
  //     console.log(err);
  //   },
  // );

  // const appsList = ["Test app", "Live app"];
  // const statusList = ["All", "Success", "Failure"];

  const handleDateApply = (start, end) => {
    setExistError("");
    setDuration(`${start.format("DD/MM/YYYY")} - ${end.format("DD/MM/YYYY")}`);
    setIsDatePickerOpen(false);
  };

  const handleStoreRecord = async () => {
    try {
      setCreateReportLoading(true);

      const payload = {
        client: Cookies.get("clientId"),
        duration: duration,
        service: selectedProduct,
        serviceId: selectedProductId,
      };

      const accesstoken = LiveAccessToken || TestAccessToken;

      const encryptedPayload = await encryptPayload(payload, Publickey);

      await EncryptedApirequestHandler(
        () =>
          HandleCreateReportResponse(encryptedPayload, accesstoken, publicKey),
        null,
        (res) => {
          console.log("res in creating reports =====>>>", res);

          if (res.success) {
            getAllReports();
            handleClear();
          } else {
            console.log("some thing went wrong");
            setExistError(res.message);
          }
        },
        (err) => {
          console.log(err);
          if (err.status == 404) {
            setExistError("No Records Found");
          }
          if (err.status == 400) {
            setExistError("Report Already Exists");
          }
        },
      );
    } catch (err) {
      console.log(err);
    } finally {
      setCreateReportLoading(false);
    }
  };

  const handleApplyFilter = () => {
    setSelectedRange(tempSelectedRange);
    getAllReports(tempSelectedRange);
  };

  const handleClear = () => {
    setDuration("Duration");
    setSelectedProduct("Select option");
    setSelectedProductId("Select option");
  };

  const handleDownloadReport = async (report) => {
    try {
      setDownloadLoading(report?._id || report?.reportName);

      const payload = {
        ...report,
      };

      const encryptedPayload = await encryptPayload(payload, Publickey);

      const accesstoken = LiveAccessToken || TestAccessToken;

      const response = await HandleDownloadReport(
        encryptedPayload,
        accesstoken,
        publicKey,
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute("download", "TransactionDetails.xlsx");

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    } finally {
      setDownloadLoading("");
    }
  };

  const rangeOptions = [
    { label: "All", value: "all" },
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "last30days" },
  ];

  return (
    <div className="reports-container">
      <Eachpage_header headertitle={"Reports"} />
      <div className="filter-card">
        <div className="filter-header">
          <h2 className="filter-title">Filter By</h2>
          <button className="clear-all-btn" onClick={handleClear}>
            Clear All
          </button>
        </div>

        <div className="filter-grid">
          {/* <div className="form-group">
            <p className="label">Products</p>
            <div
              className="custom-select-trigger"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              {selectedProduct} <MdOutlineArrowDropDown size={22} />
            </div>
            {productsOpen && (
              <div className="select-dropdown-menu">
                {productsList.map((item, i) => (
                  <div
                    key={i}
                    className="select-option"
                    onClick={() => {
                      setSelectedProduct(item.serviceName);
                      setSelectedProductId(item.serviceId);
                      setProductsOpen(false);
                      setExistError("");
                    }}
                  >
                    {item.serviceName}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          <div className="form-group">
  <p className="label">Products</p>

  <div
    className="custom-select-trigger"
    onClick={() => setProductsOpen(!productsOpen)}
  >
    <span className="selected-product-text">{selectedProduct}</span>

    <MdOutlineArrowDropDown
      size={22}
      className={`dropdown-arrow_reports ${productsOpen ? "open" : ""}`}
    />
  </div>

  {productsOpen && (
    <div className="select-dropdown-menu">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search product..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
          className="dropdown-search-input"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      <div className="dropdown-options-list">
        {filteredProductsList.length > 0 ? (
          filteredProductsList.map((item, i) => (
            <div
              key={i}
              className={`select-option ${
                selectedProductId === item.serviceId ? "active-option" : ""
              }`}
              onClick={() => {
                setSelectedProduct(item.serviceName);
                setSelectedProductId(item.serviceId);
                setProductsOpen(false);
                setExistError("");
                setProductSearch("");
              }}
            >
              {item.serviceName}
            </div>
          ))
        ) : (
          <div className="no-results-found">No products found</div>
        )}
      </div>
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

          {/* <div className="form-group">
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
          </div> */}

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
          <button
            className="run-report-btn"
            onClick={handleStoreRecord}
            disabled={createReportLoading}
          >
            {createReportLoading ? "Generating..." : "Run Report"}
          </button>
          {existError && <p className="error_show">{existError}</p>}
        </div>
      </div>

      <div className="page-header-card">
        <div className="table-header">
          <div className="filter-title">Result Set</div>

          <div className="range-filter-container">
            <div className="reports-search-wrapper">
              <input
                type="text"
                placeholder="Search reports..."
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
                className="reports-search-input"
              />
            </div>
            <div className="custom-range-dropdown">
              <div
                className="range-dropdown-trigger"
                onClick={() => setRangeDropdownOpen(!rangeDropdownOpen)}
              >
                <span className="selected-range-text">
                  {rangeOptions.find((item) => item.value === tempSelectedRange)
                    ?.label || "Select Range"}
                </span>
                <MdOutlineArrowDropDown
                  size={22}
                  className={`dropdown-arrow_reports ${rangeDropdownOpen ? "open" : ""}`}
                />
              </div>

              {rangeDropdownOpen && (
                <div className="range-dropdown-menu">
                  <div className="range-options-container">
                    {rangeOptions.map((item, i) => (
                      <label key={i} className="range-option-item">
                        <div className="range-option-left">
                          <input
                            type="checkbox"
                            checked={tempSelectedRange === item.value}
                            onChange={() => {
                              setTempSelectedRange(item.value);
                            }}
                          />

                          <span>{item.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="range-dropdown-footer">
                    <button
                      className="range-apply-btn"
                      disabled={reportsLoading}
                      onClick={() => {
                        handleApplyFilter();
                        setRangeDropdownOpen(false);
                      }}
                    >
                      {reportsLoading ? "Loading..." : "Apply"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="result-placeholder">
          <div className="report-table-wrapper">
            {reportsLoading ? (
              <div className="table-loader-container">
                <div className="table-loader"></div>
                <p>Loading reports...</p>
              </div>
            ) : filteredReportsList && filteredReportsList.length > 0 ? (
              <table className="report-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>REPORT NAME</th>
                    <th>GENERATED AT</th>
                    {/* <th>STATUS</th> */}
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReportsList.map((report, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 || "Transactions"}</td>

                        <td className="report-name">
                          {report?.reportName || "N/A"}
                        </td>

                        <td>
                          {report?.createdDate && report?.createdTime
                            ? `${report.createdDate} ${report.createdTime}`
                            : "N/A"}
                        </td>

                        {/* <td>
                          <span
                            className={`status-badge ${
                              report?.status?.toLowerCase() || "completed"
                            }`}
                          >
                            {report?.status || "Completed"}
                          </span>
                        </td> */}

                        <td className="action-cell">
                          <button
                            className="download-btn"
                            onClick={() => handleDownloadReport(report)}
                            disabled={
                              downloadLoading ===
                              (report?._id || report?.reportName)
                            }
                          >
                            {downloadLoading ===
                            (report?._id || report?.reportName) ? (
                              <div className="btn-loader"></div>
                            ) : (
                              <FiDownload size={18} />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="empty-placeholder">
                <FileText size={24} color="#00000099" />

                <p>
                  Search/Filter parameters and "Run report" to generate the
                  result set
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
