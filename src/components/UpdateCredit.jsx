import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { Stripe_KEY } from "../Address";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { addPaymentAuth, getUserInfo} from "../api";
import { addPaymentMethod } from "../reducers/authSlicer";

const stripePromise = loadStripe(Stripe_KEY);

const UpdateCredit = () => {
  const { currentColor } = useStateContext();
  const [cardNumber, setCardNumber] = useState("000");
  const dispatch = useDispatch(); 
  const stripe = useStripe();
  const elements = useElements();
  const JWTtoken = localStorage.getItem("jwtToken");

  useEffect(() => {
    getUserInfo()
    .then((res) => {
      // console.log("user",res.credit_card)
      setCardNumber(res.credit_card)    
    })
    .catch((error) => {
      console.error("Failed to fetch user info: ", error);
    });

  }, [cardNumber]);
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
      console.log(
        "Payment Token:",
        paymentMethod.paymentMethod.id,
        paymentMethod
      );
      // Send the token to your backend for further processing
      const response = addPaymentAuth(paymentMethod.paymentMethod.id, JWTtoken);
      

      response
        .then((result) => {
          dispatch(addPaymentMethod());
          setCardNumber("000")
          // setCheckCreditAuth(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };


  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Update Credit Card Info(optional): </h6>

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
          <div>
            <span> Credit Card ON FILE : </span>
            {cardNumber}
          </div>

          <div >
            <label>New Credit Card:</label>

            <CardElement
              id="creditCardNumber"
              className="border-2 p-2 rounded  w-full"
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
        </div>
        <div className="md:mb-5 ">
          <Button
            color="white"
            bgColor={currentColor}
            text="Authorize"
            onClickCallback={handleSubmit}
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  );
};

export default () => (
  <Elements stripe={stripePromise} options={{ locale: "en" }}>
    <UpdateCredit />
  </Elements>
);
