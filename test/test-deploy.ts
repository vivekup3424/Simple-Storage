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
        simpleStorage = await SimpleStorageFactory.deploy();
    });
    it("Should start with a favorite number of 0", async () => {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = 0;
        expect(currentValue).to.equal(expectedValue, "fav num != 0");
    });
    it("Should update when we call store", async () => {
        let expectedValue = 7;
        let transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait();
        let currentValue = await simpleStorage.retrieve();
        expect(currentValue).to.equal(expectedValue, "values are not equal");
    });
    it("Should add a person to the people array and store favorite number of that person", async () => {
        let expectedValue = {
            name: "Alice",
            favoriteNumber: 7,
        };
        let transactionResponse = await simpleStorage.addPerson(
            expectedValue.name,
            expectedValue.favoriteNumber
        );
        await transactionResponse.wait(1);
        const storedFavoriteNumber = await simpleStorage.nameToFavoriteNumber(
            expectedValue.name
        ); //promise to return bigNumber
        expect(storedFavoriteNumber).to.equal(
            expectedValue.favoriteNumber,
            "favorite not stored by using nameToFavoriteNumber mapping."
        );
        const storedPeopleFavoriteNumber = (await simpleStorage.people(0))
            .favoriteNumber;
        const storedPeopleName = (await simpleStorage.people(0)).name;
        expect(storedPeopleFavoriteNumber).to.equal(
            expectedValue.favoriteNumber,
            "Favorite Number not stored correctly in People array"
        );
        expect(storedPeopleName).to.equal(
            expectedValue.name,
            "Favorite Number not stored correctly in People array"
        );
    });
});
