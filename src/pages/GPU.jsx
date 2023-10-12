import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




// import { GPUsData, employeesGrid } from '../data/dummy';
import { Header } from '../components';
import API_URL from "../api/apiAddress";

import { useDispatch } from "react-redux";
import { setPrice } from "../reducers/priceSlicer";

function GPU() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_URL}/clusters/`)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);  // Set the "data" key of the response to state
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    { 
      field: 'id', 
      headerText: 'ID', 
      width: 120,
      template: (rowData) => {
        return <div>{rowData.id}</div>;
      }
    },
    { 
      field: 'region', 
      headerText: 'Region', 
      width: 120,
      template: (rowData) => {
        return <div>{rowData.region}</div>;
      }
    },
    { 
      field: 'cpu', 
      headerText: 'CPU', 
      width: 120,
      template: (rowData) => {
        return <div>{rowData.cpu}</div>;
      }
    },
    { 
      field: 'memory', 
      headerText: 'Memory', 
      width: 120,
      template: (rowData) => {
        return <div>{rowData.memory}</div>;
      }
    },
    { 
      field: 'pods', 
      headerText: 'Pods', 
      width: 120,
      template: (rowData) => {
        return <div>{rowData.pods}</div>;
      }
    },
    { 
      field: 'price', 
      headerText: 'Price', 
      width: 120,
      template: (rowData) => {
        const handleLinkClick = () => {
          // Check if the string contains any non-zero characters
          const hasNonZeroCpu = [...rowData.cpu].some(char => char !== "0");
          
          const routePath = hasNonZeroCpu ? `/clouds/confirmation CPU` : `/clouds/confirmation GPU/${rowData.id}`;
          
          // Dispatch the action
          dispatch(setPrice(rowData.price));
    
          // Navigate to the desired route
          navigate(routePath);
        };
        
        return <button onClick={handleLinkClick}>{rowData.price}</button>;
      }
    }
    

];

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="Market Cloud > GPU" title="Display Data" />
      <GridComponent
        dataSource={data}
        // ... other props
      >
        <ColumnsDirective>
          {columns.map((col, index) => <ColumnDirective key={index} {...col} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default GPU;
