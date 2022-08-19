# EtherFrens NFT Smart Cotnract

Smart contract for Ether Frens. Initially derived a custom contract then build off with Azuki's interface. Note: Commented out tests work but must address the gas estimation errors otherwise they will mark as fail.

_May consider migrating to Azuki's new upgradable smart contract._

## Quick Start
To compile, run and localhost test:
```console
// update packages
yarn
// bootup hardhat localhost for tests
npx hardhat node

// Open new terminal, compile then run tests locally
npx hardhat run --network localhost scripts/EtherFriendsAzukiDeploy.js
// once running the execute tests
npx hardhat test --network localhost --parallel test/EtherFrens721ATest.js
```


