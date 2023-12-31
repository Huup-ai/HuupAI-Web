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

import { InstancesData, InstancesGrid } from "../data/dummy";
import { Header } from "../components";
import { BsCloudDownload } from "react-icons/bs";
import { getUserInstances } from "../api";
import { updateVM, terminateVM } from "../api/vm";
import { Link } from "react-router-dom";
import SSHCert from "../components/SSHCert";
import DropdownAction from "../components/DropdownAction";
import { flattenObject } from "../utils";

const Instances = () => {
  const [data, setData] = useState([]);
  // const [actionStatus, setActionStatus] = useState({});
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  useEffect(() => {
    getUserInstances()
      .then((responseData) => {
        const flattenedData = responseData.map((item) => flattenObject(item));
        setData(flattenedData);
        console.log(flattenedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const SSHCert = (props) => (
  //   <div className="flex items-center justify-center gap-2">
  //     <span>{props.SSHCert}</span>
  //     <button>
  //       <BsCloudDownload />
  //     </button>
  //   </div>
  // );

  const Due = (props) => (
    <div className="flex items-center justify-center gap-2">
      <Link className="underline">{props.Due}</Link>
    </div>
  );

  const handleActionChange = (
    action,
    namespace = "default",
    vmName,
    clusterId
  ) => {
    console.log(action, vmName, clusterId);
    switch (action) {
      case "start":
      case "stop":
        updateVM(clusterId, namespace, vmName, action)
          .then((response) => {
            console.log("VM updated successfully:", response);
          })
          .catch((error) => {
            console.error("Error updating VM:", error);
          });
        break;
      case "terminate":
        terminateVM(clusterId, namespace, vmName)
          .then((response) => {
            console.log("VM terminated successfully:", response);
          })
          .catch((error) => {
            console.error("Error terminating VM:", error);
          });
        break;
      default:
        console.warn("Unhandled action:", action);
        break;
    }
  };
  // console.log("Instances - actionStatus:", actionStatus);

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header category="My Cloud > Instances" title="Welcome" />

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
      >
        <ColumnsDirective>
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="vm_name"
            headerText="Inventory Name"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="cluster_gpu"
            headerText="GPU"
            width="120"
            textAlign="Center"
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="cluster_configuration"
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
            field="dns"
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
            template={(props) => <SSHCert clusterid={props.cluster_id} />}
          />
          <ColumnDirective
            clipMode="EllipsisWithTooltip"
            field="status"
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
            template={(props) => (
              <DropdownAction
                onActionChange={(action) =>
                  handleActionChange(
                    action,
                    props.namespace,
                    props.vm_name,
                    props.cluster_id
                  )
                }
                status={props.status}
              />
            )}
          />
        </ColumnsDirective>
        <Inject services={[Search, Page, Toolbar]} />
      </GridComponent>
    </div>
  );
};
export default Instances;
