import React, { useState } from 'react';
import './APILogs.css';

const APILogs = () => {
    const [showRequestModal, setShowRequestModal] = useState(false);
    const [showRequestedModal, setShowRequestedModal] = useState(false);

    return (
        <>
            <div className="api-logs-container">
                <div className="logs-header">
                    <h2 className="secondary-title">API Logs</h2>
                    <div className="logs-actions">
                        <button
                            className="log-btn primary"
                            onClick={() => setShowRequestModal(true)}
                        >
                            Request Logs
                        </button>

                        <button
                            className="log-btn secondary"
                            onClick={() => setShowRequestedModal(true)}
                        >
                            Requested Logs
                        </button>
                    </div>
                </div>

                <div className="logs-content">
                    <div className="empty-state-illustration">
                        {/* existing empty illustration */}
                    </div>
                </div>
            </div>

            {/* ================= Requested Logs Modal ================= */}
            {showRequestedModal && (
                <div className="requested-overlay">
                    <div className="requested-modal">
                        {/* Header */}
                        <div className="requested-header">
                            <h3>Requested Logs</h3>
                            <span
                                className="requested-close"
                                onClick={() => setShowRequestedModal(false)}
                            >
                                ✕
                            </span>
                        </div>

                        {/* Table */}
                        <div className="requested-table-wrapper">
                            <table className="requested-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>From Date</th>
                                        <th>To Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5" className="requested-empty">
                                            No Requested logs
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="requested-footer">
                            <button className="request-new-btn">
                                Request new
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default APILogs;
