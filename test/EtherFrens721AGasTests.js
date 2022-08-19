// test/BadgeToken-test.js
const { expect, assert } = require("chai");

describe("EtherFrens Contract", function () {
  let EtherFrens721Contract;
  let token721;
  let _contractName='EtherFrens';
  let _contractSymbol='EF';
  let THREE_PERCENT_BIPS = 300;
  let ONE_PERCENT_BIPS = 100;
  let SIX_PERCENT_BIPS = 600;
  let account1,otheraccounts;
  let provider; //networkprovider

  let TEST_BASE1 = "ipfs://pinatasamplebasedomain/";
  let TEST_BASE2 = "ipfs://randombasedomain/";
  let TEST_URI1 = "tokenurifor1";
  let TEST_URI2 = "tokenurifor2";
  let TEST_URI3 = "tokenurifor3";
  let TEST_URI_NONTEXISTENT = "tokenurifor10";


  beforeEach(async function () {
    EtherFrens721Contract = await ethers.getContractFactory("EtherFrensNFT");
   [owner, account1, ...otheraccounts] = await ethers.getSigners();

    token721 = await EtherFrens721Contract.deploy(THREE_PERCENT_BIPS);
  });

  describe("Minting Tests", function () {
    // TODO
  });
});