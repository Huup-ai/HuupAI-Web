import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Check, Header, OSDropdown, PayinComfirmation } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { Link, NavLink } from "react-router-dom";
import { getWallet } from "../api";
import API_URL from "../api/apiAddress";
import { middlewarePost, authBackendGet } from "../api/apiUtil";
import { useNavigate } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import Countbox from "../components/Countbox";

const Confirmation_CPU = () => {
  const { currentColor, currentMode } = useStateContext();
  const { id } = useParams();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // check if user is logged in
  console.log("Is Authenticated:", isAuthenticated); // Log the value
  let hasPaymentMethod = useSelector((state) => state.auth.hasPaymentMethod); // check if user has a payment method

  const navigate = useNavigate();

  const hasEnoughCredit = async () => {
    const wallet = (await authBackendGet("/wallets/get_wallets/")).data[0]
      .address;
    const body = { wallet_address: wallet };
    const res = await middlewarePost("/contract/getRemainingCredit/", body);
    const remainingCredit = res.data.balance;
    const threshHoldHour = 3;
    const rate = 1;
    console.log(remainingCredit);
    return threshHoldHour * rate < remainingCredit;
  };

  const handleConfirmOrder = async () => {
    console.log("Button clicked!");
    console.log({ id });
    //console.log(user.id);
    const token = localStorage.getItem("jwtToken");

    //getWallet(token);
    if (!(await hasEnoughCredit())) {
      hasPaymentMethod = false;
    }
    //if statement check if user has add a payment method.
    if (hasPaymentMethod) {
      try {
        const response = await fetch(`${API_URL}/instances/${id}/createvm/`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            metadata: {
              name: "win2019-dv-01",
              namespace: "default",
            },
            spec: {
              dataVolumeTemplates: [
                {
                  metadata: {
                    name: "mgt04-system-disk",
                  },
                  spec: {
                    pvc: {
                      accessModes: ["ReadWriteOnce"],
                      resources: {
                        requests: {
                          storage: "40Gi",
                        },
                      },
                      storageClassName: "longhorn",
                    },
                    source: {
                      http: {
                        url: "http://192.168.49.15:9000/edge/test/ubuntu18.04/ecs-ubuntu18.04-x64-20220121.qcow2",
                      },
                    },
                  },
                },
                {
                  metadata: {
                    name: "mgt04-data-disk",
                  },
                  spec: {
                    pvc: {
                      accessModes: ["ReadWriteOnce"],
                      resources: {
                        requests: {
                          storage: "60Gi",
                        },
                      },
                      storageClassName: "longhorn-ssd",
                    },
                    source: {
                      blank: {},
                    },
                  },
                },
              ],
              running: true,
              template: {
                spec: {
                  domain: {
                    devices: {
                      disks: [
                        {
                          disk: {},
                          name: "root-volume",
                        },
                        {
                          disk: {
                            bus: "virtio",
                          },
                          name: "data-volume",
                        },
                        {
                          disk: {
                            bus: "virtio",
                          },
                          name: "cloudinitdisk",
                        },
                      ],
                    },
                    machine: {
                      type: "q35",
                    },
                    resources: {
                      limits: {
                        cpu: "16",
                        memory: "48Gi",
                      },
                      requests: {
                        cpu: "1",
                        memory: "48Gi",
                      },
                    },
                  },
                  nodeSelector: {
                    "kubernetes.io/hostname": "master001",
                  },
                  volumes: [
                    {
                      dataVolume: {
                        name: "mgt04-system-disk",
                      },
                      name: "root-volume",
                    },
                    {
                      dataVolume: {
                        name: "mgt04-data-disk",
                      },
                      name: "data-volume",
                    },
                    {
                      cloudInitNoCloud: {
                        userData: "#ps1",
                      },
                      name: "cloudinitdisk",
                    },
                  ],
                },
              },
            },
            status: {},
          }),
        });

        const data = await response.json();

        // Handle the response data as needed.
        if (!response.ok) {
          console.error("Server Response:", data); // This will print any error detail from the server
        } else if (data.success) {
          console.log("VM Created!");
        } else {
          console.log("There was an issue creating the vm.");
          console.log("Server Response:", data); // Add this line to print server's detailed response
        }
      } catch (error) {
        console.error("Error confirming order:", error);
      }
    } else {
      console.log("Please add a payment method or charge your wallet");
      alert("Please add a payment method or charge your wallet");
      navigate("/clouds/profile");
    }
  };
  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:pb-20 md:pt-10 md:px-20 bg-white rounded-3xl">
      <Header
        category="Market Cloud > CPU > Order Confirmation"
        title="CPU Rental Order Form"
      />

      <PayinComfirmation />

      <div className="mt-12 flex mb-10">
        <p className="underline underline-offset-4 w-20">vCPU</p>
        <Countbox />
      </div>

      <div className="flex  mb-10 ">
        <p className="underline underline-offset-4 w-20">RAM(GB)</p>
        <Countbox />
      </div>

      <div className="flex mb-10 ">
        <p className="underline underline-offset-4 w-20">Disk1(GB)</p>
        <Countbox />
        <div className="w-20"></div>

        <p className="underline underline-offset-4 w-20">Disk2(GB)</p>
        <Countbox />
        <div className="w-20"></div>
        <button>
          <BsPlusLg />
        </button>
      </div>

      <div className="flex mb-10">
        <pc className="w-20">OS</pc>
        <OSDropdown />
      </div>

      <div className="flex flex-start mb-10">
        <Check text="Generate SSH Certificate" />
      </div>

      <div>
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
          onClickCallback={handleConfirmOrder}
        />

        <Link to={`/clouds/CPU`} className="ml-10">
          Back
        </Link>
      </div>
    </div>
  );
};

export default Confirmation_CPU;
