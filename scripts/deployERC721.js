const hardhat = require("hardhat");

async function main() {

  const TestContractA = await hardhat.ethers.getContractFactory("EtherFrensNFT");
  console.log('Deploying TestContractA ERC721 token...');
  let TEN_PERCENT_BIPS = 1000;

  const token = await TestContractA.deploy(TEN_PERCENT_BIPS);

  await token.deployed();
  console.log("TestContractA Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });