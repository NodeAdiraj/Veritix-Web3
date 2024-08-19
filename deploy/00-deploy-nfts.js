const { getNamedAccounts, deployments } = require("hardhat")
const { storeImages, storeTokenUriMetadata } = require("../utils/upload")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const metadataTemplate = {
        name: "",
        description: "",
        image: "",
        attributes: [
            {
                value: 100,
            },
        ],
    }

    let tokenUris = [] // Initialize as an array

    // Correct function call
    const { responses: imageUploadResponses, files } = await storeImages("./images/nfts")

    console.log("Image upload responses:", imageUploadResponses)
    console.log("Files:", files)

    for (const [index, response] of imageUploadResponses.entries()) {
        let ipfsMetadata = { ...metadataTemplate }
        ipfsMetadata.name = files[index].replace(".png", "")
        ipfsMetadata.description = "shoes"
        ipfsMetadata.image = `ipfs://${response.IpfsHash}`

        try {
            const metadataUploadResponse = await storeTokenUriMetadata(ipfsMetadata)
            if (metadataUploadResponse) {
                tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
            }
        } catch (error) {
            console.log("Metadata upload error:", error)
        }
    }

    console.log("Token URIs:", tokenUris)

    const args = [tokenUris]
    console.log("Deploy arguments:", args)

    try {
        const nftMarketplace = await deploy("Example", {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: 1,
        })
        console.log(`Contract deployed at ${nftMarketplace.address}`)
    } catch (error) {
        console.log("Deployment error:", error)
    }
}

module.exports.tags = ["all", "nft", "ipfs"]
