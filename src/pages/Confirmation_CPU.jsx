import React from "react";
import { Check, Countbox, Header, OSDropdown } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { BsPlusLg } from "react-icons/bs";

const Confirmation_CPU = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header
        category="CPU Order Confirmation"
        title="Create Virtual Machine"
      />
      <div className="flex mb-10">
        <p className="underline underline-offset-4 w-20">vCPU</p>
        <Countbox />
      </div>

      <div className="flex  mb-10 ">
        <p className="underline underline-offset-4 w-20">RAM(GB)</p>
        <Countbox />
      </div>

      <div className="flex mb-10 ">
        <p className="underline underline-offset-4 w-20">Disk1(GB)</p>
        <Countbox />
        <div className="w-20"></div>

        <p className="underline underline-offset-4 w-20">Disk2(GB)</p>
        <Countbox />
        <div className="w-20"></div>
        <button>
          <BsPlusLg />
        </button>
      </div>

      <div className="flex mb-10">
        <pc className="w-20">OS</pc>
        <OSDropdown />
      </div>

      <div className="flex flex-start mb-10">
        <Check text="Generate SSH Certificate" />
      </div>

      <div >
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
         
        />

        <a href="./CPU" className="ml-10"> Back</a>
      </div>
    </div>
  );
};

export default Confirmation_CPU;
