import React from "react";
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';

const MyCloud = () => {
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">My Cloud</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>

        {/* for consumer */}
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <a href="./profile">Profile</a></li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <a href="./billing">Billing</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <a href="./instances">Instances</a>
          </li>
        </ul>

         {/* for provider */}
         {/* <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <a href="./profile">Profile</a></li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <a href="./inventory">Inventory</a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <a href="./invoice">Invoice</a>
          </li>
        </ul> */}
    </div>
  );
};

export default MyCloud;
