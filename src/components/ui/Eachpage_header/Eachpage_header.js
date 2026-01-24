import React from 'react'
import "./Eachpage_header.css"

const Eachpage_header = ({headertitle}) => {
  return (
    <div>
        <div className="page-header-card-reports">
        <h1 className="page-title-main">{headertitle}</h1>
      </div>
    </div>
  )
}

export default Eachpage_header
