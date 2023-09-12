import React, { useState, useEffect } from "react";

import {
  Header,
  SidemenuPro,
  Earning,
  ProviderDetails,
  Invoices,
} from "../components";

const Billing = () => {
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 400) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const today = new Date();
  const month = today.toLocaleString("default", { month: "short" });
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${month} ${day}`;

  const laterDate = new Date(today);
  laterDate.setDate(today.getDate() + 30);

  const laterMonth = laterDate.toLocaleString("default", { month: "short" });
  const laterDay = laterDate.getDate();

  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      {/* title for provider */}
      <providerDetails />
      <Header category="Invoice" title="Invoice For Wenxuan" />

      <p className="text-lg text-gray-400">
        Current billing period runs from {formattedDate} to {laterMonth}{" "}
        {laterDay}
      </p>

      <div className="flex justify-between">
        <div className="sticky top-2 h-48">
          <SidemenuPro />
        </div>

        <div className="flex flex-col w-2/3">
          <Earning />
          <Invoices />
          <ProviderDetails />
        </div>
      </div>
    </div>
  );
};

export default Billing;
