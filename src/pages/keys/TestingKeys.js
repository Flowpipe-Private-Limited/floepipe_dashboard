import React, { useEffect, useState } from "react";
import Call_Api from "../../Handileapicall/call_api";
import { toast } from "react-toastify";
import "./testingKeys.css";
import axios from "axios";
import { useSelector } from "react-redux";
import data from "../../json/Data";

const TestingKeys = () => {
  const [showData, setShowData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const apiUrl = import.meta.env.REACT_APP_BACKEND_URL;

  const user = useSelector((state) => state.user.user);
  console.log(user);

  const handleGenerateTestApiKey = async () => {
    try {
      const res = await Call_Api(
        "/key/generateTestCredentials",
        "POST",
        {},
        token
      );
      console.log(res?.response?.response);
      await getApiKeys();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.MerchantId) {
      getApiKeys();
    }
  }, [user?.MerchantId]);

  const getApiKeys = async () => {
    try {
      const res = await Call_Api(
        `/key/getKeys/${user?.MerchantId}`,
        "GET",
        {},
        token
      );
      console.log(res);
      console.log(res?.response?.response);
      setShowData(res?.response?.response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await Call_Api(`/key/removeKey/${id}`, "DELETE", {}, token);
      console.log(res?.response?.response);
      await getApiKeys();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCopy = (copydata) => {
    navigator.clipboard.writeText(copydata || "");
    toast.success("Copied!");
  };

  const handleExcelDownload = async (merchant) => {
    try {
      const response = await axios.post(
        `${apiUrl}/key/excelDownload`,
        { id: merchant }, // Send the id (merchant) in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token if needed
          },
          responseType: "blob", // This ensures Axios handles the response as a binary file (blob)
        }
      );

      console.log(response, "response");

      // Create a Blob URL for the downloaded file
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create an anchor element to trigger the download
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "ApiKeys.xlsx"; // Filename for the downloaded file
      document.body.appendChild(a);
      a.click(); // Trigger the download

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error during the download:", error);
    }
  };

  return (
    <div className="testingKeysDiv">
      <h1 className="">{data?.TestingApiKeys}</h1>
      <div
        className="genDiv"
        onClick={() => handleGenerateTestApiKey()}
        style={{ cursor: "pointer" }}
      >
        <button className="text-center genBtn">
          Generate Test Api Details
        </button>
        <p className="">
          You Have Generated{" "}
          <span className="text-danger">
            {showData ? showData?.length : 0}
          </span>{" "}
          Api Keys out of {""}
          <span className="text-danger">3</span> and{" "}
          <span>
            You have Left with{" "}
            <span className="text-danger">
              {showData ? 3 - showData?.length : 3}
            </span>
          </span>
        </p>
      </div>
      <div className="tableDiv">
        {showData?.length > 0 && showData
          ? <table className="table">
            <thead>
              <tr className="keyTH">
                <th className="keyTH">SI.No</th>
                <th className="keyTH">client_id</th>
                <th className="keyTH"></th>
                <th className="keyTH">secret_key</th>
                <th className="keyTH"></th>
                <th className="keyTH">Actions</th>
              </tr>
            </thead>
            <tbody>
              {showData?.map((key, index) => (
                <tr key={index} className="keyTH">
                  <td className="keyTH">{index + 1}</td>
                  <td className="keyTH">{key?.client_id}</td>
                  <td className="keyTH">   <button
                    className="btn btn bi-copy"
                    onClick={() => handleCopy(key.client_id)}
                  ></button></td>
                  <td className="keyTH">{key?.secret_key}</td>
                  <td className="keyTH">   <button
                    className="btn btn bi-copy"
                    onClick={() => handleCopy(key?.secret_key)}
                  ></button></td>
                  <td className="keyTH">       <button
                    className="btn bi-trash3 text-danger"
                    onClick={() => handleDelete(key?._id)}
                  ></button>
                    <button
                      className="btn bi-cloud-arrow-down"
                      onClick={() => handleExcelDownload(key?._id)}
                    ></button></td>
                </tr>
              ))}
            </tbody>
          </table> : <h2>{data?.NoKeysFound}</h2>}

      </div>
    </div>
  );
};

export default TestingKeys;
