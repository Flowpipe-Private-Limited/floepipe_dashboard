import axios from "axios";
import Cookies from "js-cookie";
import { useUserkey } from "../../Store/userKeyStore";

//  SUPPER ADMIN BASE URL
const supperApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_VITE_API,
});

const walletApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_WALLET_URL,
});

// KYC MICROSERVICE BASE URL
const kycServiceApiClient = axios. create ({ baseURL : import. meta. env. REACT_APP_KYC_SERVICE_CALL, });
const kycApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL,
});
const ApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL_CLIENT,
});
const kycGetApiClient = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL_GET,
});
const kycGetApiClientAnalytics = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL_GET_ANALYTICS,
});
const kycApiClientAnalytics = axios.create({
  baseURL: import.meta.env.REACT_APP_KYC_URL_ANALYTICS,
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

// Supper Admin Routes - client Related 
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
const DashboardServices = () =>
  supperApiClient.get("/apimodule/dashboard-services");

// supper Admin Key routes
const HandleDeleteKey = (data) =>
  supperApiClient.post(`client/delete/clientKeys`, data);

const GetWalletBalance = (clientid) =>
  supperApiClient.get(`/apimodule/get-wallte-balance?clientId=${clientid}`);

const GetTotalBalance = (clientId) =>
  walletApiClient.get(`/wallet/balance/${clientId}`);

const GetWalletHistory = (clientId, range = "120days", page = 1, limit = 20) =>
  supperApiClient.get(
    `/apimodule/topup-history?clientId=${clientId}&range=${range}&page=${page}&limit=${limit}`,
  );

const getBillingTypeApi = (clientId) =>
  supperApiClient.get(`/client/is-monthly-pay/${clientId}`);
const GetBillingAmountApi = (clientId, month) =>
  supperApiClient.get(`/apimodule/billing-records/${clientId}/${month}`);

const HandleQrResponse = (data) =>
  supperApiClient.post("apimodule/create-dynamic-qr", data);

const HandleQrstatus = (orderId) => {
  console.log("[STATUS API CALL]:", orderId);

  return supperApiClient.get(`apimodule/get-qr-payment-status/${orderId}`);
};

const HandleQrPaymentResponse = (data) =>
  supperApiClient.get(`ApiModuels/generate-dynamic-qr/${data}`);

const VerifyFPIN = (data) => supperApiClient.post("Client/verify-fpin", data);

const ApiVerification = (isMicro, URLS, data, token, method = "Post") => {
  console.log(isMicro, URLS, data, method);

  const isFormData = data instanceof FormData;

  // Extract entries for path-param replacement — works for both plain objects and FormData
  const dataEntries = isFormData
    ? Object.fromEntries(data.entries())
    : data && typeof data === "object"
      ? data
      : {};

  // Replace path parameters (e.g., :category) if they exist in the data
  let finalURL = URLS;
  Object.keys(dataEntries).forEach((key) => {
    if (finalURL.includes(`:${key}`)) {
      finalURL = finalURL.replace(
        `:${key}`,
        encodeURIComponent(dataEntries[key]),
      );
    }
  });

  // For FormData, do NOT set Content-Type manually — Axios (and the browser)
  // will set it automatically with the correct multipart boundary.
  // For plain JSON, set application/json.
  const headers = {
    secret_token: token,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const clientMap = {
    KYC: kycServiceApiClient,
    RECHARGE: RechargeApiClient,
    BBPS: bbpsApiClient,
    SupperAdmin: supperApiClient,
  };

  const apiClient = clientMap[isMicro] || kycServiceApiClient;

  if (method.toLowerCase() === "get") {
    // GET: pass plain params (not FormData)
    return apiClient.get(finalURL, { headers, params: dataEntries });
  } else {
    return apiClient.post(finalURL, data, { headers });
  }
};
const fetchPublickey = () => kycClient.get(`/api/v1/ApiModuels/key/Publickey`);
const handlieFileUpload = (data) =>
  kycApiClient.post(`/client/image/blur_Check`, data, {
    headers: {
      secret_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6ImNsX3V2dkhJUGJJSWlVcVNkU0ZtZDNSUFEiLCJjbGllbnRTZWNyZXQiOiJXVEI0S1I2V2VwTXFJWlZHbzJTYUV0alZSOFdHVFJtVi04UFlvNXR1dnA5NDhXYVFwalhySjRwakUzQWg5X0R5aGtiR2kwYW5tcHM0a2lPQktrVndpZyIsImVudmlyb25tZW50IjoiTElWRSIsIlZlcnNpb25LZXkiOjQsImlhdCI6MTc3NjA1ODY0NSwiZXhwIjoxNzc5OTQ2NjQ1fQ.IsU6ROhX6Z454vq6mlPe1F_13MkPXLZsCft97hkYB1A",
    },
  });

//  Fetch User Details
const HandleGetOtp = (data) =>
  kycApiClient.post("mobileNumber/mobileOtp", data);
const HandleVerifyOtp = (data) =>
  kycApiClient.post("mobileNumber/mobileotpVerify", data);
// const HandleQrResponse = (data) =>
//   kycApiClient.post("ApiModuels/create-dynamic-qr", data);
// const HandleQrPaymentResponse = (data) =>
//   kycApiClient.get(`ApiModuels/generate-dynamic-qr/${data}`);
const HandleCreateReportResponse = (data, accesstoken, key) =>
  kycApiClient.post(
    `report/create`,
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );

// categories =======>>
const getAllCategoriesService = () =>
  kycGetApiClient.get("/category/get-all-category");
const getServicesByCategoryService = (categoryId) =>
  kycGetApiClient.get("/service/service-config", {
    params: { categoryId },
  });
const ClientService = (clientId, categoryId) =>
  kycGetApiClient.get("/subscription/services", {
    params: {
      clientId,
      categoryId,
    },
  });

// transactions ===========>>
const getTransactionsData = (data, accesstoken, key) =>
  ApiClient.post(
    `/transaction/debit-summary`,
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );
const getRecentCallData = (id) =>
  kycGetApiClient.get(`/transaction/transaction-history?clientId=${id}`);

// subscriptions ==========>>
const SubscribeService = (data, accesstoken, key) =>
  ApiClient.post(
    "/subscription/subscribe-service",
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );
const getProductsData = (client) =>
  kycGetApiClient.get(`/subscription/service-status-count/${client}`);

// Api Keys =========>>>
const HandleFetchAllKeys = (data) =>
  kycGetApiClient.get(`/keys/TestandLive/clientKeys?clientId=${data}`);
const HandleCreateKeys = (data, accesstoken, key) =>
  ApiClient.post(
    "/keys/create/clientKeys",
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );

// services ========>\
const HandleGetProducts = () =>
  kycGetApiClient.get(`/service/get-all-services`);

// whitelist ip ==========>>>
const HandleFetchIP = (clientId) =>
  kycGetApiClient.get(`/ip/get/whitelist/${clientId}`);
const HandleCreateIP = (data, accesstoken, key) =>
  ApiClient.post(
    `/ip/store/whitelist`,
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );
const HandleDeleteIP = (id, client) =>
  kycGetApiClient.delete(`/ip/delete/whitelist/${id}/${client}`);

// Reports =========>>>
const HandlegetReports = (data, accesstoken, key) =>
  kycApiClient.post(
    `report/getallReports`,
    { ...data, publicKeyPem: key },
    {
      headers: { secret_token: accesstoken },
    },
  );
const HandleDownloadReport = (data, accesstoken, key) =>
  kycApiClient.post(
    `report/download`,
    { ...data, publicKeyPem: key },
    {
      headers: {
        secret_token: accesstoken,
      },

      responseType: "blob",
    },
  );

// over view ============>>>
const HandleGetApiCost = (client, service, day) =>
  kycGetApiClientAnalytics.get(
    `analytics/service-analytics?clientId=${client}&serviceId=${service}&days=${day}`,
  );

// view analytics ===========>>>
const getLast7DaysHits = (client, service, category) =>
  kycGetApiClientAnalytics.get("/analytics/last-7-days", {
    params: {
      client,
      service,
      category,
    },
  });
const HandleApiCount = (accesstoken, encryptedPayload, encrypt) =>
  kycApiClientAnalytics.post(
    `analytics/ApiCallCount`,
    { ...encryptedPayload, publicKeyPem: encrypt },
    {
      headers: { secret_token: accesstoken },
    },
  );

const getAnalyticsService = (clientId) =>
  kycGetApiClientAnalytics.get(
    `/analytics/Analyticalreports${clientId ? `?clientId=${clientId}` : ""}`,
  );

const getApiErrorCount = (clientId) =>
  kycApiClient.post(`analytics/ApiErrorCount`, { clientId });

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
  HandleGetApiCost,
  HandleCreateIP,
  HandleQrResponse,
  HandleQrstatus,
  HandleFetchIP,
  HandleDeleteIP,
  HandleDeleteKey,
  GetWalletBalance,
  GetTotalBalance,
  GetWalletHistory,
  HandlegetReports,
  HandleDownloadReport,
  HandleGetProducts,
  HandleCreateReportResponse,
  getBillingTypeApi,
  GetBillingAmountApi,
  getTransactionsData,
  getRecentCallData,
  getAnalyticsService,
  getLast7DaysHits,
  getApiErrorCount,
  HandleRefreshToken,
  GenerateTestKeys,
  GetTestKeys,
  RemoveTestKey,
};
