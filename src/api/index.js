const FetchRequest = async (url, method, header = {}, data = {}) => {
  const response = await fetch(url, {
    method: method,
    headers: header,
    body: JSON.stringify(data),
  });
  return response.json();
};

export async function registerUser(
  email,
  password,
  additionalData = {},
  navigate
) {
  const requestBody = {
    email: email,
    password: password,
    ...additionalData,
  };

  const response = await FetchRequest(
    "http://localhost:8000/users/register/",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );

  if (response.status === "success") {
    navigate("/login");
  }

  return response;
}

export async function logoutUser() {
  try {
    console.log("Attempting logout...");
    await FetchRequest("http://localhost:8000/users/logout/", "POST");
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed", error);
  }
}

export async function loginUser(email, password) {
  const requestBody = {
    email: email,
    password: password,
  };

  return FetchRequest(
    "http://localhost:8000/users/login/",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

export async function loginProvider(email, password) {
  const requestBody = {
    email: email,
    password: password,
  };

  return FetchRequest(
    "http://localhost:8000/provider/login/",
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}
export async function getVmStatus(clusterId, namespace, vmName) {
  const requestBody = {
    clusterid: clusterId,
    namespace: namespace,
    vmName: vmName,
  };

  return FetchRequest(
    `http://localhost:8000/instances/${clusterId}/getvmstatus/${namespace}/${vmName}`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

export async function getUserInstances(email) {
  return FetchRequest(
    `http://localhost:8000/instances/${email}/get_instances/`,
    "GET",
    {
      "Content-Type": "application/json",
    }
  );
}

export async function getInvoiceByUser() {
  return FetchRequest(
    "http://localhost:8000/invoices/get_user_invoices/",
    "GET",
    {
      "Content-Type": "application/json",
    }
  );
}

export async function generateInvoice() {
  try {
    const userInstances = await getUserInstances();
    const userInvoice = await getInvoiceByUser();

    const invoice = {
      date: new Date().toLocaleDateString(),
      instances: userInstances,
      price: userInvoice.price,
      usage: userInvoice.usage,
      tax: userInvoice.tax,
      total_price: userInvoice.total_price,
      status: userInvoice.paid ? "Paid" : "Unpaid",
    };

    return invoice;
  } catch (error) {
    console.error("Failed to generate invoice:", error);
    throw error;
  }
}
