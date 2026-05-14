import { useState, useEffect, useRef } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  User,
  Search,
  FileText,
  Menu,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Briefcase,
  Zap,
  Moon,
  CreditCard,
  Building2,
  BadgeCheck,
  Car,
  ScanFace,
  FileSearch,
  Files,
  Phone,
  MapPin,
  ShieldAlert,
  Stethoscope,
  MoreHorizontal,
    Sun,
} from "lucide-react";
import flowpipeLogo from "../../assets/images/FlowpipeLogo.png";
import { useUserStore } from "../../Store/userStore";
import Images from "../../Images/Images";
import Help from "../../components/Help/Help";
import { HiOutlineBell } from "react-icons/hi";
import Cookies from "js-cookie";
import {
  SERVICES_METADATA,
  KYC_CATEGORIES,
} from "../../utils/KYCContext/servicesMetadata";
import "./Dashboard.css";
import Logout from "../../components/Logout/Logout";
import FlowpipeUnlockModal from "../../components/profile/PinVerify/FpinVerify";
import { useUserkey } from "../../Store/userKeyStore";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { getTransactionsData, HandleApiCount } from "../../utils/Apis/api";
import { GeneralKeys } from "../../Store/PubliPriviteKey";
import { generateFrontendKeyPair } from "../../utils/helper";

const LucideIcons = {
  FileText,
  Briefcase,
  User,
  CreditCard,
  Building2,
  BadgeCheck,
  Car,
  ScanFace,
  FileSearch,
  Files,
  Phone,
  MapPin,
  ShieldAlert,
  Stethoscope,
  MoreHorizontal,
};

// Helper to group services by category for the sidebar
const generateKycSidebarItems = () => {
  const groups = {};

  // Group metadata by categoryId
  SERVICES_METADATA.forEach((service) => {
    if (!groups[service.categoryId]) {
      groups[service.categoryId] = [];
    }
    groups[service.categoryId].push({
      label: service?.label,
      href: `/dashboard/KYC/${service.id}`,
      method: service.config.apiUrl.Method,
      type: "service",
    });
  });

  const kycCategories = Object.keys(groups).map((catId) => {
    const category = KYC_CATEGORIES[catId];
    return {
      label: category?.label,
      type: "category",
      children: groups[catId],
    };
  });

  return [
    {
      label: "KYC",
      icon: Images.kyc || FileText,
      type: "subgroup",
      iconType: "image",
      children: kycCategories,
    },
  ];
};

const sideDashboardConfig = [
  {
    label: "Dashboard",
    icon: Images.Dashboard,
    type: "group",
    iconType: "image",
    children: [
      {
        label: "OverView",
        href: "/dashboard",
      },
      {
        label: "View Analytics",
        href: "/dashboard/viewAnalytics",
      },
    ],
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
  {
    label: "Test API",
    icon: Images.testapi || FileText,
    type: "group",
    iconType: "image",
    children: [
      {
        label: "Generate secret_token",
        icon: Images.kyc || FileText,
        type: "subgroup",
        iconType: "image",
        children: [
          {
            label: "Generate Secret Token",
            href: "/dashboard/generate/SecretToken",
            method: "POST",
          },
        ],
      },
      ...generateKycSidebarItems(),
      {
        label: "Recharge",
        icon: Images.Recharges || Smartphone,
        type: "subgroup",
        iconType: "image",
        children: [
          {
            label: "Fetch Operators",
            href: "/dashboard/Recharge/recharge_operators",
            method: "POST",
          },
          {
            label: "Fetch Plans",
            href: "/dashboard/Recharge/recharge_plans",
            method: "POST",
          },
          {
            label: "Fetch Offers",
            href: "/dashboard/Recharge/recharge_offers",
            method: "POST",
          },
          {
            label: "Recharge URL",
            href: "/dashboard/Recharge/recharge_recharge_url",
            method: "POST",
          },
          {
            label: "Old Plans",
            href: "/dashboard/Recharge/recharge_old_plans",
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
            href: "/dashboard/BBPS/bbps_category",
            method: "GET",
          },
          {
            label: "Fetch Biller Info",
            href: "/dashboard/BBPS/bbps_biller_info",
            method: "GET",
          },
          {
            label: "Bill Fetch",
            href: "/dashboard/BBPS/bbps_bill_fetch",
            method: "GET",
          },
          {
            label: "Bill Pay",
            href: "/dashboard/BBPS/bbps_bill_pay",
            method: "POST",
          },
          {
            label: "Bill Validation",
            href: "/dashboard/BBPS/bbps_bill_validation",
            method: "POST",
          },
          {
            label: "Quick Pay",
            href: "/dashboard/BBPS/bbps_quick_pay",
            method: "POST",
          },
        ],
      },
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
  // {
  //   label: "API Usage",
  //   icon: Images.Apiusage,
  //   href: "/dashboard/APIUsage",
  //   type: "single",
  //   iconType: "image",
  // },
  {
    label: "Whitelist IP",
    icon: Images.whitelist,
    href: "/dashboard/WhitelistIP",
    type: "single",
    iconType: "image",
  },
  // {
  //   label: "Webhooks",
  //   icon: Images.webhooks,
  //   href: "/dashboard/Webhooks",
  //   type: "single",
  //   iconType: "image",
  // },
];

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 1024);
  const [showHelp, setShowHelp] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const fetchWhitelistIPs = useUserkey((state) => state.fetchWhitelistIPs);
  const isLocked = useUserStore((state) => state.isLocked);
  const setIsLocked = useUserStore((state) => state.setIsLocked);
  const setPubKey = GeneralKeys((state) => state.setPubKey);
  const navigate = useNavigate("");
  const fetchUserskeys = useUserkey((state) => state.fetchUserskeys);

  useEffect(() => {
    fetchUsers();
    fetchWhitelistIPs();
    fetchUserskeys();
    setKeys();
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
  }, []);

  const setKeys = async() =>{
     const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair();
      await setPubKey({ publicKey: publicKeyPem, privateKey: privateKeyPem });
  }

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="dashboard-container-main">
      {/* Mobile Overlay */}
      <div
        className={`mobile-dashboard-overlay ${!collapsed ? "active" : ""}`}
        onClick={() => setCollapsed(true)}
      />

      <Sidebar
        collapsed={collapsed}
        data={users}
        onHelpClick={() => setShowHelp(true)}
      />
      <div className="main-layout">
        <Header
          onToggle={() => setCollapsed(!collapsed)}
          onNavigate={(path, options) => navigate(path, options)}
          data={users}
          onHelpClick={() => setShowHelp(true)}
          onLogoutClick={() => setShowLogout(true)}
        />
        <main className="main-content-area">
          <Outlet />
        </main>
        {showHelp && <Help onClose={() => setShowHelp(false)} />}
        <Logout
          isOpen={showLogout}
          onClose={() => setShowLogout(false)}
          onConfirm={() => {
            Cookies.remove("clientId");
            Cookies.remove("token");
            setShowLogout(false);
            navigate("/login");
          }}
        />
        {isLocked && (
          <FlowpipeUnlockModal
            isVisible={isLocked}
            IsValidPIN={(status) => setIsLocked(!status)}
          />
        )}
      </div>
    </div>
  );
}

function Sidebar({ collapsed, data, onHelpClick }) {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const [openSubGroups, setOpenSubGroups] = useState({});
  const [openKycCategories, setOpenKycCategories] = useState({});
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Ctrl + K Global Search Shortcut
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
      [groupLabel]: !prev[groupLabel],
    }));
  };

  const toggleSubGroup = (parentLabel, childLabel) => {
    const key = `${parentLabel}-${childLabel}`;
    setOpenSubGroups((prev) => ({
      [key]: !prev[key],
    }));
  };

  const toggleKycCategory = (catLabel) => {
    setOpenKycCategories((prev) => ({
      [catLabel]: !prev[catLabel],
    }));
  };

  // Auto-expand sidebar when location changes
  useEffect(() => {
    if (search) return;

    let expandedGroup = {};
    let expandedSubGroup = {};
    let expandedKycCat = {};

    sideDashboardConfig?.forEach((group) => {
      if (group?.type === "group") {
        group?.children?.forEach((subgroup) => {
          const subgroupKey = `${group?.label}-${subgroup?.label}`;

          if (subgroup?.href === location?.pathname) {
            expandedGroup[group?.label] = true;
          }

          subgroup?.children?.forEach((child) => {
            if (child?.href === location?.pathname) {
              expandedGroup[group?.label] = true;
              expandedSubGroup[subgroupKey] = true;
            }

            if (child?.children) {
              child?.children?.forEach((api) => {
                if (api?.href === location?.pathname) {
                  expandedGroup[group?.label] = true;
                  expandedSubGroup[subgroupKey] = true;
                  expandedKycCat[child?.label] = true;
                }
              });
            }
          });
        });
      }
    });

    if (Object.keys(expandedGroup).length > 0) setOpenGroups(expandedGroup);
    if (Object.keys(expandedSubGroup).length > 0)
      setOpenSubGroups(expandedSubGroup);
    if (Object.keys(expandedKycCat).length > 0)
      setOpenKycCategories(expandedKycCat);
  }, [location?.pathname, search]);

  // Filter groups based on search
  const filteredConfig = search
    ? sideDashboardConfig
      .map((item) => {
        if (item?.type === "group") {
          const filteredChildren = (item.children || [])
            .filter(
              (child) =>
                (child?.label || "")
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                child?.children?.some(
                  (subChild) =>
                    (subChild?.label || "")
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    subChild?.children?.some((leaf) =>
                      (leaf?.label || "")
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    ),
                ),
            )
            .map((child) => ({
              ...child,
              children:
                (child?.children || [])
                  ?.map((subChild) => {
                    if (subChild?.children) {
                      return {
                        ...subChild,
                        children: subChild.children.filter((leaf) =>
                          (leaf?.label || "")
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                        ),
                      };
                    }
                    return subChild;
                  })
                  .filter(
                    (subChild) =>
                      (subChild?.label || "")
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                      (subChild?.children && subChild.children.length > 0),
                  ) || [],
            }))
            .filter(
              (child) =>
                (child?.children || [])?.length > 0 ||
                (child?.label || "")
                  .toLowerCase()
                  .includes(search.toLowerCase()),
            );

          return filteredChildren.length > 0
            ? { ...item, children: filteredChildren }
            : null;
        }
        return (item?.label || "")
          .toLowerCase()
          .includes(search.toLowerCase())
          ? item
          : null;
      })
      .filter(Boolean)
    : sideDashboardConfig;

  return (
    <aside
      className={`nav-panel ${collapsed ? "nav-panel--collapsed" : "nav-panel--expanded"}`}
    >
      {!collapsed && (
        <div className="sidebar-greeting">
          <h2 className="greeting-main">
            Welcome back, <br />
            <span className="greeting-name">{data?.fullName || "Bro"}!</span>
          </h2>
          <p className="greeting-sub">Manage payments here.</p>
        </div>
      )}

      {collapsed && (
        <div className="sidebar-logo-container">
          <img src={flowpipeLogo} width={32} alt="Logo" />
        </div>
      )}

      {!collapsed && (
        <div className="sidebar-search-wrapper">
          <div className="sidebar-search-box">
            <Search size={18} className="sidebar-search-icon" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sidebar-search-input"
              placeholder="Search"
            />
          </div>
        </div>
      )}

      <nav className="sidebar-nav-container">
        {filteredConfig.map((item, idx) => {
          /* ================= SINGLE ITEMS ================= */
          if (item.type === "single") {
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
                    /* ✅ Active = #ccff00, Default = black */
                    className={`sidebar-icon-img ${isActive ? "sidebar-icon-active" : "sidebar-icon-default"}`}
                  />
                ) : (
                  <item.icon size={18} />
                )}

                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          }

          /* ================= GROUP ITEMS (TEST API) ================= */
          if (item.type === "group") {
            const Icon = item.icon;
            const isGroupOpen = openGroups[item.label] || search;

            const isGroupActive = item.href === location.pathname;

            return (
              <div key={idx} className="sidebar-group">
                <button
                  onClick={() => toggleGroup(item.label)}
                  className={`sidebar-item group-header ${collapsed ? "sidebar-collapsed" : "sidebar-expanded-kyc"
                    } ${isGroupActive ? "active" : ""}`}
                >
                  <div className="flex-items-center-gap-3">
                    {item.iconType === "image" ? (
                      <img
                        src={item.icon}
                        alt={item.label}
                        /* ✅ Active = #ccff00, Default = black */
                        className={`sidebar-icon-img ${isGroupActive ? "sidebar-icon-active" : "sidebar-icon-default"}`}
                      />
                    ) : (
                      <Icon size={18} />
                    )}

                    {!collapsed && (
                      <span className="group-label">{item.label}</span>
                    )}
                  </div>

                  {!collapsed &&
                    (isGroupOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    ))}
                </button>

                {/* ================= SUBGROUPS ================= */}
                {(isGroupOpen || search) && !collapsed && item.children && (
                  <div className="subgroup-container">
                    {item.children.map((subGroup, subIdx) => {
                      const SubIcon = subGroup.icon;
                      const subGroupKey = `${item.label}-${subGroup.label}`;
                      const isSubGroupOpen =
                        openSubGroups[subGroupKey] || search;

                      const isSubGroupActive =
                        subGroup.href === location.pathname;

                      return (
                        <div key={subIdx} className="subgroup">
                          {/* Subgroup Button */}
                          <button
                            onClick={() => {
                              if (subGroup.href) navigate(subGroup.href);
                              toggleSubGroup(item.label, subGroup.label);
                            }}
                            className={`subgroup-button ${isSubGroupActive ? "active-subgroup-text" : ""
                              }`}
                          >
                            <div className="flex-items-center-gap-2">
                              {subGroup.icon && (subGroup.iconType === "image" ? (
                                <img
                                  src={subGroup.icon}
                                  alt={subGroup.label}
                                  /* ✅ Active = #ccff00, Default = black */
                                  className={`subgroup-icon ${isSubGroupActive ? "subgroup-icon-active" : "subgroup-icon-default"}`}
                                />
                              ) : (
                                <SubIcon size={16} />
                              ))}

                              <span
                                className={`subgroup-label ${isSubGroupActive ? "active-subgroup-text" : ""
                                  }`}
                              >
                                {subGroup.label}
                              </span>
                            </div>

                            {subGroup.children?.length > 0 && (
                              <ChevronDown
                                size={18}
                                className={`transition-transform ${isSubGroupOpen ? "rotate-180" : ""
                                  }`}
                              />
                            )}
                          </button>

                          {/* ================= API ENDPOINTS / CATEGORIES ================= */}
                          {(isSubGroupOpen || search) && subGroup.children && (
                            <ul className="api-endpoints">
                              {subGroup.children.map((child, childIdx) => {
                                // Render Category Dropdown
                                if (child.children) {
                                  const isCatOpen =
                                    openKycCategories[child.label] || search;
                                  return (
                                    <li
                                      key={childIdx}
                                      className="category-dropdown-wrapper"
                                    >
                                      <button
                                        onClick={() =>
                                          toggleKycCategory(child.label)
                                        }
                                        className="category-toggle-btn"
                                      >
                                        <div className="flex-items-center-gap-2">
                                          <span>{child.label}</span>
                                        </div>
                                        <ChevronDown
                                          size={18}
                                          className={`transition-transform ${isCatOpen ? "rotate-180" : "-rotate-90"}`}
                                        />
                                      </button>

                                      {isCatOpen && (
                                        <ul className="nested-endpoints">
                                          {child.children.map((api, apiIdx) => {
                                            const isApiActive =
                                              location.pathname === api.href;
                                            return (
                                              <li
                                                key={apiIdx}
                                                onClick={() =>
                                                  navigate(api.href)
                                                }
                                                className={`cursor-pointer border-l border-gray-300 py-1.5 hover:bg-white/10 hover:text-white api-endpoint-item ${isApiActive ? "active" : ""}`}
                                              >
                                                <span className="sidebar-dash-icon"></span>
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
                                    </li>
                                  );
                                }

                                // Render standard endpoint
                                const isApiActive =
                                  location.pathname === child.href;
                                return (
                                  <li
                                    key={childIdx}
                                    onClick={() => navigate(child.href)}
                                    className={`cursor-pointer border-l border-gray-300 py-1.5 hover:bg-white/10 hover:text-white api-endpoint-item ${isApiActive ? "active" : ""}`}
                                  >
                                    <span className="text-gray-300"></span>
                                    <div className="api-method-badge">
                                      <span
                                        className={
                                          child.method === "GET"
                                            ? "method-get"
                                            : "method-post"
                                        }
                                      >
                                        {child.method}
                                      </span>
                                    </div>
                                    <span className="api-label">
                                      {child.label}
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
          }

          return null;
        })}
      </nav>
    </aside>
  );
}

function Header({ onToggle, data, onNavigate, onHelpClick, onLogoutClick }) {
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

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new Event("themeChange"));
  };

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
        {/* <button onClick={onToggle} className="Dash-header-menu-btn">
          <Menu size={18} />
        </button> */}
        <div className="Dash-search-container">
          <Search size={18} className="Dash-search-icon" />
          <input
            type="text"
            placeholder="Search for anything..."
            className="Dash-search-input"
          />
        </div>
      </div>

      <div className="Dash-header-right">
        <button className="Dash-notif-btn">
          <HiOutlineBell size={24} />
        </button>

        <button
          className="Dash-header-avatar-btn"
          onClick={() => setIsProfileOpen(!isProfileOpen)}
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
            alt="User avatar"
            className="Dash-header-avatar-img"
          />
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
                  onNavigate("Profile", { state: { activeTab: "basic" } });
                  setIsProfileOpen(false);
                }}
              >
                My Account
              </div>
              <div className="profile-divider"></div>

              <div className="profile-menu-item-spaced" onClick={toggleTheme}>
                <div className="flex-items-center-gap-2">
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
                </div>
                <div
                  className={`theme-toggle-switch ${theme === "dark" ? "dark-active" : ""}`}
                >
                  <div
                    className={`theme-toggle-thumb ${theme === "dark" ? "shifted" : ""}`}
                  ></div>
                </div>
              </div>
              <div className="profile-divider"></div>

              <div
                className="profile-menu-item"
                onClick={() => {
                  onNavigate("Profile", { state: { activeTab: "settings" } });
                  setIsProfileOpen(false);
                }}
              >
                Change Password
              </div>
              <div className="profile-divider"></div>
              <div
                className="profile-menu-item-logout"
                onClick={() => {
                  onLogoutClick();
                  setIsProfileOpen(false);
                }}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
