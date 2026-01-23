import React from 'react';
import './APILogs.css';

// SVG Placeholder for the "No Data" / "Folder" image seen in screenshot
const EmptyStateIllustration = () => (
    <div className="empty-state-illustration">
        {/* Simplified representation of the folder/girl illustration */}
        {/* In a real scenario, this would be an <img> or complex SVG */}
        <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4H10L12 6H20C21.1046 6 22 6.89543 22 8V18C22 19.1046 21.1046 20 20 20Z" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12L12 12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 12L12 12.01" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Adding a generic 'X' or error symbol on top */}
            <line x1="9" y1="10" x2="15" y2="16" stroke="#b91c1c" strokeWidth="2" />
            <line x1="15" y1="10" x2="9" y2="16" stroke="#b91c1c" strokeWidth="2" />
        </svg>
    </div>
)

const APILogs = () => {
    return (
        <div className="api-logs-container">
            <div className="logs-header">
                <h2 className="secondary-title">API Logs</h2>
                <div className="logs-actions">
                    <button className="log-btn primary">Request Logs</button>
                    <button className="log-btn secondary">Requested Logs</button>
                </div>
            </div>
            <div className="logs-content">
                <EmptyStateIllustration />
            </div>
        </div>
    )
}

export default APILogs
