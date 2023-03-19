import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const PRIVATE_KEY =
    "bc6d04b0c1e8db5a7802d49d2d0c5e7cfc847bf5e9d9c66ecb6d9f768216d0d7";
const config: HardhatUserConfig = {
    solidity: "0.8.8",
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: "https://eth-sepolia.g.alchemy.com/v2/x8Tk3UigEvQ6pEq8C3PC8SKZawl3TrU6",
            chainId: 11155111,
            accounts: [PRIVATE_KEY],
        },
    },
};

export default config;
