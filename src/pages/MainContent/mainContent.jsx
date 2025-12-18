import { FiBell, FiHelpCircle, FiPlusCircle } from "react-icons/fi"
import { useNavigate } from "react-router-dom"
import "../../styles/mainContent.css";


const MainContent = () => {
    const navigate = useNavigate()
  return (
    <div className="dashboard-container">

      {/* ===== TOP SUMMARY ===== */}
      <div className="dashboard-top">

        {/* WALLET */}
        <div className="wallet-card">
          <span className="wallet-label">API WALLET</span>
          <h2 className="wallet-amount">₹ 2,465.08</h2>

          <div className="wallet-actions">
            <span>View Statement</span>
            <span>Add Money</span>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-title">Money in</p>
            <h3 className="stat-value">₹ 15,432</h3>
            <span className="stat-sub">0.00% vs This Month</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Product Subscribed</p>
            <h3 className="stat-value">15,432</h3>
            <button className="outline-btn">View Products</button>
          </div>

          <div className="stat-card">
            <p className="stat-title">Transaction Volume</p>
            <h3 className="stat-value">₹ 15,432</h3>
            <span className="stat-sub">0.00% vs This Month</span>
          </div>

          <div className="stat-card">
            <p className="stat-title">Product Requests</p>
            <h3 className="stat-value">15,432</h3>
            <button className="outline-btn">View Requests</button>
          </div>
        </div>

        {/* PROMO */}
        <div className="promo-card">
          <h3>Manage your finance at your fingertips</h3>
          <p>Download App Now</p>
        </div>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions">
        {[
          "View API Keys",
          "Integration Guide",
          "View Analytics",
          "Start Free Trial",
          "Wallet Statement",
          "Add Balance",
          "Usage Reports",
          "Billing History"
        ].map((title, idx) => (
          <div className="quick-card" key={idx}>
            <div className="quick-icon" />
            <h4>{title}</h4>
            <p>Lorem ipsum dolor sit amet</p>
            <span className="quick-link">Get started →</span>
          </div>
        ))}
      </div>

    </div>
  );


}
export default MainContent