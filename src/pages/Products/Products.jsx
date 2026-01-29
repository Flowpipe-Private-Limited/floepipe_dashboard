import React, { useEffect, useState } from 'react';
import { FileCheck, Layers } from 'lucide-react';
import './Products.css';
import { IoMdArrowDropdown } from "react-icons/io";

const Products = () => {
  const [filter, setFilter] = useState('All Products');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsDropdownOpen(false);
  };

  const fetchDashboardProducts = async () => {
    try {
      console.log("Fetching dashboard products...");
      const response = await fetch(
        "http://10.1.1.226:5001/api/v1/apimodule/dashboard-services"
      );
      const res = await response.json();
      console.log("Dashboard response:", JSON.stringify(res?.data));

      if (res.success && Array.isArray(res.data)) {
        const mappedProducts = res.data.map((item, index) => ({
          id: index + 1,
          serviceId: item.serviceId,
          title: item.serviceName,
          description: "Validate details in real-time with high accuracy.",
          credits: item.testLimit,
          status: item?.status,
          icon: <FileCheck size={24} />,
          iconColor: "purple",
        }));

        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    }
  };

  const fetchClientServices = async () => {
    const clientId = localStorage.getItem("clientId");
    if (!clientId) return;

    try {
      console.log("Fetching client subscriptions for:", clientId);

      const response = await fetch(
        `http://10.1.1.226:5001/api/v1/apimodule/services?clientId=${clientId}`
      );
      const res = await response.json();
      console.log("Client services response:", res?.data);

      if (res.success && res.data && Array.isArray(res.data)) {
        const clientServices = res.data;

        setProducts(prevProducts =>
          prevProducts.map(p => {
            const clientService = clientServices.find(
              s => s.serviceId === p.serviceId
            );
            return clientService
              ? { ...p, status: clientService.status }
              : p;
          })
        );
      }
    } catch (error) {
      console.error("Client services fetch error:", error);
    }
  };

  const handleSubscribe = async (serviceId) => {
    try {
      const clientId = localStorage.getItem("clientId");
      if (!clientId) {
        console.error("clientId missing");
        return;
      }

      console.log("Subscribing service:", serviceId);

      const response = await fetch(
        "http://10.1.1.226:5001/api/v1/apimodule/subscribe-service",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            serviceId,
            status: "Pending",
          }),
        }
      );
      const res = await response.json();
      console.log("Subscribe response:", res);

      if (res.success) {
        // Immediate UI update
        setProducts(prev =>
          prev.map(p =>
            p.serviceId === serviceId
              ? { ...p, status: "Pending" }
              : p
          )
        );
        fetchClientServices();
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
      : products.filter(p => {
        console.log("p in loop ===>", p?.status)
        if (filter === "Pendding Approvals") return p.status === "Pending";
        return p.status === filter;
      });
  console.log("products in componnet==>", JSON.stringify(products))
  return (
    <div className="products-container">

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
              <li className="dropdown-item" onClick={() => handleFilterSelect('All Products')}>
                <span className="dot all"></span> All Products
              </li>
              <li className="dropdown-item" onClick={() => handleFilterSelect('Subscribed')}>
                <span className="dot subscribed"></span> Subscribed
              </li>
          
              <li className="dropdown-item" onClick={() => handleFilterSelect('Pendding Approvals')}>
                <span className="dot pending"></span> Pendding Approvals
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* GRID */}
      <div className="products-grid">
        {filteredProducts.map(product => {
          console.log("product info inside map==>", product?.status)
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
                    : product.status === "Subscribed" || product.status === "approved"
                      ? "subscribed"
                      : "unsubscribed"
                    }`}
                  disabled={product.status === "Pending" || product.status === "Subscribed"}
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
          )
        }

        )}
      </div>
    </div>
  );
};

export default Products;
