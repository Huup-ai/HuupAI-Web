import API_URL from './apiAddress';


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
    `${API_URL}/users/register/`,
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
    await FetchRequest(`${API_URL}/users/logout/`, "POST");
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

  try {
      const response = await fetch(`${API_URL}/users/login/`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
      }),
        credentials: 'include'
    });

      return await response;
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
      const response = await fetch(`${API_URL}/provider/login/`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
        }),
          credentials: 'include'
      });
      return await response;
  } catch (error) {
        console.error('Error:', error);
        throw error;
  }
}
  //             //edited code for provider login with returning wallet address//
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  
  //     const data = await response.json();
  
  //     // Check if the user is a provider and if it's their first-time login
  //     if (data.walletAddress === null) {
  //       // Create a built-in wallet. This is just a placeholder, 
  //       // replace it with the actual function call to create a new wallet using Fun.xyz or a similar service
  //       const newWalletAddress = await createWallet(); 
  
  //       // Call ADD WALLET API to update the backend with the new wallet
  //       await addWallet(newWalletAddress, true, data.access);
  
  //       // Set cookies as required
  //       document.cookie = `WalletAddress=${newWalletAddress}; path=/`;
  //       document.cookie = "isProvider=true; path=/";
  
  //       // Here, you might want to also dispatch an action to set `externalWallet` to false in your Redux store. 
  //       // Assuming you have an action creator function called `setExternalWalletStatus`:
  //       // dispatch(setExternalWalletStatus(false));
  
  //       // Modify the response data to contain the new wallet address
  //       data.walletAddress = newWalletAddress;
  //     }
  
  //     return data;
  
  //   } catch (error) {
  //     console.error('Error:', error);
  //     throw error;
  //   }
  // }

export async function addWallet(walletAddress, is_provider, token) {

  // console.log(typeof token,token, typeof walletAddress, walletAddress, typeof is_provider)
  try {
    const response = await fetch(`${API_URL}/wallet/add/`, {
      method: 'POST',
      headers: {    
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: walletAddress,
        is_provider: is_provider,
      }),
    });

    // if (!response.ok) {
    //   throw new Error('Network response was not ok');
    // }

    const data = await response.json();  // This line was added to extract JSON data
    return data;  // Return the JSON data

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function getWallet(token) {
  try {
    const response = await fetch(`${API_URL}/wallets/get_wallets/`, {
      method: 'GET',
      headers: {    
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json',
      },
      
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();  // This line was added to extract JSON data
    return data;  // Return the JSON data

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }

}

export async function addPaymentAuth(payToken, JWTtoken) {

  // console.log(typeof token,token, typeof walletAddress, walletAddress, typeof is_provider)
  try {
    const response = await fetch(`${API_URL}/invoices/add_payment_auth/`, {
      method: 'POST',
      headers: {    
        'Authorization': `Bearer ${JWTtoken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        stripe_payment:payToken
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();  // This line was added to extract JSON data
    return data;  // Return the JSON data

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function checkPaymentAuth(token) {
  try {
    const response = await fetch(`${API_URL}/invoices/check_payment_auth/`, {
      method: 'GET',
      headers: {    
        'Authorization': `Bearer ${token}`,
      },
      
    });

    if (response.status === 200) {
      // Status is 200, return JSON data
      const data = await response.json();
      return true;
    } else {
      // Handle non-200 responses
      const errorData = await response.json();
      // throw new Error('Network response was not ok. Status: ' + response.status + ', Error: ' + JSON.stringify(errorData));
      return false
    }
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
    `${API_URL}/instances/${clusterId}/getvmstatus/${namespace}/${vmName}`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    requestBody
  );
}

export async function getUserInstances(email) {
  return FetchRequest(
    `${API_URL}/instances/${email}/get_instances/`,
    "GET",
    {
      "Content-Type": "application/json",
    }
  );
}

export async function getInvoiceByUser() {
  return FetchRequest(
    `${API_URL}/invoices/get_user_invoices/`,
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
