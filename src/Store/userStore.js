import { create } from "zustand";
import Cookies from 'js-cookie';
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { HandleFetchAllKeys, HandleGetUser, UpdatedUserDetails } from "../utils/Apis/api";

export const useUserStore = create((set, get) => ({
    users: [],
    clientId: '',
    IskycApproved: false, // Flag: Checks if admin has approved the KYC
    kycCompleted: false,  // Flag: Checks if the user has completed the KYC process

    // --- KYC Status Flags ---
    isIndividual: false, // Flag: Indicates if Individual KYC form is submitted
    isCompany: false,    // Flag: Indicates if Business KYC form is submitted

    // --- Form Data Persistence ---
    individualKycData: null, // Stores submitted Individual KYC data
    businessKycData: null,   // Stores submitted Business KYC data

    // --- Actions to Update Local State ---
    setIndividualKycData: (data) => set({ individualKycData: data, isIndividual: true }),
    setBusinessKycData: (data) => set({ businessKycData: data, isCompany: true }),

    isLocked: sessionStorage.getItem('isLocked') === 'true', // Persistence across partial refreshes
    setIsLocked: (value) => {
        sessionStorage.setItem('isLocked', value);
        set({ isLocked: value });
    },

    isLocked: sessionStorage.getItem('isLocked') === 'true', // Persistence across partial refreshes
    setIsLocked: (value) => {
        sessionStorage.setItem('isLocked', value);
        set({ isLocked: value });
    },

    loading: false, // Loading state for async operations
    error: null,    // Error message if any operation fails
    // --- Async Actions ---

    // Fetches user details from the backend. If `force` is false, it uses cached data if available.
    fetchUsers: async (force = false) => {
        const { users } = get();
        const clientId = Cookies.get('clientId');

        if (!force && users && (Array.isArray(users) ? users.length > 0 : Object.keys(users).length > 0)) return;

        set({ loading: true, error: null });

        await ApirequestHandler(
            async () => HandleGetUser(clientId),
            null, // Loading handled here
            (res) => {
                set({
                    clientId: res?.clientId,
                    users: res?.data,
                    IskycApproved: res?.data?.IskycApproved,
                    kycCompleted: res?.data?.kycCompleted,
                    isIndividual: res?.data?.isIndividual || get().isIndividual,
                    isCompany: res?.data?.isCompany || get().isCompany,
                    individualKycData: res?.data?.individualKycData || get().individualKycData,
                    businessKycData: res?.data?.businessKycData || get().businessKycData,
                    loading: false,
                });
            },
            (errMessage) => {
                set({
                    loading: false,
                    error: errMessage,
                });
            }
        );
    },
    // Updates specific user details in the backend and refreshes the local store on success.
    updateUsers: async (detailstoUpdated) => {
        await ApirequestHandler(
            async () => await UpdatedUserDetails(detailstoUpdated),
            null,
            (res) => {
                const { data, success } = res;
                if (success) {
                    set({
                        users: data,
                        IskycApproved: res?.data?.IskycApproved,
                        kycCompleted: res?.data?.kycCompleted,
                        loading: false,
                    })
                }
            },
            (errMessage) => {
                set({
                    loading: false,
                    error: errMessage
                })
            }
        )
    }
}));
