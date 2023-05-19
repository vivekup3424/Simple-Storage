import { expect } from "chai";
import { ethers } from "hardhat";
import { SimpleStorage, SimpleStorage__factory } from "../typechain-types";
describe("SimpleStorage", () => {
    let SimpleStorageFactory: SimpleStorage__factory;
    let simpleStorage: SimpleStorage;
    beforeEach(async () => {
        SimpleStorageFactory = (await ethers.getContractFactory(
            "SimpleStorage"
        )) as SimpleStorage__factory; //using typecasting here
        simpleStorage = await SimpleStorageFactory.deploy(); //using typecasting here
    });
    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = 0;
        expect(currentValue).to.equal(0, "fav num != 0");
    });
    it("Should update when we call store", async () => {
        let expectedValue = 7;
        let transactionResponse = await simpleStorage.store(expectedValue);
        let transactionReceipt = await transactionResponse.wait();
        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(expectedValue, "values are not equal");
    });
});
