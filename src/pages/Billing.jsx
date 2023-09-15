import React, { useState, useEffect } from "react";
import { Header } from "../components";
import { Sidemenu, Usage, Details, Invoices } from "../components";
import { getVmStatus, getUserInstances } from "../api";

const Billing = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [vmStatus, setVmStatus] = useState([]);
  const [userInstances, setUserInstances] = useState([]);

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

  useEffect(() => {
    // call the API to get the VM status
    getVmStatus("mg01-syenbla-3", "default", "eijf-24-vm1")
      .then((data) => {
        setVmStatus(data);
      })
      .catch((error) => {
        console.error("Failed to fetch VM status: ", error);
      });

    // call the API to get the user instances
    getUserInstances("user@example.com")
      .then((data) => {
        setUserInstances(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user instances: ", error);
      });
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
      {/* title for consumer */}
      <Header category="Billing" title="Billing For Wenxuan" />

      <p className="text-lg text-gray-400">
        Current billing period runs from {formattedDate} to {laterMonth}{" "}
        {laterDay}
      </p>

      <div className="flex justify-between">
        <div className="sticky top-2 h-48">
          <Sidemenu />
        </div>

        <div className="flex flex-col w-2/3">
          <Usage vmStatus={vmStatus} />
          <Invoices userInstances={userInstances} />
          <Details />
        </div>
      </div>
    </div>
  );
};

export default Billing;
