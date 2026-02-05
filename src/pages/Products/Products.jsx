import React, { useEffect, useState, useRef } from "react";
import { FileCheck, Layers, ChevronRight } from "lucide-react";
import "./Products.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { ClientService } from "../../utils/Apis/api";
import { SubscribeService } from "../../utils/Apis/api";
import { DashboardServices } from "../../utils/Apis/api";

const Products = () => {
  const [filter, setFilter] = useState("All Products");

  const scrollContainerRef = useRef(null);

  // Dummy categories
  const categories = [
    "Active",
    "PAN Services",
    "GST Services",
    "Aadhaar & DigiLocker",
    "Banking & Financial",
    "Business & Company",
    "Employment & Income",
    "Vehicle & Transport",
    "Face & AI Verification",
    "OCR & Document AI",
    "Government ID Services",
    "Contact & Communication",
    "Geo & Location",
    "Risk & Due Diligence",
    "Other Services",
  ];

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsDropdownOpen(false);
  };

  const fetchDashboardProducts = async () => {
    console.group("📊 fetchDashboardProducts");

    await ApirequestHandler(
      () => DashboardServices(),
      null,
      (res) => {
        console.log("Dashboard API Success Response:", res);

        if (res?.success && Array.isArray(res?.data)) {
          console.table(res.data);

          const mappedProducts = res.data.map((item, index) => {
            console.log(
              `Mapping serviceId: ${item.serviceId}, status: ${item.status}`,
            );

            return {
              id: index + 1,
              serviceId: item.serviceId,
              title: item.serviceName,
              description: "Validate details in real-time with high accuracy.",
              credits: item.testLimit,
              status: item?.status ?? "Not Subscribed",
              icon: <FileCheck size={24} />,
              iconColor: "purple",
            };
          });

          console.log("Dashboard mapped products:", mappedProducts);
          setProducts(mappedProducts);
        } else {
          console.warn("Dashboard API returned invalid data structure", res);
        }
      },
      (errMessage) => {
        console.error(" Dashboard API Error:", errMessage);
      },
    );

    console.groupEnd();
  };

  const fetchClientServices = async () => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) return;

    await ApirequestHandler(
      () => ClientService(clientId),
      null,
      (res) => {
        if (res.success && res.data && Array.isArray(res.data)) {
          const clientServices = res.data;

          setProducts((prevProducts) =>
            prevProducts.map((p) => {
              const clientService = clientServices.find(
                (s) => s.serviceId === p.serviceId,
              );
              return clientService ? { ...p, status: clientService.status } : p;
            }),
          );
        }
      },
      (errMessage) => {
        console.log("Server Error:", errMessage);
      },
    );
  };

  const handleSubscribe = async (serviceId) => {
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        console.error("clientId missing");
        return;
      }

      const payload = {
        clientId,
        serviceId,
        status: "Pending",
      };

      const res = await SubscribeService(payload);
      console.log("Subscribe response:", res.data);

      if (res.data.success) {
        // Update the product status in state immediately
        setProducts((prev) =>
          prev.map((p) =>
            p.serviceId === serviceId ? { ...p, status: "Pending" } : p,
          ),
        );

        setFilter("Pendding Approvals");
      }
    } catch (error) {
      console.error("Subscribe error:", error);
    }
  };
  useEffect(() => {
    const loadData = async () => {
      await fetchDashboardProducts();
      await fetchClientServices();
    };
    loadData();
  }, []);

  const filteredProducts =
    filter === "All Products"
      ? products
      : products.filter((p) => {
        if (filter === "Subscribed") {
          return p.status === "Subscribed";
        }

        if (filter === "Pendding Approvals") {
          return p.status === "Pending";
        }

        if (filter === "Subscribe") {
          // Show products that are NOT subscribed and NOT pending
          return (
            !p.status ||
            p.status === "Unsubscribed" ||
            p.status === "Not Subscribed" ||
            p.status === "Subscribe"
          );
        }

        return true;
      });

  return (
    <div className="products-container">
      {/* CATEGORY SLIDER */}
      <div className="category-slider-section">
        <div className="category-scroll-wrapper" ref={scrollContainerRef}>
          {categories.map((cat, index) => (
            <div
              key={index}
              className={`category-item ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              <span style={{fontFamily:'JetBrainsMono'}}>{cat}</span>
            </div>
          ))}
        </div>
        <button className="scroll-arrow-btn" onClick={scrollRight}>
          <ChevronRight size={20} />
        </button>
      </div>

      {/* HEADER */}
      <div className="products-header">
        <div className="products-title-group">
          <div className="products-title-text">Products</div>
          <p className="products-subtitle">
            Products are available for Subscription
          </p>
        </div>

        <div className="filter-dropdown-container">
          <button className="filter-toggle-btn" onClick={toggleDropdown}>
            {filter} <IoMdArrowDropdown size={22} />
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li
                className="dropdown-item"
                onClick={() => handleFilterSelect("All Products")}
              >
                <span className="dot all"></span> All Products
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleFilterSelect("Subscribed")}
              >
                <span className="dot subscribed"></span> Subscribed
              </li>

              <li
                className="dropdown-item"
                onClick={() => handleFilterSelect("Subscribe")}
              >
                <span className="dot unsubscribed"></span> Subscribe
              </li>
              <li
                className="dropdown-item"
                onClick={() => handleFilterSelect("Pendding Approvals")}
              >
                <span className="dot pending"></span> Pendding Approvals
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* GRID */}
      {filteredProducts.length === 0 ? (
        <div className="no-products-container">
          <div className="no-products-content">
            <div className="no-products-icon">📦</div>
            <h3 className="no-products-title">No Products Available</h3>
            <p className="no-products-message">
              {filter === "All Products"
                ? "No products found in the system."
                : `No ${filter.toLowerCase()} products available.`}
            </p>
          </div>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => {
            return (
              <div key={product.id} className="product-card">
                <div>
                  <div className={`icon-container ${product.iconColor}`}>
                    {product.icon}
                  </div>

                  <div className="product-info">
                    <div className="product-title-text">{product.title}</div>
                    <p className="product-desc">{product.description}</p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="credits-info">
                    <Layers size={14} color="#8b5cf6" />
                    Available credits : {product.credits}
                  </div>

                  <button
                    className={`action-btn ${product.status === "Pending"
                      ? "pending"
                      : product.status === "Subscribed" ||
                        product.status === "approved"
                        ? "subscribed"
                        : "unsubscribed"
                      }`}
                    disabled={
                      product.status === "Pending" ||
                      product.status === "Subscribed"
                    }
                    onClick={() => handleSubscribe(product.serviceId)}
                  >
                    {product.status?.toUpperCase() === "PENDING"
                      ? "Pending"
                      : product.status === "Subscribed"
                        ? "Subscribed"
                        : "Subscribe"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
