import axios from "axios";
import Cookies from "js-cookie";
import { useUserkey } from "../../Store/userKeyStore";

//  SUPPER ADMIN BASE URL
const supperApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_VITE_API,
});

// KYC MICROSERVICE BASE URL
const kycApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL,
});

// BBPS MICROSERVICE BASE URL
const bbpsApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_BBPS_URL,
});

// RECHARGE MICROSERVICE BASE URL
const RechargeApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_RECHARGE_URL,
});

// Global Request Interceptor
const addAuthToken = (config) => {
  // const token = Cookies.get('token');
  axios.defaults.withCredentials = true;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
};

// Global Response Interceptor for Session Expiry and Token Refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const handleResponseError = async (error) => {
  const originalRequest = error.config;

  // Handle 401 Unauthorized - Token Refresh Logic
  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then(() => supperApiClient(originalRequest))
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      await HandleRefreshToken();
      processQueue(null);
      return supperApiClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError);

      // If refresh fails, perform logout
      Cookies.remove('token');
      Cookies.remove('clientId');
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // Handle 404 Session Expired (legacy handle)
  if (error?.response?.data?.statusCode === 404 && error?.response?.data?.message === 'Session Expired') {
    Cookies.remove('token');
    Cookies.remove('clientId');
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }
  return Promise.reject(error);
};

// Apply interceptors ONLY to supperApiClient
supperApiClient.interceptors.request.use(addAuthToken, (error) => Promise.reject(error));
supperApiClient.interceptors.response.use((response) => response, handleResponseError);

// Supper Admin Routes
const Register = (data) => supperApiClient.post('client/register', data)
const SendOTP = (data) => supperApiClient.post('client/login/send-otp', data);
const VerifyOTP = (data) => supperApiClient.post('client/login/verify-otp', data);
const HandleGetUser = (clientId) => supperApiClient.get('/client/get-user-details', {
  params: { clientId }
});
const UpdatedUserDetails = (data) => supperApiClient.post('merchant/update/merchantdetails', data);

const ClientService = (clientId, categoryId) =>
  supperApiClient.get("/apimodule/services", {
    params: {
      clientId,
      categoryId,
    },
  });
const DashboardServices = () => supperApiClient.get("/apimodule/dashboard-services");

// supper Admin Key routes
const HandleCreateKeys = (data) => supperApiClient.post("client/crete/clientKeys", data);
const HandleFetchAllKeys = (data) => supperApiClient.get(`client/get/TestandLive/clientKeys?clientId=${data}`);
const HandleCreateIP = (data) => supperApiClient.post(`client/whitelist/clientIp`, data);
const HandleFetchIP = (clientId) => supperApiClient.get(`client/Get/whitelist/clientIp?clientId=${clientId}`);

const SubscribeService = (payload) => supperApiClient.post("/apimodule/subscribe-service", payload);
const getAllCategoriesService = () => supperApiClient.get("/apimodule/get-all-category")
const getServicesByCategoryService = (categoryId) =>
  supperApiClient.get("/apimodule/service-config", {
    params: { categoryId },
  });
const ApiVerification = (isMicro, URLS, data, token) => {
  console.log(isMicro, URLS, data)
  const headers = {
    'secret_token': token
  };

  switch (isMicro) {
    case 'KYC': return kycApiClient.post(URLS, data, { headers });
    case 'RECHARGE': return RechargeApiClient.post(URLS, data, { headers });
    case 'BBPS': return bbpsApiClient.post(URLS, data, { headers });;
    case 'SupperAdmin': return supperApiClient.post(URLS, data, { headers });
  }

};
const fetchPublickey = () => kycApiClient.get(`ApiModuels/key/Publickey`);


// Fetch User Details

const VerifyIPIN = (data) => kycApiClient.post('Client/Verify/ipin', data);

const HandleGetOtp = (data) => kycApiClient.post('mobileNumber/mobileOtp', data);
const HandleVerifyOtp = (data) => kycApiClient.post('mobileNumber/mobileotpVerify', data);

const HandleRefreshToken = () => supperApiClient.post('client/refresh-token');

//
const GenerateTestKeys = () => { console.log('hello') }
const GetTestKeys = () => { console.log('hello') }
const RemoveTestKey = () => { console.log('hello') }

export {

  Register, SendOTP, VerifyOTP, ClientService, SubscribeService, DashboardServices, getAllCategoriesService, getServicesByCategoryService,

  fetchPublickey,

  HandleGetUser,
  UpdatedUserDetails,

  VerifyIPIN,

  HandleGetOtp,
  HandleVerifyOtp,
  ApiVerification,
  HandleCreateKeys,
  HandleFetchAllKeys,

  HandleCreateIP,
  HandleFetchIP,
  HandleRefreshToken,
  GenerateTestKeys, GetTestKeys, RemoveTestKey
}










