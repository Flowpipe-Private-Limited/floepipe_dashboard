import React, { useState, useEffect } from "react";
import {
  Mail,
  Smartphone,
  FileCheck,
  Layers,
  ChevronDown,
  Lock,
} from "lucide-react";
import "./Trial_Center.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLocation } from "react-router-dom";

const Trial_Center = () => {
  const [filter, setFilter] = useState("All Products");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const location = useLocation();
  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsDropdownOpen(false);
  };
  useEffect(() => {
    if (location.state?.defaultFilter) {
      setFilter(location.state.defaultFilter);
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const products = [
    {
      id: 1,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 2,
      title: "Phone Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Smartphone size={24} />,
      iconColor: "green",
    },
    {
      id: 3,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 4,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 5,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 6,
      title: "KYC Verification Pro",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: null,
      status: "Run Trial",
      buttonText: "Run Trial",
      icon: <FileCheck size={24} />,
      iconColor: "purple",
    },
    {
      id: 7,
      title: "Phone Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Smartphone size={24} />,
      iconColor: "green",
    },
    {
      id: 8,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 9,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
    {
      id: 10,
      title: "Phone Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Smartphone size={24} />,
      iconColor: "green",
    },
    {
      id: 11,
      title: "KYC Verification Pro",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: null,
      status: "Run Trial",
      buttonText: "Run Trial",
      icon: <FileCheck size={24} />,
      iconColor: "purple",
    },
    {
      id: 12,
      title: "Email Verification",
      description:
        "Validate email addresses in real-time with syntax, verification.",
      credits: 13,
      status: "Run Trial",
      icon: <Mail size={24} />,
      iconColor: "purple",
    },
  ];
  const filteredProducts =
    filter === "All Products"
      ? products
      : products.filter((p) => {
          if (filter === "Pendding Approvals") return p.status === "Pending";
          return p.status === filter;
        });

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div className="products-title-group">
          <div className="products-title-text">Trial Center</div>
          <p className="products-subtitle">Products are available for Trial</p>
        </div>

        {/* <div className="filter-dropdown-container">
          <button className="filter-toggle-btn" onClick={toggleDropdown}>
            {filter} <IoMdArrowDropdown size={24} />
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-item" onClick={() => handleFilterSelect('All Products')}>
                <span className="dot all"></span> All Products 
              </li>
              <li className="dropdown-item" onClick={() => handleFilterSelect('Subscribed')}>
                <span className="dot subscribed"></span> Subscribed
              </li>
              <li className="dropdown-item" onClick={() => handleFilterSelect('UnSubscribed')}>
                <span className="dot unsubscribed"></span> UnSubscribed
              </li>
              <li className="dropdown-item" onClick={() => handleFilterSelect('Pendding Approvals')}>
                <span className="dot pending"></span> Pendding Approvals
              </li>
            </ul>
          )}
        </div> */}
      </div>

      {/* Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.status === "Pending" && (
              <div className="pending-label">
                <Lock size={10} /> Pending
              </div>
            )}

            <div>
              <div className={`icon-container ${product.iconColor}`}>
                {React.cloneElement(product.icon, { size: 20 })}{" "}
              </div>
              <div className="product-info">
                <div className="product-title-text">{product.title}</div>
                <p className="product-desc">{product.description}</p>
              </div>
            </div>

            <div className="card-footer">
              {product.credits !== null ? (
                <div className="credits-info">
                  <Layers size={14} color="#8b5cf6" />
                  Available credits :{product.credits}
                </div>
              ) : (
                <div
                  style={{ color: "var(--orange-300)" }}
                  className="credits-info"
                >
                  Awaiting approval
                </div>
              )}

              <button
                className={`action-btn ${product.status === "UnSubscribed" ? "unsubscribed" : "subscribed"}`}
              >
                {product.buttonText || product.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trial_Center;
