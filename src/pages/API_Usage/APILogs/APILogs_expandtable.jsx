import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./APILogs.css"; // Reuse existing styles

const APILogs_expandtable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { records, clientId, serviceName } = location.state || { records: [] };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = records ? records.slice(indexOfFirstItem, indexOfLastItem) : [];
  const totalPages = records ? Math.ceil(records.length / itemsPerPage) : 0;

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="api-logs-container">
      <div className="requested-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            className="expand-btn"
            onClick={() => navigate(-1)}
            style={{ padding: "0.5rem" }}
          >
            <ChevronLeft size={20} />
          </button>
          <h3>{serviceName} - Details ({clientId})</h3>
        </div>
      </div>

      <div className="logs-content">
        <div className="api-logs-table-wrapper">
          <table className="api-logs-table">
            <thead>
              <tr>
                <th>Client ID</th>
                <th>Service ID</th>
                <th>Service Name</th>
                <th>Count</th>
                <th>Charged Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((record, index) => (
                  <tr key={index}>
                    <td>{record.clientId}</td>
                    <td>{record.serviceId}</td>
                    <td>{record.serviceName}</td>
                    <td>{record.count}</td>
                    <td>{record.chargedAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "2rem" }}>
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {records && records.length > 0 && (
        <div className="pagination-container">
          <div className="pagination-items-per-page">
            <span>Items per page:</span>
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>

         

          <div className="pagination-controls">
             <div className="pagination-info">
            Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, records.length)} of {records.length}
          </div>
            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="pagination-pages">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  className={`pagination-page-btn ${currentPage === idx + 1 ? 'active' : ''}`}
                  onClick={() => handlePageChange(idx + 1)}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              className="pagination-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default APILogs_expandtable;
