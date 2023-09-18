const router = require("express").Router();
const { ethers } = require('ethers');
const { ABI, contractAddress } = require('../utils/contractConfig');
const { privateKey } = require('../utils/WalletConfig.json').privateKey
const { walletKey } = require('../utils/evm')
// create provider
// function createProvider(address provider, string memory user_id)
router.post('/createprovider', async (req, res) => {
    try {
        let {provider_address, user_id} = req.body;
        //run validation
        if (!provider_address || !user_id)
            return res.status(400).json({ msg: "Missing one or more parameters of provider_address, user_id." });
        
        // call createProvider(address provider, string memory user_id) on contract
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${provider_address}`)
        const wallet = new ethers.Wallet(walletKey(), provider)

        const contract = new ethers.Contract(contractAddress, ABI, provider)
        const contractWithWalet = contract.connect(wallet)

        const tx = await contractWithWalet.createProvider(provider_address, user_id);
        console.log(tx)
    } catch (e) {
        const error = e.toString();
        res.status(400).json({ error });
    }
    
})
// create renter
// function createRenter(address renter, string memory user_id)
router.post('/createrenter', async (req, res) => {
    try {
        let {renter_address, user_id} = req.body;
        //run validation
        if (!renter_address || !user_id)
            return res.status(400).json({ msg: "Missing one or more parameters of renter_address, user_id." });
        
        // call createRenter(address renter, string memory user_id) on contract
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${provider_address}`)
        const wallet = new ethers.Wallet(walletKey(), provider)

        const contract = new ethers.Contract(contractAddress, ABI, provider)
        const contractWithWalet = contract.connect(wallet)

        const tx = await contractWithWalet.createRenter(renter_address, user_id);

    } catch (e) {
        const error = e.toString();
        res.status(400).json({ error });
    }
    
})
// start rental
// function startRental(address renter, uint256 instance_id, address _provider, uint256 _rate)
router.post('/startrental', async (req, res) => {
    try {
        let {renter_address, instance_id, provider_address, rate} = req.body;
        //run validation
        if (!renter_address || !instance_id || !provider_address || !rate)
            return res.status(400).json({ msg: "Missing one or more parameters of renter_address, instance_id, provider_address, rate." });
        
        // call startRental(address renter, uint256 instance_id, address _provider, uint256 _rate) on contract
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${provider_address}`)
        const wallet = new ethers.Wallet(walletKey(), provider)

        const contract = new ethers.Contract(contractAddress, ABI, provider)
        const contractWithWalet = contract.connect(wallet)

        const tx = await contractWithWalet.startRental(renter_address, instance_id, provider_address, rate);
        

    } catch (e) {
        const error = e.toString();
        res.status(400).json({ error });
    }
    
})

// stop rental
// function stopRental(uint256 instance_id)
router.post('/stoprental', async (req, res) => {
    try {
        let {instance_id} = req.body;
        //run validation
        if (!instance_id)
            return res.status(400).json({ msg: "Missing instance_id" });
        
        // call stopRental(address renter, uint256 instance_id, address _provider, uint256 _rate) on contract
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${provider_address}`)
        const wallet = new ethers.Wallet(walletKey(), provider)

        const contract = new ethers.Contract(contractAddress, ABI, provider)
        const contractWithWalet = contract.connect(wallet)

        const tx = await contractWithWalet.stopRental(instance_id);
        

    } catch (e) {
        const error = e.toString();
        res.status(400).json({ error });
    }
    
})

module.exports = router;