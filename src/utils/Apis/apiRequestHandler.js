import { GeneralKeys } from "../../Store/PubliPriviteKey";
import { decryptServerResponse } from "../helper";

// Helper to handle common request logic
const baseHandler = async (api, setLoading, onSuccess, onError, decrypt = false) => {
  if (setLoading) setLoading(true);
  try {
    const response = await api();
    let data = response.data;

    if (decrypt) {
      const { Prikeys } = GeneralKeys.getState();
      data = await decryptServerResponse(data?.payload, Prikeys);
    }

    if (data?.success) {
      onSuccess(data || []);
    } else {
      throw new Error(data?.message || "Unknown error occurred");
    }
  } catch (error) {
    console.error("API Request Error:", error);
    const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
    onError(errorMessage);
  } finally {
    if (setLoading) setLoading(false);
  }
};

export const ApirequestHandler = (api, setLoading, onSuccess, onError) =>
  baseHandler(api, setLoading, onSuccess, onError);

export const EncryptedApirequestHandler = (api, setLoading, onSuccess, onError) =>
  baseHandler(api, setLoading, onSuccess, onError, true);

