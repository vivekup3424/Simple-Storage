//entry point for all the scripts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
require("dotenv").config();
const PRIVATE_KEY =
    process.env.PRIVATE_KEY ||
    "fc557f254c276a9dc86dabf08a6886e0fe3b78e36e44028d56ab86491daa2a51";
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "IS5NBWY5V47IGVCJ54MGZ7IUVBU2XG93II";
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const config: HardhatUserConfig = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/x8Tk3UigEvQ6pEq8C3PC8SKZawl3TrU6",
            chainId: 11155111,
            accounts: [PRIVATE_KEY],
        },
        localhost: {
            url: "http://localhost:8545",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
};

export default config;
