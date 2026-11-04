import { configVariable, defineConfig } from "hardhat/config";
import hardhatToolboxMochaEthers from "@nomicfoundation/hardhat-toolbox-mocha-ethers";

export default defineConfig({
  plugins: [hardhatToolboxMochaEthers],
  solidity: {
    version: "0.8.38",
    settings: {
      optimizer: { enabled: true, runs: 200 },
    },
  },
  networks: {
    ethereumMainnet: {
      type: "http",
      chainType: "l1",
      chainId: 1,
      url: "https://ethereum-rpc.publicnode.com",
      accounts: [configVariable("ETHEREUM_MAINNET_PRIVATE_KEY")],
    },
  },
});
