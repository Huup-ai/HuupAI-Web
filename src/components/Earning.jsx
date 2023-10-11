import React, { useState, useEffect } from 'react';
import { EarningData, EarningGrid} from '../data/dummy';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Toolbar } from '@syncfusion/ej2-react-grids';
import API_URL from "../api/apiAddress";

const Earning = () => {
  const [earningData, setEarningData] = useState([]);
  const toolbarOptions = ['Search'];
  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const token = localStorage.getItem("jwtToken")

  useEffect(() => {
    fetch(`${API_URL}/invoices/get_user_invoices/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error(text);
      });
    }
    })
    .then(data => {
      const processedData = data.map(invoice => ({
        ...invoice,
        earning: invoice.price * invoice.usage // Assuming each invoice has price and usage attributes
      }));
      setEarningData(processedData);
    })
    .catch(error => console.error('Error fetching invoice data:', error));
  }, []);
  
  return (
    <div id = "Current Earning">
      <div className=" mb-5 mt-10">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          
          Current Earning
        </p>
        <p className="text-lg text-gray-400">Fees and metered feature usage </p>
      </div>

      <div className="drop-shadow-[0px_5px_5px_rgba(0,0,0,0.15)]">
        

      <GridComponent
        rowHeight={100}
        dataSource={earningData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        
        allowTextWrap={true}
        textWrapSettings={settings}
      >
      
        <ColumnsDirective >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {EarningGrid.map((item, index) => <ColumnDirective clipMode='EllipsisWithTooltip' key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />

      </GridComponent>

      </div>
    </div>
  )
}

export default Earning