// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Example is ERC721URIStorage {
    event example_minted(uint256 indexed tokenId);
    string[] private tokenUri;
    uint256 private counter;

    constructor(string[] memory tokenIpfs) ERC721("car", "car") {
        tokenUri = tokenIpfs;
        counter = 0;
    }

    function mintNft(uint256 number) public {
        uint256 tokenId = counter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri[number]);
        counter = counter + 1;
        emit example_minted(tokenId);
    }

    function tokenURI(uint256 index) public view override returns (string memory) {
        return tokenUri[index];
    }

    function getTokenCounter() public view returns (uint256) {
        return counter;
    }
}
