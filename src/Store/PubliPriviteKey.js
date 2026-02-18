import { create } from "zustand";

export const GeneralKeys = create((set, get) => ({
    Pubkeys: '',
    Prikeys: '',
    setPubKey: (data)=>{
        const {publicKey,PrivateKey} = data
        set({Pubkeys:publicKey,Prikeys:PrivateKey})
    },
}));
