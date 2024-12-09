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
Object.defineProperty(exports, "__esModule", { value: true });
const js_1 = require("@metaplex-foundation/js");
const web3_js_1 = require("@solana/web3.js");
function getTokenMetadata(CA) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const connection = new web3_js_1.Connection("https://api.mainnet-beta.solana.com");
        const metaplex = js_1.Metaplex.make(connection);
        const mintAddress = new web3_js_1.PublicKey(CA);
        let tokenName;
        let tokenSymbol;
        let tokenLogo;
        const metadataAccount = metaplex
            .nfts()
            .pdas()
            .metadata({ mint: mintAddress });
        const metadataAccountInfo = yield connection.getAccountInfo(metadataAccount);
        console.log(metadataAccount);
        if (metadataAccountInfo) {
            const token = yield metaplex.nfts().findByMint({ mintAddress: mintAddress });
            tokenName = token.name;
            tokenSymbol = token.symbol;
            tokenLogo = (_b = (_a = token === null || token === void 0 ? void 0 : token.json) === null || _a === void 0 ? void 0 : _a.image) !== null && _b !== void 0 ? _b : '';
            twitter: (_d = (_c = token === null || token === void 0 ? void 0 : token.json) === null || _c === void 0 ? void 0 : _c.twitter) !== null && _d !== void 0 ? _d : '';
            website: (_f = (_e = token === null || token === void 0 ? void 0 : token.json) === null || _e === void 0 ? void 0 : _e.website) !== null && _f !== void 0 ? _f : '';
            telegram: (_h = (_g = token === null || token === void 0 ? void 0 : token.json) === null || _g === void 0 ? void 0 : _g.telegram) !== null && _h !== void 0 ? _h : '';
            console.log(token, 'token');
        }
    });
}
const mintAddress = "35N7YVKK7EDkJ1DCUiXQSyLKw4aUbjnQ8AyB6C5Vpump";
getTokenMetadata(mintAddress);
