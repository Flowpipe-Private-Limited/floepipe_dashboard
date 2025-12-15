import React from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";

const IsLoginUser = ({children})=>{

    const isToken = Cookies.get('token');
    console.log('token is', isToken);

    if(isToken){
       return <Navigate to="/dashboard" replace />;
    }
    return children;
}
export default IsLoginUser