// import React from 'react'
// import "./Eachpage_header.css"

// const Eachpage_header = ({headertitle}) => {
//   return (
//     <div>
//         <div className="page-header-card-reports-main">
//         <h1 className="page-title-main">{headertitle}</h1>
//       </div>
//     </div>
//   )
// }

// export default Eachpage_header


import React from 'react';
import "./Eachpage_header.css";
import Images from "../../../Images/Images"

const Eachpage_header = ({heading, subtitle}) => {
  return (
    <div>
        <div className="Dashboard-name-content">
        <div className="stat-card-decor-name">
          <img className="flowblue" src={Images.fldesign} />
        </div>
        <p className="welcome-text">{heading}</p>
        <p className="name-subtitle">{subtitle}</p>
      </div>
    </div>
  )
}

export default Eachpage_header
