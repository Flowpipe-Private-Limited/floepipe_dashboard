import React, { useState } from 'react';
import { Mail, Smartphone, FileCheck, Layers, ChevronDown, Lock } from 'lucide-react';
import './Products.css';

const Products = () => {
  const [filter, setFilter] = useState('All Products');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleFilterSelect = (selectedFilter) => {
    setFilter(selectedFilter);
    setIsDropdownOpen(false);
  };

  // Dummy Data to match image
  const products = [
    {
      id: 1,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
    {
      id: 2,
      title: 'Phone Verification',
      description: 'Validate email addresses in real-time with syntax, verification.', // Copying text from image even if it says email for phone logic
      credits: 13,
      status: 'UnSubscribed',
      icon: <Smartphone size={24} />,
      iconColor: 'green'
    },
    {
      id: 3,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple' // Actually image shows gray/white icon on purple bg
    },
    {
      id: 4,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
    {
      id: 5,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
    {
      id: 6,
      title: 'KYC Verification Pro',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: null, // No credits shown for pending? Or assuming text
      status: 'Pending', // Corresponds to "Pending Approval" in dropdown, "Un Subscribed" button in card, but "Pending" badge
      buttonText: 'Un Subscribed',
      icon: <FileCheck size={24} />,
      iconColor: 'purple'
    },
    {
      id: 7,
      title: 'Phone Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Smartphone size={24} />,
      iconColor: 'green'
    },
    {
      id: 8,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
    {
      id: 9,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
    {
      id: 10,
      title: 'Phone Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Smartphone size={24} />,
      iconColor: 'green'
    },
    {
      id: 11,
      title: 'KYC Verification Pro',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: null,
      status: 'Pending',
      buttonText: 'Subscribed', // Example variation
      icon: <FileCheck size={24} />,
      iconColor: 'purple'
    },
    {
      id: 12,
      title: 'Email Verification',
      description: 'Validate email addresses in real-time with syntax, verification.',
      credits: 13,
      status: 'Subscribed',
      icon: <Mail size={24} />,
      iconColor: 'purple'
    },
  ];

  const filteredProducts = filter === 'All Products'
    ? products
    : products.filter(p => {
      if (filter === 'Pendding Approvals') return p.status === 'Pending';
      return p.status === filter;
    });

  return (
    <div className="products-container">
      {/* Header */}
      <div className="products-header">
        <div className="products-title-group">
          <div className="products-title-text">Products</div>
          <p className="products-subtitle">Products are available for Subscription</p>
        </div>

        <div className="filter-dropdown-container">
          <button className="filter-toggle-btn" onClick={toggleDropdown}>
            {filter} <ChevronDown size={18} />
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
        </div>
      </div>

      {/* Grid */}
      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            {product.status === 'Pending' && (
              <div className="pending-label"><Lock size={10} /> Pending</div>
            )}

            <div>
              <div className={`icon-container ${product.iconColor}`}>
                {React.cloneElement(product.icon, { size: 20 })} {/* Resize icon */}
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
                <div className="credits-info">
                  Awaiting approval
                </div>
              )}

              <button className={`action-btn ${product.status === 'UnSubscribed' ? 'unsubscribed' : 'subscribed'}`}>
                {product.buttonText || product.status}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products
