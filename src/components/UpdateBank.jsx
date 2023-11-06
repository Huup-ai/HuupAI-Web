import React, { useState } from 'react';
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import API_URL from "../api/apiAddress";

const UpdateBank = () => {
    const { currentColor } = useStateContext();
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');

    const handleUpdate = async () => {
        const token = localStorage.getItem("jwtToken");
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
        const body = JSON.stringify({
            bank_routing: routingNumber,
            bank_account: accountNumber
        });

        try {
            const response = await fetch(`${API_URL}/invoices/add_payment_auth/`, {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (!response.ok) {
                throw new Error("Error updating bank information");
            }

            alert("Bank information updated successfully!");
        } catch (error) {
            console.error("Error updating bank information:", error);
            alert("Error updating bank information");
        }
    };

    return (
        <div className="border-2 rounded-xl w-1/2">
            <h6 className="md:p-2">Update Bank Info(optional):
                <br />
                Note: we only support US Bank. For international customers, we will deposit crypto to your default wallet.
                <br />
                Please use moonpay to swap that to your local fiat at the invoice page </h6>

            <div className="flex flex-col items-center justify-between">
                <div className="flex flex-col flex-auto md:px-5 md:py-5 gap-2 w-full">
                    <div className='flex justify-between items-center'>
                        <label> Routing Number : </label>
                        <input
                            className='border-2 p-2 rounded w-2/3'
                            type='text'
                            value={routingNumber}
                            onChange={(e) => setRoutingNumber(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-between items-center'>
                        <label>Account Number:</label>
                        <input
                            className='border-2 p-2 rounded w-2/3'
                            type='text'
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />

                    </div>

                </div>
                <div className="md:mb-5 ">
                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Submit"
                        onClickCallback={handleUpdate}
                        borderRadius="10px"
                    />
                </div>
            </div>
        </div>
    )
}

export default UpdateBank

// use this page to see how to modify the rounting number and account number