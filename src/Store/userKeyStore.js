import { create } from "zustand";
import Cookies from 'js-cookie'
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { HandleFetchAllKeys, HandleFetchIP } from "../utils/Apis/api";
import { AwardIcon } from "lucide-react";

export const useUserkey = create((set, get) => ({
    TestSecretKey: "",
    TestClientId: '',
    TestAccessToken: '',
    LiveSecretKey: '',
    LiveClientId: '',
    LiveAccessToken: '',
    whitelistIps: [],
    currentPublicIp: '',
    loading: false,
    error: null,
    fetchUserskeys: async (force = false) => {
        const { TestClientId, LiveClientId } = get();
        if (!force && TestClientId && LiveClientId) return;

        const clientId = Cookies.get('clientId');
        set({ loading: true, error: null });

        await ApirequestHandler(
            async () => HandleFetchAllKeys(clientId),
            null, // Loading handled here
            (res) => {
                const { data } = res;
                const { TestSecretKey, TestClientId, TestAccessToken, LiveSecretKey, LiveClientId, LiveAccessToken } = data
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
        )
    },

    fetchWhitelistIPs: async () => {
        const clientId = Cookies.get('clientId');
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
            }
        );
    },

    addWhitelistIP: (ipData) => {
        set((state) => ({
            whitelistIps: [...state.whitelistIps, ipData]
        }));
    },

    deleteWhitelistIP: (ipId) => {
        set((state) => ({
            whitelistIps: state.whitelistIps.filter(item => (item._id || item.ip) !== ipId)
        }));
    },

    detectCurrentIp: async () => {
        try {
            const res = await fetch('https://api.ipify.org?format=json');
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
            LiveAccessToken: LiveAccessToken
        });
    },
    updateTestKeys: (resdata) => {
        const { TestSecretKey, TestClientId, TestAccessToken } = resdata;
        set({
            TestSecretKey: TestSecretKey,
            TestClientId: TestClientId,
            TestAccessToken: TestAccessToken
        });
    },
    clearLiveKeys: () => {
        set({
            LiveSecretKey: '',
            LiveClientId: '',
            LiveAccessToken: ''
        });
    },
    clearTestKeys: () => {
        set({
            TestSecretKey: '',
            TestClientId: '',
            TestAccessToken: ''
        });
    }
}));
