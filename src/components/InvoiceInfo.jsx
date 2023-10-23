import {React, useState} from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import { updateUserInfo } from "../api";

const InvoiceInfo = () => {
  const { currentColor } = useStateContext();
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [ein, setEIN] = useState("");
  
  const handleSubmit = (event) => {
    console.log(companyName, companyAddress, ein)
    updateUserInfo(companyName, companyAddress, ein)
    .then((res) => {
      console.log("res",res)
      alert ("Company Info Updated Successfully")    
       
    })
    .catch((error) => {
      console.error("Failed to Update Company Info", error);
    });

  }

  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Company Info(optional): </h6>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
          <div className="flex justify-between items-center">
            <label> Company Name : </label>
            <input
              className="border-2 p-2 rounded w-2/3"
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label>Company Address:</label>
            <input
              className="border-2 p-2 rounded w-2/3"
              type="text"
              value={companyAddress}
              onChange={(e) => setCompanyAddress(e.target.value)}
            />
          </div>

          <div className="flex justify-between items-center">
            <label>EIN:</label>
            <input
              className="border-2 p-2 rounded w-2/3"
              type="text"
              value={ein}
              onChange={(e) => setEIN(e.target.value)}
            />
          </div>
        </div>
        <div className="md:mb-5 ">
          <Button
            color="white"
            bgColor={currentColor}
            text="Submit"
            onClickCallback={handleSubmit}
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;
