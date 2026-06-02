import React, { useEffect, useState, useRef } from "react";
import { FileCheck, Layers, ChevronRight, Cookie } from "lucide-react";
import "./Products.css";
import images from "../../Images/Images";
import { IoSearchOutline } from "react-icons/io5";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import Cookies from 'js-cookie';
import {
  getAllCategoriesService,
  getServicesByCategoryService,
  ClientService,
  SubscribeService,
} from "../../utils/Apis/api";
import { CiFilter } from "react-icons/ci";
import Eachpage_header from "../../components/ui/Eachpage_header/Eachpage_header";
import Images from "../../Images/Images";

const Products = () => {
  const [filter, setFilter] = useState("All Products");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const scrollContainerRef = useRef(null);

  const fetchCategories = async () => {
    console.group("FETCH CATEGORIES");

    await ApirequestHandler(
      () => getAllCategoriesService(),
      null,
      (res) => {
        if (res?.success && Array.isArray(res.data)) {
          const mapped = res.data.map((cat) => ({
            categoryId: cat.categoryId,
            categoryName: cat.categoryName,
          }));

          setCategories(mapped);
          if (mapped.length > 0) {
            const firstCategory = mapped[0].categoryId;
            setSelectedCategory(firstCategory);
            fetchServicesByCategory(firstCategory);
          }
        } else {
          setCategories([]);
        }
      },
      (err) => console.error("Category Error:", err)
    );

    console.groupEnd();
  };

  const fetchServicesByCategory = async (categoryId) => {
    console.group("FETCH SERVICES BY CATEGORY");

    await ApirequestHandler(
      () => getServicesByCategoryService(categoryId),
      null,
      (res) => {
        if (res?.success && Array.isArray(res.data)) {
          const mappedProducts = res.data.map((item) => ({
            id: item._id,
            serviceId: item.serviceId,
            categoryId: item.categoryId,
            title: item.serviceName,
            description: `${item.serviceName} verification service`,
            credits: item.rateLimit || 0,
            status: "Not Subscribed",
            icon: <FileCheck size={22} />,
            iconColor: "purple",
          }));

          setProducts(mappedProducts);
          fetchClientServices(mappedProducts, categoryId);

        } else {
          setProducts([]); // Show No Products UI
        }
      },
      (err) => {
        console.error("Service Config Error:", err);
        setProducts([]);
      }
    );

    console.groupEnd();
  };
  const fetchClientServices = async (currentProducts, categoryId) => {
    const clientId = Cookies.get("clientId");
    console.log("clientId in fetchclientservice", clientId)
    if (!clientId || !categoryId) return;

    await ApirequestHandler(
      () => ClientService(clientId, categoryId),

      null,
      (res) => {
        console.log("res in fetchclientservices", res)
        if (res?.success && Array.isArray(res.data)) {
          const clientServices = res.data;

          const updated = currentProducts.map((p) => {
            const found = clientServices.find(
              (s) => s.serviceId === p.serviceId
            );
            return found ? { ...p, status: found.status } : p;
          });

          setProducts(updated);
        }
      },
      (err) => console.error("Client Service Error:", err)
    );
  };
  const handleSubscribe = async (serviceId) => {
    const clientId = Cookies.get("clientId");
    console.log("clientId in handlesubscribe", clientId)
    if (!clientId || !selectedCategory) return;

    const payload = {
      clientId,
      categoryId: selectedCategory,
      serviceId,
      status: "Pending",
    };
    console.log("payload  in handlesubscribe", payload)
    try {
      const res = await SubscribeService(payload);
      console.log("res in handlesubscribe", res)
      console.log("res in handlesubscribe1", res?.data?.success)
      if (res?.data?.success) {
        const updatedServices = res.data.data.services;

        setProducts((prevProducts) =>
          prevProducts.map((product) => {
            const matchedService = updatedServices.find(
              (s) => s.serviceId === product.serviceId
            );

            return matchedService
              ? { ...product, status: matchedService.status }
              : product;
          })
        );

        // Optional: Remove this if you don't want filtering change
        // setFilter("Pending Approvals");
      }
    } catch (error) {
      console.error("Subscribe Error:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  const filteredProducts = products.filter((p) => {
    const searchMatched = p.title
      ?.toLowerCase()
      .includes(searchText.trim().toLowerCase());
    if (!searchMatched) return false;

    if (filter === "All Products") return true;
    if (filter === "Subscribed") return p.status === "Subscribed";
    if (filter === "Pending Approvals") return p.status === "Pending";
    if (filter === "Subscribe")
      return (
        !p.status ||
        p.status === "Unsubscribed" ||
        p.status === "Not Subscribed"
      );
    return true;
  });
  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsDropdownOpen(false);
  };

  return (
    <div className="products-container">

      {/* <div className="products-header">
        <div>
          <div className="products-title-text">Products</div>
          <p className="products-subtitle">
            Products are available for Subscription
          </p>
        </div>
      </div> */}
      <Eachpage_header
        heading="Products"
        subtitle="Products are available for Subscription"
      />  
      <div className="category-slider-section">
        <div className="category-scroll-wrapper" ref={scrollContainerRef}>
          {categories.map((cat) => (
            <div
              key={cat.categoryId}
              className={`category-item ${selectedCategory === cat.categoryId ? "active" : ""
                }`}
              onClick={() => {
                setSelectedCategory(cat.categoryId);
                fetchServicesByCategory(cat.categoryId);
              }}
            >
              {cat.categoryName}
            </div>
          ))}
        </div>

        <button
          className="scroll-arrow-btn"
          onClick={() =>
            scrollContainerRef.current.scrollBy({
              left: 200,
              behavior: "smooth",
            })
          }
        >
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="products-tools-row">
        <div className="products-search-box">
          <IoSearchOutline size={24} className="products-search-icon" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search"
            className="products-search-input"
          />
        </div>

        <div className="filter-dropdown-container">
          <button
            className="filter-toggle-btn"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Open filters"
          >
            <CiFilter size={20} />
          </button>

          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li className="dropdown-menu-title">Filters</li>
              <li className="dropdown-item" onClick={() => handleFilterSelect("All Products")}>
                <span className="dot all"></span> All Products
              </li>

              <li className="dropdown-item" onClick={() => handleFilterSelect("Subscribed")}>
                <span className="dot subscribed"></span> Subscribed
              </li>

              <li className="dropdown-item" onClick={() => handleFilterSelect("Subscribe")}>
                <span className="dot unsubscribed"></span> Subscribe
              </li>

              <li className="dropdown-item" onClick={() => handleFilterSelect("Pending Approvals")}>
                <span className="dot pending"></span> Pending Approvals
              </li>
            </ul>

          )}
        </div>
      </div>
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
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="stat-card-decor-product">
                <img className="flowblue" src={images.fldesign} />
              </div>
              <div>
                <div className={`icon-container ${product.iconColor}`}>
                  {product.icon}
                </div>

                <div className="product-info">
                  <div className="product-title-text">
                    {product.title}
                  </div>
                  <p className="product-desc">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="card-footer">

                <div className="credits-info">
                  <Layers size={14} />

                  {product.status === "Subscribed"
                    ? `Available credits : ${product.credits}`
                    : ""}
                </div>


                <button
                  className={`action-btn-products ${product.status === "Pending"
                    ? "pending"
                    : product.status === "Subscribed"
                      ? "subscribed"
                      : "unsubscribed"
                    }`}
                  disabled={
                    product.status === "Pending" ||
                    product.status === "Subscribed"
                  }
                  onClick={() => handleSubscribe(product.serviceId, product.categoryId)}
                >
                  {product.status === "Pending"
                    ? "Pending"
                    : product.status === "Subscribed"
                      ? "Subscribed"
                      : "Subscribe"}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
