import { Metaplex } from "@metaplex-foundation/js";
import { Connection, PublicKey } from "@solana/web3.js";

async function getTokenMetadata(CA: string) {
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    const metaplex = Metaplex.make(connection);

    const mintAddress = new PublicKey(CA);

    let tokenName;
    let tokenSymbol;
    let tokenLogo;

    const metadataAccount = metaplex
        .nfts()
        .pdas()
        .metadata({ mint: mintAddress });

    const metadataAccountInfo = await connection.getAccountInfo(metadataAccount);
    console.log(metadataAccount)

    if (metadataAccountInfo) {
          const token = await metaplex.nfts().findByMint({ mintAddress: mintAddress });
          tokenName = token.name;
          tokenSymbol = token.symbol;
          tokenLogo = token?.json?.image ?? '';
          twitter : token?.json?.twitter ?? '';
          website : token?.json?.website ?? '';
          telegram : token?.json?.telegram ?? '';
          


          console.log(token, 'token')
;
    }
}

const mintAddress  = "35N7YVKK7EDkJ1DCUiXQSyLKw4aUbjnQ8AyB6C5Vpump"
getTokenMetadata(mintAddress)


