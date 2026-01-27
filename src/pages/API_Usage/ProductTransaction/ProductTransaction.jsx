import React from 'react';
import '../APILogs/APILogs.css'; // Reusing styles
import Images from "../../../Images/Images"

const ProductTransaction = () => {
    return (
        <div className="api-logs-container">
            <div className="logs-content">
                 <img className="reportsempty-img2" src={Images.reportsempty}/>
                {/* <div style={{ color: '#888' }}>No Product Transactions</div> */}
            </div>
        </div>
    )
}

export default ProductTransaction
