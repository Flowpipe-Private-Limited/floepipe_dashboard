import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectionRoute = ({children})=>{
    const isToken = Cookies.get('token');
    console.log('token is', isToken);
    
    if(!isToken || isToken === undefined){
         return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectionRoute;