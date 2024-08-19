const pinataSDK = require("@pinata/sdk")
const path = require("path")
const fs = require("fs")

// Use environment variables for sensitive information
const pinataApi = "9c91824b849f7d0cef09"
const pinataSecret = "4e3adf03f477e36b625f42441cb1d38377570ceeea46e0a7a7e6c7963a4c7a1d"
const pinata = new pinataSDK(pinataApi, pinataSecret)

async function storeImages(imagePath) {
    const filepath = path.resolve(imagePath)
    const files = fs.readdirSync(filepath)
    const responses = [] // Initialize responses array inside the function

    for (const file of files) {
        // Use for...of for arrays
        const current = fs.createReadStream(`${filepath}/${file}`)
        const options = {
            pinataMetadata: {
                name: file.replace(".png", ""),
            },
        }

        try {
            const result = await pinata.pinFileToIPFS(current, options)
            responses.push(result)
        } catch (err) {
            console.log(err)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
    const options = {
        pinataMetadata: {
            name: metadata.name,
        },
    }

    try {
        const response = await pinata.pinJSONToIPFS(metadata, options)
        return response
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = { storeImages, storeTokenUriMetadata }
