import { create } from "zustand";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../utils/Apis/apiRequestHandler";
import {
  getRecentCallData,
  HandleApiCount,
  HandleGetProducts,
} from "../utils/Apis/api";

export const analytics = create((set, get) => ({
  userApiCount: "",
  recentCallData: [],
  serviceNameData: [],

  fetchUserApiCount: async (accesstoken, encryptedPayload, publicKey) => {
    set({ loading: true, error: null });
    await EncryptedApirequestHandler(
      async () => HandleApiCount(accesstoken, encryptedPayload, publicKey),
      null,
      (res) => {
        console.log("res in total api count====>>", res);
        set({
          userApiCount: res?.data || 0,
          loading: false,
        });
      },
      (err) => {
        console.log("error while getting user api count ===>>", err);
        set({ error: err, loading: false });
      },
    );
  },

  fetchRecentCallData: async (data) => {
    set({ loading: true, error: null });
    await ApirequestHandler(
      async () => getRecentCallData(data),
      null,
      (res) => {
        console.log("res in transaction data ====>>", res);
        const result = res?.data;
        const formattedData = result?.filter((item) => {
          return item?.type == "DEBIT";
        });
        const slicedData = formattedData?.slice(0, 10);
        set({
          recentCallData: slicedData || [],
          walletBalance: res?.walletBalance,
          loading: false,
        });
      },
      (err) => {
        set({ error: err, loading: false });
      },
    );
  },

  fetchServiceNameData: async () => {
    set({ loading: true, error: null });
    await ApirequestHandler(
      async () => HandleGetProducts(),
      null,
      (res) => {
        console.log("res in services data ====>>", res);
        const prodData = res?.data;
        const neededData = prodData.map((item) => ({
          serviceId: item.serviceId,
          serviceName: item.serviceName,
        }));
        set({
          serviceNameData: neededData || [],
          loading: false,
        });
      },
      (err) => {
        set({ error: err, loading: false });
      },
    );
  },
}));
