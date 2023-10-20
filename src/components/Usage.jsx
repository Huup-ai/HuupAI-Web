import React, { useState, useEffect } from "react";
import { UsagesData, UsagesGrid } from "../data/dummy";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { getUserInstances, getUserUsage } from "../api";

const Usage = () => {
  const toolbarOptions = ["Search"];
  const [userInstances, setUserInstances] = useState([]);
  const [userUsage, setUserUsage] = useState([]);

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  useEffect(() => {
    // call the API to get the user instances
    getUserUsage(localStorage.getItem("jwtToken"))
      .then((data) => {
        setUserUsage(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user instances: ", error);
      });
  }, []);

  return (
    <div id="Current Usages">
      <div className=" mb-5 mt-10">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          Current Usages
        </p>
        <p className="text-lg text-gray-400">Fees and metered feature usage </p>
      </div>

      <div className="drop-shadow-[0px_5px_5px_rgba(0,0,0,0.15)]">
        <GridComponent
          rowHeight={100}
          dataSource={userUsage}
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
            {UsagesGrid.map((item, index) => (
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
    </div>
  );
};

export default Usage;
