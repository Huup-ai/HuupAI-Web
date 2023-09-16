import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { Link, NavLink } from 'react-router-dom';

const MyCloud = () => {
  const [cookies] = useCookies();
  const [displayContent, setDisplayContent] = useState(null);

  useEffect(() => {
    // Check the type
    // consumer sidebar
    if (cookies.selectedType === "customer") {
      setDisplayContent(
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link to="./profile">Profile</Link></li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="./billing">Billing</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="./instances">Instances</Link>
          </li>
        </ul>
        
      );
    }
    // provider sidebar
    else if (cookies.selectedType === "provider") {
      setDisplayContent(
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link to="./profile">Profile</Link></li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="./inventory">Inventory</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <Link to="./invoice">Invoice</Link>
          </li>
        </ul>
        
      );
    } else {
      setDisplayContent(
        <div>
          <h3>Type not recognized</h3>
          <p>Please set a LogIn Type.</p>
        </div>
      );
    }
  }, [cookies.selectedType]);
  
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

        {displayContent}
    </div>
  );
};

export default MyCloud;
