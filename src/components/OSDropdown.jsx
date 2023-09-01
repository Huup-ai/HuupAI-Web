import React from 'react';
import { useState } from 'react';



const OSDropdown = () => {
    const [selectedAction, setSelectedAction] = useState(' ');
  return (
    <select 
      value={selectedAction} // ...force the select's value to match the state variable...
      onChange={e => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
      className='border-solid border-2 rounded-md border-grey w-40'
    >
      <option value="ubuntu">Ubuntu</option>
      <option value="mac">MacOS</option>
      <option value="win">Windows</option>
      <option value="rht">Red Hat Linux</option>
      <option value="sl">SUSE Linux</option>
      <option value="Debian">Debian</option>
    </select>
  )
}

export default OSDropdown