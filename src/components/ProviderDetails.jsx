import {React, useState, useEffect} from "react";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import API_URL from "../api/apiAddress";
import { getWallet } from "../api";
import { getUserInfo, addPaymentAuth } from "../api";
import { useDispatch } from 'react-redux';



// const ProviderDetails = () => {
//   const { currentColor } = useStateContext();
//   const [isCrypto, setIsCrypto] = useState(() => {
//     const storedValue = localStorage.getItem("crypto");
//     return storedValue ? JSON.parse(storedValue) : false;
//   });
const ProviderDetails = () => {
  const { currentColor, setUserInfo } = useStateContext();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [billingDetails, setBillingDetails] = useState(null);
  const token = localStorage.getItem('jwtToken');
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem('walletAddress') || '');
  const [isCrypto, setIsCrypto] = useState(() => {
    const storedValue = localStorage.getItem('crypto');
    return storedValue ? JSON.parse(storedValue) : false;
  });
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    bankRouting: '',
    // bankAccount: '',
    bankAccountLastFour: '',
    
  });
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfoResponse = await dispatch(getUserInfo());
        setUserDetails({
          bankRouting: userInfoResponse.data.routing_number,
          // bankAccount: userInfoResponse.data.account_number,
        });

        
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        setError('Failed to load user details.');
      }
    };

    fetchData();
  }, [dispatch]);

  // Handle updating the payment authorization, adjust this accordingly to your use case
  const handlePaymentUpdate = async (payToken) => {
    try {
      const paymentAuthResponse = await dispatch(addPaymentAuth(payToken));
      // Handle the response from addPaymentAuth, e.g., update state or show a message
    } catch (error) {
      console.error('Failed to update payment authorization:', error);
      setError('Failed to update payment information.');
    }
  };

//New
  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      try {
        const walletData = await getWallet(token);
        const walletAddress = walletData[0].address; // Access wallet address from the API response
        localStorage.setItem('walletAddress', walletAddress); // Store the wallet address in local storage
        setWalletAddress(walletAddress); // Update the walletAddress state variable
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }

      try {
        const response = await fetch(`${API_URL}/users/payment_method/`, { headers });
        if (!response.ok) {
          throw new Error('Error fetching payment details');
        }
        const data = await response.json();
        setPaymentDetails(data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }

      try {
        const response = await fetch(`${API_URL}/users/info/`, { headers });
        if (!response.ok) {
          throw new Error('Error fetching billing details');
        }
        const data = await response.json();
        setBillingDetails(data);
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching billing details:', error);
      }
    };

    fetchData();
  }, [token, setUserInfo]);

if (!paymentDetails) {
    return <div>Echo is loading...</div>;
}
  
if (!billingDetails) {
    return <div>Michael is loading...</div>;
}


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
              <span>{userDetails.bankRouting}</span>
            </div>
            <div>
              <span className="inline-block w-60">Bank Account</span>
              <span>:</span>
              <span>{userDetails.bankAccount}</span>
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
              <span>{paymentDetails.payment_method}</span>
            </div>
            <div>
              <span className="inline-block w-40">Wallet Adrress</span>
              <span>:</span>
              <span>{walletAddress}</span>
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