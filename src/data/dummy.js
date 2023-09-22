import React from "react";
import { Button } from "../components";
import { Link, NavLink } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import {
  AiOutlineCalendar,
  AiOutlineShoppingCart,
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineStock,
} from "react-icons/ai";
import {
  FiShoppingBag,
  FiEdit,
  FiPieChart,
  FiBarChart,
  FiCreditCard,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import {
  BsKanban,
  BsBarChart,
  BsBoxSeam,
  BsCurrencyDollar,
  BsShield,
  BsChatLeft,
  BsDownload
} from "react-icons/bs";
import { BiColorFill } from "react-icons/bi";
import { IoMdContacts } from "react-icons/io";
import { RiContactsLine, RiStockLine } from "react-icons/ri";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { GiLouvrePyramid } from "react-icons/gi";
import { GrLocation } from "react-icons/gr";

import { sum } from "@syncfusion/ej2-react-charts";

export const links = [
  {
    title: "MARKET CLOUD",
    links: [
      {
        name: "CPU",
        icon: <FiShoppingBag />,
      },
      {
        name: "GPU",
        icon: <FiShoppingBag />,
      },
    ],
  },

  {
    title: "MY CLOUD",
    links: [
      {
        name: "profile",
        icon: <FiShoppingBag />,
      },
      {
        name: "billing",
        icon: <FiShoppingBag />,
      },
      {
        name: "instances",
        icon: <FiShoppingBag />,
      },
    ],
  },
];

export const provider = [
  {
    title: "Provider",
    links: [
      {
        name: "Profile",
        icon: <FiShoppingBag />,
      },
      {
        name: "Inventory",
        icon: <FiShoppingBag />,
      },
      {
        name: "Invoice",
        icon: <FiShoppingBag />,
      },
    ],
  },

];

const gridEmployeeProfile = (props) => (
  <div className="flex items-center justify-center">
    <p>{props.Name}</p>
  </div>
);

const gridPriceCPU = (props) => (
  <div className="text-center">
    <Link
      to={`/confirmation%20CPU`}
      className="italic text-purple-400 underline underline-offset-1"
    >
      {" "}
      Request Instance
    </Link>

    <p>{props.Price}</p>
  </div>
);
const gridCharge = (props) => (
  <div className="text-center">
    <p>$ {props.Charge}</p>
  </div>
);

const gridEarn = (props) => (
  <div className="text-center">
    <p>$ {props.Earn}</p>
  </div>
);

// const Sum = (props) => {
//   const numberArray = [10, 20, 30, 40, 50];

//   const sum = numberArray.reduce((total, num) => total + num, 0);

//   return (
//     <div className="text-center">
//       <p>{sum}</p>
//     </div>
//   );
// };

const gridPriceGPU = (props) => (
  <div className="text-center">
   <Link
      to={`/confirmation%20GPU`}
      className="italic text-purple-400 underline underline-offset-1"
    >
      {" "}
      Request Instance
    </Link>

    <p>{props.Price}</p>
  </div>
);

const gridEmployeeCountry = (props) => (
  <div className="flex items-center justify-center gap-2">
    <GrLocation />
    <span>{props.Country}</span>
  </div>
);

const gridInvoice = () => (
  <div className="flex items-center justify-center gap-2">
   <Button 
    icon = {<BsDownload/>}
    onClickCallback={()=>{
        const link = document.createElement("a");
        // link.href = downloadUrl;
        // link.download = fileName;
        link.click();
    }}/>
  </div>
);

export const GPUsData = [
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
];

export const CPUsData = [
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
  {
    Price: "$0.69",
    Name: "US-NY-T4-C1",
    Type: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Country: "US-NY",
    Privacy: "Confidiental",
  },
];

export const employeesGrid = [
  {
    field: "Name",
    width: "100",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "Type", headerText: "GPU", width: "100", textAlign: "Center" },
  {
    headerText: "Region",
    width: "100",
    textAlign: "Center",
    template: gridEmployeeCountry,
  },

  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "Privacy",
    headerText: "Privacy",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Price",
    headerText: "Hourly Rate (USD)",
    width: "100",
    template: gridPriceGPU,
    textAlign: "Center",
  },
];
export const InventoryGrid = [
  {
    field: "Name",
    width: "100",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "Type", headerText: "GPU", width: "100", textAlign: "Center" },
  {
    headerText: "Region",
    width: "100",
    textAlign: "Center",
    template: gridEmployeeCountry,
  },

  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    textAlign: "Center",
  },

  {
    field: "Privacy",
    headerText: "Privacy",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Price",
    headerText: "Hourly Rate (USD)",
    width: "100",
    // template: gridPriceGPU,
    textAlign: "Center",
  },
];

export const CPUsGrid = [
  {
    field: "Name",
    width: "100",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "Type", headerText: "CPU", width: "100", textAlign: "Center" },
  {
    headerText: "Region",
    width: "100",
    textAlign: "Center",
    template: gridEmployeeCountry,
  },

  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    // template may need for overflow
    textAlign: "Center",
  },

  {
    field: "Privacy",
    headerText: "Privacy",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "Price",
    headerText: "Hourly Rate (USD)",
    width: "100",
    template: gridPriceCPU,
    // template(add link)
    textAlign: "Center",
  },
];

export const UsagesGrid = [
  {
    field: "Name",
    headerText: "Instance Name",
    width: "100",
    // template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "GPU", headerText: "GPU", width: "100", textAlign: "Center" },
  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    // template may need for overflow
    textAlign: "Center",
  },

  { field: "Usage", headerText: "Usage", width: "100", textAlign: "Center" },
  {
    field: "Charge",
    headerText: "Charge",
    width: "100",
    template: gridCharge,
    textAlign: "Center",
  },
];

export const EarningGrid = [
  {
    field: "Name",
    headerText: "Instance Name",
    width: "100",
    
    textAlign: "Center",
  },
  { field: "GPU", headerText: "GPU", width: "100", textAlign: "Center" },
  {
    field: "Configuration",
    headerText: "Configuration",
    width: "100",
    
    textAlign: "Center",
  },

  { field: "Usage", headerText: "Usage", width: "100", textAlign: "Center" },
  {
    field: "Earn",
    headerText: "Earning",
    width: "100",
    template: gridEarn,
    textAlign: "Center",
  },
];

export const InvoicesGrid = [
  {
    field: "date",
    headerText: "DATE",
    width: "100",
    // template: gridEmployeeProfile,
    textAlign: "Center",
  },
  { field: "des", headerText: "INSTANCES DES", width: "200", textAlign: "Center" },
  {
    headerText: "INVOICE",
    width: "100",
    template: gridInvoice,
    textAlign: "Center",
  },

  { field: "status", headerText: "STATUS", width: "100", textAlign: "Center" },

];

export const InstancesData = [
  {
    "Inventory Name": "huupai_T4_1",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "24 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Region: "US-NY",
    Privacy: "Confidiental",
    Hostname: "302932.youcolo.com",
    IP: "12.26.1.0",
    SSHCert: "webcert1 webcert2",
    STATUS: "STARTED",
    Action: "on",
  },
];

export const UsagesData = [
  {
    Name: "huupai_T4_1",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "2",
    Charge: 1,
  },
  {
    Name: "huupai_T4_2",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "1",
    Charge: 2,
  },
  {
    Name: "huupai_T4_3",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "10",
    Charge: 40,
  },
  {
    Name: "Total",

    Charge: 43,
  },
];

export const EarningData = [
  {
    Name: "huupai_T4_1",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "2",
  Earn: 1,
  },
  {
    Name: "huupai_T4_2",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "1",
    Earn: 2,
  },
  {
    Name: "huupai_T4_3",
    GPU: "8 * NvidiaT4(8G)",
    Configuration:
      "26 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    Usage: "10",
    Earn: 40,
  },
  {
    Name: "Total",

    Earn: 43,
  },
];

export const InvoicesData = [
  {
    date: "10/23/2023",
    des: "4*NvidiaA100(80G). 24 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    status: "UNPAID",
  },
  {
    date: "9/23/2023",
    des: "8 * NvidiaT4(8G). 24 Core Intel i7 CPU, 128GB DDR4 Ram, 100G Bandwith, 10TB SSD",
    status: "PAID",
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];


