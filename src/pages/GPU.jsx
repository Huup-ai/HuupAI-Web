import React, { useState, useEffect } from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import { Link } from 'react-router-dom';

import { GPUsData, employeesGrid } from '../data/dummy';
import { Header } from '../components';

function GPU() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/clusters/')
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
        return <Link to={`/clouds/confirmation GPU/${rowData.id}`}>{rowData.price}</Link>;
      }
    }

];

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="Data" title="Display Data" />
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

// const GPU = () => {
//   const toolbarOptions = ['Search'];

//   const editing = { allowDeleting: true, allowEditing: true };
//   const settings = { wrapMode: 'Content' };

//   return (
//     <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
//       <Header category="GPU" title="Save big on your cloud services" />
      
      
//       <GridComponent
//         rowHeight={70}
//         dataSource={GPUsData}
//         width="auto"
//         allowPaging
//         allowSorting
//         pageSettings={{ pageCount: 5 }}
//         editSettings={editing}
//         toolbar={toolbarOptions}
//         allowTextWrap={true} 
//         textWrapSettings={settings} 
//         // height='400'
//         // className = "overflow-visible text-clip h-96"
//       >
//         <ColumnsDirective >
//           {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//           {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
//         </ColumnsDirective>
//         <Inject services={[Search, Page, Toolbar]} />

//       </GridComponent>
//     </div>
//   );
// };
// export default GPU;