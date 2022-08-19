// test/BadgeToken-test.js
const { expect } = require("chai");

describe("EtherFrens Contract", function () {
  let EtherFrens721Contract;
  let token721;
  let _contractName='EtherFrens';
  let _contractSymbol='EF';
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

    token721 = await EtherFrens721Contract.deploy();
    // provider = ethers.getDefaultProvider();
  });

  describe("Deployment Tests", function () {

    it("Should has the correct name and symbol ", async function () {
      expect(await token721.name()).to.equal(_contractName);
      expect(await token721.symbol()).to.equal(_contractSymbol);
      expect(await token721.totalSupply()).to.equal(0);    
    });

    it("Should set the right owner", async function () {
      expect(await token721.owner()).to.equal(owner.address);
    });
  });

  describe("Ownership Tests", function () {
    // onlyOwner methods
    // it("Owner can call setbaseUri()", async function () {
    //   expect(await token721.setBaseURI({from: owner})).to.not.be.reverted;
    //   expect(await token721.setBaseURI({from: account1})).reverted;
    // });

    // it("Owner can call mint()", async function () {
    //   expect(await token721.mint({from: owner})).to.not.be.reverted;
    //   expect(await token721.mint({from: account1})).reverted;
    // });

    // it("Owner can call _setTokenURI()", async function () {
    //   expect(await token721._setTokenURI({from: owner})).to.not.be.reverted;
    //   expect(await token721._setTokenURI({from: account1})).reverted;
    // });

    
    // it("Owner can call withdrawFunds()", async function () {
    //   expect(await token721.withdrawFunds({from: owner})).to.not.be.reverted;
    //   expect(await token721.withdrawFunds({from: account1})).reverted;
    // });
  });

  describe("Minting Tests", function () {
    it("Test owner can mint", async function () {
      const address1=account1.address;
      await token721.mint(address1, TEST_URI1);
      expect(await token721.ownerOf(1)).to.equal(address1);    
    });

    // TODO: Passes but has gas estimation error issue
    // it("Test Non-owner should not mint", async function () {
    //   const address1=account1.address;
    //   expect(await token721.connect(address1).mint(address1, TEST_URI1)).to.be.reverted();
    //     // .is.revertedWith("Ownable: caller is not the owner");
    // });

    it("Test single mints 1,2 from owner to address1 results in 2 total", async function () {
      const address1=account1.address;
      await token721.mint(address1, TEST_URI1);
      expect(await token721.ownerOf(1)).to.equal(address1);
      expect(await token721.tokenURI(1)).to.equal(TEST_URI1);

      await token721.mint(address1, TEST_URI2);
      expect(await token721.ownerOf(2)).to.equal(address1);
      expect(await token721.tokenURI(2)).to.equal(TEST_URI2);
      expect(await token721.balanceOf(address1)).to.equal(2);      
    });

    it("Test multiMint 1-5 from owner to address1 results in 5 total", async function () {
      const address1 = account1.address;
      const newURIs = [ TEST_URI1, TEST_URI2, TEST_URI3 ];
      await token721.mintMulti(address1, newURIs);

      // check all uris
      expect(await token721.ownerOf(1)).to.equal(address1);
      expect(await token721.tokenURI(1)).to.equal(TEST_URI1);
      expect(await token721.ownerOf(2)).to.equal(address1);
      expect(await token721.tokenURI(2)).to.equal(TEST_URI2);
      expect(await token721.ownerOf(3)).to.equal(address1);
      expect(await token721.tokenURI(3)).to.equal(TEST_URI3);
      expect(await token721.balanceOf(address1)).to.equal(3);      
      expect(await token721.totalSupply()).to.equal(3);  
    });
  });

  describe("URI Tests", function () {
    it("Test updating tokenURI of nonexistent token fails", async function () {
        // no minting
        await expect(token721.setTokenURI(10, TEST_URI_NONTEXISTENT))
          .to.be.revertedWith("Cant set URI of nonexistent token");
      });

    it("Test updating tokenURI of existing token passes", async function () {
      const address1=account1.address;

      // mint 3 then change 3
      await token721.mint(address1, TEST_URI1);
      await token721.mint(address1, TEST_URI2);
      await token721.mint(address1, TEST_URI3);
      await expect(token721.setTokenURI(3, TEST_URI3))
        .to.not.be.reverted;
      
      // first check will have no base
      expect(await token721.tokenURI(3)).to.equal(TEST_URI3);  
      // set new URI then check with base    
      await token721.setBaseURI(TEST_BASE1);
      expect(await token721.tokenURI(3)).to.equal(TEST_BASE1 + TEST_URI3); 
    });

    
    it("Test updating base URI of existing token #3 passes", async function () {
      const address1=account1.address;
      
      // mint 3 then change 3
      await token721.mint(address1, TEST_URI1);
      await token721.mint(address1, TEST_URI2);
      await token721.mint(address1, TEST_URI3);
      await expect(token721.setTokenURI(3, TEST_URI3))
        .to.not.be.reverted;
      
      // first check will have no base
      expect(await token721.tokenURI(3)).to.equal(TEST_URI3);  
    });

    
    it("Test updating base URI of existing token passes", async function () {
      const address1=account1.address;
      
      // mint 3 then change 3
      await token721.mint(address1, TEST_URI1);
      await token721.mint(address1, TEST_URI2);
      await token721.mint(address1, TEST_URI3);
      await expect(token721.setTokenURI(3, TEST_URI3))
        .to.not.be.reverted;
      
      // first check will have no base
      expect(await token721.tokenURI(3)).to.equal(TEST_URI3);  
      // set new URI then check with base    
      await token721.setBaseURI(TEST_BASE1);
      expect(await token721.tokenURI(3)).to.equal(TEST_BASE1 + TEST_URI3); 
    });

    it("Test setbaseURI then mint the URI is baseuri+Uri", async function () {
        // update baseuri        
        const address1=account1.address;
        token721.setBaseURI(TEST_BASE1);
        await token721.mint(address1, TEST_URI1);
        expect(await token721.ownerOf(1)).to.equal(address1);
        expect(await token721.tokenURI(1)).to.equal(TEST_BASE1 + TEST_URI1);   
      });

    it("Test updating baseURI updates existing minted tokens", async function () {
        // update baseuri
        const address1=account1.address;
        token721.setBaseURI(TEST_BASE1);
        await token721.mint(address1, TEST_URI1);
        await token721.mint(address1, TEST_URI2);
        await token721.mint(address1, TEST_URI3);
        expect(await token721.ownerOf(1)).to.equal(address1);
        expect(await token721.tokenURI(1)).to.equal(TEST_BASE1 + TEST_URI1);   
        expect(await token721.ownerOf(2)).to.equal(address1);
        expect(await token721.tokenURI(2)).to.equal(TEST_BASE1 + TEST_URI2);  
        expect(await token721.ownerOf(3)).to.equal(address1);
        expect(await token721.tokenURI(3)).to.equal(TEST_BASE1 + TEST_URI3); 
        
        // change to base2 then recheck
        token721.setBaseURI(TEST_BASE2);
        expect(await token721.ownerOf(1)).to.equal(address1);
        expect(await token721.tokenURI(1)).to.equal(TEST_BASE2 + TEST_URI1);   
        expect(await token721.ownerOf(2)).to.equal(address1);
        expect(await token721.tokenURI(2)).to.equal(TEST_BASE2 + TEST_URI2);  
        expect(await token721.ownerOf(3)).to.equal(address1);
        expect(await token721.tokenURI(3)).to.equal(TEST_BASE2 + TEST_URI3); 
      });
  });

  // describe("Withdrawal", function () {
  //   //TODO
  //   it("Test Owner can withdraw passes", async function () {
  //     console.log('owner balance: ', await provider.getBalance(owner.address))
  //     console.log('contract balance: ', await provider.getBalance(token721.address))
  //     tx = await token721.connect(owner).withdraw()
  //     let xtx = await tx.wait()
  //     console.log(xtx.events[0].args)
  //     console.log(await provider.getBalance(owner.address))
  //     console.log("balance post withdraw: %s", provider.getBalance(token721.address));
  //   });
  // });
});