import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_DASHBOARD_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});

apiClient.interceptors.request.use(
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


// Api Routes function
const ApiVerification = (URLS, data) => apiClient.post(URLS, data);
const fetchPublickey = () => apiClient.get(`inhouse/ApiModuel/key/Publickey`);

const SignIn = (data) => apiClient.post('registeration/registerationCredentials', data);
const loginwithNumber = (data) => apiClient.post('login/loginVerify', data);
const VerifyOTP = (data) => apiClient.post('login/otpVerify', data);

// Fetch User Details
const HandleGetUser = () => apiClient.get('merchant/get/tokenbased/merchantdetails');
const UpdatedUserDetails = (data) => apiClient.post('merchant/update/merchantdetails', data);

const VerifyIPIN = (data) => apiClient.post('merchant/Verify/ipin', data);

const HandleGetOtp = (data) => apiClient.post('mobileNumber/mobileOtp', data);
const HandleVerifyOtp = (data) => apiClient.post('mobileNumber/mobileotpVerify', data);
const HandleCreateLiveKeys = (data) => apiClient.post("livekey/generateLiveCredentials", data);
const HandleCreateTestKeys = (data) => apiClient.post("testkey/generateTestCredentials", data);
const HandleFetchLiveKeys = (data) => apiClient.get(`livekey/getLiveKeys/${data?.MerchatID}`);
const HandleFetchTestKeys = (data) => apiClient.get(`testkey/getKeys/${data?.MerchatID}`);
const HandleFetchIP = (data) => apiClient.get(`IP/Getipwhitelist/${data?.MerchatID}`);
const HandleCreateIP = (data) => apiClient.post(`IP/WhiteListIP`, data);

export {
  SignIn,
  loginwithNumber,
  VerifyOTP,

  HandleGetUser,
  UpdatedUserDetails,

  VerifyIPIN,

  fetchPublickey,
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










