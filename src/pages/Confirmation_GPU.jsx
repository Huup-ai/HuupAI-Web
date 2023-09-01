import React from "react";
import { Check, Header, OSDropdown } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";

const Confirmation_GPU = () => {
  const { currentColor, currentMode } = useStateContext();
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
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
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
