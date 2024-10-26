import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";

export default function TicketPurchase() {
  const { isWeb3Enabled, account } = useMoralis();
  const [privateKey, setPrivateKey] = useState("");
  const [eventId, setEventId] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [price, setPrice] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const ticketContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your deployed contract address
  const ticketAbi = [
    "function issueTicket(address to, uint256 eventId, uint256 price) public returns (uint256)",
  ];

  const handleBuyTicket = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "http://localhost:8545"
      );
      const wallet = new ethers.Wallet(privateKey, provider);
      const ticketContract = new ethers.Contract(
        ticketContractAddress,
        ticketAbi,
        wallet
      );

      // Convert price to wei
      const ticketPrice = ethers.utils.parseEther(price);

      const transaction = await ticketContract.issueTicket(
        toAddress,
        eventId,
        ticketPrice
      );
      const receipt = await transaction.wait();

      console.log("Ticket issued! Transaction hash:", receipt.transactionHash);
      setTransactionHash(receipt.transactionHash);
    } catch (error) {
      console.error("Error issuing ticket:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Buy Ticket</h2>
      <input
        type="text"
        placeholder="Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Event ID"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Price (ETH)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleBuyTicket}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Buy Ticket
      </button>
      {transactionHash && (
        <div className="mt-4">
          <p>Transaction successful!</p>
          <p>Hash: {transactionHash}</p>
        </div>
      )}
    </div>
  );
}
