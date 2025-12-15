import React, { useState } from "react";
import '../../styles/Login.css';

import logo from "../../assets/images/Asset 41@300x-8.png"
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { SignIn } from "../../utils/Apis/api";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const [Loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate('')
    const [formData, setFormData] = useState({
        mobileNumber:'',
        email:'',
        panNumber:'',
        panName:'',
        IPIN:''
    });

    const HandleFromChange = (e) => {
        const {name,value} = e.target
        setFormData({ ...formData, [name]: value });
    }

    const HandleRegister = async () => {
        const {mobileNumber,email,panNumber,panName,IPIN} = formData
        setErrorMessage("");
        setLoading(true);
        if(!mobileNumber || !email || !panName || !panNumber || !IPIN){
            console.log('Please enter every fields');
            setErrorMessage("VALIDATION ERROR: Please enter every fields")
            return;
        }

        await ApirequestHandler(
            async () => SignIn(formData),
            setLoading,
            (res) => {
                const { data, message, success} = res;
                console.log(res);
                if(success){
                    navigate('/login');
                }
                setErrorMessage("");
                setLoading(false);
            },
            (errMessage) => {
                console.log('API ERROR:', errMessage);
                setErrorMessage(errMessage);
                setLoading(false);
            }
        )
    }

    return (
        <div className="login-container">
            <div className="login-card">

                <img src={logo} alt="logo" className="login-logo" />

                <div className="login-title">Register in to flowpipe</div>

                <div>
                    <label className="login-label">Mobile Number</label>
                    <input
                        type="text"
                        placeholder="Enter Your Mobile Number"
                        className="login-input"
                        name="mobileNumber"
                        onChange={(e) => HandleFromChange(e)}
                    />
                </div>
                <div>
                    <label className="login-label">Email</label>
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        className="login-input"
                        name="email"
                        onChange={(e) => HandleFromChange(e)}
                    />
                </div>
                <div>
                    <label className="login-label">Pan Number</label>
                    <input
                        type="text"
                        placeholder="Enter Your Pan Number"
                        className="login-input"
                        name="panNumber"
                        onChange={(e) => HandleFromChange(e)}
                    />
                </div>
                <div>
                    <label className="login-label">Name of Pan</label>
                    <input
                        type="text"
                        placeholder="Enter Your Name on Pan"
                        className="login-input"
                        name="panName"
                        onChange={(e) => HandleFromChange(e)}
                    />
                </div>
                <div>
                    <label className="login-label">Name of IPIN</label>
                    <input
                        type="text"
                        placeholder="Enter IPIN"
                        className="login-input"
                        name="IPIN"
                        onChange={(e) => HandleFromChange(e)}
                    />
                </div>

                <button className="login-btn-primary" onClick={() => HandleRegister()}>
                    Continue
                </button>
            </div>
        </div>
    );
}
export default RegisterPage
