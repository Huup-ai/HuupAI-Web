import React from 'react';
import { useState } from 'react';



const DropdownAction = () => {
    const [selectedAction, setSelectedAction] = useState(' ');
  return (
    <select 
      value={selectedAction} // ...force the select's value to match the state variable...
      onChange={e => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
    >
      <option value="start">Start</option>
      <option value="stop">Stop</option>
      <option value="terminate">Terminate</option>
    </select>
  )
}

export {DropdownAction}