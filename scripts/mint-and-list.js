const { ethers } = require("hardhat")

async function mintAndList(numbers) {
    const nftMarketplace = await ethers.getContract("NftMarketplace")
    const example = await ethers.getContract("Example")
    const price = ethers.utils.parseEther("0.5")
    // Mint the NFT using the provided number
    const mintTx = await example.mintNft(numbers)
    const mintReceipt = await mintTx.wait(1) // Correct spelling
    const tokenId = mintReceipt.events[0].args.tokenId

    // Approve the marketplace to transfer the NFT
    const approveTx = await example.approve(nftMarketplace.address, tokenId)
    await approveTx.wait(1)

    // List the NFT on the marketplace
    const tx = await nftMarketplace.listItem(example.address, tokenId, price)
    await tx.wait(1)

    console.log(`NFT with token ID ${tokenId} minted and listed successfully!`)
}

mintAndList(1) // Use the correct index when calling the function
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
