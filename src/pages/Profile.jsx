import React from "react";
import { useState } from "react";
import { Header } from "../components";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
// import { Divider } from "@mui/material";

const Profile = () => {
  const { currentColor } = useStateContext();
  const [selectedPay, setSelectedPay] = useState(" ");
  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="Profile" title="Welcome" />

      <form className="infoForm">
        <h3>Your Info</h3>

        <div>
          <h6 className="mt-4 w-48">Company Name: </h6>

          <input
            type="text"
            className="infoInput"
            name="companyName"
            // onChange={handleChange}
            // value={formData.companyname}
          />
        </div>

        <div>
          <h6 className="mt-4 w-48">Email: </h6>
          <input type="text" className="infoInput" name="email" />
        </div>

        <div>
          <h6 className="mt-4 w-48">Telephone:</h6>
          <input type="text" className="infoInput" name="telephone" />
        </div>

        <div>
          <h6 className="mt-4 w-48">Billing Address: </h6>
          <input type="text" className="infoInput" name="billingAddress" />
        </div>

        <div>
          <h6 className="mt-4 w-48">EIN:</h6>
          <input type="" className="infoInput" name="EIN" />
        </div>

        <div>
          <h6 className="mt-4 w-48">Payment Method: </h6>
          <select
            value={selectedPay} // ...force the select's value to match the state variable...
            onChange={(e) => setSelectedPay(e.target.value)} // ... and update the state variable on any change!
          >
            <option value="cypto">Cypto</option>
            <option value="card">Credit Card</option>
            <option value="bank"> Bank </option>
          </select>
        </div>

        <Button
          color="white"
          bgColor={currentColor}
          text="Submit"
          borderRadius="10px"
        />
      </form>

      {/* <Divider className="py-5">   </Divider> */}
      <div className="mt-8 border-t-4"> </div>

      <form className="infoForm mt-12">
        <h3>Change Password</h3>

        <div>
          <h6 className="mt-4 w-48">Old Password: </h6>

          <input
            type="password"
            className="infoInput"
            name="oldPass"
            // onChange={handleChange}
            // value={formData.companyname}
          />
        </div>

        <div>
          <h6 className="mt-4 w-48">New Password: </h6>
          <input type="password" className="infoInput" name="newPass" />
        </div>

        <div>
          <h6 className="mt-4 w-48">Confirm Password:</h6>
          <input type="password" className="infoInput" name="confirmPass" />
        </div>

        <Button
          color="white"
          bgColor={currentColor}
          text="Update"
          borderRadius="10px"
        />
      </form>
    </div>
  );
};

export default Profile;
