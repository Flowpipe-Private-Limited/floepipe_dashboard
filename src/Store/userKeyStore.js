import { create } from "zustand";
import Cookies from 'js-cookie'
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { HandleFetchAllKeys } from "../utils/Apis/api";
import { AwardIcon } from "lucide-react";

export const useUserkey = create((set, get) => ({
    TestSecretKey: "",
    TestClientId: '',
    TestAccessToken: '',
    LiveSecretKey: '',
    LiveClientId: '',
    LiveAccessToken: '',
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
    }
}));
