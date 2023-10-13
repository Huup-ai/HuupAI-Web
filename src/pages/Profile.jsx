import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../components";
import {
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
  const { currentColor } = useStateContext();

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
      <Header category="My Cloud > Profile" title="Welcome" />

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
      




      {/* <form className="infoForm">
    
        
        {displayContent ? (
          <>
            {" "}
            {payment == "crypto" ? (
              <div></div>
            ) : (
              <>
                <div>
                  <h6 className="mt-4 w-48">Telephone:</h6>
                  <input type="text" className="infoInput" name="telephone" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">Billing Address: </h6>
                  <input
                    type="text"
                    className="infoInput"
                    name="billingAddress"
                  />
                </div>

                <div>
                  <h6 className="mt-4 w-48">EIN:</h6>
                  <input type="" className="infoInput" name="EIN" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">BANK ACCOUNT:</h6>
                  <input type="" className="infoInput" name="bank" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">ROUTING/SWIFT:</h6>
                  <input type="" className="infoInput" name="routing" />
                </div>

                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Submit"
                  borderRadius="10px"
                />
              </>
            )}
          </>
        ) : (
          <>
            {" "}
            {payment == "crypto" ? (
              <div>
                <div>
                  <input
                    type="text"
                    className="infoInput border-solid border-2 rounded-md border-grey w-40 h-10"
                    placeholder="Input Amount"
                    // value={walletMoney} // Set the input value from the state
                    // onChange={handleWalletChange} // Attach the event handler
                  />

                  <span>USDT</span>
                </div>
                <div>
                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Deposit"
                    // onClickCallback={handleDeposit}
                    borderRadius="10px"
                  />
                </div>
              </div>
            ) : payment == "creditCard" ? (
              <>
                <div>
                  <h6 className="mt-4 w-48">Credit Card:</h6>
                  <input type="text" className="infoInput" name="card" />
                </div>

                <div>
                  <h6 className="mt-4 w-48"> Expiration: </h6>
                  <input type="date" className="infoInput" name="expire" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">Name on the Card:</h6>
                  <input type="" className="infoInput" name="name" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">Authorization Code:</h6>
                  <input type="" className="infoInput" name="code" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">Telephone:</h6>
                  <input type="" className="infoInput" name="phone" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">Billing Address:</h6>
                  <input type="" className="infoInput" name="address" />
                </div>

                <div>
                  <h6 className="mt-4 w-48">EIN:</h6>
                  <input type="" className="infoInput" name="ein" />
                </div>

                <Button
                  color="white"
                  bgColor={currentColor}
                  text="Submit"
                  borderRadius="10px"
                />
              </>
            ) : (
              <>
                <div>
                  <div>
                    <input
                      type="text"
                      className="infoInput border-solid border-2 rounded-md border-grey w-40 h-10"
                      placeholder="Input Amount"
                      // value={walletMoney} // Set the input value from the state
                      // onChange={handleWalletChange} // Attach the event handler
                    />

                    <span>USDT</span>
                  </div>
                  <div>
                    <Button
                      color="white"
                      bgColor={currentColor}
                      text="Deposit"
                      // onClickCallback={handleDeposit}
                      borderRadius="10px"
                    />
                  </div>
                </div>

                <>
                  <div>
                    <h6 className="mt-4 w-48">Credit Card:</h6>
                    <input type="text" className="infoInput" name="card" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48"> Expiration: </h6>
                    <input type="date" className="infoInput" name="expire" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48">Name on the Card:</h6>
                    <input type="" className="infoInput" name="name" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48">Authorization Code:</h6>
                    <input type="" className="infoInput" name="code" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48">Telephone:</h6>
                    <input type="" className="infoInput" name="phone" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48">Billing Address:</h6>
                    <input type="" className="infoInput" name="address" />
                  </div>

                  <div>
                    <h6 className="mt-4 w-48">EIN:</h6>
                    <input type="" className="infoInput" name="ein" />
                  </div>

                  <Button
                    color="white"
                    bgColor={currentColor}
                    text="Submit"
                    borderRadius="10px"
                  />
                </>
              </>
            )}{" "}
          </>
        )}
      </form> */}

      {/* <Divider className="py-5">   </Divider> */}
      {/* <div className="mt-8 border-t-4"> </div> */}

      {/* <form className="infoForm mt-12">
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
      </form> */}
    </div>
  );
};

export default Profile;
