import { create } from "zustand";
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { fetchPublickey } from "../utils/Apis/api";

export const GeneralKeys = create((set, get) => ({
    publicKey: '',
    privateKey: '',
    PublicKey: "",
    setPubKey: (data)=>{
        const {publicKey, privateKey} = data
        set({publicKey, privateKey})
    },
    getPublicKey: async ()=>{
        await ApirequestHandler(
              async () => fetchPublickey(),
              null,
              (res) => {
                const { publicKey } = res;
                console.log("publickey is this :", publicKey);
                setPublickey(publicKey);
              },
              (errMessage) => {
                console.log("error ===>>", errMessage);
              },
            );
    }
}));
