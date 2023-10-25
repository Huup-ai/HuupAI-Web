import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { updatePwd } from "../api";

const UpdatePwd = () => {
  const { currentColor } = useStateContext();
  const [password_old, setPassword_old] = useState("");
  const [password_new, setPassword_new] = useState("");
  const [password_con, setPassword_con] = useState("");
  const [showPassword_old, setShowPassword_old] = useState(false); // password visibility
  const toggleShowPassword_old = () => {
    setShowPassword_old(!showPassword_old);
  };
  const [showPassword_new, setShowPassword_new] = useState(false); // password visibility
  const toggleShowPassword_new = () => {
    setShowPassword_new(!showPassword_new);
  };
  const [showPassword_con, setShowPassword_con] = useState(false); // password visibility
  const toggleShowPassword_con = () => {
    setShowPassword_con(!showPassword_con);
  };

  const handleUpdate = (event) => {
    // console.log(password_old, password_new, password_con);
    if (password_con !== password_new) {
      // Password and Confirm Password do not match
      alert("New Password and Confirm Password do not match");

      return;
    }
    updatePwd(password_old, password_new)
      .then((res) => {
        if (res.status){
          // console.log(res.status)
          alert("Password Updated Successfully")
        }
        else if(res.old_password){
          alert("Old Password is incorrect")
        }
        else{
          alert("Password Update Failed")
        }       
      
      })
      .catch((error) => {
        console.error("Update Password Failed ", error);
      });
  };

  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Update Password: </h6>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
          <div className="flex justify-between items-center">
            <label> Old Password: </label>
            <div className="flex w-2/3">
              <input
                type={showPassword_old ? "text" : "password"}
                className="border-2 p-2 rounded w-full"
                name="password"
                value={password_old}
                onChange={(e) => setPassword_old(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleShowPassword_old}
                className="md:ml-5"
              >
                <FontAwesomeIcon icon={showPassword_old ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label> New Password: </label>
            <div className="flex w-2/3">
              <input
                type={showPassword_new ? "text" : "password"}
                className="border-2 p-2 rounded w-full"
                name="password"
                value={password_new}
                onChange={(e) => setPassword_new(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleShowPassword_new}
                className="md:ml-5"
              >
                <FontAwesomeIcon icon={showPassword_new ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <label> Confirm Password: </label>
            <div className="flex w-2/3">
              <input
                type={showPassword_con ? "text" : "password"}
                className="border-2 p-2 rounded w-full"
                name="password"
                value={password_con}
                onChange={(e) => setPassword_con(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleShowPassword_con}
                className="md:ml-5"
              >
                <FontAwesomeIcon icon={showPassword_con ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        </div>
        <div className="md:mb-5 ">
          <Button
            color="white"
            bgColor={currentColor}
            text="Update"
            onClickCallback={handleUpdate}
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdatePwd;
