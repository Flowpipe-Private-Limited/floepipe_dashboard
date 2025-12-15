import axios from "axios";
import EXResponse from "../../components/common/response";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useEffect, useState } from "react";
import { ERROR_RESPONSES } from "../../utils/KYCContext/kycContex";
import { ApirequestHandler, EncryptedApirequestHandler } from "../../utils/Apis/apiRequestHandler";
import { ApiVerification, fetchPublickey } from "../../utils/Apis/api";
import { encryptPayload, generateFrontendKeyPair } from "../../utils/helper";
import { useUserStore } from "../../Store/userStore";
import { useNavigate } from "react-router-dom";

const KycReuseComponet = ({ data }) => {
    const {IskycApproved,kycCompleted} = useUserStore()
    const [formData, setFormData] = useState({});
    const [Publickey, setPublickey] = useState('')
    const [apiResponse, setApiResponse] = useState({});
    const [Loading, setLoading] = useState(false);
    const [apiErrorMessage, setApiErrormessage] = useState('');
    const [errors, setErrors] = useState({}); // ONly for the regex 
    const [showAlert, setShowAlert] = useState(false);
    const [selectedExampleCode, setSelectedExampleCode] = useState(
        data.exampleResponse
    );

    const HandleChangeInput = (e) => {
        console.log('Handle input change is trigred')
        setApiErrormessage("")
        const { name, value, pattern } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (pattern) {
            const regex = new RegExp(pattern);
            if (!regex?.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    [name]: "Invalid Input format",
                }));
            } else {
                setErrors((prev) => {
                    const updated = { ...prev };
                    delete updated[name];
                    console.log(updated)
                    return updated;
                });
            }
        }
    };

    const HandleVerificaton = async () => {
        if (Object.keys(errors).length > 0) {
            setApiErrormessage("Please fix the validation errors before submitting.");
            return;
        }
        const hasEmptyField = data?.inputParams?.some(
            (key, index) => !data?.isDisable && !formData?.[key]
        );
        if (hasEmptyField) {
            setApiErrormessage("All fields are required.");
            return;
        }

        console.log('Handle Verification');

        let finalPayload = await encryptPayload(formData, Publickey);
        console.log('is called', finalPayload);
        const { publicKeyPem, privateKeyPem } = await generateFrontendKeyPair()
        window.PRIVITEKEY = privateKeyPem;
        console.log(finalPayload, publicKeyPem, privateKeyPem);
        if (!IskycApproved || !kycCompleted) {
            console.log('is trigred')
            setShowAlert(true);
            return;
        };
        setApiErrormessage('');
        setLoading(true);

        await ApirequestHandler(
            async () => await ApiVerification(data?.apiUrl?.URLS, { ...finalPayload, publicKeyPem }),
            setLoading,
            (res) => {
                const { data } = res;
                console.log(data)
                setApiResponse(data);
                setApiErrormessage('');
                setLoading(false)
            },
            (errorMessage) => {
                console.log('Error:', errorMessage);
                setApiErrormessage(errorMessage);
                setLoading(false);
            }
        )
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.log("Clipboard blocked, using fallback");
            const textarea = document.createElement("textarea");
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            textarea.remove();
        }
    };

    const GetPublickey = async () => {
        console.log('is called');
        await ApirequestHandler(
            async () => fetchPublickey(),
            null,
            (res) => {
                const { publicKey } = res;
                console.log(publicKey)
                setPublickey(publicKey);
            },
            (errMessage) => {
                console.log(errMessage)
            }
        )
        // const response = await axios.get(`${process.env.REACT_APP_DASHBOARD_URL}ApiModuel/key/Publickey`);
        // const { publicKey } = response.data;
        // console.log(response)
        // setPublickey(publicKey);
    }

    useEffect(() => {
        GetPublickey()
    }, [])


    return (
        <div className="mainDashBaord font-sans w-full mb-10 ">
            <div className="Container grid grid-cols-1 lg:grid-cols-2 gap-1 p-3">

                {/* LEFT INPUT SECTION */}
                <div className="border border-gray-300 rounded-xl bg-white shadow p-4">
                    <div className="text-3xl font-bold text-gray-800 tracking-wide">
                        {data?.title?.header}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">
                        {data?.title?.headerTitle}
                    </p>

                    <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow p-6">
                        {data?.inputParams?.map((input, index) => (
                            <div key={index} className="mb-4">
                                <label className="block text-sm font-semibold text-purple-900 mb-2">
                                    {input.replace(/([A-Z])/g, " $1").toUpperCase()} <span className="text-gray-400">{data?.bodyParams}</span> :
                                </label>
                                <input
                                    type="text"
                                    placeholder={!data?.isDisable ? `Enter ${input}` : ''}
                                    name={input}
                                    pattern={data?.regexValues?.[index]}
                                    value={data?.isDisable ? data?.Inputvalues[index] : formData?.[input] || ""}
                                    disabled={data?.isDisable}
                                    className={`w-full px-4 py-2 text-gray-900 border rounded-lg shadow-sm focus:outline-none focus:ring-2
                                            ${errors?.[input]
                                            ? "border-red-500 focus:ring-red-500"
                                            : formData?.[input]
                                                ? "border-green-500 focus:ring-green-500 focus:border-green-500"
                                                : "border-gray-300 focus:ring-purple-600 focus:border-purple-600"
                                        }`}
                                    onChange={HandleChangeInput}
                                />
                                {errors?.[input] && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors[input]}
                                    </p>
                                )}


                            </div>
                        ))}
                        <button
                            className=" mt-6 w-full bg-purple-700 text-white py-2.5 rounded-lg font-semibold tracking-wide shadow transition hover:shadow-[0_0_15px_rgba(139,92,246,0.7)] active:shadow-inner active:bg-purple-900"
                            onClick={HandleVerificaton}
                            disabled={data?.isDisable}
                        >
                            {Loading ? 'Loading ...' : data?.title?.submitButton}
                        </button>
                        {apiErrorMessage && (
                            <p className="mt-3 text-sm text-red-600 font-semibold">
                                {apiErrorMessage}
                            </p>
                        )}

                        {(!IskycApproved || !kycCompleted) && showAlert && (
                            <div className="relative mt-6 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800 shadow-sm">
                                <svg
                                    className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>

                                <p className="pr-8">
                                    Please complete your KYC verification. Once submitted, kindly wait for approval
                                </p>
                                <button
                                    onClick={() => setShowAlert(false)}
                                    className="absolute top-2 right-2 rounded-md p-1 text-red-600 hover:bg-red-100 hover:text-red-800 transition"
                                    aria-label="Close alert"
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                    </div>
                </div>

                {/* RIGHT OUTPUT SECTION */}
                <div className="outPutContainer h-screen overflow-auto">
                    <div className="p-4 border border-gray-300 rounded-xl bg-white shadow">
                        <div className="bg-[#0d1117] text-white p-5 rounded-xl">
                            <div className="bg-white text-gray-900 mb-4 p-3 rounded-lg shadow border border-gray-200">
                                <div className="flex items-center gap-3">
                                    <span className={`${data?.apiUrl?.Method === 'Get' ? 'bg-green-500' : ' bg-orange-500'} text-white px-3 py-2 rounded font-semibold text-sm`}>
                                        {data?.apiUrl?.Method}:
                                    </span>
                                    <select
                                        className="
                                             w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none
                                             focus:ring-2 focus:ring-orange-400 focus:border-orange-400
                                         "
                                    >
                                        <option>{data?.apiUrl?.liveUrl}</option>
                                        <option>{data?.apiUrl?.testUrl}</option>
                                    </select>
                                </div>
                            </div>
                            {/* CURL SECTION */}
                            <div className="Curl mt-6">
                                <div className="text-lg font-semibold mb-2">Example Request</div>

                                <div className="bg-[#0d1117] text-white p-4 rounded-lg border border-gray-700 font-mono overflow-x-auto max-h-[400px] relative">
                                    <div className="bg-gray-600 text-white px-2 py-1 rounded text-sm inline-block font-bold">
                                        Curl
                                    </div>

                                    <pre className="mt-2 whitespace-pre-wrap text-sm">
                                        <code className="language-bash">
                                            {data?.exampleCurl || EXResponse.AadhaarNumberCurl}
                                        </code>
                                    </pre>

                                    <button
                                        className="absolute top-3 right-3 text-xs px-2 py-1 border border-gray-400 rounded hover:bg-white hover:text-black transition"
                                        onClick={() =>
                                            handleCopy(data?.exampleCurl || selectedExampleCode)
                                        }
                                    >
                                        📋 Copy
                                    </button>
                                </div>
                            </div>

                            {/* RESPONSE SECTION */}
                            <div className="ExResponse mt-8">
                                <div className="text-lg font-semibold mb-2">Example Response</div>

                                <div className="flex justify-between items-center mb-2">
                                    <button className="bg-gray-700 text-white px-2 py-1 rounded">
                                        Response
                                    </button>
                                    <button
                                        className="bg-gray-700 text-green-400 px-6 py-1 rounded"
                                        onClick={() => setSelectedExampleCode(data?.exampleResponse || selectedExampleCode)}
                                    >
                                        200
                                    </button>

                                    <button
                                        className="bg-gray-700 text-orange-300 px-6 py-1 rounded"
                                        onClick={() => setSelectedExampleCode(ERROR_RESPONSES[400])}
                                    >
                                        400
                                    </button>

                                    <button
                                        className="bg-gray-700 text-red-400 px-6 py-1 rounded"
                                        onClick={() => setSelectedExampleCode(ERROR_RESPONSES[503])}
                                    >
                                        503
                                    </button>

                                    <button
                                        className="bg-gray-700 text-red-400 px-6 py-1 rounded"
                                        onClick={() => setSelectedExampleCode(ERROR_RESPONSES[504])}
                                    >
                                        504
                                    </button>

                                    <button
                                        className="border border-gray-400 text-gray-300 px-2 py-1 rounded text-sm hover:bg-gray-300 hover:text-black transition"
                                        onClick={() =>
                                            handleCopy(JSON.stringify(selectedExampleCode, null, 2))
                                        }
                                    >
                                        📋 Copy
                                    </button>
                                </div>

                                <SyntaxHighlighter
                                    language="json"
                                    style={atomOneDark}
                                    className="json-highlighter rounded-lg overflow-hidden"
                                >
                                    {JSON.stringify(apiResponse?.message ? apiResponse : selectedExampleCode, null, 2)}
                                </SyntaxHighlighter>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default KycReuseComponet;
