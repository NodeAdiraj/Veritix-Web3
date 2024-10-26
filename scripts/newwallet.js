const { ethers } = require("ethers");

function createCustodianWallet() {
  const wallet = ethers.Wallet.createRandom();
  const address = wallet.address;
  const privateKey = wallet.privateKey;

  return { address, privateKey };
}
