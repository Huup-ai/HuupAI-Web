import React from "react";
import Cookies from 'js-cookie';

import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { CPUsData, CPUsGrid } from "../data/dummy";
import { Header } from "../components";

const CPU = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  const handleCPULinkClick = () => {
    // Set a CPU cookie when the user clicks on CPU component
    Cookies.set('userClickedCPU', 'true'); // 'userClickedCPU' is the cookie name
    Cookies.set('userClickedGPU', 'true'); 

    // Optionally, you can perform other actions here
  };

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header
        category="Market Cloud > CPU"
        title="Save big on your cloud services"
      />
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
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {CPUsGrid.map((item, index) => (
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
  );
};
export default CPU;
