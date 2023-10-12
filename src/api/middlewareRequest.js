import { MIDDLEWARE_URL } from './apiAddress';
import { FetchRequest } from './index';

export async function getCryptoPayment(wallet_address) {
    console.log(MIDDLEWARE_URL)
    return FetchRequest(
        `${MIDDLEWARE_URL}/contract/getCryptoPayment/`,
        "POST",
        {
          'Content-Type': 'application/json'
        },
        {
            "wallet_address": wallet_address
        }
    );
}