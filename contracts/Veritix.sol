// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Veritix is ERC721, Ownable {
    uint256 public nextTicketId;
    struct Ticket {
        string ticketId;
        string eventId;
        bool used;
    }
    mapping(uint256 => address) public ticketOwners;
    mapping(uint256 => Ticket) public tickets;

    constructor() ERC721("Veritix", "V") Ownable() {}

    event TicketMinted(
        address indexed buyer,
        uint256 indexed _ticketId,
        string indexed ticketId,
        string eventId
    );
    event TicketUsed(uint256 indexed ticketId);

    function mintTicket(
        address to,
        string memory eventId,
        string memory ticketId
    ) external onlyOwner {
        uint256 _ticketId = nextTicketId;
        _safeMint(msg.sender, _ticketId);

        tickets[_ticketId] = Ticket({
            ticketId: ticketId,
            eventId: eventId,
            used: false
        });

        ticketOwners[_ticketId] = to;

        nextTicketId++;

        emit TicketMinted(to, _ticketId, ticketId, eventId);
    }

    function useTicket(uint256 ticketId, address user) external onlyOwner {
        require(ticketOwners[ticketId] == user, "Invalid user for this ticket");
        require(!tickets[ticketId].used, "Already used");

        tickets[ticketId].used = true;

        emit TicketUsed(ticketId);
    }

    function getTicket(uint256 ticketId) external view returns (Ticket memory) {
        return tickets[ticketId];
    }

    function ownerOfTicket(uint256 ticketId) external view returns (address) {
        return ticketOwners[ticketId];
    }
}
