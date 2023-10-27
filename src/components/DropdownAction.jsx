import React, { useEffect, useState } from "react";

const DropdownAction = ({ onActionChange, status }) => {
  console.log("Status:", status);
  const [selectedAction, setSelectedAction] = useState(status);

  const handleChange = (e) => {
    const newAction = e.target.value;
    setSelectedAction(newAction);
    onActionChange(newAction);
  };

  return (
    <select value={selectedAction} onChange={handleChange}>
      <option value="start">Start</option>
      <option value="stop">Stop</option>
      <option value="terminate">Terminate</option>
    </select>
  );
};

export default DropdownAction;
