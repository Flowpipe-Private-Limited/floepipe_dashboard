import { VerifyIPIN } from "../../utils/Apis/api";
import { EncryptedApirequestHandler } from "../../utils/Apis/apiRequestHandler"


export const HandleVerifyIPIN = async(data)=>{
    if(!data?.IPIN){
        return false;
    }
    await EncryptedApirequestHandler(
        async()=> await VerifyIPIN(data),
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
