// import { MIDDLEWARE_URL } from "./apiAddress";
import { FetchRequest } from "./index";

export async function getCryptoPayment(wallet_address) {
  const MIDDLEWARE_URL = "http://54.196.149.187:8080";
  console.log("MIDDLEWARE_URL:", MIDDLEWARE_URL);
  return FetchRequest(
    `${MIDDLEWARE_URL}/contract/getCryptoPayment/`,
    "POST",
    {
      "Content-Type": "application/json",
    },
    {
      wallet_address: wallet_address,
    }
  );
}
