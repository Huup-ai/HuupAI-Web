const { walletPrivateKey } = require('../utils/evm')
const { ethers } = require('ethers')

// Replace these with your contract address and ABI
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = [{"inputs":[{"internalType":"address","name":"_currency","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"DepositReceived","type":"event"},{"inputs":[],"name":"CRITICAL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WARNING","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approveCurrency","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"provider","type":"address"},{"internalType":"string","name":"user_id","type":"string"}],"name":"createProvider","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"renter","type":"address"},{"internalType":"string","name":"user_id","type":"string"}],"name":"createRenter","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"currencyContract","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getAllowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCurrency","outputs":[{"internalType":"contract ERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getDeposit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getEarning","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getFee","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getIsProvider","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"instance_id","type":"uint256"}],"name":"getStatus","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getUser","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"wallet","type":"address"}],"name":"getWithdraw","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"myBookings","outputs":[{"internalType":"uint256","name":"is_provider","type":"uint256"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"deposit","type":"uint256"},{"internalType":"uint256","name":"withdraw","type":"uint256"},{"internalType":"uint256","name":"earning","type":"uint256"},{"internalType":"string","name":"user_id","type":"string"},{"internalType":"uint256","name":"fee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"rentalContracts","outputs":[{"internalType":"address","name":"renter","type":"address"},{"internalType":"uint256","name":"rate","type":"uint256"},{"internalType":"uint256","name":"status","type":"uint256"},{"internalType":"uint256","name":"startTime","type":"uint256"},{"internalType":"uint256","name":"stopTime","type":"uint256"},{"internalType":"address","name":"provider","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_bkWallet","type":"address"}],"name":"setBackendWallet","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_critical","type":"uint256"}],"name":"setCritical","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_share","type":"uint256"}],"name":"setShare","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_warning","type":"uint256"}],"name":"setWarning","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"share","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_renter","type":"address"},{"internalType":"uint256","name":"instance_id","type":"uint256"},{"internalType":"address","name":"_provider","type":"address"},{"internalType":"uint256","name":"_rate","type":"uint256"}],"name":"startRental","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"instance_id","type":"uint256"}],"name":"stopRental","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdrawEarnings","outputs":[],"stateMutability":"nonpayable","type":"function"}]

// Initialize Ethereum provider and contract
const INFURA_ID = 'e461f10be30a4c31a421c721e8efeac1'
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)
const contract = new ethers.Contract(contractAddress, contractABI, provider);

const createProvider = async (req, res, next) => {
    try {
        console.log('createProvider')
        // Check if the request body contains the necessary data
        const {provider_address, user_id} = req.body;
        if (!provider_address || !user_id ) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider (you should manage your private keys securely)
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet)

        const tx = await contractwithwallet.createProvider(provider_address, user_id)

        // Wait for the transaction to be mined (this is a simplified example)
        await tx.wait();
        console.log(tx)
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const createRenter = async (req, res, next) => {
    try {
        console.log('createRenter')
        // Check if the request body contains the necessary data
        const {renter_address, user_id} = req.body;
        if (!provider_address || !user_id ) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider (you should manage your private keys securely)
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet)

        const tx = await contractwithwallet.createRenter(renter_address, user_id)

        // Wait for the transaction to be mined (this is a simplified example)
        await tx.wait();
        console.log(tx)
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const startRental = async (req, res, next) => {
    try {
        console.log('startRental')
        // Check if the request body contains the necessary data
        const {renter_address, instance_id, provider_address, rate} = req.body;
        if (!renter_address || !instance_id || !provider_address || !rate) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider (you should manage your private keys securely)
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet)

        const tx = await contractwithwallet.startRental(renter_address, instance_id, provider_address, rate)

        // Wait for the transaction to be mined (this is a simplified example)
        await tx.wait();
        console.log(tx)
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const stopRental = async (req, res, next) => {
    try {
        console.log('stopRental')
        // Check if the request body contains the necessary data
        const {instance_id} = req.body;
        if (!instance_id) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider (you should manage your private keys securely)
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet)

        const tx = await contractwithwallet.stopRental(instance_id)

        // Wait for the transaction to be mined (this is a simplified example)
        await tx.wait();
        console.log(tx)
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};
module.exports = { createProvider, createRenter, startRental, stopRental }