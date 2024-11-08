// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
error NoSuchTokenId();
error NotOwner();

contract Ticket is ERC721 {
    uint256 private tokenId;
    address private owner;
    struct Ticket {
        uint256 eventId;
        bool isUsed;
        uint32 quantity;
    }

    mapping(uint256 => Ticket) public tickets;

    event TicketIssued(
        address indexed to,
        uint256 indexed tokenId,
        uint32 indexed quantity,
        uint256 eventId
    );
    event TicketUsed(uint256 indexed tokenId);
    modifier onlyOwner(address sender) {
        if (sender != owner) {
            revert NotOwner();
        }
        _;
    }

    constructor() ERC721("TrueTicket", "TKT") {
        owner = msg.sender;
    }

    function issueTicket(
        address to,
        uint256 eventId,
        uint32 quantity
    ) external onlyOwner(msg.sender) returns (uint256) {
        tokenId++;
        uint256 newTicketId = tokenId;

        _safeMint(to, newTicketId);

        tickets[newTicketId] = Ticket({
            eventId: eventId,
            quantity: quantity,
            isUsed: false
        });

        emit TicketIssued(to, newTicketId, quantity, eventId);
        return newTicketId;
    }

    function useTicket(uint256 tokenid) external onlyOwner(msg.sender) {
        if (tickets[tokenid].eventId == 0) {
            revert NoSuchTokenId();
        }
        require(!tickets[tokenId].isUsed, "TicketNFT: Ticket already used");

        tickets[tokenId].isUsed = true;
        emit TicketUsed(tokenId);
    }
}
