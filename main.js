"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const js_1 = require("@metaplex-foundation/js");
const web3_js_1 = require("@solana/web3.js");
// Initialize the server
const app = (0, express_1.default)();
const PORT = 3000;
// Create the Solana connection and Metaplex instance
const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
const metaplex = js_1.Metaplex.make(connection);
// Define the route to fetch metadata
app.get("/getmetadata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    try {
        // Extract the mint address from the query parameters
        const mintAddressParam = req.query.mintAddress;
        if (!mintAddressParam) {
            return res.status(400).json({ error: "Mint address is required." });
        }
        const mintAddress = new web3_js_1.PublicKey(mintAddressParam);
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
        const metadataAccountInfo = yield connection.getAccountInfo(metadataAccount);
        if (metadataAccountInfo) {
            const token = yield metaplex.nfts().findByMint({ mintAddress: mintAddress });
            tokenName = token.name;
            tokenSymbol = token.symbol;
            tokenLogo = (_b = (_a = token === null || token === void 0 ? void 0 : token.json) === null || _a === void 0 ? void 0 : _a.image) !== null && _b !== void 0 ? _b : "defaultImagePath";
            twitter = (_d = (_c = token === null || token === void 0 ? void 0 : token.json) === null || _c === void 0 ? void 0 : _c.twitter) !== null && _d !== void 0 ? _d : '';
            website = (_f = (_e = token === null || token === void 0 ? void 0 : token.json) === null || _e === void 0 ? void 0 : _e.website) !== null && _f !== void 0 ? _f : '';
            telegram = (_h = (_g = token === null || token === void 0 ? void 0 : token.json) === null || _g === void 0 ? void 0 : _g.telegram) !== null && _h !== void 0 ? _h : '';
            // Respond with metadata
            return res.json({
                name: tokenName,
                symbol: tokenSymbol,
                logo: tokenLogo,
                twitter: twitter,
                website: website,
                telegram: telegram,
            });
        }
        else {
            return res.status(404).json({ error: "Metadata not found for the given mint address." });
        }
    }
    catch (error) {
        console.error("Error fetching metadata:", error);
        return res.status(500).json({ error: "An error occurred while fetching metadata." });
    }
}));
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
