import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  Bell,
  HelpCircle,
  User,
  Search,
  FileText,
  Menu,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Briefcase,
  Zap,
} from "lucide-react";
import flowpipeLogo from "../../assets/images/FlowpipeLogo.png";
import { useUserStore } from "../../Store/userStore";
import Images from "../../Images/Images";
import Help from "../../components/Help/Help";
import { RxPlusCircled } from "react-icons/rx";
import { IoCodeSlashSharp } from "react-icons/io5";
import { HiOutlineBell } from "react-icons/hi";
import "./Dashboard.css";

const sideDashboardConfig = [
  {
    label: "Dashboard",
    icon: Images.Dashboard,
    href: "/dashboard",
    type: "single",
    iconType: "image",
  },
  {
    label: "My Account",
    icon: Images.Myaccount,
    href: "/dashboard/Profile",
    type: "single",
    iconType: "image",
  },
  {
    label: "Products",
    icon: Images.product,
    href: "/dashboard/Products",
    type: "single",
    iconType: "image",
  },
  {
    label: "Reports",
    icon: Images.reports,
    href: "/dashboard/Reports",
    type: "single",
    iconType: "image",
  },
  // ===== TEST API SECTION =====
  {
    label: "Test API",
    icon: Images.Apiusage || FileText,
    type: "group",
    iconType: "image",
    children: [
      // KYC Group
      {
        label: "KYC",
        icon: Images.kyc || FileText,
        type: "subgroup",
        iconType: "image",
        children: [
          {
            label: "Aadhaar Verification",
            href: "/dashboard/KYC/aadhaar",
            method: "POST",
          },
          {
            label: "Pan Verification",
            href: "/dashboard/KYC/Pan",
            method: "POST",
          },
          {
            label: "Pan to Aadhaar",
            href: "/dashboard/KYC/PanAadhaar",
            method: "POST",
          },
          {
            label: "Bank Account",
            href: "/dashboard/KYC/Account",
            method: "POST",
          },
          {
            label: "GST Verification",
            href: "/dashboard/KYC/GSTIN",
            method: "POST",
          },
          {
            label: "Shop Verification",
            href: "/dashboard/KYC/Shop",
            method: "POST",
          },
          {
            label: "Send OTP",
            href: "/dashboard/KYC/MobileNumber/otpsend",
            method: "POST",
          },
          {
            label: "Verify OTP",
            href: "/dashboard/KYC/MobileNumber/otpverify",
            method: "POST",
          },
          {
            label: "Card Verify",
            href: "/dashboard/KYC/cardValidation",
            method: "POST",
          },
          { label: "CIN Verify", href: "/dashboard/KYC/Cin", method: "POST" },
          {
            label: "Udyam Verify",
            href: "/dashboard/KYC/Udyam",
            method: "POST",
          },
          {
            label: "Name Verify",
            href: "/dashboard/KYC/NameMatch",
            method: "POST",
          },
        ],
      },
      // Recharge Group
      {
        label: "Recharge",
        icon: Images.Recharges || Smartphone,
        type: "subgroup",
        iconType: "image",
        children: [
          {
            label: "Fetch Operators",
            href: "/dashboard/Recharge/Operators",
            method: "POST",
          },
          {
            label: "Fetch Plans",
            href: "/dashboard/Recharge/Plans",
            method: "POST",
          },
          {
            label: "Fetch Offers",
            href: "/dashboard/Recharge/Offers",
            method: "POST",
          },
          {
            label: "Recharge URL",
            href: "/dashboard/Recharge/RecharUrl",
            method: "POST",
          },
          {
            label: "Old Plans",
            href: "/dashboard/Recharge/OldPlans",
            method: "POST",
          },
        ],
      },
      // BBPS Group
      {
        label: "BBPS",
        icon: Images.BBPS || Briefcase,
        type: "subgroup",
        iconType: "image",
        children: [
          {
            label: "Fetch Category",
            href: "/dashboard/bbps/Category",
            method: "GET",
          },
          {
            label: "Fetch Biller Info",
            href: "/dashboard/bbps/BillerInfo",
            method: "GET",
          },
          {
            label: "Bill Fetch",
            href: "/dashboard/bbps/BillFetch",
            method: "GET",
          },
          {
            label: "Bill Pay",
            href: "/dashboard/bbps/BillPay",
            method: "POST",
          },
          {
            label: "Bill Validation",
            href: "/dashboard/bbps/BillValidation",
            method: "POST",
          },
          {
            label: "Quick Pay",
            href: "/dashboard/bbps/QuickPay",
            method: "POST",
          },
        ],
      },
      // InstantPay Group
      // {
      //   label: "InstantPay",
      //   icon: Images.InstantPay || Zap,
      //   type: "subgroup",
      //   iconType: "image",
      //   children: [
      //     {
      //       label: "InstantBill Pay",
      //       href: "/dashboard/InstantPayVerification",
      //       method: "POST",
      //     },
      //   ],
      // },
    ],
  },
  {
    label: "Billing & plan",
    icon: Images.Billingplan,
    href: "/dashboard/Billing_plans",
    type: "single",
    iconType: "image",
  },
  {
    label: "API Keys",
    icon: Images.API,
    href: "/dashboard/apiKeys",
    type: "single",
    iconType: "image",
  },
  {
    label: "API Usage",
    icon: Images.testapi,
    href: "/dashboard/APIUsage",
    type: "single",
    iconType: "image",
  },
  {
    label: "Whitelist IP",
    icon: Images.whitelist,
    href: "/dashboard/WhitelistIP",
    type: "single",
    iconType: "image",
  },
  {
    label: "Webhooks",
    icon: Images.whitelist,
    href: "/dashboard/Webhooks",
    type: "single",
    iconType: "image",
  },

];

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [showHelp, setShowHelp] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const navigate = useNavigate("");

  useEffect(() => {
    fetchUsers();

    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    // Optional: Auto-collapse on resize to mobile
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex bg-[#000] relative">
      {/* Mobile Overlay */}
      <div
        className={`mobile-dashboard-overlay ${!collapsed ? "active" : ""}`}
        onClick={() => setCollapsed(true)}
      />

      <Sidebar collapsed={collapsed} onHelpClick={() => setShowHelp(true)} />
      <div className="flex-1 flex flex-col relative w-full overflow-hidden">
        <Header
          onToggle={() => setCollapsed(!collapsed)}
          onNavigate={(data) => navigate(data)}
          data={users}
          onHelpClick={() => setShowHelp(true)}
        />
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9fd]">
          <Outlet />
        </main>
        {showHelp && <Help onClose={() => setShowHelp(false)} />}
      </div>
    </div>
  );
}

function Sidebar({ collapsed, onHelpClick }) {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const [openSubGroups, setOpenSubGroups] = useState({});
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Ctrl + K Global Search Shortcut
  useEffect(() => {
    const handleKey = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const toggleGroup = (groupLabel) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const toggleSubGroup = (parentLabel, childLabel) => {
    const key = `${parentLabel}-${childLabel}`;
    setOpenSubGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // ✅ Filter groups based on search
  const filteredConfig = search
    ? sideDashboardConfig
        .map((item) => {
          if (item.type === "group") {
            const filteredChildren = item.children
              .filter(
                (child) =>
                  child.label.toLowerCase().includes(search.toLowerCase()) ||
                  child.children?.some((subChild) =>
                    subChild.label.toLowerCase().includes(search.toLowerCase()),
                  ),
              )
              .map((child) => ({
                ...child,
                children:
                  child.children?.filter((subChild) =>
                    subChild.label.toLowerCase().includes(search.toLowerCase()),
                  ) || [],
              }))
              .filter(
                (child) =>
                  child.children?.length > 0 ||
                  child.label.toLowerCase().includes(search.toLowerCase()),
              );

            return filteredChildren.length > 0
              ? { ...item, children: filteredChildren }
              : null;
          }
          return item.label.toLowerCase().includes(search.toLowerCase())
            ? item
            : null;
        })
        .filter(Boolean)
    : sideDashboardConfig;

  return (
    <aside
      className={`nav-panel ${collapsed ? "nav-panel--collapsed" : "nav-panel--expanded"}`}
    >
      <div className="h-16 flex items-center justify-start gap-3 px-4 border-b border-white/5">
        <img src={flowpipeLogo} width={40} />
        {!collapsed && <span className="section-title-flowpipe">flowpipe</span>}
      </div>

      {!collapsed && (
        <div className="sidebar-search-wrapper">
          <div className="sidebar-search-box">
            <Search size={16} className="sidebar-search-icon" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sidebar-search-input"
              placeholder="Search APIs..."
            />
          </div>
        </div>
      )}

      <nav className="flex-1 p-2 space-y-2.5 text-sm overflow-y-auto">
        {/* Single Items */}
        {filteredConfig
          .filter((item) => item.type === "single")
          .map((item, idx) => {
            const isActive = location.pathname === item.href;
            return (
              <button
                key={idx}
                onClick={() => navigate(item.href)}
                className={`sidebar-item ${isActive ? "active" : ""}`}
              >
                {item.iconType === "image" ? (
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="sidebar-icon-img"
                  />
                ) : (
                  <item.icon size={18} />
                )}

                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}

        {/* Group Items (Test API) */}
        {filteredConfig
          .filter((item) => item.type === "group")
          .map((group, groupIdx) => {
            const Icon = group.icon;
            const isGroupOpen = openGroups[group.label] || search;

            // Check if any active child exists in this group
            const isGroupActive = group.children?.some((subGroup) =>
              subGroup.children?.some((api) => api.href === location.pathname),
            );

            return (
              <div key={groupIdx} className="sidebar-group">
                {/* Main Group Button (Test API) */}
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`sidebar-item group-header ${collapsed ? "sidebar-collapsed" : "sidebar-expanded-kyc"} ${isGroupActive ? "active" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    {group.iconType === "image" ? (
                      <img
                        src={group.icon}
                        alt={group.label}
                        className="sidebar-icon-img"
                      />
                    ) : (
                      <Icon size={18} />
                    )}
                    {!collapsed && (
                      <span className="group-label">{group.label}</span>
                    )}
                  </div>
                  {!collapsed &&
                    (isGroupOpen ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </button>

                {/* Sub-Groups (KYC, Recharge, BBPS, InstantPay) */}
                {(isGroupOpen || search) && !collapsed && group.children && (
                  <div className="subgroup-container">
                    {group.children.map((subGroup, subIdx) => {
                      const SubIcon = subGroup.icon;
                      const subGroupKey = `${group.label}-${subGroup.label}`;
                      const isSubGroupOpen =
                        openSubGroups[subGroupKey] || search;

                      const isSubGroupActive = subGroup.children?.some(
                        (api) => api.href === location.pathname,
                      );

                      return (
                        <div key={subIdx} className="subgroup">
                          {/* Sub-Group Button */}
                          <button
                            onClick={() =>
                              toggleSubGroup(group.label, subGroup.label)
                            }
                            className={`subgroup-button ${isSubGroupActive ? "text-purple-400" : ""}`}
                          >
                            <div className="flex items-center gap-2">
                              {subGroup.iconType === "image" ? (
                                <img
                                  src={subGroup.icon}
                                  alt={subGroup.label}
                                  className="subgroup-icon"
                                />
                              ) : (
                                <SubIcon size={16} />
                              )}
                              <span
                                className={`subgroup-label ${isSubGroupActive ? "text-purple-400" : ""}`}
                              >
                                {subGroup.label}
                              </span>
                            </div>
                            {subGroup.children &&
                              subGroup.children.length > 0 && (
                                <ChevronDown
                                  size={12}
                                  className={`transition-transform ${isSubGroupOpen ? "rotate-180" : ""}`}
                                />
                              )}
                          </button>

                          {/* API Endpoints */}
                          {(isSubGroupOpen || search) && subGroup.children && (
                            <ul className="api-endpoints">
                              {subGroup.children.map((api, apiIdx) => {
                                const isApiActive =
                                  location.pathname === api.href;
                                return (
                                  <li
                                    key={apiIdx}
                                    onClick={() => navigate(api.href)}
                                    className={`cursor-pointer border-l border-gray-300 py-1.5 hover:bg-white/10 hover:text-white api-endpoint-item ${isApiActive ? "active" : ""}`}
                                  >
                                    <span className="text-gray-300 bi bi-dash-lg"></span>
                                    <div className="api-method-badge">
                                      <span
                                        className={
                                          api.method === "GET"
                                            ? "method-get"
                                            : "method-post"
                                        }
                                      >
                                        {api.method}
                                      </span>
                                    </div>
                                    <span className="api-label">
                                      {api.label}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

        {/* Mobile-Only Header Items (Visible only on mobile via CSS) */}
        {!collapsed && (
          <div className="mobile-sidebar-tools space-y-2 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => navigate("Billing_plans")}
              className="sidebar-item"
            >
              <RxPlusCircled size={18} />
              <span>Balance</span>
            </button>
            <button className="sidebar-item">
              <IoCodeSlashSharp size={18} />
              <span>Developers API</span>
            </button>
            <button className="sidebar-item" onClick={onHelpClick}>
              <HelpCircle size={18} />
              <span>Help</span>
            </button>
            <button className="sidebar-item">
              <HiOutlineBell size={18} />
              <span>Updates</span>
            </button>
            <button
              className="sidebar-item"
              onClick={() => navigate("Profile")}
            >
              <User size={18} />
              <span>My Account</span>
            </button>
          </div>
        )}
      </nav>
    </aside>
  );
}

function Header({ onToggle, data, onNavigate, onHelpClick }) {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const routeTitleMap = {};

  // Build route title map including nested API routes
  const buildRouteMap = (items) => {
    items.forEach((item) => {
      if (item.type === "single") {
        routeTitleMap[item.href] = item.label;
      } else if (item.type === "group") {
        item.children?.forEach((subGroup) => {
          subGroup.children?.forEach((api) => {
            routeTitleMap[api.href] =
              `${item.label} - ${subGroup.label} - ${api.label}`;
          });
        });
      }
    });
  };

  buildRouteMap(sideDashboardConfig);

  const pageTitle = routeTitleMap[location.pathname] || "Dashboard";

  return (
    <header className="Dash-header">
      <div className="Dash-header-left">
        <button onClick={onToggle} className="Dash-header-menu-btn">
          <Menu size={18} />
        </button>
        <h1 className="Dash-header-title">{pageTitle}</h1>
      </div>

      <div className="Dash-header-right">
        <button
          onClick={() => onNavigate("Billing_plans")}
          className="Dash-header-btn"
        >
          <RxPlusCircled size={24} />
          Balance
        </button>

        <button className="Dash-header-btn">
          <IoCodeSlashSharp size={20} />
          Developers API
        </button>

        <button
          className="Dash-header-btn Dash-header-help-btn"
          onClick={onHelpClick}
        >
          <HelpCircle size={20} />
          <span>Help</span>
        </button>

        <button className="Dash-header-btn">
          <HiOutlineBell size={20} />
          <span>Updates</span>
        </button>

        <button
          className="Dash-header-avatar-btn"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <User size={18} />
        </button>

        {isProfileOpen && (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div className="profile-header-info">
              <div className="profile-avatar-circle">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                  alt="User"
                />
              </div>
              <div className="profile-user-details">
                <h4 className="profile-name">Natashia khaleria</h4>
                <p className="profile-email">chennurisrikanth@ntar.com</p>
                <p className="profile-id">06ONQ14174</p>
              </div>
            </div>

            <div className="profile-menu">
              <div
                className="profile-menu-item"
                onClick={() => {
                  onNavigate("Profile");
                  setIsProfileOpen(false);
                }}
              >
                My Account
              </div>
              <div className="profile-divider"></div>

              <div className="profile-menu-item">Change Password</div>
              <div className="profile-divider"></div>
              <div className="profile-menu-item logout">Logout</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
