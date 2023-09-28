const { walletPrivateKey } = require('../utils/evm')
const { ethers } = require('ethers')
const { getProvider, getContract } = require('../utils/evm')

// Replace these with your contract address and ABI
const contractAddress = process.env.CONTRACT_ADDRESS;

// Initialize Ethereum provider and contract
const provider = getProvider()
const contract = getContract()

const createProvider = async (req, res) => {
    try {
        // Check if the request body contains the necessary data
        const {provider_address, user_id} = req.body;
        if (!provider_address || !user_id ) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet);

        const tx = await contractwithwallet.createProvider(provider_address, user_id)

        // Wait for the transaction to be mined
        await tx.wait();
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const createRenter = async (req, res) => {
    try {
        // Check if the request body contains the necessary data
        const {renter_address, user_id} = req.body;
        if (!renter_address || !user_id ) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet);

        const tx = await contractwithwallet.createRenter(renter_address, user_id)

        // Wait for the transaction to be mined
        await tx.wait();
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const startRental = async (req, res) => {
    try {
        // Check if the request body contains the necessary data
        const {renter_address, instance_id, provider_address, rate} = req.body;
        if (!renter_address || !instance_id || !provider_address || !rate) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const rateFloat = rate * Math.pow(10, 18)
        // Create a wallet and connect it to the provider
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet);

        const tx = await contractwithwallet.startRental(renter_address, instance_id, provider_address, rateFloat)

        // Wait for the transaction to be mined
        await tx.wait();
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const stopRental = async (req, res) => {
    try {
        // Check if the request body contains the necessary data
        const {instance_id} = req.body;
        if (!instance_id) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // Create a wallet and connect it to the provider
        const wallet = new ethers.Wallet(walletPrivateKey(), provider);
        const contractwithwallet = contract.connect(wallet);

        const tx = await contractwithwallet.stopRental(instance_id);

        // Wait for the transaction to be mined
        await tx.wait();
        // Return a response
        res.json({ success: true, transactionHash: tx.hash });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};

const getRemainingCredit = async (req, res) => {
    try {
        const {wallet_address} = req.body;
        if (!wallet_address) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const balance = await contract.getBalance(wallet_address)
        const deposit = await contract.getDeposit(wallet_address)
        res.json({ success: true, balance: deposit - balance });
    } catch (error) {
        console.error('Smart contract write error:', error);
        res.status(500).json({ error: 'Smart contract interaction failed' });
    }
};
module.exports = { createProvider, createRenter, startRental, stopRental, getRemainingCredit }