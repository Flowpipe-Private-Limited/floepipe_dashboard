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
kycApiClient.interceptors.request.use(
  async function (config) {
    const currentState = useUserkey.getState();
    const token = currentState.LiveAccessToken;
    const SecretKey = currentState.LiveSecretKey;

    if (token) {
      const clientId = localStorage.getItem('clientId');
      config.headers['secret_token'] = token;
      config.headers['secret_key'] = SecretKey;
      config.headers['client_id'] = clientId;
    }
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
  async function (config) {
    const currentState = useUserkey.getState();
    const token = currentState.LiveAccessToken;
    const SecretKey = currentState.LiveSecretKey;

    if (token) {
      const clientId = localStorage.getItem('clientId');
      config.headers['secret_token'] = token;
      config.headers['secret_key'] = SecretKey;
      config.headers['client_id'] = clientId;
    }
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
  async function (config) {
    const currentState = useUserkey.getState();
    const token = currentState.LiveAccessToken;
    const SecretKey = currentState.LiveSecretKey;

    if (token) {
      const clientId = localStorage.getItem('clientId');
      config.headers['secret_token'] = token;
      config.headers['secret_key'] = SecretKey;
      config.headers['client_id'] = clientId;
    }
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
const HandleGetUser = (clientId) => supperApiClient.get('/client/get-user-details', {
  params: { clientId }
});
const UpdatedUserDetails = (data) => supperApiClient.post('merchant/update/merchantdetails', data);
const ClientService = (ClientId) => supperApiClient.get(`/apimodule/services?clientId=${ClientId}`)
const SubscribeService = (payload) => supperApiClient.post('/apimodule/subscribe-service', payload);
const DashboardServices = () => supperApiClient.get("/apimodule/dashboard-services");

// supper Admin Key routes
const HandleCreateKeys = (data) => supperApiClient.post("client/crete/clientKeys", data);
const HandleFetchAllKeys = (data) => supperApiClient.get(`client/get/TestandLive/clientKeys?clientId=${data}`);


const ApiVerification = (isMicro, URLS, data) => {
  console.log(isMicro, URLS, data)
  switch (isMicro) {
    case 'KYC':
      return kycApiClient.post(URLS, data);
    case 'RECHARGE':
      return RechargeApiClient.post(URLS, data);
    case 'BBPS':
      return bbpsApiClient.post(URLS, data);
  }
};
const fetchPublickey = () => kycApiClient.get(`ApiModuels/key/Publickey`);


// Fetch User Details

const VerifyIPIN = (data) => kycApiClient.post('merchant/Verify/ipin', data);

const HandleGetOtp = (data) => kycApiClient.post('mobileNumber/mobileOtp', data);
const HandleVerifyOtp = (data) => kycApiClient.post('mobileNumber/mobileotpVerify', data);
const HandleFetchIP = (data) => kycApiClient.get(`IP/Getipwhitelist/${data?.MerchatID}`);
const HandleCreateIP = (data) => kycApiClient.post(`IP/WhiteListIP`, data);

export {

  Register, SendOTP, VerifyOTP, ClientService, SubscribeService, DashboardServices,

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










