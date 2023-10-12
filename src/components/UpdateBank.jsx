import React from 'react'
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";

const UpdateBank = () => {
    const { currentColor } = useStateContext();
  return (
    <div className="border-2 rounded-xl w-1/2">
      <h6 className="md:p-2">Update Bank Info(optional): 
      <br/>
      Note: we only support US Bank. For international customers, we will deposit crypto to your default wallet.
      <br/>
      Please use moonpay to swap that to your local fiat at the invoice page </h6>
      

      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
          <div className='flex justify-between items-center'>
            <label> Routing Number : </label>
            <input 
            className='border-2 p-2 rounded w-2/3'
            type='text'
            />
          </div>

          <div className='flex justify-between items-center'>
            <label>Account Number:</label>
            <input 
            className='border-2 p-2 rounded w-2/3'
            type='text'
            />

          </div>

        </div>
        <div className="md:mb-5 ">
          <Button
            color="white"
            bgColor={currentColor}
            text="Submit"
            // onClickCallback={handleDeposit}
            borderRadius="10px"
          />
        </div>
      </div>
    </div>
  )
}

export default UpdateBank