import { create } from "zustand";
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { fetchPublickey } from "../utils/Apis/api";

export const GeneralKeys = create((set, get) => ({
  publicKey: "",
  privateKey: "",
  PublicKey: "",
  setPubKey: (data) => {
    const { publicKey, privateKey } = data;
    set({ publicKey, privateKey });
  },
  getPublicKey: () => {
    // Wrap in a Promise so the caller can await the actual result
    return new Promise((resolve, reject) => {
      ApirequestHandler(
        async () => fetchPublickey(),
        null,
        (res) => {
          const { publicKey } = res;
          console.log("publickey is this :", publicKey);
          set({ PublicKey: publicKey });  // still updates store
          resolve(publicKey);             // ✅ now the caller gets the value
        },
        (errMessage) => {
          console.log("error ===>>", errMessage);
          resolve(null);                  // resolve null so init() doesn't crash
        },
      );
    });
  },
}));
