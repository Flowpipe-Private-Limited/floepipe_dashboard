import React, { useState } from 'react';
import './API_Usage.css';
import APILogs from './APILogs/APILogs';
import APITransactions from './APITransactions/APITransactions';
import ProductTransaction from './ProductTransaction/ProductTransaction';
import Eachpage_header from '../../components/ui/Eachpage_header/Eachpage_header';

const API_Usage = () => {
  const [activeTab, setActiveTab] = useState('API Logs');

  const renderContent = () => {
    switch (activeTab) {
      case 'API Logs': return <APILogs />;
      case 'API Transactions': return <APITransactions />;
      case 'Product Transaction': return <ProductTransaction />;
      default: return <APILogs />;
    }
  }

  return (
    <div className="api-usage-container">
    <Eachpage_header headertitle={"API Usage"}/>
      <div className="tabs-container">
        {['API Logs', 'API Transactions', 'Product Transaction'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="tab-content-area">
        {renderContent()}
      </div>
    </div>
  )
}

export default API_Usage
