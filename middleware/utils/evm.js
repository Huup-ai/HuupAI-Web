const walletPrivateKey = () => {
  return process.env.MIDDLEWARE_PRIVATEKEY;
}

module.exports = { walletPrivateKey };