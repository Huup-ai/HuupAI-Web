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
  const [data, setData] = useState([]);
  

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
      console.log("Fetched Clusters:", data);
      setData(data);
  } catch (error) {
      console.error('There was an error fetching the clusters', error);
  }
}

const handleHourlyRateChange = (e, dataItem) => {
  setClusters(prevClusters => 
      prevClusters.map(cluster => 
          cluster.id === dataItem.id 
              ? { ...cluster, price: e.target.value } 
              : cluster
      )
  );
};

useEffect(() => {
  fetchClusters(); 
}, []);

// useEffect(() => {
//   console.log("ClusterPrice changed:", clusterPrice);
// }, [clusterPrice]);

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
    template: (rowData) => (
      <input 
        type="number" 
        value={rowData.price || ''} 
        className="border rounded" 
        onChange={(e) => handleHourlyRateChange(e, rowData)}
      />
    ),
    textAlign: "Center",
  },
];

const handleSetPrice = async () => {
  console.log("handleSetPrice function called");
  
  const token = localStorage.getItem("jwtToken");
  console.log("Token retrieved:", token);

  // Loop through all clusters
  for (let cluster of clusters) {
      if (!cluster.price) {
          console.log(`Cluster with id ${cluster.id} does not have a set price. Skipping.`);
          continue; // skip clusters without a set price
      }

      try {
          console.log(`About to send fetch request for cluster with id ${cluster.id}`);
          const response = await fetch(`${API_URL}/clusters/set_price/`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({
                  cluster_id: cluster.id, // use current cluster's id
                  price: Number(cluster.price),
              }),
          });
          console.log("Fetch request completed");

          if (!response.ok) {
              const text = await response.text();
              console.log("Error from API:", text);
              throw new Error(`Failed to set price for cluster with id ${cluster.id}`);
          }

          const data = await response.json();
          console.log("API Response for cluster:", data);
      } catch (error) {
          console.error(`There was an error setting the price for cluster with id ${cluster.id}`, error);
      }
  }

  alert("Prices updated successfully!");
};


return (
  <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
    {/* <Header category="Market Cloud > Inventory" title="My Inventory List" /> */}
    <h3 className="mb-4">My Inventory List</h3>
    {/* <div className="relative"> */}
      <GridComponent
        rowHeight={70}
        dataSource={data}
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

// return (
//   <>
//     <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
//       {/* <Header category="My Cloud > Inventory" title="Set your Inventory Price" />  */}
//       <h3 className="mb-4">My Inventory List</h3>
//   <GridComponent
//     rowHeight={70}
//     dataSource={clusters}
//     width="auto"
//     allowPaging
//     allowSorting
//     pageSettings={{ pageCount: 5 }}
//     editSettings={editing}
//     toolbar={toolbarOptions}
//     allowTextWrap={true}
//     textWrapSettings={settings}
//     // height='400'
//     // className = "overflow-visible text-clip h-96"
//   >
//     <ColumnsDirective>
//             {InventoryGrid.map((column) => (
//               <ColumnDirective 
//                 key={column.field || column.headerText}
//                 {...column} 
//               />
//             ))}
//     </ColumnsDirective>
//     <Inject services={[Search, Page, Toolbar]} />
//   </GridComponent>
// </div>


// <div className="mt-4 text-right">
// <Button
//   color="white"
//   bgColor={currentColor}
//   text="Set"
//   borderRadius="10px"
//   onClickCallback={handleSetPrice}
// />
// </div>
// </>

//   );
// };

// export default Inventory;