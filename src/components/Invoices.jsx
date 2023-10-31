import React, { useState, useEffect } from "react";
// import { InvoicesGrid } from "../data/dummy";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { generateInvoice } from "../api";
import { BsDownload } from "react-icons/bs";
import Button from "../components/Button";

const Invoices = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateInvoice()
      .then((generatedInvoice) => {
        setInvoice(generatedInvoice);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to generate invoice:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const gridInvoice = () => (
    <div className="flex items-center justify-center gap-2">
      <Button 
        icon={<BsDownload />}
        onClickCallback={() => {
          const link = document.createElement("a");
          // link.href = downloadUrl;
          // link.download = fileName;
          link.click();
        }}
      />
    </div>
  );

  const InvoicesGrid = [
    {
      field: "date",
      headerText: "DATE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "des",
      headerText: "INSTANCE DES",
      width: "200",
      textAlign: "Center"
    },
    {
      headerText: "INVOICE",
      width: "100",
      template: gridInvoice,
      textAlign: "Center",
    },
    {
      field: "status",
      headerText: "STATUS",
      width: "100",
      textAlign: "Center"
    },
  ];

  return (
    <div id="Invoices">
      <div className="mb-5 mt-10">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          Invoices
        </p>
        <p className="text-lg text-gray-400">
          Itemized statements of service charges
        </p>
      </div>
      <div className="drop-shadow-[0px_5px_5px_rgba(0,0,0,0.15)]">
        <GridComponent
          rowHeight={100}
          dataSource={invoice}
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
            {InvoicesGrid.map((item, index) => (
              <ColumnDirective
                clipMode="EllipsisWithTooltip"
                key={index}
                {...item}
              />
            ))}
            {/* <ColumnDirective
              headerText="Actions"
              template={record => record.status === "Unpaid" ? <button>Action</button> : null}
            /> */}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Invoices;


