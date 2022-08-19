# EtherFrens NFT Smart Cotnract

Smart contract for Ether Frens. Initially derived a custom contract then build off with Azuki's interface. Note: Commented out tests work but must address the gas estimation errors otherwise they will mark as fail.

Note: May consider using the Azuki's new upgradable smart contract.

## Quick Start

To compile, run and test run the following:
Localnode testing
```bash
// update packages
yarn
// initialize hardhat localhost to run the tests
npx hardhat node

// In new new terminal, compile then run tests
npx hardhat run --network localhost scripts/EtherFriendsAzukiDeploy.js
// once running the execute tests
npx hardhat test --network localhost test/EtherFrens721ATest.js
```

##### Template from Scratch:
```
npx create-next-app@latest opensea-clone
cd opensea-clone
yarn add ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers web3modal @openzeppelin/contracts ipfs-http-client axios
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
npx tailwindcss init -p

#### setup hardhad
npx hardhat
```

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
GAS_REPORT=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```


