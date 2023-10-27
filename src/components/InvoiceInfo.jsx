import React from 'react';
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import API_URL from "../api/apiAddress";

const InvoiceInfo = () => {
  const { currentColor } = useStateContext();
  const [company, setCompany] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [ein, setEin] = React.useState("");

  const handleUpdate = async () => {
    const token = localStorage.getItem("jwtToken");
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const body = JSON.stringify({
      company,
      address,
      // ein
    });

    try {
      const response = await fetch(`${API_URL}/users/info/`, {
        method: 'PUT',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error("Error updating information");
      }

      alert("Information updated successfully!");
    } catch (error) {
      console.error("Error updating information:", error);
      alert("Error updating information");
    }
  };

  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Company Info(optional): </h6>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
          <div className='flex justify-between items-center'>
            <label> Company Name: </label>
            <input
              className='border-2 p-2 rounded w-2/3'
              type='text'
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className='flex justify-between items-center'>
            <label>Company Address:</label>
            <input
              className='border-2 p-2 rounded w-2/3'
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          {/* <div className='flex justify-between items-center'>
            <label>EIN:</label>
            <input
              className='border-2 p-2 rounded w-2/3'
              type='text'
              value={ein}
              onChange={(e) => setEin(e.target.value)}
            /> */}
          {/* </div> */}
        </div>
        <div className="md:mb-5 ">
          <Button
            color="white"
            bgColor={currentColor}
            text="Submit"
            onClickCallback={handleUpdate}
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  );
};

export default InvoiceInfo;