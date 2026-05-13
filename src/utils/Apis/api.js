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
const kycClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_KEY_URL,
});
const kycApiwallettopup = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL_WALLET,
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
      Cookies.remove("token");
      Cookies.remove("clientId");
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }

  // Handle 404 Session Expired (legacy handle)
  if (
    error?.response?.data?.statusCode === 404 &&
    error?.response?.data?.message === "Session Expired"
  ) {
    Cookies.remove("token");
    Cookies.remove("clientId");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  }
  return Promise.reject(error);
};

// Apply interceptors ONLY to supperApiClient
supperApiClient.interceptors.request.use(addAuthToken, (error) =>
  Promise.reject(error),
);
supperApiClient.interceptors.response.use(
  (response) => response,
  handleResponseError,
);

// Supper Admin Routes
const Register = (data) => supperApiClient.post("client/register", data);
const HandleRefreshToken = () => supperApiClient.post("client/refresh-token");
const SendOTP = (data) => supperApiClient.post("client/login/send-otp", data);
const VerifyOTP = (data) =>
  supperApiClient.post("client/login/verify-otp", data);
const HandleGetUser = (clientId) =>
  supperApiClient.get("/client/get-user-details", {
    params: { clientId },
  });
const UpdatedUserDetails = (data) =>
  supperApiClient.post("merchant/update/merchantdetails", data);

const ClientService = (clientId, categoryId) =>
  supperApiClient.get("/apimodule/services", {
    params: {
      clientId,
      categoryId,
    },
  });
const DashboardServices = () =>
  supperApiClient.get("/apimodule/dashboard-services");

// supper Admin Key routes
const HandleCreateKeys = (data) =>
  supperApiClient.post("client/create/clientKeys", data);
const HandleFetchAllKeys = (data) =>
  supperApiClient.get(`client/get/TestandLive/clientKeys?clientId=${data}`);
const HandleCreateIP = (data) =>
  supperApiClient.post(`client/whitelist/clientIp`, data);
const HandleFetchIP = (clientId) =>
  supperApiClient.get(`client/Get/whitelist/clientIp?clientId=${clientId}`);
const HandleDeleteIP = (data) =>
  supperApiClient.post(`client/delete/whitelist/clientIp`, data);
const HandleDeleteKey = (data) =>
  supperApiClient.post(`client/delete/clientKeys`, data);

const GetWalletBalance = (clientid) =>
  supperApiClient.get(`/apimodule/get-wallte-balance?clientId=${clientid}`);
const getBillingTypeApi = (clientId) =>
  supperApiClient.get(`/client/is-monthly-pay/${clientId}`);
const GetBillingAmountApi = (clientId, month) =>
  supperApiClient.get(`/apimodule/billing-records/${clientId}/${month}`);
// Generate Dynamic QR API
// const GenerateDynamicQrApi = (payload) =>
//   kycApiwallettopup.post(`/generate-dynamic-qr`, payload);
const GenerateStaticQrApi = () => kycApiwallettopup.post(`/generate-static-qr`);

const VerifyFPIN = (data) => supperApiClient.post("Client/verify-fpin", data);

const SubscribeService = (payload) =>
  supperApiClient.post("/apimodule/subscribe-service", payload);
DashboardServices;
const getAllCategoriesService = () =>
  supperApiClient.get("/apimodule/get-all-category");
const getTransactionsData = (payload) =>
  supperApiClient.post(`/apimodule/debit-summary`, payload);
const getProductsData = (payload) =>
  supperApiClient.post(`/apimodule/service-status-count`, payload);
const getRecentCallData = (id) =>
  supperApiClient.get(`/apimodule/transaction-history?clientId=${id}`);

const getServicesByCategoryService = (categoryId) =>
  supperApiClient.get("/apimodule/service-config", {
    params: { categoryId },
  });
const ApiVerification = (isMicro, URLS, data, token, method = "Post") => {
  console.log(isMicro, URLS, data, method);
  const headers = {
    secret_token: token,
  };

  // Replace path parameters (e.g., :category) if they exist in the data
  let finalURL = URLS;
  if (data && typeof data === "object") {
    Object.keys(data).forEach((key) => {
      if (finalURL.includes(`:${key}`)) {
        finalURL = finalURL.replace(`:${key}`, encodeURIComponent(data[key]));
      }
    });
  }

  const clientMap = {
    KYC: kycApiClient,
    RECHARGE: RechargeApiClient,
    BBPS: bbpsApiClient,
    SupperAdmin: supperApiClient,
  };

  const apiClient = clientMap[isMicro] || kycApiClient;

  if (method.toLowerCase() === "get") {
    return apiClient.get(finalURL, { headers, params: data });
  } else {
    return apiClient.post(finalURL, data, { headers });
  }
};
const fetchPublickey = () =>
  kycApiClient.get(`api/v1/ApiModuels/key/Publickey`);
const handlieFileUpload = (data) =>
  kycApiClient.post(`/client/image/blur_Check`, data, {
    headers: {
      secret_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImNsX3V2dkhJUGJJSWlVcVNkU0ZtZDNSUFEiLCJjbGllbnRTZWNyZXQiOiJXVEI0S1I2V2VwTXFJWlZHbzJTYUV0alZSOFdHVFJtVi04UFlvNXR1dnA5NDhXYVFwalhySjRwakUzQWg5X0R5aGtiR2kwYW5tcHM0a2lPQktrVndpZyIsImVudmlyb25tZW50IjoiTElWRSIsIlZlcnNpb25LZXkiOjQsImlhdCI6MTc3NjA1ODY0NSwiZXhwIjoxNzc5OTQ2NjQ1fQ.IsU6ROhX6Z454vq6mlPe1F_13MkPXLZsCft97hkYB1A",
    },
  });

// Fetch User Details

const HandleGetOtp = (data) =>
  kycApiClient.post("mobileNumber/mobileOtp", data);
const HandleVerifyOtp = (data) =>
  kycApiClient.post("mobileNumber/mobileotpVerify", data);
const HandleQrResponse = (data) =>
  kycApiClient.post("ApiModuels/generate-dynamic-qr", data);
const HandleQrPaymentResponse = (data) =>
  kycApiClient.get(`ApiModuels/generate-dynamic-qr/${data}`);
const HandleApiCount = (accesstoken, encryptedPayload, encrypt) =>
  kycApiClient.post(
    `analytics/ApiCallCount`,
    { ...encryptedPayload, publicKeyPem: encrypt },
    {
      headers: { secret_token: accesstoken },
    },
  );

// const HandleFetchIP = (data) => kycApiClient.get(`IP/Getipwhitelist/${data?.MerchatID}`);

// const HandleCreateIP = (data) => kycApiClient.post(`IP/WhiteListIP`, data);

const getAnalyticsService = () =>
  kycApiClient.get("/inhouse/analytics/Analyticalreports");

//
const GenerateTestKeys = () => {
  console.log("hello");
};
const GetTestKeys = () => {
  console.log("hello");
};
const RemoveTestKey = () => {
  console.log("hello");
};

export {
  Register,
  SendOTP,
  VerifyOTP,
  ClientService,
  SubscribeService,
  DashboardServices,
  getAllCategoriesService,
  getServicesByCategoryService,
  fetchPublickey,
  handlieFileUpload,
  getProductsData,
  HandleGetUser,
  UpdatedUserDetails,
  VerifyFPIN,
  HandleQrPaymentResponse,
  HandleGetOtp,
  HandleVerifyOtp,
  ApiVerification,
  HandleCreateKeys,
  HandleFetchAllKeys,
  HandleApiCount,
  HandleCreateIP,
  HandleQrResponse,
  HandleFetchIP,
  HandleDeleteIP,
  HandleDeleteKey,
  GetWalletBalance,
  getBillingTypeApi,
  GetBillingAmountApi,
  getTransactionsData,
  getRecentCallData,
  // GenerateDynamicQrApi,
  GenerateStaticQrApi,
  getAnalyticsService,
  HandleRefreshToken,
  GenerateTestKeys,
  GetTestKeys,
  RemoveTestKey,
};
