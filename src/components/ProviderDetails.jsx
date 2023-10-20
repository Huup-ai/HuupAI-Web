import {React, useState, useEffect} from "react";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import API_URL from "../api/apiAddress";

// const ProviderDetails = () => {
//   const { currentColor } = useStateContext();
//   const [isCrypto, setIsCrypto] = useState(() => {
//     const storedValue = localStorage.getItem("crypto");
//     return storedValue ? JSON.parse(storedValue) : false;
//   });
const ProviderDetails = () => {
  const { currentColor } = useStateContext();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const {setUserInfo} = useStateContext();
  const token = localStorage.getItem("jwtToken");
  const [isCrypto, setIsCrypto] = useState(() => {
    const storedValue = localStorage.getItem("crypto");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    const fetchData = async () => {
        // Add the token to headers
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // assuming token is available in this scope
        };

        try {
            let response = await fetch(`${API_URL}/users/payment_method/`, { headers: headers });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized. Token may be expired or invalid.");
                } else {
                    throw new Error("Error fetching payment details");
                }
            }
            let data = await response.json();
            setPaymentDetails(data);
        } catch (error) {
            console.error("Error fetching payment details:", error);
        }

        try {
            let response = await fetch(`${API_URL}/users/info/`, { headers: headers });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Unauthorized. Token may be expired or invalid.");
                } else {
                    throw new Error("Error fetching billing details");
                }
            }
            let data = await response.json();
            setBillingDetails(data);
            setUserInfo(data);
        } catch (error) {
            console.error("Error fetching billing details:", error);
        }
    }

    fetchData();
}, []);

if (!paymentDetails) {
    return <div>Echo is loading...</div>;
}
  
if (!billingDetails) {
    return <div>Michael is loading...</div>;
}
//   useEffect(() => {
//     const fetchData = async () => {
//         try {
//             let response = await  fetch(`${API_URL}/users/payment_method/`);
//             if (!response.ok) throw new Error("Error fetching payment details");
//             let data = await response.json();
//             setPaymentDetails(data);
//         } catch (error) {
//             console.error("Error fetching payment details:", error);
//         }

//         try {
//             let response = await fetch(`${API_URL}/users/info/`);
//             if (!response.ok) throw new Error("Error fetching billing details");
//             let data = await response.json();
//             setBillingDetails(data);
//         } catch (error) {
//             console.error("Error fetching billing details:", error);
//         }
//     }

//     fetchData();
// }, []);

   

//   // if (!paymentDetails || !billingDetails) {
//   //   return <div>Echo is loading...</div>;
//   // }
//   if (!paymentDetails) {
//     return <div>Echo is loading...</div>;
//   }
  
//   if (!billingDetails) {
//     return <div>Michael is loading...</div>;
//   }

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
          {/* <h3>Payment Information</h3> */}
          <div>
            <span className="inline-block w-60">PAYMENT METHOD</span>
            <span>:</span>
            <span>{paymentDetails.payment_method}</span>
          </div>
          <div>
            <span className="inline-block w-60">Account Payable Window</span>
            <span>:</span>
            <span>{paymentDetails.account_payable_window}</span>
          </div>
         
          <div>
            <span className="inline-block w-60">Wallet Address</span>
            <span>:</span>
            <span>{paymentDetails.wallet_address}</span>
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
            {/* <h3>Payment Information</h3> */}
            <div>
              <span className="inline-block w-60">PAYMENT METHOD</span>
              <span>:</span>
              <span>{paymentDetails.payment_method}</span>
            </div>
            <div>
              <span className="inline-block w-60">Account Payable Window</span>
              <span>:</span>
              <span>{paymentDetails.account_payable_window}</span>
            </div>
            <div>
              <span className="inline-block w-60">Bank Routing</span>
              <span>:</span>
              <span>{paymentDetails.bank_routing}</span>
            </div>
            <div>
              <span className="inline-block w-60">Bank Account</span>
              <span>:</span>
              <span>{paymentDetails.bank_account}</span>
            </div>

            <div className="mt-2 mb-2">
              {/* <Button
                color="white"
                bgColor={currentColor}
                text="Add Payment Method"
                borderRadius="10px"
              /> */}
            </div>
          </div>
        </div>
      )}

        <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            {/* <h3>Billing Information</h3> */}
            <div>
              <span className="inline-block w-40">NAME</span>
              <span>:</span>
              <span>{billingDetails.company}</span>
            </div>
            <div>
              <span className="inline-block w-40">EMAIL</span>
              <span>:</span>
              <span>{billingDetails.email}</span>
            </div>
            <div>
              <span className="inline-block w-40">ADDRESS</span>
              <span>:</span>
              <span>{billingDetails.address}</span>
            </div>
            {/* <div className="mt-2 mb-2">
            <span className="inline-block w-40">USDT to Fiat</span>
              <Button
                color="white"
                bgColor={currentColor}
                text="Moon Pay"
                borderRadius="10px"
              />
            </div> */}
          </div>
        </div>
        <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            {/* <h3>Billing Information</h3> */}
            <div>
              <span className="inline-block w-40">PAYMENT METHOD</span>
              <span>:</span>
              <span>{paymentDetails.account_payable_window}</span>
            </div>
            <div>
              <span className="inline-block w-40">Wallet Adrress</span>
              <span>:</span>
              <span>{paymentDetails.wallet_address}</span>
            </div>
            <div className="mt-2 mb-2">
            <span className="inline-block w-40">USDT to Fiat</span>
              <Button
                color="white"
                bgColor={currentColor}
                text="Moon Pay"
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
