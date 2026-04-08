import { create } from "zustand";

export const GeneralKeys = create((set, get) => ({
    publicKey: '',
    privateKey: '',
    setPubKey: (data)=>{
        const {publicKey, privateKey} = data
        set({publicKey, privateKey})
    },
}));
