import React, { useState, useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// import { GPUsData, employeesGrid } from '../data/dummy';
import { Header } from "../components";
import API_URL from "../api/apiAddress";
import { GrLocation } from "react-icons/gr";

import { useDispatch } from "react-redux";
import { setPrice } from "../reducers/priceSlicer";

function CPU() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`${API_URL}/clusters/`)
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData); // Set the "data" key of the response to state
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerText: "ID",
      width: "100",
      textAlign: "Center",
      template: (rowData) => {
        return <div>{rowData.item_id}</div>;
      },
    },
    {
      field: "configuration",
      headerText: "Configuration",
      width: "100",
      textAlign: "Center",
      template: (rowData) => {
        return <div>{rowData.configuration}</div>;
      },
    },
    {
      field: "region",
      headerText: "Region",
      width: "100",
      textAlign: "Center",
      template: (rowData) => {
        return (
          <div className="flex items-center justify-center gap-2">
            <GrLocation />
            <span>{rowData.region}</span>
          </div>
        );

      },
    },
    
    {
      field: "audited",
      headerText: "Audited",
      width: "100",
      textAlign: "Center",
      template: (rowData) => {
        return <div>{rowData.is_audited.toString()}</div>;
      },
    },
    {
      field: "price",
      headerText: "Price",
      width: "100",
      textAlign: "Center",
      template: (rowData) => {
        const handleLinkClick = () => {
          // Set a GPU cookie when the user clicks on GPU component
          Cookies.set("userClickedCPU", true);
          Cookies.set("userClickedGPU", false);
          // Check if the string contains any non-zero characters
          const hasNonZeroCpu = true;

          const routePath = hasNonZeroCpu
            ? `/clouds/confirmation CPU/${rowData.item_id}`
            : `/clouds/confirmation GPU/${rowData.iitem_d}`;

          // Dispatch the action
          dispatch(setPrice(rowData.price));

          // Navigate to the desired route
          navigate(routePath);
        };

        return (
          <div className="text-center">
            <button
              onClick={handleLinkClick}
              className="italic text-purple-400 underline underline-offset-1"
            >
              {" "}
              Request Instance
            </button>

            <p>{rowData.price}</p>
          </div>
        );
        
      },
    },
  ];

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="Market Cloud > CPU" title="Save big on your cloud services" />
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
        // ... other props
      >
        <ColumnsDirective>
          {columns.map((col, index) => (
            <ColumnDirective key={index} {...col} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
}

export default CPU;
