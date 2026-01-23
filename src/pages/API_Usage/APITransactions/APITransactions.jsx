import React from 'react';
import '../APILogs/APILogs.css'; // Reusing styles for consistency

const APITransactions = () => {
    return (
        <div className="api-logs-container">
            <div className="logs-content">
                <div style={{ color: '#888' }}>No API Transactions</div>
            </div>
        </div>
    )
}

export default APITransactions
