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

  function flattenObject(ob) {
    const result = {};

    for (const i in ob) {
      if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
        const temp = flattenObject(ob[i]);
        for (const j in temp) {
          result[i + "_" + j] = temp[j];
        }
      } else {
        result[i] = ob[i];
      }
    }
    return result;
  }

  useEffect(() => {
    // call the API to get the user instances
    getUserInstances()
      .then((responseData) => {
        const flattenedData = responseData.map((item) => flattenObject(item));
        setUserInstances(flattenedData);
        console.log(flattenedData);
      })
      .catch((error) => {
        console.error("Failed to fetch user instances: ", error);
      });
  }, []);

  // useEffect(() => {
  //   Promise.all([
  //     getUserInstances(),
  //     // getUserUsage(localStorage.getItem("jwtToken")),
  //   ])
  //     .then(([instancesResponse]) => {
  //       const flattenedInstances = instancesResponse.map((item) =>
  //         flattenObject(item)
  //       );
  //       const merged = mergeData(flattenedInstances, mockUserUsage);
  //       setMergedData(merged);
  //       console.log(merged);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  const usageTemplate = (data) => {
    const formattedUsage = Number(data.usage).toFixed(2);
    return <div>{formattedUsage}</div>;
  };

  const chargeTemplate = (data) => {
    const charge = (Number(data.cluster_price) * Number(data.usage)).toFixed(2);
    return <div>${charge}</div>;
  };

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
          dataSource={userInstances}
          width="auto"
          allowPaging
          allowSorting
          pageSettings={{ pageCount: 5 }}
          editSettings={editing}
          toolbar={toolbarOptions}
          allowTextWrap={true}
          textWrapSettings={settings}
        >
          {/* <ColumnsDirective>
            {UsagesGrid.map((item, index) => (
              <ColumnDirective
                clipMode="EllipsisWithTooltip"
                key={index}
                {...item}
              />
            ))}
          </ColumnsDirective> */}
          <ColumnsDirective>
            <ColumnDirective
              field="vm_name"
              headerText="Instance Name"
              width="200"
            />
            <ColumnDirective field="cluster_gpu" headerText="GPU" width="150" />
            <ColumnDirective
              field="cluster_configuration"
              headerText="Configuration"
              width="200"
            />
            <ColumnDirective
              headerText="Usage"
              width="100"
              template={usageTemplate}
            />
            <ColumnDirective
              headerText="Charge"
              width="100"
              template={chargeTemplate}
            />
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Usage;
