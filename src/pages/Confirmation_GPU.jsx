import React , { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { Check, Header, OSDropdown } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { Link, NavLink } from 'react-router-dom';
import { getWallet } from '../api';
import API_URL from "../api/apiAddress";

const Confirmation_GPU = () => {
  const { currentColor, currentMode } = useStateContext();
  const { id } = useParams();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);  // check if user is logged in
  console.log("Is Authenticated:", isAuthenticated);  // Log the value
  const hasPaymentMethod = useSelector(state => state.auth.hasPaymentMethod); // check if user has a payment method

  // Define a function to get the wallet
// const getWallet = async (token) => {
//   try {
//     // Make a GET request to the endpoint with headers
//     const response = await fetch(`${API_URL}/wallets/get_wallets/`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + token
//       }
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     // Parse the JSON data from the response
//     const data = await response.json();

//     // Here, you can use the data as needed
//     console.log(data); // For now, we'll just log it

//     // If you want to display the address in an alert
//     alert("Wallet Address: " + data.address);

//   } catch (error) {
//     console.error("There was a problem with the fetch operation:", error.message);
//     alert("Failed to fetch wallet address: " + error.message);
//   }
// };





  const handleConfirmOrder = async () => {
    console.log('Button clicked!');
    console.log({ id } );
    //console.log(user.id);
    const token = localStorage.getItem('jwtToken');

    getWallet(token);

    //if statement check if user has add a payment method. 
    if(hasPaymentMethod){
    try {
        const response = await fetch(`${API_URL}/instances/${id}/createvm/`, {

            method: 'POST',
            credentials: "include", 
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
              
                "metadata": {
                  "name": "win2019-dv-01",
                  "namespace": "default"
                },
                "spec": {
                  "dataVolumeTemplates": [
                    {
                      "metadata": {
                        "name": "mgt04-system-disk"
                      },
                      "spec": {
                        "pvc": {
                          "accessModes": [
                            "ReadWriteOnce"
                          ],
                          "resources": {
                            "requests": {
                              "storage": "40Gi"
                            }
                          },
                          "storageClassName": "longhorn"
                        },
                        "source": {
                          "http": {
                            "url": "http://192.168.49.15:9000/edge/test/ubuntu18.04/ecs-ubuntu18.04-x64-20220121.qcow2"
                          }
                        }
                      }
                    },
                    {
                      "metadata": {
                        "name": "mgt04-data-disk"
                      },
                      "spec": {
                        "pvc": {
                          "accessModes": [
                            "ReadWriteOnce"
                          ],
                          "resources": {
                            "requests": {
                              "storage": "60Gi"
                            }
                          },
                          "storageClassName": "longhorn-ssd"
                        },
                        "source": {
                          "blank": {}
                        }
                      }
                    }
                  ],
                  "running": true,
                  "template": {
                    "spec": {
                      "domain": {
                        "devices": {
                          "disks": [
                            {
                              "disk": {},
                              "name": "root-volume"
                            },
                            {
                              "disk": {
                                "bus": "virtio"
                              },
                              "name": "data-volume"
                            },
                            {
                              "disk": {
                                "bus": "virtio"
                              },
                              "name": "cloudinitdisk"
                            }
                          ]
                        },
                        "machine": {
                          "type": "q35"
                        },
                        "resources": {
                          "limits": {
                            "cpu": "16",
                            "memory": "48Gi"
                          },
                          "requests": {
                            "cpu": "1",
                            "memory": "48Gi"
                          }
                        }
                      },
                      "nodeSelector": {
                        "kubernetes.io/hostname": "master001"
                      },
                      "volumes": [
                        {
                          "dataVolume": {
                            "name": "mgt04-system-disk"
                          },
                          "name": "root-volume"
                        },
                        {
                          "dataVolume": {
                            "name": "mgt04-data-disk"
                          },
                          "name": "data-volume"
                        },
                        {
                          "cloudInitNoCloud": {
                            "userData": "#ps1"
                          },
                          "name": "cloudinitdisk"
                        }
                      ]
                    }
                  }
                },
                "status": {}
              
              
            })
        });

        const data = await response.json();

        // Handle the response data as needed.
        if (!response.ok) {
          console.error("Server Response:", data);  // This will print any error detail from the server
      } else if(data.success) {
          console.log("VM Created!");
      } else {
          console.log("There was an issue creating the vm.");
          console.log("Server Response:", data);   // Add this line to print server's detailed response
      }

    } catch (error) {
        console.error("Error confirming order:", error);
    }
  }else{
    console.log("Please add a payment method or charge your wallet")
    alert("Please add a payment method or charge your wallet")
  }
};


  return (
    <div className="m-2 md:m-20 mt-24 p-2 md:p-20 bg-white rounded-3xl">
      <Header category="GPU Order Confirmation" title="Rent GPU Server" />
      <div className="flex space-x-20 mb-10">
        <p>OS</p>
        <OSDropdown />
      </div>

      <div className="flex space-x-20 mb-10">
        <Check text="Generate SSH Certificate" />
      </div>

      <div>
      <button onClick={handleConfirmOrder}>Test Native Button</button>
        <Button
          color="white"
          bgColor={currentColor}
          text="Confirm Order"
          borderRadius="10px"
          onClickCallback={handleConfirmOrder}
          class
        />

        <Link to={`/clouds/GPU`} className="ml-10">
          
          Back
        </Link>
      </div>
    </div>
  );
};

export default Confirmation_GPU;