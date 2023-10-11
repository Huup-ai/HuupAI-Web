import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { updateSelection, selectSelectedOption } from "../reducers/authSlicer";
import Button from "./Button";

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
  return (
    <div className="border-2 rounded-xl">
      <div className="flex flex-col md:p-2">
        <h6 className="w-72">Setup default Payment Method: </h6>

        <div className="flex flex-col md:px-20 md:py-5 gap-2">
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

          <div className="md:mt-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Submit"
              // onClickCallback={handleDeposit}
              borderRadius="10px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultPay;
