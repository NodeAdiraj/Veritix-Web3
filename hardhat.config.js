require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
require("solidity-coverage");
require("hardhat-deploy");

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Make sure this is defined in your .env file

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: [`0x${PRIVATE_KEY}`], // Add "0x" prefix for the private key
      chainId: 31337, // Ganache's default chainId
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      },
      {
        version: "0.8.8",
      },
    ],
  },
  etherscan: {
    apiKey: "GDCIDCVSW7TN3SW8RYSBB6B2NGZ861RCXE",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
};
