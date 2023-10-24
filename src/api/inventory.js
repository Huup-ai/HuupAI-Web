import API_URL from "./apiAddress";

export async function getSSHKey(clusterId) {
  try {
    const response = await fetch(
      `${API_URL}/inventory/getsshkey/${clusterId}/`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
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
    console.log(response);
    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
