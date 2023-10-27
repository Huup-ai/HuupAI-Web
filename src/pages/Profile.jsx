import React from "react";
import { useState, useEffect } from "react";
import {
  Header,
  Button,
  UpdateCredit,
  DefaultPay,
  UpdatePwd,
  InvoiceInfo,
  UpdateBank
} from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { updateSelection, selectSelectedOption } from "../reducers/authSlicer";

const Profile = () => {
  const { currentColor, userInfo } = useStateContext();

  const [cookies] = useCookies(["selectedType"]);

  const [displayContent, setDisplayContent] = useState(false);

  const payfromRedux = useSelector((state) => state.auth.selectedOption);
  // console.log("pay",payfromRedux);
  const [payment, setPayment] = useState(payfromRedux);

  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const selectedValue = event.target.value;
    const opt = dispatch(updateSelection(selectedValue));
    setPayment(selectedValue);

    // store the selection in backend
  };

  useEffect(() => {
    setDisplayContent(cookies.selectedType === "provider");
  }, [cookies.selectedType]);

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="My Cloud > Profile" title={`Welcome ${userInfo?.company}`} />

      {displayContent ? (<><div className="flex flex-row justify-around">
        <InvoiceInfo />
        <div className="w-8"></div>
        <UpdateBank />
      </div>
</>):(<><div className="flex flex-row justify-around">
        <UpdateCredit />
        <div className="w-8"></div>
        <DefaultPay />
      </div>
      <div className="h-8"></div>

      <div className="flex flex-row justify-around">
        <InvoiceInfo />
        <div className="w-8"></div>
        <UpdatePwd />
      </div></>)}
      


    </div>
  );
};

export default Profile;
