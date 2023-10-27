import API_URL from "./apiAddress";

export async function updateVM(
  clusterId,
  namespace = "default",
  vmName,
  action
) {
  const requestBody = {
    clusterid: clusterId,
    vm_namespace: namespace,
    vm_name: vmName,
    action: action,
  };

  try {
    const response = await fetch(
      `${API_URL}/instances/${clusterId}/updatevm/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function terminateVM(clusterId, namespace, vmName) {
  try {
    const response = await fetch(
      `${API_URL}/instances/${clusterId}/vmterminate/${namespace}/${vmName}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error:", errorData);
      throw new Error(`Server responded with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
