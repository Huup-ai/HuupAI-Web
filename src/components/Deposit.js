import { ethers } from "ethers";

const Deposit = {
  //   const ether = require("ether");
  depositUSDT: async (depositAmount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAbi = [
      {
        inputs: [
          { internalType: "address", name: "_currency", type: "address" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "DepositReceived",
        type: "event",
      },
      {
        inputs: [],
        name: "CRITICAL",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "WARNING",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "approveCurrency",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "provider", type: "address" },
          { internalType: "string", name: "user_id", type: "string" },
        ],
        name: "createProvider",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "renter", type: "address" },
          { internalType: "string", name: "user_id", type: "string" },
        ],
        name: "createRenter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "currencyContract",
        outputs: [
          { internalType: "contract ERC20", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
        name: "deposit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "getAllowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getBalance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "getCurrency",
        outputs: [
          { internalType: "contract ERC20", name: "", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getDeposit",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getEarning",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getFee",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getIsProvider",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "instance_id", type: "uint256" },
        ],
        name: "getStatus",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getUser",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "wallet", type: "address" }],
        name: "getWithdraw",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "myBookings",
        outputs: [
          { internalType: "uint256", name: "is_provider", type: "uint256" },
          { internalType: "uint256", name: "balance", type: "uint256" },
          { internalType: "uint256", name: "deposit", type: "uint256" },
          { internalType: "uint256", name: "withdraw", type: "uint256" },
          { internalType: "uint256", name: "earning", type: "uint256" },
          { internalType: "string", name: "user_id", type: "string" },
          { internalType: "uint256", name: "fee", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "rentalContracts",
        outputs: [
          { internalType: "address", name: "renter", type: "address" },
          { internalType: "uint256", name: "rate", type: "uint256" },
          { internalType: "uint256", name: "status", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "stopTime", type: "uint256" },
          { internalType: "address", name: "provider", type: "address" },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_bkWallet", type: "address" },
        ],
        name: "setBackendWallet",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_critical", type: "uint256" },
        ],
        name: "setCritical",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "_share", type: "uint256" }],
        name: "setShare",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "_warning", type: "uint256" },
        ],
        name: "setWarning",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "share",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          { internalType: "address", name: "_renter", type: "address" },
          { internalType: "uint256", name: "instance_id", type: "uint256" },
          { internalType: "address", name: "_provider", type: "address" },
          { internalType: "uint256", name: "_rate", type: "uint256" },
        ],
        name: "startRental",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          { internalType: "uint256", name: "instance_id", type: "uint256" },
        ],
        name: "stopRental",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "withdrawEarnings",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const usdtAbi = [
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "_minter", type: "address" }],
        name: "addMinter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [
          { internalType: "address", name: "owner", type: "address" },
          { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
        name: "burn",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "governance",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "spender", type: "address" },
          { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "account", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "minters",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [{ internalType: "address", name: "_minter", type: "address" }],
        name: "removeMinter",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "_governance", type: "address" },
        ],
        name: "setGovernance",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: false,
        inputs: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ];
    const usdtAddress = "0xFbac52229E7Ca8A90bE9403E62891185Cf3b2D47";
    const contractAddress = "0xFb4d709B6a9655eD3d2198457a5263849dA3D11E";

    const usdtContract = new ethers.Contract(usdtAddress, usdtAbi, signer);
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    // const tx = await usdtContract.approve(
    //   contractAddress,
    //     ethers.utils.parseUnits("1000", 6)
    // //   depositAmount
    // );

    // await tx.wait();

    // const depositTx = await contract.deposit(
    // //   depositAmount
    //     ethers.utils.parseUnits("1000", 6)
    // );
    // await depositTx.wait();

    const approveAmount = ethers.utils.parseUnits("1000", 6); // Set the amount you want to approve
    const approveTx = await usdtContract.approve(
      contractAddress,
      approveAmount
    );
    await approveTx.wait();

    // Deposit the approved USDT tokens
    const depositAmount_acc = ethers.utils.parseUnits(depositAmount, 6); // Set the deposit amount
    const depositTx = await contract.deposit(depositAmount_acc);
    await depositTx.wait();
    console.log("Deposit successful!");
  },
};

export default Deposit;

export function performDeposit(depositAmount) {
  return Deposit.depositUSDT(depositAmount)
    .then(() => console.log("Deposit done!"))
    .catch((err) => console.error(err));
}
