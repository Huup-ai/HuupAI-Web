import React, { useState } from "react";

const Countbox = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
      setCount(count + 1);
    };
  
    const handleDecrement = () => {
      if (count > 0) {
        setCount(count - 1);
      }
    };

    // const handleInputChange = (event) => {
    //     const inputValue = parseInt(event.target.value);
    //     // if (!isNaN(inputValue)) {
    //       setCount(inputValue);
    //     // }
    //   };
    
    const handleInputChange = (event) => {
      const inputValue = event.target.value;

      // Allow empty values (for deleting or correcting input)
      if (inputValue === "") {
          setCount("");
          return;
      }

      const numericValue = parseFloat(inputValue);
      
      if (!isNaN(numericValue)) {
          setCount(numericValue);
      }
  };

  return (
    <div >
      {/* <button onClick={handleDecrement}>&#9666;</button> */}
      <input
        type="number"
        value={count}
        onChange={handleInputChange}
        min={0}
        className='border-solid border-2 rounded-md border-grey w-40'
      />
      {/* <button onClick={handleIncrement}>&#9656;</button> */}
    </div>
  );
};

export default Countbox;
