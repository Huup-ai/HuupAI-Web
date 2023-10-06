import React, { useState, useEffect } from 'react';
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { InstancesData, InstancesGrid } from "../data/dummy";
import { Header } from "../components";
import { DropdownAction } from "../components/DropdownAction";
import { BsPlusLg } from "react-icons/bs";
import { authBackendGet } from "../api/apiUtil";

const Instances = () => {

  const [data, setData] = useState([]);
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  useEffect(() => {
    authBackendGet('/instances/get_instances/')
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);  // Set the "data" key of the response to state
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const SSHCert = (props) => (
    <div className="flex items-center justify-center gap-2">
      <span>{props.SSHCert}</span>
      <button>
        <BsPlusLg/>
      </button>
    </div>
  );

  const Due = (props) => (
    <div className="flex items-center justify-center gap-2">
      <Link className="underline">{props.Due}</Link>
    </div>
  );

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="My Cloud > Instances" title="Welcome" />

      <GridComponent
        rowHeight={70}
        dataSource={InstancesData}
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
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Inventory Name"
            headerText="Inventory Name"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="GPU"
            headerText="GPU"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Configuration"
            headerText="Configuration"
            width="220"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Due"
            headerText="Payment Due"
            width="100"
            textAlign="Center"
            template={Due}
          />

          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Privacy"
            headerText="Privacy"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Hostname"
            headerText="Hostname"
            width="180"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="IP"
            headerText="IP"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="SSHCert"
            headerText="SSH Cert"
            width="100"
            textAlign="Center"
            template={SSHCert}
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="STATUS"
            headerText="STATUS"
            width="100"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="Action"
            headerText="Action"
            width="100"
            textAlign="Center"
            template={DropdownAction}
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Instances;
