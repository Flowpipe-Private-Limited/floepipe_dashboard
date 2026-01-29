// src/navigateroute/Route.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../src/pages/Dashboard/Dashboard";
import MainContent from "../pages/MainContent/mainContent";
import GSTPage from "../pages/GST/gstIn";
import ShopPage from "../pages/IFSC/ifsc";
import VerifyMobileOTP from "../pages/MobileNumber/VerifyOTP";
import SendMobileOTP from "../pages/MobileNumber/SendOTP";
import PanVerification from "../pages/PanVerification/PanVerificaton";
import PanAadhaar from "../pages/PanVerification/panAadhaar";
import AccountVerify from "../pages/Account/accountVerify";
import CardValidationPage from "../pages/CardValidaton/CardValidate";
import CinVerification from "../pages/CinVerification/CinVerify";
import UdyamVerifyPage from "../pages/Udyam/UdamVerify";
import { RechargeOffersPage, RechargeOldPlansPage, RechargeOperatorsPage, RechargePlansPage, RechargeURLPage } from "../pages/Recharge/Recharge";
import NameMatchpage from "../pages/nameMatch/nameMatch";
import AadhaarVerifyPage from "../pages/Aadhaar/AadhaarVerify";
import {
  BbpsBillerInfoPage,
  BbpsBillFetch,
  BbpsBillPay,
  BbpsBillQuickPay,
  BbpsBillVallidation,
  BbpsCategoryPage,
} from "../pages/BBPS/Bbps";
import Otp from "../pages/Otp/Otp";
import Login from "../pages/Login/Login";
import Register_Form from "../pages/Login/Register_Form";
import Create_Pin from "../pages/Login/Create_Pin";
import Loginwith_Email from "../pages/Login/Loginwith_Email";
import Forget_Password from "../pages/Login/Forget_Password";
import Forget_Verification from "../pages/Login/Forget_Verification";
import New_Password from "../pages/Login/New_Password";
import Whitelistapis from "../pages/IpAccess/IpAccess";
import TestingKeys from "../pages/keys/TestingKeys";
import MainDashboardPage from "../pages/MainPage/MainPage";
import RegisterPage from "../pages/Register/Register";
import OtpLogin from "../pages/OTPverify/registerOTPverify";
import IsLoginUser from "../components/protectionRoutes/isLogin";
import ProtectionRoute from "../components/protectionRoutes/Protection";
import ProfilePage from "../components/profile/UserProfile";
import WalletToPop from "../pages/WalletToPop/WalletToPop";
import InstantPayVerification from "../pages/InstantPay/InstantPay";
import Products from "../pages/Products/Products";
import Reports from "../pages/Reports/Reports";
import ApiKeys from "../pages/apiKeys/apikeys";
import API_Usage from "../pages/API_Usage/API_Usage";
import WhiteListIP from "../pages/whiteList/whiteList";
import Billing_plans from "../pages/WalletToPop/Billing_plans";
import ViewAnalytics from "../pages/ViewAnalytics/ViewAnalytics";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<MainDashboardPage />} />
        {/* Sign || login with OTP */}
        {/* <Route path="/login" element={<IsLoginUser><Login /></IsLoginUser>} />
        <Route path="/Register" element={<IsLoginUser><RegisterPage /></IsLoginUser>} />
        <Route path="/loginOtp" element={<IsLoginUser ><OtpLogin /></IsLoginUser>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register_form" element={<Register_Form />} />
        <Route path="/create_pin" element={<Create_Pin />} />
        <Route path="/otpVerify" element={<Otp />} />
        <Route path="/Loginwith_Email" element={<Loginwith_Email />} />
        <Route path="/Forget_Password" element={<Forget_Password />} />
        <Route path="/Forget_Verification" element={<Forget_Verification />} />
        <Route path="/New_Password" element={<New_Password />} />
        <Route path="/RegisterPage" element={<RegisterPage />} />



        {/* User DashBoard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectionRoute>
              <Dashboard />
            </ProtectionRoute>
          }
        >
          {/* <Route path="/dashboard" element={<Dashboard />}> */}
          <Route index element={<MainContent />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="Products" element={<Products/>} />
          <Route path="Reports" element={<Reports/>} />
          <Route path="Billing_plans" element={<Billing_plans/>} />
          <Route path="viewAnalytics" element={<ViewAnalytics/>} />
          <Route path="apiKeys" element={<ApiKeys />} />
          <Route path="APIUsage" element={<API_Usage />} />
          <Route path="WhitelistIP" element={<WhiteListIP />} />
          <Route path="KYC/aadhaar" element={<AadhaarVerifyPage />} />
          <Route path="IpAccess" element={<Whitelistapis />} />
          <Route path="TestingKeys" element={<TestingKeys />} />
          <Route path="KYC/GSTIN" element={<GSTPage />} />
          <Route path="KYC/Shop" element={<ShopPage />} />
          <Route path="KYC/MobileNumber/otpsend" element={<SendMobileOTP />} />
          <Route
            path="KYC/MobileNumber/otpverify"
            element={<VerifyMobileOTP />}
          />
          <Route path="KYC/Pan" element={<PanVerification />} />
          <Route path="KYC/PanAadhaar" element={<PanAadhaar />} />
          <Route path="KYC/Account" element={<AccountVerify />} />
          <Route path="KYC/cardValidation" element={<CardValidationPage />} />
          <Route path="KYC/Udyam" element={<UdyamVerifyPage />} />
          <Route path="KYC/Cin" element={<CinVerification />} />
          <Route path="KYC/NameMatch" element={<NameMatchpage />} />
          <Route
            path="Recharge/Operators"
            element={<RechargeOperatorsPage />}
          />
          <Route path="Recharge/Plans" element={<RechargePlansPage />} />
          <Route path="Recharge/Offers" element={<RechargeOffersPage />} />
          <Route path="Recharge/RecharUrl" element={<RechargeURLPage />} />
          <Route path="Recharge/OldPlans" element={<RechargeOldPlansPage />} />
          <Route path="bbps/Category" element={<BbpsCategoryPage />} />
          <Route path="bbps/BillerInfo" element={<BbpsBillerInfoPage />} />
          <Route path="bbps/BillFetch" element={<BbpsBillFetch />} />
          <Route path="bbps/BillPay" element={<BbpsBillPay />} />
          <Route path="bbps/BillValidation" element={<BbpsBillVallidation />} />
          <Route path="bbps/QuickPay" element={<BbpsBillQuickPay />} />
          <Route path="WalletToPop" element={<WalletToPop />} />

          <Route path="InstantPayVerification" element={<InstantPayVerification />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
