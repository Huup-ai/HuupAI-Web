import React , { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import { Check, Header, OSDropdown } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { Button } from "../components";
import { Link, NavLink } from 'react-router-dom';

const Confirmation_GPU = () => {
  const { currentColor, currentMode } = useStateContext();
  const { id } = useParams();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);  // This line should be directly inside the component, not inside any other function
  console.log("Is Authenticated:", isAuthenticated);  // Log the value

  

  const handleConfirmOrder = async () => {
    console.log('Button clicked!');
    console.log({ id } );
    //console.log(user.id);
    
    try {
        const response = await fetch(`http://127.0.0.1:8000/instances/${id}/createvm/`, {

            method: 'POST',
            credentials: "include", 
            headers: {
                'Content-Type': 'application/json', 
                //'sessionid': 'gaexwj761o847pobrb38fv4p1ufoc1v1'

                // Include any other headers you need
                
            },
            body: JSON.stringify({
              
          
                "metadata": {
                  "name": "win2008-dv-01",
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
          onClick={handleConfirmOrder}
          class
        />

        <Link to={`/GPU`} className="ml-10">
          
          Back
        </Link>
      </div>
    </div>
  );
};

export default Confirmation_GPU;
