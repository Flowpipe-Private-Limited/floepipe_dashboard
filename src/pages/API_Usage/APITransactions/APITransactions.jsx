import React from 'react';
import "../APILogs/APILogs.css"
import Images from "../../../Images/Images"

const APITransactions = () => {
    return (
        <div className="api-logs-container">
            <div className="logs-content">
                 <img className="reportsempty-img2" src={Images.reportsempty}/>
                {/* <div style={{ color: '#888' }}>No API Transactions</div> */}
            </div>
        </div>
    )
}

export default APITransactions
