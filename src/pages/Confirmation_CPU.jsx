import React from "react";
import { Check, Countbox, Header, OSDropdown, PayinComfirmation } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { BsPlusLg } from "react-icons/bs";
import { Link, NavLink } from 'react-router-dom';

const Confirmation_CPU = () => {
  const { currentColor, currentMode } = useStateContext();
  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header
        category="Market Cloud > CPU > Order Confirmation"
        title="CPU Rental Order Form"
      />

      <PayinComfirmation/>

      
      <div className="mt-12 flex mb-10">
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

      <div>
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
        />

        <Link to={`/clouds/CPU`} className="ml-10">
          {" "}
          Back
        </Link>
      </div>
    </div>
  );
};

export default Confirmation_CPU;
