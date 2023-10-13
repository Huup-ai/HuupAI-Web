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
  const [selectedAction, setSelectedAction] = useState(" ");
  const {currentColor} = useStateContext();
  const [clusterPrice, setClusterPrice] = useState(null);
  const [clusters, setClusters] = useState([]); 
  const [showPriceBox, setShowPriceBox] = useState(true);
  

// Fetch the detailed info of the cluster by ID
  const getClusterById = async (clusterId) => {
    try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(`${API_URL}/clusters/cluster_name/${clusterId}/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(text);
        }

        const data = await response.json();
        if (data && data.price !== null) {
            setClusterPrice(data.price);
            console.log("Setting clusterPrice:", data.price);
        }

        return data;
    } catch (error) {
        console.error('There was an error fetching the cluster data', error);
    }
};

// Fetch clusters associated with the provider
// const fetchClusters = async () => {
//   try {
//       const token = localStorage.getItem("jwtToken");
//       const response = await fetch(`${API_URL}/clusters/my_clusters/`, {
//           headers: {
//               'Authorization': `Bearer ${token}`,
//           },
//       }); 
      
//       if (!response.ok) {
//           const text = await response.text();
//           throw new Error(`Failed to fetch clusters. Status: ${response.status}. Response: ${text}`);
//       }

//       const data = await response.json();
//       console.log("Fetched Clusters:", data);
//       setClusters(data);
//   } catch (error) {
//       console.error('There was an error fetching the clusters', error);
//   }
// }

useEffect(() => {
  getClusterById();  // On component mount, fetch the clusters of the provider
}, []);

useEffect(() => {
  console.log("ClusterPrice changed:", clusterPrice);
}, [clusterPrice]);

// const handleClusterChange = async (e) => {
//   const clusterId = e.target.value;
//   console.log("Selected Cluster ID:", clusterId);
//   setSelectedAction(clusterId);

//   if (clusterId) {
//     const clusterDetails = await getClusterById(clusterId);
//     console.log("Fetched Cluster Details:", clusterDetails);

//   if (clusterDetails && (clusterDetails.id || clusterDetails.item_id)) {
//     setClusters([clusterDetails]);

//     const currentClusterPrice = clusterDetails.price ? clusterDetails.price : null;
//     setClusterPrice(currentClusterPrice);
//     setShowPriceBox(currentClusterPrice === null); // Show countbox if price is null

// } else {
//     console.error("Unexpected cluster data structure:", clusterDetails);
//     fetchClusters();
// }
//   }
// };

const handleSetPrice = async () => {
  console.log("handleSetPrice function called");
  
  // Log the current values at the start
  console.log("selectedAction:", selectedAction);
  console.log("clusterPrice:", clusterPrice);

  if (!selectedAction || selectedAction === "") {
    console.log("Exiting because selectedAction is not set");
    alert('Please select a cluster before setting the price!');
    return;
  }

  if (!clusterPrice) {
    console.log("Exiting because clusterPrice is not set");
    return;
  }

  const token = localStorage.getItem("jwtToken");
  console.log("Token retrieved:", token);

  try {
    console.log("About to send fetch request");
    const response = await fetch(`${API_URL}/clusters/set_price/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        cluster_id: selectedAction,
        price: Number(clusterPrice),
      }),
    });
    console.log("Fetch request completed");

    if (!response.ok) {
      const text = await response.text();
      console.log("Error from API:", text);
      throw new Error('Failed to set price');
    }

    const data = await response.json();
    console.log("API Response:", data);
    alert("Price updated successfully!");
  } catch (error) {
    console.error('There was an error setting the price', error);
    alert('Failed to update price!');
  }
};


return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="My Cloud > Inventory" title="Set your Inventory Price" />
        
      <h3 className="mb-4">My Inventory List</h3>
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
    // height='400'
    // className = "overflow-visible text-clip h-96"
  >
    <ColumnsDirective>
            {InventoryGrid.map((column) => (
              <ColumnDirective 
                key={column.field || column.headerText}
                {...column} 
              />
            ))}
    </ColumnsDirective>
    <Inject services={[Search, Page, Toolbar]} />
  </GridComponent>
</div>

// {/* <div className="mt-4">
// <Button
//   color="white"
//   bgColor={currentColor}
//   text="Set"
//   borderRadius="10px"
//   onClickCallback={handleSetPrice}
// />
// </div> */}

    
  );
};

export default Inventory;