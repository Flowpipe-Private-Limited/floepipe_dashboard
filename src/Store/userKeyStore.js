import { create } from "zustand";
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
    fetchUserskeys: async () => {
        const clientId = localStorage.getItem('clientId')
        console.log(clientId);
        set({ loading: true, error: null });

        await ApirequestHandler(
            async () => HandleFetchAllKeys(clientId),
            (res) => {
                set({ loading: res })
            },
            (res) => {
                const { data } = res;
                console.log(data);
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
                console.log("Error:", errMessage);
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
