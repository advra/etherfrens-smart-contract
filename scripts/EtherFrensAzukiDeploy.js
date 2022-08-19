const hardhat = require("hardhat");

async function main() {

  const EtherFrensToken = await hardhat.ethers.getContractFactory("EtherFrensNFT");
  console.log('Deploying EtherFrensNFT ERC721 token...');
  const token = await EtherFrensToken.deploy();

  await token.deployed();
  console.log("EtherFrens Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });