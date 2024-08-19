require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/x3YTFWdDXO8xp6fkR2auIaJQsVTzeZv6",
            accounts: ["0x" + PRIVATE_KEY],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 11155111,
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
}
