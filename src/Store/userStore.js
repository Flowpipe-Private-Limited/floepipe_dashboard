import { create } from "zustand";
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { HandleGetUser, UpdatedUserDetails } from "../utils/Apis/api";
import { AwardIcon } from "lucide-react";


// kycCompleted
// IskycApproved

export const useUserStore = create((set, get) => ({
    users: [],
    IskycApproved: false,
    kycCompleted: false,
    loading: false,
    error: null,
    fetchUsers: async (force = false) => {
        const { users } = get();

        if (!force && users.length > 0) return;

        set({ loading: true, error: null });

        await ApirequestHandler(
            async () => HandleGetUser(),
            null,
            (res) => {
                set({
                    users: res?.data,
                    IskycApproved:res?.data?.IskycApproved,
                    kycCompleted:res?.data?.kycCompleted,
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
    updateUsers: async (detailstoUpdated)=>{
        await ApirequestHandler(
            async ()=> await UpdatedUserDetails(detailstoUpdated),
            null,
            (res)=>{
                const {data, success} = res;
                if(success){
                    set({
                        users:data,
                        IskycApproved:res?.data?.IskycApproved,
                    kycCompleted:res?.data?.kycCompleted,
                    loading: false,
                    })
                }
            },
            (errMessage)=>{
                set({
                    loading:false,
                    error:errMessage
                })
            }
        )
    }  
}));
