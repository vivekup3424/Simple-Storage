import { ethers, run, network } from "hardhat";
//we can use any task from hardhat using the run package
// run allows us to run any hardhat task
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
    // We only verify on a testnet!
    if (network.config.chainId === 11155111) {
        // 6 blocks is sort of a guess
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }
    console.log("Simple Storage deployed to:", simpleStorage.address);

    // Get the current value
    let currentValue = await simpleStorage.retrieve();
    console.log(`Current value: ${currentValue}`);

    // Update the value
    console.log("Updating contract...");
    let transactionResponse = await simpleStorage.store(7);
    await transactionResponse.wait(); // returns transaction receipt
    currentValue = await simpleStorage.retrieve();
    console.log(`Current value: ${currentValue}`);
}
async function verify(contractAddress: string, args: any) {
    //automatically verify our contract
    //we are going to add haraht etherscan plugin to make the
    //contract verification very easier
    console.log("Verifying...");
    await run("verify:verify", {
        //subtask of verify task
        address: contractAddress,
        constructorArguments: args,
    }); //equivalent == ```yarn hardhat verify``` command
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    });

// yarn hardhat clean //to clean the cache and artifacts
// solidity-coverage can help you write more comprehensive tests
