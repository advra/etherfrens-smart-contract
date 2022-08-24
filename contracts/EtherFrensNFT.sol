// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "erc721a/contracts/ERC721A.sol";

contract EtherFrensNFT is ERC721A, Ownable, ERC2981 {
    using Strings for uint256;

    string public baseURI;
    mapping(uint256 => string) private _tokenURIs;
    bool private _isSealed;

    constructor(uint96 _royaltyFeesInBips) ERC721A("EtherFrens", "EF") {
        _setDefaultRoyalty(msg.sender, _royaltyFeesInBips);
        _isSealed = false;
    }

    function mint(address _to, string memory newTokenURI) public onlyOwner {
        require(!_isSealed, "URI is sealed");
        require(bytes(newTokenURI).length != 0);
        if(_to == address(0)) {
            _to = owner();
        }
        _safeMint(_to, 1);
        setTokenURI(_nextTokenId() - 1, newTokenURI);
    }

    function mintMulti(address _to, string[] memory newTokenURIs)
        public
        onlyOwner
    {
        require(!_isSealed, "URI is sealed");
        uint256 quantity = newTokenURIs.length;
        require(quantity > 1, "Quantity is 1");
        _safeMint(_to, quantity);
        uint256 startingMintIndex = _nextTokenId() - quantity;
        for (uint256 i = 0; i < quantity; i++) {
            setTokenURI(startingMintIndex + i, newTokenURIs[i]);
        }
    }

    function setBaseURI(string memory newBaseUri) public virtual onlyOwner {
        require(!_isSealed, "URI is sealed");
        baseURI = newBaseUri;
    }

    function setTokenURI(uint256 tokenId, string memory _tokenURI)
        public
        virtual
        onlyOwner
    {
        require(!_isSealed, "URI is sealed");
        require(_exists(tokenId), "Cant set URI of nonexistent token");
        _tokenURIs[tokenId] = _tokenURI;
    }
    
    function seal() public onlyOwner {
        _isSealed = true;
    }

    function withdraw() public payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Cant withdraw 0 balance");
        (bool successWithdraw, ) = payable(msg.sender).call{value: balance}("");
        require(successWithdraw, "Withdraw failed");
        assert(address(this).balance == 0);
    }

    function setDefaultRoyalty(address receiver, uint96 feeNumerator)
        public
        virtual
        onlyOwner
    {
        _setDefaultRoyalty(receiver, feeNumerator);
    }

    function setTokenRoyalty(
        uint256 tokenId,
        address receiver,
        uint96 feeNumerator
    ) public virtual onlyOwner {
        _setTokenRoyalty(tokenId, receiver, feeNumerator);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(_exists(tokenId));
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721A, ERC2981)
        returns (bool)
    {
        return
            super.supportsInterface(interfaceId) ||
            ERC721A.supportsInterface(interfaceId) ||
            ERC2981.supportsInterface(interfaceId);
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
