# EtherFrens NFT Smart Cotnract

Smart contract for Ether Frens. Initially derived a custom contract then build off with Azuki's interface. Note: Commented out tests work but must address the gas estimation errors otherwise they will mark as fail.

_May consider migrating to Azuki's new upgradable smart contract._

## Quick Start
Goreli EtherScan for [EtherFrensContract](https://goerli.etherscan.io/address/0xbeb9ab39d45672af96b634232141dfdf131cde84#code)

### Setup the .env file
Copy the .env.SAMPLE sample file and edit it to include your Alchemy, Ethscan and private keys
```console
cd to/project/root
cp .env.SAMPLE .env
```

### Local Compile and Testing
Update packages
```bash
$ yarn
```
Bootup hardhat localhost for tests
```
$ npx hardhat node
```
Then open a new terminal. Compile then run tests locally:
```
$ npx hardhat compile
$ npx hardhat run --network localhost scripts/deployERC721.js
$ npx hardhat test --network localhost --parallel test/EtherFrens721ATest.js
```


### Deployment
```console
// deploy to network (ill use goreli test defined in our config)
$ npx hardhat run scripts/deployERC721.js --network ethgoreli
    Deploying EtherFrensNFT ERC721 token...
    EtherFrens Token deployed to: 0xBeB9aB39d45672aF96B634232141DFDf131cdE84
```
Once deployed (in this case goreli test defined in our config) we need to verify using etherscan api so we can view it on ether scan. 
We will run hardhat verify using 10% Bips as input
```console
$ npx hardhat verify --network ethgoreli 0xBeB9aB39d45672aF96B634232141DFDf131cdE84 "1000" 
   Successfully submitted source code for contract
   contracts/EtherFrensNFT.sol:EtherFrensNFT at 0xBeB9aB39d45672aF96B634232141DFDf131cdE84
   for verification on the block explorer. Waiting for verification result...

   We tried verifying your contract EtherFrensNFT without including any unrelated one, but it failed.
   Trying again with the full solc input used to compile and deploy it.
   This means that unrelated contracts may be displayed on Etherscan...

   Successfully submitted source code for contract
   contracts/EtherFrensNFT.sol:EtherFrensNFT at 0xBeB9aB39d45672aF96B634232141DFDf131cdE84
   for verification on the block explorer. Waiting for verification result...
```
In this case there was a slight error but etherscan identified the contract fine. Goreli EtherScan for [EtherFrensContract](https://goerli.etherscan.io/address/0xbeb9ab39d45672af96b634232141dfdf131cde84#code)
