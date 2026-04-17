import axios from "axios";
import { useState } from "react";
import { ApirequestHandler } from "../utils/Apis/apiRequestHandler";
import { handlieFileUpload } from "../utils/Apis/api";

const TESTUI = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async () => {
    try{
        const res = await axios.get('http:10.1.1.56:7017/health');
        console.log('res', res.data);
    }catch(error){
        console.log('error', error)
    }
    // const formData = new FormData();

    // formData.append("file", file);
    // await ApirequestHandler(
    //   async () => await handlieFileUpload(formData),
    //   null,
    //   (res) => {
    //     console.log("Api requrest Handler response", res);
    //     const { data, message } = res;
    //     console.log("file upload response message: ", message, " DATA: ", data);
    //   },
    //   (errorMessage) => {
    //     console.log("ERROR: ", errorMessage);
    //   },
    // );
  };

  return (
    <div className="text-secondary">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default TESTUI;
