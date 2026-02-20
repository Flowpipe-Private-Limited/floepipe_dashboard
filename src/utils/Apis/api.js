import axios from "axios";
import Cookies from "js-cookie";
import { useUserkey } from "../../Store/userKeyStore";

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
  //   timeout: 120000,
});

// BBPS MICROSERVICE BASE URL
const bbpsApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_BBPS_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});

// RECHARGE MICROSERVICE BASE URL
const RechargeApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_RECHARGE_URL,
  //   withCredentials: true,
  //   timeout: 120000,
});

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
    case 'KYC':
      return kycApiClient.post(URLS, data, { headers });
    case 'RECHARGE':
      return RechargeApiClient.post(URLS, data, { headers });
    case 'BBPS':
      return bbpsApiClient.post(URLS, data, { headers });
  }
};
const fetchPublickey = () => kycApiClient.get(`ApiModuels/key/Publickey`);


// Fetch User Details

const VerifyIPIN = (data) => kycApiClient.post('Client/Verify/ipin', data);

const HandleGetOtp = (data) => kycApiClient.post('mobileNumber/mobileOtp', data);
const HandleVerifyOtp = (data) => kycApiClient.post('mobileNumber/mobileotpVerify', data);
const HandleFetchIP = (data) => kycApiClient.get(`IP/Getipwhitelist/${data?.MerchatID}`);
const HandleCreateIP = (data) => kycApiClient.post(`IP/WhiteListIP`, data);

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
}










