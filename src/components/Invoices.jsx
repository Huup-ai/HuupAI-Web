import React, { useState, useEffect } from "react";
import { InvoicesData, InvoicesGrid } from "../data/dummy";
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

const Invoices = () => {
  const toolbarOptions = ["Search"];

  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    generateInvoice()
      .then((generatedInvoice) => {
        setInvoice(generatedInvoice);
      })
      .catch((error) => {
        console.error("Failed to generate invoice:", error);
      });
  }, []);

  return (
    <div id="Invoices">
      <div className=" mb-5 mt-10">
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
          dataSource={InvoicesData}
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
            {InvoicesGrid.map((item, index) => (
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

      {invoice && (
        <div>
          <h2>Invoice</h2>
          <p>Date: {invoice.date}</p>
        </div>
      )}
    </div>
  );
};

export default Invoices;
