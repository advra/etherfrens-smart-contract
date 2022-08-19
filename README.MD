# EtherFrens NFT Smart Cotnract

Smart contract for Ether Frens. Initially derived a custom contract then build off with Azuki's interface. Note: Commented out tests work but must address the gas estimation errors otherwise they will mark as fail.

_May consider migrating to Azuki's new upgradable smart contract._

## Quick Start

### Setup the .env file
Copy the .env.SAMPLE sample file and edit it to include your Alchemy, Ethscan and private keys
```console
cd to/project/root
cp .env.SAMPLE .env
```

### Local Compile and Testing
```console
// update packages
yarn
// bootup hardhat localhost for tests
npx hardhat node

// Open new terminal, compile then run tests locally
npx hardhat run --network localhost scripts/deployERC721.js
// once running the execute tests
npx hardhat test --network localhost --parallel test/EtherFrens721ATest.js
```


### Deployment
```console
// deploy to network (ill use goreli test defined in our config)
npx hardhat run scripts/deployERC721.js --network ethgoreli
    Deploying EtherFrensNFT ERC721 token...
    EtherFrens Token deployed to: 0xBeB9aB39d45672aF96B634232141DFDf131cdE84
```
Note: Once deployed (in this case goreli test defined in our config) need to verify using etherscan api so we can view it on ether scan
```console
//  with 10% Bips as input
npx hardhat verify --network ethgoreli 0xBeB9aB39d45672aF96B634232141DFDf131cdE84 "1000" 
```
