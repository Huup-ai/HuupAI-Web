### `npm install`

install all required dependancy.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### wallet private key

utils/WalletConfig.json is not contained in repo as it contains wallet private key, you need to add it before running. Follow the structure:
```
{
  "curve": "",
  "privateKey": "",
  "publicKey": "fill here",
  "compressedPublicKey": "",
  "_isSigningKey": 
}
```