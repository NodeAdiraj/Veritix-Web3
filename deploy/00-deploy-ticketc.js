const { network, getNamedAccounts, deployments } = require("hardhat");

module.exports = async () => {
  console.log("Starting deployment script...");

  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const args = [];
  const ticketNFT = await deploy("Ticket", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: 1,
  });

  log(`TicketNFT deployed at: ${ticketNFT.address}`);
};

module.exports.tags = ["all", "ticketnft"];
