import React from "react";
import { useState,useEffect } from "react";
import { Header } from "../components";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Profile = () => {
  const { currentColor } = useStateContext();

  const [isToggled, setToggled] = useState(() => {
    const storedValue = localStorage.getItem('crypto');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  

  const handleToggle = () => {
    const newValue = !isToggled;
    setToggled(newValue);
    localStorage.setItem('crypto', JSON.stringify(newValue));
  };


  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="Profile" title="Welcome" />

      <form className="infoForm">
        <h3>Your Info</h3>

        <div className="flex flex-row items-center">
          <h6 className="mt-4 w-48">Payment Method: </h6>
          <span className="text-gray-700">$USD</span>

          <div
            className={`relative h-8 inline-block w-14 align-middle select-none transition duration-200 ease-in ${
              isToggled ? "bg-blue-400" : "bg-gray-300"
            } rounded-xl p-1`}
            onClick={handleToggle}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in transform ${
                isToggled ? "translate-x-full" : ""
              }`}
            ></div>
          </div>
          <span className="text-gray-700 ml-2">Crypto</span>
          <div className="text-xs">
            Note: based on the user selection above, we will either display the
            left or right
          </div>
        </div>

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

        {isToggled ? (
          <div>
            <div>
              <h6 className="mt-4 w-48">Crypto:</h6>
            </div>
            {/* <input type="" className="infoInput" name="EIN" /> */}
          </div>
        ) : (
          <>
            <div>
              <h6 className="mt-4 w-48">BANK ACCOUNT:</h6>
              <input type="" className="infoInput" name="bank" />
            </div>

            <div>
              <h6 className="mt-4 w-48">ROUTING/SWIFT:</h6>
              <input type="" className="infoInput" name="routing" />
            </div>
          </>
        )}

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
