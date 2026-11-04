# MallowMoth (MALOTH)

Fixed-supply ERC-20 meme token for Ethereum.

- Name: MallowMoth
- Symbol: MALOTH
- Supply: 1,000,000,000 MALOTH
- Decimals: 18
- Initial holder: `0x5bd89195D2fc107bF7259eF3510c9c24b8E10a93`
- Future minting: none
- Transfer tax: none
- Pause/blacklist controls: none
- Owner/admin controls: none

Deployment is manual through GitHub Actions. The deployment wallet only pays gas; the entire token supply is minted directly to the initial-holder address above.

Never commit a private key to this repository. Store the deployment key only in the GitHub Actions secret named `ETHEREUM_MAINNET_PRIVATE_KEY`.
