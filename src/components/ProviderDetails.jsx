import {React, useState} from "react";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const ProviderDetails = () => {
  const { currentColor } = useStateContext();
  const [isCrypto, setIsCrypto] = useState(() => {
    const storedValue = localStorage.getItem("crypto");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  return (
    <div id="Payment Details">
      <div className=" mb-5 mt-10">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          Payment Details
        </p>
        <p className="text-lg text-gray-400">
          Payment and billing information for this team account
        </p>
      </div>

      <div>

      {isCrypto ? (
        // Content to display when isToggled is true
        <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
        <div className="px-4">
          <h3>Payment Information</h3>
          <div>
            <span className="inline-block w-60">PAYMENT METHOD</span>
            <span>:</span>
            <span>Crypto</span>
          </div>
          <div>
            <span className="inline-block w-60">Account Payable Window</span>
            <span>:</span>
            <span>30 Days</span>
          </div>
         
          <div>
            <span className="inline-block w-60">Wallet Address</span>
            <span>:</span>
            <span>XXXXXXXXXXX1234</span>
          </div>
          {/* <div className="mt-2 mb-2">
            <Button
              color="white"
              bgColor={currentColor}
              text="Add Payment Method"
              borderRadius="10px"
            />
          </div> */}
        </div>
      </div>
      ) : (
        // Content to display when isToggled is false
        <div className="border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            <h3>Payment Information</h3>
            <div>
              <span className="inline-block w-60">PAYMENT METHOD</span>
              <span>:</span>
              <span>Bank</span>
            </div>
            <div>
              <span className="inline-block w-60">Account Payable Window</span>
              <span>:</span>
              <span>45 Days</span>
            </div>
            <div>
              <span className="inline-block w-60">Bank Routing</span>
              <span>:</span>
              <span>XXXX-XXXX-XXXX-1234</span>
            </div>
            <div>
              <span className="inline-block w-60">Bank Account</span>
              <span>:</span>
              <span>XXXX-XXXX-XXXX-1234</span>
            </div>

            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add Payment Method"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      )}

        <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            <h3>Billing Information</h3>
            <div>
              <span className="inline-block w-40">NAME</span>
              <span>:</span>
              <span>YU WANG</span>
            </div>
            <div>
              <span className="inline-block w-40">EMAIL</span>
              <span>:</span>
              <span>USER_NAME</span>
            </div>
            <div>
              <span className="inline-block w-40">ADDRESS</span>
              <span>:</span>
              <span>XXXX</span>
            </div>
            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Edit Billing Information"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
