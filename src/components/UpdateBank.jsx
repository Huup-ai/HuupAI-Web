import React, { useState } from 'react';
import { useStateContext } from "../contexts/ContextProvider";
import Button from "./Button";
import API_URL from "../api/apiAddress";

const UpdateBank = () => {
    const { currentColor } = useStateContext();
    const [routingNumber, setRoutingNumber] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleUpdate = async () => {
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/users/info/`, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("jwtToken")}`
                },
                body: JSON.stringify({
                    routing_number: routingNumber,
                    account_number: accountNumber,
                }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Server Error: ${errorBody}`);
            }

            alert("Bank information updated successfully!");

            setRoutingNumber('');
            setAccountNumber('');

        } catch (error) {
            setError(`Error updating bank information: ${error.message}`);
        } finally {
            setIsSubmitting(false);
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

                    {error && <p className="text-red-500">{error}</p>}
                    {successMessage && <p className="text-green-500">{successMessage}</p>}

                </div>
                <div className="md:mb-5 ">
                <Button
                    color="white"
                    bgColor={currentColor}
                    text={isSubmitting ? "Processing..." : "Submit"}
                    onClickCallback={handleUpdate}
                    borderRadius="10px"
                    disabled={isSubmitting}
            />
                </div>
            </div>
        </div>
    )
}

export default UpdateBank
