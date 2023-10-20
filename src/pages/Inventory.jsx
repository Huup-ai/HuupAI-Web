import React from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { CPUsData, InventoryGrid } from "../data/dummy";
import { Header, Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Inventory = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="Market Cloud > Inventory" title="My Inventory List" />
      <div className="relative">
        <GridComponent
          rowHeight={70}
          dataSource={CPUsData}
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
            {InventoryGrid.map((item, index) => (
              <ColumnDirective
                clipMode="EllipsisWithTooltip"
                key={index}
                {...item}
              />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
       
      </div>
      <div className="mt-4 text-right ">
        <Button
          color="white"
          bgColor={currentColor}
          text="Set"
          borderRadius="10px"
          // onClickCallback={handleSetPrice}
          />
</div>
    </div>
  );
};

export default Inventory;

  // Fetching cluster details by its ID when selected
//   const fetchClusterDetails = async (clusterId) => {
//     try {
//         const response = await fetch(`${API_URL}/clusters/cluster_name/${clusterId}/`);
//         if (!response.ok) {
//             const text = await response.text();
//             throw new Error(`Failed to fetch cluster details. Status: ${response.status}. Response: ${text}`);
//         }
//         const data = await response.json();
//         // e.g., setClusterDetails(data);

//     } catch (error) {
//         console.error('There was an error fetching the cluster details', error);
//     }
// };

// Fetching provider's clusters
// useEffect(() => {
//     async function fetchClusters() {
//         try {
//             const token = localStorage.getItem("jwtToken");
//             const response = await fetch(`${API_URL}/clusters/my_clusters/`); 
//             if (!response.ok) {
//               const text = await response.text();
//               throw new Error(`Failed to fetch clusters. Status: ${response.status}. Response: ${text}`);
//           }
//             const data = await response.json();
//             setClusters(data);
//         } catch (error) {
//             console.error('There was an error fetching the clusters', error);
//         }
//     }
    
//     fetchClusters();
// }, []);

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
//       setClusters(data);
//   } catch (error) {
//       console.error('There was an error fetching the clusters', error);
//   }
// }

// const handleClusterChange = (e) => {
//     setSelectedAction(e.target.value);
//     if (e.target.value) {
//       getClusterById(e.target.value); // Get the cluster by ID
//       fetchClusters(); // Fetch provider’s clusters  
//     }
// };

// // Handler for setting the price
// const handleSetPrice = async () => {
//   console.log("handleSetPrice function called");
//   const token = localStorage.getItem("jwtToken");
//   if (clusterPrice) {
//       try {
//           const response = await fetch(`${API_URL}/clusters/set_price/`, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//                   'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                   cluster_id: selectedAction,
//                   price: clusterPrice,
//               }),
//           });
//           if (!response.ok) {
//             const text = await response.text();
//             throw new Error('Failed to set price');
//           }
//           const data = await response.json();
//           console.log("Response Data:", data);
//       } catch (error) {
//           console.error('There was an error setting the price', error);
//       }
//   }
// };

// return (
//     <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
//       <Header category="My Cloud > Inventory" title="Set your Inventory Price" />
//         <div className="text-left ml-4 mb-5f flex flex-col">
//             <div className="flex mb-5">
//                 <span className="w-60"> Select Cluster</span>
//                 <select
//                     className="border-solid border-2 rounded-md border-grey w-40"
//                     value={selectedAction}
//                     onChange={handleClusterChange}
//                 >
//                     <option value=""> </option>
//                     {clusters.map(cluster => (
//                         <option key={cluster.id} value={cluster.id}>
//                             {cluster.name}
//                         </option>
//                     ))}
//                 </select>
//             </div>
        
//   {clusterPrice === null && (
//       <div className="flex mb-5">
//         <span className="w-60">Set Price per hour in USD</span>
//         <Countbox value={clusterPrice} onChange={e => setClusterPrice(e.target.value)} />
//       </div>
//   )}

//         <div className="mb-10">
//           <Button
//             color="white"
//             bgColor={currentColor}
//             text="Set"
//             borderRadius="10px"
//             onClickCallback={handleSetPrice}
//           />
//         </div>
//       </div>

//       <div>
//         <h3> My Inventory List</h3>
//         <GridComponent
//           rowHeight={70}
//           dataSource={clusters}
//           width="auto"
//           allowPaging
//           allowSorting
//           pageSettings={{ pageCount: 5 }}
//           editSettings={editing}
//           toolbar={toolbarOptions}
//           allowTextWrap={true}
//           textWrapSettings={settings}
//           // height='400'
//           // className = "overflow-visible text-clip h-96"
//         >
//           <ColumnsDirective>
//             {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//             {InventoryGrid.map((item, index) => (
//               <ColumnDirective key={index} {...item} />
//             ))}
//           </ColumnsDirective>
//           <Inject services={[Search, Page, Toolbar]} />
//         </GridComponent>
//       </div>
//     </div>
//   );
// };

// export default Inventory;
