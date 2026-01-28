import axios from "axios";
import { toast } from "react-toastify";


const Call_Api = async (routes, method, param = {}, token = '') => {
  const apiUrl = import.meta.env.REACT_APP_BACKEND_URL;
  const url = `${apiUrl}${routes}`;

  let headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
    headers['client_id'] = import.meta.env.REACT_APP_CLIENT_ID;
    headers['secret_key'] = import.meta.env.REACT_APP_SECRET_KEY;
  }

  let config = {
    method: method,
    url: url,
    headers: headers,
  };

  if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
    config = {
      ...config,
      data: param,
    };
  } else if (method === 'GET' || method === 'DELETE') {
    if (param && typeof param === "object" && Object.keys(param).length > 0) {
      const queryParams = new URLSearchParams(param).toString();
      config.url = `${url}?${queryParams}`;
    }
  }

  try {
    const response = await axios(config);
    return { success: true, response: response.data };
  } catch (error) {
    console.error('API call error:', error);
    toast.error(error.response?.data?.message);
    return { success: false, message: error.response?.data?.message || error.message };
  }
};

export default Call_Api;
