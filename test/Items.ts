const { expect } = require('chai');

describe('Items contract', () => {
    
    let Items, items, owner, addr1, addr2;

    beforeEach(async () => {
        Items = await hre.ethers.getContractFactory("Items");

        items = await Items.deploy();

        [owner, addr1, addr2] = await hre.ethers.getSigners();


    });

    describe("Mint", function () {

        it("Should mint", async function () {
            await items.mintNFT(owner.address, 1, 1);
            await items.mintNFT(owner.address, 2, 2);
            
            expect(await items.balanceOf(owner.address, 1)).to.equal("1");
            expect(await items.balanceOf(owner.address, 2)).to.equal("2");
        });

        it("Should give minter role", async function () {
            await items.grantRole("0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", addr1.address);
            await items.connect(addr1).mintNFT(addr1.address, 1, 1);
            
            expect(await items.balanceOf(addr1.address, 1)).to.equal("1");
        });

        it("Should mint without minter role", async function () {

            await expect(items.connect(addr1).mintNFT(addr1.address, 1, 1)).to.be.revertedWith('Caller is not a minter');
            
        });

    });

    describe("Burn", function () {

        it("Should burn", async function () {
            await items.mintNFT(owner.address, 1, 1);
            await items.mintNFT(owner.address, 2, 2);

            await items.burnNFT(owner.address, 1, 1);
            await items.burnNFT(owner.address, 2, 1);
            
            expect(await items.balanceOf(owner.address, 1)).to.equal("0");
            expect(await items.balanceOf(owner.address, 2)).to.equal("1");
        });

        it("Should give burner role", async function () {
            await items.mintNFT(addr2.address, 1, 2);
            await items.grantRole("0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848", addr1.address);
            await items.connect(addr1).burnNFT(addr2.address, 1, 1);
            
            expect(await items.balanceOf(addr2.address, 1)).to.equal("1");
        });

        it("Should burn without minter role", async function () {
            await items.mintNFT(addr2.address, 1, 2);
            await expect(items.connect(addr1).burnNFT(addr2.address, 1, 1)).to.be.revertedWith('Caller is not a burner');
            
        });

        it("Should burn if owner dont have enough tokens", async function () {
            await items.mintNFT(owner.address, 1, 1);
            await expect(items.burnNFT(owner.address, 1, 2)).to.be.revertedWith('Owner dont have enough tokens');
        });

    });

});