import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectionRoute = ({children})=>{
    const isAccessToken = Cookies.get('accessToken');
    const isRefreshToken = Cookies.get('refreshToken');
    console.log('token is', isAccessToken, isRefreshToken);
    
    let isValid = !isAccessToken || !isRefreshToken || isRefreshToken === undefined || isAccessToken === undefined || isAccessToken === 'undefined' || isRefreshToken === 'undefined'

    if(isValid){
        Cookies.remove("clientId");
         return <Navigate to="/login" replace />;
    }
    return children;
}
export default ProtectionRoute;