import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { Link, NavLink } from 'react-router-dom';

const Market = () => {
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">Market</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <ul className="py-2">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
           <Link
           to="./CPU">CPU</Link>
            {/* <a href="./CPU">CPU</a> */}
          </li>
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <Link
           to="./GPU">GPU</Link>
            {/* <a href="./GPU">GPU</a> */}
          </li>
        </ul>
    </div>
  )
}

export default Market