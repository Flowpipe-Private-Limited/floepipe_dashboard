import { create } from "zustand";
import Cookies from "js-cookie";
import {
  ApirequestHandler,
  EncryptedApirequestHandler,
} from "../utils/Apis/apiRequestHandler";
import {
  ApiVerification,
  getRecentCallData,
  HandleApiCount,
  HandleFetchAllKeys,
  HandleFetchIP,
} from "../utils/Apis/api";
import { AwardIcon } from "lucide-react";
import { encryptPayload, generateFrontendKeyPair } from "../utils/helper";

export const useUserkey = create((set, get) => ({
  TestSecretKey: "",
  TestClientId: "",
  TestAccessToken: "",
  LiveSecretKey: "",
  LiveClientId: "",
  LiveAccessToken: "",
  whitelistIps: [],
  currentPublicIp: "",
  userApiCount: "",
  walletBalance: "",
  recentCallData: [],
  loading: false,
  error: null,
  fetchUserskeys: async (force = false) => {
    const { TestClientId, LiveClientId } = get();
    if (!force && TestClientId && LiveClientId) return;

    const clientId = Cookies.get("clientId");
    set({ loading: true, error: null });

    await ApirequestHandler(
      async () => HandleFetchAllKeys(clientId),
      null, // Loading handled here
      (res) => {
        const { data } = res;
        console.log("data of keys ====>>", data);
        const {
          TestSecretKey,
          TestClientId,
          TestAccessToken,
          LiveSecretKey,
          LiveClientId,
          LiveAccessToken,
        } = data;
        set({
          TestSecretKey,
          TestClientId,
          TestAccessToken,
          LiveSecretKey,
          LiveClientId,
          LiveAccessToken,
          loading: false,
        });
      },
      (errMessage) => {
        set({
          loading: false,
          error: errMessage,
        });
      },
    );
  },

  fetchWhitelistIPs: async () => {
    const clientId = Cookies.get("clientId");
    if (!clientId) return;

    set({ loading: true, error: null });
    await ApirequestHandler(
      async () => HandleFetchIP(clientId),
      null,
      (res) => {
        set({
          whitelistIps: res?.data?.allowedIps || [],
          loading: false,
        });
      },
      (err) => {
        set({ error: err, loading: false });
      },
    );
  },

  fetchUserApiCount: async (accesstoken, encryptedPayload, publicKey) => {
    const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair();
    set({ loading: true, error: null });
    await EncryptedApirequestHandler(
      async () => HandleApiCount(accesstoken, encryptedPayload, publicKey),
      // async () => ApiVerification("KYC", "analytics/ApiCallCount", {...encryptedPayload, publicKeyPem}, accesstoken, "Post"),
      null,
      (res) => {
        console.log("res in total api count====>>", res);
        set({
          userApiCount: res?.data || 0,
          loading: false,
        });
      },
      (err) => {
        console.log("error while getting user api count ===>>", err)
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

  addWhitelistIP: (ipData) => {
    set((state) => ({
      whitelistIps: [...state.whitelistIps, ipData],
    }));
  },

  deleteWhitelistIP: (ipId) => {
    set((state) => ({
      whitelistIps: state.whitelistIps.filter(
        (item) => (item._id || item.ip) !== ipId,
      ),
    }));
  },

  detectCurrentIp: async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      set({ currentPublicIp: data.ip });
    } catch (err) {
      console.error("IP Detection Failed:", err);
    }
  },
  updateLiveKeys: (resdata) => {
    const { LiveSecretKey, LiveClientId, LiveAccessToken } = resdata;
    set({
      LiveSecretKey: LiveSecretKey,
      LiveClientId: LiveClientId,
      LiveAccessToken: LiveAccessToken,
    });
  },
  updateTestKeys: (resdata) => {
    const { TestSecretKey, TestClientId, TestAccessToken } = resdata;
    set({
      TestSecretKey: TestSecretKey,
      TestClientId: TestClientId,
      TestAccessToken: TestAccessToken,
    });
  },
  clearLiveKeys: () => {
    set({
      LiveSecretKey: "",
      LiveClientId: "",
      LiveAccessToken: "",
    });
  },
  clearTestKeys: () => {
    set({
      TestSecretKey: "",
      TestClientId: "",
      TestAccessToken: "",
    });
  },
}));
