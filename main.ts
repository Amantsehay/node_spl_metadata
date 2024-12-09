// Import necessary modules
import express from "express";
import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

// Initialize the server
const app = express();
const PORT = 3000;

// Create the Solana connection and Metaplex instance
const connection = new Connection("https://api.mainnet-beta.solana.com");
const metaplex = Metaplex.make(connection);

// Define the route to fetch metadata
app.get("/getmetadata", async (req : express.Request, res : express.Response): Promise<any> => { 
    try {
        // Extract the mint address from the query parameters
        const mintAddressParam = req.query.mintAddress;
        if (!mintAddressParam) {
            return res.status(400).json({ error: "Mint address is required." });
        }

        const mintAddress = new PublicKey(mintAddressParam);

        // Variables to store token metadata
        let tokenName;
        let tokenSymbol;
        let tokenLogo;
        let twitter;
        let website;
        let telegram;

        // Fetch metadata account PDA
        const metadataAccount = metaplex
            .nfts()
            .pdas()
            .metadata({ mint: mintAddress });

        const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);

        if (metadataAccountInfo) {
            const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
            tokenName = token.name;
            tokenSymbol = token.symbol;
            tokenLogo = token?.json?.image ?? "defaultImagePath";
            twitter = token?.json?.twitter ?? '';
            website = token?.json?.website ?? '';
            telegram = token?.json?.telegram ?? '';

            // Respond with metadata
            return res.json({
                name: tokenName,
                symbol: tokenSymbol,
                logo: tokenLogo,
                twitter: twitter,
                website: website,
                telegram: telegram,
            });
        } else {
            return res.status(404).json({ error: "Metadata not found for the given mint address." });
        }
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return res.status(500).json({ error: "An error occurred while fetching metadata." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


