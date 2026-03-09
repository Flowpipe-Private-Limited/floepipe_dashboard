import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { ApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { GetMerchantWallet } from "../../utils/Apis/api";
import { addWallet } from "../../redux/slice/wallet/walletSlice";

const useGetWallet = () => {
    const dispatch = useDispatch();
    const fetchWallet = useCallback(async () => {
        await ApirequestHandler(
            () => GetMerchantWallet(),
            null, // No setLoading handling needed here as per original code context, or add if preferred
            (res) => {
                if (res?.wallet) {
                    dispatch(addWallet(res.wallet));
                }
            },
            (err) => {
                console.error(err);
            }
        );
    }, [dispatch]);
    return fetchWallet;
};

export default useGetWallet;
