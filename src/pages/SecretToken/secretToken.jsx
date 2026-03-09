import KycReuseComponet from "../../components/common/KycInputOut"
import { SecretToken } from "../../utils/KYCContext/kycContex"


const GenerateSecretToken = ()=>{
    return(
        <KycReuseComponet data={SecretToken} />
    )
}
export default GenerateSecretToken