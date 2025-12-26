import { useState, useEffect, useRef, use } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  Bell,
  HelpCircle,
  User,
  Search,
  LayoutDashboard,
  Key,
  ShieldCheck,
  CreditCard,
  Building2,
  Phone,
  FileText,
  Menu,
  ChevronDown,
  ChevronUp,
  Smartphone,
  Briefcase
} from "lucide-react";
import flowpipeLogo from '../../assets/images/FlowpipeLogo.png'
import { useUserStore } from "../../Store/userStore";
import { toTitleCase } from "../../utils/simpleHellperFn";
// import "../../styles/Dashboard.css";

const sideDashboardConfig = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    type: "single"
  },
  {
    label: "API Keys",
    icon: Key,
    href: "/dashboard/apiKeys",
    type: "single"
  },
  {
    label: "Whitelist IP",
    icon: ShieldCheck,
    href: "/dashboard/WhitelistIP",
    type: "single"
  },

  // ✅ KYC
  {
    label: "KYC",
    icon: FileText,
    type: "group",
    children: [
      { label: "Aadhaar Verification", href: "/dashboard/KYC/aadhaar", method: "POST" },
      { label: "Pan Verification", href: "/dashboard/KYC/Pan", method: "POST" },
      { label: "Pan to Aadhaar", href: "/dashboard/KYC/PanAadhaar", method: "POST" },
      { label: "Bank Account", href: "/dashboard/KYC/Account", method: "POST" },
      { label: "GST Verification", href: "/dashboard/KYC/GSTIN", method: "POST" },
      { label: "Shop Verification", href: "/dashboard/KYC/Shop", method: "POST" },
      { label: "Send OTP", href: "/dashboard/KYC/MobileNumber/otpsend", method: "POST" },
      { label: "Verify OTP", href: "/dashboard/KYC/MobileNumber/otpverify", method: "POST" },
      { label: "Card Verify", href: "/dashboard/KYC/cardValidation", method: "POST" },
      { label: "CIN Verify", href: "/dashboard/KYC/Cin", method: "POST" },
      { label: "Udyam Verify", href: "/dashboard/KYC/Udyam", method: "POST" },
      { label: "Name Verify", href: "/dashboard/KYC/NameMatch", method: "POST" }
    ]
  },

  // ✅ Recharge
  {
    label: "Recharge",
    icon: Smartphone,
    type: "group",
    children: [
      { label: "Fetch Operators", href: "/dashboard/Recharge/Operators", method: "POST" },
      { label: "Fetch Plans", href: "/dashboard/Recharge/Plans", method: "POST" },
      { label: "Fetch Offers", href: "/dashboard/Recharge/Offers", method: "POST" },
      { label: "Recharge URL", href: "/dashboard/Recharge/RecharUrl", method: "POST" },
      { label: "Old Plans", href: "/dashboard/Recharge/OldPlans", method: "POST" }
    ]
  },

  {
    label: "BBPS",
    icon: Briefcase,
    type: "group",
    children: [
      { label: "Fetch Category", href: "/dashboard/bbps/Category", method: "GET" },
      { label: "Fetch Biller Info", href: "/dashboard/bbps/BillerInfo", method: "GET" },
      { label: "Bill Fetch", href: "/dashboard/bbps/BillFetch", method: "GET" },
      { label: "Bill Pay", href: "/dashboard/bbps/BillPay", method: "POST" },
      { label: "Bill Validation", href: "/dashboard/bbps/BillValidation", method: "POST" },
      { label: "Quick Pay", href: "/dashboard/bbps/QuickPay", method: "POST" }
    ]
  },
  {
    label: "InstantPay",
    icon: Briefcase,
    type: "group",
    children: [
      { label: "InstantBill Pay", href: "/dashboard/InstantPayVerification", method: "POST" },
    ]
  }
];

export default function DashboardPage() {
  const [collapsed, setCollapsed] = useState(false);
  const { users, fetchUsers } = useUserStore();
  const navigate = useNavigate('');

  useEffect(() => {
    fetchUsers()
  }, []);

  return (
    <div className="h-screen w-full flex bg-[#0f0f12]">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col">
        <Header onToggle={() => setCollapsed(!collapsed)} onNavigate={(data) => navigate(data)} data={users} />
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9fd]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ collapsed }) {
  const [search, setSearch] = useState("");
  const [openGroups, setOpenGroups] = useState({});
  const searchRef = useRef(null);
  const navigate = useNavigate();

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

  // ✅ Only Search Groups (KYC / Recharge / BBPS)
  const filteredGroups = sideDashboardConfig
    .filter(item => item.type === "group")
    .map(group => ({
      ...group,
      children: group.children.filter(child =>
        child.label.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter(group => group.children.length > 0);

  return (
    <aside
      className={`${collapsed ? "w-20" : "w-64"} bg-[#0c0f14] text-white flex flex-col transition-all`}
    >
      <div className="h-16 flex items-center justify-start gap-3 px-4 border-b border-white/5">
        <img src={flowpipeLogo} width={40} />
        {!collapsed && <span className="font-semibold text-lg">flowpipe</span>}
      </div>

      {!collapsed && (
        <div className="p-4 border-b border-white/5">
          <div className="relative flex items-center bg-white/5 rounded-lg px-3 py-2 ring-1 ring-white/10 focus-within:ring-purple-500">
            <Search size={16} className="text-gray-400" />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full text-white px-2"
              placeholder="Search ..."
            />
          </div>
        </div>
      )}

      <nav className="flex-1 p-2 space-y-1 text-sm overflow-y-auto">
        {sideDashboardConfig.filter(i => i.type === "single").map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={idx}
              onClick={() => navigate(item.href)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition justify-${collapsed ? "center" : "start"} text-gray-300 hover:bg-white/10`}
            >
              <Icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}

        {(search ? filteredGroups : sideDashboardConfig.filter(i => i.type === "group")).map((group, idx) => {
          const Icon = group.icon;
          const isOpen = openGroups[group.label];

          return (
            <div key={idx}>
              <button
                onClick={() =>
                  setOpenGroups(prev => ({
                    ...prev,
                    [group.label]: !prev[group.label]
                  }))
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  {!collapsed && <span>{group.label}</span>}
                </div>
                {!collapsed && (isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </button>

              {(isOpen || search) && !collapsed && (
                <ul className="mt-1 ml-8 space-y-1 text-xs text-gray-300">
                  {group.children.map((child, cidx) => (
                    <li
                      key={cidx}
                      onClick={() => navigate(child.href)}
                      className="cursor-pointer border-l border-gray-300  py-1.5 hover:bg-white/10 hover:text-white"
                    >
                      <span className="text-gray-300 bi bi-dash-lg" ></span>
                      <span className={child.method === "GET" ? "text-green-400" : "text-orange-400"}>
                        {child.method}:
                      </span>{" "}
                      {child.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}

      </nav>
    </aside>
  );
}

function Header({ onToggle, data, onNavigate }) {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className="h-9 w-9 rounded-lg border flex items-center justify-center"
        >
          <Menu size={18} />
        </button>
        <h1 className="text-lg font-semibold">Welcome, {toTitleCase(data?.name)}!</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="px-3 py-1.5 text-sm border border-purple-700 text-purple-700 rounded-lg" onClick={() => onNavigate("WalletToPop")}>Balance</button>
        <button className="px-3 py-1.5 text-sm border border-purple-700 text-purple-700 rounded-lg flex items-center gap-1">
          <HelpCircle size={16} /> Help
        </button>
        <button className="px-3 py-1.5 text-sm border border-purple-700 text-purple-700 rounded-lg flex items-center gap-1">
          <Bell size={16} /> Updates
        </button>
        <button className="relative h-9 w-9 rounded-full border border-purple-700 text-purple-700 flex items-center justify-center" onClick={() => onNavigate('Profile')}>
          <User size={18} />
          {(!data?.IskycApproved || !data?.kycCompleted) && (
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 bg-red-600 rounded-full border-2 border-white" />
          )}
        </button>

      </div>
    </header>
  );
}




