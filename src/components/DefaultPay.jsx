import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { updateSelection, selectSelectedOption } from "../reducers/authSlicer";
import Button from "./Button";
import { updatePay } from "../api";

const DefaultPay = () => {
  const { currentColor } = useStateContext();
  const payfromRedux = useSelector((state) => state.auth.selectedOption);
  const [payment, setPayment] = useState(payfromRedux);

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    const opt = dispatch(updateSelection(selectedValue));
    setPayment(selectedValue);

    // store the selection in backend
  };

  const handleSubmit = (event) => {
    // console.log(payment)
    updatePay(payment)
    .then((res) => {
      // console.log("res",res)
      const mess = "Default Payment Method Successfullt Set to " + payment
      alert(mess)
       
    })
    .catch((error) => {
      console.error("Failed to set Default Payment Method ", error);
    });
  }
  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Setup default Payment Method: </h6>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-20 md:py-5 gap-2">
          <div>
            <input
              type="radio"
              id="eitherWay"
              value="eitherWay"
              checked={payment === "eitherWay"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="eitherWay">Either Way(default)</label>
          </div>

          <div>
            <input
              type="radio"
              id="crypto"
              value="crypto"
              checked={payment === "crypto"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="crypto">Crypto</label>
          </div>

          <div>
            <input
              type="radio"
              id="creditCard"
              value="creditCard"
              checked={payment === "creditCard"}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="creditCard">Credit Card</label>
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

export default DefaultPay;
