const app = require('./utils/setup');
const { address, availableNetworks, provider, signer } = require('./utils/evm');
const { ethers } = require('ethers');

app.get('/', (req, res) =>
  res.status(200).json({
    message: 'Hello World! My Ethereum wallet address is: ' + address(),
    availableNetworks: availableNetworks(),
  })
);

app.get('/test/checkbalance', async (req, res) => {
    try {
        const INFURA_ID = 'e461f10be30a4c31a421c721e8efeac1'
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`)

        const address = '0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e' // random address
        const sepoliaDonationAddress = '0xD8Ea779b8FFC1096CA422D40588C4c0641709890'
        const myaddress = '0x27d47dc74698B351db6B09196a73330c78D6A804'
        const balance = await provider.getBalance(myaddress)
        //console.log(`\nETH Balance of ${myaddress} --> ${ethers.utils.formatEther(balance)} ETH\n`)
        res.status(200).json({
            balance: ethers.utils.formatEther(balance)
        })
    } catch (e) {
        const error = e.toString();
        res.status(400).json({ error });
      }
});


const contractRouter = require('./routers/contractRouter');

app.use('/contract', contractRouter);

const balance = async (network) => {
  const result = await provider(network).getBalance(address());
  return ethers.utils.formatEther(result);
};

app
  .route('/balance/:network')
  .get(async (req, res) => {
    try {
      const { network } = req.params;
      const value = await balance(network);
      res.status(200).json({
        message: 'My balance is ' + value + ' ethers',
      });
    } catch (e) {
      const error = e.toString();
      res.status(400).json({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const { network } = req.params;
      const { to, amount } = req.body;
      const value = ethers.utils.parseEther(amount);
      const tx = await signer(network).sendTransaction({ to, value });
      await tx.wait();
      res.status(200).json('ok');
    } catch (e) {
      const error = e.toString();
      res.status(400).json({ error });
    }
  });