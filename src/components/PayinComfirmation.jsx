import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { loadStripe } from "@stripe/stripe-js";
import { Stripe_KEY } from "../Address";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { addPaymentAuth, checkPaymentAuth } from "../api";

const stripePromise = loadStripe(Stripe_KEY);

const PayinComfirmation = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { currentColor } = useStateContext();
  // console.log("currentColor", currentColor);
  let choosepay;
  let form;

  const payment = useSelector((state) => state.auth.selectedOption);
  const externalWallet = useSelector((state) => state.auth.externalWallet);
  const [isCrypto, setIsCrypto] = React.useState(false);
  const handleToggle = () => setIsCrypto(!isCrypto);

  // checkBalance form wallet and store
  const [checkBalance, setCheckBalance] = useState(false);
  const [checkCreditAuth, setCheckCreditAuth] = useState(false);
  const JWTtoken = localStorage.getItem("jwtToken");

  if (
    (payment === "creditCard" )||
    (payment === "eitherWay" && isCrypto === false)
  ) {
    const checkAuth = checkPaymentAuth(JWTtoken);
    console.log("checkAuth", checkAuth)
    checkAuth
      .then((result) => {
        // console.log(result);
        setCheckCreditAuth(result);
        // console.log("checkCreditAuth", checkCreditAuth);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const paymentMethod = [
    <div className="">
      <div className="flex flex-row items-center">
        <h6 className="w-48">Payment Method: </h6>
        <span className="text-gray-700">Credit Card </span>

        <div
          className={`ml-2 relative h-8 inline-block w-14 align-middle select-none transition duration-200 ease-in ${
            isCrypto ? "bg-gray-400" : "bg-gray-200"
          } rounded-xl p-1`}
          onClick={handleToggle}
        >
          <div
            className={`absolute w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in transform ${
              isCrypto ? "translate-x-full" : ""
            }`}
          ></div>
        </div>
        <span className="text-gray-700 ml-2">Crypto</span>
      </div>
      <div className="mt-2 text-xs">
        Note: If choose crypto, and not enough deposit right.
      </div>
    </div>,
  ];

  const MoonPay = [
    <>
      <div className="mt-5 w-1/2 border-2 rounded-lg shadow-lg md:p-10">
        <div>
          Step #1. Fund your wallet by using{" "}
          <a herf="" className="underline underline-offset-1 italic">
            MoonPay
          </a>
        </div>
        <div>Step #2 Deposit fund at least</div>
        <div>
          <input
            className="border-2 mt-2"
            type="text"
            // onChange={handleInputChange}
            placeholder="Minumum Deposit" //get from backend info
          />

          <label htmlFor=""> USDT</label>
          <span className="ml-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Deposit"
              borderRadius="10px"

              // onClickCallback={} // deposit to wallet
            />
          </span>
        </div>
      </div>
    </>,
  ];

  const MetaMask = [
    <>
      <div className="mt-5 w-1/2 border-2 rounded-lg shadow-lg md:p-10">
        <div>Step #1. Fund your wallet by depositing USDT to your wallet</div>
        <div>Step #2 Deposit fund at least</div>
        <div>
          <input
            className="border-2 mt-2"
            type="text"
            // onChange={handleInputChange}
            placeholder="Minumum Deposit" //get from backend info
          />

          <label htmlFor=""> USDT</label>
          <span className="ml-5">
            <Button
              color="white"
              bgColor={currentColor}
              text="Deposit"
              borderRadius="10px"

              // onClickCallback={} // deposit to wallet
            />
          </span>
        </div>
      </div>
    </>,
  ];

  // const [creditCardNumber, setCreditCardNumber] = useState("");

  // const handleCardNumChange = (event) => {
  //   const { value } = event.target;

  //   // Remove non-numeric characters
  //   const numericValue = value.replace(/\D/g, "");

  //   // Format the credit card number with spaces
  //   const formattedValue = numericValue
  //     .replace(/(\d{4})/g, "$1 ")
  //     .trim()
  //     .substr(0, 19); // Limit to 19 characters (16 digits + 3 spaces)

  //   setCreditCardNumber(formattedValue);
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: "card",
      card: {
        token: token.id,
      },
    });

    if (error) {
      alert("err", error);
    } else {
      console.log("Payment Token:", paymentMethod.paymentMethod.id);
      // Send the token to your backend for further processing
      const response = addPaymentAuth(paymentMethod.id, JWTtoken);
      // alert("response", response);
    }
  };

  const creditCard = [
    <>
      <form className="mt-5 w-1/2 border-2 rounded-lg shadow-lg">
        {/* <div className="flex md:m-10 justify-between">
          <label htmlFor="creditCardNumber">Credit Card</label>

          <input
            className="border-2"
            type="text"
            id="creditCardNumber"
            name="creditCardNumber"
            value={creditCardNumber}
            onChange={handleCardNumChange}
            maxLength={19} // Maximum length for a formatted credit card number
            placeholder="xxxx xxxx xxxx xxxx"
          />
        </div>

        <div className="flex md:m-10 justify-between">
          <label>Expiration Date</label>

          <input
            className="border-2"
            type="date"
            
          />
        </div> */}
        {/* <div className="flex md:m-10 justify-between">
          <label className="p-2">Name on the card</label>

          <input className="border-2 p-2 rounded" type="text" />
        </div> */}
        {/* <div className="flex md:m-10 justify-between">
          <label>Authorization Code</label>

          <input
            className="border-2"
            type="text"
            
          />
        </div> */}
        {/* <div className="flex md:m-10 justify-between">
          <label className="p-2">Billing Address</label>

          <input className="border-2 p-2 rounded" type="text" />
        </div> */}

        <div className="md:m-10 justify-between">
          <label className="p-2">Card Information:</label>

          <CardElement
            id="creditCardNumber"
            className="border-2 p-2 rounded mt-2"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        <div className="text-center md:mb-10">
          <Button
            color="white"
            bgColor={currentColor}
            text="Authorize"
            onClickCallback={handleSubmit}
            borderRadius="10px"
          />
        </div>
      </form>
    </>,
  ];

  //   console.log(
  //     "Crypto",
  //     isCrypto,
  //     "paymethod",
  //     payment,
  //     "balance",
  //     checkBalance,
  //     "exWallet",
  //     externalWallet,
  //     "creditAuth",
  //     checkCreditAuth
  //   );

  if (payment === "eitherWay") {
    choosepay = paymentMethod;
    if (
      isCrypto === true &&
      checkBalance === false &&
      externalWallet === true
    ) {
      form = MetaMask;
    } else if (
      isCrypto === true &&
      checkBalance === false &&
      externalWallet === false
    ) {
      form = MoonPay;
    } else if (isCrypto === false && checkCreditAuth === false) {
      form = creditCard;
    } else {
      form = [];
    }
  } else {
    choosepay = [];
    if (
      payment === "crypto" &&
      checkBalance === false &&
      externalWallet === true
    ) {
      form = MetaMask;
    } else if (
      payment === "crypto" &&
      checkBalance === false &&
      externalWallet === false
    ) {
      form = MoonPay;
    } else if (payment === "creditCard" && checkCreditAuth === false) {
      form = creditCard;
    } else {
      form = [];
    }
  }

  return (
    <div>
      {choosepay} {form}
    </div>
  );
};

export default () => (
  <Elements stripe={stripePromise} options={{ locale: "en" }}>
    <PayinComfirmation />
  </Elements>
);
