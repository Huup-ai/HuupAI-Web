import React , { useState, useEffect } from "react";
import { Check, Header, OSDropdown } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";

const Confirmation_GPU = () => {
  const { currentColor, currentMode } = useStateContext();

  const handleConfirmOrder = async () => {
    console.log('Button clicked!');
    try {
        const response = await fetch('http://127.0.0.1:8000/instances/c-m-889dmgrg/createvm/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Include any other headers you need
            },
            body: JSON.stringify({
              
              
                "metadata": {
                    "name": "win2008-dv-01",
                        "namespace": "default"
              }
              
              
            })
        });

        const data = await response.json();

        // Handle the response data as needed.
        if(data.success) {
            console.log("VM Created!");
        } else {
            console.log("There was an issue creating the vm.");
        }

    } catch (error) {
        console.error("Error confirming order:", error);
    }
};


  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="GPU Order Confirmation" title="Rent GPU Server" />
      <div className="flex space-x-20 mb-10">
        <p>OS</p>
        <OSDropdown />
      </div>

      <div className="flex space-x-20 mb-10">
        <Check text="Generate SSH Certificate" />
      </div>

      <div>
      <button onClick={handleConfirmOrder}>Test Native Button</button>
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
          onClick={handleConfirmOrder}
          class
        />

        <a href="./GPU" className="ml-10">
          
          Back
        </a>
      </div>
    </div>
  );
};

export default Confirmation_GPU;
