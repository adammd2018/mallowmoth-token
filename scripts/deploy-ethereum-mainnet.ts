import { mkdir, writeFile } from "node:fs/promises";
import { network } from "hardhat";

const EXPECTED_CHAIN_ID = 1n;
const INITIAL_HOLDER = "0x5bd89195D2fc107bF7259eF3510c9c24b8E10a93";
const EXPECTED_SUPPLY = 1_000_000_000n * 10n ** 18n;

const { ethers, networkName } = await network.create();

if (networkName !== "ethereumMainnet") {
  throw new Error(`Refusing deployment to ${networkName}. Ethereum mainnet only.`);
}

const chain = await ethers.provider.getNetwork();
if (chain.chainId !== EXPECTED_CHAIN_ID) {
  throw new Error(`Expected chain ID 1, got ${chain.chainId}.`);
}

const [deployer] = await ethers.getSigners();
const balance = await ethers.provider.getBalance(deployer.address);
if (balance === 0n) {
  throw new Error("Deployment signer has zero ETH for gas.");
}

console.log("Deploying MallowMoth (MALOTH)...");
console.log("Deployer:", deployer.address);
console.log("Initial holder:", INITIAL_HOLDER);
console.log("Supply:", "1,000,000,000 MALOTH");

const token = await ethers.deployContract("MallowMoth");
await token.waitForDeployment();

const contractAddress = await token.getAddress();
const tx = token.deploymentTransaction();
const totalSupply = await token.totalSupply();
const holderBalance = await token.balanceOf(INITIAL_HOLDER);

if (totalSupply !== EXPECTED_SUPPLY || holderBalance !== EXPECTED_SUPPLY) {
  throw new Error("Post-deployment supply verification failed.");
}

const manifest = {
  token: {
    name: "MallowMoth",
    symbol: "MALOTH",
    decimals: 18,
    totalSupplyBaseUnits: totalSupply.toString(),
    totalSupplyTokens: "1000000000",
    initialHolder: INITIAL_HOLDER,
    contractAddress
  },
  network: {
    name: "Ethereum Mainnet",
    chainId: Number(chain.chainId)
  },
  deployment: {
    deployer: deployer.address,
    transactionHash: tx?.hash ?? null
  },
  controls: {
    futureMinting: false,
    pausable: false,
    blacklist: false,
    transferTax: false,
    ownerAdmin: false
  },
  generatedAt: new Date().toISOString()
};

await mkdir("deployments", { recursive: true });
await writeFile("deployments/ethereum-mainnet.json", JSON.stringify(manifest, null, 2) + "\n", "utf8");

console.log("MALOTH contract:", contractAddress);
console.log("Deployment transaction:", tx?.hash ?? "unknown");
console.log("Verified holder balance:", holderBalance.toString());
