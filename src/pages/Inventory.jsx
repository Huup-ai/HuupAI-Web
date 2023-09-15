import { React, useState } from "react";
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

const Inventory = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const [selectedAction, setSelectedAction] = useState(" ");
  const { currentColor } = useStateContext();

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="Inventory" title="Set your Inventory Price" />

      <div className="text-left ml-4 mb-5f flex flex-col">
        <div className="flex mb-5">
          <span className="w-60"> Select Cluster</span>
          <select
            className="border-solid border-2 rounded-md border-grey w-40"
            value={selectedAction} // ...force the select's value to match the state variable...
            onChange={(e) => setSelectedAction(e.target.value)} // ... and update the state variable on any change!
          >
            <option value=""> </option>
            <option value="US-NY-T4-C1">US-NY-T4-C1</option>
            <option value="US-CA-V100-A1">US-CA-V100-A1</option>
            <option value="EU-Germany-A100-A1"> EU-Germany-A100-A1 </option>
            <option value="EU-Germany-A100-A1"> EU-Germany-A100-A1</option>
          </select>
        </div>

        <div className="flex mb-5">
          <span className="w-60">Set Price per hour in USD</span>
          <Countbox />
        </div>

        <div className="mb-10">
          <Button
            color="white"
            bgColor={currentColor}
            text="Set"
            borderRadius="10px"
          />
        </div>
      </div>

      <div>
        <h3> My Inventory List</h3>
        <GridComponent
          rowHeight={70}
          dataSource={GPUsData}
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
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {InventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Inventory;
