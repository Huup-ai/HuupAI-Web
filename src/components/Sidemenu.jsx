import React, { useState, useEffect } from "react";
import BillingComponents from "./BillingComponents";

const Sidemenu = () => {

  
  
  
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (boxIndex) => {
    setSelectedBox(boxIndex);
  };
  
  
  return (
      <nav className="border-1 rounded-lg h-48 mt-10">
        <ul>
          {["General"].map((item, index) => (
            <li
              // className="font-bold h-10 mt-4 ml-2 mr-2 py-2 pl-4 hover:bg-light-gray"
              className={`item font-bold rounded-lg h-10 mt-4 ml-2 mr-2 py-2 pl-4 hover:bg-gray-100 ${
                selectedBox === index
                  ? "border-blue-100 border-1 rounded-lg"
                  : ""}`}
            onClick={() => handleBoxClick(index)}
            >
              <div />
              <a href="#Current Usage">
                {item}
              </a>
            </li>
          ))}
        </ul>
        <ul>
        {BillingComponents.map(({ id },index) => (
          <li key={id}
          className={`item h-10 ml-2 mr-2 py-2 px-8 rounded-lg hover:bg-gray-100 ${
            selectedBox === index ? "bg-blue-100" : ""
          }`}
          onClick={() => handleBoxClick(index)}>
            <a href={`#${id}`}>{id}</a>
          </li>
        ))}
      
        </ul>
      </nav>
    // </div>
  );
};

export default Sidemenu;
