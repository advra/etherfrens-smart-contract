// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const fs = require("fs");
const privateKey = process.env.WALLET_PRIVATE_KEY;
const POL = process.env.PROJECT_ID;
const ALCHEMY_ID_ETH_MAINNET = process.env.ALCHEMY_ID_ETH_MAINNET;
const ALCHEMY_ID_ETH_GORELI = process.env.ALCHEMY_ID_ETH_GORELI;
const ALCHEMY_ID_ETH_RINKEBY = process.env.ALCHEMY_ID_ETH_RINKEBY;
const ALCHEMY_POLYGON_MAINNET = process.env.ALCHEMY_POLYGON_MAINNET;
const ALCHEMY_POLYGON_MUMBAI = process.env.ALCHEMY_POLYGON_MUMBAI;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    ethmainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID_ETH_MAINNET}`,
      accounts: [privateKey]
    },
    ethgoreli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_ID_ETH_GORELI}`,
      accounts: [privateKey]
    },
    ethrinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_ID_ETH_RINKEBY}`,
      accounts: [privateKey]
    },
    polygonmainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_POLYGON_MAINNET}`,
      accounts: [privateKey]
    },
    polygonmumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_POLYGON_MUMBAI}`,
      accounts: [privateKey]
    },
  },
  etherscan : {
    apiKey: ETHERSCAN_API_KEY
  },
  solidity: "0.8.9",
};