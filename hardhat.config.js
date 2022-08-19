// require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString();
const projectId = "26gjZfz5yjOLi5qyALXITtFDsngVQUw9";

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
    polygonmumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      accounts: [privateKey],
      gas: 2100000,
      gasPrice: 8000000000
    },
    polygonmainnet: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${projectId}`,
      accounts: [privateKey]
    }

  },
  solidity: "0.8.9",    //tutorial uses: "0.8.4",
};