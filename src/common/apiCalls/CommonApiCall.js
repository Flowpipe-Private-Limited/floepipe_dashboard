import { VerifyFPIN } from "../../utils/Apis/api";
import { EncryptedApirequestHandler } from "../../utils/Apis/apiRequestHandler"


export const HandleVerifyFPIN = async(data)=>{
    if(!data?.FPIN){
        return false;
    }
    await EncryptedApirequestHandler(
        async()=> await VerifyFPIN(data),
        null,
        (res)=>{
            const {success} = res;
            return success
        },
        (errMessage)=>{
            console.log('API Error:',errMessage)
            return false;
        }
    )
}
