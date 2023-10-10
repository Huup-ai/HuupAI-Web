import { React, useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { GPUsData, InventoryGrid} from "../data/dummy";
import { Header, Button, Countbox } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Inventory = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const [selectedAction, setSelectedAction] = useState(" ");
  const { currentColor} = useStateContext();
  const [clusterPrice, setClusterPrice] = useState(null);

  const handleClusterChange = (e) => {
    setSelectedAction(e.target.value);
    if (e.target.value) {
        getClusterById(e.target.value);  // Fetch the price when a cluster is selected.
    }
};

// Fetching cluster data by ID
const getClusterById = async (clusterId) => {
  try {
      const response = await fetch(`/api/cluster/${clusterId}`);
      if (!response.ok) {
          throw new Error('Failed to fetch cluster data');
      }
      const data = await response.json();
      if (data && data.price !== null) {
          setClusterPrice(data.price);
      }
  } catch (error) {
      console.error('There was an error fetching the cluster data', error);
  }
};

// Handler for setting the price
const handleSetPrice = async () => {
  if (clusterPrice) {
      try {
          const response = await fetch(`/api/setPrice`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  clusterId: selectedAction,
                  price: clusterPrice,
              }),
          });
          if (!response.ok) {
              throw new Error('Failed to set price');
          }
          const data = await response.json();
          // Handle the response as needed
      } catch (error) {
          console.error('There was an error setting the price', error);
      }
  }
};

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="My Cloud > Inventory" title="Set your Inventory Price" />

      <div className="text-left ml-4 mb-5f flex flex-col">
        <div className="flex mb-5">
          <span className="w-60"> Select Cluster</span>
          <select
            className="border-solid border-2 rounded-md border-grey w-40"
            value={selectedAction} // ...force the select's value to match the state variable...
            onChange={(e) => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
          >
            <option value=""> </option>
            <option value="US-NY-T4-C1">US-NY-T4-C1</option>
            <option value="US-CA-V100-A1">US-CA-V100-A1</option>
            <option value="EU-Germany-A100-A1"> EU-Germany-A100-A1 </option>
            <option value="EU-Germany-A100-A1"> EU-Germany-A100-A1</option>
          </select>
        </div>

        <div className="flex mb-5">
          <span className="w-60">Set Price per hour in USD</span>
          <Countbox />
        </div>
        
        {clusterPrice === null && ( //Display input if price is null
            <div className="flex mb-5">
                <span className="w-60">Set Price per hour in USD</span>
                <Countbox value={clusterPrice} onChange={e => setClusterPrice(e.target.value)} />
            </div>
        )}

        <div className="mb-10">
          <Button
            color="white"
            bgColor={currentColor}
            text="Set"
            borderRadius="10px"
            onClick={handleSetPrice}
          />
        </div>
      </div>

      <div>
        <h3> My Inventory List</h3>
        <GridComponent
          rowHeight={70}
          dataSource={GPUsData}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          allowTextWrap={true}
          textWrapSettings={settings}
          // height='400'
          // className = "overflow-visible text-clip h-96"
        >
          <ColumnsDirective>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {InventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Inventory;
