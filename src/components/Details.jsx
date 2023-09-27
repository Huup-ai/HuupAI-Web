import { React, useState, useEffect } from "react";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { faucetContract } from "../ethereum/faucet";
import { contractAddress, customerToken } from "../Address";
import { useCookies } from "react-cookie";

import { ethers } from "ethers";

const Details = () => {
  const { currentColor } = useStateContext();
  const [walletMoney, setWalletMoney] = useState(0);

  const [isCrypto, setIsCrypto] = useState(() => {
    const storedValue = localStorage.getItem("crypto");
    return storedValue ? JSON.parse(storedValue) : false;
  });


  const handleWalletChange = (e) => {
    setWalletMoney(e.target.value);
  };

  // const { ethers } = require("ethers");
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransactionData] = useState("");
  const [balance, setBalance] = useState("Please connect wallet");
  const [deposit, setDeposit] = useState("Please connect wallet");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
    getBalanceHandler();
    getDepositHandler();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);
        /* set active wallet address */
        setWalletAddress(accounts[0]);
        /* get signer */
        setSigner(provider.getSigner());
        /* local contract instance */
        setFcContract(faucetContract(provider));
        console.log("connected", accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          // console.log(accounts[0]);
        } else {
          // console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      console.log("wallet Address", walletAddress);
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // const getOCTHandler = async () => {
  //   setWithdrawError("");
  //   setWithdrawSuccess("");
  //   try {
  //     const fcContractWithSigner = fcContract.connect(signer);
  //     const resp = await fcContractWithSigner.requestTokens();
  //     console.log(resp)
  //     setWithdrawSuccess("Operation succeeded - enjoy your tokens!");
  //     setTransactionData(resp.hash);
  //   } catch (err) {
  //     setWithdrawError(err.message);
  //   }
  // };

  const getBalanceHandler = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      // test getBalance
      // console.log("contract", fcContract)
      const value = await fcContract.getBalance(walletAddress); // Call the 'getBalance' function

      setBalance(ethers.utils.formatEther(value));
      console.log("contract Address", contractAddress);
      // console.log("wallet address", walletAddress);
    }
  };

  const getDepositHandler = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      // test getBalance
      const value = await fcContract.getDeposit(contractAddress); // Call the 'getBalance' function

      setDeposit(ethers.utils.formatEther(value));
      console.log("contract Address", contractAddress);
      // console.log("wallet address", walletAddress);
    }
  };

  async function depositEther(etherAmount) {
    console.log("USDT", etherAmount);
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        // Convert the ether amount to wei
        const weiAmount = ethers.utils.parseEther(etherAmount);
        console.log("wei", weiAmount.toString());

        // Call the 'setDeposit' function and send ether
        const tx = await fcContract
          .connect(signer)
          .setDeposit({ value: weiAmount.toString() });

        await tx.wait(); // Wait for the transaction to be mined

        console.log("Transaction Hash:", tx.hash);
      } catch (error) {
        alert("please connect wallet");
        console.error("Error calling:", error);
      }
    }
  }

  const handleDeposit = () => {
    depositEther(walletMoney);
  };
  return (
    <div id="Billing Details">
      <div className=" mb-5 mt-10">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900">
          Billing Details
        </p>
        <p className="text-lg text-gray-400">
          Payment and billing information for this team account
        </p>
      </div>

      <div>
      {isCrypto ? (
        // Content to display when isToggled is true
        <div>
          <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            <h3>Payment Information</h3>
            <div>
              <span className="inline-block w-40">PAYMENT METHOD</span>
              <span>:</span>
              <span>Crypto</span>
            </div>
            <div>
              <span className="inline-block w-40">Total Deposit</span>
              <span>:</span>
              <span>{deposit} ETH USDT</span>
            </div>
            <div>
              <span className="inline-block w-40">Total Balance</span>
              <span>:</span>
              {/* {getBalanceHandler()} */}
              <span>{balance} ETH USDT</span>
            </div>
            <div>
              <span className="inline-block w-40">Wallet Address</span>
              <span>:</span>
              <span>{walletAddress}</span>
            </div>

            <div>
              <input
                type="text"
                className="border-solid border-2 rounded-md border-grey w-40"
                placeholder="Input Amount"
                value={walletMoney} // Set the input value from the state
                onChange={handleWalletChange} // Attach the event handler
              />

              <span>USDT</span>
            </div>
            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Deposit"
                onClickCallback={handleDeposit}
                borderRadius="10px"
              />
            </div>

            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Connect Wallet"
                onClickCallback={connectWallet}
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
          
        </div>
      ) : (
        // Content to display when isToggled is false
        <div>
           <div className="border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            <h3>Payment Information</h3>
            <div>
              <span className="inline-block w-40">PAYMENT METHOD</span>
              <span>:</span>
              <span>VISA</span>
            </div>
            <div>
              <span className="inline-block w-40">EXP DATE.</span>
              <span>:</span>
              <span>date</span>
            </div>
            <div>
              <span className="inline-block w-40">CARD NUMBER</span>
              <span>:</span>
              <span>XXXX-XXXX-XXXX-1234</span>
            </div>
            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Add Payment Method"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
        </div>
      )}

        <div className="mt-5 border-2 rounded-lg w-full shadow-lg">
          <div className="px-4">
            <h3>Billing Information</h3>
            <div>
              <span className="inline-block w-40">NAME</span>
              <span>:</span>
              <span>YU WANG</span>
            </div>
            <div>
              <span className="inline-block w-40">EMAIL</span>
              <span>:</span>
              <span>USER_NAME</span>
            </div>
            <div>
              <span className="inline-block w-40">ADDRESS</span>
              <span>:</span>
              <span>XXXX</span>
            </div>
            <div className="mt-2 mb-2">
              <Button
                color="white"
                bgColor={currentColor}
                text="Edit Billing Information"
                borderRadius="10px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
