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
  firstName,
  additionalData = {},
  navigate
) {
  const requestBody = {
    email: email,
    password: password,
    firstName: firstName,
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

  if (response.status === 200) {
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

// const handleLoginClick = async (e) => {


//   e.preventDefault();
//   try {
//     let response;

//     if (selectedType === "provider") {
//       response = await loginProvider(email, password);
//     } else {
//       response = await fetch("http://localhost:8000/users/login/", {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//       }),
//         credentials: 'include'
//     });
//     }

//     //JWT
//     //const token = response.data.token;
//     //localStorage.setItem('jwtToken', token); // storing token in localStorage

//     console.log("outside");
//     console.log("Received response: ", response);

//      // Check if the response is as expected. This is a placeholder.
//     // You need to replace this with an acter logged in succeual check based on your API's response.
//     if (response && response.status === 200) {
//       const data = await response.json();
//       const token = data.access; // Assuming the token is directly on the response object
//       console.log(token);
//       localStorage.setItem('jwtToken', token); // storing token in localStorage
//       console.log("Login successful", response);
//       setEmail("");
//       setPassword("");
//       dispatch(loginSuccess());
//       navigate("/clouds");
//     } else {
//         // Handle login failure, perhaps pop up an error message
//         console.error("Login failed: ", response.message);
//         alert("Login failed. Please check your credentials.");
//     }
    
//     } catch (error) {
//       console.error("Login error", error);
//       alert("Login failed. Please check your credentials."); 
//     }
//   };


export async function loginUser(email, password) {
  const requestBody = {
      email: email,
      password: password,
  };

  try {
      const response = await fetch("http://localhost:8000/users/login/", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
          credentials: 'include'
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
}

export async function loginProvider(email, password) {
  const requestBody = {
      email: email,
      password: password,
  };

  try {
      const response = await fetch("http://localhost:8000/provider/login/", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      return await response.json();
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
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
