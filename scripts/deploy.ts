import { ethers } from "hardhat";

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying Contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    //This code is using the contract factory SimpleStorageFactory
    //created earlier to deploy a new instance of the SimpleStorage
    //contract to the blockchain.
    await simpleStorage.deployed();
    //The deployed() method is a function provided by ethers.js
    //that waits for the transaction to deploy the contract
    //instance to be confirmed on the blockchain. This function
    //returns a Promise that resolves with the deployed contract
    //instance object once the transaction is confirmed.

    //for deploying we need private key and the rpc url of the blockchain
    console.log(`Deployed Contract to: ${simpleStorage.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
