import axios from "axios";
import Cookies from "js-cookie";

//  SUPPER ADMIN BASE URL
const supperApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_SUPPERADMIN_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});
supperApiClient.interceptors.request.use(
  function (config) {
    //  const clientId = localStorage.getItem("clientId");
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// KYC MICROSERVICE BASE URL
const kycApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});
kycApiClient.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem('token')
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// BBPS MICROSERVICE BASE URL
const bbpsApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_BBPS_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});
bbpsApiClient.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem('token')
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// RECHARGE MICROSERVICE BASE URL
const RechargeApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_RECHARGE_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});
RechargeApiClient.interceptors.request.use(
  function (config) {
    // const token = localStorage.getItem('token')
    const token = Cookies.get('token')
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Supper Admin Routes
const Register = (data) => supperApiClient.post('client/register', data)
const SendOTP = (data) => supperApiClient.post('client/login/send-otp', data);
const VerifyOTP = (data) => supperApiClient.post('client/login/verify-otp', data);
const HandleGetUser = () => supperApiClient.get('/client/get-user-details');
const UpdatedUserDetails = (data) => supperApiClient.post('merchant/update/merchantdetails', data);

// KYC BBPS RECHARGE ROUTES
const ApiVerification = (isMicro, URLS, data) => {
  console.log(isMicro, URLS, data)
  switch (isMicro) {
    case 'KYC':
      kycApiClient.post(URLS, data)
      return;
    case 'RECHARGE':
      RechargeApiClient.post(URLS, data)
      return;
    case 'BBPS':
      bbpsApiClient.post(URLS, data)
      return;
  }
};
const fetchPublickey = () => kycApiClient.get(`ApiModuels/key/Publickey`);


// Fetch User Details

const VerifyIPIN = (data) => kycApiClient.post('merchant/Verify/ipin', data);

const HandleGetOtp = (data) => kycApiClient.post('mobileNumber/mobileOtp', data);
const HandleVerifyOtp = (data) => kycApiClient.post('mobileNumber/mobileotpVerify', data);
const HandleCreateLiveKeys = (data) => kycApiClient.post("livekey/generateLiveCredentials", data);
const HandleCreateTestKeys = (data) => kycApiClient.post("testkey/generateTestCredentials", data);
const HandleFetchLiveKeys = (data) => kycApiClient.get(`livekey/getLiveKeys/${data?.MerchatID}`);
const HandleFetchTestKeys = (data) => kycApiClient.get(`testkey/getKeys/${data?.MerchatID}`);
const HandleFetchIP = (data) => kycApiClient.get(`IP/Getipwhitelist/${data?.MerchatID}`);
const HandleCreateIP = (data) => kycApiClient.post(`IP/WhiteListIP`, data);

export {

  Register, SendOTP, VerifyOTP,

  fetchPublickey,

  HandleGetUser,
  UpdatedUserDetails,

  VerifyIPIN,

  HandleGetOtp,
  HandleVerifyOtp,
  ApiVerification,
  HandleCreateLiveKeys,
  HandleCreateTestKeys,
  HandleFetchLiveKeys,
  HandleFetchTestKeys,
  HandleCreateIP,
  HandleFetchIP,
}










