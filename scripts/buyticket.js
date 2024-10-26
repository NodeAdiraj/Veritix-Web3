const { ethers } = require("ethers");

async function buyTicket(privateKey, eventId, toAddress, price) {
  try {
    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    );
    const wallet = new ethers.Wallet(privateKey, provider);
    const ticketContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const ticketAbi = [
      "function issueTicket(address to, uint256 eventId, uint256 price) public returns (uint256)",
    ];

    const ticketContract = new ethers.Contract(
      ticketContractAddress,
      ticketAbi,
      wallet
    );

    const price = ethers.utils.parseEther(price);

    const transaction = await ticketContract.issueTicket(
      toAddress,
      eventId,
      price
    );

    const receipt = await transaction.wait();

    console.log("Ticket issued! Transaction hash:", receipt.transactionHash);
    return receipt.transactionHash;
  } catch (error) {
    console.error("Error issuing ticket:", error);
    throw error;
  }
}
