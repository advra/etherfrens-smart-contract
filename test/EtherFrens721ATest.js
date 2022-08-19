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

    // mint
    it("Testowner can call mint()", async function () {
      expect(await token721.mint(account1.address, TEST_URI1)).to.not.be.reverted;
    });

    it("Test guest should not call mint()", async function () {
      await expect(token721
        .connect(account1)
        .mint(account1.address, TEST_URI1))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    // mintMulti
    it("Testowner can call mintMulti()", async function () {
      expect(await token721.mintMulti(account1.address, [TEST_URI1, TEST_URI2, TEST_URI3])).to.not.be.reverted;
    });

    it("Test guest should not call mintMulti()", async function () {
      await expect(token721
        .connect(account1)
        .mintMulti(account1.address, [TEST_URI1, TEST_URI2, TEST_URI3]))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    // setBaseURI
    it("Testowner can call setBaseURI()", async function () {
      expect(await token721.setBaseURI(TEST_URI2)).to.not.be.reverted;
    });

    it("Test guest should not call setBaseURI()", async function () {
      await expect(token721
        .connect(account1)
        .setBaseURI(TEST_URI1))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
    // setTokenURI
    it("Testowner can call setTokenURI()", async function () {
      // must mint so we have valid URI to try to set
      expect(await token721.mint(account1.address, TEST_URI1)).to.not.be.reverted;
      expect(await token721.setTokenURI(1, TEST_URI2)).to.not.be.reverted;
    });

    it("Test guest should not call setTokenURI()", async function () {
      // must mint so we have valid URI to try to set
      expect(await token721.mint(account1.address, TEST_URI1)).to.not.be.reverted;
      await expect(token721
        .connect(account1)
        .setTokenURI(1,TEST_URI2))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });

    // withdraw TODO

    // setDefaultRoyalty
      it("Testowner can call setDefaultRoyalty()", async function () {
        expect(await token721.setDefaultRoyalty(owner.address, SIX_PERCENT_BIPS)).to.not.be.reverted;
      });
  
      it("Test guest should not call setDefaultRoyalty()", async function () {
        await expect(token721
          .connect(account1)
          .setDefaultRoyalty(owner.address, SIX_PERCENT_BIPS))
          .to.be.revertedWith("Ownable: caller is not the owner");
      });

    // setTokenRoyalty
    it("Testowner can call setTokenRoyalty()", async function () {
      expect(await token721.mint(account1.address, TEST_URI1)).to.not.be.reverted;
      expect(await token721.setTokenRoyalty(owner.address, SIX_PERCENT_BIPS)).to.not.be.reverted;
    });

    it("Test guest should not call setTokenRoyalty()", async function () {
      expect(await token721.mint(account1.address, TEST_URI1)).to.not.be.reverted;
      await expect(token721
        .connect(account1)
        .setTokenRoyalty(owner.address, SIX_PERCENT_BIPS))
        .to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Minting Tests", function () {
    it("Test owner can mint", async function () {
      const address1=account1.address;
      await token721.mint(address1, TEST_URI1);
      expect(await token721.ownerOf(1)).to.equal(address1);    
      expect(await token721.tokenURI(1)).to.equal(TEST_URI1);
      expect(await token721.totalSupply()).to.equal(1); 
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
      expect(await token721.totalSupply()).to.equal(2);    
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
      expect(await token721.totalSupply()).to.equal(3); 
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
      expect(await token721.totalSupply()).to.equal(3); 
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
        expect(await token721.totalSupply()).to.equal(3); 

        // change to base2 then recheck
        token721.setBaseURI(TEST_BASE2);
        expect(await token721.ownerOf(1)).to.equal(address1);
        expect(await token721.tokenURI(1)).to.equal(TEST_BASE2 + TEST_URI1);   
        expect(await token721.ownerOf(2)).to.equal(address1);
        expect(await token721.tokenURI(2)).to.equal(TEST_BASE2 + TEST_URI2);  
        expect(await token721.ownerOf(3)).to.equal(address1);
        expect(await token721.tokenURI(3)).to.equal(TEST_BASE2 + TEST_URI3); 
        expect(await token721.totalSupply()).to.equal(3); 
      });
  });

  describe("Royalty tests", function () {
    it("Check royalty deployment value", async function () {
      const BASE_FEE_DENOMINATOR = 10000;
      const result = await token721.royaltyInfo(1, BASE_FEE_DENOMINATOR);
      expect(result[0]).to.equal(owner.address);
      expect(result[1]).to.equal(THREE_PERCENT_BIPS);
    });

    it("Test changing royalty for specific token", async function () {
      const BASE_FEE_DENOMINATOR = 10000;
      // change entire collection toi 1 percent 
      await token721.setDefaultRoyalty(owner.address, ONE_PERCENT_BIPS);
      const result1 = await token721.royaltyInfo(59, BASE_FEE_DENOMINATOR);
      expect(result1[0]).to.equal(owner.address);
      expect(result1[1]).to.equal(ONE_PERCENT_BIPS);
      const result2 = await token721.royaltyInfo(5, BASE_FEE_DENOMINATOR);
      expect(result2[0]).to.equal(owner.address);
      expect(result2[1]).to.equal(ONE_PERCENT_BIPS);

      // change token #5 to 6% where as all others remain the same
      await token721.setTokenRoyalty(5, owner.address, SIX_PERCENT_BIPS);
      const result3 = await token721.royaltyInfo(59, BASE_FEE_DENOMINATOR);
      expect(result3[0]).to.equal(owner.address);
      expect(result3[1]).to.equal(ONE_PERCENT_BIPS);
      const result4 = await token721.royaltyInfo(5, BASE_FEE_DENOMINATOR);
      expect(result4[0]).to.equal(owner.address);
      expect(result4[1]).to.equal(SIX_PERCENT_BIPS);
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