// import React, { useState, useEffect } from "react";
// import { InvoicesGrid } from "../data/dummy";
// import {
//   GridComponent,
//   Inject,
//   ColumnsDirective,
//   ColumnDirective,
//   Search,
//   Page,
//   Toolbar,
// } from "@syncfusion/ej2-react-grids";

// import { generateInvoice } from "../api";

// const Invoices = () => {
//   const toolbarOptions = ["Search"];

//   const editing = { allowDeleting: true, allowEditing: true };
//   const settings = { wrapMode: "Content" };
//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     generateInvoice()
//       .then((generatedInvoice) => {
//         setInvoice(generatedInvoice);
//       })
//       .catch((error) => {
//         console.error("Failed to generate invoice:", error);
//       });
//   }, []);

//   return (
//     <div id="Invoices">
//       <div className=" mb-5 mt-10">
//         <p className="text-2xl font-extrabold tracking-tight text-slate-900">
//           Invoices
//         </p>
//         <p className="text-lg text-gray-400">
//           Itemized statements of service charges
//         </p>
//       </div>
//       <div className="drop-shadow-[0px_5px_5px_rgba(0,0,0,0.15)]">
//         <GridComponent
//           rowHeight={100}
//           dataSource={InvoicesData}
//           width="auto"
//           allowPaging
//           allowSorting
//           pageSettings={{ pageCount: 5 }}
//           editSettings={editing}
//           toolbar={toolbarOptions}
//           allowTextWrap={true}
//           textWrapSettings={settings}
//         >
//           <ColumnsDirective>
//             {/* eslint-disable-next-line react/jsx-props-no-spreading */}
//             {InvoicesGrid.map((item, index) => (
//               <ColumnDirective
//                 clipMode="EllipsisWithTooltip"
//                 key={index}
//                 {...item}
//               />
//             ))}
            
//             <ColumnDirective
//               headerText="Actions"
//               template={record => record.status === "Unpaid" ? <button>Action</button> : null}
//   />
//           </ColumnsDirective>
//           <Inject services={[Search, Page, Toolbar]} />
//         </GridComponent>
//       </div>

//       {invoice && (
//         <div>
//           <h2>Invoice</h2>
//           <p>Date: {invoice.date}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Invoices;

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
import { InvoicesGrid } from "../data/dummy";
import { getInvoiceByUser, generateInvoice } from "../api";
import Web3 from "web3";

const Invoices = () => {
  const toolbarOptions = ["Search"];
  const editing = { allowDeleting: true, allowEditing: true };
  const settings = { wrapMode: "Content" };

  // We will store the fetched invoices in this state
  const [invoicesData, setInvoicesData] = useState([]);

  useEffect(() => {
    getInvoiceByUser()
      .then((fetchedInvoices) => {
        setInvoicesData(fetchedInvoices);
      })
      .catch((error) => {
        console.error("Failed to fetch invoices:", error);
      });
  }, []);

  // Set up web3 and the contract
  const web3 = new Web3(Web3.givenProvider); // uses MetaMask's provider
  // const contractAbi = ...;  // ABI from your contract
  const contractAddress = '0xYourContractAddress';
  // const contract = new web3.eth.Contract(contractAbi, contractAddress);

  // const withdrawEarnings = async () => {
  //   try {
  //     // Note: You might want to first ensure the user is connected to a wallet provider, e.g., MetaMask
  //     const accounts = await web3.eth.getAccounts(); 
  //     if (accounts.length === 0) {
  //       alert("Please connect to MetaMask.");
  //       return;
  //     }

  //     const invoice = await generateInvoice();
  //     const earning = invoice.total_price;  // assuming total_price is the earning
      
  //     await contract.methods.withdrawEarning(earning).send({ from: accounts[0] });
  //     alert('Earnings withdrawn successfully!');

  //   } catch (error) {
  //     console.error("Error withdrawing earnings:", error);
  //     alert("Error withdrawing earnings. Check console for details.");
  //   }
  // };

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
            {InvoicesGrid.map((item) => (
              <ColumnDirective
              key={item.field}
              field={item.field}
              headerText={item.headerText}
              width={item.width}
              textAlign={item.textAlign}
              isPrimaryKey={item.isPrimaryKey}
            />
            ))}
            {/* <ColumnDirective
              headerText="Actions"
              template={record => record.status === "Unpaid" ? 
              <button onClick={withdrawEarnings}>Unpaid</button> : null}
            /> */}
          </ColumnsDirective>
          <Inject services={[Search, Page, Toolbar]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Invoices;
