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
import API_URL from "../api/apiAddress";

const Inventory = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const {currentColor} = useStateContext();
  const [clusterPrice, setClusterPrice] = useState(null);
  const [clusters, setClusters] = useState([]); 
  const [data, setData] = useState([]);
  const [modifiedPrices, setModifiedPrices] = useState({});
  const itemIdToClusterIdMap = {};
  const [modifiedItemIds, setModifiedItemIds] = useState(new Set());

// Fetch clusters associated with the provider
const fetchClusters = async () => {
  try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`${API_URL}/clusters/my_clusters/`, {
          headers: {
              'Authorization': `Bearer ${token}`,
          },
      }); 
      
      if (!response.ok) {
          const text = await response.text();
          throw new Error(`Failed to fetch clusters. Status: ${response.status}. Response: ${text}`);
      }

      const data = await response.json();
      data.forEach(cluster => {
        itemIdToClusterIdMap[cluster.item_id] = cluster.cluster_id;
    });
      console.log("Fetched Clusters:", data);
      setData(data);
      setClusters(data);
  } catch (error) {
      console.error('There was an error fetching the clusters', error);
  }
}

const handleHourlyRateBlur = (dataItemItemId, newPrice) => {
  console.log("Blur event for ID:", dataItemItemId, "with price:", newPrice);
  // Store modified prices in the state
  setModifiedPrices(prev => ({
    ...prev,
    [dataItemItemId]: newPrice
  }));
  // Add the modified cluster's itemId to the set
  setModifiedItemIds(prev => new Set([...prev, dataItemItemId]));
};

useEffect(() => {
  fetchClusters(); 
}, []);

useEffect(() => {
  console.log("ClusterPrice changed:", clusterPrice);
}, [clusterPrice]);

const PriceInput = ({ initialPrice, modifiedPrice, dataItem  }) => {
  console.log("PriceInput for dataItem:", dataItem);
  const [inputValue, setInputValue] = useState(modifiedPrice || initialPrice || '');

  return (
    <input 
      type="text" 
      value={inputValue} 
      className="border rounded" 
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => {
        if (inputValue !== initialPrice) {
          handleHourlyRateBlur(dataItem.itemId, inputValue);
        }
      }}
    />
  );
};

const InventoryGrid = [
  {
    headerText: "Name",
    width: "100",
    textAlign: "Center",
    template: (rowData) => {
      return <div>{rowData.item_id}</div>;
    },
  },
  { field: "Type", headerText: "GPU", width: "100", textAlign: "Center" },

  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    textAlign: "Center",
  },
  
  {
    headerText: "Region",
    width: "100",
    textAlign: "Center",
    template: (rowData) => {
      return <div>{rowData.region}</div>;
    },
  },

  {
    field: "Privacy",
    headerText: "Privacy",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "Price", 
    headerText: "Hourly Rate (USD)",
    width: "120",
    template: (rowData) => <PriceInput 
                            initialPrice={rowData.price} 
                            modifiedPrice={modifiedPrices[rowData.item_id]} 
                            dataItem={rowData}
                            />,
    textAlign: "Center",
  },
];

// const getClusterIdByItemId = (itemId) => {
//   const cluster = clusters.find(cluster => cluster.item_id === itemId);
//   return cluster ? cluster.cluster_id : null;
// }

const handleSetPrice = async () => {
  console.log("handleSetPrice function called");
  
  const token = localStorage.getItem("jwtToken");
  console.log("Token retrieved:", token);
  console.log("Full modifiedPrices object:", modifiedPrices);
  let allUpdatesSuccessful = true;
  
  for (let itemId  in modifiedPrices) {
      if (!itemId || !modifiedPrices[itemId]) continue;

      const modifiedPrice = modifiedPrices[itemId];
      
      try {
          console.log(`About to send fetch request for cluster with id ${itemId}`);
          const response = await fetch(`${API_URL}/clusters/set_price/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  item_id: itemId,
                  price: modifiedPrice
              }),
          });
          console.log("Fetch request completed");

          if (!response.ok) {
              allUpdatesSuccessful = false;
              const text = await response.text();
              console.log("Error from API:", text);
              throw new Error(`Failed to set price for cluster with id ${itemId}`);
          }

          const data = await response.json();
          console.log("API Response for cluster:", data);
      } catch (error) {
          console.error(`There was an error setting the price for cluster with id ${itemId}`, error);
      }
  }

  if (allUpdatesSuccessful) {
    alert("Prices updated successfully!");
    fetchClusters(); // Refreshing the data after updates
    setModifiedPrices({}); // Clear modified prices after update
    setModifiedItemIds(new Set()); // Clear modified item IDs after update
  } else {
    alert("Failed to update some prices. Please try again.");
  }
};


return (
  <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
    {/* <Header category="Market Cloud > Inventory" title="My Inventory List" /> */}
    <h3 className="mb-4">My Inventory List</h3>
    {/* <div className="relative"> */}
      <GridComponent
        rowHeight={70}
        dataSource={clusters}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        allowTextWrap={true}
        textWrapSettings={settings}
      >
         <ColumnsDirective>
          {InventoryGrid.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>

    <div className="mt-4 text-right ">
        <Button
          color="white"
          bgColor={currentColor}
          text="Set"
          borderRadius="10px"
          onClickCallback={handleSetPrice}
          />
    </div>

    </div>
    
  // </div>
);
};

export default Inventory;
